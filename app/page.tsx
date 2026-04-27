import { HeroSection } from '@/components/hero/hero-section';
import { AboutSection } from '@/components/sections/about-section';
import { EducationSection } from '@/components/sections/education-section';
import { SkillsSection } from '@/components/sections/skills-section';

export default function Home() {
  return (
    <main>
      <HeroSection />
      <AboutSection />
      <EducationSection />
      <SkillsSection />
    </main>
  );
}
