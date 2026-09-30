/**
 * Single source of truth for every fact on the site.
 * Facts follow Shanmugam's master profile (v4, updated 2026-09-30).
 * Before adding a claim, check it is real: no invented metrics, user counts or titles.
 */
import type {
  CapabilityItem,
  CaseStudy,
  Credential,
  LegendEntry,
  Logo,
  Part,
  Post,
  Role,
  ShippedFor,
  SkillGroup,
  Stat,
} from '@/types';

export const site = {
  url: 'https://shanmugam-portfolio.vercel.app',
  title: 'Shanmugam R · Full-Stack Developer · React, Next.js, Node.js',
  description:
    'Frontend-first full-stack developer in Chennai with 2.5+ years in production. Built the Telangana government DEET job portal, Workruit SaaS and a solo Next.js and Express platform, with deployment and SEO handled end to end. Open to full-time roles, immediate joiner.',
};

export const person = {
  name: 'Shanmugam R',
  role: 'Full-Stack Developer',
  focus: 'Frontend-first · React.js · Next.js · Node.js',
  experience: '2.5+ years',
  location: 'Chennai, Tamil Nadu, India',
  email: 'shanmugamrskfamily@gmail.com',
  phone: '+91 78453 71892',
  resumeUrl: 'https://drive.google.com/file/d/1OyTjiWBmbqbmVzNReCG0n_-d61jAyivb/view',
  linkedin: 'https://www.linkedin.com/in/shanmugamrskfamily/',
  github: 'https://github.com/Shanmugamrskfamily',
  hackerrank: 'https://www.hackerrank.com/profile/shanmugamr',
  photo: { src: '/images/profile.png', alt: 'Shanmugam R', width: 400, height: 400 },
};

export const openToWork = {
  roles: ['Full-Stack Developer', 'Frontend Developer'],
  locations: ['Chennai', 'Bangalore', 'Hyderabad'],
  workModes: ['On-site', 'Hybrid', 'Remote'],
  employmentType: 'Full-time',
  notice: 'Immediate joiner',
};

/** Public stats. Keep in step with the GitHub README; never inflate. */
export const stats: Stat[] = [
  { value: '6', label: 'production products' },
  { value: '2', label: 'government applications' },
  { value: '2', label: 'custom auth systems' },
  { value: '3', label: 'live domains' },
  { value: '260+', label: 'statically generated pages' },
];

const logo = (src: string, alt: string, width: number, height: number): Logo => ({
  src,
  alt,
  width,
  height,
});

export const logos = {
  deet: logo('/logos/deet.svg', 'DEET', 143, 44),
  workruit: logo('/logos/workruit.svg', 'Workruit', 419, 126),
  rs: logo('/logos/rs-technologies.png', 'RS Technologies', 705, 349),
  storytech: logo('/logos/storytech.png', 'Storytech', 774, 258),
  veritech: logo('/logos/veritech.svg', 'VeriTech', 512, 512),
  senchola: logo('/logos/senchola.avif', 'Senchola', 256, 256),
  michelin: logo('/logos/michelin.png', 'Michelin', 768, 432),
  hackerrank: logo('/logos/hackerrank-icon.png', 'HackerRank', 256, 256),
};

export const shippedFor: ShippedFor[] = [
  {
    name: 'DEET',
    note: 'Government of Telangana',
    href: 'https://deet.telangana.gov.in',
    logo: logos.deet,
  },
  {
    name: 'Workruit',
    note: 'B2B recruitment SaaS',
    href: 'https://app.workruit.com',
    logo: logos.workruit,
  },
  {
    name: 'RS Technologies',
    note: 'Security systems, Chennai',
    href: 'https://rstechnologies.in/',
    logo: logos.rs,
  },
];

