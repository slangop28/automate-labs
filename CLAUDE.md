# CLAUDE.md — SmartVyapari Website

**Always read `LEARNINGS.md` at the start of every session before making changes.**

This file is the operating manual for the SmartVyapari marketing website. Read it fully before touching code. It encodes decisions that are already made — do not re-litigate them, just build to them.

---

## 1. What this project is

The public marketing website for **SmartVyapari** (`smartvyapari.online`), an AI automation agency owned by **Atul Pandey** (Ahmedabad, India). This is a **lead-generation site**, not a brochure. Every page exists to convert a visitor into a booked call or a captured lead.

**Primary success metric:** qualified inbound leads (form submissions → notification in Atul's inbox → fast reply). Everything else (animations, copy, design) serves that.

**Business contact email:** `hello@smartvyapari.online` — all lead notifications, auto-replies, and public-facing email references use this address. **Never use the personal Gmail address.**

---

## 2. Current status (2026-09-26)

- **Stack:** Vite 7 + React 19 + TypeScript + React Router v6, Tailwind CSS v3, Supabase JS, Framer Motion.
- **Structure:** `src/pages/Home.tsx` composing `src/components/sections/*` (Hero, About, Ecosystem, ViralMetrics, Contact) + page routes in `src/pages/` (CaseStudies, Portfolio, Learning, AboutUs, Careers, PrivacyPolicy).
- **Forms:** Contact form in `ContactSection.tsx` + `components/forms/ContactForm.tsx`. Writes to Supabase `contacts` table **and** fires the `VITE_N8N_WEBHOOK_URL` webhook.
- **Email automation:** n8n webhook architecture in place. Set `VITE_N8N_WEBHOOK_URL` in `.env` to go live. The n8n workflow (notify + auto-reply) should be built separately.
- **Design:** Sakura Rose Luxury dark theme — Obsidian Black (`#050304`) base, Soft Sakura Pink (`#FFB7C5`) accents, Rose Gold (`#E6A0B0`) secondary, Warm Pearl (`#FDF8F9`) text. Full Cormorant Garamond + Plus Jakarta Sans typography stack.
- **Hero video:** `public/assets/hero-3d-loop.mp4` — cherry blossom / sakura 3D looping scene.
- **Deployment:** Vercel → `smartvyapari.vercel.app` + custom domain `smartvyapari.online`.

---

## 3. Decisions already made (do not deviate without asking)

### 3.1 Design system — Sakura Rose Luxury (ACTIVE)
- **Palette:** Deep Obsidian Black (`#050304`) background, Sakura Pink (`#FFB7C5`) primary accent, Rose Gold (`#E6A0B0`) secondary accent, Warm Pearl (`#FDF8F9`) primary text, Soft Rose Gray (`#E2C2C9` / `#B89EA5`) muted text.
- **Glassmorphism borders:** `rgba(255, 183, 197, 0.15)`.
- **Gradients:** `from-[#FFB7C5] via-[#E6A0B0] to-[#FDF8F9]`.
- **Typography:** `font-display` / `font-serif` → Cormorant Garamond + Playfair Display (luxury serif, headings). `font-sans` / `font-body` → Plus Jakarta Sans + Outfit (body). `font-mono` → JetBrains Mono.
- **Glow shadows:** all use `rgba(255, 183, 197, ...)` (sakura pink). No blue/cyan/purple shadows remain.

### 3.2 Brand identity
- Wordmark: **Smart*Vyapari*** — "SmartVyapari" in Cormorant Garamond, italic on "Vyapari", large luxury editorial size (≥ 2rem).
- No logo icon, no outer box around nav, no badge text next to brand name.
- Hero headline: **"Helping businesses & creators scale faster."**
- Hero sub-headline does NOT mention n8n or Supabase by name.
- Navbar tab "Case Studies" → **"Don't know what to build?"** (routes to `/case-studies`).

### 3.3 Navigation architecture
- React Router v6 via `BrowserRouter` in `main.tsx`.
- Routes: `/` (Home), `/case-studies`, `/portfolio`, `/learning`, `/about`, `/privacy`, `/careers`.
- `ScrollToTop.tsx` mounted globally — handles scroll-to-top on route change **and** hash anchor scrolling with a 60 × 50ms polling loop (3s total) + 100ms grace period.
- **Critical rule:** All hash anchors (`#ecosystem`, `#about`, `#contact`) must be written as full-path hrefs (`/#ecosystem`, `/#about`, `/#contact`) so they work from any page, not just the homepage. Bare `#hash` links only work on the page where the element exists.

### 3.4 Email automation architecture
- **Engine: n8n webhook → Gmail.** Forms POST to an n8n Cloud webhook (URL in `.env` as `VITE_N8N_WEBHOOK_URL`, never hardcoded).
- **Behavior on every form submit:**
  1. **Notify Atul** at `hello@smartvyapari.online` with full lead details.
  2. **Auto-reply to the lead** with a branded confirmation email.
- **System of record:** Supabase `contacts` table insert happens first (non-fatal if it fails), then the n8n webhook fires.
- The old `server/index.js` Express stub is **deprecated and should not be used**.

### 3.5 Deployment
- **Vercel** — `smartvyapari` project, branch `main` auto-deploys.
- All secrets live in Vercel env vars. Never commit `.env` or any key/secret.
- `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` are publishable — safe for the browser. Never use service-role key on the client.

---

## 4. Engineering rules

1. **Think before coding.** State assumptions explicitly. Surface 2–3 interpretations for ambiguous requests and ask rather than guess.
2. **Simplicity first.** 100 lines over 1000. No premature abstractions. Delete dead code.
3. **Protect existing code.** Never touch code outside the requested scope. Never delete unrelated comments/code. Show diffs of changed lines only.
4. **Goal-driven.** Define "done" as measurable criteria before starting; verify; then stop.
5. **Communication:** give runnable commands, not theory. Flag blockers immediately — never work around silently.

---

## 5. Project structure

```
src/
  components/
    layout/        Navbar.tsx, FooterSection.tsx, ScrollToTop.tsx
    sections/      HeroSection, AboutSection, EcosystemSection, ViralMetricsSection, ContactSection
    3d/            Canvas3DBackground.tsx, Card3DTilt.tsx
    forms/         ContactForm.tsx
    ui/            Stat.tsx, Icons.tsx, SectionHeading.tsx, Button.tsx, Reveal.tsx, etc.
  pages/           Home, CaseStudies, Portfolio, Learning, AboutUs, Careers, PrivacyPolicy
  lib/             supabaseClient.ts, email.ts (n8n webhook client)
public/
  assets/          hero-3d-loop.mp4 (cherry blossom 3D video, 5.84 MB)
```

---

## 6. Env vars

| Var | Where | Purpose |
|-----|-------|---------|
| `VITE_SUPABASE_URL` | client | Supabase project URL |
| `VITE_SUPABASE_ANON_KEY` | client | Supabase publishable key (safe to expose) |
| `VITE_N8N_WEBHOOK_URL` | client/server | n8n form webhook — set to go live; empty = demo mode |

- `.env` is gitignored. Never commit secrets. Copy values manually to Vercel env vars.
- Do NOT chain `.select()` on anonymous Supabase inserts — causes RLS 42501 errors.

---

## 7. TypeScript constraints

- `verbatimModuleSyntax` is enabled → type-only imports **must** use `import type { ... }`.
- `TS6133` unused import = build error. Remove all unused imports before committing.
- `lucide-react` does **not** have an Instagram icon → use the custom SVG in `src/components/ui/Icons.tsx`.
- NavItem type: `{ label: string; to?: string; href?: string }` — use `to` for React Router `<Link>`, `href` for plain `<a>`.

---

## 8. Commands

```bash
npm install         # install deps
npm run dev         # Vite dev server → http://localhost:5173
npm run build       # tsc -b && vite build  (must pass 0 errors before pushing)
npm run lint        # eslint
npm run preview     # preview production build locally
```

```bash
# Push to GitHub (run separately — never chain with &&)
git add -A
git commit -m "feat: <description>"
git push origin main
```

---

## 9. Definition of done

- [ ] Build passes: `npm run build` → 0 TypeScript errors, 0 Vite errors.
- [ ] All routes work; no dead/broken links. Hash anchors use `/#section` format.
- [ ] No personal email addresses (`@gmail.com`) in any source file — use `hello@smartvyapari.online`.
- [ ] Every form: saves to Supabase **and** fires the n8n webhook.
- [ ] No secrets in the repo. `.env` updated with any new vars + documented here.
- [ ] `LEARNINGS.md` updated with any non-obvious gotcha discovered this session.
- [ ] Design matches the Sakura Rose Luxury palette — no blue/cyan/purple remnants.
