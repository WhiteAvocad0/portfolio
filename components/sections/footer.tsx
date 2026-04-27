import { profile } from '@/lib/data';

export function Footer() {
  const year = new Date().getFullYear();
  const lastUpdated = new Date().toLocaleDateString('en-US', {
    month: 'long',
    year: 'numeric',
  });
  return (
    <footer className="border-t border-border">
      <div className="mx-auto max-w-(--container-page) px-6 md:px-20 py-8 flex flex-col md:flex-row justify-between gap-4 font-mono text-xs text-muted">
        <span>
          © {year} {profile.name}
        </span>
        <span>Built with Next.js · Last updated {lastUpdated}</span>
      </div>
    </footer>
  );
}
