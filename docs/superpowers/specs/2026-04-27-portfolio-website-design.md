---
title: Portfolio Website — Design Spec
date: 2026-04-27
status: approved (brainstorming)
owner: Jeremy Woon
---

# Portfolio Website — Design Spec

## 1. Purpose & Audience

A single-page personal portfolio for **Jeremy Woon**, a final-year Information Technology student at Asia Pacific University of Technology and Innovation (APU) graduating in 2026. The site is read-only and exists to support a graduate-role job search.

**Primary audience:** Recruiters and hiring engineers reviewing fresh-graduate SWE/IT candidates in Malaysia and the broader APAC region.

**Success criteria:**
- Recruiters can scan name, role, education, and skills within ~10 seconds
- The site reads as polished and intentional — distinguishing it from template-based portfolios
- A downloadable resume PDF is one click away
- Lighthouse scores: Performance ≥ 95, Accessibility ≥ 95, SEO ≥ 95
- First Contentful Paint < 1.2s on 4G

**Out of scope:**
- Multi-page navigation, blog, CMS
- Authenticated areas, comments, contact forms
- Dark/light theme toggle
- Internationalisation
- Analytics dashboards beyond a basic privacy-friendly counter (deferred)

## 2. High-Level Decisions

| Area | Decision |
|---|---|
| Page structure | Single page, top-to-bottom scroll, no routing |
| Aesthetic | Editorial / magazine (Approach A) with brutalist structural accents (Approach C) — calm at rest, rewarding when interacted with |
| Theme | Light only — `#FAFAF7` bg, `#0A0A0A` fg, `#737373` muted |
| Tech stack | Next.js 15 (App Router) + TypeScript + Tailwind CSS + Framer Motion |
| Hosting | Vercel (free tier), `git push` → auto-deploy |
| Content | Dummy data first, structured for easy real-data swap |
| Mobile | Fully responsive (breakpoints sm 640 / md 768 / lg 1024 / xl 1280) |

### Why Next.js (vs Astro / Vite)
Next.js is the most-requested framework in Malaysian SWE/IT job descriptions. The portfolio itself functions as a recruiter signal — using Next.js demonstrates familiarity with the dominant stack. Astro would be technically superior for a static content page, but the recruiter-recognition trade-off pushes the decision toward Next.js for this audience.

## 3. Visual System

### Typography
- **Display serif:** Instrument Serif — hero name, section titles
- **Body sans:** Inter — paragraphs, labels, navigation
- **Mono:** JetBrains Mono — section numerals (`01`, `02`…), stack tags, metadata, footer

All three are free Google Fonts loaded via `next/font` (subset: latin) for zero layout shift.

### Color tokens
```
--bg:        #FAFAF7   (off-white)
--fg:        #0A0A0A   (near-black)
--muted:     #737373   (60% grey)
--border:    #E5E5E5   (hairline)
--accent:    #0A0A0A   (highlighter swipe — same as fg)
```
Single accent moment: a black highlighter swipe behind one word in the hero (e.g., *"software"*). No other color in the palette.

### Grid & spacing
- 12-column grid, `max-width: 1280px`, side gutters 24px (mobile) → 80px (desktop)
- Vertical section padding: 160px desktop / 80px mobile
- Vertical rhythm in 8px increments
- Section numerals (`01`, `02`…) live in the left gutter on desktop, ~120px tall, mono — collapse above the section title on mobile

## 4. Page Structure (top → bottom)

```
00. Hero            — name, role, location, "Currently…" status, scroll cue
01. About           — 120-word narrative paragraph
02. Education       — APU, course, expected grad, coursework, CGPA
03. Skills          — three columns: Languages / Frameworks / Tools
04. Projects        — 3 cards (full-bleed on mobile, grid on desktop)
05. Experience      — 1 internship entry
06. Certifications  — list with years
07. Contact         — magnetic email + social links + Resume PDF download
    Footer          — copyright, "built with Next.js, last updated"
```

## 5. Signature Interactions (5 total)

1. **Custom cursor + magnetic links** — 12px dot follows cursor, expands to 32px ring over interactive elements; links nudge 4–6px toward the cursor. Hidden on touch devices via `pointer: coarse` media query.

2. **Hero entrance choreography** (one-time, on load, ~1.2s)
   - Name letters reveal letter-by-letter, 30ms stagger
   - Highlighter swipe draws across the accented word (SVG `<path>` with `pathLength` animation)
   - "Currently:" status dot pulses indefinitely after the sequence settles

3. **Scroll-driven section reveals** — using Framer Motion's `useInView` and `whileInView`:
   - Numeral scales from 0.92 → 1.0 on enter
   - Title fades + translates up 24px
   - Body paragraphs split into lines, reveal line-by-line at 80ms stagger
   - Total reveal ~600ms per section

4. **Project card micro-interactions** — at rest: clean grid, mono stack tags, thin border. On hover: lifts 2px, border darkens, `→` arrow slides 6px right, project number (`P/01`) scales to 1.05. No image zoom.

