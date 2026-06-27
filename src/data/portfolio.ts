import type { Experience, Project, Education, Certification, SkillGroup, NavItem } from '@/types';

export const navItems: NavItem[] = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Experience', href: '#experience' },
  { label: 'Projects', href: '#projects' },
  { label: 'Education', href: '#education' },
  { label: 'Contact', href: '#contact' },
];

export const personal = {
  name: 'Shanmugam R',
  title: 'Frontend Developer',
  subtitle: 'React.js & Next.js',
  tagline: 'I build fast, secure, and scalable production web apps with React & Next.js',
  location: 'Chennai, Tamil Nadu, India',
  email: 'shanmugamrskfamily@gmail.com',
  phone: '+91 78453 71892',
  availability: 'Immediate joiner — open to full-time roles in Chennai',
  resumeUrl: 'https://drive.google.com/file/d/1K09FU4p9UVQaEW4fURtaBfd694qjIS8t/view?usp=sharing',
};

export const social = {
  linkedin: 'https://www.linkedin.com/in/shanmugamrskfamily/',
  github: 'https://github.com/Shanmugamrskfamily',
  email: 'mailto:shanmugamrskfamily@gmail.com',
};

export const about = {
  summary:
    "Frontend Developer with 2+ years of production experience building secure, responsive, and scalable web applications using React.js, Next.js, and Angular. I've shipped government-scale job portals for the Government of Telangana (DEET) and SaaS recruitment products (Workruit), and led the migration of a legacy AngularJS codebase to a modern Next.js architecture. My background is a little different — I spent six years as a team leader and Safety Spoke at Michelin India before making a deliberate switch into software development. That experience gave me ownership, process discipline, and a structured approach to problem-solving that I bring into every engineering role.",
  highlights: [
    '2+ years of production experience with React.js and Next.js',
    'Project owner for 2 government-scale applications (DEET Web App, DEET Admin Panel)',
    'Led AngularJS to Next.js migration using AI-assisted tooling (Claude Code)',
    'Former Operations Team Leader and Safety Spoke at Michelin India',
    'B.Sc. Computer Science — University of Madras',
    'GUVI Full Stack Development (MERN) certified — IIT Madras incubated',
  ],
  stats: [
    { label: 'Years Experience', value: '2+' },
    { label: 'Production Projects', value: '6' },
    { label: 'Govt Applications', value: '2' },
    { label: 'Prior Career (Yrs)', value: '6' },
  ],
};

export const experiences: Experience[] = [
  {
    company: 'Storytech Pvt Ltd',
    location: 'Hyderabad, India · On-site',
    role: 'Junior Software Engineer',
    start: 'June 2024',
    end: 'May 2026',
    type: 'Full-time',
    project_owner: ['DEET Web Application', 'DEET Admin Panel'],
    responsibilities: [
      'Served as project owner for DEET Web Application and DEET Admin Panel — responsible for codebase ownership, PR reviews, and release quality',
      'Led migration of legacy AngularJS DEET web application to modern Next.js architecture using AI-assisted tooling (Claude Code) to accelerate refactoring and delivery',
      'Built the DEET job portal for the Government of Telangana — a multi-role platform (jobseekers, employers, consultancies) with dashboards, application tracking, and interview scheduling; integrated Firebase notifications and implemented CSP and XSS protections',
      'Engineered the DEET Admin Panel in Next.js with role-based dashboards (master-admin, district collector, department head, regional officer, colleges) using middleware routing; added Excel/PDF export, Chart.js analytics, secure bulk Excel uploads, and job-fair workflows',
      'Created the DEET public website (Next.js) with SEO optimization and a multi-stage save-and-resume skill survey',
      'Delivered the Workruit recruitment SaaS (Next.js, Redux) with role-based team access, interview, hiring and offer-letter workflows, and a template-based portfolio builder',
    ],
    tech: [
      'Next.js',
      'Angular.js',
      'TypeScript',
      'JavaScript',
      'Tailwind CSS',
      'Redux',
      'Context API',
      'Ant Design',
      'Material UI',
      'Formik',
      'Chart.js',
      'Firebase',
      'AWS Amplify',
      'AWS S3',
      'REST APIs',
      'XSS prevention',
      'CSP',
      'SEO',
    ],
  },
  {
    company: 'VeriTech Software IT Services',
    location: 'Pune, India · Remote',
    role: 'Web Developer Intern',
    start: 'January 2024',
    end: 'April 2024',
    type: 'Internship',
    responsibilities: [
      'Built production-grade, responsive web applications using React.js, JavaScript, and Bootstrap',
    ],
    tech: ['React.js', 'JavaScript', 'HTML5', 'CSS3', 'Bootstrap'],
  },
  {
    company: 'Senchola Technology Solutions',
    location: 'Chennai, India · Remote',
    role: 'Frontend Developer Intern',
    start: 'September 2023',
    end: 'December 2023',
    type: 'Internship',
    responsibilities: [
      'Developed scalable, production-grade user interfaces with React.js, JavaScript, and Bootstrap',
    ],
    tech: ['React.js', 'JavaScript', 'HTML5', 'CSS3', 'Bootstrap'],
  },
  {
    company: 'Michelin India Pvt Ltd',
    location: 'Thiruvallur, Tamil Nadu, India',
    role: 'Operating Engineer L1',
    start: 'August 2017',
    end: 'May 2023',
    type: 'Full-time',
    responsibilities: [
      'Led a 3-member team operating a rubber extruder line as planner, dimensions handler, and team leader across multiple machines',
      'Served as Safety Spoke — conducted shop-floor audits, incident reporting, and problem-solving; maintained green indicators across Safety, Cost, Quality, and Delivery metrics',
      'Promoted from Team Member Production to Operating Engineer L1 in April 2022',
    ],
    tech: [],
  },
];

