'use client';
import { useEffect, type RefObject } from 'react';
import { useMotionValue, useSpring, type MotionValue } from 'motion/react';

const STRENGTH = 0.25; // fraction of distance the element moves
const MAX_PX = 6; // hard cap so the pull stays subtle

export function useMagnetic(
  ref: RefObject<HTMLElement | null>
): { x: MotionValue<number>; y: MotionValue<number> } {
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const x = useSpring(rawX, { stiffness: 220, damping: 20, mass: 0.4 });
  const y = useSpring(rawY, { stiffness: 220, damping: 20, mass: 0.4 });

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = (e.clientX - cx) * STRENGTH;
      const dy = (e.clientY - cy) * STRENGTH;
      rawX.set(Math.max(-MAX_PX, Math.min(MAX_PX, dx)));
      rawY.set(Math.max(-MAX_PX, Math.min(MAX_PX, dy)));
    };
    const onLeave = () => {
      rawX.set(0);
      rawY.set(0);
    };

    el.addEventListener('mousemove', onMove);
    el.addEventListener('mouseleave', onLeave);
    return () => {
      el.removeEventListener('mousemove', onMove);
      el.removeEventListener('mouseleave', onLeave);
    };
  }, [ref, rawX, rawY]);

  return { x, y };
}
