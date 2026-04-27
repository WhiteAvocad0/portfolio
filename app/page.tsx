import { HeroSection } from '@/components/hero/hero-section';
import { AboutSection } from '@/components/sections/about-section';
import { EducationSection } from '@/components/sections/education-section';
import { SkillsSection } from '@/components/sections/skills-section';
import { ProjectsSection } from '@/components/sections/projects-section';
import { ExperienceSection } from '@/components/sections/experience-section';
import { CertificationsSection } from '@/components/sections/certifications-section';

export default function Home() {
  return (
    <main>
      <HeroSection />
      <AboutSection />
      <EducationSection />
      <SkillsSection />
      <ProjectsSection />
      <ExperienceSection />
      <CertificationsSection />
    </main>
  );
}
