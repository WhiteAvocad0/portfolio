import { skills } from '@/lib/data';

export function SkillsSection() {
  return (
    <section className="s" id="skills">
      <div className="wrap">
        <div className="head reveal">
          <div className="label">
            <span className="num">02</span>
            <span>Skills</span>
          </div>
          <h2>
            What I <em>actually</em> use.
          </h2>
        </div>
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
