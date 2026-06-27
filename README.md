# Shanmugam R — Personal Portfolio

> **Live Site:** [shanmugam-portfolio.vercel.app](https://shanmugam-portfolio.vercel.app)

Personal portfolio website of **Shanmugam R**, Frontend Developer specialising in React.js & Next.js — built with modern tooling, production-grade SEO, and a fully responsive dark/light theme.

---

## Tech Stack

| Category   | Technology                          |
| ---------- | ----------------------------------- |
| Framework  | Next.js 15 (App Router)             |
| Language   | TypeScript 5                        |
| Styling    | Tailwind CSS 3                      |
| Animations | Framer Motion                       |
| Icons      | Lucide React                        |
| Theme      | next-themes (Dark / Light / System) |
| Hosting    | Vercel (Free tier)                  |
| Linting    | ESLint 9 (flat config)              |
| Formatting | Prettier 3                          |
| Git Hooks  | Husky 9 + lint-staged               |

---

## Features

- **Single-page portfolio** with smooth scroll navigation
- **Dark / Light mode** — system default, toggleable
- **Fully responsive** — mobile, tablet, desktop
- **Framer Motion animations** — scroll-triggered fade & slide
- **Filterable projects section** — All / Government / SaaS / Migration
- **Vertical timeline** for work experience
- **SEO optimised** — metadata, Open Graph, Twitter Card, JSON-LD structured data (Person, WebSite, BreadcrumbList, ItemList), sitemap, robots.txt
- **AI crawler friendly** — `llms.txt`, explicit rules for GPTBot, Google-Extended, PerplexityBot, ClaudeBot
- **Security headers** — X-Frame-Options, X-Content-Type-Options, Referrer-Policy, Permissions-Policy
- **Pre-commit hook** — runs `lint-staged` + `tsc --noEmit` before every commit to prevent broken builds

---

## Sections

1. **Hero** — Name, title, stats, CTA buttons, social links, profile photo
2. **About** — Summary, key highlights
3. **Skills** — Grouped by category (Languages, Frameworks, UI, Security, etc.)
4. **Experience** — Timeline (Storytech, VeriTech, Senchola, Michelin India)
5. **Projects** — Filterable card grid (DEET Government Portal, Workruit SaaS, etc.)
6. **Education & Certifications** — B.Sc. CS + GUVI MERN certificate
7. **Contact** — Email, phone, location, social links, resume download

---

## Project Structure

```
src/
├── app/
│   ├── globals.css        # CSS variables, theme tokens, utility classes
│   ├── layout.tsx         # Root layout, metadata, JSON-LD
│   ├── page.tsx           # Home page — composes all sections
│   ├── sitemap.ts         # Auto-generated sitemap
│   └── robots.ts          # Robots.txt with AI crawler rules
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx     # Fixed navbar, active section highlight, mobile menu
│   │   └── Footer.tsx
│   ├── sections/
│   │   ├── Hero.tsx
│   │   ├── About.tsx
│   │   ├── Skills.tsx
│   │   ├── Experience.tsx
│   │   ├── Projects.tsx
│   │   ├── Education.tsx
│   │   └── Contact.tsx
│   ├── ui/
│   │   ├── Badge.tsx
│   │   ├── Button.tsx
│   │   └── SectionHeading.tsx
│   ├── JsonLd.tsx         # Structured data schemas
│   ├── ScrollToTop.tsx
│   └── ThemeToggle.tsx
├── data/
│   └── portfolio.ts       # Single source of truth for all content
├── lib/
│   └── utils.ts           # cn() utility
└── types/
    └── index.ts           # TypeScript interfaces
```

---

## Getting Started

### Prerequisites

- Node.js 18+
- npm

### Installation

```bash
# Clone the repo
git clone https://github.com/Shanmugamrskfamily/shanmugam-portfolio.git
cd shanmugam-portfolio

# Install dependencies
npm install

# Initialise Husky pre-commit hooks
npm run prepare
```

### Development

```bash
npm run dev
```

Opens at [http://localhost:3000](http://localhost:3000) with Turbopack for fast HMR.

### Production Build

```bash
npm run build
npm run start
```

### Other Scripts

```bash
npm run lint          # ESLint check
npm run lint:fix      # ESLint auto-fix
npm run type-check    # TypeScript check (no emit)
npm run format        # Prettier format all files
npm run format:check  # Prettier check (CI)
```

---

## Updating Content

All portfolio content lives in a **single file**:

```
src/data/portfolio.ts
```

Edit this file to update personal info, experience, projects, skills, education, or certifications. All sections pull data from here — no need to touch individual components.

---

## Deployment

Deployed on **Vercel** (free tier) with automatic deployments on every push to `main-release`.

```bash
git add .
git commit -m "your message"
git push
```

Vercel picks up the push and deploys automatically.

---

## SEO

- Google Search Console verified and sitemap submitted
- Structured data: `Person`, `WebSite`, `BreadcrumbList`, `SoftwareApplication` (per project)
- `llms.txt` at `/llms.txt` for AI engine crawlers
- Canonical URL, Open Graph, Twitter Card meta tags

---

## License

This project is for personal use. Feel free to use it as inspiration for your own portfolio.

---

## Contact

**Shanmugam R** — Frontend Developer  
Chennai, Tamil Nadu, India

[![LinkedIn](https://img.shields.io/badge/LinkedIn-0A66C2?style=flat&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/shanmugamrskfamily/)
[![GitHub](https://img.shields.io/badge/GitHub-181717?style=flat&logo=github&logoColor=white)](https://github.com/Shanmugamrskfamily)
[![Portfolio](https://img.shields.io/badge/Portfolio-1F3864?style=flat&logo=vercel&logoColor=white)](https://shanmugam-portfolio.vercel.app)
[![Email](https://img.shields.io/badge/Email-EA4335?style=flat&logo=gmail&logoColor=white)](mailto:shanmugamrskfamily@gmail.com)
