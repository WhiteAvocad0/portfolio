import { profile } from '@/lib/data';
import { Section } from '@/components/layout/section';
import { MagneticLink } from '@/components/navigation/magnetic-link';

export function ContactSection() {
  const links = [
    { label: profile.contact.email, href: `mailto:${profile.contact.email}`, external: false },
    { label: profile.contact.github, href: profile.contact.githubUrl, external: true },
    { label: profile.contact.linkedin, href: profile.contact.linkedinUrl, external: true },
  ];

  return (
    <Section id="contact" number="07" title="Get in touch">
      <div className="max-w-3xl">
        <ul className="space-y-4 mb-12">
          {links.map(l => (
            <li key={l.href}>
              <MagneticLink
                href={l.href}
                external={l.external}
                className="font-mono text-lg md:text-2xl text-fg underline-offset-4 hover:underline"
              >
                {l.label} →
              </MagneticLink>
            </li>
          ))}
        </ul>

        <a
          href={profile.contact.resumeUrl}
          download
          className="inline-block border border-fg px-6 py-3 font-mono text-sm uppercase tracking-wider transition-colors hover:bg-fg hover:text-bg"
        >
          [ Download Resume PDF ]
        </a>
      </div>
    </Section>
  );
}
