import { profile } from '@/lib/data';
import { SectionHead, sectionHeadingId } from './section-head';

export function AboutSection() {
  const { about, station } = profile;
  const headingId = sectionHeadingId('about');
  return (
    <section className="s" id="about" aria-labelledby={headingId}>
      <div className="wrap">
        <SectionHead section="about">
          <h2 id={headingId}>
            Code that ships, <em>quietly.</em>
          </h2>
        </SectionHead>
        <div className="about-grid">
          <aside className="callsign-card" aria-label="At a glance">
            <div className="head">
              <span className="dot" aria-hidden />
              <span className="t">AT A GLANCE</span>
            </div>
            <dl>
              <dt>Role</dt>
              <dd>{station.role}</dd>
              <dt>Studies</dt>
              <dd>{station.studies}</dd>
              <dt>Based in</dt>
              <dd>{profile.location}</dd>
              <dt>Timezone</dt>
              <dd>{station.timezone}</dd>
              <dt>Available</dt>
              <dd className="live">{station.available}</dd>
              <dt>Focus</dt>
              <dd>{station.focus}</dd>
            </dl>
            <div className="bcast">
              <span className="lab">Currently working with</span>
              <ul>
                {station.broadcasting.map((t) => (
                  <li key={t}>{t}</li>
                ))}
              </ul>
            </div>
          </aside>
          <div className="about-body reveal reveal--recede">
            <p>{about.lead}</p>
            <p className="sub muted">{about.note}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
