import { HeroSection } from '@/components/hero/hero-section';
import { AboutSection } from '@/components/sections/about-section';
import { SkillsSection } from '@/components/sections/skills-section';
import { TrailSection } from '@/components/sections/trail-section';
import { ProjectsSection } from '@/components/sections/projects-section';
import { ContactSection } from '@/components/sections/contact-section';
import { Footer } from '@/components/sections/footer';
import { DepthEffects } from '@/components/effects/depth-effects';
import { CometCursor } from '@/components/effects/comet-cursor';

export default function Home() {
  return (
    <>
      <main>
        <HeroSection />
        <AboutSection />
        <SkillsSection />
        <TrailSection />
        <ProjectsSection />
        <ContactSection />
      </main>
      <Footer />
      <DepthEffects />
      <CometCursor />
    </>
  );
}
