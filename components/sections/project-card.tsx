'use client';
import { motion } from 'motion/react';
import type { Project } from '@/lib/data';

export function ProjectCard({ project }: { project: Project }) {
  return (
    <motion.article
      className="group relative border border-border p-6 md:p-8 transition-colors hover:border-fg"
      whileHover={{ y: -2 }}
      transition={{ duration: 0.2 }}
    >
      <div className="flex items-baseline justify-between mb-4">
        <span className="font-mono text-xs text-muted transition-transform group-hover:scale-105">
          {project.id}
        </span>
      </div>
      <h3 className="font-display text-3xl md:text-4xl mb-2">
        {project.name}{' '}
        <span className="inline-block transition-transform group-hover:translate-x-1.5">→</span>
      </h3>
      <p className="text-fg/80 mb-2 max-w-prose">{project.tagline}</p>
      <p className="text-muted text-sm mb-6 max-w-prose">{project.description}</p>

      <div className="flex flex-wrap gap-x-3 gap-y-1 mb-6">
        {project.stack.map(s => (
          <span key={s} className="font-mono text-xs text-muted">
            {s}
          </span>
        ))}
      </div>

      <div className="flex gap-6">
        {project.links.map(l => (
          <a
            key={l.label}
            href={l.href}
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-sm text-fg underline-offset-4 hover:underline"
          >
            → {l.label}
          </a>
        ))}
      </div>
    </motion.article>
  );
}
