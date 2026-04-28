import { projects } from '@/lib/data';

export function ProjectsSection() {
  return (
    <section className="s" id="projects">
      <div className="wrap">
        <div className="head reveal">
          <div className="label">
            <span className="num">04</span>
            <span>Projects</span>
          </div>
          <h2>
            Things I&apos;ve <em>actually</em> built.
          </h2>
        </div>
        <div className="proj-grid">
          <div className="empty" />
          <ul className="proj-list reveal">
            {projects.map((p) => (
              <li key={p.id}>
                <a className="proj-row" href={p.href}>
                  <div className="id">
                    {p.id}
                    <b>{p.year}</b>
                  </div>
                  <div className="body">
                    <h3>
                      {p.title} <small>{p.subtitle}</small>{' '}
                      <span className="arrow">→</span>
                    </h3>
                    <p>{p.description}</p>
                  </div>
                  <div className="stack">{p.stack.join('\n')}</div>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
