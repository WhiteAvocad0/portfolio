'use client';
import { motion } from 'motion/react';
import type { ReactNode } from 'react';

export function HighlighterSwipe({
  children,
  delay = 0.6,
}: {
  children: ReactNode;
  delay?: number;
}) {
  return (
    <span className="relative inline-block">
      <svg
        aria-hidden="true"
        className="absolute inset-x-[-4%] top-[15%] h-[80%] w-[108%] -z-0"
        viewBox="0 0 100 20"
        preserveAspectRatio="none"
      >
        <motion.path
          d="M 0 10 L 100 10"
          stroke="currentColor"
          strokeWidth="20"
          strokeLinecap="butt"
          fill="none"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.5, delay, ease: [0.65, 0, 0.35, 1] }}
        />
      </svg>
      <span className="relative z-10 text-bg">{children}</span>
    </span>
  );
}
