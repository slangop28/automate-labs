import { useState } from 'react';
import { motion } from 'framer-motion';
import { Clock, TrendingUp, Users, Sparkles, Quote, Calculator, CheckCircle2 } from 'lucide-react';
import Card3DTilt from '../3d/Card3DTilt';

interface CaseStudy {
  brand: string;
  niche: string;
  quote: string;
  metrics: { label: string; value: string }[];
}

const caseStudies: CaseStudy[] = [
  {
    brand: 'Retail & E-Commerce Brand',
    niche: 'Order & Inventory Automation',
    quote: 'Orders used to be processed manually and inventory lived in spreadsheets. SmartVyapari automated the routing straight to fulfillment in minutes.',
    metrics: [
      { label: 'Hours Saved / Month', value: '500+' },
      { label: 'Processing Speed', value: '85% Faster' },
      { label: 'Shipping Errors', value: '0' },
    ],
  },
  {
    brand: 'B2B Sales Agency',
    niche: 'AI Lead Qualification & CRM',
    quote: 'Inbound leads were going cold over weekends. SmartVyapari deployed an AI agent that qualifies leads in 30 seconds and keeps our CRM 100% accurate.',
    metrics: [
      { label: 'Lead Conversion', value: '3x' },
      { label: 'Uptime & Availability', value: '24/7' },
      { label: 'Data Accuracy', value: '100%' },
    ],
  },
  {
    brand: 'Financial Services Firm',
    niche: 'Automated Reporting Pipeline',
    quote: 'Analysts used to spend days rebuilding weekly reports from raw exports. The automated pipeline pulls and cleans data unattended in 5 minutes.',
    metrics: [
      { label: 'Reporting Cost Reduction', value: '95%' },
      { label: 'Time to Full Report', value: '5 Min' },
      { label: 'Delivery Reliability', value: '100%' },
    ],
  },
];

