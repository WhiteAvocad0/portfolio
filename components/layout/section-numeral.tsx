'use client';
import { motion } from 'motion/react';

export function SectionNumeral({ number }: { number: string }) {
  return (
    <motion.span
      aria-hidden="true"
      className="font-mono text-muted text-7xl md:text-[8rem] leading-none tracking-tight select-none"
      initial={{ opacity: 0, scale: 0.92 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: '-15%' }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      {number}
    </motion.span>
  );
}
