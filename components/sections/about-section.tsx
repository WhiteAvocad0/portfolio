import { profile } from '@/lib/data';

export function AboutSection() {
  const { about } = profile;
  return (
    <section className="s" id="about">
      <div className="wrap">
        <div className="head reveal">
          <div className="label">
            <span className="num">01</span>
            <span>About</span>
          </div>
          <h2>
            Code that ships, <em>quietly.</em>
          </h2>
        </div>
        <div className="about-grid">
          <div className="empty" />
          <div className="about-body reveal">
            <p>{about.lead}</p>
            <p className="sub">{about.body}</p>
            <p className="sub muted">{about.note}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
