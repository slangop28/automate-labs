# LEARNINGS.md — SmartVyapari Website

Hard-won, project-specific gotchas. Add to this whenever a non-obvious lesson costs time once.
Brand: **SmartVyapari** (`smartvyapari.online`) · Contact: `hello@smartvyapari.online`

---

## Phase 1 — Design system shipped (2026-06-18)

- **Express server (`server/index.js`) sends NO email.** It only `console.log`s submissions and returns a fake `{ success: true }`. Do not assume email works because the form shows success — it never did. Real email is via n8n.
- **Forms write to Supabase via `submitToSupabase()`**. Table names must already exist in Supabase or the insert silently logs an error and returns `false`. Verify table + column names before wiring a new form.
- **Supabase key in `.env` is the publishable (anon) key** — safe for the browser. Never replace with a service-role key on the client.
- **`.env` is gitignored** — copy values manually to Vercel env vars; they will not deploy automatically.
- **Do NOT chain `.select()` on anonymous Supabase inserts** — triggers RLS error 42501.

---

## Phase 2 — Full site redesigned, cream/clay theme (2026-06-19)

- **Every page moved to the Claude (cream/clay) design.** Homepage rebuilt from 48 KB monolith into `pages/Home.tsx` composing `components/sections/*`. `AutomateLabsWebsite.tsx` **deleted**.
- **Signature element** = `sections/AutomationConsole.tsx`: sticky console (desktop) driven by IntersectionObserver — mock swaps as user scrolls through 4 steps.
- **Routing** (`main.tsx`): `/`→Home, `/case-studies`, `/learning`, `/portfolio`, `/about`, `/privacy`, `/careers`.
- **Lead pipeline:** `lib/email.ts#submitLead` → Supabase insert into `contacts` table + POST to `VITE_N8N_WEBHOOK_URL`. Webhook URL empty in `.env` = DEMO MODE (logs to console, shows success). Set the var to go live.
- **Scroll-reveal artifact:** `<Reveal>` starts at `opacity:0`, only animates via IntersectionObserver. Full-page screenshots show blank below-the-fold sections — NOT a bug. Use viewport screenshots.
- TS gotcha: arrays of `{label, to?} | {label, href?}` link objects need an explicit `type` annotation with optional fields, or `tsc -b` errors on union member access.

---

## Phase 3 — Sakura Rose Luxury design system (2026-09-25)

### Design system pivot: cream/clay → Sakura Rose Luxury dark theme
- **Complete elimination of all blue/cyan/purple** from the entire site. The old cream/clay theme is fully replaced.
- **New palette:**
  - Background: Obsidian Black `#050304`
  - Primary text: Warm Pearl `#FDF8F9`
  - Muted text: Soft Rose Gray `#B89EA5` / `#E2C2C9`
  - Primary accent / glows: Sakura Pink `#FFB7C5`
  - Secondary accent: Rose Gold `#E6A0B0`
  - Glass border: `rgba(255, 183, 197, 0.15)`
- **Typography:** Cormorant Garamond + Playfair Display (display/serif headings), Plus Jakarta Sans + Outfit (body), JetBrains Mono. Space Grotesk removed.
- **CSS gradient utilities:** `text-gradient-ai` (`from-[#FFB7C5] via-[#E6A0B0] to-[#FDF8F9]`), `text-gradient-rose`.

### Key files rewritten this session
- `tailwind.config.js` — full rewrite: sakura/rose tokens, serif fontFamily, rose glow shadows, `petal-fall` animation keyframe.
- `src/index.css` — full rewrite: rose CSS vars, sakura scrollbar, updated gradient utilities, serif h1/h2/h3.
- `index.html` — Cormorant Garamond + Playfair Display added; Space Grotesk removed. Meta title/desc updated.
- `src/pages/Home.tsx` — wrapper: `bg-[#050304]`, `text-[#FDF8F9]`, sakura selection.
- `src/components/sections/HeroSection.tsx` — headline: "Helping businesses & creators scale faster.", n8n/Supabase removed from sub-headline, rose palette, floating status ticker removed (was overlapping buttons).
- `src/components/layout/Navbar.tsx` — no outer box, no logo icon, no AUTONOMOUS AI badge, SmartVyapari as large luxury wordmark, "Case Studies" → "Don't know what to build?", rose hover underlines.
- `src/components/layout/FooterSection.tsx` — rose palette, wordmark sans logo, "Don't know what to build?" link.
- `src/components/sections/AboutSection.tsx`, `EcosystemSection.tsx`, `ViralMetricsSection.tsx`, `ContactSection.tsx` — all fully rewritten to sakura palette.
- `src/components/3d/Canvas3DBackground.tsx` — particle colors → sakura palette.
- `src/components/3d/Card3DTilt.tsx` — specular glare → pearl-rose rgba.
- `src/pages/CaseStudies.tsx` — full rewrite: rose luxury, interactive accordion cards, new headline "Don't know what to build? Here's what's possible."
- `src/components/ui/Stat.tsx` — rose palette colors.

### Contact email migration (2026-09-26)
- **`atul.pandey0028@gmail.com` → `hello@smartvyapari.online`** — replaced across all source files:
  - `src/components/forms/ContactForm.tsx`
  - `src/components/layout/FooterSection.tsx`
  - `src/components/sections/ContactSection.tsx` (3 occurrences)
  - `src/pages/Careers.tsx`
  - `src/pages/PrivacyPolicy.tsx`
- **Rule going forward:** Never use personal Gmail in source code. All public-facing and lead email references use `hello@smartvyapari.online`.

### Navigation: cross-page hash anchor bug (2026-09-26)
- **Root cause:** Bare `#hash` hrefs (e.g. `href="#ecosystem"`) only look for elements on the *current page*. When clicked from `/portfolio` or `/case-studies`, the `#ecosystem` section doesn't exist there, so nothing happens.
- **Fix:** All hash anchors changed to full-path format: `href="/#ecosystem"`, `href="/#about"`, `href="/#contact"`. This forces the browser to navigate to `/` first, then `ScrollToTop.tsx` polls for the element.
- **`ScrollToTop.tsx`** upgraded to 60 × 50ms polling loop (3 seconds total) with a 100ms initial grace period. Gives newly mounted sections time to appear in the DOM before the first probe.
### Mobile layout responsiveness (2026-09-26)
- **`Card3DTilt` padding on mobile:** Use `p-5 sm:p-8 md:p-12` instead of static `p-8` or `p-12` to preserve internal container width on screens below 400px.
- **Simulator card grid:** Multi-digit rupee formatted amounts (e.g. `₹2,43,200`) overflow on two-column narrow mobile viewports. Use `grid-cols-1 sm:grid-cols-2` with `tracking-tight` and `flex flex-col sm:flex-row` on full-width CTA rows to prevent text/button collisions.
- **Mockup badges:** Avoid wide trailing status badges next to long filenames (e.g. `n8n_workflow_engine.ts`) inside constrained mobile mockup headers.

---

## Conventions

- Read `CLAUDE.md` for all project decisions (palette, email, navigation architecture, Vercel deploy).
- Run `npm run build` before every commit. 0 TypeScript errors is non-negotiable.
- NavItem links to same-page sections: always `href="/#sectionId"`, never bare `#sectionId`.
- Use `import type` for type-only imports (`verbatimModuleSyntax` is on).
- `lucide-react` has no Instagram icon → use `src/components/ui/Icons.tsx` custom SVG.