5. **Hairline scroll progress** — 1px black line on the right edge fills top-to-bottom; small mono indicator (`→ 04 / Projects`) sticky in the top-right after the user scrolls past the hero.

### Explicitly excluded
- Horizontal-scroll skill marquee (overused, breaks calm rhythm)
- Parallax / particle backgrounds (cliché)
- Page transitions (single page)
- Dark/light toggle
- Sound effects
- WebGL / 3D

## 6. Section Content (dummy data)

### 00. Hero
> Hi, I'm
> **Jeremy Woon.**
>
> A final-year IT student building **software** for the web — based in Kuala Lumpur, Malaysia.
>
> *(The word "software" gets the highlighter swipe — see `roleHighlight` in §8. Brackets used elsewhere in this spec around that word are shorthand, not literal characters to render.)*
>
> ● **Currently** — Final-year project on real-time anomaly detection. Open to graduate SWE roles starting Sept 2026.

Bottom-left: `01 / 08` (mono). Bottom-right: `KL · GMT+8`.

### 01. About
> I'm a final-year Information Technology student at Asia Pacific University of Technology and Innovation (APU), specialising in Software Engineering. I write code that ships — TypeScript on the front, a mix of Node and Python on the back, and just enough cloud to make it all work. Outside coursework, I build small tools, contribute to a couple of open-source repos, and lose evenings to system-design rabbit holes. I care about clear interfaces, fast feedback loops, and software that respects the people using it. Looking for a graduate role where I can keep learning from senior engineers and ship things that matter.

### 02. Education
- **Asia Pacific University of Technology and Innovation (APU)**
- BSc (Hons) Information Technology — Software Engineering
- Kuala Lumpur · 2023 – 2026 (expected)
- CGPA 3.7 / 4.0
- Relevant coursework: Data Structures · Algorithms · Operating Systems · Databases · Software Architecture · Cloud Computing · Distributed Systems · Final-Year Project (Real-time anomaly detection)

### 03. Skills
| LANGUAGES | FRAMEWORKS & LIBS | INFRA & TOOLS |
|---|---|---|
| TypeScript | Next.js | Vercel |
| Python | React | AWS (basics) |
| Java | Node.js | Docker |
| SQL | Express | Git / GitHub Actions |
| C# | FastAPI | PostgreSQL |
|  | Tailwind CSS | Redis |

### 04. Projects
**P/01 — Pulse** · Real-time anomaly detection for log streams. Final-year project. Ingests JSON logs over WebSocket, flags anomalies via an isolation-forest model, exposes a dashboard. Stack: Next.js · FastAPI · PostgreSQL · Docker. → live · → repo

**P/02 — Inkwell** · Markdown-first note app with offline sync. Personal project. CRDT-based sync, full-text search, keyboard-first UX. Stack: React · TypeScript · IndexedDB · Rust (WASM). → live · → repo

**P/03 — APU Timetable Scraper** · CLI + iCal feed for APU class timetables. Built for myself, used by ~40 classmates. Stack: Python · BeautifulSoup · GitHub Actions. → repo

### 05. Experience
- **Software Engineering Intern — Acme Sdn Bhd**
- Kuala Lumpur · Jun 2025 – Aug 2025
  - Built an internal admin dashboard (Next.js + tRPC) that cut manual ops time by ~30%
  - Wrote integration tests covering the billing flow; caught two production-blocking regressions before release
  - Paired weekly with senior engineers on code reviews

### 06. Certifications & Achievements
- 2025 — AWS Certified Cloud Practitioner
- 2024 — Google Cybersecurity Professional Certificate
- 2024 — APU Hackathon Top 5 (team of 3)
- 2023 — Dean's List, Semester 2

### 07. Contact
Three magnetic links, large mono:
- `hello@jeremywoon.dev →`
- `github.com/jeremywoon →`
- `linkedin.com/in/jeremywoon →`

Plus a `[ Download Resume PDF ]` button.

Footer: `© 2026 Jeremy Woon · Built with Next.js · Last updated April 2026`

## 7. Component Architecture

```
app/
  layout.tsx           — root layout, fonts, metadata, viewport
  page.tsx             — assembles all sections in order
  globals.css          — Tailwind base + design tokens

components/
  hero/
    hero-section.tsx          — section wrapper
    name-reveal.tsx           — letter-by-letter name animation
    highlighter-swipe.tsx     — SVG path-draw highlight
    status-block.tsx          — pulsing-dot "Currently…" line
  layout/
    section.tsx               — generic section wrapper (numeral + title + children)
    section-numeral.tsx       — oversized mono numeral with scale-in reveal
    line-reveal.tsx           — body-text line-by-line stagger
  navigation/
    scroll-progress.tsx       — 1px hairline progress + sticky section indicator
    custom-cursor.tsx         — dot + ring follower
    magnetic-link.tsx         — wrapper that nudges children toward cursor
  sections/
    about-section.tsx
    education-section.tsx
    skills-section.tsx
    projects-section.tsx
    project-card.tsx
    experience-section.tsx
    certifications-section.tsx
    contact-section.tsx
    footer.tsx

lib/
  data.ts              — typed dummy content (single source of truth)
  hooks/
    use-mouse-position.ts
    use-magnetic.ts
    use-touch-device.ts

public/
  resume.pdf           — placeholder PDF
  og-image.png         — 1200×630 OG image
```

