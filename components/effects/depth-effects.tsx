'use client';
import { useEffect } from 'react';

/**
 * Reveals + parallax. Mounts once, renders nothing.
 *
 * Per-environment cost:
 * - Reduced motion OR coarse pointer (mobile): IntersectionObserver only.
 *   No rAF, no scroll listener — eliminates per-frame layout thrash on
 *   the device classes that suffered from it.
 * - Desktop with CSS scroll-driven animation support (Chromium 115+,
 *   Safari 18+): rAF for hero element parallax only. Background layers
 *   and per-section depth are handled by CSS animation-timeline (see
 *   @supports blocks in globals.css).
 * - Desktop without scroll-driven support (Firefox): full JS parallax
 *   for hero, bg layers, and section depth.
 *
 * Scrolling uses a lightweight lerp (targetY -> scrollY interpolated at
 * 0.18 per frame). Lenis was removed in favour of this minimal loop —
 * one less dependency, less per-frame work.
 */
export function DepthEffects() {
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    let reduced = mq.matches;
    const isCoarse = window.matchMedia('(pointer: coarse)').matches;

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

    // Mobile / touch: no rAF, no scroll listener. The page still gets
    // all reveals + skill-bar fills via the IntersectionObserver above,
    // and CSS scroll-driven animations (when supported) handle bg
    // parallax and section depth at zero JS cost.
    if (isCoarse) {
      return () => io.disconnect();
    }

    const cssScrollAnim =
      typeof CSS !== 'undefined' &&
      typeof CSS.supports === 'function' &&
      CSS.supports('animation-timeline', 'scroll()');

    const heroH1 = document.querySelector<HTMLElement>('.hero h1');
    const heroTag = document.querySelector<HTMLElement>('.hero .tagline');
    const heroCard = document.querySelector<HTMLElement>('.hero .id-card');
    const heroEyebrow = document.querySelector<HTMLElement>('.hero .eyebrow');
    // bg parallax: only when CSS scroll-driven NOT supported (Firefox).
    const bgStars = cssScrollAnim ? null : document.querySelector<HTMLElement>('.bg-stars');
    const bgWash = cssScrollAnim ? null : document.querySelector<HTMLElement>('.bg-wash');
    const bgHarumaki = cssScrollAnim ? null : document.querySelector<HTMLElement>('.bg-harumaki');

    // Per-section depth: also CSS-driven when supported (see globals.css
    // @supports (animation-timeline: view()) block). JS only runs as a
    // fallback for browsers without scroll-driven support.
    const useJsSectionDepth = !cssScrollAnim;
    const Z_AMP = 50;
    const OPACITY_FALLOFF = 0.18;
    const BLOCK_DEPTH_MUL = 0.15;

    const sections = useJsSectionDepth
      ? Array.from(document.querySelectorAll<HTMLElement>('section.s, .outro'))
      : [];

    if (useJsSectionDepth) {
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
    }

    const clearParallaxTransforms = () => {
      [heroH1, heroTag, heroCard, heroEyebrow].forEach((el) => {
        if (el) el.style.transform = '';
      });
      sections.forEach((sec) => {
        const wrap = sec.querySelector<HTMLElement>(':scope > .wrap');
        if (wrap) {
          wrap.style.transform = '';
          wrap.style.opacity = '';
        }
        sec.querySelectorAll<HTMLElement>('[data-depth]').forEach((el) => {
          el.style.transform = '';
        });
      });
    };

    let targetY = window.scrollY;
    let scrollY = targetY;
    let raf = 0;
    let scheduled = false;
    const EPS = 0.05;

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

      if (bgStars) {
        const offset = -y * 0.4;
        bgStars.style.backgroundPosition = `0 ${offset.toFixed(2)}px, 420px ${(260 + offset).toFixed(2)}px`;
      }
      if (bgWash) {
        const washY = Math.max(-60, Math.min(60, -y * 0.08));
        bgWash.style.transform = `translate3d(0, ${washY.toFixed(2)}px, 0)`;
      }
      if (bgHarumaki) {
        const harumakiY = Math.max(-22, Math.min(22, -y * 0.04));
        bgHarumaki.style.transform = `translate3d(0, ${harumakiY.toFixed(2)}px, 0)`;
      }

      if (heroEyebrow) heroEyebrow.style.transform = `translate3d(0, ${y * -0.42}px, 0)`;
      if (heroH1)
        heroH1.style.transform = `translate3d(0, ${y * -0.3}px, 0) scale(${
          1 + Math.min(0.05, y * 0.00012)
        })`;
      if (heroTag) heroTag.style.transform = `translate3d(0, ${y * -0.18}px, 0)`;
      if (heroCard) heroCard.style.transform = `translate3d(0, ${y * -0.08}px, 0)`;

      if (useJsSectionDepth) {
        const vh = window.innerHeight;
        sections.forEach((sec) => {
          const r = sec.getBoundingClientRect();
          const center = r.top + r.height / 2;
          const p = Math.max(-1.2, Math.min(1.2, (center - vh / 2) / vh));
          const z = -Math.abs(p) * Z_AMP;
          const wrap = sec.querySelector<HTMLElement>(':scope > .wrap');
          if (wrap) {
            wrap.style.transform = `translate3d(0, 0, ${z}px)`;
            wrap.style.opacity = (1 - Math.abs(p) * OPACITY_FALLOFF).toFixed(3);
          }
          if (r.bottom > -200 && r.top < vh + 200) {
            sec.querySelectorAll<HTMLElement>('[data-depth]').forEach((el) => {
              const d = parseFloat(el.dataset.depth || '0');
              const er = el.getBoundingClientRect();
              const ey = er.top + er.height / 2 - vh / 2;
              el.style.transform = `translate3d(0, ${(ey * -d * BLOCK_DEPTH_MUL).toFixed(2)}px, 0)`;
            });
          }
        });
      }

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
