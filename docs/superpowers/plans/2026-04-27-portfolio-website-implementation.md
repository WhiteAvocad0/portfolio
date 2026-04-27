# Portfolio Website Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a single-page, monochrome editorial portfolio for an APU final-year IT student, deployed to Vercel, following the design spec at `docs/superpowers/specs/2026-04-27-portfolio-website-design.md`.

**Architecture:** Next.js 15 App Router with TypeScript. Server Components for static content sections; Client Components only where interaction requires (`'use client'` boundary at the leaf). All content lives in a single typed module (`lib/data.ts`) so the dummy-to-real data swap is a single-file edit. Interaction primitives (cursor, magnetic links, scroll progress) are isolated from content sections so each can be tested and swapped independently.

**Tech Stack:** Next.js 15 · TypeScript · Tailwind CSS v4 · Framer Motion (`motion/react`) · Vitest + @testing-library/react · Playwright (smoke E2E) · Vercel.

---

## File Structure

```
portfolio/
├── app/
│   ├── layout.tsx                  # Root layout, fonts, metadata
│   ├── page.tsx                    # Assembles all sections
│   ├── globals.css                 # Tailwind + design tokens
│   ├── sitemap.ts                  # Static sitemap
│   └── robots.ts                   # robots.txt
│
├── components/
│   ├── hero/
│   │   ├── hero-section.tsx
│   │   ├── name-reveal.tsx
│   │   ├── highlighter-swipe.tsx
│   │   └── status-block.tsx
│   ├── layout/
│   │   ├── section.tsx             # Section wrapper (numeral + title + body)
│   │   ├── section-numeral.tsx
│   │   └── line-reveal.tsx
│   ├── navigation/
│   │   ├── scroll-progress.tsx
│   │   ├── custom-cursor.tsx
│   │   └── magnetic-link.tsx
│   └── sections/
│       ├── about-section.tsx
│       ├── education-section.tsx
│       ├── skills-section.tsx
│       ├── projects-section.tsx
│       ├── project-card.tsx
│       ├── experience-section.tsx
│       ├── certifications-section.tsx
│       ├── contact-section.tsx
│       └── footer.tsx
│
├── lib/
│   ├── data.ts                     # Single source of truth for content
│   └── hooks/
│       ├── use-mouse-position.ts
│       ├── use-magnetic.ts
│       ├── use-touch-device.ts
│       └── use-reduced-motion.ts   # Wrapper around Framer Motion's
│
├── public/
│   ├── resume.pdf                  # Placeholder PDF
│   ├── og-image.png                # 1200×630 OG image
│   └── favicon.svg
│
├── tests/
│   ├── setup.ts                    # Vitest setup (jest-dom, etc.)
│   ├── unit/
│   │   ├── data.test.ts
│   │   ├── use-magnetic.test.ts
│   │   └── use-touch-device.test.ts
│   ├── components/
│   │   ├── section.test.tsx
│   │   ├── line-reveal.test.tsx
│   │   ├── magnetic-link.test.tsx
│   │   ├── project-card.test.tsx
│   │   └── hero-section.test.tsx
│   └── e2e/
│       └── smoke.spec.ts           # Playwright: page loads, key text present
│
├── tailwind.config.ts
├── postcss.config.mjs
├── tsconfig.json
├── next.config.ts
├── vitest.config.ts
├── playwright.config.ts
├── package.json
└── README.md
```

### Boundary rules (enforced through reviews)
- Content sections **only** read from `lib/data.ts`. They never define copy inline.
- Interaction primitives (`custom-cursor`, `magnetic-link`, `scroll-progress`, `line-reveal`) **never** import from `lib/data.ts` or content sections.
- The `Section` wrapper (`components/layout/section.tsx`) is the **only** component that knows about the section-numeral + title + body layout formula. Content sections compose it; they don't reinvent it.
- `'use client'` only on components that need event listeners or refs. Sections that are static content stay as Server Components.

---

## Phase 1 — Project Setup

### Task 1: Scaffold Next.js project

**Files:**
- Create: `package.json`, `tsconfig.json`, `next.config.ts`, `app/layout.tsx`, `app/page.tsx`, `app/globals.css`, `.gitignore`, `README.md`

- [ ] **Step 1: Run `create-next-app`**

```bash
npx create-next-app@latest portfolio \
  --typescript --tailwind --app --no-src-dir \
  --import-alias "@/*" --eslint --no-turbopack
```

Move into the directory:
```bash
cd portfolio
```

Expected: `portfolio/` populated with `app/`, `package.json`, etc. Tailwind v4 installed.

- [ ] **Step 2: Verify the dev server boots and Tailwind is v4**

```bash
npm run dev
```
Expected: server starts on `http://localhost:3000`. Visit it; you should see the Next.js starter. Stop with `Ctrl-C`.

```bash
npm ls tailwindcss
```
Expected: shows `tailwindcss@4.x.x`. If `create-next-app` provisioned v3, abort and pin v4: `npm install -D tailwindcss@latest @tailwindcss/postcss@latest` and follow the v4 migration prompts. The `@theme` and `max-w-(--var-name)` syntax used later in this plan requires v4.

- [ ] **Step 3: Replace the starter content with a placeholder**

Edit `app/page.tsx`:

```tsx
export default function Home() {
  return <main>Portfolio scaffold OK</main>;
}
```

Edit `app/globals.css` — keep only:

```css
@import "tailwindcss";

:root {
  --bg: #FAFAF7;
  --fg: #0A0A0A;
  --muted: #737373;
  --border: #E5E5E5;
}

html, body {
  background: var(--bg);
  color: var(--fg);
  -webkit-font-smoothing: antialiased;
}
```

- [ ] **Step 4: Verify**

```bash
npm run dev
```
Expected: page shows "Portfolio scaffold OK" on the off-white background.

- [ ] **Step 5: Commit**

```bash
git init
git add .
git commit -m "chore: scaffold Next.js portfolio project"
```

---

### Task 2: Install runtime + dev dependencies

**Files:**
- Modify: `package.json`

- [ ] **Step 1: Install Framer Motion**

```bash
npm install motion
```

- [ ] **Step 2: Install testing dependencies**

```bash
npm install -D vitest @vitest/ui jsdom @testing-library/react @testing-library/jest-dom @testing-library/user-event @vitejs/plugin-react
npm install -D @playwright/test
npx playwright install --with-deps chromium
```

- [ ] **Step 3: Add scripts to `package.json`**

In `package.json`, ensure `"scripts"` includes:
```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "test": "vitest run",
    "test:watch": "vitest",
    "test:e2e": "playwright test",
    "typecheck": "tsc --noEmit"
  }
}
```

- [ ] **Step 4: Verify**

```bash
npm run typecheck
```
Expected: no errors.

- [ ] **Step 5: Commit**

```bash
git add package.json package-lock.json
git commit -m "chore: add framer motion + vitest + playwright dev dependencies"
```

---

### Task 3: Configure Vitest

**Files:**
- Create: `vitest.config.ts`, `tests/setup.ts`

- [ ] **Step 1: Create `vitest.config.ts`**

```ts
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import path from 'node:path';

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    setupFiles: ['./tests/setup.ts'],
    globals: true,
    include: ['tests/unit/**/*.test.{ts,tsx}', 'tests/components/**/*.test.{ts,tsx}'],
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '.'),
    },
  },
});
```

- [ ] **Step 2: Create `tests/setup.ts`**

```ts
import '@testing-library/jest-dom/vitest';
import { afterEach } from 'vitest';
import { cleanup } from '@testing-library/react';

afterEach(() => {
  cleanup();
});

// jsdom doesn't implement matchMedia — stub it for Framer Motion + reduced motion checks
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: (query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addEventListener: () => {},
    removeEventListener: () => {},
    addListener: () => {},
    removeListener: () => {},
    dispatchEvent: () => false,
  }),
});

// jsdom doesn't implement IntersectionObserver — Framer Motion's whileInView uses it
class IntersectionObserverMock {
  observe() {}
  unobserve() {}
  disconnect() {}
  takeRecords() { return []; }
}
// @ts-expect-error - test stub
window.IntersectionObserver = IntersectionObserverMock;
```

- [ ] **Step 3: Add a smoke test**

