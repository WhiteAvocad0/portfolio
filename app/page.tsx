import { HeroSection } from '@/components/hero/hero-section';
import { AboutSection } from '@/components/sections/about-section';
import { SkillsSection } from '@/components/sections/skills-section';
import { TrailSection } from '@/components/sections/trail-section';
import { ProjectsSection } from '@/components/sections/projects-section';
import { ContactSection } from '@/components/sections/contact-section';
import { Footer } from '@/components/sections/footer';
import { DepthEffects } from '@/components/effects/depth-effects';

export default function Home() {
  return (
    <>
      <main>
        <HeroSection />
        <AboutSection />
        <SkillsSection />
        <div className="tower-zone">
          <aside className="transmission-tower" aria-hidden />
          <TrailSection />
          <ProjectsSection />
          <ContactSection />
        </div>
      </main>
      <Footer />
      <DepthEffects />
    </>
  );
}
