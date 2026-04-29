import type { Metadata, Viewport } from 'next';
import { Inter, Instrument_Serif, JetBrains_Mono, Varela_Round } from 'next/font/google';
import './globals.css';
import { profile } from '@/lib/data';
import { SITE_URL } from '@/lib/site';

const sans = Inter({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-sans',
  display: 'swap',
});

const display = Instrument_Serif({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-display',
  display: 'swap',
});

const mono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['300', '400'],
  variable: '--font-mono',
  display: 'swap',
});

const round = Varela_Round({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-round',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: 'Jeremy Woon — Final-year IT student & support specialist',
  description:
    'Portfolio of Jeremy Woon, a final-year Information Technology student at APU. 16-week corporate IT support internship at MunchWorld Marketing; Red Hat certified (RH124, RH104). Available for graduate IT support roles from September 2026.',
  openGraph: {
    title: 'Jeremy Woon — Portfolio',
    description:
      'Final-year IT student at APU. 16-week corporate IT support internship; Red Hat certified. Open to graduate IT support roles.',
    url: SITE_URL,
    siteName: 'Jeremy Woon',
    images: [{ url: '/og-image.png', width: 1200, height: 630 }],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Jeremy Woon — Portfolio',
    description:
      'Final-year IT student at APU. 16-week corporate IT support internship; Red Hat certified. Open to graduate IT support roles.',
    images: ['/og-image.png'],
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: '#0B3272',
  colorScheme: 'dark',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${sans.variable} ${display.variable} ${mono.variable} ${round.variable}`}>
      <head>
        <noscript>
          <style>{`.reveal{opacity:1!important;transform:none!important;}.skill-list .bar::after{width:var(--w,60%)!important;}`}</style>
        </noscript>
      </head>
      <body>
        <a className="skip-link" href="#about">Skip to content</a>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Person',
              name: profile.fullName,
              alternateName: profile.name,
              url: SITE_URL,
              email: profile.contact.email,
              jobTitle: 'Information Technology Student',
              alumniOf: {
                '@type': 'CollegeOrUniversity',
                name: 'Asia Pacific University of Technology and Innovation',
              },
              address: {
                '@type': 'PostalAddress',
                addressLocality: 'Kuala Lumpur',
                addressCountry: 'MY',
              },
              knowsLanguage: ['en', 'zh', 'ms'],
            }),
          }}
        />
        {children}
      </body>
    </html>
  );
}
