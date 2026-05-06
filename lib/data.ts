export const profile = {
  name: 'Jeremy Woon',
  fullName: 'Jeremy Woon Zhe Ming',
  available: 'Available · Sept 2026',
  status: 'Open · Sept 2026',
  location: 'Kuala Lumpur, MY',
  city: 'Kuala Lumpur',
  swipeWord: 'enterprise',
  languages: 'EN · 中 · BM',
  about: {
    lead: 'Final-year IT student at Asia Pacific University. Curious about systems of every kind — networks, code, homelab rigs, lenses pointed at the night sky.',
    note: 'Red Hat certified on Linux fundamentals, with a foundation in networking, programming, and databases. Comfortable across Windows, macOS, and Linux — trilingual in English, Mandarin, and Bahasa Malaysia. Off the clock you’ll find me chasing comets through a telescope or shooting portraits and food on assignment. Looking for a graduate IT support role where I can keep learning from senior engineers.',
  },
  cta: {
    label: 'Currently',
    title: 'Open to graduate IT support roles starting Sept 2026.',
    action: 'Send a message',
  },
  station: {
    role: 'Final-year IT student',
    studies: 'BSc IT · APU · CGPA 3.67',
    timezone: 'Malaysia · UTC+8',
    available: 'September 2026',
    focus: 'Linux · Microsoft 365 · Active Directory',
    broadcasting: ['Linux · RH124', 'Active Directory', 'M365 · SharePoint', 'Palo Alto VPN'],
  },
  contact: {
    email: 'tp073616@mail.apu.edu.my',
    // TODO(jeremy): replace these placeholders with your real LinkedIn / GitHub
    // when ready, then update the corresponding text shown in the contact section.
    github: 'github.com/jeremywoon',
    githubUrl: 'https://github.com/jeremywoon',
    linkedin: 'linkedin.com/in/jeremywoon',
    linkedinUrl: 'https://linkedin.com/in/jeremywoon',
    // Drop the actual PDF at /public/resume.pdf — the file in the repo today
    // is /resume.html (a styled HTML CV). Export to PDF and place it here.
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
    title: 'Enterprise IT',
    items: [
      { name: 'Microsoft 365 / SharePoint', years: 'internship · daily', pct: 82 },
      { name: 'Active Directory', years: 'internship', pct: 75 },
      { name: 'Palo Alto VPN', years: 'internship · migration', pct: 65 },
      { name: 'CrowdStrike EDR', years: 'internship · rollout', pct: 60 },
      { name: 'Acronis Patch Mgmt', years: 'internship · daily', pct: 65 },
    ],
  },
  {
    title: 'Systems & Code',
    items: [
      { name: 'Windows / macOS', years: '4 yrs · daily', pct: 88 },
      { name: 'Linux (Red Hat)', years: 'RH124 + RH104', pct: 78 },
      { name: 'Python', years: '3 yrs · coursework', pct: 75 },
      { name: 'Java', years: '2 yrs · coursework', pct: 70 },
      { name: 'SQL / MySQL', years: '2 yrs · coursework', pct: 65 },
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
    yearMain: '2023 — 2026',
    yearTag: 'now',
    kind: 'Education · current',
    title: 'BSc (Hons) Information Technology',
    org: 'Asia Pacific University, Kuala Lumpur · CGPA 3.67 / 4.0',
    body: 'Coursework across networking (TCP/IP, topologies), programming (Python, C, Java OOP), web development, relational databases, Linux fundamentals, and R for statistical computing.',
    tags: ['TCP/IP', 'Python · Java · C', 'SQL', 'Linux', 'R'],
  },
  {
    yearMain: 'May 2025',
    yearTag: 'Sep 25',
    kind: 'Internship · 16 weeks',
    title: 'IT Intern',
    org: 'MunchWorld Marketing Sdn Bhd · Klang',
    bullets: [
      'Resolved daily helpdesk tickets across HQ and branch offices: Outlook, Microsoft 365, Active Directory user/group management, hardware and network connectivity.',
      'Led a multi-site PC refresh: imaged, configured, and deployed new desktops/laptops, migrated user data, and managed secure disposal of legacy hardware.',
      'Assisted company-wide VPN migration from Fortinet to Palo Alto — configuration, testing, end-user support during rollout.',
      'Supported CrowdStrike EDR deployment and daily Acronis patch monitoring across endpoints, working with the international IT team.',
      'Authored handover docs (daily checklist, vendor contacts, troubleshooting guides) and trained the incoming intern.',
    ],
    tags: ['Active Directory', 'M365', 'Palo Alto', 'CrowdStrike', 'Acronis'],
  },
  {
    yearMain: '2025',
    yearTag: 'cert',
    kind: 'Certification',
    title: 'Red Hat Certified Administration I (RH124)',
    org: 'Red Hat',
  },
  {
    yearMain: '2024',
    yearTag: 'cert',
    kind: 'Certification',
    title: 'Getting Started with Red Hat Linux Fundamentals (RH104)',
    org: 'Red Hat',
  },
  {
    yearMain: '2022 — now',
    yearTag: 'side',
    kind: 'Freelance · ongoing',
    title: 'Freelance Photographer',
    org: 'Kuala Lumpur, Malaysia',
    body: 'Portrait and commercial food photography — concept, shoot, edit, deliver. Builds the same client-management and deadline muscles I use at the helpdesk.',
  },
  {
    yearMain: '2016 — 2022',
    yearTag: 'school',
    kind: 'Education',
    title: 'SPM & UEC',
    org: 'Foon Yew High School, Kulai · Accounting stream',
  },
] as const;

export type Project = {
  readonly id: string;
  readonly year: string;
  readonly title: string;
  readonly subtitle: string;
  readonly description: string;
  readonly stack: readonly string[];
  readonly href?: string;
};

export const projects: readonly Project[] = [
  {
    id: 'P / 01',
    year: '2024',
    title: 'Hall Booking Management System',
    subtitle: 'Java coursework · 12 weeks',
    description:
      'Java + Swing GUI for hall reservations with role-based access control, authentication, file-backed persistence, and backup/restore plus system-init checks.',
    stack: ['Java · Swing', 'File I/O', 'RBAC'],
  },
  {
    id: 'P / 02',
    year: '2020 — 2022',
    title: 'Campus Tour iOS App',
    subtitle: 'Self-taught build',
    description:
      'iOS app in Swift with Firebase backend — user authentication, real-time data, and media management. Built end-to-end while teaching myself Swift and backend integration.',
    stack: ['Swift · iOS', 'Firebase', 'Auth · Realtime'],
  },
  {
    id: 'P / 03',
    year: 'ongoing',
    title: 'Custom Workstation & Storage Lab',
    subtitle: 'Homelab · IT infrastructure',
    description:
      'Hand-built PCs and a TrueNAS storage server. Configured multiple operating systems including Hackintosh, customised HP workstation hardware — the kind of homelab work that backs up the helpdesk skills.',
    stack: ['TrueNAS', 'Hackintosh', 'HP HW'],
  },
] as const;

export const sectionMeta = {
  about:    { number: '01', label: 'About' },
  skills:   { number: '02', label: 'Skills' },
  trail:    { number: '03', label: 'Trail' },
  projects: { number: '04', label: 'Projects' },
  contact:  { number: '05', label: 'Contact' },
} as const;

export type SectionKey = keyof typeof sectionMeta;
