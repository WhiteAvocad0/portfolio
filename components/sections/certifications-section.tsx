import { certifications } from '@/lib/data';
import { Section } from '@/components/layout/section';

export function CertificationsSection() {
  return (
    <Section id="certifications" number="06" title="Certifications & achievements">
      <ul className="max-w-3xl divide-y divide-border">
        {certifications.map(c => (
          <li
            key={`${c.year}-${c.title}`}
            className="grid grid-cols-[6rem_1fr] gap-6 py-4"
          >
            <span className="font-mono text-sm text-muted">{c.year}</span>
            <span className="font-display text-xl md:text-2xl">{c.title}</span>
          </li>
        ))}
      </ul>
    </Section>
  );
}
