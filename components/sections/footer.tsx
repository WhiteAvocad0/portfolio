import { profile } from '@/lib/data';

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="foot">
      <span className="signoff">
        <span className="who">{profile.name}</span>
        <span className="sep" aria-hidden>·</span>
        <span className="tx">Kuala Lumpur · UTC+8</span>
        <em className="cur" aria-hidden>▮</em>
      </span>
      <span className="meta">© {year} {profile.name}</span>
    </footer>
  );
}
