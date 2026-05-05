# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev            # Next.js dev server (http://localhost:3000)
npm run build          # Production build
npm run start          # Run the production build
npm run typecheck      # tsc --noEmit (strict)
npm run lint           # eslint . (Next.js core-web-vitals + TS configs)
npm test               # vitest run (unit + component tests, jsdom)
npm run test:watch     # vitest in watch mode
npm run test:e2e       # Playwright smoke (auto-starts `npm run dev` via webServer)
```

Run a single test file: `npx vitest run tests/components/hero-section.test.tsx`
Run a single Playwright spec: `npx playwright test tests/e2e/smoke.spec.ts`

## Next.js 16 caveat

Per `AGENTS.md`: this is Next.js **16** (not 14/15). APIs, conventions, and file structure may differ from training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing Next-specific code, and heed deprecation notices.

## Architecture

**Single-page editorial portfolio.** Server-rendered. One client component for scroll/reveal effects. No routing.

### Single source of truth: `lib/data.ts`
Every section pulls its copy from `lib/data.ts` (`profile`, `skills`, `trail`, `projects`, `sections`). Edit content here — do not hardcode strings inside section components. The exports are `as const` and the `Skill*`, `TrailEvent`, `Project` types describe their shapes.

### Page composition: `app/page.tsx`
Top-to-bottom: `HeroSection → AboutSection → SkillsSection → TrailSection → ProjectsSection → ContactSection → Footer`, plus `<DepthEffects />` mounted once. Section ids are `hero/about/skills/trail/projects/contact` and the Playwright smoke asserts all six are visible.

### Styling lives in `app/globals.css`, not Tailwind utilities
Tailwind v4 is installed via `@tailwindcss/postcss`, but **the styling surface is ~1000 lines of hand-written CSS** in `app/globals.css` with semantic class names (`.s`, `.wrap`, `.head`, `.reveal`, `.eyebrow`, `.ev`, `.yr`, `.outro`, `.foot`, etc.). Add visual changes there using the existing token system rather than introducing utility classes ad-hoc.

Design tokens live in `:root`:
- **Sky palette** (`--sky`, `--sky-deep`, `--night`, `--bloom`, `--bloom-glow`, `--pulse`, `--pulse-glow`, `--comet`, `--ember`, …) — the FTR-matched dark blue + neon-pink/gold beacon system.
- **Semantic** (`--bg`, `--fg`, `--muted`, `--rule`, …).
- **Fonts**: `next/font` injects `--font-sans` / `--font-display` / `--font-mono` / `--font-round` on `<html>` (set in `app/layout.tsx`); `globals.css` re-exposes them as `--serif` / `--sans` / `--mono` / `--round`. Use the semantic vars.

### `DepthEffects` (`components/effects/depth-effects.tsx`)
The only `'use client'` component. Renders `null`, mounts on the home page, and:
1. Adds an `IntersectionObserver` that adds `.in` to `.reveal` elements and `.in-view` to `[data-bars]` elements — this is what triggers the fade-up reveals and skill-bar fills.
2. Runs an rAF loop that applies parallax transforms to `.hero h1`, `.hero .tagline`, `.hero .id-card`, `.hero .eyebrow`, plus per-section `translateZ` based on viewport position.
3. Respects `prefers-reduced-motion` — disables the rAF loop, leaves the IntersectionObserver running.

A `<noscript>` block in `app/layout.tsx` forces `.reveal` and skill bars visible when JS is disabled.

### Path alias
`@/*` → repo root (configured in `tsconfig.json` and mirrored in `vitest.config.ts`). Always prefer `@/lib/...` and `@/components/...` over relative paths.

### Test setup (`tests/setup.ts`)
jsdom doesn't ship `matchMedia` or `IntersectionObserver` — both are stubbed in the setup file. If a new component depends on another browser API jsdom lacks, stub it here.

### SEO
`app/layout.tsx` inlines a JSON-LD `Person` schema and sets OpenGraph/Twitter metadata. `app/sitemap.ts`, `app/robots.ts`, and `app/icon.svg` are wired up — keep them in sync if URLs change.

## Site-specific design rules (from prior conversations)

- **No custom cursor effects.** Default cursor only. Don't reintroduce comet/parallax cursor without an explicit ask.
- **"Live" indicators use the signal-tower pulse pattern:** rise → peak → fall → BLINK OFF (dim ember) → relight → long ambient dwell. Animate background colour + filter brightness + halo together; **never** animate `opacity` (the trail spine would show through the dot during the off-beat).

## Placeholder assets

`public/resume.pdf` and `public/og-image.png` are placeholders. The repo also contains `resume.html` (a styled HTML CV) — the intent is to export that to PDF and replace `public/resume.pdf`. The contact section's "Download PDF" link points to `/resume.pdf` (asserted in the Playwright smoke).
