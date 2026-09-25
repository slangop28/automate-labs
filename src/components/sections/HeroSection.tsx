import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, ChevronDown, CheckCircle2 } from 'lucide-react';

export const HeroSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  // Scroll-driven parallax: text fades and rises as user scrolls
  const heroOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);
  const heroY      = useTransform(scrollYProgress, [0, 0.3], [0, -80]);

  // Video also slowly drifts up for parallax depth
  const videoY = useTransform(scrollYProgress, [0, 1], ['0%', '20%']);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen overflow-hidden bg-[#050304]"
    >
      {/* ── 1. Fixed Full-Screen Video Background ── */}
      <div className="fixed inset-0 w-full h-screen z-0 overflow-hidden pointer-events-none">
        <motion.video
          src="/assets/hero-3d-loop.mp4"
          autoPlay
          loop
          muted
          playsInline
          style={{ y: videoY }}
          className="w-full h-full object-cover opacity-85 scale-105"
        />

        {/* Radial vignette: text legibility over face/petals */}
        <div className="absolute inset-0 bg-radial-vignette from-black/60 via-black/30 to-transparent pointer-events-none z-0" />

        {/* Soft bottom + top gradient fades */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#050304]/75 via-transparent to-[#050304]/92" />

        {/* Warm rose ambient glow orb */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[500px] w-[700px] rounded-full bg-[#FFB7C5]/10 blur-[160px]" />
        <div className="absolute bottom-0 left-1/4 h-72 w-72 rounded-full bg-[#E6A0B0]/08 blur-[120px]" />
      </div>

      {/* ── 2. Cinematic Centered Typography Overlay ── */}
      <motion.div
        style={{ opacity: heroOpacity, y: heroY }}
        className="relative z-10 flex flex-col items-center justify-center min-h-screen text-center px-6 pt-24 pb-16"
      >
        {/* Subtle Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2.5 rounded-full border border-[#FFB7C5]/25 bg-[#FFB7C5]/08 px-5 py-2 backdrop-blur-md mb-8"
        >
          <span className="flex h-2 w-2 rounded-full bg-[#FFB7C5] animate-pulse" />
          <span className="text-xs font-semibold tracking-widest text-[#FFB7C5] uppercase font-mono">
            Next-Gen AI Systems & Enterprise Scaling
          </span>
        </motion.div>

        {/* Rephrased Main Headline with Luxury Editorial Serif */}
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 1, ease: 'easeOut' }}
          className="text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem] font-light leading-[1.08] tracking-tight text-[#FDF8F9] font-display max-w-5xl"
        >
          Helping businesses &{' '}
          <span className="font-serif italic font-normal text-gradient-ai">
            creators scale faster.
          </span>
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 1, ease: 'easeOut' }}
          className="mt-7 text-lg md:text-xl text-[#B89EA5] max-w-2xl leading-relaxed tracking-wide font-body"
        >
          We engineer self-healing AI agents, deterministic workflow automations,
          and high-converting 3D digital infrastructure for modern enterprises
          and ambitious creators.
        </motion.p>

        {/* CTAs — Independent, perfectly spaced */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.65, duration: 1, ease: 'easeOut' }}
          className="mt-10 flex flex-wrap items-center justify-center gap-4"
        >
          {/* Primary CTA */}
          <a
            href="#contact"
            className="group relative inline-flex items-center gap-2.5 overflow-hidden rounded-full bg-gradient-to-r from-[#FFB7C5] via-[#E6A0B0] to-[#FDF8F9] p-[1px] shadow-glow-md transition-all duration-300 hover:scale-105 active:scale-95"
          >
            <div className="flex items-center gap-2 rounded-full bg-[#050304]/92 px-7 py-3.5 text-sm font-semibold text-[#FDF8F9] transition-colors group-hover:bg-transparent group-hover:text-[#050304]">
              <span>Deploy AI Workflows</span>
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </div>
          </a>

          {/* Secondary CTA */}
          <a
            href="#ecosystem"
            className="inline-flex items-center gap-2 rounded-full border border-[#FFB7C5]/20 bg-[#FFB7C5]/05 px-6 py-3.5 text-sm font-semibold text-[#E2C2C9] backdrop-blur-md transition-all duration-300 hover:bg-[#FFB7C5]/12 hover:text-[#FDF8F9] hover:border-[#FFB7C5]/40"
          >
            <span>Explore Ecosystem</span>
          </a>
        </motion.div>

        {/* Trust Markers */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.85 }}
          className="mt-12 flex flex-wrap items-center justify-center gap-6 text-xs text-[#B89EA5] font-medium tracking-wide"
        >
          <span className="flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 text-[#FFB7C5]" /> Deterministic n8n & Supabase Pipelines
          </span>
          <span className="flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 text-[#FFB7C5]" /> 24/7 Autonomous AI Inbound
          </span>
          <span className="flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 text-[#FFB7C5]" /> Self-Healing Error Recovery
          </span>
        </motion.div>

        {/* ── Bouncing Scroll Indicator ── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="absolute bottom-6 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
          >
            <ChevronDown className="w-5 h-5 text-[#B89EA5]" />
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Spacer so page scrolls past hero */}
      <div className="h-screen" />
    </section>
  );
};

export default HeroSection;
