# CLAUDE.md — Automate Labs Website

**Always read `LEARNINGS.md` at the start of every session before making changes.**

This file is the operating manual for the Automate Labs marketing website. Read it fully before touching code. It encodes decisions that are already made — do not re-litigate them, just build to them.

---

## 1. What this project is

The public marketing website for **Automate Labs**, an AI automation agency owned by **Atul Pandey** (Ahmedabad, India). This is a **lead-generation site**, not a brochure. Every page exists to convert a visitor into a booked call or a captured lead.

**Primary success metric:** qualified inbound leads (form submissions → notification in Atul's inbox → fast reply). Everything else (animations, copy, design) serves that.

**Owner / contact email:** `atul.pandey0028@gmail.com` — this is where lead notifications go, and the identity behind auto-replies.

---

## 2. Current status (2026-06-18)

- **Stack:** Vite 7 + React 19 + TypeScript + React Router v7, Tailwind CSS v3, Supabase JS.
- **Structure:** one monolithic `src/components/AutomateLabsWebsite.tsx` (~48KB, all sections inline) + page routes in `src/pages/` (AboutUs, Careers, CaseStudies, Portfolio, PrivacyPolicy).
- **Forms:** Contact, Audit-request, Callback. They insert rows into Supabase tables via `submitToSupabase()` in the main component.
- **Email automation: DOES NOT EXIST YET.** `server/index.js` is an Express stub that only `console.log`s submissions and returns fake success. No email is sent anywhere. Building real email is a core task of this project.
- **Design:** dark theme, purple/violet gradients (`--bg-base: #0a0118`), shimmer buttons, door-open intro animation.

---

## 3. Decisions already made (do not deviate without asking)

### 3.1 Redesign direction
- **Premium redesign in Claude AI's brand aesthetic: warm cream + brown/clay.** Light theme (NOT the old dark purple). This is a deliberate brief from the owner — follow it exactly.
- **Reference competitor: bizwitai.com.** We MIRROR its service lineup and content structure, but freshened (cleaner copy, no typos/dummy data, more credible) and in our own warm Claude identity. Never clone visually.
- Goal: **maximize engagement and lead conversion** and look like a real, professional agency.
- Conversion priorities, in order: clear single primary CTA above the fold → social proof / results → services → process → strong closing CTA. Mobile-first. Fast load. Real SEO meta tags + OpenGraph.
- **Signature element:** a scroll-pinned "automation console" — services highlight one-by-one as the user scrolls, each with a live mini-UI mockup (the competitor's scroll section is the inspiration; ours is cleaner and on-brand).

### 3.1a Brand tokens (Claude aesthetic)
- `--cream` #F0EEE6 (page bg) · `--paper` #FAF9F5 (cards) · `--clay` #D97757 (primary accent / Claude coral) · `--clay-deep` #BD5D3A (hover) · `--ink` #1F1E1B (text) · `--umber` #6B5D4F (muted text) · `--line` #E3DDD0 (hairlines).
- Type: characterful warm **serif display** (e.g. Fraunces) used with restraint + clean **sans body** (e.g. Inter/Geist) + **mono** (Geist Mono/JetBrains Mono) for the automation/code mini-UIs.
- Multiple tasteful animations (page-load sequence, scroll reveals, hover micro-interactions, the scroll-pinned services console). Respect `prefers-reduced-motion`.

### 3.1b Services (mirror bizwitai, freshened)
1. **Custom AI Automation Systems** — AI SDR, outreach engine, intelligent chatbots, internal ops automation, AI CRMs.
2. **AI Voice & WhatsApp Agents** — 24/7 voice + WhatsApp agents, lead qualification, booking, follow-ups.
3. **AI Filmmaking** — cinematic AI brand films, ads, UGC, founder avatars.
4. **AI Agents** — sales/marketing agents that automate tasks, answer, support workflows.
5. **AI Strategy & Consulting** — audit + roadmap: find what to automate.

### 3.1c Learning page (NEW — competitor does NOT have this)
- A dedicated **Learning Resources** page: a **curated tools & tutorials list** for people/students. Must be smooth, easily interpretable, easy to use. This is our differentiator.

### 3.1d Marketing line (must appear prominently)
> "We don't sell AI slop — we build end-to-end systems that save revenue."

### 3.2 Email automation architecture
- **Engine: n8n webhook → Gmail.** Forms POST to an n8n Cloud webhook (URL stored in env, never hardcoded). n8n owns all email logic so it stays editable without redeploying the site.
- **Behavior on every form submit:**
  1. **Notify Atul** at `atul.pandey0028@gmail.com` with the full lead details.
  2. **Auto-reply to the lead** with a branded confirmation email.
- **System of record:** keep writing submissions to Supabase too (do not remove the existing insert). Flow is: `form → Supabase insert (record) → n8n webhook (email)`. If the webhook fails, the lead is still saved.
- The old `server/index.js` Express stub is **deprecated** — replace it; do not build new email logic inside it.

### 3.3 Deployment
- **Vercel** is the deploy target (Atul's default). Use Vercel env vars for all secrets. The n8n webhook URL is an env var (`VITE_N8N_WEBHOOK_URL` or a server-side equivalent — prefer server-side / serverless route so the URL isn't shipped to the browser).

---

## 4. Engineering rules (from Atul's global conventions)

1. **Think before coding.** State assumptions explicitly. For ambiguous requests, surface 2–3 interpretations and ask rather than guess silently.
2. **Simplicity first.** 100 lines over 1000. No premature abstractions. No over-engineering. Delete dead code.
3. **Protect existing code.** Never touch code outside the requested scope. Never delete comments/code you don't understand. Show diffs of changed lines only. Flag if a task forces touching unrelated areas.
4. **Goal-driven.** Define "done" as measurable criteria before starting; verify against them; then stop.
5. **Communication:** give runnable commands, not theory. Flag blockers immediately — never work around silently. Automate first.

---

## 5. Refactor target (when redesigning)

The 48KB monolith must be broken into composable, readable pieces. Target structure:

```
src/
  components/
    layout/        Navbar, Footer, ScrollToTop
    sections/      Hero, Services, Process, Results, Testimonials, CTA, FAQ
    ui/            ShimmerButton, SectionHeading, Card, etc.
    forms/         ContactForm, AuditForm, CallbackForm (+ shared submit hook)
  pages/           route-level pages (existing)
  lib/             supabaseClient.ts, email.ts (n8n webhook client)
```

Keep existing routes working. Do not break `react-router` paths used in nav/footer.

---

## 6. Env vars

| Var | Where | Purpose |
|-----|-------|---------|
| `VITE_SUPABASE_URL` | client | Supabase project URL |
| `VITE_SUPABASE_ANON_KEY` | client | Supabase publishable key (safe to expose) |
| `N8N_WEBHOOK_URL` (preferred server-side) | Vercel | n8n form webhook — keep off the client if possible |

- `.env` is gitignored. Never commit secrets. Never paste secret keys into chat or code comments.
- The current Supabase key is a **publishable** key — safe for the browser. Do not swap in a service-role key on the client.

---

## 7. Commands

```bash
npm install        # deps
npm run dev        # Vite dev server → http://localhost:5173
npm run build      # tsc -b && vite build
npm run lint       # eslint
npm run preview    # preview production build
```

---

## 8. Definition of done for the redesign

- [ ] New design renders cleanly on mobile + desktop, fast (Lighthouse perf/SEO green).
- [ ] All existing routes still work; no dead links.
- [ ] Every form: saves to Supabase **and** fires the n8n webhook.
- [ ] n8n sends (a) lead notification to Atul, (b) branded auto-reply to the visitor.
- [ ] No secrets in the repo. `.env` updated with any new vars + documented here.
- [ ] `LEARNINGS.md` updated with any non-obvious gotcha discovered.