export const projects: Project[] = [
  {
    name: 'DEET — Government Job Portal',
    type: 'Government · Production',
    role: 'Project Owner & Lead Frontend Developer',
    description:
      'Official job portal for the Government of Telangana serving private-sector employment. A multi-role platform supporting jobseekers, employers, and consultancies with complete hiring lifecycle management.',
    features: [
      'Multi-role access: jobseekers, employers, consultancies',
      'Dashboard tracking, application tracking, interview scheduling',
      'Firebase push notifications',
      'XSS and CSP security implementation',
      'SEO optimization',
    ],
    tech: [
      'Angular.js',
      'JavaScript',
      'jQuery',
      'Bootstrap',
      'Firebase',
      'REST APIs',
      'CSP',
      'SEO',
    ],
    live_url: 'https://deet.telangana.gov.in/',
    status: 'Live',
    category: 'government',
  },
  {
    name: 'DEET Admin Panel',
    type: 'Government · Production',
    role: 'Project Owner & Lead Frontend Developer',
    description:
      'Modern admin dashboard for the DEET portal with multi-role access and comprehensive data management for the Government of Telangana.',
    features: [
      'Role-based dashboards: master-admin, district collector, department head, regional officer, colleges',
      'Middleware-based protected routing',
      'Excel & PDF export for every data table',
      'Analytics with Chart.js — charts and bar graphs',
      'Bulk hiring for job fairs, secure Excel upload with XSS sanitization',
    ],
    tech: [
      'Next.js',
      'Tailwind CSS',
      'Ant Design',
      'Chart.js',
      'ExcelJS',
      'PDF.js',
      'Formik',
      'Firebase',
    ],
    live_url: 'https://deet.telangana.gov.in/',
    status: 'Live',
    category: 'government',
  },
  {
    name: 'DEET Public Website',
    type: 'Government · Production',
    role: 'Frontend Developer',
    description:
      'Official Telangana Government static website for private jobs with full SEO optimization and a multi-stage skill survey.',
    features: [
      'Fully responsive across all screen sizes',
      'SEO optimized with metadata',
      'Google Analytics integration',
      'Multi-stage skill survey with save-and-resume functionality',
    ],
    tech: ['Next.js', 'Tailwind CSS', 'Ant Design', 'Formik', 'Google Analytics', 'SEO'],
    live_url: 'https://deet.telangana.gov.in/',
    status: 'Live',
    category: 'government',
  },
  {
    name: 'DEET Migration: AngularJS → Next.js',
    type: 'Migration Project',
    role: 'Lead Developer',
    description:
      'Full migration of the legacy AngularJS DEET web application to a modern Next.js architecture. AI-assisted development using Claude Code to accelerate refactoring and delivery.',
    features: [
      'Complete codebase migration from AngularJS to Next.js',
      'Modern component architecture',
      'AI-assisted development with Claude Code',
      'Maintained all existing features with improved performance',
    ],
    tech: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Claude Code'],
    live_url: null,
    status: 'QA',
    category: 'migration',
  },
  {
    name: 'Workruit Master',
    type: 'SaaS · Production',
    role: 'Frontend Developer',
    description:
      'In-house recruitment SaaS platform for employers and consultancies with comprehensive hiring workflow management.',
    features: [
      'Multi-role access: employers, consultancies, team members',
      'Consultancy-employer tie-up for private job postings',
      'Full interview process management',
      'Hiring status and offer letter workflows',
      'Redux state management',
    ],
    tech: ['Next.js', 'Redux', 'Bootstrap', 'Ant Design', 'Firebase', 'REST APIs'],
    live_url: 'https://app.workruit.com/',
    status: 'Live',
    category: 'saas',
  },
  {
    name: 'Workruit Website',
    type: 'SaaS · Marketing',
    role: 'Frontend Developer',
    description:
      'Marketing and product website for Workruit with resume preview and template-based portfolio feature.',
    features: [
      'Multiple static pages with SEO',
      'Resume preview page',
      'Template-based portfolio feature',
    ],
    tech: ['Next.js', 'Bootstrap', 'SEO'],
    live_url: 'https://www.workruit.com/',
    status: 'Live',
    category: 'saas',
  },
];

