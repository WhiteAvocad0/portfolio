export const profile = {
  name: 'Jeremy Woon',
  eyebrow: 'Portfolio · v2.0',
  available: 'Available · Sept 2026',
  versionTag: 'v2.0',
  role: 'Grad SWE',
  status: 'Open · Sept 2026',
  shortStack: 'TS · Python · Node',
  location: 'Kuala Lumpur, MY',
  city: 'Kuala Lumpur',
  swipeWord: 'software',
  hero: {
    education: 'BSc IT · APU',
    focus: 'Software Engineering',
    cgpa: '3.7 / 4.0',
  },
  about: {
    lead: 'Final-year Information Technology student at Asia Pacific University (APU), specialising in Software Engineering — graduating Sept 2026.',
    body: 'I write TypeScript on the front, a mix of Node and Python on the back, and just enough cloud to make it all work. Outside coursework, I build small tools, contribute to a couple of open-source repos, and lose evenings to system-design rabbit holes.',
    note: 'I care about clear interfaces, fast feedback loops, and software that respects the people using it. Looking for a graduate role where I can keep learning from senior engineers and ship things that matter.',
  },
  cta: {
    label: 'Currently',
    title: 'Open to graduate SWE roles starting Sept 2026.',
    action: 'Send a note',
  },
  contact: {
    email: 'hello@jeremywoon.dev',
    github: 'github.com/jeremywoon',
    githubUrl: 'https://github.com/jeremywoon',
    linkedin: 'linkedin.com/in/jeremywoon',
    linkedinUrl: 'https://linkedin.com/in/jeremywoon',
    resumeUrl: '/resume.pdf',
  },
} as const;

export type SkillItem = {
  readonly name: string;
  readonly years: string;
  readonly pct: number;
};

export type SkillGroup = {
  readonly title: string;
  readonly items: readonly SkillItem[];
};

export const skills: readonly SkillGroup[] = [
  {
    title: 'Languages & Frameworks',
    items: [
      { name: 'TypeScript', years: '3 yrs · daily', pct: 90 },
      { name: 'React + Next.js', years: '3 yrs · daily', pct: 88 },
      { name: 'Python', years: '2 yrs', pct: 75 },
      { name: 'Node + FastAPI', years: '2 yrs', pct: 70 },
      { name: 'Java', years: '1 yr · coursework', pct: 50 },
    ],
  },
  {
    title: 'Infra & Tools',
    items: [
      { name: 'PostgreSQL', years: '2 yrs', pct: 72 },
      { name: 'Docker', years: '1 yr', pct: 60 },
      { name: 'Vercel', years: '2 yrs', pct: 78 },
      { name: 'GitHub Actions', years: '1 yr', pct: 55 },
      { name: 'AWS', years: 'basics', pct: 35 },
    ],
  },
] as const;

export type TrailEvent = {
  readonly yearMain: string;
  readonly yearTag: string;
  readonly kind: string;
  readonly title: string;
  readonly org: string;
  readonly body?: string;
  readonly bullets?: readonly string[];
  readonly tags?: readonly string[];
  readonly now?: boolean;
};

export const trail: readonly TrailEvent[] = [
  {
    now: true,
    yearMain: '2026',
    yearTag: 'now',
    kind: 'Final-year project',
    title: 'Pulse — real-time anomaly detection',
    org: 'Asia Pacific University · Self-directed',
    body: 'End-to-end build: model, ingest pipeline, dashboard. Sustained ~5k events/sec on commodity hardware, with annotated time-series and shareable incident links.',
    bullets: [
      'JSON logs over WebSocket; isolation-forest scoring served via FastAPI.',
      'Threshold tuned against synthetic + replayed prod traffic.',
    ],
    tags: ['Next.js', 'FastAPI', 'Postgres', 'Docker'],
  },
  {
    yearMain: 'Jun 2025',
    yearTag: 'Aug 25',
    kind: 'Internship · 3 months',
    title: 'Software Engineering Intern',
    org: 'Acme Sdn Bhd · Kuala Lumpur',
    bullets: [
      'Built an admin dashboard (Next.js + tRPC) that cut manual ops time by ~30%.',
      'Wrote integration tests covering the billing flow; caught two production-blocking regressions before release.',
      'Paired weekly with senior engineers on code reviews and architectural decisions.',
    ],
    tags: ['Next.js', 'tRPC', 'Vitest'],
  },
  {
    yearMain: '2025',
    yearTag: 'cert',
    kind: 'Certification',
    title: 'AWS Certified Cloud Practitioner',
    org: 'Amazon Web Services',
  },
  {
    yearMain: '2024',
    yearTag: 'award',
    kind: 'Hackathon · Top 5',
    title: 'APU Hackathon 2024 — team of 3',
    org: '48-hour build, judged by industry mentors',
  },
  {
    yearMain: '2024',
    yearTag: 'cert',
    kind: 'Certification',
    title: 'Google Cybersecurity Professional Certificate',
    org: 'Coursera · Google',
  },
  {
    yearMain: '2023 — 2026',
    yearTag: 'school',
    kind: 'Education',
    title: 'BSc (Hons) Information Technology',
    org: 'Asia Pacific University, Kuala Lumpur · CGPA 3.7',
    body: 'Specialisation in Software Engineering. Coursework across Data Structures, Algorithms, OS, Distributed Systems, Cloud Computing, Software Architecture.',
    tags: ["Dean's List · Sem 2 2023"],
  },
] as const;

export type Project = {
  readonly id: string;
  readonly year: string;
  readonly title: string;
  readonly subtitle: string;
  readonly description: string;
  readonly stack: readonly string[];
  readonly href: string;
};

export const projects: readonly Project[] = [
  {
    id: 'P / 01',
    year: '2026',
    title: 'Pulse',
    subtitle: 'Final-year project',
    description:
      'Real-time anomaly detection for log streams. WebSocket ingest, isolation-forest scoring, Next.js dashboard.',
    stack: ['Next.js · TS', 'FastAPI', 'Postgres · Docker'],
    href: '#',
  },
  {
    id: 'P / 02',
    year: '2025',
    title: 'Inkwell',
    subtitle: 'Personal',
    description:
      'Markdown-first note app with offline sync. CRDT replication, full-text search, keyboard-first UX.',
    stack: ['React · TS', 'IndexedDB', 'Rust (WASM)'],
    href: '#',
  },
  {
    id: 'P / 03',
    year: '2024',
    title: 'APU Timetable',
    subtitle: 'Tool · 40 active users',
    description:
      'CLI + iCal feed for APU class timetables. Built for myself, ended up with classmates as users; survived two portal redesigns.',
    stack: ['Python', 'BeautifulSoup', 'GH Actions'],
    href: '#',
  },
] as const;

export const sections = [
  { number: '01', label: 'About' },
  { number: '02', label: 'Skills' },
  { number: '03', label: 'Trail' },
  { number: '04', label: 'Projects' },
  { number: '05', label: 'Contact' },
] as const;
