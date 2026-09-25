# SmartVyapari — Marketing Website

> **Helping businesses & creators scale faster.**

The official marketing website for **SmartVyapari** (`smartvyapari.online`) — an AI automation agency that engineers self-healing AI agents, workflow automations, and high-converting 3D digital infrastructure for modern enterprises and ambitious creators.

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | React 19 + TypeScript |
| Build | Vite 7 |
| Routing | React Router v6 |
| Styling | Tailwind CSS v3 + Framer Motion |
| Database | Supabase (PostgreSQL) |
| Email | n8n webhook → Gmail |
| Deploy | Vercel → `smartvyapari.online` |

---

## Design System — Sakura Rose Luxury

Dark luxury aesthetic inspired by a cherry blossom sakura aesthetic:

- **Background:** Deep Obsidian Black `#050304`
- **Primary text:** Warm Pearl `#FDF8F9`
- **Accent:** Soft Sakura Pink `#FFB7C5` · Rose Gold `#E6A0B0`
- **Typography:** Cormorant Garamond + Playfair Display (headings) · Plus Jakarta Sans (body) · JetBrains Mono (code)

---

## Project Structure

```
src/
├── components/
│   ├── layout/       Navbar, FooterSection, ScrollToTop
│   ├── sections/     HeroSection, AboutSection, EcosystemSection,
│   │                 ViralMetricsSection, ContactSection
│   ├── 3d/           Canvas3DBackground, Card3DTilt
│   ├── forms/        ContactForm
│   └── ui/           Stat, Icons, SectionHeading, Button, Reveal, etc.
├── pages/            Home, CaseStudies, Portfolio, Learning,
│                     AboutUs, Careers, PrivacyPolicy
└── lib/              supabaseClient.ts, email.ts
public/
└── assets/           hero-3d-loop.mp4  (cherry blossom 3D hero video)
```

---

## Getting Started

```bash
# Install dependencies
npm install

# Start dev server (http://localhost:5173)
npm run dev

# Production build (must pass 0 errors)
npm run build

# Preview production build locally
npm run preview
```

---

## Environment Variables

Create a `.env` file at the project root (gitignored — never commit):

```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
VITE_N8N_WEBHOOK_URL=your_n8n_webhook_url
```

> **Note:** `VITE_N8N_WEBHOOK_URL` left empty = demo mode (logs to console, shows success). Set it in Vercel env vars to go live.

Copy these values manually to **Vercel → Settings → Environment Variables**. They will not deploy from `.env`.

---

## Pages & Routes

| Route | Page | Description |
|-------|------|-------------|
| `/` | Home | Hero, About, Ecosystem, Metrics, Contact |
| `/case-studies` | "Don't know what to build?" | Interactive case studies accordion |
| `/portfolio` | Portfolio | Project showcase |
| `/learning` | Learning Hub | Curated AI tools & tutorials |
| `/about` | About Us | Team & mission |
| `/careers` | Careers | Open roles |
| `/privacy` | Privacy Policy | Legal |

---

## Contact

- **Website:** [smartvyapari.online](https://smartvyapari.online)
- **Email:** hello@smartvyapari.online
- **GitHub:** [slangop28/automate-labs](https://github.com/slangop28/automate-labs)

---

## Notes for Contributors

- All hash anchor links must use the full-path format `href="/#sectionId"` — bare `#sectionId` only works on the page where the element exists.
- Run `npm run build` before every commit. 0 TypeScript errors is non-negotiable.
- Use `import type` for type-only imports (`verbatimModuleSyntax` is enabled).
- Never use personal email addresses in source files — use `hello@smartvyapari.online`.
- See `CLAUDE.md` for full engineering conventions and `LEARNINGS.md` for hard-won gotchas.
