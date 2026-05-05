import Image from 'next/image';
import { profile } from '@/lib/data';

export function HeroSection() {
  const { contact } = profile;
  return (
    <header className="hero" id="hero">
      <div className="wrap">
        <div className="eyebrow reveal">
          <b>{profile.available}</b>
        </div>

        <div className="grid">
          <div>
            <h1 className="reveal">
              Jeremy<br />
              <em>Woon.</em>
            </h1>
            <p className="tagline reveal">
              A final-year IT student supporting{' '}
              <span className="swipe">{profile.swipeWord}</span> systems — based in {profile.city}.
            </p>
          </div>

          <aside className="id-card reveal" aria-labelledby="id-card-heading" aria-label="At a glance">
            <div className="avatar">
              <Image
                src="/avatar.svg"
                alt={`Profile photo of ${profile.name}`}
                width={72}
                height={72}
                priority
              />
            </div>
            <div className="head">
              <span className="dot" aria-hidden />
              <span id="id-card-heading" className="t">OPEN FOR WORK</span>
            </div>
            <dl>
              <dt>Status</dt>
              <dd className="live">{profile.status}</dd>
              <dt>Based in</dt>
              <dd>{profile.location}</dd>
              <dt>Languages</dt>
              <dd>{profile.languages}</dd>
              <dt>Email</dt>
              <dd>
                <a href={`mailto:${contact.email}`}>{contact.email}</a>
              </dd>
            </dl>
          </aside>
        </div>
      </div>
    </header>
  );
}
