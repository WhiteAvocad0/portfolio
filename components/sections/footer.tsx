import { profile } from '@/lib/data';

export function Footer() {
  const year = new Date().getFullYear();
  const lastUpdated = new Date().toLocaleDateString('en-US', {
    month: 'short',
    year: 'numeric',
  });
  return (
    <footer className="foot">
      <span>
        © {year} {profile.name}
      </span>
      <span className="sig">{profile.name}</span>
      <span>Built with Next.js · Last updated {lastUpdated}</span>
    </footer>
  );
}
