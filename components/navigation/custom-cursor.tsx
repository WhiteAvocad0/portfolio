'use client';
import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'motion/react';
import { useTouchDevice } from '@/lib/hooks/use-touch-device';
import { useReducedMotion } from '@/lib/hooks/use-reduced-motion';

export function CustomCursor() {
  const isTouch = useTouchDevice();
  const reduced = useReducedMotion();
  const [hovering, setHovering] = useState(false);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 600, damping: 40, mass: 0.3 });
  const sy = useSpring(y, { stiffness: 600, damping: 40, mass: 0.3 });

  useEffect(() => {
    if (isTouch || reduced) return;

    document.body.classList.add('has-custom-cursor');

    const onMove = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };

    const interactiveSelector = 'a, button, [role="button"], [data-cursor="hover"]';
    const onOver = (e: MouseEvent) => {
      if ((e.target as Element).closest(interactiveSelector)) setHovering(true);
    };
    const onOut = (e: MouseEvent) => {
      if ((e.target as Element).closest(interactiveSelector)) setHovering(false);
    };

    window.addEventListener('mousemove', onMove, { passive: true });
    document.addEventListener('mouseover', onOver);
    document.addEventListener('mouseout', onOut);
    return () => {
      document.body.classList.remove('has-custom-cursor');
      window.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseover', onOver);
      document.removeEventListener('mouseout', onOut);
    };
  }, [isTouch, reduced, x, y]);

  if (isTouch || reduced) return null;

  return (
    <>
      <motion.div
        aria-hidden="true"
        className="pointer-events-none fixed top-0 left-0 z-50 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-fg"
        style={{ x: sx, y: sy }}
      />
      <motion.div
        aria-hidden="true"
        className="pointer-events-none fixed top-0 left-0 z-50 -translate-x-1/2 -translate-y-1/2 rounded-full border border-fg"
        style={{ x: sx, y: sy }}
        animate={{ width: hovering ? 32 : 0, height: hovering ? 32 : 0, opacity: hovering ? 1 : 0 }}
        transition={{ duration: 0.2 }}
      />
    </>
  );
}
