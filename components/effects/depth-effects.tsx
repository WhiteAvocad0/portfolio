'use client';
import { useEffect } from 'react';

/**
 * Layered 3D depth: scroll-driven section parallax, cursor-driven ambient light,
 * id-card cursor tilt, and intersection-observed reveal animations.
 *
 * Mounts once at the bottom of the page; renders nothing.
 */
export function DepthEffects() {
  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    document.querySelectorAll('.hero .reveal').forEach((el) => el.classList.add('in'));

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue;
          const t = e.target as HTMLElement;
          t.classList.add('in');
          if (t.matches('[data-bars]')) t.classList.add('in-view');
          t.querySelectorAll<HTMLElement>('[data-bars]').forEach((b) =>
            b.classList.add('in-view')
          );
          io.unobserve(t);
        }
      },
      { rootMargin: '0px 0px -10% 0px', threshold: 0.05 }
    );
    document.querySelectorAll('.reveal').forEach((el) => io.observe(el));
    document.querySelectorAll('[data-bars]').forEach((el) => io.observe(el));

    if (reduced) {
      return () => io.disconnect();
    }

    const heroH1 = document.querySelector<HTMLElement>('.hero h1');
    const heroTag = document.querySelector<HTMLElement>('.hero .tagline');
    const heroCard = document.querySelector<HTMLElement>('.hero .id-card');
    const heroEyebrow = document.querySelector<HTMLElement>('.hero .eyebrow');
    const heroStrip = document.querySelector<HTMLElement>('.hero .strip');

    let scrollY = window.scrollY;
    let targetY = window.scrollY;
    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let smoothMx = mouseX;
    let smoothMy = mouseY;
    let cardTiltX = 0;
    let cardTiltY = 0;
    let smoothTiltX = 0;
    let smoothTiltY = 0;
    let cardActive = false;

    const sections = Array.from(
      document.querySelectorAll<HTMLElement>('section.s, .outro')
    );

    sections.forEach((sec) => {
      const wrap = sec.querySelector('.wrap');
      if (!wrap) return;
      const blocks = wrap.querySelectorAll<HTMLElement>(
        ':scope > .head, :scope > .about-grid, :scope > .skills-grid, :scope > .trail-grid, :scope > .proj-list, :scope > h2'
      );
      blocks.forEach((el, i) => {
        if (el.classList.contains('reveal')) return;
        if (!el.dataset.depth) el.dataset.depth = (i === 0 ? 0.05 : 0.1).toString();
      });
    });

    const EPS = 0.05;
    let raf = 0;
    const tick = () => {
      const dy = targetY - scrollY;
      const dmx = mouseX - smoothMx;
      const dmy = mouseY - smoothMy;
      const dtx = cardTiltX - smoothTiltX;
      const dty = cardTiltY - smoothTiltY;

      scrollY += dy * 0.18;
      smoothMx += dmx * 0.12;
      smoothMy += dmy * 0.12;
      smoothTiltX += dtx * 0.12;
      smoothTiltY += dty * 0.12;

      const idle =
        Math.abs(dy) < EPS &&
        Math.abs(dmx) < EPS &&
        Math.abs(dmy) < EPS &&
        Math.abs(dtx) < EPS &&
        Math.abs(dty) < EPS;

      if (!idle) {
        const y = scrollY;

        if (heroEyebrow) heroEyebrow.style.transform = `translate3d(0, ${y * -0.42}px, 0)`;
        if (heroH1)
          heroH1.style.transform = `translate3d(0, ${y * -0.3}px, 0) scale(${
            1 + Math.min(0.05, y * 0.00012)
          })`;
        if (heroTag) heroTag.style.transform = `translate3d(0, ${y * -0.18}px, 0)`;
        if (heroStrip) heroStrip.style.transform = `translate3d(0, ${y * -0.04}px, 0)`;
        if (heroCard) {
          const tx = y * -0.08;
          const z = cardActive ? 50 : 0;
          heroCard.style.transform = `translate3d(0, ${tx}px, 0) perspective(900px) rotateX(${smoothTiltX}deg) rotateY(${smoothTiltY}deg) translateZ(${z}px)`;
        }

        const vh = window.innerHeight;
        sections.forEach((sec) => {
          const r = sec.getBoundingClientRect();
          const center = r.top + r.height / 2;
          const p = Math.max(-1.2, Math.min(1.2, (center - vh / 2) / vh));
          const z = -Math.abs(p) * 50;
          sec.style.transform = `translate3d(0, 0, ${z}px)`;

          if (r.bottom > -200 && r.top < vh + 200) {
            sec.querySelectorAll<HTMLElement>('[data-depth]').forEach((el) => {
              const d = parseFloat(el.dataset.depth || '0');
              const er = el.getBoundingClientRect();
              const ey = er.top + er.height / 2 - vh / 2;
              el.style.transform = `translate3d(0, ${(ey * -d * 0.15).toFixed(2)}px, 0)`;
            });
          }
        });

        document.body.style.setProperty('--mx', (smoothMx / window.innerWidth) * 100 + '%');
        document.body.style.setProperty('--my', (smoothMy / window.innerHeight) * 100 + '%');
      }

      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    const onScroll = () => {
      targetY = window.scrollY;
    };
    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (!heroCard) return;
      const r = heroCard.getBoundingClientRect();
      // Skip tilt math when the card is fully off-screen
      if (r.bottom < 0 || r.top > window.innerHeight) {
        cardActive = false;
        cardTiltX = 0;
        cardTiltY = 0;
        return;
      }
      const cx = r.left + r.width / 2;
      const cy = r.top + r.height / 2;
      const dx = (e.clientX - cx) / r.width;
      const dy = (e.clientY - cy) / r.height;
      const dist = Math.hypot(dx, dy);
      if (dist < 1.6) {
        cardActive = true;
        cardTiltX = -dy * 12;
        cardTiltY = dx * 12;
      } else {
        cardActive = false;
        cardTiltX = 0;
        cardTiltY = 0;
      }
    };

    document.addEventListener('scroll', onScroll, { passive: true });
    document.addEventListener('mousemove', onMove, { passive: true });

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      document.removeEventListener('scroll', onScroll);
      document.removeEventListener('mousemove', onMove);
    };
  }, []);

  return null;
}
