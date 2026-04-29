import { profile } from '@/lib/data';

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="foot">
      <span>
        © {year} {profile.name}
      </span>
      <span className="sig" aria-hidden="true">
        {profile.name}
      </span>
    </footer>
  );
}
