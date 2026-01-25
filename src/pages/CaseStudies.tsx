
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

// Re-using common components/icons for consistency
const Icons = {
    Zap: () => (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" /></svg>
    ),
    ArrowLeft: () => (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m12 19-7-7 7-7" /><path d="M19 12H5" /></svg>
    ),
    Download: () => (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" /></svg>
    )
};

interface CaseStudy {
    title: string;
    description: string;
    file: string;
    metrics: string[];
}

const BorderBeam = ({ className = "" }: { className?: string }) => (
    <div className={`absolute inset-0 pointer-events-none ${className}`}>
        <div className="absolute inset-0 rounded-[inherit] border border-white/5 shadow-[0_0_15px_rgba(139,92,246,0.1)]" />
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-purple-500/50 to-transparent animate-border-beam" />
    </div>
);

const CaseStudies = () => {
    const caseStudies: CaseStudy[] = [
        {
            title: "AutomateLabs - General Overview",
            description: "Comprehensive overview of our intelligent automation solutions and how we transform business operations with AI-powered systems.",
            file: "/case-studies/AutomateLabs - General Overview.pptx",
            metrics: ["Complete solution overview", "AI & Automation expertise", "24/7 intelligent agents"]
        },
        {
            title: "AutomateLabs for Influencers",
            description: "Specialized automation solutions for influencers to streamline content creation, engagement tracking, and brand partnerships.",
            file: "/case-studies/AutomateLabs for Influencers.pptx",
            metrics: ["Content automation", "Engagement tracking", "Partnership management"]
        },
        {
            title: "AutomateLabs for Scaled Influencers & Businesses",
            description: "Enterprise-grade automation for scaled influencers and businesses managing multiple workflows, teams, and revenue streams.",
            file: "/case-studies/AutomateLabs for scaled influencers and Businesses.pptx",
            metrics: ["Multi-workflow automation", "Team collaboration", "Revenue optimization"]
        },
        {
            title: "E-Commerce Automation",
            description: "Automated order processing and inventory management for a retail company, reducing processing time by 85%.",
            file: "/case-studies/ecommerce-automation.pptx",
            metrics: ["500+ hours saved/month", "85% faster processing", "Zero errors"]
        },
        {
            title: "CRM Integration & AI Agents",
            description: "Intelligent AI agents that automatically qualify leads, update CRM, and schedule follow-ups 24/7.",
            file: "/case-studies/crm-integration.pptx",
            metrics: ["3x lead conversion", "24/7 availability", "100% data accuracy"]
        },
        {
            title: "Data Processing Automation",
            description: "Automated data extraction and reporting for a financial services firm, eliminating manual spreadsheet work.",
            file: "/case-studies/data-processing.pptx",
            metrics: ["Weekly reports in 5 min", "95% cost reduction", "Real-time insights"]
        }
    ];

    return (
        <div className="min-h-screen bg-[#0a0118] text-slate-300 selection:bg-purple-900/30">
            {/* Background elements */}
            <div className="fixed inset-0 pointer-events-none overflow-hidden">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-purple-900/10 blur-[120px]"></div>
                <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-indigo-900/5 blur-[150px]"></div>
            </div>

            {/* Hero Section */}
            <section className="relative pt-32 pb-20 px-6 border-b border-white/5">
                <div className="container mx-auto max-w-6xl relative z-10">
                    <Link to="/" className="inline-flex items-center gap-2 text-slate-400 hover:text-white mb-10 transition-all font-black uppercase tracking-tighter text-sm group">
                        <span className="group-hover:-translate-x-1 transition-transform"><Icons.ArrowLeft /></span>
                        Back to Home
                    </Link>
                    <div className="mb-6 inline-flex items-center rounded-full border border-white/5 bg-white/5 px-4 py-1.5 backdrop-blur-md">
                        <span className="flex h-2 w-2 rounded-full bg-purple-500 animate-pulse mr-2"></span>
                        <span className="text-xs font-black uppercase tracking-wider text-slate-400">Our Impact</span>
                    </div>
                    <h1 className="text-5xl md:text-7xl font-black text-white mb-8 tracking-tighter">
                        Case <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-violet-400 to-indigo-500">Studies</span>
                    </h1>
                    <p className="text-xl text-slate-400 max-w-3xl font-light leading-relaxed">
                        Discover how we bridge the gap between complex manual tasks and fluid, autonomous intelligence through custom engineering.
                    </p>
                </div>
            </section>

            {/* Case Studies Grid */}
            <section className="py-24 px-6 relative z-10">
                <div className="container mx-auto max-w-6xl">
                    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                        {caseStudies.map((study, index) => (
                            <div key={index} className="group relative bg-white/[0.03] border border-white/10 rounded-2xl p-8 hover:-translate-y-2 transition-all duration-500 backdrop-blur-sm flex flex-col justify-between overflow-hidden text-center md:text-left">
                                <BorderBeam className="opacity-0 group-hover:opacity-100" />
                                <div>
                                    <h3 className="text-2xl font-black text-white mb-4 group-hover:text-purple-400 transition-colors drop-shadow-[0_0_8px_rgba(168,85,247,0.2)]">{study.title}</h3>
                                    <p className="text-slate-400 mb-8 font-bold text-sm leading-relaxed">{study.description}</p>

                                    <div className="flex flex-wrap gap-2 mb-8 justify-center md:justify-start">
                                        {study.metrics.map((metric, idx) => (
                                            <span key={idx} className="text-[10px] bg-purple-900/30 text-purple-200 border border-purple-500/20 px-3 py-1 rounded-full font-black uppercase tracking-widest">
                                                {metric}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                <a
                                    href={study.file}
                                    download
                                    className="group/btn relative overflow-hidden inline-flex items-center justify-center gap-3 bg-white text-black px-6 py-4 rounded-xl font-black transition-all hover:bg-slate-200 hover:shadow-[0_0_30px_rgba(255,255,255,0.2)] active:scale-95"
                                >
                                    <Icons.Download />
                                    Download PPTX
                                </a>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Footer with branding */}
            <footer className="py-20 border-t border-white/5 bg-[#0a0118]/50">
                <div className="container mx-auto px-6 text-center">
                    <div className="flex items-center justify-center gap-2 mb-8">
                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/10 text-white"><Icons.Zap /></div>
                        <span className="text-xl font-black tracking-wider text-white">AutomateLabs</span>
                    </div>
                    <div className="text-xs font-black text-slate-600 lowercase tracking-widest leading-relaxed opacity-50">
                        © {new Date().getFullYear()} AutomateLabs.in • built with intelligent systems
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default CaseStudies;
