import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bot, Database, ArrowRight, Check, Cpu, Box } from 'lucide-react';
import Card3DTilt from '../3d/Card3DTilt';

interface ServiceItem {
  id: string;
  icon: React.ElementType;
  badge: string;
  title: string;
  subtitle: string;
  assetPlaceholder: string;
  benefits: string[];
  mockupType: 'n8n_pipeline' | 'dm_bot' | 'supabase_db' | 'three_d_media';
}

const services: ServiceItem[] = [
  {
    id: 'n8n-pipelines',
    icon: Cpu,
    badge: 'Deterministic Workflows',
    title: 'Autonomous n8n Workflow Pipelines',
    subtitle: 'End-to-end automated pipelines that synchronize your orders, inventory, financial reports, and team notifications without human delay.',
    assetPlaceholder: '/assets/ecosystem-card-1.png',
    benefits: [
      'Multi-step workflow orchestration connecting 500+ business tools',
      'Automated error-handling, payload validation & self-healing retries',
      'Zero manual data entry between spreadsheets, email, and CRMs',
    ],
    mockupType: 'n8n_pipeline',
  },
  {
    id: 'ai-sdr',
    icon: Bot,
    badge: 'Autonomous Conversion',
    title: 'AI Inbound SDR & WhatsApp Agents',
    subtitle: 'Autonomous agents that qualify incoming prospects across WhatsApp, Email, and social channels, booking appointments straight into your calendar.',
    assetPlaceholder: '/assets/ecosystem-card-2.png',
    benefits: [
      'Sub-second lead qualification scoring via custom LLM reasoning',
      '24/7 WhatsApp & Email conversational booking flow',
      'Automatic handoff to human closers when deal size threshold is met',
    ],
    mockupType: 'dm_bot',
  },
  {
    id: 'supabase-infra',
    icon: Database,
    badge: 'Enterprise Backend',
    title: 'Supabase Cloud Database & Webhooks',
    subtitle: 'Production-ready PostgreSQL architecture engineered for high concurrency, real-time sync, audit logging, and ironclad Row-Level Security.',
    assetPlaceholder: '/assets/ecosystem-card-3.png',
    benefits: [
      'PostgreSQL database design with automated backups and replication',
      'Real-time webhook triggers feeding directly into n8n and frontend apps',
      'Enterprise security standards with AES-256 encryption & RLS policies',
    ],
    mockupType: 'supabase_db',
  },
  {
    id: '3d-infrastructure',
    icon: Box,
    badge: 'Digital Experience',
    title: '3D Digital Infrastructure & Cinematic Media',
    subtitle: 'High-performance 3D WebGL interfaces, interactive software dashboards, and Hollywood-grade generative AI commercials for your products.',
    assetPlaceholder: '/assets/ecosystem-card-4.png',
    benefits: [
      'Hardware-accelerated 3D canvas and interactive web applications',
      'Photorealistic 3D product motion graphics & CGI ads',
      'Modern, dark-mode SaaS frontends built in React 19 & TypeScript',
    ],
    mockupType: 'three_d_media',
  },
];

