import { skills } from '@/lib/data';
import { SectionHead, sectionHeadingId } from './section-head';

export function SkillsSection() {
  const headingId = sectionHeadingId('skills');
  return (
    <section className="s" id="skills" aria-labelledby={headingId}>
      <div className="wrap">
        <SectionHead section="skills">
          <h2 id={headingId}>
            What I <em>actually</em> use.
          </h2>
        </SectionHead>
        <div className="skills-grid">
          <div className="empty" />
          <div className="skills-cols reveal">
            {skills.map((group, gi) => (
              <div className="skill-group" key={group.title}>
                <div className="gtitle">
                  <span>{group.title}</span>
                  <em>KIT · {String(gi + 1).padStart(2, '0')}</em>
                </div>
                <ul className="skill-list" data-bars>
                  {group.items.map((item) => {
                    const lit = Math.round(item.pct / 10);
                    return (
                      <li key={item.name}>
                        <div className="row">
                          <span className="name">{item.name}</span>
                          <span className="yrs">{item.years}</span>
                        </div>
                        <div
                          className="bar"
                          style={{ '--w': `${item.pct}%` } as React.CSSProperties}
                          data-pct={item.pct}
                        >
                          {Array.from({ length: 10 }).map((_, i) => (
                            <span key={i} {...(i < lit ? { 'data-on': '' } : {})} />
                          ))}
                          <em>{item.pct}</em>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