Create `tests/unit/sanity.test.ts`:
```ts
import { describe, it, expect } from 'vitest';

describe('sanity', () => {
  it('runs', () => {
    expect(1 + 1).toBe(2);
  });
});
```

- [ ] **Step 4: Run it**

```bash
npm test
```
Expected: 1 passed.

- [ ] **Step 5: Commit**

```bash
git add vitest.config.ts tests/setup.ts tests/unit/sanity.test.ts
git commit -m "chore: configure vitest + jsdom for component testing"
```

---

### Task 4: Configure Playwright (smoke E2E only)

**Files:**
- Create: `playwright.config.ts`, `tests/e2e/smoke.spec.ts`

- [ ] **Step 1: Create `playwright.config.ts`**

```ts
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests/e2e',
  fullyParallel: true,
  retries: 0,
  use: {
    baseURL: 'http://localhost:3000',
    trace: 'on-first-retry',
  },
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
  ],
  webServer: {
    command: 'npm run dev',
    url: 'http://localhost:3000',
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
  },
});
```

- [ ] **Step 2: Create the smoke test (will fail — page content not built yet)**

Create `tests/e2e/smoke.spec.ts`:
```ts
import { test, expect } from '@playwright/test';

test('homepage renders the candidate name', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('heading', { level: 1 })).toContainText('Jeremy Woon');
});
```