export const ViralMetricsSection = () => {
  const [teamSize, setTeamSize] = useState<number>(8);

  const manualHoursSavedPerMonth      = (teamSize * 38).toLocaleString();
  const operationalCostReductionPerMonth = (teamSize * 38 * 800).toLocaleString('en-IN');
  const annualValueUnlocked           = (teamSize * 38 * 800 * 12).toLocaleString('en-IN');

  return (
    <section id="results" className="relative z-10 bg-[#050304]/92 backdrop-blur-xl border-t border-[#FFB7C5]/12 py-32 overflow-hidden">
      {/* Rose ambient glows */}
      <div className="pointer-events-none absolute top-1/3 right-10 h-96 w-96 rounded-full bg-[#FFB7C5]/07 blur-[150px]" />
      <div className="pointer-events-none absolute bottom-10 left-10 h-80 w-80 rounded-full bg-[#E6A0B0]/06 blur-[140px]" />

      <div className="relative z-10 mx-auto max-w-6xl px-6 md:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#FFB7C5]/22 bg-[#FFB7C5]/07 px-4 py-1.5 text-xs font-mono text-[#FFB7C5] uppercase tracking-widest backdrop-blur-md">
            Verified ROI & Impact
          </div>
          <h2 className="mt-4 font-display text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#FDF8F9]">
            Automation Impact &{' '}
            <span className="text-gradient-ai italic">Pipeline Simulator</span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#B89EA5] leading-relaxed tracking-wide">
            Eliminating repetitive work and transforming manual operations into self-healing, automated business engines.
          </p>
        </div>

        {/* Highlight Stats Strip */}
        <div className="mt-16 grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {[
            { icon: Clock,      label: 'Manual Hours Saved Monthly',    val: '18,500+' },
            { icon: TrendingUp, label: 'Average Cost Reduction',         val: '85%' },
            { icon: Users,      label: 'Automated Pipeline Executions',  val: '500K+' },
            { icon: Sparkles,   label: 'System Reliability Uptime',      val: '99.9%' },
          ].map((stat, idx) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="rounded-2xl border border-[#FFB7C5]/12 bg-[#0F0B0D]/70 p-6 text-center backdrop-blur-md"
            >
              <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-xl bg-[#FFB7C5]/10 text-[#FFB7C5] mb-3">
                <stat.icon className="h-5 w-5" />
              </div>
              <div className="font-display text-3xl sm:text-4xl font-bold text-[#FDF8F9] tracking-tight">{stat.val}</div>
              <div className="mt-1 text-xs text-[#B89EA5] font-medium">{stat.label}</div>
            </motion.div>
          ))}
        </div>

        {/* Interactive ROI Simulator */}
        <div className="mt-16">
          <Card3DTilt intensity={6} className="border border-[#FFB7C5]/15 bg-gradient-to-br from-[#0F0B0D]/95 to-[#0A0608]/95 p-8 md:p-10 backdrop-blur-2xl shadow-2xl">
            <div className="flex items-center gap-3 pb-6 border-b border-[#FFB7C5]/12">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#FFB7C5]/10 text-[#FFB7C5] border border-[#FFB7C5]/20">
                <Calculator className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-display text-xl font-bold text-[#FDF8F9]">Automation Impact & Pipeline Simulator</h3>
                <p className="text-xs text-[#B89EA5]">Calculate hours and operational overhead saved with automated AI architecture</p>
              </div>
            </div>

            <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_1fr] items-center">
              <div>
                <div className="flex justify-between items-center text-sm text-[#E2C2C9] mb-2">
                  <span>Team Members / Staff on Repetitive Workflows:</span>
                  <span className="font-mono text-[#FFB7C5] font-bold">{teamSize} People</span>
                </div>
                <input
                  type="range"
                  min="2"
                  max="60"
                  step="1"
                  value={teamSize}
                  onChange={(e) => setTeamSize(Number(e.target.value))}
                  className="w-full h-2.5 bg-[#0F0B0D] rounded-lg appearance-none cursor-pointer accent-[#FFB7C5]"
                />
                <div className="flex justify-between text-[11px] text-[#B89EA5] font-mono mt-1">
                  <span>2 (Small Team)</span>
                  <span>25 (Growing Org)</span>
                  <span>60+ (Enterprise)</span>
                </div>

                <div className="mt-6 text-xs text-[#B89EA5] leading-relaxed bg-[#FFB7C5]/04 p-4 rounded-xl border border-[#FFB7C5]/10 space-y-2">
                  <div className="flex items-center gap-2 text-[#E2C2C9]">
                    <CheckCircle2 className="h-4 w-4 text-[#FFB7C5]" />
                    <span>Average 38 hours recovered per employee monthly</span>
                  </div>
                  <div className="flex items-center gap-2 text-[#E2C2C9]">
                    <CheckCircle2 className="h-4 w-4 text-[#FFB7C5]" />
                    <span>Zero manual human error in critical data pipelines</span>
                  </div>
                </div>
              </div>

              {/* Simulation Output Cards */}
              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-xl border border-[#FFB7C5]/12 bg-black/50 p-4">
                  <div className="text-xs text-[#B89EA5]">Manual Hours Saved / Month</div>
                  <div className="mt-1 font-display text-2xl font-bold text-[#FFB7C5]">~{manualHoursSavedPerMonth} hrs</div>
                  <div className="text-[10px] text-[#B89EA5] mt-1">Recovered for high-value tasks</div>
                </div>

                <div className="rounded-xl border border-[#FFB7C5]/12 bg-black/50 p-4">
                  <div className="text-xs text-[#B89EA5]">Monthly Cost Reduction</div>
                  <div className="mt-1 font-display text-2xl font-bold text-[#E6A0B0] font-mono">₹{operationalCostReductionPerMonth}</div>
                  <div className="text-[10px] text-[#B89EA5] mt-1">Operational overhead saved</div>
                </div>

                <div className="col-span-2 rounded-xl border border-[#FFB7C5]/20 bg-[#FFB7C5]/06 p-4 flex items-center justify-between">
                  <div>
                    <div className="text-xs text-[#FFB7C5]">Est. Annual Value Unlocked</div>
                    <div className="font-display text-xl sm:text-2xl font-bold text-[#FDF8F9] font-mono">₹{annualValueUnlocked} / year</div>
                  </div>
                  <a
                    href="#contact"
                    className="rounded-full bg-gradient-to-r from-[#FFB7C5] to-[#E6A0B0] px-5 py-2 text-xs font-bold text-[#050304] hover:shadow-glow-sm transition-all hover:scale-105"
                  >
                    Deploy AI Architecture
                  </a>
                </div>
              </div>
            </div>
          </Card3DTilt>
        </div>

        {/* Case Studies Grid */}
        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {caseStudies.map((study, idx) => (
            <motion.div
              key={study.brand}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.12 }}
            >
              <Card3DTilt intensity={8} className="h-full border border-[#FFB7C5]/12 bg-[#0F0B0D]/70 p-6 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between pb-3 border-b border-[#FFB7C5]/10">
                    <div>
                      <div className="font-display font-bold text-[#FDF8F9] text-base">{study.brand}</div>
                      <div className="text-xs text-[#B89EA5]">{study.niche}</div>
                    </div>
                    <Quote className="h-5 w-5 text-[#FFB7C5] opacity-60" />
                  </div>
                  <p className="mt-4 text-xs text-[#E2C2C9] leading-relaxed italic">
                    "{study.quote}"
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-[#FFB7C5]/10 grid grid-cols-3 gap-2 text-center">
                  {study.metrics.map((m) => (
                    <div key={m.label} className="bg-[#FFB7C5]/04 p-2 rounded-lg border border-[#FFB7C5]/10">
                      <div className="font-display text-sm sm:text-base font-bold text-gradient-ai">{m.value}</div>
                      <div className="text-[9px] text-[#B89EA5] font-mono mt-0.5 leading-tight">{m.label}</div>
                    </div>
                  ))}
                </div>
              </Card3DTilt>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ViralMetricsSection;
