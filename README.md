# `✦ Shanmugam ✦` — Personal Portfolio

> **Live:** [shanmugam-portfolio.vercel.app](https://shanmugam-portfolio.vercel.app)

Personal portfolio of **Shanmugam R** — Frontend Developer specialising in React.js & Next.js.  
Built with a **Star Wars**-inspired design system: deep-space dark mode, Tatooine-sand light mode, lightsaber-blue accents, and Rebel-gold gradients — all backed by production-grade tooling, comprehensive SEO, and a fully responsive layout.

---

## Tech Stack

| Category   | Technology                                       |
| ---------- | ------------------------------------------------ |
| Framework  | Next.js 15 (App Router)                          |
| Language   | TypeScript 5                                     |
| Styling    | Tailwind CSS 3                                   |
| Fonts      | Inter + JetBrains Mono + Orbitron (Google Fonts) |
| Animations | Framer Motion                                    |
| Icons      | Lucide React                                     |
| Theme      | next-themes (Dark / Light / System)              |
| Hosting    | Vercel (Free tier)                               |
| Linting    | ESLint 9 (flat config)                           |
| Formatting | Prettier 3                                       |
| Git Hooks  | Husky 9 + lint-staged                            |

---

## Features

- **Star Wars design system** — Lightsaber blue `#5bc8f5` on deep-space black `#050508` (dark mode); Rebel-gold `#b45309` on Tatooine parchment `#fdf8ee` (light mode)
- **Three-layer star field** — Parallax-depth star field in dark mode using layered CSS radial gradients
- **`✦ Shanmugam ✦` navbar mark** — Orbitron-font gold stars flanking the name
- **`✦ eyebrow` section labels** — Star-mark prefix in Orbitron uppercase tracking
- **Lightsaber divider line** — Blue-to-gold gradient `.lightsaber-line` utility
- **`.sw-badge` tech pills** — Translucent lightsaber-blue border + blue glow on hover
- **`.sw-card` hover effect** — Lightsaber energy-field `box-shadow` on card hover
- **Nebula glow blobs** — Blue & gold radial gradients behind the hero photo
- **Single-page portfolio** with smooth scroll navigation
- **Dark / Light mode** — system default, toggleable; dark-first design
- **Fully responsive** — mobile, tablet, desktop
- **Framer Motion animations** — scroll-triggered fade & slide
- **Filterable projects section** — All / Government / SaaS / Migration
- **Vertical timeline** for work experience with lead developer tag
- **SEO optimised** — metadata, Open Graph, Twitter Card, JSON-LD structured data, sitemap, robots.txt
- **AI crawler friendly** — `llms.txt`, explicit rules for GPTBot, Google-Extended, PerplexityBot, ClaudeBot
- **Security headers** — X-Frame-Options, X-Content-Type-Options, Referrer-Policy, Permissions-Policy
- **Pre-commit hook** — runs `lint-staged` + `tsc --noEmit` before every commit

---

## Sections

1. **Hero** — Star field, name, gradient stats, CTA buttons, social links, profile photo with lightsaber-blue glow ring
2. **About** — Summary, key highlights, `✦ currently_learning` panel
3. **Skills** — 11 categories, all badges styled with `.sw-badge` (blue border + glow on hover)
4. **Experience** — Timeline with `Lead Developer:` tag, `.sw-badge` tech stack
5. **Projects** — Filterable card grid (DEET Government Portal, Workruit SaaS, etc.)
6. **Education & Certifications** — B.Sc. CS + GUVI MERN certificate
7. **Contact** — Email, phone, location, social links, resume download

---

## Star Wars Design System

| Token                  | Dark — The Force / Deep Space                              | Light — Rebellion / Tatooine                |
| ---------------------- | ---------------------------------------------------------- | ------------------------------------------- |
| `--color-bg`           | `#050508` — deep space black                               | `#fdf8ee` — Tatooine parchment              |
| `--color-bg-secondary` | `#09091a`                                                  | `#f5ede0` — warm sand                       |
| `--color-surface`      | `#0d0d22` — dark nebula panels                             | `#ffffff`                                   |
| `--color-border`       | `#1c1c42` — deep space blue                                | `#ddd0b0` — sand border                     |
| `--color-primary`      | `#5bc8f5` — lightsaber blue                                | `#1a3a8a` — Republic deep blue              |
| `--color-accent`       | `#f5c519` — Rebel / Jedi gold                              | `#b45309` — Jedi amber                      |
| `--color-text`         | `#e2eeff` — blue-tinted starlight white                    | `#1a1a2e` — deep dark                       |
| Star field (dark)      | 3-layer radial-gradient dots at 300/150/75 px pitch        | —                                           |
| Sand pattern (light)   | —                                                          | `rgba(26,58,138,0.055)` dots at 28 px pitch |
| `.sw-badge` dark       | `rgba(91,200,245,0.05)` bg + `rgba(91,200,245,0.2)` border | —                                           |
| `.sw-card:hover` dark  | `box-shadow: 0 0 24px rgba(91,200,245,0.10)`               | —                                           |
| `.lightsaber-line`     | Gradient: primary → accent → transparent                   | same                                        |
| Display font           | Orbitron — eyebrows, section marks, scroll label           | same                                        |
| Code font              | JetBrains Mono — badges, stats, labels, logo               | same                                        |

---

## Project Structure

```
src/
├── app/
│   ├── globals.css        # Star Wars CSS variables, .sw-badge, .sw-card, .lightsaber-line
│   ├── layout.tsx         # Root layout, Inter + JetBrains Mono + Orbitron, JSON-LD
│   ├── page.tsx           # Home page — composes all sections
│   ├── sitemap.ts         # Auto-generated sitemap
│   └── robots.ts          # Robots.txt with AI crawler rules
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx     # Fixed navbar, ✦ Shanmugam ✦ logo, active section highlight
│   │   └── Footer.tsx
│   ├── sections/
│   │   ├── Hero.tsx       # 3-layer star field, nebula blobs, gradient stats, ✦ greeting
│   │   ├── About.tsx      # ✦ currently_learning panel
│   │   ├── Skills.tsx     # 11 groups, .sw-badge pills, lightsaber top accent line
│   │   ├── Experience.tsx # Timeline, Lead Developer tag, .sw-badge tech stack
│   │   ├── Projects.tsx   # Filterable grid, gradient stripe, .sw-badge, .sw-card
│   │   ├── Education.tsx
│   │   └── Contact.tsx
│   ├── ui/
│   │   ├── Badge.tsx
│   │   ├── Button.tsx
│   │   └── SectionHeading.tsx  # ✦ eyebrow in Orbitron, gradient underline
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
[![Portfolio](https://img.shields.io/badge/Portfolio-5bc8f5?style=for-the-badge&logo=vercel&logoColor=black)](https://shanmugam-portfolio.vercel.app)
[![Email](https://img.shields.io/badge/Email-EA4335?style=for-the-badge&logo=gmail&logoColor=white)](mailto:shanmugamrskfamily@gmail.com)
