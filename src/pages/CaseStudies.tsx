import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';
import FooterSection from '../components/layout/FooterSection';

/* ─── Data ─────────────────────────────────────────────────────────────── */
interface CaseStudy {
  id: string;
  category: 'ecommerce' | 'sales' | 'creators' | 'operations';
  client: string;
  headline: string;
  challenge: string;
  solution: string;
  result: string;
  metrics: { value: string; label: string }[];
  tags: string[];
}

const cases: CaseStudy[] = [
  {
    id: 'cs-001',
    category: 'sales',
    client: 'D2C Brand',
    headline: 'AI SDR that books 3× more discovery calls — without a single extra salesperson',
    challenge: 'Their sales team spent 4 hours/day qualifying leads from Instagram DMs and website forms — most leads went cold before anyone responded.',
    solution: 'Built a WhatsApp AI SDR that instantly qualifies leads via conversational flow, books calls to Calendly, and updates their CRM automatically. Fallback to human when intent is unclear.',
    result: 'Within 6 weeks: discovery call volume tripled, average response time dropped from 4 hours to 90 seconds, and the sales team reclaimed 20 hours/week.',
    metrics: [
      { value: '3×', label: 'more calls booked' },
      { value: '90s', label: 'avg. response time' },
      { value: '20 hrs', label: 'saved per week' },
    ],
    tags: ['AI SDR', 'WhatsApp Automation', 'CRM Integration'],
  },
  {
    id: 'cs-002',
    category: 'ecommerce',
    client: 'Fashion E-commerce',
    headline: 'Abandoned cart recovery AI — ₹4.2L recovered in the first month',
    challenge: 'Abandoned cart rate was 72%. Manual email follow-ups had a 1.8% re-engagement rate. The team had no bandwidth to personalise outreach.',
    solution: 'Deployed a multi-channel recovery workflow: WhatsApp message within 30 min, personalised email at 2h, and a final nudge at 24h — all triggered by Shopify events via n8n, with dynamic product recommendations.',
    result: '₹4.2 lakh recovered in month 1. Re-engagement rate jumped to 11.4%. Zero extra headcount.',
    metrics: [
      { value: '₹4.2L', label: 'recovered month 1' },
      { value: '11.4%', label: 're-engagement rate' },
      { value: '0', label: 'extra headcount' },
    ],
    tags: ['Shopify', 'n8n Workflows', 'WhatsApp', 'Email Automation'],
  },
  {
    id: 'cs-003',
    category: 'creators',
    client: 'Content Creator (500K+ followers)',
    headline: 'From posting chaos to a fully automated content pipeline — 10 hrs/week reclaimed',
    challenge: 'Creator was manually repurposing long-form YouTube content into Instagram reels, LinkedIn posts, and newsletters. Took 10+ hours/week and still felt inconsistent.',
    solution: 'Built a make.com + AI pipeline: YouTube transcript → GPT-4 repurposing into 5 content formats → auto-scheduled via Buffer. Newsletter drafted and sent via Brevo. All triggered on upload.',
    result: 'Full content pipeline runs on autopilot. Creator now focuses on filming only. Engagement up 34% due to increased posting consistency.',
    metrics: [
      { value: '10 hrs', label: 'saved weekly' },
      { value: '5 formats', label: 'auto-generated per video' },
      { value: '+34%', label: 'engagement uplift' },
    ],
    tags: ['Content Automation', 'AI Writing', 'Make.com', 'YouTube'],
  },
  {
    id: 'cs-004',
    category: 'operations',
    client: 'SaaS Startup (B2B)',
    headline: 'Internal ops AI — from 3-day onboarding to 4 hours, zero manual tasks',
    challenge: 'New client onboarding required 14 manual steps across Notion, Slack, email, and their internal tool. Average completion: 3 days. Error rate: 22%.',
    solution: 'Mapped and automated the full onboarding flow with n8n: auto-create Notion workspace, send Slack welcome, provision tool access, send personalised email sequence, and notify the CSM — all triggered on CRM deal-close.',
    result: 'Onboarding time: 3 days → 4 hours. Error rate: 22% → 0%. CSM team capacity increased by 40%.',
    metrics: [
      { value: '4 hrs', label: 'vs 3-day onboarding' },
      { value: '0%', label: 'error rate (was 22%)' },
      { value: '+40%', label: 'CSM capacity freed' },
    ],
    tags: ['n8n', 'Notion', 'Slack', 'CRM Automation'],
  },
  {
    id: 'cs-005',
    category: 'sales',
    client: 'Real Estate Agency',
    headline: 'AI inbound agent that qualifies property leads 24/7 — even at 2 AM',
    challenge: 'Property enquiries came via WhatsApp at all hours. Agents missed leads overnight. Manual follow-up was inconsistent and slow.',
    solution: 'Deployed an AI voice + WhatsApp agent that handles initial qualification (budget, timeline, location preferences), answers FAQs, and schedules site visits — escalating hot leads to agents immediately via Slack.',
    result: '68% of enquiries now fully handled by AI. Site visit bookings up 2.1×. Zero missed overnight leads.',
    metrics: [
      { value: '68%', label: 'enquiries handled by AI' },
      { value: '2.1×', label: 'site visits booked' },
      { value: '0', label: 'missed overnight leads' },
    ],
    tags: ['AI Voice Agent', 'WhatsApp', 'Real Estate', 'Lead Qualification'],
  },
];

