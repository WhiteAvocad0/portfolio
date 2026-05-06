import { Fragment } from 'react';
import { trail } from '@/lib/data';
import { SectionHead, sectionHeadingId } from './section-head';

export function TrailSection() {
  const headingId = sectionHeadingId('trail');
  return (
    <section className="s" id="trail" aria-labelledby={headingId}>
      <div className="wrap">
        <SectionHead section="trail">
          <h2 id={headingId}>
            Education, work, <em>milestones.</em>
          </h2>
        </SectionHead>
        <div className="trail-grid">
          <div className="empty" />
          <div className="trail reveal reveal--sweep">
            {trail.map((ev) => (
              <article
                className={ev.now ? 'ev now' : 'ev'}
                key={`${ev.title}-${ev.yearMain}`}
              >
                <div className="yr">
                  {ev.yearMain}
                  <b>{ev.yearTag}</b>
                </div>
                <div className="kind">{ev.kind}</div>
                <h3>{ev.title}</h3>
                <p className="co">
                  {ev.org.split(' · ').map((part, i) => (
                    <Fragment key={i}>
                      {i > 0 && <span className="sep">·</span>}
                      {part}
                    </Fragment>
                  ))}
                </p>
                {(ev.body || ev.bullets || ev.tags) && (
                  <div className="body">
                    {ev.body && <p>{ev.body}</p>}
                    {ev.bullets && (
                      <ul>
                        {ev.bullets.map((b, i) => (
                          <li key={i}>{b}</li>
                        ))}
                      </ul>
                    )}
                    {ev.tags && (
                      <div className="meta-tags">
                        {ev.tags.map((t) => (
                          <span key={t}>{t}</span>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
