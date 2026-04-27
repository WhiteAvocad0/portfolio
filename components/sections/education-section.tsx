import { education } from '@/lib/data';
import { Section } from '@/components/layout/section';

export function EducationSection() {
  return (
    <Section id="education" number="02" title="Education">
      <div className="max-w-3xl">
        <h3 className="font-display text-2xl md:text-3xl mb-2">{education.institution}</h3>
        <p className="text-fg/80 mb-1">{education.degree}</p>
        <p className="font-mono text-sm text-muted mb-1">
          {education.location} · {education.start} – {education.end}
        </p>
        <p className="font-mono text-sm text-muted mb-10">CGPA {education.cgpa}</p>

        <p className="font-mono text-xs text-muted uppercase tracking-wider mb-3">
          Relevant coursework
        </p>
        <ul className="flex flex-wrap gap-x-2 gap-y-2 text-fg/80">
          {education.coursework.map((c, i) => (
            <li key={c} className="font-mono text-sm">
              {c}
              {i < education.coursework.length - 1 && <span className="text-muted"> ·</span>}
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}
