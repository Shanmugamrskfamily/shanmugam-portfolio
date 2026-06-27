# `<Shanmugam />` — Personal Portfolio

> **Live:** [shanmugam-portfolio.vercel.app](https://shanmugam-portfolio.vercel.app)

Personal portfolio of **Shanmugam R** — Frontend Developer specialising in React.js & Next.js.  
Built with a **Tron Legacy**-inspired dark theme, production-grade tooling, comprehensive SEO, and a fully responsive design.

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

- **Tron Legacy theme** — Electric cyan `#00e5ff` on deep black `#000d1a`, cyan grid lines, glowing borders, translucent `.tron-badge` pills across all tech tags
- **`<Shanmugam />` navbar logo** — JSX tag style in JetBrains Mono
- **`// eyebrow` section labels** — code-comment style in monospace
- **Single-page portfolio** with smooth scroll navigation
- **Dark / Light mode** — system default, toggleable; dark-first design
- **Fully responsive** — mobile, tablet, desktop
- **Framer Motion animations** — scroll-triggered fade & slide
- **Filterable projects section** — All / Government / SaaS / Migration
- **Vertical timeline** for work experience with lead developer tag
- **SEO optimised** — metadata, Open Graph, Twitter Card, JSON-LD structured data (`Person`, `WebSite`, `BreadcrumbList`, `ItemList`), sitemap, robots.txt
- **AI crawler friendly** — `llms.txt`, explicit rules for GPTBot, Google-Extended, PerplexityBot, ClaudeBot
- **Security headers** — X-Frame-Options, X-Content-Type-Options, Referrer-Policy, Permissions-Policy
- **Pre-commit hook** — runs `lint-staged` + `tsc --noEmit` before every commit

---

## Sections

1. **Hero** — Name, title, gradient stats, CTA buttons, social links, profile photo with Tron glow
2. **About** — Summary, key highlights, `// currently_learning` panel
3. **Skills** — 11 categories, all badges styled with `.tron-badge` (cyan border + glow on hover)
4. **Experience** — Timeline with `Lead Developer:` tag, Tron-badge tech stack
5. **Projects** — Filterable card grid (DEET Government Portal, Workruit SaaS, etc.)
6. **Education & Certifications** — B.Sc. CS + GUVI MERN certificate
7. **Contact** — Email, phone, location, social links, resume download

---

## Tron Design System

| Token                  | Dark (Tron Legacy)                                       | Light (Tron Terminal)            |
| ---------------------- | -------------------------------------------------------- | -------------------------------- |
| `--color-bg`           | `#000d1a` — deep black navy                              | `#f0f8ff` — alice blue           |
| `--color-bg-secondary` | `#01111f`                                                | `#e2f0fb`                        |
| `--color-surface`      | `#051c2e` — dark teal panels                             | `#ffffff`                        |
| `--color-border`       | `#0a3854` — Tron blue                                    | `#a8d4ee` — light blue           |
| `--color-primary`      | `#00e5ff` — electric cyan                                | `#0077aa` — strong blue          |
| `--color-accent`       | `#9b59ff` — electric violet                              | `#6600cc`                        |
| `--color-text`         | `#cef0ff` — cyan-tinted white                            | `#001624`                        |
| Grid lines             | `rgba(0,229,255,0.07)` cyan grid                         | `rgba(0,119,170,0.08)` blue grid |
| `.tron-badge` dark     | `rgba(0,229,255,0.05)` bg + `rgba(0,229,255,0.2)` border | —                                |
| Code font              | JetBrains Mono — badges, labels, logo                    | same                             |

---

## Project Structure

```
src/
├── app/
│   ├── globals.css        # Tron CSS variables, .tron-badge, .tron-card utilities
│   ├── layout.tsx         # Root layout, Inter + JetBrains Mono, JSON-LD
│   ├── page.tsx           # Home page — composes all sections
│   ├── sitemap.ts         # Auto-generated sitemap
│   └── robots.ts          # Robots.txt with AI crawler rules
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx     # Fixed navbar, <Shanmugam /> logo, active section highlight
│   │   └── Footer.tsx
│   ├── sections/
│   │   ├── Hero.tsx       # Tron cyan grid bg, glow blobs, gradient stats, terminal greeting
│   │   ├── About.tsx      # // currently_learning panel
│   │   ├── Skills.tsx     # 11 groups, .tron-badge pills, glowing top accent line
│   │   ├── Experience.tsx # Timeline, Lead Developer tag, .tron-badge tech stack
│   │   ├── Projects.tsx   # Filterable grid, gradient stripe, .tron-badge, .tron-card
│   │   ├── Education.tsx
│   │   └── Contact.tsx
│   ├── ui/
│   │   ├── Badge.tsx
│   │   ├── Button.tsx
│   │   └── SectionHeading.tsx  # // eyebrow in mono, gradient underline
│   ├── JsonLd.tsx         # Structured data schemas (Person, WebSite, BreadcrumbList, ItemList)
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

## License

Personal use. Feel free to use as inspiration for your own portfolio.

---

## Contact

**Shanmugam R** — Frontend Developer  
Chennai, Tamil Nadu, India

[![LinkedIn](https://img.shields.io/badge/LinkedIn-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/shanmugamrskfamily/)
[![GitHub](https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/Shanmugamrskfamily)
[![Portfolio](https://img.shields.io/badge/Portfolio-00e5ff?style=for-the-badge&logo=vercel&logoColor=black)](https://shanmugam-portfolio.vercel.app)
[![Email](https://img.shields.io/badge/Email-EA4335?style=for-the-badge&logo=gmail&logoColor=white)](mailto:shanmugamrskfamily@gmail.com)
