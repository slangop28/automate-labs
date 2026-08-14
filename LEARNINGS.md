# LEARNINGS.md — SmartVyapari Website

Hard-won, project-specific gotchas. Add to this whenever a non-obvious lesson costs time once.
Brand: **SmartVyapari** (`smartvyapari.online`).

## Known traps (2026-06-18)

- **The Express server (`server/index.js`) sends NO email.** It only `console.log`s submissions and returns a fake `{ success: true }` after a `setTimeout`. Do not assume email works because the form shows success — it never did. Real email is being built via n8n.
- **Forms write to Supabase via `submitToSupabase(table, data)`** in `AutomateLabsWebsite.tsx`. The table names must already exist in Supabase or the insert silently logs an error and the function returns `false`. Verify table + column names before wiring a new form.
- **The whole UI lives in one ~48KB component** (`AutomateLabsWebsite.tsx`). Search within it before assuming a section is missing; it's all inline.
- **Supabase key in `.env` is the publishable (anon) key** — safe for the browser. Never replace it with a service-role key on the client side.
- **`.env` is gitignored** — copy values manually to Vercel env vars; they will not deploy automatically.

## Phase 1 — design system shipped (2026-06-18)

- **Design tokens** live in `tailwind.config.js` (colors `cream`/`paper`/`clay`/`ink`/`umber`/`line`, fonts `display`=Fraunces / `sans`=Inter / `mono`=JetBrains Mono, shadows `soft`/`lift`/`clay`) + base styles in `src/index.css`. Use `bg-cream text-ink text-clay font-display` etc. — the theme only **extends** Tailwind, so default colors (incl. the legacy purple) still work.
- **Fonts** load via Google Fonts `<link>` in `index.html`. (Geist Mono isn't on Google Fonts → using JetBrains Mono instead.)
- **Shared layout/UI kit:** `src/components/layout/{Navbar,Footer}.tsx` and `src/components/ui/{Container,Button,SectionHeading,Reveal,Stat,Icons}.tsx`. New pages should compose these.
- **CaseStudies page rebuilt** — interactive accordion + industry filters + count-up stats + lead CTAs. **No more PPTX downloads.**
- **PPTX files still exist on disk** at `public/case-studies/*.pptx` (~57 MB) but are no longer referenced. Safe to delete to slim the repo — awaiting owner confirmation.
- **Still on the OLD dark purple design (not yet redesigned):** the homepage monolith `AutomateLabsWebsite.tsx`, plus `pages/Portfolio.tsx`, `AboutUs.tsx`, `Careers.tsx`, `PrivacyPolicy.tsx`. They render fine (each wraps its own dark bg) — redesign in later phases.
- `SlideViewer.tsx` is unused/dead. Candidate for deletion.
- TS gotcha: arrays of `{label, to?} | {label, href?}` link objects need an explicit `type` annotation with optional fields, or `tsc -b` errors on union member access.

## Phase 2 — full site redesigned (2026-06-19)

- **Every page is now the Claude (cream/clay) design.** Homepage rebuilt from the 48 KB monolith into `pages/Home.tsx` composing `components/sections/*` (Hero, Metrics, Services, AutomationConsole, Process, Testimonials, ContactSection). `AutomateLabsWebsite.tsx` **deleted**.
- Redesigned: `Home`, `CaseStudies`, `Learning` (new), `Portfolio`, `AboutUs`, `Careers`, `PrivacyPolicy`. All use shared `Navbar`/`Footer`.
- **Signature element** = `sections/AutomationConsole.tsx`: a sticky console (desktop) whose mock swaps as you scroll through 4 steps, driven by IntersectionObserver. Mobile shows the mock inline per step.
- **Routing** (`main.tsx`): `/`→Home, `/case-studies`, `/learning`, `/portfolio`, `/about`, `/privacy`, `/careers`. `ScrollToTop` now honours URL hashes (e.g. `/#contact`) — scrolls the target into view instead of forcing top.
- **Lead pipeline:** `lib/email.ts#submitLead` → best-effort Supabase insert into a `contacts` table **+** POST to `VITE_N8N_WEBHOOK_URL`. **Webhook URL is currently EMPTY in `.env`** → form runs in DEMO MODE (logs to console, shows success). Set the var to go live. The n8n workflow itself (notify Atul + auto-reply) is NOT built yet.
- `contacts` Supabase table may not exist — insert is wrapped in try/catch and is non-fatal. Old form tables were `audits`/`callbacks`/`newsletter`; the new single form uses `contacts`.
- **Scroll-reveal artifact:** `<Reveal>` starts at `opacity:0` and only animates in via IntersectionObserver. A *full-page* screenshot shows below-the-fold sections blank because the observer never fired for off-screen nodes — this is NOT a bug; scroll (or viewport screenshots) shows them. Verify with viewport shots, not full-page.
- Brand assets still placeholders: no real logo image (text wordmark used), no founder photo. Testimonials/metrics are the owner's existing real content, preserved.

## Conventions

- Read `CLAUDE.md` for project decisions (email = n8n webhook, fresh redesign, Vercel deploy).
