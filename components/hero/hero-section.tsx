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
              A final-year IT student building{' '}
              <span className="swipe">{profile.swipeWord}</span> for the web — based in {profile.city}.
            </p>
          </div>

          <aside className="id-card reveal" aria-label="At a glance">
            {/* Replace /public/avatar.svg with your photo (square, ~400×400+).
                Keep the file name avatar.svg, or swap the src below. */}
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
              <span>At a glance</span>
            </div>
            <dl>
              <dt>Status</dt>
              <dd className="live">{profile.status}</dd>
              <dt>Based</dt>
              <dd>{profile.location}</dd>
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
