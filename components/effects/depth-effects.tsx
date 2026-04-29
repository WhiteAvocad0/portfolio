'use client';
import { useEffect } from 'react';

/**
 * Scroll-driven 3D depth: hero element parallax, per-section translateZ, and
 * IntersectionObserver-driven reveal animations. Cursor-following effects
 * (id-card tilt, ambient light) were intentionally removed.
 *
 * Mounts once, renders nothing.
 */
export function DepthEffects() {
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    let reduced = mq.matches;

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

    const heroH1 = document.querySelector<HTMLElement>('.hero h1');
    const heroTag = document.querySelector<HTMLElement>('.hero .tagline');
    const heroCard = document.querySelector<HTMLElement>('.hero .id-card');
    const heroEyebrow = document.querySelector<HTMLElement>('.hero .eyebrow');

    let scrollY = window.scrollY;
    let targetY = window.scrollY;

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

    const clearParallaxTransforms = () => {
      [heroH1, heroTag, heroCard, heroEyebrow].forEach((el) => {
        if (el) el.style.transform = '';
      });
      sections.forEach((sec) => {
        sec.style.transform = '';
        sec.querySelectorAll<HTMLElement>('[data-depth]').forEach((el) => {
          el.style.transform = '';
        });
      });
    };

    const EPS = 0.05;
    let raf = 0;
    let scheduled = false;

    const tick = () => {
      scheduled = false;

      if (reduced) {
        clearParallaxTransforms();
        scrollY = targetY;
        return;
      }

      const dy = targetY - scrollY;
      scrollY += dy * 0.18;
      const y = scrollY;

      if (heroEyebrow) heroEyebrow.style.transform = `translate3d(0, ${y * -0.42}px, 0)`;
      if (heroH1)
        heroH1.style.transform = `translate3d(0, ${y * -0.3}px, 0) scale(${
          1 + Math.min(0.05, y * 0.00012)
        })`;
      if (heroTag) heroTag.style.transform = `translate3d(0, ${y * -0.18}px, 0)`;
      if (heroCard) heroCard.style.transform = `translate3d(0, ${y * -0.08}px, 0)`;

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

      if (Math.abs(dy) >= EPS) {
        scheduled = true;
        raf = requestAnimationFrame(tick);
      }
    };

    const schedule = () => {
      if (scheduled) return;
      scheduled = true;
      raf = requestAnimationFrame(tick);
    };

    const onScroll = () => {
      targetY = window.scrollY;
      schedule();
    };
    document.addEventListener('scroll', onScroll, { passive: true });

    const onMqChange = (e: MediaQueryListEvent) => {
      reduced = e.matches;
      schedule();
    };
    mq.addEventListener('change', onMqChange);

    // Kick once so above-the-fold parallax baseline applies on mount,
    // and so reduced-motion users get a single cleanup pass.
    schedule();

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      document.removeEventListener('scroll', onScroll);
      mq.removeEventListener('change', onMqChange);
    };
  }, []);

  return null;
}