- [ ] **Step 3: Verify Playwright is wired (test will fail — that's expected)**

```bash
npx playwright test --list
```
Expected: lists `tests/e2e/smoke.spec.ts`.

(Don't run `npm run test:e2e` yet — the page doesn't have the content. We'll run it at the end.)

- [ ] **Step 4: Commit**

```bash
git add playwright.config.ts tests/e2e/smoke.spec.ts
git commit -m "chore: configure playwright smoke test scaffold"
```

---

### Task 5: Configure design tokens in Tailwind + globals

**Files:**
- Modify: `app/globals.css`
- Create: nothing new

Tailwind v4 uses `@theme` blocks in CSS rather than a JS config. We'll define tokens there.

- [ ] **Step 1: Replace `app/globals.css` with the full token system**

```css
@import "tailwindcss";

@theme {
  --color-bg: #FAFAF7;
  --color-fg: #0A0A0A;
  --color-muted: #737373;
  --color-border: #E5E5E5;

  --font-display: "Instrument Serif", ui-serif, Georgia, serif;
  --font-sans: "Inter", ui-sans-serif, system-ui, sans-serif;
  --font-mono: "JetBrains Mono", ui-monospace, SFMono-Regular, monospace;

  --container-page: 1280px;
}

@layer base {
  :root {
    color-scheme: light;
  }

  html, body {
    background: var(--color-bg);
    color: var(--color-fg);
    -webkit-font-smoothing: antialiased;
    text-rendering: optimizeLegibility;
  }

  /* Hide native cursor on devices with a precise pointer when our custom cursor is active.
     We toggle this with a body class set by the CustomCursor component on mount. */
  body.has-custom-cursor {
    cursor: none;
  }

  body.has-custom-cursor a,
  body.has-custom-cursor button {
    cursor: none;
  }

  /* Visible focus for keyboard navigation */
  :focus-visible {
    outline: 2px solid var(--color-fg);
    outline-offset: 4px;
  }

  /* Honour reduced motion globally — Framer Motion respects this via prefers-reduced-motion,
     but we also disable CSS transitions to be safe. */
  @media (prefers-reduced-motion: reduce) {
    *, *::before, *::after {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
      scroll-behavior: auto !important;
    }
  }
}
```

- [ ] **Step 2: Verify by adding sample classes**

In `app/page.tsx`:
```tsx
export default function Home() {
  return (
    <main className="min-h-screen p-12">
      <h1 className="font-display text-6xl">Tokens OK</h1>
      <p className="font-sans text-fg/60">Body sans</p>
      <p className="font-mono text-sm">font-mono / 01</p>
    </main>
  );
}
```

```bash
npm run dev
```
Expected: Three lines render with three different font families on the off-white background. (Fonts will fall back to system ones until Task 6 — that's fine for now.)

- [ ] **Step 3: Commit**

```bash
git add app/globals.css app/page.tsx
git commit -m "feat: define design tokens (colors, fonts, container) in tailwind v4 theme"
```

---

### Task 6: Configure fonts via `next/font`

**Files:**
- Modify: `app/layout.tsx`

- [ ] **Step 1: Replace `app/layout.tsx`**

```tsx
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
  title: 'Jeremy Woon — Final-year IT student & developer',
  description:
    'Portfolio of Jeremy Woon, a final-year Information Technology student at APU. Available for graduate SWE roles starting September 2026.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${sans.variable} ${display.variable} ${mono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
```

- [ ] **Step 2: Verify in the browser**

```bash
npm run dev
```
Expected: the three sample lines now render in Inter / Instrument Serif / JetBrains Mono respectively. Use DevTools → Computed → font-family to confirm.

- [ ] **Step 3: Commit**

```bash
git add app/layout.tsx
git commit -m "feat: load Inter, Instrument Serif, JetBrains Mono via next/font"
```

---

## Phase 2 — Data Layer

### Task 7: Define typed dummy content in `lib/data.ts`

**Files:**
- Create: `lib/data.ts`
- Test: `tests/unit/data.test.ts`

- [ ] **Step 1: Write the failing test**

Create `tests/unit/data.test.ts`:
```ts
import { describe, it, expect } from 'vitest';
import {
  profile, education, skills, projects, experience, certifications,
} from '@/lib/data';

describe('content data', () => {
  it('exposes a profile with name and contact details', () => {
    expect(profile.name).toBeTruthy();
    expect(profile.contact.email).toMatch(/@/);
    expect(profile.contact.resumeUrl).toMatch(/\.pdf$/);
  });

  it('has APU education entry', () => {
    expect(education.institution).toContain('Asia Pacific University');
  });

  it('has at least three skill groups', () => {
    expect(skills.length).toBeGreaterThanOrEqual(3);
    skills.forEach(g => expect(g.items.length).toBeGreaterThan(0));
  });

  it('has exactly three projects with stack and links', () => {
    expect(projects).toHaveLength(3);
    projects.forEach(p => {
      expect(p.stack.length).toBeGreaterThan(0);
      expect(p.id).toMatch(/^P\/\d{2}$/);
    });
  });

  it('has at least one experience entry', () => {
    expect(experience.length).toBeGreaterThanOrEqual(1);
  });

  it('has at least three certifications, sorted descending by year', () => {
    expect(certifications.length).toBeGreaterThanOrEqual(3);
    const years = certifications.map(c => c.year);
    expect([...years].sort((a, b) => b - a)).toEqual(years);
  });
});
```

- [ ] **Step 2: Run test (verify failure)**

```bash
npm test -- tests/unit/data.test.ts
```
Expected: FAIL with "Cannot find module '@/lib/data'".

- [ ] **Step 3: Create `lib/data.ts`**

```ts
export const profile = {
  name: 'Jeremy Woon',
  roleHighlight: 'software',
  intro: "Hi, I'm",
  tagline: 'A final-year IT student building',
  taglineSuffix: 'for the web — based in Kuala Lumpur, Malaysia.',
  location: 'Kuala Lumpur, Malaysia',
  timezone: 'KL · GMT+8',
  currently:
    'Final-year project on real-time anomaly detection. Open to graduate SWE roles starting Sept 2026.',
  about:
    "I'm a final-year Information Technology student at Asia Pacific University of Technology and Innovation (APU), specialising in Software Engineering. I write code that ships — TypeScript on the front, a mix of Node and Python on the back, and just enough cloud to make it all work. Outside coursework, I build small tools, contribute to a couple of open-source repos, and lose evenings to system-design rabbit holes. I care about clear interfaces, fast feedback loops, and software that respects the people using it. Looking for a graduate role where I can keep learning from senior engineers and ship things that matter.",
  contact: {
    email: 'hello@jeremywoon.dev',
    github: 'github.com/jeremywoon',
    githubUrl: 'https://github.com/jeremywoon',
    linkedin: 'linkedin.com/in/jeremywoon',
    linkedinUrl: 'https://linkedin.com/in/jeremywoon',
    resumeUrl: '/resume.pdf',
  },
} as const;

export const education = {
  institution: 'Asia Pacific University of Technology and Innovation (APU)',
  degree: 'BSc (Hons) Information Technology — Software Engineering',
  location: 'Kuala Lumpur',
  start: '2023',
  end: '2026 (expected)',
  cgpa: '3.7 / 4.0',
  coursework: [
    'Data Structures',
    'Algorithms',
    'Operating Systems',
    'Databases',
    'Software Architecture',
    'Cloud Computing',
    'Distributed Systems',
    'Final-Year Project (Real-time anomaly detection)',
  ],
} as const;

export type SkillGroup = { group: string; items: readonly string[] };

export const skills: readonly SkillGroup[] = [
  {
    group: 'Languages',
    items: ['TypeScript', 'Python', 'Java', 'SQL', 'C#'],
  },
  {
    group: 'Frameworks & Libs',
    items: ['Next.js', 'React', 'Node.js', 'Express', 'FastAPI', 'Tailwind CSS'],
  },
  {
    group: 'Infra & Tools',
    items: ['Vercel', 'AWS (basics)', 'Docker', 'Git / GitHub Actions', 'PostgreSQL', 'Redis'],
  },
] as const;

export type Project = {
  id: `P/${string}`;
  name: string;
  tagline: string;
  description: string;
  stack: readonly string[];
  links: readonly { label: string; href: string }[];
};

export const projects: readonly Project[] = [
  {
    id: 'P/01',
    name: 'Pulse',
    tagline: 'Real-time anomaly detection for log streams.',
    description:
      'Final-year project. Ingests JSON logs over WebSocket, flags anomalies via an isolation-forest model, exposes a dashboard.',
    stack: ['Next.js', 'FastAPI', 'PostgreSQL', 'Docker'],
    links: [
      { label: 'live', href: 'https://example.com/pulse' },
      { label: 'repo', href: 'https://github.com/jeremywoon/pulse' },
    ],
  },
  {
    id: 'P/02',
    name: 'Inkwell',
    tagline: 'Markdown-first note app with offline sync.',
    description:
      'Personal project. CRDT-based sync, full-text search, keyboard-first UX.',
    stack: ['React', 'TypeScript', 'IndexedDB', 'Rust (WASM)'],
    links: [
      { label: 'live', href: 'https://example.com/inkwell' },
      { label: 'repo', href: 'https://github.com/jeremywoon/inkwell' },
    ],
  },
  {
    id: 'P/03',
    name: 'APU Timetable Scraper',
    tagline: 'CLI + iCal feed for APU class timetables.',
    description: 'Built for myself, used by ~40 classmates.',
    stack: ['Python', 'BeautifulSoup', 'GitHub Actions'],
    links: [{ label: 'repo', href: 'https://github.com/jeremywoon/apu-timetable' }],
  },
] as const;

export type ExperienceEntry = {
  role: string;
  company: string;
  location: string;
  start: string;
  end: string;
  bullets: readonly string[];
};

export const experience: readonly ExperienceEntry[] = [
  {
    role: 'Software Engineering Intern',
    company: 'Acme Sdn Bhd',
    location: 'Kuala Lumpur',
    start: 'Jun 2025',
    end: 'Aug 2025',
    bullets: [
      'Built an internal admin dashboard (Next.js + tRPC) that cut manual ops time by ~30%.',
      'Wrote integration tests covering the billing flow; caught two production-blocking regressions before release.',
      'Paired weekly with senior engineers on code reviews.',
    ],
  },
] as const;

export type Certification = { year: number; title: string };

export const certifications: readonly Certification[] = [
  { year: 2025, title: 'AWS Certified Cloud Practitioner' },
  { year: 2024, title: 'Google Cybersecurity Professional Certificate' },
  { year: 2024, title: 'APU Hackathon — Top 5 (team of 3)' },
  { year: 2023, title: "Dean's List, Semester 2" },
] as const;

export const sectionList = [
  { number: '00', label: 'Hero' },
  { number: '01', label: 'About' },
  { number: '02', label: 'Education' },
  { number: '03', label: 'Skills' },
  { number: '04', label: 'Projects' },
  { number: '05', label: 'Experience' },
  { number: '06', label: 'Certifications' },
  { number: '07', label: 'Contact' },
] as const;
```

- [ ] **Step 4: Run test (verify pass)**

```bash
npm test -- tests/unit/data.test.ts
```
Expected: 6 passed.

- [ ] **Step 5: Commit**

```bash
git add lib/data.ts tests/unit/data.test.ts
git commit -m "feat: add typed dummy content in lib/data.ts"
```

---

## Phase 3 — Hooks

### Task 8: `use-touch-device` hook

**Files:**
- Create: `lib/hooks/use-touch-device.ts`
- Test: `tests/unit/use-touch-device.test.ts`

- [ ] **Step 1: Write the failing test**

```ts
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { renderHook } from '@testing-library/react';
import { useTouchDevice } from '@/lib/hooks/use-touch-device';

describe('useTouchDevice', () => {
  beforeEach(() => {
    vi.spyOn(window, 'matchMedia').mockImplementation((q: string) => ({
      matches: q.includes('coarse'),
      media: q,
      onchange: null,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      addListener: vi.fn(),
      removeListener: vi.fn(),
      dispatchEvent: vi.fn(),
    }) as unknown as MediaQueryList);
  });

  it('returns true when pointer is coarse', () => {
    const { result } = renderHook(() => useTouchDevice());
    expect(result.current).toBe(true);
  });
});
```

- [ ] **Step 2: Run test (verify failure)**

```bash
npm test -- tests/unit/use-touch-device.test.ts
```
Expected: FAIL with "Cannot find module".

- [ ] **Step 3: Implement**

Create `lib/hooks/use-touch-device.ts`:
```ts
'use client';
import { useEffect, useState } from 'react';

export function useTouchDevice(): boolean {
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(pointer: coarse)');
    setIsTouch(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setIsTouch(e.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  return isTouch;
}
```

- [ ] **Step 4: Run test (verify pass)**

```bash
npm test -- tests/unit/use-touch-device.test.ts
```
Expected: pass.

- [ ] **Step 5: Commit**

```bash
git add lib/hooks/use-touch-device.ts tests/unit/use-touch-device.test.ts
git commit -m "feat: add useTouchDevice hook"
```

---

### Task 9: `use-mouse-position` hook

**Files:**
- Create: `lib/hooks/use-mouse-position.ts`

This hook returns Framer Motion `MotionValue`s for x/y so consumers can spring-animate without per-frame re-renders.

- [ ] **Step 1: Implement**

Create `lib/hooks/use-mouse-position.ts`:
```ts
'use client';
import { useEffect } from 'react';
import { useMotionValue, type MotionValue } from 'motion/react';

export function useMousePosition(): { x: MotionValue<number>; y: MotionValue<number> } {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };
    window.addEventListener('mousemove', onMove, { passive: true });
    return () => window.removeEventListener('mousemove', onMove);
  }, [x, y]);

  return { x, y };
}
```

(No unit test — `MotionValue` mocking is more friction than this hook is worth. Behavior is exercised via component tests for `CustomCursor` and `MagneticLink`.)

- [ ] **Step 2: Verify it type-checks**

```bash
npm run typecheck
```
Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add lib/hooks/use-mouse-position.ts
git commit -m "feat: add useMousePosition hook (returns MotionValues)"
```

---

### Task 10: `use-magnetic` hook

**Files:**
- Create: `lib/hooks/use-magnetic.ts`
- Test: `tests/unit/use-magnetic.test.ts`

This hook attaches mousemove/mouseleave listeners to a ref and returns spring-driven x/y offsets that pull the element toward the cursor.

- [ ] **Step 1: Write the failing test**

```ts
import { describe, it, expect } from 'vitest';
import { renderHook } from '@testing-library/react';
import { useRef } from 'react';
import { useMagnetic } from '@/lib/hooks/use-magnetic';

describe('useMagnetic', () => {
  it('returns x and y motion values', () => {
    const { result } = renderHook(() => {
      const ref = useRef<HTMLDivElement>(null);
      return useMagnetic(ref);
    });
    expect(result.current.x).toBeDefined();
    expect(result.current.y).toBeDefined();
    expect(typeof result.current.x.get).toBe('function');
  });
});
```

- [ ] **Step 2: Run test (verify failure)**

```bash
npm test -- tests/unit/use-magnetic.test.ts
```
Expected: FAIL.

- [ ] **Step 3: Implement**

Create `lib/hooks/use-magnetic.ts`:
```ts
'use client';
import { useEffect, type RefObject } from 'react';
import { useMotionValue, useSpring, type MotionValue } from 'motion/react';

const STRENGTH = 0.25; // fraction of distance the element moves
const MAX_PX = 6; // hard cap so the pull stays subtle

export function useMagnetic(
  ref: RefObject<HTMLElement | null>
): { x: MotionValue<number>; y: MotionValue<number> } {
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const x = useSpring(rawX, { stiffness: 220, damping: 20, mass: 0.4 });
  const y = useSpring(rawY, { stiffness: 220, damping: 20, mass: 0.4 });

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = (e.clientX - cx) * STRENGTH;
      const dy = (e.clientY - cy) * STRENGTH;
      rawX.set(Math.max(-MAX_PX, Math.min(MAX_PX, dx)));
      rawY.set(Math.max(-MAX_PX, Math.min(MAX_PX, dy)));
    };
    const onLeave = () => {
      rawX.set(0);
      rawY.set(0);
    };

    el.addEventListener('mousemove', onMove);
    el.addEventListener('mouseleave', onLeave);
    return () => {
      el.removeEventListener('mousemove', onMove);
      el.removeEventListener('mouseleave', onLeave);
    };
  }, [ref, rawX, rawY]);

  return { x, y };
}
```

- [ ] **Step 4: Run test (verify pass)**

```bash
npm test -- tests/unit/use-magnetic.test.ts
```
Expected: pass.

- [ ] **Step 5: Commit**

```bash
git add lib/hooks/use-magnetic.ts tests/unit/use-magnetic.test.ts
git commit -m "feat: add useMagnetic hook with spring-driven offsets"
```

---

### Task 11: `use-reduced-motion` re-export

**Files:**
- Create: `lib/hooks/use-reduced-motion.ts`

- [ ] **Step 1: Implement**

```ts
'use client';
export { useReducedMotion } from 'motion/react';
```

(Re-exported for a single import path so consumers don't reach into `motion/react` directly. Trivial, no test needed.)

- [ ] **Step 2: Commit**

```bash
git add lib/hooks/use-reduced-motion.ts
git commit -m "feat: re-export useReducedMotion from a stable path"
```

---

## Phase 4 — Layout Primitives

### Task 12: `LineReveal` component

**Files:**
- Create: `components/layout/line-reveal.tsx`
- Test: `tests/components/line-reveal.test.tsx`

Splits children text by line (passed as an array of strings) and reveals each line with a fade + 12px upward translate, staggered.

- [ ] **Step 1: Write the failing test**

```tsx
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { LineReveal } from '@/components/layout/line-reveal';

