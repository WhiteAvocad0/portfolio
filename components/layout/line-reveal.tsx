'use client';
import { motion } from 'motion/react';

type Props = {
  lines: string[];
  className?: string;
  delay?: number;
};

export function LineReveal({ lines, className = '', delay = 0 }: Props) {
  return (
    <div className={className}>
      {lines.map((line, i) => (
        <motion.span
          key={i}
          className="block overflow-hidden"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-10%' }}
          transition={{ duration: 0.5, delay: delay + i * 0.08, ease: [0.22, 1, 0.36, 1] }}
        >
          {line}
        </motion.span>
      ))}
    </div>
  );
}
