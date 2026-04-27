import { profile } from '@/lib/data';
import { NameReveal } from './name-reveal';
import { HighlighterSwipe } from './highlighter-swipe';
import { StatusBlock } from './status-block';

export function HeroSection() {
  return (
    <section
      id="hero"
      aria-label="Introduction"
      className="relative min-h-screen flex flex-col justify-center px-6 md:px-20"
    >
      <div className="mx-auto w-full max-w-(--container-page)">
        <p className="font-display text-2xl md:text-3xl text-muted mb-6">{profile.intro}</p>
        <h1 className="font-display text-6xl md:text-9xl leading-[0.95] tracking-tight mb-10 md:mb-12">
          <NameReveal text={profile.name} />.
        </h1>
        <p className="font-display text-2xl md:text-4xl leading-snug max-w-3xl mb-12 md:mb-16">
          {profile.tagline}{' '}
          <HighlighterSwipe>{profile.roleHighlight}</HighlighterSwipe>{' '}
          {profile.taglineSuffix}
        </p>
        <StatusBlock text={profile.currently} />
      </div>

      <div className="mx-auto w-full max-w-(--container-page) px-6 md:px-20 absolute inset-x-0 bottom-8 flex justify-between font-mono text-xs text-muted">
        <span>01 / 08</span>
        <span>{profile.timezone}</span>
      </div>
    </section>
  );
}
