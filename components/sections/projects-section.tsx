import { projects } from '@/lib/data';
import { Section } from '@/components/layout/section';
import { ProjectCard } from './project-card';

export function ProjectsSection() {
  return (
    <Section id="projects" number="04" title="Selected projects">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
        {projects.map(p => (
          <ProjectCard key={p.id} project={p} />
        ))}
      </div>
    </Section>
  );
}
