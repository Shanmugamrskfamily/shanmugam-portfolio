# Shanmugam R — Personal Portfolio

> **Live:** [shanmugam-portfolio.vercel.app](https://shanmugam-portfolio.vercel.app)

Personal portfolio of **Shanmugam R** — Full-Stack Developer specialising in React.js, Next.js & Node.js.

Built on a **Claymorphism** design system: soft 3D-inflated surfaces, offset colour shadows, inner highlights, and generously rounded corners — paired with spring-physics motion, a WebGL hero element, comprehensive SEO, and full light/dark theming.

![Next.js](https://img.shields.io/badge/Next.js_15-000000?style=flat-square&logo=nextdotjs&logoColor=white)
![React](https://img.shields.io/badge/React_19-61DAFB?style=flat-square&logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript_5-3178C6?style=flat-square&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_3-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-0055FF?style=flat-square&logo=framer&logoColor=white)
![Three.js](https://img.shields.io/badge/Three.js-000000?style=flat-square&logo=threedotjs&logoColor=white)
![Vercel](https://img.shields.io/badge/Vercel-000000?style=flat-square&logo=vercel&logoColor=white)

---

## Tech Stack

| Category   | Technology                                               |
| ---------- | -------------------------------------------------------- |
| Framework  | Next.js 15 (App Router, Turbopack dev)                   |
| UI Library | React 19                                                 |
| Language   | TypeScript 5.7                                           |
| Styling    | Tailwind CSS 3.4 + custom CSS layer (`clay-*` utilities) |
| Fonts      | Inter (body) · JetBrains Mono (code) · Nunito (display)  |
| Animation  | Framer Motion 11 · GSAP 3 + ScrollTrigger                |
| 3D / WebGL | Three.js · @react-three/fiber 9 · @react-three/drei 10   |
| Icons      | Lucide React                                             |
| Theming    | next-themes (Light / Dark / System)                      |
| Hosting    | Vercel                                                   |
| Linting    | ESLint 9 (flat config) + eslint-config-next              |
| Formatting | Prettier 3                                               |
| Git Hooks  | Husky 9 + lint-staged                                    |

---

## Features

### Design & Motion

- **Claymorphism design system** — offset colour shadows (`0 Npx 0`), inset top highlights, and 24px radii across five elevation tokens
- **Animated blob backgrounds** — blurred colour fields drifting on independent keyframe timings per section
- **GSAP ScrollTrigger parallax** — blobs scrub against scroll position, with `prefers-reduced-motion` bail-out
- **WebGL hero element** — Three.js wireframe icosahedron with a secondary accent shell, floating behind the profile photo; lazy-loaded via `next/dynamic` and motion-reduced on request
- **Typewriter role cycler** — phase-based state machine cycling four role titles with a blinking cursor
- **Animated stat counters** — cubic-eased count-up on scroll into view, with decimal support
- **Magnetic hover buttons** — cursor-following transform on the primary hero CTAs
- **3D tilt project cards** — perspective `rotateX/rotateY` tracking the pointer, spring-eased on exit
- **Spinning conic-gradient ring** — four-stop rotating border around the profile photo
- **Animated experience timeline** — gradient rail draws in via `scaleY`, with a pulsing ring on the current role
- **Scroll progress bar** — gradient indicator tracking document scroll

### Content & Platform

- **Single-page layout** with smooth-scroll navigation and an active-section indicator (Framer Motion `layoutId`)
- **Light / Dark / System theming** — every token redefined for both modes; dark mode swaps offset shadows for glow
- **Fully responsive** — mobile, tablet, and desktop
- **Filterable projects** — All / Freelance / Government / SaaS / Migration, with `AnimatePresence` transitions
- **Single source of truth** — all content lives in `src/data/portfolio.ts`
- **SEO optimised** — metadata, Open Graph, Twitter Card, JSON-LD structured data, sitemap, robots.txt
- **AI-crawler friendly** — `llms.txt` plus explicit rules for GPTBot, Google-Extended, PerplexityBot, ClaudeBot
- **Accessibility** — semantic landmarks, `aria-label`s on every section, labelled icon links, reduced-motion support
- **Pre-commit hook** — `lint-staged` (ESLint + Prettier) runs before every commit

---

## Sections

| #   | Section                        | Highlights                                                                                          |
| --- | ------------------------------ | --------------------------------------------------------------------------------------------------- |
| 1   | **Hero**                       | Typewriter roles, animated stat counters, WebGL wireframe, spinning photo ring, magnetic CTAs       |
| 2   | **About**                      | Summary + career story, `Currently Learning` panel, languages, key highlights                       |
| 3   | **Skills**                     | 7 categories — Frontend, Backend, Databases, Testing & Quality, DevOps & Tools, Security, Practices |
| 4   | **Experience**                 | Animated timeline, `Products Owned:` tag, clay tech pills                                           |
| 5   | **Projects**                   | Filterable 3D-tilt card grid, category-coloured gradient stripes, live-status pulse                 |
| 6   | **Education & Certifications** | B.Sc. Computer Science + GUVI MERN certificate with verification link                               |
| 7   | **Contact**                    | Availability card, contact details, resume download, social links                                   |

---

## Claymorphism Design System

### Colour Tokens

| Token                  | Light                   | Dark                     |
| ---------------------- | ----------------------- | ------------------------ |
| `--color-primary`      | `#6c63ff` — violet      | `#8b83ff`                |
| `--color-secondary`    | `#ff6b6b` — coral       | `#ff8585`                |
| `--color-accent`       | `#ffd93d` — amber       | `#ffd93d`                |
| `--color-teal`         | `#4ecdc4` — teal        | `#5ee8df`                |
| `--color-bg`           | `#f0f0f8`               | `#0e0e1c`                |
| `--color-bg-secondary` | `#e8e8f4`               | `#13132a`                |
| `--color-surface`      | `#ffffff`               | `#1a1a32`                |
| `--color-border`       | `rgba(108,99,255,0.16)` | `rgba(139,131,255,0.20)` |
| `--color-text`         | `#1a1a2e`               | `#e8e8ff`                |
| `--color-text-muted`   | `#4a4a6a`               | `#9090c0`                |
| `--color-text-subtle`  | `#9898b8`               | `#48487a`                |

### Gradients

| Token                | Value                  |
| -------------------- | ---------------------- |
| `--gradient-primary` | violet → teal          |
| `--gradient-accent`  | coral → amber          |
| `--gradient-hero`    | violet → coral → amber |

### Clay Elevation

Shadows follow a three-part formula — a hard offset in the primary hue (the "clay" lift), a soft ambient blur, and an inset top highlight:

```css
--clay-md:
  0 8px 0 0 rgba(108, 99, 255, 0.18), 0 14px 32px rgba(108, 99, 255, 0.13),
  inset 0 2px 0 rgba(255, 255, 255, 0.95);
```

Tokens: `--clay-xs` · `--clay-sm` · `--clay-md` · `--clay-lg` · `--clay-hover` · `--clay-active` · `--clay-inset`

In dark mode the same tokens swap the hard offset for a coloured glow.

### Utility Classes

| Class                                     | Purpose                                          |
| ----------------------------------------- | ------------------------------------------------ |
| `.clay-card`                              | Primary surface — 24px radius, `--clay-md`       |
| `.clay-card-sm`                           | Compact surface — 20px radius, `--clay-sm`       |
| `.clay-btn`                               | Button — 16px radius, press-down `:active` state |
| `.clay-badge`                             | Pill — 100px radius, hover lift                  |
| `.clay-divider`                           | 4px gradient rule under section headings         |
| `.blob`                                   | Blurred background colour field                  |
| `.text-gradient` / `-primary` / `-accent` | Gradient text fills                              |
| `.section-padding` / `.container-inner`   | Layout rhythm and max-width                      |

### Keyframes

`blob-float` · `blob-float-b` · `blob-float-c` · `float` · `spin-slow` · `cursor-blink` · `bounce-in` · `pulse-ring` · `shimmer`

---

## Project Structure

```
src/
├── app/
│   ├── globals.css          # Clay tokens, .clay-* utilities, keyframes
│   ├── layout.tsx           # Root layout, fonts, ThemeProvider, JSON-LD
│   ├── page.tsx             # Home page — composes all sections
│   ├── sitemap.ts           # Auto-generated sitemap
│   └── robots.ts            # robots.txt with AI-crawler rules
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx       # Floating pill nav, spring active indicator
│   │   └── Footer.tsx       # Clay social icon buttons
│   ├── sections/
│   │   ├── Hero.tsx         # Typewriter, counters, WebGL scene, magnetic CTAs
│   │   ├── About.tsx        # Summary, story, learning + languages panels
│   │   ├── Skills.tsx       # 7 clay group cards, staggered badge reveal
│   │   ├── Experience.tsx   # Animated timeline, pulsing current-role dot
│   │   ├── Projects.tsx     # Filterable grid, 3D tilt cards
│   │   ├── Education.tsx    # Degree + certification cards
│   │   └── Contact.tsx      # Availability, contact items, CTA panel
│   ├── three/
│   │   ├── HeroScene.tsx    # Three.js wireframe icosahedron
│   │   └── HeroSceneWrapper.tsx  # Dynamic (SSR-off) loader
│   ├── ui/
│   │   ├── AnimatedCounter.tsx   # Eased count-up, decimal-aware
│   │   ├── ScrollProgress.tsx    # Gradient scroll indicator
│   │   ├── SectionHeading.tsx    # Clay eyebrow pill + gradient divider
│   │   ├── Badge.tsx
│   │   └── Button.tsx
│   ├── JsonLd.tsx           # Person, WebSite, BreadcrumbList, ItemList schemas
│   ├── ScrollAnimations.tsx # GSAP ScrollTrigger blob parallax
│   ├── ScrollToTop.tsx      # Gradient clay FAB
│   └── ThemeToggle.tsx
├── data/
│   └── portfolio.ts         # ← Single source of truth for all content
├── hooks/
│   └── useMagneticHover.ts  # Cursor-following transform
├── lib/
│   └── utils.ts             # cn() class merger
└── types/
    └── index.ts             # Shared TypeScript interfaces
```

---

## Getting Started

### Prerequisites

- Node.js 18+
- npm

### Installation

```bash
git clone https://github.com/Shanmugamrskfamily/shanmugam-portfolio.git
cd shanmugam-portfolio
npm install
npm run prepare
```

### Development

```bash
npm run dev
```

Runs at [http://localhost:3000](http://localhost:3000) with Turbopack.

### Production Build

```bash
npm run build
npm run start
```

### Scripts

| Command                | Description                |
| ---------------------- | -------------------------- |
| `npm run dev`          | Dev server (Turbopack)     |
| `npm run build`        | Production build           |
| `npm run start`        | Serve the production build |
| `npm run lint`         | ESLint check               |
| `npm run lint:fix`     | ESLint auto-fix            |
| `npm run type-check`   | TypeScript check (no emit) |
| `npm run format`       | Prettier — write           |
| `npm run format:check` | Prettier — check (CI)      |

---

## Updating Content

All portfolio content lives in **one file**:

```
src/data/portfolio.ts
```

| Export           | Contents                                                         |
| ---------------- | ---------------------------------------------------------------- |
| `personal`       | Name, title, tagline, contact details, availability, resume URLs |
| `social`         | LinkedIn, GitHub, email                                          |
| `about`          | Summary, career story, highlights, stats, currently learning     |
| `languages`      | Spoken languages and proficiency                                 |
| `experiences`    | Work history (reverse-chronological)                             |
| `projects`       | Portfolio projects with `category` used by the filter tabs       |
| `skillGroups`    | Skill categories — display order matches array order             |
| `education`      | Degrees                                                          |
| `certifications` | Certificates with verification URLs                              |
| `navItems`       | Navbar links                                                     |

Every section reads from these exports — no component edits needed for a content change.

> **Note:** `experiences` and `projects` render in array order. Keep `experiences` reverse-chronological, and lead `projects` with the work you most want seen.

---

## Deployment

Deployed on **Vercel**, with automatic deployments on every push to `main-release`.

```bash
git add .
git commit -m "your message"
git push
```

---

## SEO & Discoverability

- Google Search Console verified — sitemap submitted
- Structured data: `Person`, `WebSite`, `BreadcrumbList`, and `SoftwareApplication` per live project
- `llms.txt` served at `/llms.txt` for AI answer engines
- Canonical URL, Open Graph, and Twitter Card meta tags
- Explicit bot rules for GPTBot, ChatGPT-User, Google-Extended, PerplexityBot, ClaudeBot

---

## License

Personal use. Feel free to use it as inspiration for your own portfolio.

---

## Contact

**Shanmugam R** — Full-Stack Developer
Chennai, Tamil Nadu, India

[![LinkedIn](https://img.shields.io/badge/LinkedIn-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/shanmugamrskfamily/)
[![GitHub](https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/Shanmugamrskfamily)
[![Portfolio](https://img.shields.io/badge/Portfolio-6c63ff?style=for-the-badge&logo=vercel&logoColor=white)](https://shanmugam-portfolio.vercel.app)
[![Email](https://img.shields.io/badge/Email-EA4335?style=for-the-badge&logo=gmail&logoColor=white)](mailto:shanmugamrskfamily@gmail.com)
