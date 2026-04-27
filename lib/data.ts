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
