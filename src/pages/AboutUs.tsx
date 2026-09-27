import { motion } from 'framer-motion';
import { 
  MessageSquare, 
  PhoneCall, 
  Cpu, 
  Database, 
  Sparkles, 
  TrendingUp, 
  ShieldCheck, 
  CheckCircle2, 
  ArrowRight, 
  Zap, 
  Layers, 
  ShoppingBag, 
  Video,
  Target
} from 'lucide-react';
import Navbar from '../components/layout/Navbar';
import FooterSection from '../components/layout/FooterSection';
import Card3DTilt from '../components/3d/Card3DTilt';
import SEO from '../components/SEO';

interface AgentCategory {
  title: string;
  badge: string;
  icon: React.ElementType;
  description: string;
  keywords: string[];
  metrics: string;
  glow: string;
}

const agentCategories: AgentCategory[] = [
  {
    title: 'WhatsApp AI Agents & Inbound SDRs',
    badge: 'Conversational Sales',
    icon: MessageSquare,
    description: 'Autonomous 24/7 WhatsApp AI agents that engage, qualify, and convert incoming leads in seconds. Integrates directly with Calendly, CRM pipelines, and product catalogs.',
    keywords: ['24/7 WhatsApp SDR', 'Lead Qualification AI', 'Bilingual Support (Hindi/English)', 'CRM Real-Time Sync', 'Instant Calendar Booking'],
    metrics: '90s average response time · 3x discovery calls booked',
    glow: 'bg-[#FFB7C5]/15',
  },
  {
    title: 'Voice AI & Autonomous Calling Agents',
    badge: 'Real-Time Telephony',
    icon: PhoneCall,
    description: 'Ultra-low latency conversational voice agents capable of handling complex inbound customer inquiries, booking confirmations, and automated outbound lead follow-ups.',
    keywords: ['Inbound Phone Support', 'Outbound Sales Follow-Ups', 'Human-Grade Latency (<800ms)', 'Automated Appointment Reminders', 'Voice Data Logging'],
    metrics: '68% inquiries resolved without human intervention',
    glow: 'bg-[#E6A0B0]/15',
  },
  {
    title: 'Autonomous Workflow & n8n Engine Agents',
    badge: 'Deterministic Orchestration',
    icon: Cpu,
    description: 'Deterministic backend automation engines powered by n8n, Supabase, and Claude. Connects disparate SaaS applications with self-healing error recovery and zero manual data entry.',
    keywords: ['n8n Multi-App Orchestration', 'Self-Healing Retry Pipelines', 'Automated Invoicing & Payments', 'Cross-Platform Data Synchronization', 'Zero-Error Data Routing'],
    metrics: '500+ monthly hours reclaimed per enterprise',
    glow: 'bg-[#FFB7C5]/12',
  },
  {
    title: 'Enterprise Knowledge & RAG Intelligence Agents',
    badge: 'Zero-Hallucination Retrieval',
    icon: Database,
    description: 'Secure Retrieval-Augmented Generation (RAG) agents that index enterprise documentation, internal SOPs, and knowledge bases to deliver cited, instant answers to staff and clients.',
    keywords: ['Enterprise Document RAG', 'Internal SOP Assistant', 'Zero-Hallucination Citation', 'PostgreSQL Vector Search', 'Enterprise Row-Level Security'],
    metrics: '100% data privacy with isolated database VPCs',
    glow: 'bg-[#E6A0B0]/12',
  },
  {
    title: 'E-Commerce & D2C Retention Agents',
    badge: 'Revenue Maximization',
    icon: ShoppingBag,
    description: 'Targeted agents that monitor Shopify and WooCommerce store events to recover abandoned checkouts, dispatch automated order updates, and run high-intent WhatsApp marketing flows.',
    keywords: ['Abandoned Cart Recovery', 'Post-Purchase Follow-Ups', 'Automated WhatsApp Broadcasts', 'Inventory Stock Alerts', 'Dynamic Upselling'],
    metrics: '₹4.2L+ recovered in first 30 days of deployment',
    glow: 'bg-[#FFB7C5]/15',
  },
  {
    title: 'AI Filmmaking & Creator Growth Pipelines',
    badge: 'Generative Media Engine',
    icon: Video,
    description: 'Hollywood-grade generative AI video infrastructure and automated content repurposing pipelines that transform raw assets into high-converting social ads and founder avatars.',
    keywords: ['Cinematic AI Video Ads', 'Programmatic UGC Rendering', 'YouTube to Multi-Platform Pipeline', 'AI Founder Avatars', 'High-Converting Ad Creatives'],
    metrics: '+34% organic engagement uplift across socials',
    glow: 'bg-[#E6A0B0]/15',
  },
];

