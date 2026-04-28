import { profile } from '@/lib/data';

export function HeroSection() {
  const { contact, hero } = profile;
  return (
    <header className="hero" id="hero">
      <div className="wrap">
        <div className="eyebrow reveal">
          <span>{profile.eyebrow}</span>
          <span>—</span>
          <b>{profile.available}</b>
        </div>

        <div className="grid">
          <div>
            <h1 className="reveal">
              Jeremy<br />
              <em>Woon.</em>
            </h1>
            <p className="tagline reveal">
              A final-year IT student building{' '}
              <span className="swipe">{profile.swipeWord}</span> for the web — based in {profile.city}.
            </p>
          </div>

          <aside className="id-card reveal" aria-label="At a glance">
            <div className="head">
              <span>At a glance</span>
              <b>{profile.versionTag}</b>
            </div>
            <dl>
              <dt>Role</dt>
              <dd>{profile.role}</dd>
              <dt>Status</dt>
              <dd className="live">{profile.status}</dd>
              <dt>Based</dt>
              <dd>{profile.location}</dd>
              <dt>Stack</dt>
              <dd>{profile.shortStack}</dd>
              <dt>Email</dt>
              <dd>
                <a href={`mailto:${contact.email}`}>{contact.email}</a>
              </dd>
              <dt>Resume</dt>
              <dd>
                <a href={contact.resumeUrl} download>
                  Download PDF →
                </a>
              </dd>
            </dl>
          </aside>
        </div>

        <div className="strip reveal">
          <div>
            Education<b>{hero.education}</b>
          </div>
          <div>
            Focus<b>{hero.focus}</b>
          </div>
          <div>
            CGPA<b>{hero.cgpa}</b>
          </div>
          <div>
            Find me
            <b>
              <a href={contact.githubUrl} target="_blank" rel="noopener noreferrer">
                {contact.github}
              </a>
            </b>
          </div>
        </div>
      </div>
    </header>
  );
}