export const skillGroups: SkillGroup[] = [
  {
    label: 'Languages',
    icon: '💻',
    skills: ['JavaScript (ES6+)', 'TypeScript', 'HTML5', 'CSS3'],
  },
  {
    label: 'Frameworks & Libraries',
    icon: '⚛️',
    skills: ['React.js', 'Next.js', 'Angular.js', 'Redux', 'Context API', 'jQuery'],
  },
  {
    label: 'UI & Styling',
    icon: '🎨',
    skills: [
      'Tailwind CSS',
      'Bootstrap',
      'Ant Design',
      'Material UI',
      'Chart.js',
      'Figma (design-to-code)',
      'Responsive / Mobile-first',
      'Dark mode / Theming',
    ],
  },
  {
    label: 'Forms & Validation',
    icon: '✅',
    skills: ['Formik', 'Yup', 'Input sanitization'],
  },
  {
    label: 'APIs & Data',
    icon: '🔌',
    skills: ['REST APIs', 'Axios', 'Firebase (FCM)', 'PDF.js', 'ExcelJS', 'JSON handling'],
  },
  {
    label: 'Performance',
    icon: '⚡',
    skills: [
      'Lazy loading',
      'Code splitting',
      'Image optimization',
      'Web Vitals / Lighthouse',
      'Webpack',
      'Vite',
      'Turbopack',
    ],
  },
  {
    label: 'Security',
    icon: '🔒',
    skills: ['XSS prevention', 'Content Security Policy (CSP)', 'Input validation & sanitization'],
  },
  {
    label: 'DevOps & Tools',
    icon: '🛠️',
    skills: [
      'Git',
      'GitHub',
      'Bitbucket',
      'AWS Amplify',
      'AWS S3',
      'Vercel',
      'Netlify',
      'Postman',
      'VS Code',
    ],
  },
  {
    label: 'Backend (Foundational)',
    icon: '🗄️',
    skills: ['Node.js', 'Express.js', 'MongoDB', 'MySQL'],
  },
];

export const education: Education[] = [
  {
    degree: 'B.Sc. Computer Science (Allied Physics & Mathematics)',
    institution: 'Loganatha Narayanasamy Government College, Ponneri',
    university: 'University of Madras',
    start: '2013',
    end: '2016',
    percentage: '70%',
  },
];

export const certifications: Certification[] = [
  {
    name: 'Full Stack Development (MERN)',
    issuer: 'GUVI — IIT Madras incubated',
    year: '2023',
    credential_url: 'https://www.guvi.in/share-certificate/0e070P9370L4BEj19V',
  },
];