describe('LineReveal', () => {
  it('renders each line as a separate element', () => {
    render(<LineReveal lines={['line one', 'line two']} />);
    expect(screen.getByText('line one')).toBeInTheDocument();
    expect(screen.getByText('line two')).toBeInTheDocument();
  });

  it('applies provided className to the wrapper', () => {
    const { container } = render(
      <LineReveal lines={['x']} className="text-2xl" />
    );
    expect(container.firstChild).toHaveClass('text-2xl');
  });
});
```

- [ ] **Step 2: Run test (verify failure)**

```bash
npm test -- tests/components/line-reveal.test.tsx
```
Expected: FAIL.

- [ ] **Step 3: Implement**

```tsx
'use client';
import { motion } from 'motion/react';

type Props = {
  lines: string[];
  className?: string;
  delay?: number;
};

export function LineReveal({ lines, className = '', delay = 0 }: Props) {
  return (
    <div className={className}>
      {lines.map((line, i) => (
        <motion.span
          key={i}
          className="block overflow-hidden"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-10%' }}
          transition={{ duration: 0.5, delay: delay + i * 0.08, ease: [0.22, 1, 0.36, 1] }}
        >
          {line}
        </motion.span>
      ))}
    </div>
  );
}
```

- [ ] **Step 4: Run test (verify pass)**

```bash
npm test -- tests/components/line-reveal.test.tsx
```
Expected: pass.

- [ ] **Step 5: Commit**

```bash
git add components/layout/line-reveal.tsx tests/components/line-reveal.test.tsx
git commit -m "feat: add LineReveal component for staggered line reveals"
```

---

### Task 13: `SectionNumeral` component

**Files:**
- Create: `components/layout/section-numeral.tsx`

Oversized mono numeral that scales from 0.92 → 1.0 on enter.

- [ ] **Step 1: Implement**

```tsx
'use client';
import { motion } from 'motion/react';

export function SectionNumeral({ number }: { number: string }) {
  return (
    <motion.span
      aria-hidden="true"
      className="font-mono text-muted text-7xl md:text-[8rem] leading-none tracking-tight select-none"
      initial={{ opacity: 0, scale: 0.92 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: '-15%' }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      {number}
    </motion.span>
  );
}
```

(Color uses `text-muted` — Tailwind picks that up from the CSS custom property defined in `app/globals.css` via `@theme`.)

- [ ] **Step 2: Verify in isolation by importing into `app/page.tsx`**

Temporarily add to `app/page.tsx` body:
```tsx
import { SectionNumeral } from '@/components/layout/section-numeral';
// inside <main>: <SectionNumeral number="01" />
```
Run `npm run dev`, confirm a large grey "01" renders. Then revert the temporary edit.

- [ ] **Step 3: Commit**

```bash
git add components/layout/section-numeral.tsx
git commit -m "feat: add SectionNumeral component with scale-in reveal"
```

---

### Task 14: `Section` wrapper component

**Files:**
- Create: `components/layout/section.tsx`
- Test: `tests/components/section.test.tsx`

Wraps a section with: `<section id={...}>` + numeral + title (display serif) + body slot. Single source of layout truth.

- [ ] **Step 1: Write the failing test**

```tsx
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Section } from '@/components/layout/section';