const CATEGORIES = [
  { key: 'all', label: 'All' },
  { key: 'sales', label: 'Sales & SDR' },
  { key: 'ecommerce', label: 'E-Commerce' },
  { key: 'creators', label: 'Creators' },
  { key: 'operations', label: 'Operations' },
] as const;

/* ─── Component ─────────────────────────────────────────────────────────── */
const CaseStudies = () => {
  const [openId, setOpenId]       = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const filtered = activeCategory === 'all'
    ? cases
    : cases.filter(c => c.category === activeCategory);

  const toggle = (id: string) => setOpenId(prev => (prev === id ? null : id));

  return (
    <div className="min-h-screen bg-[#050304] text-[#FDF8F9]">
      <Navbar />

      {/* ── Hero ── */}
      <section className="pt-36 pb-20 px-6 text-center">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-4 inline-block font-mono text-xs tracking-[0.25em] uppercase text-[#FFB7C5]"
        >
          Real results · Real clients
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="font-display text-4xl sm:text-5xl md:text-6xl font-semibold leading-[1.1] tracking-tight"
        >
          Don't know what to build?
          <br />
          <em className="bg-gradient-to-r from-[#FFB7C5] via-[#E6A0B0] to-[#FDF8F9] bg-clip-text text-transparent not-italic">
            Here's what's possible.
          </em>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mx-auto mt-6 max-w-xl text-base text-[#B89EA5] leading-relaxed"
        >
          Every build below started with a simple problem. Click any card to see exactly how we solved it — and the numbers that followed.
        </motion.p>
      </section>

      {/* ── Filter Pills ── */}
      <section className="px-6 pb-10">
        <div className="mx-auto max-w-4xl flex flex-wrap justify-center gap-3">
          {CATEGORIES.map(cat => (
            <button
              key={cat.key}
              onClick={() => setActiveCategory(cat.key)}
              className={`rounded-full px-5 py-2 text-xs font-semibold uppercase tracking-wider transition-all duration-300 ${
                activeCategory === cat.key
                  ? 'bg-gradient-to-r from-[#FFB7C5] via-[#E6A0B0] to-[#FDF8F9] text-[#050304] shadow-[0_0_20px_rgba(255,183,197,0.35)]'
                  : 'border border-[#FFB7C5]/20 text-[#B89EA5] hover:border-[#FFB7C5]/50 hover:text-[#FDF8F9]'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </section>

      {/* ── Case Study Accordion ── */}
      <section className="px-6 pb-24">
        <div className="mx-auto max-w-4xl space-y-4">
          <AnimatePresence>
            {filtered.map((cs, i) => {
              const isOpen = openId === cs.id;
              return (
                <motion.div
                  key={cs.id}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: i * 0.08 }}
                  className="rounded-2xl border border-[#FFB7C5]/15 bg-white/[0.03] backdrop-blur-sm overflow-hidden"
                >
                  {/* Header / Toggle */}
                  <button
                    onClick={() => toggle(cs.id)}
                    className="w-full flex items-start justify-between gap-6 p-6 text-left group"
                  >
                    <div className="flex-1">
                      <span className="mb-2 inline-block font-mono text-[10px] uppercase tracking-[0.2em] text-[#FFB7C5]">
                        {cs.client}
                      </span>
                      <p className="text-base sm:text-lg font-medium text-[#FDF8F9] group-hover:text-[#FFB7C5] transition-colors leading-snug">
                        {cs.headline}
                      </p>
                      {/* Tags */}
                      <div className="mt-3 flex flex-wrap gap-2">
                        {cs.tags.map(tag => (
                          <span
                            key={tag}
                            className="rounded-full border border-[#FFB7C5]/20 px-3 py-0.5 text-[10px] font-mono uppercase tracking-wider text-[#B89EA5]"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="mt-1 shrink-0 rounded-full border border-[#FFB7C5]/20 p-1.5 text-[#FFB7C5] group-hover:border-[#FFB7C5]/60 transition-colors">
                      {isOpen ? <Minus className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
                    </div>
                  </button>

                  {/* Expanded Body */}
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        key="body"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.35 }}
                        className="overflow-hidden"
                      >
                        <div className="border-t border-[#FFB7C5]/10 px-6 pb-8 pt-6 space-y-6">
                          {/* Metrics */}
                          <div className="grid grid-cols-3 gap-4">
                            {cs.metrics.map(m => (
                              <div key={m.label} className="text-center rounded-xl bg-[#FFB7C5]/5 border border-[#FFB7C5]/10 py-4 px-2">
                                <p className="font-display text-2xl font-bold bg-gradient-to-r from-[#FFB7C5] to-[#E6A0B0] bg-clip-text text-transparent">
                                  {m.value}
                                </p>
                                <p className="mt-1 text-[10px] font-mono uppercase tracking-wider text-[#B89EA5]">
                                  {m.label}
                                </p>
                              </div>
                            ))}
                          </div>

                          {/* Problem / Solution / Result */}
                          {[
                            { label: 'The Problem', text: cs.challenge },
                            { label: 'What We Built', text: cs.solution },
                            { label: 'The Result', text: cs.result },
                          ].map(block => (
                            <div key={block.label}>
                              <p className="mb-1.5 font-mono text-[10px] uppercase tracking-[0.2em] text-[#FFB7C5]">
                                {block.label}
                              </p>
                              <p className="text-sm text-[#B89EA5] leading-relaxed">{block.text}</p>
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="px-6 pb-28">
        <div className="mx-auto max-w-2xl rounded-3xl border border-[#FFB7C5]/15 bg-gradient-to-br from-[#FFB7C5]/5 to-transparent p-10 text-center backdrop-blur-sm">
          <h2 className="font-display text-3xl sm:text-4xl font-semibold">
            See yourself in one of these?
          </h2>
          <p className="mt-4 text-[#B89EA5] leading-relaxed">
            Tell us your situation in 2 minutes. We'll map out exactly what's possible for your business — no fluff, no commitment.
          </p>
          <Link
            to="/#contact"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#FFB7C5] via-[#E6A0B0] to-[#FDF8F9] px-8 py-3.5 text-sm font-bold uppercase tracking-wider text-[#050304] shadow-[0_0_30px_rgba(255,183,197,0.3)] hover:shadow-[0_0_50px_rgba(255,183,197,0.5)] transition-all duration-300"
          >
            Start the conversation
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      <FooterSection />
    </div>
  );
};

export default CaseStudies;