const corePillars = [
  {
    icon: Target,
    title: 'Engineered for ROI, Not AI Novelty',
    desc: 'We do not build generic chatbot wrappers. Every agent and workflow is custom-engineered to solve a specific revenue bottleneck with clear payback periods.',
  },
  {
    icon: Zap,
    title: 'Deterministic & Self-Healing Architecture',
    desc: 'Our n8n and Supabase infrastructure features automatic exception interceptors, state retries, and fallback human escalation so workflows never crash silently.',
  },
  {
    icon: ShieldCheck,
    title: 'Enterprise Data Security & RLS Isolation',
    desc: 'Your proprietary business data, customer conversations, and internal records remain protected with AES-256 encryption, strict zero-retention policies, and isolated databases.',
  },
  {
    icon: Layers,
    title: 'End-to-End Turnkey Implementation',
    desc: 'From initial workflow audit to full multi-channel deployment, CRM configuration, and team onboarding — we deliver fully operational turnkey systems in 1 to 3 weeks.',
  },
];

const AboutUs = () => {
  return (
    <div className="min-h-screen bg-[#050304] text-[#FDF8F9] selection:bg-[#FFB7C5]/30 selection:text-[#050304]">
      <SEO
        title="About Us — SmartVyapari | AI Agents, WhatsApp Automation & Voice Systems"
        description="Discover how SmartVyapari engineers autonomous WhatsApp AI agents, voice calling systems, n8n workflow automations, and enterprise digital infrastructure that scale business revenue."
        canonicalPath="/about"
      />
      
      <Navbar />

      <main className="relative z-10 pt-32 sm:pt-40 pb-28 overflow-hidden">
        {/* Ambient rose background glow orbs */}
        <div className="pointer-events-none absolute top-20 left-1/2 -translate-x-1/2 h-[550px] w-[850px] rounded-full bg-[#FFB7C5]/07 blur-[180px]" />
        <div className="pointer-events-none absolute top-2/3 right-10 h-80 w-80 rounded-full bg-[#E6A0B0]/06 blur-[150px]" />

        <div className="relative mx-auto max-w-6xl px-5 sm:px-8 md:px-10">
          
          {/* ── 1. Hero Section ── */}
          <div className="text-center max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 rounded-full border border-[#FFB7C5]/25 bg-[#FFB7C5]/08 px-4 py-1.5 text-xs font-mono text-[#FFB7C5] uppercase tracking-widest backdrop-blur-md"
            >
              <Sparkles className="h-3.5 w-3.5 text-[#FFB7C5]" />
              <span>Who We Are & What We Engineer</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="mt-6 font-display text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-[#FDF8F9] leading-[1.12]"
            >
              Architecting Autonomous{' '}
              <span className="text-gradient-ai italic font-serif">AI Agents</span> &{' '}
              <span className="text-gradient-rose italic font-serif">Intelligent Systems</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-6 text-base sm:text-lg text-[#B89EA5] leading-relaxed tracking-wide"
            >
              <strong className="text-[#FDF8F9] font-medium">SmartVyapari</strong> is an advanced AI automation agency. 
              We bridge the gap between human expertise and machine scale by engineering self-healing AI agents, 
              custom WhatsApp & voice sales engines, deterministic n8n workflows, and 3D digital infrastructure 
              that turn operational busywork into autonomous revenue growth.
            </motion.p>
          </div>

          {/* ── 2. Highlight Metrics Strip ── */}
          <div className="mt-16 grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
            {[
              { val: '18,500+', label: 'Hours Saved Monthly', icon: Zap },
              { val: '24/7', label: 'Autonomous Agent Runtime', icon: MessageSquare },
              { val: '99.9%', label: 'Deterministic Pipeline Uptime', icon: Cpu },
              { val: '3x', label: 'Average Lead Conversion Lift', icon: TrendingUp },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="rounded-2xl border border-[#FFB7C5]/12 bg-[#0F0B0D]/70 p-4 sm:p-6 text-center backdrop-blur-md"
              >
                <div className="mx-auto flex h-9 w-9 items-center justify-center rounded-xl bg-[#FFB7C5]/10 text-[#FFB7C5] mb-2.5">
                  <stat.icon className="h-4 w-4" />
                </div>
                <div className="font-display text-2xl sm:text-3xl font-bold text-[#FDF8F9] tracking-tight">{stat.val}</div>
                <div className="mt-1 text-[11px] sm:text-xs text-[#B89EA5] font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </div>

          {/* ── 3. Our Specialized AI Agent Ecosystem (Keyword Matrix) ── */}
          <div className="mt-28">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <div className="inline-flex items-center gap-2 rounded-full border border-[#FFB7C5]/20 bg-[#FFB7C5]/05 px-3.5 py-1 text-xs font-mono text-[#FFB7C5] uppercase tracking-wider">
                Full-Stack Agent Catalog
              </div>
              <h2 className="mt-4 font-display text-3xl sm:text-4xl font-bold tracking-tight text-[#FDF8F9]">
                Specialized AI Agents Built For{' '}
                <span className="text-gradient-ai italic">Measurable Impact</span>
              </h2>
              <p className="mt-3 text-sm sm:text-base text-[#B89EA5] leading-relaxed">
                Explore our purpose-built agents engineered to replace manual bottlenecks across sales, support, data orchestration, and marketing.
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {agentCategories.map((agent, index) => (
                <motion.div
                  key={agent.title}
                  initial={{ opacity: 0, y: 25 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.08 }}
                >
                  <Card3DTilt intensity={8} className="h-full p-5 sm:p-7 border border-[#FFB7C5]/14 bg-[#0F0B0D]/85 hover:border-[#FFB7C5]/30 flex flex-col justify-between transition-all">
                    {/* Glow flare */}
                    <div className={`pointer-events-none absolute -top-16 -right-16 h-36 w-36 rounded-full ${agent.glow} blur-2xl opacity-60`} />

                    <div>
                      {/* Card Header */}
                      <div className="flex items-center justify-between">
                        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#FFB7C5]/08 border border-[#FFB7C5]/18 text-[#FFB7C5]">
                          <agent.icon className="h-5 w-5" />
                        </div>
                        <span className="text-[10px] font-mono font-semibold uppercase tracking-wider text-[#FFB7C5] bg-[#FFB7C5]/08 px-2.5 py-1 rounded-full border border-[#FFB7C5]/15">
                          {agent.badge}
                        </span>
                      </div>

                      <h3 className="mt-5 font-display text-lg sm:text-xl font-bold text-[#FDF8F9] tracking-tight leading-snug">
                        {agent.title}
                      </h3>

                      <p className="mt-2.5 text-xs sm:text-sm text-[#B89EA5] leading-relaxed">
                        {agent.description}
                      </p>

                      {/* Keywords Pill Tags */}
                      <div className="mt-5 pt-4 border-t border-[#FFB7C5]/10">
                        <div className="text-[10px] font-mono uppercase tracking-wider text-[#FFB7C5] mb-2 font-semibold">
                          Capabilities & Stack:
                        </div>
                        <ul className="space-y-1.5">
                          {agent.keywords.map((kw) => (
                            <li key={kw} className="flex items-center gap-2 text-xs text-[#E2C2C9]">
                              <CheckCircle2 className="h-3.5 w-3.5 text-[#FFB7C5] shrink-0" />
                              <span>{kw}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* Result Footer */}
                    <div className="mt-6 pt-3 border-t border-[#FFB7C5]/08 text-[11px] font-mono text-[#FFB7C5]/90 bg-[#FFB7C5]/04 p-2.5 rounded-lg border border-[#FFB7C5]/10">
                      ⚡ {agent.metrics}
                    </div>
                  </Card3DTilt>
                </motion.div>
              ))}
            </div>
          </div>

          {/* ── 4. Why Partner With SmartVyapari (Engineering Principles) ── */}
          <div className="mt-28">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <div className="inline-flex items-center gap-2 rounded-full border border-[#FFB7C5]/20 bg-[#FFB7C5]/05 px-3.5 py-1 text-xs font-mono text-[#FFB7C5] uppercase tracking-wider">
                Our Foundation
              </div>
              <h2 className="mt-4 font-display text-3xl sm:text-4xl font-bold tracking-tight text-[#FDF8F9]">
                Why Ambitious Businesses Choose{' '}
                <span className="text-gradient-ai italic">SmartVyapari</span>
              </h2>
            </div>

            <div className="grid gap-6 sm:grid-cols-2">
              {corePillars.map((pillar, i) => (
                <motion.div
                  key={pillar.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="rounded-2xl border border-[#FFB7C5]/12 bg-[#0F0B0D]/70 p-6 sm:p-8 backdrop-blur-md"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#FFB7C5]/08 border border-[#FFB7C5]/18 text-[#FFB7C5] mb-5">
                    <pillar.icon className="h-6 w-6" />
                  </div>
                  <h3 className="font-display text-xl font-bold text-[#FDF8F9] tracking-tight">{pillar.title}</h3>
                  <p className="mt-3 text-sm text-[#B89EA5] leading-relaxed">{pillar.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* ── 5. Bottom Call to Action ── */}
          <div className="mt-28">
            <div className="mx-auto max-w-4xl rounded-3xl border border-[#FFB7C5]/20 bg-gradient-to-br from-[#FFB7C5]/08 via-[#0F0B0D]/90 to-[#0A0608]/95 p-8 sm:p-12 text-center backdrop-blur-2xl shadow-2xl relative overflow-hidden">
              <div className="pointer-events-none absolute -bottom-20 -right-20 h-60 w-60 rounded-full bg-[#FFB7C5]/15 blur-3xl" />
              
              <h2 className="font-display text-3xl sm:text-4xl font-bold text-[#FDF8F9] tracking-tight">
                Ready to Automate Your Operations?
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-sm sm:text-base text-[#B89EA5] leading-relaxed">
                Book a 30-minute operational strategy audit. We'll map your repetitive workflows, identify high-ROI AI agent opportunities, and provide a clear deployment roadmap.
              </p>

              <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
                <a
                  href="/#contact"
                  className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#FFB7C5] via-[#E6A0B0] to-[#FDF8F9] px-7 py-3.5 text-xs sm:text-sm font-bold uppercase tracking-wider text-[#050304] shadow-glow-md transition-all hover:scale-105 active:scale-95"
                >
                  <span>Book Free Automation Audit</span>
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </a>
                <a
                  href="/case-studies"
                  className="inline-flex items-center gap-2 rounded-full border border-[#FFB7C5]/25 bg-[#FFB7C5]/05 px-6 py-3.5 text-xs sm:text-sm font-semibold text-[#E2C2C9] backdrop-blur-md transition-all hover:bg-[#FFB7C5]/12 hover:text-[#FDF8F9]"
                >
                  <span>Explore Case Studies</span>
                </a>
              </div>
            </div>
          </div>

        </div>
      </main>

      <FooterSection />
    </div>
  );
};

export default AboutUs;
