import type { Metadata } from 'next';
import { Inter, Instrument_Serif, JetBrains_Mono } from 'next/font/google';
import './globals.css';

const sans = Inter({
  subsets: ['latin'],
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
  variable: '--font-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://jeremywoon.dev'),
  title: 'Jeremy Woon — Final-year IT student & developer',
  description:
    'Portfolio of Jeremy Woon, a final-year Information Technology student at APU. Available for graduate SWE roles starting September 2026.',
  openGraph: {
    title: 'Jeremy Woon — Portfolio',
    description: 'Final-year IT student at APU. Open to graduate SWE roles.',
    url: 'https://jeremywoon.dev',
    siteName: 'Jeremy Woon',
    images: [{ url: '/og-image.png', width: 1200, height: 630 }],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Jeremy Woon — Portfolio',
    description: 'Final-year IT student at APU. Open to graduate SWE roles.',
    images: ['/og-image.png'],
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${sans.variable} ${display.variable} ${mono.variable}`}>
      <head>
        <noscript>
          <style>{`.reveal{opacity:1!important;transform:none!important;}.skill-list .bar::after{width:var(--w,60%)!important;}`}</style>
        </noscript>
      </head>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Person',
              name: 'Jeremy Woon',
              url: 'https://jeremywoon.dev',
              jobTitle: 'Software Engineering Student',
              alumniOf: {
                '@type': 'CollegeOrUniversity',
                name: 'Asia Pacific University of Technology and Innovation',
              },
              address: {
                '@type': 'PostalAddress',
                addressLocality: 'Kuala Lumpur',
                addressCountry: 'MY',
              },
            }),
          }}
        />
        {children}
      </body>
    </html>
  );
}
