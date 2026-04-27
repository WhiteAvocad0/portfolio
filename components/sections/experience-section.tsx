import { experience } from '@/lib/data';
import { Section } from '@/components/layout/section';

export function ExperienceSection() {
  return (
    <Section id="experience" number="05" title="Experience">
      <div className="max-w-3xl space-y-12">
        {experience.map(e => (
          <article key={`${e.company}-${e.start}`}>
            <h3 className="font-display text-2xl md:text-3xl mb-1">
              {e.role} — {e.company}
            </h3>
            <p className="font-mono text-sm text-muted mb-6">
              {e.location} · {e.start} – {e.end}
            </p>
            <ul className="space-y-3 text-fg/80">
              {e.bullets.map((b, i) => (
                <li key={i} className="flex gap-3">
                  <span className="font-mono text-muted shrink-0">·</span>
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </Section>
  );
}