describe('Section', () => {
  it('renders heading, numeral, and body content', () => {
    render(
      <Section number="01" title="About" id="about">
        <p>some body content</p>
      </Section>
    );
    const section = screen.getByRole('region', { name: /about/i });
    expect(section).toHaveAttribute('id', 'about');
    expect(screen.getByRole('heading', { level: 2, name: 'About' })).toBeInTheDocument();
    expect(screen.getByText('some body content')).toBeInTheDocument();
    expect(screen.getByText('01')).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run test (verify failure)**

```bash
npm test -- tests/components/section.test.tsx
```
Expected: FAIL.

- [ ] **Step 3: Implement**

```tsx
import type { ReactNode } from 'react';
import { SectionNumeral } from './section-numeral';

type Props = {
  id: string;
  number: string;
  title: string;
  children: ReactNode;
};

export function Section({ id, number, title, children }: Props) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-title`}
      className="relative py-20 md:py-40"
    >
      <div className="mx-auto max-w-(--container-page) px-6 md:px-20">
        <div className="grid grid-cols-12 gap-6 md:gap-10">
          <div className="col-span-12 md:col-span-3">
            <SectionNumeral number={number} />
          </div>
          <div className="col-span-12 md:col-span-9">
            <h2
              id={`${id}-title`}
              className="font-display text-4xl md:text-6xl tracking-tight mb-10 md:mb-16"
            >
              {title}
            </h2>
            {children}
          </div>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 4: Run test (verify pass)**

```bash
npm test -- tests/components/section.test.tsx
```
Expected: pass.

- [ ] **Step 5: Commit**

```bash
git add components/layout/section.tsx tests/components/section.test.tsx
git commit -m "feat: add Section wrapper (numeral + title + body grid)"
```

---

## Phase 5 — Interaction Primitives

### Task 15: `MagneticLink` component

**Files:**
- Create: `components/navigation/magnetic-link.tsx`
- Test: `tests/components/magnetic-link.test.tsx`

A wrapper element that applies the magnetic offset to its children. Click target stays on the underlying anchor.

- [ ] **Step 1: Write the failing test**

```tsx
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MagneticLink } from '@/components/navigation/magnetic-link';

describe('MagneticLink', () => {
  it('renders an anchor with href and content', () => {
    render(<MagneticLink href="https://example.com">click me</MagneticLink>);
    const link = screen.getByRole('link', { name: 'click me' });
    expect(link).toHaveAttribute('href', 'https://example.com');
  });

  it('passes through className', () => {
    render(
      <MagneticLink href="#" className="font-mono">
        x
      </MagneticLink>
    );
    expect(screen.getByRole('link')).toHaveClass('font-mono');
  });
});
```

- [ ] **Step 2: Run test (verify failure)**

```bash
npm test -- tests/components/magnetic-link.test.tsx
```
Expected: FAIL.

- [ ] **Step 3: Implement**

```tsx
'use client';
import { useRef, type ReactNode } from 'react';
import { motion } from 'motion/react';
import { useMagnetic } from '@/lib/hooks/use-magnetic';
import { useTouchDevice } from '@/lib/hooks/use-touch-device';

type Props = {
  href: string;
  children: ReactNode;
  className?: string;
  external?: boolean;
};

export function MagneticLink({ href, children, className = '', external = false }: Props) {
  const ref = useRef<HTMLAnchorElement>(null);
  const isTouch = useTouchDevice();
  const { x, y } = useMagnetic(ref);

  const externalProps = external ? { target: '_blank', rel: 'noopener noreferrer' } : {};

  return (
    <motion.a
      ref={ref}
      href={href}
      className={`inline-block ${className}`}
      style={isTouch ? undefined : { x, y }}
      {...externalProps}
    >
      {children}
    </motion.a>
  );
}
```

- [ ] **Step 4: Run test (verify pass)**

```bash
npm test -- tests/components/magnetic-link.test.tsx
```
Expected: pass.

- [ ] **Step 5: Commit**

```bash
git add components/navigation/magnetic-link.tsx tests/components/magnetic-link.test.tsx
git commit -m "feat: add MagneticLink component (touch-aware)"
```

---

### Task 16: `CustomCursor` component

**Files:**
- Create: `components/navigation/custom-cursor.tsx`

Renders a small dot that follows the cursor + a ring that expands when hovering interactive elements. Hidden on touch devices and when `prefers-reduced-motion`.

- [ ] **Step 1: Implement**

```tsx
'use client';
import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'motion/react';
import { useTouchDevice } from '@/lib/hooks/use-touch-device';
import { useReducedMotion } from '@/lib/hooks/use-reduced-motion';

export function CustomCursor() {
  const isTouch = useTouchDevice();
  const reduced = useReducedMotion();
  const [hovering, setHovering] = useState(false);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 600, damping: 40, mass: 0.3 });
  const sy = useSpring(y, { stiffness: 600, damping: 40, mass: 0.3 });

  useEffect(() => {
    if (isTouch || reduced) return;

    document.body.classList.add('has-custom-cursor');

    const onMove = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };

    const interactiveSelector = 'a, button, [role="button"], [data-cursor="hover"]';
    const onOver = (e: MouseEvent) => {
      if ((e.target as Element).closest(interactiveSelector)) setHovering(true);
    };
    const onOut = (e: MouseEvent) => {
      if ((e.target as Element).closest(interactiveSelector)) setHovering(false);
    };

    window.addEventListener('mousemove', onMove, { passive: true });
    document.addEventListener('mouseover', onOver);
    document.addEventListener('mouseout', onOut);
    return () => {
      document.body.classList.remove('has-custom-cursor');
      window.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseover', onOver);
      document.removeEventListener('mouseout', onOut);
    };
  }, [isTouch, reduced, x, y]);

  if (isTouch || reduced) return null;

  return (
    <>
      <motion.div
        aria-hidden="true"
        className="pointer-events-none fixed top-0 left-0 z-50 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-fg"
        style={{ x: sx, y: sy }}
      />
      <motion.div
        aria-hidden="true"
        className="pointer-events-none fixed top-0 left-0 z-50 -translate-x-1/2 -translate-y-1/2 rounded-full border border-fg"
        style={{ x: sx, y: sy }}
        animate={{ width: hovering ? 32 : 0, height: hovering ? 32 : 0, opacity: hovering ? 1 : 0 }}
        transition={{ duration: 0.2 }}
      />
    </>
  );
}
```

- [ ] **Step 2: Verify visually**

Add `<CustomCursor />` to `app/page.tsx` temporarily. Run `npm run dev`. On a desktop: native cursor disappears, custom dot follows; hovering the placeholder text shouldn't expand the ring (no interactive elements yet). Move the cursor over an `<a>` if you have one in the page to confirm the ring appears.

- [ ] **Step 3: Commit**

```bash
git add components/navigation/custom-cursor.tsx
git commit -m "feat: add CustomCursor with hover-aware ring expansion"
```

---

### Task 17: `ScrollProgress` component

**Files:**
- Create: `components/navigation/scroll-progress.tsx`

Thin hairline on the right edge that fills top-to-bottom as the user scrolls. Plus a sticky `→ NN / Section` indicator in the top-right after the hero.

- [ ] **Step 1: Implement**

```tsx
'use client';
import { useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { sectionList } from '@/lib/data';

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const [active, setActive] = useState<{ number: string; label: string } | null>(null);

  useEffect(() => {
    const ids = sectionList.map(s => s.label.toLowerCase());
    const observer = new IntersectionObserver(
      entries => {
        const visible = entries.filter(e => e.isIntersecting);
        if (visible.length === 0) return;
        // pick the entry closest to the top of the viewport
        visible.sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        const id = visible[0].target.id;
        const match = sectionList.find(s => s.label.toLowerCase() === id);
        if (match) setActive(match);
      },
      { rootMargin: '-30% 0px -60% 0px', threshold: 0 }
    );
    ids.forEach(id => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <motion.div
        aria-hidden="true"
        className="fixed top-0 right-0 z-40 h-screen w-px origin-top bg-fg"
        style={{ scaleY }}
      />
      {active && active.number !== '00' && (
        <motion.div
          className="fixed top-6 right-6 z-40 font-mono text-xs text-muted"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          → {active.number} / {active.label}
        </motion.div>
      )}
    </>
  );
}
```

- [ ] **Step 2: Verify**

Will look correct only after content sections exist. Skip visual verification until Task 27.

- [ ] **Step 3: Commit**

```bash
git add components/navigation/scroll-progress.tsx
git commit -m "feat: add ScrollProgress hairline + sticky section indicator"
```

---

## Phase 6 — Hero

### Task 18: `NameReveal` component

**Files:**
- Create: `components/hero/name-reveal.tsx`

Splits a name string into letters and reveals each with a 30ms stagger.

- [ ] **Step 1: Implement**

```tsx
'use client';
import { motion } from 'motion/react';

export function NameReveal({ text, className = '' }: { text: string; className?: string }) {
  const letters = Array.from(text);
  return (
    <span className={`inline-block ${className}`} aria-label={text}>
      {letters.map((char, i) => (
        <motion.span
          key={i}
          aria-hidden="true"
          className="inline-block"
          initial={{ opacity: 0, y: '0.4em' }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: i * 0.03, ease: [0.22, 1, 0.36, 1] }}
        >
          {char === ' ' ? ' ' : char}
        </motion.span>
      ))}
    </span>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add components/hero/name-reveal.tsx
git commit -m "feat: add NameReveal letter-by-letter animation"
```

---

### Task 19: `HighlighterSwipe` component

**Files:**
- Create: `components/hero/highlighter-swipe.tsx`

Wraps a word and draws a horizontal black bar behind it via SVG path animation.

- [ ] **Step 1: Implement**

```tsx
'use client';
import { motion } from 'motion/react';
import type { ReactNode } from 'react';

export function HighlighterSwipe({
  children,
  delay = 0.6,
}: {
  children: ReactNode;
  delay?: number;
}) {
  return (
    <span className="relative inline-block">
      <svg
        aria-hidden="true"
        className="absolute inset-x-[-4%] top-[15%] h-[80%] w-[108%] -z-0"
        viewBox="0 0 100 20"
        preserveAspectRatio="none"
      >
        <motion.path
          d="M 0 10 L 100 10"
          stroke="currentColor"
          strokeWidth="20"
          strokeLinecap="butt"
          fill="none"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.5, delay, ease: [0.65, 0, 0.35, 1] }}
        />
      </svg>
      <span className="relative z-10 text-bg">{children}</span>
    </span>
  );
}
```

(`text-bg` is the off-white token — black bar with white text on top.)

- [ ] **Step 2: Commit**

```bash
git add components/hero/highlighter-swipe.tsx
git commit -m "feat: add HighlighterSwipe with SVG path-draw animation"
```

---

### Task 20: `StatusBlock` component

**Files:**
- Create: `components/hero/status-block.tsx`

The "● Currently — …" line with a pulsing dot.

- [ ] **Step 1: Implement**

```tsx
'use client';
import { motion } from 'motion/react';

export function StatusBlock({ text }: { text: string }) {
  return (
    <div className="flex items-start gap-3 font-mono text-sm text-muted max-w-prose">
      <motion.span
        aria-hidden="true"
        className="mt-1.5 inline-block h-2 w-2 rounded-full bg-fg"
        animate={{ opacity: [1, 0.3, 1] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
      />
      <span>
        <span className="text-fg">Currently</span> — {text}
      </span>
    </div>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add components/hero/status-block.tsx
git commit -m "feat: add StatusBlock with pulsing dot"
```

---

### Task 21: `HeroSection` (assemble)

**Files:**
- Create: `components/hero/hero-section.tsx`
- Test: `tests/components/hero-section.test.tsx`

- [ ] **Step 1: Write the failing test**

```tsx
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { HeroSection } from '@/components/hero/hero-section';

describe('HeroSection', () => {
  it('renders the candidate name as the page h1', () => {
    render(<HeroSection />);
    const h1 = screen.getByRole('heading', { level: 1 });
    expect(h1).toHaveTextContent('Jeremy Woon');
  });

  it('renders the timezone footer text', () => {
    render(<HeroSection />);
    expect(screen.getByText(/KL · GMT\+8/)).toBeInTheDocument();
  });

  it('renders the section number marker', () => {
    render(<HeroSection />);
    expect(screen.getByText('01 / 08')).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run test (verify failure)**

```bash
npm test -- tests/components/hero-section.test.tsx
```
Expected: FAIL.

- [ ] **Step 3: Implement**

```tsx
import { profile } from '@/lib/data';
import { NameReveal } from './name-reveal';
import { HighlighterSwipe } from './highlighter-swipe';
import { StatusBlock } from './status-block';

export function HeroSection() {
  return (
    <section
      id="hero"
      aria-label="Introduction"
      className="relative min-h-screen flex flex-col justify-center px-6 md:px-20"
    >
      <div className="mx-auto w-full max-w-(--container-page)">
        <p className="font-display text-2xl md:text-3xl text-muted mb-6">{profile.intro}</p>
        <h1 className="font-display text-6xl md:text-9xl leading-[0.95] tracking-tight mb-10 md:mb-12">
          <NameReveal text={profile.name} />.
        </h1>
        <p className="font-display text-2xl md:text-4xl leading-snug max-w-3xl mb-12 md:mb-16">
          {profile.tagline}{' '}
          <HighlighterSwipe>{profile.roleHighlight}</HighlighterSwipe>{' '}
          {profile.taglineSuffix}
        </p>
        <StatusBlock text={profile.currently} />
      </div>

      <div className="mx-auto w-full max-w-(--container-page) px-6 md:px-20 absolute inset-x-0 bottom-8 flex justify-between font-mono text-xs text-muted">
        <span>01 / 08</span>
        <span>{profile.timezone}</span>
      </div>
    </section>
  );
}
```

- [ ] **Step 4: Run test (verify pass)**

```bash
npm test -- tests/components/hero-section.test.tsx
```
Expected: pass.

- [ ] **Step 5: Visual check**

Add `<HeroSection />` as the only content in `app/page.tsx`:
```tsx
import { HeroSection } from '@/components/hero/hero-section';
export default function Home() {
  return <main><HeroSection /></main>;
}
```
Run `npm run dev`. Confirm hero renders full-screen with name letter cascade, highlighter swipe, pulsing status dot.

- [ ] **Step 6: Commit**

```bash
git add components/hero/ tests/components/hero-section.test.tsx app/page.tsx
git commit -m "feat: assemble HeroSection with full entrance choreography"
```

---

## Phase 7 — Content Sections

### Task 22: `AboutSection`

**Files:**
- Create: `components/sections/about-section.tsx`

- [ ] **Step 1: Implement**

```tsx
import { profile } from '@/lib/data';
import { Section } from '@/components/layout/section';
import { LineReveal } from '@/components/layout/line-reveal';

export function AboutSection() {
  // Split the about paragraph into sentences for line reveal
  const lines = profile.about.match(/[^.!?]+[.!?]+\s*/g)?.map(s => s.trim()) ?? [profile.about];

  return (
    <Section id="about" number="01" title="About">
      <LineReveal
        lines={lines}
        className="font-display text-2xl md:text-3xl leading-snug max-w-3xl text-fg"
      />
    </Section>
  );
}
```

- [ ] **Step 2: Add to `app/page.tsx`**

```tsx
import { HeroSection } from '@/components/hero/hero-section';
import { AboutSection } from '@/components/sections/about-section';
export default function Home() {
  return (
    <main>
      <HeroSection />
      <AboutSection />
    </main>
  );
}
```

- [ ] **Step 3: Visual check**

`npm run dev`, scroll to About. Numeral, title, and paragraph should all reveal as they enter view.

- [ ] **Step 4: Commit**

```bash
git add components/sections/about-section.tsx app/page.tsx
git commit -m "feat: add AboutSection with line-by-line reveal"
```

---

### Task 23: `EducationSection`

**Files:**
- Create: `components/sections/education-section.tsx`

- [ ] **Step 1: Implement**

```tsx
import { education } from '@/lib/data';
import { Section } from '@/components/layout/section';

export function EducationSection() {
  return (
    <Section id="education" number="02" title="Education">
      <div className="max-w-3xl">
        <h3 className="font-display text-2xl md:text-3xl mb-2">{education.institution}</h3>
        <p className="text-fg/80 mb-1">{education.degree}</p>
        <p className="font-mono text-sm text-muted mb-1">
          {education.location} · {education.start} – {education.end}
        </p>
        <p className="font-mono text-sm text-muted mb-10">CGPA {education.cgpa}</p>

        <p className="font-mono text-xs text-muted uppercase tracking-wider mb-3">
          Relevant coursework
        </p>
        <ul className="flex flex-wrap gap-x-2 gap-y-2 text-fg/80">
          {education.coursework.map((c, i) => (
            <li key={c} className="font-mono text-sm">
              {c}
              {i < education.coursework.length - 1 && <span className="text-muted"> ·</span>}
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}
```

- [ ] **Step 2: Add to `app/page.tsx` and visual check**

```bash
npm run dev
```
Scroll to Education. Confirm layout matches: institution as a serif sub-heading, mono metadata, coursework as a wrapping pipe-separated list.

- [ ] **Step 3: Commit**

```bash
git add components/sections/education-section.tsx app/page.tsx
git commit -m "feat: add EducationSection"
```

---

### Task 24: `SkillsSection`

**Files:**
- Create: `components/sections/skills-section.tsx`

- [ ] **Step 1: Implement**

```tsx
import { skills } from '@/lib/data';
import { Section } from '@/components/layout/section';

export function SkillsSection() {
  return (
    <Section id="skills" number="03" title="Skills">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-14 max-w-4xl">
        {skills.map(group => (
          <div key={group.group}>
            <p className="font-mono text-xs text-muted uppercase tracking-wider mb-4">
              {group.group}
            </p>
            <ul className="space-y-2">
              {group.items.map(item => (
                <li key={item} className="font-display text-xl md:text-2xl">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </Section>
  );
}
```

- [ ] **Step 2: Visual check, then commit**

```bash
git add components/sections/skills-section.tsx app/page.tsx
git commit -m "feat: add SkillsSection (3-column grouped layout)"
```

---

### Task 25: `ProjectCard` component

**Files:**
- Create: `components/sections/project-card.tsx`
- Test: `tests/components/project-card.test.tsx`

- [ ] **Step 1: Write the failing test**

```tsx
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ProjectCard } from '@/components/sections/project-card';
import type { Project } from '@/lib/data';

const sample: Project = {
  id: 'P/01',
  name: 'Pulse',
  tagline: 'Real-time anomaly detection.',
  description: 'Final-year project.',
  stack: ['Next.js', 'FastAPI'],
  links: [{ label: 'repo', href: 'https://example.com' }],
};

describe('ProjectCard', () => {
  it('renders id, name, tagline, description', () => {
    render(<ProjectCard project={sample} />);
    expect(screen.getByText('P/01')).toBeInTheDocument();
    expect(screen.getByText('Pulse')).toBeInTheDocument();
    expect(screen.getByText('Real-time anomaly detection.')).toBeInTheDocument();
    expect(screen.getByText('Final-year project.')).toBeInTheDocument();
  });

  it('renders each stack tag and link', () => {
    render(<ProjectCard project={sample} />);
    expect(screen.getByText('Next.js')).toBeInTheDocument();
    expect(screen.getByText('FastAPI')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /repo/ })).toHaveAttribute('href', 'https://example.com');
  });
});
```

- [ ] **Step 2: Run test (verify failure)**

```bash
npm test -- tests/components/project-card.test.tsx
```
Expected: FAIL.

- [ ] **Step 3: Implement**

```tsx
'use client';
import { motion } from 'motion/react';
import type { Project } from '@/lib/data';

export function ProjectCard({ project }: { project: Project }) {
  return (
    <motion.article
      className="group relative border border-border p-6 md:p-8 transition-colors hover:border-fg"
      whileHover={{ y: -2 }}
      transition={{ duration: 0.2 }}
    >
      <div className="flex items-baseline justify-between mb-4">
        <span className="font-mono text-xs text-muted transition-transform group-hover:scale-105">
          {project.id}
        </span>
      </div>
      <h3 className="font-display text-3xl md:text-4xl mb-2">
        {project.name}{' '}
        <span className="inline-block transition-transform group-hover:translate-x-1.5">→</span>
      </h3>
      <p className="text-fg/80 mb-2 max-w-prose">{project.tagline}</p>
      <p className="text-muted text-sm mb-6 max-w-prose">{project.description}</p>

      <div className="flex flex-wrap gap-x-3 gap-y-1 mb-6">
        {project.stack.map(s => (
          <span key={s} className="font-mono text-xs text-muted">
            {s}
          </span>
        ))}
      </div>

      <div className="flex gap-6">
        {project.links.map(l => (
          <a
            key={l.label}
            href={l.href}
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-sm text-fg underline-offset-4 hover:underline"
          >
            → {l.label}
          </a>
        ))}
      </div>
    </motion.article>
  );
}
```

- [ ] **Step 4: Run test (verify pass)**

```bash
npm test -- tests/components/project-card.test.tsx
```
Expected: pass.

- [ ] **Step 5: Commit**

```bash
git add components/sections/project-card.tsx tests/components/project-card.test.tsx
git commit -m "feat: add ProjectCard with hover micro-interactions"
```

---

### Task 26: `ProjectsSection`

**Files:**
- Create: `components/sections/projects-section.tsx`

- [ ] **Step 1: Implement**

```tsx
import { projects } from '@/lib/data';
import { Section } from '@/components/layout/section';
import { ProjectCard } from './project-card';

export function ProjectsSection() {
  return (
    <Section id="projects" number="04" title="Selected projects">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
        {projects.map(p => (
          <ProjectCard key={p.id} project={p} />
        ))}
      </div>
    </Section>
  );
}
```

- [ ] **Step 2: Visual check, then commit**

```bash
git add components/sections/projects-section.tsx app/page.tsx
git commit -m "feat: add ProjectsSection (2-column grid of cards)"
```

---

### Task 27: `ExperienceSection`

**Files:**
- Create: `components/sections/experience-section.tsx`

- [ ] **Step 1: Implement**

```tsx
import { experience } from '@/lib/data';
import { Section } from '@/components/layout/section';

export function ExperienceSection() {
  return (
    <Section id="experience" number="05" title="Experience">
      <div className="max-w-3xl space-y-12">
        {experience.map(e => (
          <article key={`${e.company}-${e.start}`}>
            <h3 className="font-display text-2xl md:text-3xl mb-1">
              {e.role} — {e.company}
            </h3>
            <p className="font-mono text-sm text-muted mb-6">
              {e.location} · {e.start} – {e.end}
            </p>
            <ul className="space-y-3 text-fg/80">
              {e.bullets.map((b, i) => (
                <li key={i} className="flex gap-3">
                  <span className="font-mono text-muted shrink-0">·</span>
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </Section>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add components/sections/experience-section.tsx app/page.tsx
git commit -m "feat: add ExperienceSection"
```

---

### Task 28: `CertificationsSection`

**Files:**
- Create: `components/sections/certifications-section.tsx`

- [ ] **Step 1: Implement**

```tsx
import { certifications } from '@/lib/data';
import { Section } from '@/components/layout/section';

export function CertificationsSection() {
  return (
    <Section id="certifications" number="06" title="Certifications & achievements">
      <ul className="max-w-3xl divide-y divide-border">
        {certifications.map(c => (
          <li
            key={`${c.year}-${c.title}`}
            className="grid grid-cols-[6rem_1fr] gap-6 py-4"
          >
            <span className="font-mono text-sm text-muted">{c.year}</span>
            <span className="font-display text-xl md:text-2xl">{c.title}</span>
          </li>
        ))}
      </ul>
    </Section>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add components/sections/certifications-section.tsx app/page.tsx
git commit -m "feat: add CertificationsSection"
```

---

### Task 29: `ContactSection`

**Files:**
- Create: `components/sections/contact-section.tsx`

- [ ] **Step 1: Implement**

```tsx
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
```

- [ ] **Step 2: Commit**

```bash
git add components/sections/contact-section.tsx app/page.tsx
git commit -m "feat: add ContactSection with magnetic links + resume download"
```

---

### Task 30: `Footer`

**Files:**
- Create: `components/sections/footer.tsx`

- [ ] **Step 1: Implement**

```tsx
import { profile } from '@/lib/data';

export function Footer() {
  const year = new Date().getFullYear();
  const lastUpdated = new Date().toLocaleDateString('en-US', {
    month: 'long',
    year: 'numeric',
  });
  return (
    <footer className="border-t border-border">
      <div className="mx-auto max-w-(--container-page) px-6 md:px-20 py-8 flex flex-col md:flex-row justify-between gap-4 font-mono text-xs text-muted">
        <span>
          © {year} {profile.name}
        </span>
        <span>Built with Next.js · Last updated {lastUpdated}</span>
      </div>
    </footer>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add components/sections/footer.tsx
git commit -m "feat: add Footer"
```

---

## Phase 8 — Page Assembly + Globals

### Task 31: Assemble the full page

**Files:**
- Modify: `app/page.tsx`

- [ ] **Step 1: Replace `app/page.tsx`**

```tsx
import { HeroSection } from '@/components/hero/hero-section';
import { AboutSection } from '@/components/sections/about-section';
import { EducationSection } from '@/components/sections/education-section';
import { SkillsSection } from '@/components/sections/skills-section';
import { ProjectsSection } from '@/components/sections/projects-section';
import { ExperienceSection } from '@/components/sections/experience-section';
import { CertificationsSection } from '@/components/sections/certifications-section';
import { ContactSection } from '@/components/sections/contact-section';
import { Footer } from '@/components/sections/footer';
import { CustomCursor } from '@/components/navigation/custom-cursor';
import { ScrollProgress } from '@/components/navigation/scroll-progress';

export default function Home() {
  return (
    <>
      <CustomCursor />
      <ScrollProgress />
      <main>
        <HeroSection />
        <AboutSection />
        <EducationSection />
        <SkillsSection />
        <ProjectsSection />
        <ExperienceSection />
        <CertificationsSection />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
```

- [ ] **Step 2: Visual check the full page**

```bash
npm run dev
```
Scroll the entire page. Verify:
- Custom cursor follows on desktop
- Cursor ring expands on the magnetic contact links
- Each section reveals (numeral + title + body) as it enters viewport
- Hairline scroll progress fills on the right edge
- `→ NN / Section` indicator appears top-right after the hero
- Footer renders at the bottom

Note any layout issues to fix before commit.

- [ ] **Step 3: Commit**

```bash
git add app/page.tsx
git commit -m "feat: assemble all sections into the home page"
```

---

### Task 32: Add `prefers-reduced-motion` smoke test

**Files:**
- Modify: `tests/e2e/smoke.spec.ts`

- [ ] **Step 1: Expand the smoke test**

```ts
import { test, expect } from '@playwright/test';

test.describe('home page', () => {
  test('renders the candidate name as h1', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByRole('heading', { level: 1 })).toContainText('Jeremy Woon');
  });

  test('renders all 8 sections', async ({ page }) => {
    await page.goto('/');
    for (const id of ['hero', 'about', 'education', 'skills', 'projects', 'experience', 'certifications', 'contact']) {
      await expect(page.locator(`#${id}`)).toBeVisible();
    }
  });

  test('resume download link points to /resume.pdf', async ({ page }) => {
    await page.goto('/');
    const link = page.getByRole('link', { name: /download resume pdf/i });
    await expect(link).toHaveAttribute('href', '/resume.pdf');
  });

  test('honours prefers-reduced-motion (no custom cursor)', async ({ browser }) => {
    const context = await browser.newContext({ reducedMotion: 'reduce' });
    const page = await context.newPage();
    await page.goto('/');
    // The custom cursor body class should not be applied
    await expect(page.locator('body.has-custom-cursor')).toHaveCount(0);
    await context.close();
  });
});
```

- [ ] **Step 2: Add a placeholder PDF so the resume link doesn't 404 in tests**

```bash
# Any small PDF works as a placeholder. On Windows, use this PowerShell snippet:
# powershell -Command "[IO.File]::WriteAllBytes('public/resume.pdf', [byte[]](37,80,68,70,45,49,46,52,10,37,37,69,79,70))"
```

If you have access to PowerShell, run the snippet above. Otherwise, drop any small `resume.pdf` into `public/`.

- [ ] **Step 3: Run E2E**

```bash
npm run test:e2e
```
Expected: 4 passed.

- [ ] **Step 4: Commit**

```bash
git add tests/e2e/smoke.spec.ts public/resume.pdf
git commit -m "test: expand smoke E2E to cover sections, resume, reduced-motion"
```

---

## Phase 9 — SEO & Metadata

### Task 33: Full metadata + structured data + OG image

**Files:**
- Modify: `app/layout.tsx`
- Create: `public/og-image.png` (placeholder)

- [ ] **Step 1: Replace metadata in `app/layout.tsx`**

```tsx
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
```

- [ ] **Step 2: Add JSON-LD `Person` to the layout**

In `app/layout.tsx`, inside `<body>`, before `{children}`:

```tsx
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
      address: { '@type': 'PostalAddress', addressLocality: 'Kuala Lumpur', addressCountry: 'MY' },
    }),
  }}
/>
```

- [ ] **Step 3: Drop a placeholder OG image**

Place a 1200×630 PNG at `public/og-image.png`. A simple monochrome banner with "Jeremy Woon — Portfolio" works as a placeholder.

- [ ] **Step 4: Commit**

```bash
git add app/layout.tsx public/og-image.png
git commit -m "feat: add OG metadata, Twitter card, and Person JSON-LD"
```

---

### Task 34: Sitemap + robots.txt

**Files:**
- Create: `app/sitemap.ts`, `app/robots.ts`

- [ ] **Step 1: Create `app/sitemap.ts`**

```ts
import type { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://jeremywoon.dev',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
  ];
}
```

- [ ] **Step 2: Create `app/robots.ts`**

```ts
import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: '*', allow: '/' },
    sitemap: 'https://jeremywoon.dev/sitemap.xml',
  };
}
```

- [ ] **Step 3: Verify**

```bash
npm run dev
```
Visit `http://localhost:3000/sitemap.xml` and `http://localhost:3000/robots.txt`. Both should serve correctly.

- [ ] **Step 4: Commit**

```bash
git add app/sitemap.ts app/robots.ts
git commit -m "feat: add sitemap.ts and robots.ts"
```

---

### Task 35: Add `favicon.svg`

**Files:**
- Create: `app/icon.svg`

- [ ] **Step 1: Create a minimal monochrome favicon**

Create `app/icon.svg`:
```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
  <rect width="32" height="32" fill="#0A0A0A"/>
  <text x="16" y="22" font-family="serif" font-size="20" font-weight="400" fill="#FAFAF7" text-anchor="middle">J</text>
</svg>
```

(Next.js auto-detects `app/icon.svg` and serves it as the favicon.)

- [ ] **Step 2: Commit**

```bash
git add app/icon.svg
git commit -m "feat: add monochrome 'J' favicon"
```

---

## Phase 10 — Verification & Deploy

### Task 36: Full local verification pass

- [ ] **Step 1: Type-check, lint, unit tests, E2E**

```bash
npm run typecheck
npm run lint
npm test
npm run test:e2e
```
Expected: all pass.

- [ ] **Step 2: Production build**

```bash
npm run build
```
Expected: build succeeds with no errors. Note any unused dependency warnings.

- [ ] **Step 3: Run production server, manually verify**

```bash
npm start
```
Visit `http://localhost:3000`. Confirm:
- Hero entrance plays once on load
- Custom cursor active on desktop
- Each section reveals on scroll
- Magnetic contact links pull subtly toward cursor
- Resume download triggers
- Scroll progress hairline + section indicator update correctly
- DevTools → Lighthouse → run audit. Targets: Performance ≥ 95, Accessibility ≥ 95, Best Practices ≥ 95, SEO ≥ 95.

- [ ] **Step 4: Mobile/responsive check**

Use DevTools device emulation: iPhone 14 Pro and iPad. Confirm:
- No custom cursor (touch device)
- No magnetic effect
- Sections stack vertically, numeral collapses above title (or sits inline depending on breakpoint)
- Tap targets ≥ 44px (Lighthouse will flag)

- [ ] **Step 5: Honour `prefers-reduced-motion`**

DevTools → Rendering → "Emulate CSS prefers-reduced-motion: reduce". Reload. Confirm: no hero cascade, no scroll reveals, no cursor.

- [ ] **Step 6: Fix any issues, re-run all checks, commit**

```bash
git add .
git commit -m "chore: verification pass — all checks green"
```

(Skip the commit step if there were no fixes.)

---

### Task 37: Push to GitHub

- [ ] **Step 1: Create a GitHub repo**

Either via the gh CLI (if installed) or the GitHub UI:
```bash
gh repo create jeremywoon/portfolio --public --source=. --remote=origin --push
```
Or manually create the repo on github.com and:
```bash
git remote add origin https://github.com/jeremywoon/portfolio.git
git branch -M main
git push -u origin main
```

- [ ] **Step 2: Confirm push succeeded**

Visit the repo URL in a browser. All commits should be visible.

---

### Task 38: Deploy to Vercel

- [ ] **Step 1: Import the repo on Vercel**

- Go to https://vercel.com/new
- Import the `jeremywoon/portfolio` repo
- Framework: detected as Next.js (no overrides needed)
- No environment variables needed
- Click "Deploy"

- [ ] **Step 2: Verify the production URL**

Vercel will assign a `*.vercel.app` URL. Open it and run through the same manual checks as Task 36.

- [ ] **Step 3: Run Lighthouse on the deployed URL**

DevTools → Lighthouse → run on the live deployment. Confirm scores meet targets. If Performance is below 95, check the Vercel build log for warnings (often font loading or unoptimised images).

- [ ] **Step 4: (Optional) Custom domain**

If you have `jeremywoon.dev` (or any owned domain), add it in Vercel → Project → Settings → Domains. Vercel provides DNS records to add to your registrar.

- [ ] **Step 5: Final commit**

```bash
# Update README with the live URL
```

Edit `README.md`:
```markdown
# Portfolio

Personal portfolio of Jeremy Woon, final-year IT student at APU.

**Live:** https://<your-vercel-url>

## Stack
- Next.js 15 (App Router)
- TypeScript
- Tailwind CSS v4
- Framer Motion
- Vitest + Playwright
- Vercel

## Local development
```bash
npm install
npm run dev
```

## Verification
```bash
npm run typecheck
npm run lint
npm test
npm run test:e2e
```
```

```bash
git add README.md
git commit -m "docs: add live URL and quick-start to README"
git push
```

---

## Done Criteria

The plan is complete when:
- All 38 tasks committed
- All unit and E2E tests green
- Lighthouse on the production URL: Performance ≥ 95, Accessibility ≥ 95, Best Practices ≥ 95, SEO ≥ 95
- Manual checks pass on desktop and mobile, with and without `prefers-reduced-motion`
- Production URL accessible and the README points to it
