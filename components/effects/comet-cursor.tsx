'use client';
import { useEffect, useRef } from 'react';

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  decay: number;
  size: number;
  hue: 'gold' | 'pink';
};

/**
 * Cursor-following comet for an astrophotographer's portfolio:
 * a bright white-gold head with a fading pink/yellow particle tail.
 * Spawns on mousemove, idles softly when still, hides on touch
 * devices and respects prefers-reduced-motion.
 *
 * Sits at z-index 0 (above the body sky, below .wrap content) so the
 * matte glass panels naturally blur it through their backdrop-filter.
 */
export function CometCursor() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (window.matchMedia('(hover: none)').matches) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let dpr = Math.min(2, window.devicePixelRatio || 1);
    let w = window.innerWidth;
    let h = window.innerHeight;

    const sizeCanvas = () => {
      dpr = Math.min(2, window.devicePixelRatio || 1);
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    sizeCanvas();

    const state = {
      // raw mouse target
      mx: w / 2,
      my: h / 2,
      // smoothed comet head position
      hx: w / 2,
      hy: h / 2,
      // last head position (for direction)
      lhx: w / 2,
      lhy: h / 2,
      moving: false,
      lastMove: 0,
      visible: false,
    };

    const particles: Particle[] = [];
    const MAX_PARTICLES = 220;

    const onMove = (e: MouseEvent) => {
      state.mx = e.clientX;
      state.my = e.clientY;
      state.lastMove = performance.now();
      state.visible = true;
    };
    const onLeave = () => {
      state.visible = false;
    };

    const onResize = () => sizeCanvas();

    window.addEventListener('mousemove', onMove, { passive: true });
    window.addEventListener('mouseleave', onLeave);
    window.addEventListener('resize', onResize);

    let raf = 0;
    const tick = () => {
      // smooth head toward mouse
      state.lhx = state.hx;
      state.lhy = state.hy;
      state.hx += (state.mx - state.hx) * 0.18;
      state.hy += (state.my - state.hy) * 0.18;

      const dx = state.hx - state.lhx;
      const dy = state.hy - state.lhy;
      const speed = Math.hypot(dx, dy);

      // spawn particles based on movement speed
      if (state.visible && speed > 0.4) {
        const count = Math.min(6, 1 + Math.floor(speed * 0.6));
        for (let i = 0; i < count; i++) {
          if (particles.length >= MAX_PARTICLES) particles.shift();
          const spread = 0.5 + Math.random() * 1.2;
          // particles drift slightly opposite the comet direction
          const angle = Math.atan2(-dy, -dx) + (Math.random() - 0.5) * 0.7;
          particles.push({
            x: state.hx + (Math.random() - 0.5) * 4,
            y: state.hy + (Math.random() - 0.5) * 4,
            vx: Math.cos(angle) * spread + (Math.random() - 0.5) * 0.3,
            vy: Math.sin(angle) * spread + (Math.random() - 0.5) * 0.3,
            life: 1,
            decay: 0.012 + Math.random() * 0.018,
            size: 1.2 + Math.random() * 2.6,
            hue: Math.random() < 0.55 ? 'pink' : 'gold',
          });
        }
      }

      // idle sparkle: occasional glint when still
      const idle = performance.now() - state.lastMove;
      if (state.visible && idle > 600 && Math.random() < 0.06) {
        particles.push({
          x: state.hx + (Math.random() - 0.5) * 14,
          y: state.hy + (Math.random() - 0.5) * 14,
          vx: (Math.random() - 0.5) * 0.4,
          vy: (Math.random() - 0.5) * 0.4 - 0.1,
          life: 1,
          decay: 0.02 + Math.random() * 0.02,
          size: 1 + Math.random() * 1.6,
          hue: Math.random() < 0.7 ? 'gold' : 'pink',
        });
      }

      // clear
      ctx.clearRect(0, 0, w, h);
      ctx.globalCompositeOperation = 'lighter';

      // draw + step particles
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        // gentle gravity toward bottom + slow down
        p.vy += 0.02;
        p.vx *= 0.985;
        p.vy *= 0.985;
        p.life -= p.decay;
        if (p.life <= 0) {
          particles.splice(i, 1);
          continue;
        }
        const a = p.life * p.life;
        const r = p.size * (3 + (1 - p.life) * 1.5);
        const g = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, r);
        if (p.hue === 'gold') {
          g.addColorStop(0, `rgba(255, 224, 110, ${0.85 * a})`);
          g.addColorStop(0.5, `rgba(255, 196, 80, ${0.35 * a})`);
          g.addColorStop(1, 'rgba(255, 196, 80, 0)');
        } else {
          g.addColorStop(0, `rgba(255, 168, 246, ${0.85 * a})`);
          g.addColorStop(0.5, `rgba(254, 125, 255, ${0.4 * a})`);
          g.addColorStop(1, 'rgba(254, 125, 255, 0)');
        }
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(p.x, p.y, r, 0, Math.PI * 2);
        ctx.fill();
      }

      // comet head — bright white core fading to gold halo
      if (state.visible) {
        const headAlpha = Math.min(1, 0.4 + speed * 0.18);
        const coreR = 3.2;
        const haloR = 22;
        const halo = ctx.createRadialGradient(
          state.hx,
          state.hy,
          0,
          state.hx,
          state.hy,
          haloR
        );
        halo.addColorStop(0, `rgba(255, 255, 255, ${headAlpha})`);
        halo.addColorStop(0.18, `rgba(255, 240, 170, ${0.7 * headAlpha})`);
        halo.addColorStop(0.5, `rgba(255, 196, 80, ${0.25 * headAlpha})`);
        halo.addColorStop(1, 'rgba(255, 196, 80, 0)');
        ctx.fillStyle = halo;
        ctx.beginPath();
        ctx.arc(state.hx, state.hy, haloR, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = `rgba(255, 255, 255, ${headAlpha})`;
        ctx.beginPath();
        ctx.arc(state.hx, state.hy, coreR, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.globalCompositeOperation = 'source-over';
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseleave', onLeave);
      window.removeEventListener('resize', onResize);
    };
  }, []);

  return <canvas ref={canvasRef} className="comet-cursor" aria-hidden="true" />;
}
