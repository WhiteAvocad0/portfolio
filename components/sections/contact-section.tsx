import { profile, sectionMeta } from '@/lib/data';

export function ContactSection() {
  const { contact, cta } = profile;
  const meta = sectionMeta.contact;
  const links = [
    { label: 'Email', href: `mailto:${contact.email}`, text: `${contact.email} →`, external: false },
    { label: 'GitHub', href: contact.githubUrl, text: `${contact.github} →`, external: true },
    { label: 'LinkedIn', href: contact.linkedinUrl, text: `${contact.linkedin} →`, external: true },
    { label: 'Resume', href: contact.resumeUrl, text: 'Download PDF →', external: false, download: true },
  ];

  return (
    <section className="outro" id="contact">
      <div className="wrap">
        <div className="head reveal" style={{ marginBottom: 24 }}>
          <div className="label">
            <span className="num">{meta.number}</span>
            <span>{meta.label}</span>
          </div>
          <span />
        </div>
        <h2 className="reveal">
          Let&apos;s <em>talk.</em>
        </h2>
        <div className="row">
          <ul className="links reveal">
            {links.map((l) => (
              <li key={l.label}>
                <span className="lab">{l.label}</span>
                <a
                  href={l.href}
                  {...(l.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                  {...(l.download ? { download: true } : {})}
                >
                  {l.text}
                </a>
              </li>
            ))}
          </ul>
          <aside className="cta-card reveal">
            <div className="lab">{cta.label}</div>
            <div className="ti">{cta.title}</div>
            <a href={`mailto:${contact.email}`}>
              {cta.action} <span className="arr">→</span>
            </a>
          </aside>
        </div>
      </div>
    </section>
  );
}
