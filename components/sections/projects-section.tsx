import { projects, type Project } from '@/lib/data';
import { SectionHead, sectionHeadingId } from './section-head';

function ProjectRowBody({ p }: { p: Project }) {
  return (
    <>
      <div className="id">
        {p.id}
        <b>{p.year}</b>
      </div>
      <div className="body">
        <h3>
          {p.title} <small>{p.subtitle}</small>
          {p.href && <> <span className="arrow">→</span></>}
        </h3>
        <p>{p.description}</p>
      </div>
      <div className="stack">{p.stack.join('\n')}</div>
    </>
  );
}

export function ProjectsSection() {
  const headingId = sectionHeadingId('projects');
  return (
    <section className="s" id="projects" aria-labelledby={headingId}>
      <div className="wrap">
        <SectionHead section="projects">
          <h2 id={headingId}>
            Things I&apos;ve <em>actually</em> built.
          </h2>
        </SectionHead>
        <div className="proj-grid">
          <div className="empty" />
          <ul className="proj-list reveal reveal--settle">
            {projects.map((p) => (
              <li key={p.id}>
                {p.href ? (
                  <a
                    className="proj-row"
                    href={p.href}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <ProjectRowBody p={p} />
                  </a>
                ) : (
                  <div className="proj-row">
                    <ProjectRowBody p={p} />
                  </div>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
