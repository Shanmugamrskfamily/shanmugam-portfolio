# Shanmugam R — Portfolio

> **Live:** [shanmugam-portfolio.vercel.app](https://shanmugam-portfolio.vercel.app) · **Résumé:** [View on Google Drive](https://drive.google.com/file/d/1DP1-J1KPJLbjl21Lg-jC_e7uJ2mfNdp5/view)

Portfolio of **Shanmugam R**, a frontend-first full-stack developer in Chennai with 2.5+ years of production experience in React.js, Next.js and Node.js. Open to full-time roles in Chennai, Bangalore or Hyderabad, on-site, hybrid or remote. Immediate joiner.

The site is designed as an **engineering drawing**. In light mode it reads as drafting film, and in dark mode as a blueprint. Work is shown as numbered figures with callout balloons, a parts list, and a title-block footer. It is built to be tried, not just read: three interactive 3D figures, two live demos of production patterns, a command palette and a capability filter.

![Next.js](https://img.shields.io/badge/Next.js_15-000000?style=flat-square&logo=nextdotjs&logoColor=white)
![React](https://img.shields.io/badge/React_19-61DAFB?style=flat-square&logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript_5-3178C6?style=flat-square&logo=typescript&logoColor=white)
![Three.js](https://img.shields.io/badge/Three.js-000000?style=flat-square&logo=threedotjs&logoColor=white)
![Vercel](https://img.shields.io/badge/Vercel-000000?style=flat-square&logo=vercel&logoColor=white)

---

## Tech stack

| Area      | Choice                                                              |
| --------- | ------------------------------------------------------------------- |
| Framework | Next.js 15 (App Router, home page prerendered as static HTML)       |
| UI        | React 19, TypeScript 5                                              |
| Styling   | CSS Modules plus design tokens in `src/app/globals.css`             |
| 3D        | Three.js through React Three Fiber 9 and drei 10                    |
| Theming   | next-themes (light, dark, follows the system by default)            |
| Fonts     | Archivo (display, width axis) · Onest (body) · IBM Plex Mono (data) |
| Hosting   | Vercel                                                              |
| Quality   | ESLint 9, Prettier 3, Husky + lint-staged pre-commit hook           |

---

## How the 3D works

- **One WebGL canvas for the whole page.** A single `<Canvas>` is fixed behind the content (`FigureCanvas.tsx`). Each figure renders into its own frame through drei's `<View>`, so the browser holds one GPU context no matter how many figures there are.
- **The canvas is cleared every frame.** drei's `View` only draws inside its own scissor box, so `ClearEachFrame` wipes the canvas first. Without it, scrolling leaves ghost copies of figures behind.
- **three.js loads only when it's used.** Phones, reduced-motion visitors and browsers without WebGL get still SVG drawings (`Stills.tsx`), projected from the same geometry. The server always renders the still, so the page is complete before any JavaScript runs. The WebGL bundle is dynamically imported for desktop visitors only.
- **DOM and scene share a tiny store** (`figures/store.ts`). The legend, buttons and drag gestures write to it, and each scene reads it inside `useFrame`, so pointer moves never trigger React renders.

| Figure | What it shows                                                                |
| ------ | ---------------------------------------------------------------------------- |
| Fig. 1 | The rstechnologies.in platform as an exploded assembly of five layers        |
| Fig. 2 | How a change moves from commit through checks and preview to production      |
| Fig. 3 | The rstechnologies.in catalogue as 6 → 40+ → 200+ statically generated pages |

## Interactions

- **Command palette:** press `Ctrl K` or `⌘ K` to jump to any section or project, copy contact details, open the résumé or profiles, switch theme, or filter work.
- **Capability filter:** the colour key (Frontend, Backend, Deployment, SEO) highlights matching work across the parts list, case studies and skills.
- **Live demos:** a resumable five-step survey with OTP-verified prefill and autosave, and the one-offer hiring rule from the DEET Job Fair module.
- **Scroll-aware navigation:** the current section is marked, with a reading-progress redline under the bar.
- **Motion:** scroll reveals and a cursor spotlight on cards. All motion is progressive enhancement and respects `prefers-reduced-motion`.

---

## Project structure

```
src/
├── app/
│   ├── globals.css          # design tokens (light and blueprint), base styles, interaction layer
│   ├── layout.tsx           # fonts, metadata, theme provider, JSON-LD
│   ├── page.tsx             # section order
│   ├── robots.ts · sitemap.ts
├── components/
│   ├── figures/             # shared canvas, 3D scenes, still drawings, figure frame
│   ├── demos/               # survey and one-offer demos
│   ├── sections/            # Hero, Capabilities, Work, Deploy, Seo, Writing, About, Contact
│   ├── site/                # Nav, PageShell (filter, toasts, reveals), CommandPalette, TitleBlock
│   ├── ui/                  # LogoPlate, CopyButton
│   └── JsonLd.tsx           # Person, WebSite and work structured data
├── data/portfolio.ts        # single source of truth for all content
└── types/index.ts
public/
├── logos/                   # project and employer logos, used with permission
├── images/profile.png
└── llms.txt                 # plain-text summary for AI assistants
```

## Updating content

All facts live in `src/data/portfolio.ts`: profile, open-to-work status, stats, parts list, case studies, posts, experience, skills and credentials. Components only render what's there.

Rules for this file:

- Never invent metrics, user counts or titles.
- Keep `roles` in reverse-chronological order.
- Label assessment projects as assessment projects.

## Scripts

```bash
npm run dev          # dev server (Turbopack)
npm run build        # production build
npm run lint         # ESLint
npm run type-check   # TypeScript, no emit
npm run format       # Prettier
```

## Branches and deployment

Work happens on `dev`, where Vercel builds a preview for every push. Merging to `main-release` deploys to production.

---

**Shanmugam R** · Chennai, Tamil Nadu, India ·
[LinkedIn](https://www.linkedin.com/in/shanmugamrskfamily/) ·
[GitHub](https://github.com/Shanmugamrskfamily) ·
[HackerRank](https://www.hackerrank.com/profile/shanmugamr) ·
[Résumé](https://drive.google.com/file/d/1DP1-J1KPJLbjl21Lg-jC_e7uJ2mfNdp5/view) ·
[Email](mailto:shanmugamrskfamily@gmail.com)