export const capabilities: CapabilityItem[] = [
  {
    key: 'fe',
    name: 'Frontend-first',
    summary:
      'Next.js App Router, SSR and SSG, Redux Toolkit, and Formik forms that survive a refresh. Figma to responsive, production-ready UI.',
    proof: 'Sole frontend developer on six production products',
  },
  {
    key: 'be',
    name: 'Full stack',
    summary:
      'Node.js, Express and MongoDB behind the interface, with authentication and access control I design myself.',
    proof: 'Two custom auth systems, including 4-role JWT/RBAC',
  },
  {
    key: 'ops',
    name: 'Deployment',
    summary:
      'Vercel, AWS Amplify and S3, Netlify, domains and DNS, scheduled jobs, and basic CI with GitHub Actions.',
    proof: 'Moved a live business off WordPress with zero downtime',
  },
  {
    key: 'seo',
    name: 'SEO',
    summary:
      'Technical and local SEO built in from day one: static generation, JSON-LD, sitemaps, Search Console and Bing.',
    proof: '260+ crawlable pages from one product data source',
  },
];

export const parts: Part[] = [
  {
    item: 1,
    caseId: 'deet',
    capabilities: ['fe', 'seo'],
    name: 'DEET job portal',
    context: 'deet.telangana.gov.in',
    href: 'https://deet.telangana.gov.in',
    builtWith: 'Next.js, Firebase, Chart.js',
    scope: 'Sole frontend developer; led the AngularJS to Next.js migration',
    status: 'Live',
  },
  {
    item: 2,
    caseId: 'deet',
    capabilities: ['fe'],
    name: 'Job Fair module',
    context: 'DEET',
    builtWith: 'Next.js, Excel import, PDF and Excel export',
    scope: 'Job-seeker and admin sides',
    status: 'Live · Apr 2026',
  },
  {
    item: 3,
    caseId: 'deet',
    capabilities: ['fe'],
    name: 'Statewide Skill Survey',
    context: 'DEET website',
    builtWith: 'Formik, Yup, OTP verification',
    scope: 'End to end',
    status: 'Delivered',
  },
  {
    item: 4,
    caseId: 'rs',
    capabilities: ['fe', 'be', 'ops', 'seo'],
    name: 'RS Technologies platform',
    context: 'rstechnologies.in',
    href: 'https://rstechnologies.in/',
    builtWith: 'Next.js 16, Express, MongoDB, JWT, AES-256',
    scope: 'Everything, solo',
    status: 'Live',
  },
  {
    item: 5,
    caseId: 'workruit',
    capabilities: ['fe'],
    name: 'Workruit recruitment SaaS',
    context: 'app.workruit.com',
    href: 'https://app.workruit.com',
    builtWith: 'Next.js, Redux',
    scope: 'Sole frontend developer',
    status: 'Live',
  },
  {
    item: 6,
    caseId: 'apex',
    capabilities: ['fe'],
    name: 'Apex CRM',
    context: 'apex-crm-two-sigma.vercel.app',
    href: 'https://apex-crm-two-sigma.vercel.app',
    builtWith: 'React, Redux Toolkit, Jest',
    scope: 'Solo take-home assessment',
    status: 'Assessment',
  },
];