export const EcosystemSection = () => {
  const [activeTab, setActiveTab] = useState<string>(services[0].id);

  const currentService = services.find((s) => s.id === activeTab) || services[0];

  return (
    <section id="ecosystem" className="relative z-10 bg-[#050304]/92 backdrop-blur-xl border-t border-[#FFB7C5]/12 py-32 overflow-hidden">
      {/* Background warm grid */}
      <div className="pointer-events-none absolute inset-0 bg-grid-pattern opacity-30" />
      <div className="pointer-events-none absolute -bottom-40 left-10 h-96 w-96 rounded-full bg-[#E6A0B0]/08 blur-[140px]" />

      <div className="relative z-10 mx-auto max-w-6xl px-6 md:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-[#FFB7C5]/22 bg-[#FFB7C5]/07 px-4 py-1.5 text-xs font-mono text-[#FFB7C5] uppercase tracking-widest backdrop-blur-md">
              The Architecture
            </div>
            <h2 className="mt-4 font-display text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#FDF8F9]">
              Deterministic AI & Automation{' '}
              <span className="text-gradient-ai italic">Ecosystem</span>
            </h2>
          </div>
          <p className="max-w-md text-sm sm:text-base text-[#B89EA5] leading-relaxed">
            From autonomous workflow triggers to production PostgreSQL databases, explore each component of our engineering stack.
          </p>
        </div>

        {/* Tab Selector */}
        <div className="mt-12 flex flex-wrap gap-2 border-b border-[#FFB7C5]/10 pb-4">
          {services.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`group flex items-center gap-2.5 rounded-full px-6 py-2.5 text-xs font-semibold uppercase tracking-wider transition-all duration-300 ${
                  isActive
                    ? 'bg-gradient-to-r from-[#FFB7C5] via-[#E6A0B0] to-[#FDF8F9] text-[#050304] shadow-glow-sm'
                    : 'bg-[#0F0B0D]/60 text-[#B89EA5] hover:bg-[#FFB7C5]/08 hover:text-[#FDF8F9] border border-[#FFB7C5]/10'
                }`}
              >
                <item.icon className={`h-3.5 w-3.5 ${isActive ? 'text-[#050304]' : 'text-[#B89EA5] group-hover:text-[#FFB7C5]'}`} />
                <span>{item.title.split('&')[0]}</span>
              </button>
            );
          })}
        </div>

        {/* Dynamic Service Matrix Display */}
        <div className="mt-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentService.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            >
              <Card3DTilt intensity={8} className="border border-[#FFB7C5]/15 bg-[#0F0B0D]/85 p-8 md:p-12 shadow-2xl backdrop-blur-2xl">
                <div className="grid gap-10 lg:grid-cols-2 items-center">
                  {/* Left: Features */}
                  <div>
                    <div className="inline-flex items-center gap-2 rounded-full border border-[#FFB7C5]/25 bg-[#FFB7C5]/08 px-3 py-1 text-xs font-mono font-semibold text-[#FFB7C5]">
                      {currentService.badge}
                    </div>

                    <h3 className="mt-4 font-display text-2xl sm:text-3xl font-bold text-[#FDF8F9] tracking-tight">
                      {currentService.title}
                    </h3>

                    <p className="mt-4 text-base leading-relaxed text-[#B89EA5]">
                      {currentService.subtitle}
                    </p>

                    <div className="mt-8 space-y-3">
                      {currentService.benefits.map((benefit) => (
                        <div key={benefit} className="flex items-start gap-3 rounded-xl bg-[#FFB7C5]/04 border border-[#FFB7C5]/10 p-3.5">
                          <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#FFB7C5]/15 text-[#FFB7C5] mt-0.5">
                            <Check className="h-3.5 w-3.5" />
                          </div>
                          <span className="text-sm text-[#E2C2C9] leading-snug">{benefit}</span>
                        </div>
                      ))}
                    </div>

                    <div className="mt-8 flex items-center gap-4">
                      <a
                        href="#contact"
                        className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#FFB7C5] via-[#E6A0B0] to-[#FDF8F9] px-6 py-3 text-sm font-semibold text-[#050304] transition-all hover:shadow-glow-md hover:scale-105"
                      >
                        <span>Deploy This System</span>
                        <ArrowRight className="h-4 w-4" />
                      </a>
                    </div>
                  </div>

                  {/* Right: Mockup Container */}
                  <div className="relative flex items-center justify-center rounded-2xl border border-[#FFB7C5]/12 bg-black/50 p-6 overflow-hidden min-h-[340px]">
                    {/* Rose ambient flare */}
                    <div className="pointer-events-none absolute h-52 w-52 rounded-full bg-[#FFB7C5]/12 blur-3xl" />

                    {currentService.mockupType === 'n8n_pipeline' && (
                      <div className="w-full max-w-sm space-y-3">
                        <div className="rounded-xl border border-[#FFB7C5]/15 bg-[#0F0B0D]/90 p-4 shadow-xl">
                          <div className="flex items-center justify-between pb-3 border-b border-[#FFB7C5]/10">
                            <div className="flex items-center gap-2">
                              <Cpu className="h-4 w-4 text-[#FFB7C5]" />
                              <span className="text-xs font-mono font-semibold text-[#FDF8F9]">n8n_workflow_engine.ts</span>
                            </div>
                            <span className="text-[10px] font-mono text-[#FFB7C5] font-semibold bg-[#FFB7C5]/10 px-2 py-0.5 rounded-full">ACTIVE</span>
                          </div>
                          <div className="mt-3 bg-black/70 p-3 rounded-lg border border-[#FFB7C5]/07 font-mono text-[11px] text-[#E2C2C9] space-y-1.5">
                            <div className="text-[#B89EA5]">// Trigger on new transaction</div>
                            <div><span className="text-[#FFB7C5]">Step 1:</span> Parse incoming Webhook payload</div>
                            <div><span className="text-[#E6A0B0]">Step 2:</span> Verify stock in Supabase table</div>
                            <div><span className="text-[#FDF8F9]">Step 3:</span> Auto-route dispatch & notify team</div>
                          </div>
                          <div className="mt-3 flex items-center justify-between text-xs text-[#B89EA5] font-mono">
                            <span>Execution: 42ms</span>
                            <span className="text-[#FFB7C5]">0 Errors</span>
                          </div>
                        </div>
                      </div>
                    )}

                    {currentService.mockupType === 'dm_bot' && (
                      <div className="w-full max-w-sm space-y-3">
                        <div className="rounded-2xl rounded-tl-sm bg-[#0F0B0D] border border-[#FFB7C5]/12 p-3.5 text-xs text-[#E2C2C9] mr-auto max-w-[85%]">
                          Hi, we need to automate our weekly analytics pipeline and WhatsApp customer notifications.
                        </div>
                        <div className="rounded-2xl rounded-tr-sm bg-gradient-to-r from-[#FFB7C5] via-[#E6A0B0] to-[#FDF8F9] p-3.5 text-xs text-[#050304] ml-auto max-w-[90%] shadow-glow-sm font-medium">
                          Hello! ✨ We build that with n8n and Supabase. Our system ingests your exports and pushes live summaries to WhatsApp in under 5 minutes. Would you like a 15-min strategy call with Atul?
                        </div>
                        <div className="rounded-2xl rounded-tl-sm bg-[#0F0B0D] border border-[#FFB7C5]/12 p-3 text-xs text-[#E2C2C9] mr-auto max-w-[80%]">
                          Yes, please schedule for Wednesday 3 PM.
                        </div>
                        <div className="flex items-center gap-2 rounded-xl bg-[#FFB7C5]/10 border border-[#FFB7C5]/20 p-2.5 text-xs text-[#FFB7C5]">
                          <Check className="h-4 w-4" />
                          <span>Audit meeting confirmed & synced to Google Calendar</span>
                        </div>
                      </div>
                    )}

                    {currentService.mockupType === 'supabase_db' && (
                      <div className="w-full max-w-sm space-y-2.5">
                        <div className="rounded-xl border border-[#FFB7C5]/15 bg-[#0F0B0D]/90 p-3.5">
                          <div className="flex justify-between items-center text-xs font-mono text-[#B89EA5]">
                            <span className="flex items-center gap-1.5 text-[#FFB7C5]"><Database className="h-3.5 w-3.5" /> Supabase PostgreSQL</span>
                            <span className="text-[#E2C2C9]">RLS ENABLED</span>
                          </div>
                          <div className="mt-2 font-mono text-[11px] text-[#E2C2C9] bg-black/60 p-2.5 rounded-lg border border-[#FFB7C5]/07 space-y-1">
                            <div><span className="text-[#FFB7C5]">table:</span> public.audits</div>
                            <div><span className="text-[#E6A0B0]">policy:</span> allow_anon_insert_audits (CHECK: true)</div>
                            <div><span className="text-[#FDF8F9]">status:</span> 200 OK · Syncing with Vercel</div>
                          </div>
                        </div>
                        <div className="rounded-xl border border-[#FFB7C5]/12 bg-[#0F0B0D]/90 p-3 flex items-center justify-between text-xs">
                          <span className="text-[#E2C2C9]">Instance: `iaoeeaivewpkhuvqhdka`</span>
                          <span className="text-[#FFB7C5] font-mono">ACTIVE_HEALTHY</span>
                        </div>
                      </div>
                    )}

                    {currentService.mockupType === 'three_d_media' && (
                      <div className="w-full max-w-sm space-y-3 text-center">
                        <div className="aspect-video w-full rounded-xl bg-[#050304] border border-[#FFB7C5]/12 flex flex-col items-center justify-center p-6 relative overflow-hidden">
                          <div className="absolute inset-0 bg-radial-rose opacity-60" />
                          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-r from-[#FFB7C5] to-[#E6A0B0] text-[#050304] shadow-glow-md mb-3">
                            <Box className="h-6 w-6" />
                          </div>
                          <span className="font-display text-sm font-bold text-[#FDF8F9]">Interactive 3D WebGL Dashboard</span>
                          <span className="text-xs font-mono text-[#B89EA5] mt-1">GPU Accelerated · 60 FPS React 19 Engine</span>
                        </div>
                        <div className="flex justify-between items-center px-2 text-xs text-[#B89EA5] font-mono">
                          <span>Rendering: Ultra Smooth</span>
                          <span className="text-[#FFB7C5]">Zero Cumulative Layout Shift</span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </Card3DTilt>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default EcosystemSection;