### Boundaries & responsibilities
- **`lib/data.ts`** is the single source of truth for content — TypeScript types describe each section's shape, sections consume only from here. Swapping in real data later means editing one file.
- **`components/layout/section.tsx`** owns the visual formula (numeral + title + body grid). All section components compose this — no section reinvents the layout.
- **Interaction primitives** (`custom-cursor`, `magnetic-link`, `line-reveal`, `scroll-progress`) live separately from content sections. Each can be tested and swapped without touching content.

## 8. Data Model

```ts
// lib/data.ts shape (excerpt)

export const profile = {
  name: 'Jeremy Woon',
  roleHighlight: 'software',                    // word inside the highlighter
  location: 'Kuala Lumpur, Malaysia',
  timezone: 'KL · GMT+8',
  currently: 'Final-year project on real-time anomaly detection. Open to graduate SWE roles starting Sept 2026.',
  about: '...120-word paragraph...',
  contact: {
    email: 'hello@jeremywoon.dev',
    github: 'github.com/jeremywoon',
    linkedin: 'linkedin.com/in/jeremywoon',
    resumeUrl: '/resume.pdf',
  },
};

export const education = { /* APU details */ };

export const skills: { group: string; items: string[] }[] = [ /* 3 groups */ ];

export const projects: {
  id: string; name: string; tagline: string;
  description: string; stack: string[];
  links: { label: string; href: string }[];
}[] = [ /* 3 entries */ ];

export const experience: { /* … */ }[] = [ /* 1 entry */ ];

export const certifications: { year: number; title: string }[] = [ /* 4 entries */ ];
```

## 9. Performance, Accessibility, SEO

- **Fonts via `next/font`** — eliminates FOUT and layout shift
- **Images** — none above the fold beyond text; if a headshot is added later, use `next/image`
- **Lazy animations** — Framer Motion components below the fold use `whileInView` with `once: true` and `margin: '-10%'` so they only animate when actually visible
- **Reduced motion** — all animations honour `prefers-reduced-motion`; entrance choreography collapses to immediate display
- **Semantic HTML** — one `<h1>` (hero name), `<h2>` per section, `<nav>` for the contact links
- **Color contrast** — `#0A0A0A` on `#FAFAF7` = 19.5:1 (AAA)
- **Keyboard navigation** — every interactive element has visible focus, magnetic effect skips on `:focus-visible`
- **SEO meta** — `<title>`, `<meta description>`, OG tags, structured data (`Person` JSON-LD)
- **Sitemap & robots.txt** — hand-rolled `app/sitemap.ts` and `app/robots.ts` (single page, no need for the `next-sitemap` package)

## 10. Build & Deploy

- **Repo:** `git init` locally, push to GitHub
- **Vercel:** import the GitHub repo, default Next.js detection, no env vars needed
- **Domain:** Vercel-issued `*.vercel.app` initially; custom domain (e.g., `jeremywoon.dev`) added later via DNS
- **CI:** Vercel preview deploys on every PR + production deploy on `main`

## 11. Risks & Mitigations

| Risk | Mitigation |
|---|---|
| Custom cursor breaks accessibility | Hidden on touch devices; native cursor remains visible (CSS `cursor: auto` not removed); honours `prefers-reduced-motion` |
| Animation jank on lower-end devices | Use CSS transforms only (no layout animations); `will-change` only on actively animating elements; honours `prefers-reduced-motion` |
| Magnetic links interfere with click targets | Pull is small (4–6px); pointer events stay on actual link element, not on the magnetic wrapper |
| Bundle bloat from Framer Motion | Use `motion/react` (lazy) imports and only the `<motion.*>` primitives needed; tree-shaking handles the rest |
| Recruiter on slow connection sees blank screen during font load | `next/font` with `display: swap` ensures text renders immediately in fallback |

## 12. Build Sequence (high level — full plan TBD in writing-plans phase)

1. Scaffold Next.js 15 project, Tailwind, TypeScript, fonts
2. Define design tokens (Tailwind theme extension), global CSS reset
3. Build `lib/data.ts` with dummy content
4. Build `components/layout/section.tsx` skeleton + `section-numeral.tsx`
5. Build content sections (About → Education → Skills → Projects → Experience → Certifications → Contact → Footer)
6. Build hero with entrance choreography (name reveal + highlighter swipe + status pulse)
7. Add interaction primitives (custom cursor, magnetic link, line reveal)
8. Add scroll-progress hairline + sticky section indicator
9. Wire `prefers-reduced-motion`, focus styles, reduced-motion fallbacks
10. Add SEO (metadata, OG image, JSON-LD, sitemap, robots)
11. Lighthouse pass; fix any regressions
12. Push to GitHub, connect to Vercel, verify production deploy