export const caseStudies: CaseStudy[] = [
  {
    id: 'deet',
    items: 'Items 1–3',
    title: 'DEET · Government of Telangana job portal',
    role: 'Storytech · Junior Software Engineer · sole frontend developer',
    capabilities: ['fe', 'seo'],
    logo: logos.deet,
    featured: true,
    problem:
      'A statewide portal for job seekers, employers and government departments, running on legacy AngularJS and jQuery.',
    built: [
      'Multi-role dashboards, interview scheduling, Firebase push notifications, and CSP and XSS hardening',
      'Job Fair module: gathered requirements with government officers, specified the API for the backend developer, and built the job-seeker and admin sides',
      'Statewide Skill Survey, end to end: a login-free form sent by SMS and WhatsApp, with OTP-verified prefill and five steps that save as you go',
      'Admin panel with six user roles, protected routing, Chart.js analytics, Excel and PDF export, and secure bulk upload',
      'Led the full AngularJS to Next.js migration, page by page while the portal stayed live',
    ],
    outcome: {
      label: 'Now',
      text: 'Live across all 33 districts of Telangana, now running on Next.js.',
    },
    links: [
      { label: 'deet.telangana.gov.in', href: 'https://deet.telangana.gov.in' },
      { label: 'Try the survey pattern', href: '#demos' },
    ],
  },
  {
    id: 'rs',
    items: 'Item 4',
    title: 'RS Technologies · platform and admin CRM',
    role: 'Freelance · Full-Stack Developer · solo, Jun–Jul 2026',
    capabilities: ['fe', 'be', 'ops', 'seo'],
    logo: logos.rs,
    featured: true,
    problem:
      'A CCTV and security-systems business moving off WordPress, needing a product catalogue and a way to manage enquiries.',
    built: [
      'Next.js 16 front end and Express API, both deployed on Vercel',
      '4-role JWT/RBAC checked on the server for every request, and an AES-256 encrypted API envelope',
      'Admin CRM: enquiries and feedback, offer campaigns, sales users and a 14-day activity log',
      '260+ static pages with JSON-LD, sitemap, Search Console and Bing',
    ],
    outcome: { label: 'Now', text: 'Live. Moved off WordPress with zero downtime.' },
    links: [
      { label: 'rstechnologies.in', href: 'https://rstechnologies.in/' },
      { label: 'See the SEO build', href: '#found' },
    ],
  },
  {
    id: 'workruit',
    items: 'Item 5',
    title: 'Workruit · B2B recruitment SaaS',
    role: 'Storytech · sole frontend developer',
    capabilities: ['fe'],
    logo: logos.workruit,
    featured: false,
    built: [
      'A Next.js and Redux platform with role-based team access, interview scheduling, offer-letter workflows and a template-based portfolio builder',
    ],
    outcome: { label: 'Now', text: 'Live at app.workruit.com.' },
    links: [{ label: 'app.workruit.com', href: 'https://app.workruit.com' }],
  },
  {
    id: 'apex',
    items: 'Item 6',
    title: 'Apex CRM',
    role: 'Take-home for a hiring process · solo',
    capabilities: ['fe'],
    featured: false,
    badge: 'Assessment project',
    built: [
      'Redux Toolkit, RBAC, AES-256 encrypted local storage, DOMPurify and CSP, a drag-and-drop Kanban board, CSV export and dark mode',
    ],
    outcome: {
      label: 'Tested',
      text: '27 passing assertions across 6 suites. Written in JavaScript with JSDoc, and the README says so.',
    },
    links: [
      { label: 'Live app', href: 'https://apex-crm-two-sigma.vercel.app' },
      { label: 'Source', href: 'https://github.com/Shanmugamrskfamily/my-crm-ft' },
    ],
  },
];

export const posts: Post[] = [
  {
    title: "Rewriting isn't the goal. De-risking is.",
    summary:
      'What moving a live government portal from AngularJS to Next.js taught me: move page by page, read the old code before any tool touches it, and fix inherited security debt while you are in there.',
    href: 'https://lnkd.in/p/ddjCxdDF',
  },
  {
    title: 'Apex CRM, built as a take-home',
    summary:
      'Role-based access, encrypted local storage, a drag-and-drop Kanban board and 27 passing test assertions, with the trade-offs written down in the README.',
    href: 'https://lnkd.in/p/dbA_gGU5',
  },
];

/** Reverse-chronological. VeriTech (Jan–Apr 2024) comes after Senchola (Sep–Dec 2023). */
export const roles: Role[] = [
  {
    company: 'RS Technologies',
    title: 'Full-Stack Developer (Freelance)',
    place: 'Chrompet, Chennai · solo build',
    dates: 'Jun–Jul 2026',
    logo: logos.rs,
  },
  {
    company: 'Storytech',
    title: 'Junior Software Engineer',
    place: 'Hyderabad, remote · sole frontend developer',
    dates: 'Jun 2024 – May 2026',
    logo: logos.storytech,
  },
  {
    company: 'VeriTech Software IT Services',
    title: 'Web Developer Intern',
    place: 'Pune, remote',
    dates: 'Jan–Apr 2024',
    logo: logos.veritech,
  },
  {
    company: 'Senchola Technology Solutions',
    title: 'Frontend Developer Intern',
    place: 'Chennai, remote',
    dates: 'Sep–Dec 2023',
    logo: logos.senchola,
  },
  {
    company: 'Michelin India',
    title: 'Operating Engineer L1',
    place: 'Thiruvallur · manufacturing',
    dates: 'Aug 2017 – May 2023',
    logo: logos.michelin,
  },
];

