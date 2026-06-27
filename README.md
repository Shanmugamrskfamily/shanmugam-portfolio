# `<Shanmugam />` — Personal Portfolio

> **Live:** [shanmugam-portfolio.vercel.app](https://shanmugam-portfolio.vercel.app)

Personal portfolio of **Shanmugam R** — Frontend Developer specialising in React.js & Next.js.  
Built with production-grade tooling, tech-geek UI aesthetic, comprehensive SEO, and a fully responsive dark/light theme.

---

## Tech Stack

| Category   | Technology                            |
| ---------- | ------------------------------------- |
| Framework  | Next.js 15 (App Router)               |
| Language   | TypeScript 5                          |
| Styling    | Tailwind CSS 3                        |
| Fonts      | Inter + JetBrains Mono (Google Fonts) |
| Animations | Framer Motion                         |
| Icons      | Lucide React                          |
| Theme      | next-themes (Dark / Light / System)   |
| Hosting    | Vercel (Free tier)                    |
| Linting    | ESLint 9 (flat config)                |
| Formatting | Prettier 3                            |
| Git Hooks  | Husky 9 + lint-staged                 |

---

## Features

- **Tech-geek UI** — Cyan/violet accent palette, JetBrains Mono for code elements, `//` section labels, `<Name />` logo, monospace tech badges
- **Single-page portfolio** with smooth scroll navigation
- **Dark / Light mode** — system default, toggleable; dark-first design
- **Fully responsive** — mobile, tablet, desktop
- **Framer Motion animations** — scroll-triggered fade & slide
- **Filterable projects section** — All / Government / SaaS / Migration
- **Vertical timeline** for work experience
- **SEO optimised** — metadata, Open Graph, Twitter Card, JSON-LD structured data (`Person`, `WebSite`, `BreadcrumbList`, `ItemList`), sitemap, robots.txt
- **AI crawler friendly** — `llms.txt`, explicit rules for GPTBot, Google-Extended, PerplexityBot, ClaudeBot
- **Security headers** — X-Frame-Options, X-Content-Type-Options, Referrer-Policy, Permissions-Policy
- **Pre-commit hook** — runs `lint-staged` + `tsc --noEmit` before every commit

---

## Sections

1. **Hero** — Name, title, stats, CTA buttons, social links, profile photo
2. **About** — Summary, key highlights, currently learning
3. **Skills** — 11 categories with monospace badges (Languages, Frameworks, Programming Principles, UI, Forms, APIs, Performance, Security, Dev Tools, Deployment, Backend)
4. **Experience** — Timeline (Storytech, VeriTech, Senchola, Michelin India)
5. **Projects** — Filterable card grid (DEET Government Portal, Workruit SaaS, etc.)
6. **Education & Certifications** — B.Sc. CS + GUVI MERN certificate
7. **Contact** — Email, phone, location, social links, resume download

---

## Project Structure

```
src/
├── app/
│   ├── globals.css        # CSS variables, tech-geek theme tokens
│   ├── layout.tsx         # Root layout, Inter + JetBrains Mono, JSON-LD
│   ├── page.tsx           # Home page — composes all sections
│   ├── sitemap.ts         # Auto-generated sitemap
│   └── robots.ts          # Robots.txt with AI crawler rules
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx     # Fixed navbar, <Name /> logo, active section highlight
│   │   └── Footer.tsx
│   ├── sections/
│   │   ├── Hero.tsx       # Grid background, terminal greeting, gradient stats
│   │   ├── About.tsx
│   │   ├── Skills.tsx     # Monospace badges, 11 skill groups
│   │   ├── Experience.tsx # Timeline, lead_developer tag, mono tech badges
│   │   ├── Projects.tsx   # Filterable grid, gradient header stripe
│   │   ├── Education.tsx
│   │   └── Contact.tsx
│   ├── ui/
│   │   ├── Badge.tsx
│   │   ├── Button.tsx
│   │   └── SectionHeading.tsx  # // eyebrow style, gradient underline
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

### Scripts

```bash
npm run lint          # ESLint check
npm run lint:fix      # ESLint auto-fix
npm run type-check    # TypeScript check (no emit)
npm run format        # Prettier format all files
npm run format:check  # Prettier check (CI)
```

---

## Updating Content

All portfolio content lives in **one file**:

```
src/data/portfolio.ts
```

Edit this file to update personal info, resume URL, experience, projects, skills, education, or certifications. All sections pull from here — no need to touch individual components.

---

## Deployment

Deployed on **Vercel** (free tier) with automatic deployments on every push to `main-release`.

```bash
git add .
git commit -m "your message"
git push
```

---

## SEO & Discoverability

- Google Search Console verified — sitemap submitted
- Structured data: `Person`, `WebSite`, `BreadcrumbList`, `SoftwareApplication` (per project)
- `llms.txt` at `/llms.txt` for AI engine crawlers (ChatGPT, Gemini, Perplexity, Claude)
- Canonical URL, Open Graph, Twitter Card meta tags
- Explicit bot rules for GPTBot, ChatGPT-User, Google-Extended, PerplexityBot, ClaudeBot

---

## UI Design Decisions

| Element          | Choice                                        |
| ---------------- | --------------------------------------------- |
| Primary accent   | Cyan `#0891b2` (light) / `#22d3ee` (dark)     |
| Secondary accent | Violet `#7c3aed` / `#a78bfa`                  |
| Dark bg          | Zinc-950 `#09090b` — pure black, no blue cast |
| Light bg         | Zinc-50 `#fafafa` — clean neutral             |
| Code font        | JetBrains Mono (badges, labels, logo, stats)  |
| Section eyebrow  | `// label` — code comment style               |
| Navbar logo      | `<Shanmugam />` — JSX tag style               |
| Tech badges      | Monospace, borderless pill on dark bg         |

---

## License

Personal use. Feel free to use as inspiration for your own portfolio.

---

## Contact

**Shanmugam R** — Frontend Developer  
Chennai, Tamil Nadu, India

[![LinkedIn](https://img.shields.io/badge/LinkedIn-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/shanmugamrskfamily/)
[![GitHub](https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/Shanmugamrskfamily)
[![Portfolio](https://img.shields.io/badge/Portfolio-0891b2?style=for-the-badge&logo=vercel&logoColor=white)](https://shanmugam-portfolio.vercel.app)
[![Email](https://img.shields.io/badge/Email-EA4335?style=for-the-badge&logo=gmail&logoColor=white)](mailto:shanmugamrskfamily@gmail.com)
