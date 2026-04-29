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
            {skills.map((group) => (
              <div className="skill-group" key={group.title}>
                <div className="gtitle">{group.title}</div>
                <ul className="skill-list" data-bars>
                  {group.items.map((item) => (
                    <li key={item.name}>
                      <div className="row">
                        <span className="name">{item.name}</span>
                        <span className="yrs">{item.years}</span>
                      </div>
                      <div
                        className="bar"
                        style={{ '--w': `${item.pct}%` } as React.CSSProperties}
                      />
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
