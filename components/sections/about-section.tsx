import { profile } from '@/lib/data';
import { SectionHead, sectionHeadingId } from './section-head';

export function AboutSection() {
  const { about } = profile;
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
          <div className="empty" />
          <div className="about-body reveal">
            <p>{about.lead}</p>
            <p className="sub muted">{about.note}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
