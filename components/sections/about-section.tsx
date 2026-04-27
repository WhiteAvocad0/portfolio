import { profile } from '@/lib/data';
import { Section } from '@/components/layout/section';
import { LineReveal } from '@/components/layout/line-reveal';

export function AboutSection() {
  // Split the about paragraph into sentences for line reveal
  const lines = profile.about.match(/[^.!?]+[.!?]+\s*/g)?.map(s => s.trim()) ?? [profile.about];

  return (
    <Section id="about" number="01" title="About">
      <LineReveal
        lines={lines}
        className="font-display text-2xl md:text-3xl leading-snug max-w-3xl text-fg"
      />
    </Section>
  );
}
