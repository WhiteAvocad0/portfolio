import { skills } from '@/lib/data';
import { Section } from '@/components/layout/section';

export function SkillsSection() {
  return (
    <Section id="skills" number="03" title="Skills">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-14 max-w-4xl">
        {skills.map(group => (
          <div key={group.group}>
            <p className="font-mono text-xs text-muted uppercase tracking-wider mb-4">
              {group.group}
            </p>
            <ul className="space-y-2">
              {group.items.map(item => (
                <li key={item} className="font-display text-xl md:text-2xl">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </Section>
  );
}
