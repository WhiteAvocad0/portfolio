# Portfolio

Personal portfolio of Jeremy Woon — final-year IT student at Asia Pacific University of Technology and Innovation (APU), graduating 2026.

**Live:** https://portfolio-xi-six-56.vercel.app

A single-page editorial portfolio built with monochrome typography (Instrument Serif + Inter + JetBrains Mono), brutalist section numerals, and quiet interaction details (custom cursor, magnetic links, scroll-driven reveals).

## Stack

- Next.js 16 (App Router) · TypeScript
- Tailwind CSS v4 (CSS `@theme` tokens)
- Framer Motion (`motion/react`)
- Vitest + @testing-library/react
- Playwright (smoke E2E)
- Vercel

## Local development

```bash
npm install
npm run dev
```

Open <http://localhost:3000>.

## Verification

```bash
npm run typecheck
npm run lint
npm test
npm run test:e2e
npm run build
```

## Project structure

```
app/                    Next.js App Router (layout, page, sitemap, robots, icon)
components/
  hero/                 NameReveal · HighlighterSwipe · StatusBlock · HeroSection
  layout/               Section · SectionNumeral · LineReveal
  navigation/           CustomCursor · MagneticLink · ScrollProgress
  sections/             About · Education · Skills · Projects · Experience · Certifications · Contact · Footer
lib/
  data.ts               Single source of truth for all content (swap dummy → real here)
  hooks/                useTouchDevice · useMousePosition · useMagnetic · useReducedMotion
public/                 resume.pdf (placeholder) · og-image.png (placeholder)
tests/
  unit/                 hooks + data
  components/           component-level tests
  e2e/                  Playwright smoke
docs/superpowers/       design spec + implementation plan
```

## Replacing the dummy content

All copy lives in `lib/data.ts`. Edit the `profile`, `education`, `skills`, `projects`, `experience`, and `certifications` exports — every section reads from there.

For the resume PDF and OG image, replace `public/resume.pdf` and `public/og-image.png` with real files (same paths).
