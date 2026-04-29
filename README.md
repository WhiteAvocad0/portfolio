# Portfolio

Personal portfolio of Jeremy Woon — final-year IT student at Asia Pacific University of Technology and Innovation (APU), graduating 2026.

A single-page editorial portfolio with serif display type (Instrument Serif), Inter for body, JetBrains Mono for numerals, and Varela Round for labels. Scroll-driven 3D parallax, IntersectionObserver-based reveals, and a transmission-tower timeline motif.

## Stack

- Next.js 16 (App Router, Turbopack) · React 19 · TypeScript
- Plain CSS (CSS custom properties; no utility framework)
- `next/font/google` — Inter, Instrument Serif, JetBrains Mono, Varela Round
- Vitest + @testing-library/react (unit + component)
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
app/
  layout.tsx              Fonts, metadata, JSON-LD, root <html>
  page.tsx                Composes hero + sections + footer + DepthEffects
  globals.css             All styles (no Tailwind/utility framework)
  sitemap.ts · robots.ts · icon.svg
components/
  hero/hero-section.tsx   Page hero with at-a-glance id-card
  sections/
    about-section.tsx     01 · About
    skills-section.tsx    02 · Skills (weighted bars)
    trail-section.tsx     03 · Trail (education + work + certs, merged)
    projects-section.tsx  04 · Projects (list with optional anchor wrap)
    contact-section.tsx   05 · Contact
    footer.tsx
  effects/
    depth-effects.tsx     Client-only: scroll-driven parallax + reveal IO
lib/
  data.ts                 Single source of truth (profile, skills, trail, projects, sectionMeta)
  site.ts                 SITE_URL with NEXT_PUBLIC_SITE_URL override
public/                   avatar.svg · stars.svg · resume.pdf · og-image.png
tests/
  unit/                   Data-shape assertions
  components/             Render assertions for hero + each section
  e2e/                    Playwright smoke
docs/superpowers/         Design spec + implementation plan
```

## Replacing the dummy content

All copy lives in `lib/data.ts`. Edit `profile`, `skills`, `trail`, `projects`, and `sectionMeta` — every component reads from there.

Before launch, also replace:
- `public/resume.pdf` — placeholder is a 15-byte stub PDF
- `public/og-image.png` — placeholder
- `profile.contact.github*` and `profile.contact.linkedin*` — placeholders flagged in `lib/data.ts`
- Set `NEXT_PUBLIC_SITE_URL` if the production host isn't `https://jeremywoon.dev`
