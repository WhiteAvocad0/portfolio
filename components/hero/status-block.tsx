'use client';
import { motion } from 'motion/react';

export function StatusBlock({ text }: { text: string }) {
  return (
    <div className="flex items-start gap-3 font-mono text-sm text-muted max-w-prose">
      <motion.span
        aria-hidden="true"
        className="mt-1.5 inline-block h-2 w-2 rounded-full bg-fg"
        animate={{ opacity: [1, 0.3, 1] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
      />
      <span>
        <span className="text-fg">Currently</span> — {text}
      </span>
    </div>
  );
}
