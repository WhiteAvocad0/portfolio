import { profile } from '@/lib/data';

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="foot">
      <span className="signoff">
        <span className="who">{profile.name}</span>
        <span className="sep" aria-hidden>·</span>
        <span className="tx">JW-01 · STN-KUL · 73° · END OF TRANSMISSION</span>
        <em className="cur" aria-hidden>▮</em>
      </span>
      <span className="meta">© {year} {profile.name}</span>
    </footer>
  );
}