export const skills: SkillGroup[] = [
  {
    name: 'Frontend',
    capability: 'fe',
    skills: [
      'React.js',
      'Next.js (App Router, SSR, SSG)',
      'TypeScript',
      'JavaScript (ES6+)',
      'Redux Toolkit',
      'Context API',
      'Formik',
      'Yup',
      'Tailwind CSS',
      'Ant Design',
      'Material UI',
      'Chart.js',
      'Figma to code',
      'ARIA',
    ],
  },
  {
    name: 'Backend',
    capability: 'be',
    skills: [
      'Node.js',
      'Express.js',
      'REST API design',
      'JWT',
      'Role-based access control',
      'Zod',
      'bcrypt',
      'Rate limiting',
      'AES-256',
    ],
  },
  {
    name: 'Data',
    capability: 'be',
    skills: ['MongoDB', 'Mongoose', 'MySQL', 'Schema design', 'Query optimisation'],
  },
  {
    name: 'Deployment',
    capability: 'ops',
    skills: [
      'Vercel',
      'AWS Amplify',
      'AWS S3',
      'Netlify',
      'DNS management',
      'Vercel Cron',
      'GitHub Actions',
    ],
  },
  {
    name: 'SEO and performance',
    capability: 'seo',
    skills: [
      'Core Web Vitals',
      'Static generation and ISR',
      'Lazy loading',
      'Image optimisation',
      'JSON-LD',
      'Search Console',
      'GA4',
    ],
  },
  {
    name: 'Quality and process',
    skills: [
      'Jest',
      'React Testing Library',
      'ESLint',
      'Code review',
      'Cross-browser testing',
      'Requirements gathering',
      'Agile',
      'Jira',
      'Claude Code',
    ],
  },
];

export const education: Credential[] = [
  {
    name: 'B.Sc. Computer Science (Allied Physics & Mathematics)',
    detail:
      'Loganatha Narayanasamy Government College, Ponneri · University of Madras · 2013–2016 · 70%',
  },
];

export const certifications: Credential[] = [
  {
    name: 'Full Stack Development (MERN)',
    detail: 'GUVI (IIT Madras incubated) · 2023',
    href: 'https://www.guvi.in/share-certificate/0e070P9370L4BEj19V',
    linkLabel: 'Verify certificate',
  },
  {
    name: 'Problem Solving badge',
    detail: 'HackerRank',
    href: 'https://www.hackerrank.com/profile/shanmugamr',
    linkLabel: 'View HackerRank profile',
    logo: logos.hackerrank,
  },
];

/* ---------- figure legends ---------- */

export const stackLayers: LegendEntry[] = [
  { name: 'Interface', detail: 'Next.js 16, React 19, 260+ static pages' },
  { name: 'API', detail: 'Express REST, Zod validation, rate limiting' },
  { name: 'Access', detail: 'JWT sessions, 4 roles checked on every request' },
  { name: 'Transport', detail: 'AES-256 encrypted envelope over HTTPS' },
  { name: 'Data', detail: 'MongoDB with Mongoose schemas' },
];

export const pipelineStages: LegendEntry[] = [
  { name: 'Commit', detail: 'Git, pushed to GitHub or Bitbucket' },
  { name: 'Checks', detail: 'automated checks in GitHub Actions' },
  { name: 'Preview', detail: 'a Vercel preview URL for every branch' },
  { name: 'Production', detail: 'Vercel, AWS Amplify and S3, or Netlify' },
];

export const treeLevels: LegendEntry[] = [
  { name: 'Category pages', detail: '6' },
  { name: 'Sub-category pages', detail: '40+' },
  { name: 'Product pages', detail: '200+' },
];

export const navItems = [
  { label: 'Work', href: '#work' },
  { label: 'Demos', href: '#demos' },
  { label: 'Deployment', href: '#ship' },
  { label: 'SEO', href: '#found' },
  { label: 'Writing', href: '#writing' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' },
];
