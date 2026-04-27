'use client';
import { useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { sectionList } from '@/lib/data';

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const [active, setActive] = useState<{ number: string; label: string } | null>(null);

  useEffect(() => {
    const ids = sectionList.map(s => s.label.toLowerCase());
    const observer = new IntersectionObserver(
      entries => {
        const visible = entries.filter(e => e.isIntersecting);
        if (visible.length === 0) return;
        // pick the entry closest to the top of the viewport
        visible.sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        const id = visible[0].target.id;
        const match = sectionList.find(s => s.label.toLowerCase() === id);
        if (match) setActive(match);
      },
      { rootMargin: '-30% 0px -60% 0px', threshold: 0 }
    );
    ids.forEach(id => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <motion.div
        aria-hidden="true"
        className="fixed top-0 right-0 z-40 h-screen w-px origin-top bg-fg"
        style={{ scaleY }}
      />
      {active && active.number !== '00' && (
        <motion.div
          className="fixed top-6 right-6 z-40 font-mono text-xs text-muted"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          → {active.number} / {active.label}
        </motion.div>
      )}
    </>
  );
}
