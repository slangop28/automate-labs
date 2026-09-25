import { motion } from 'framer-motion';
import { Cpu, Database, Bot, Box, ArrowUpRight } from 'lucide-react';
import Card3DTilt from '../3d/Card3DTilt';

interface Pillar {
  icon: React.ElementType;
  tag: string;
  title: string;
  desc: string;
  features: string[];
  glow: string;
}

const pillars: Pillar[] = [
  {
    icon: Cpu,
    tag: 'Core System 01',
    title: 'Autonomous AI Agents & Neural Workflows',
    desc: 'Production-grade agent orchestration utilizing n8n, Claude, and custom LLM reasoning pipelines. Self-healing logic ensures workflows adapt and auto-recover without breaking.',
    features: ['n8n advanced workflow automation', 'Claude & LLM tool-calling agents', 'Self-healing error interceptors & retries'],
    glow: 'bg-[#FFB7C5]/15',
  },
  {
    icon: Database,
    tag: 'Core System 02',
    title: 'Deterministic Database & Infrastructure',
    desc: 'Scalable PostgreSQL backends powered by Supabase with Row-Level Security, real-time subscriptions, and serverless Edge Functions deployed on Vercel.',
    features: ['Supabase & PostgreSQL architecture', 'Real-time database triggers & webhooks', 'Secure Row-Level Security (RLS) policies'],
    glow: 'bg-[#E6A0B0]/15',
  },
  {
    icon: Bot,
    tag: 'Core System 03',
    title: 'AI Inbound & Sales Qualification',
    desc: '24/7 intelligent SDR agents that converse across WhatsApp, Email, and social inboxes to qualify incoming business leads and schedule calendar appointments.',
    features: ['24/7 WhatsApp & Email conversational AI', 'Instant lead scoring & qualification', 'Two-way CRM calendar sync'],
    glow: 'bg-[#FFB7C5]/12',
  },
  {
    icon: Box,
    tag: 'Core System 04',
    title: '3D CGI & High-End Brand Assets',
    desc: 'Interactive 3D digital infrastructure, WebGL particle visualizers, and Hollywood-grade generative AI media that elevate enterprise digital presence.',
    features: ['Interactive 3D web applications', 'CGI product motion & commercial rendering', 'Cinematic brand asset pipelines'],
    glow: 'bg-[#E6A0B0]/12',
  },
];

export const AboutSection = () => {
  return (
    <section id="about" className="relative z-10 bg-[#050304]/92 backdrop-blur-xl border-t border-[#FFB7C5]/12 py-32 overflow-hidden">
      {/* Background rose radial glow */}
      <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[600px] w-[800px] rounded-full bg-[#FFB7C5]/06 blur-[180px]" />

      <div className="relative z-10 mx-auto max-w-6xl px-6 md:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 rounded-full border border-[#FFB7C5]/22 bg-[#FFB7C5]/07 px-4 py-1.5 text-xs font-mono text-[#FFB7C5] uppercase tracking-widest backdrop-blur-md"
          >
            Engineering Systems
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mt-5 font-display text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#FDF8F9]"
          >
            The 4 Core Engineering Systems That Run{' '}
            <span className="text-gradient-ai italic">Your Operations</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-4 text-base sm:text-lg text-[#B89EA5] leading-relaxed tracking-wide"
          >
            We eliminate repetitive manual work by engineering deterministic AI systems, automated databases, and autonomous lead pipelines that operate 24/7 without fail.
          </motion.p>
        </div>

        {/* 4 Pillars Grid */}
        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-2">
          {pillars.map((pillar, i) => (
            <motion.div
              key={pillar.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6, delay: i * 0.12 }}
            >
              <Card3DTilt intensity={10} className="h-full p-8 border border-[#FFB7C5]/12 bg-[#0F0B0D]/70 hover:border-[#FFB7C5]/28 transition-all">
                {/* Gradient Accent Flare */}
                <div className={`pointer-events-none absolute -top-20 -right-20 h-44 w-44 rounded-full ${pillar.glow} blur-2xl opacity-70`} />

                <div className="relative z-10 flex flex-col h-full justify-between">
                  <div>
                    <div className="flex items-center justify-between">
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#FFB7C5]/08 border border-[#FFB7C5]/18">
                        <pillar.icon className="h-6 w-6 text-[#FFB7C5]" />
                      </div>
                      <span className="text-xs font-mono text-[#B89EA5] uppercase tracking-wider">{pillar.tag}</span>
                    </div>

                    <h3 className="mt-6 font-display text-xl sm:text-2xl font-bold text-[#FDF8F9] tracking-tight">
                      {pillar.title}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-[#B89EA5]">{pillar.desc}</p>
                  </div>

                  <div className="mt-8 border-t border-[#FFB7C5]/10 pt-5">
                    <ul className="space-y-2">
                      {pillar.features.map((feat) => (
                        <li key={feat} className="flex items-center gap-2 text-xs text-[#E2C2C9]">
                          <ArrowUpRight className="h-3.5 w-3.5 text-[#FFB7C5] shrink-0" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </Card3DTilt>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
