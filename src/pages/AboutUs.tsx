
import { Link } from 'react-router-dom';

const Icons = {
    Zap: () => (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" /></svg>
    ),
    ArrowLeft: () => (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m12 19-7-7 7-7" /><path d="M19 12H5" /></svg>
    ),
    Analysis: () => (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21.21 15.89A10 10 0 1 1 8 2.83" /><path d="M22 12A10 10 0 0 0 12 2v10z" /></svg>
    ),
    Custom: () => (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" /></svg>
    ),
    Growth: () => (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18" /><polyline points="17 6 23 6 23 12" /></svg>
    )
};

const BorderBeam = ({ className = "" }: { className?: string }) => (
    <div className={`absolute inset-0 pointer-events-none ${className}`}>
        <div className="absolute inset-0 rounded-[inherit] border border-white/5 shadow-[0_0_15px_rgba(139,92,246,0.1)]" />
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-purple-500/50 to-transparent animate-border-beam" />
    </div>
);

const AboutUs = () => {
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
                        <span className="text-xs font-black uppercase tracking-wider text-slate-400">Our Story</span>
                    </div>
                    <h1 className="text-5xl md:text-7xl font-black text-white mb-8 tracking-tighter">
                        About <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-violet-400 to-indigo-500">AutomateLabs</span>
                    </h1>
                    <p className="text-xl text-slate-400 max-w-3xl font-light leading-relaxed">
                        We build intelligent systems that bridge the gap between human creativity and operational scale.
                    </p>
                </div>
            </section>

            {/* Mission Section */}
            <section className="py-32 px-6 border-b border-white/5 relative z-10">
                <div className="container mx-auto max-w-6xl">
                    <div className="grid md:grid-cols-2 gap-16 items-center">
                        <div className="space-y-8">
                            <h2 className="text-4xl font-black text-white tracking-tight">Our Mission</h2>
                            <p className="text-lg text-slate-400 leading-relaxed font-bold">
                                At AutomateLabs, we believe that repetitive tasks shouldn't consume valuable human time. Our mission is to empower businesses with intelligent automation that works 24/7, allowing teams to focus on what truly matters—innovation and growth.
                            </p>
                            <p className="text-lg text-slate-400 leading-relaxed">
                                We don't just build software; we architect strategic automation systems that solve real business problems and deliver measurable results.
                            </p>
                        </div>
                        <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-12 backdrop-blur-sm">
                            <BorderBeam />
                            <div className="space-y-12">
                                <div>
                                    <div className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-violet-500 mb-2 tracking-tighter">500+</div>
                                    <div className="text-slate-400 font-black uppercase tracking-widest text-xs">Hours Saved Monthly</div>
                                </div>
                                <div>
                                    <div className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-indigo-500 mb-2 tracking-tighter">85%</div>
                                    <div className="text-slate-400 font-black uppercase tracking-widest text-xs">Cost Reduction</div>
                                </div>
                                <div>
                                    <div className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-500 mb-2 tracking-tighter">24/7</div>
                                    <div className="text-slate-400 font-black uppercase tracking-widest text-xs">Intelligent Runtime</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Our Approach */}
            <section className="py-32 px-6 relative z-10">
                <div className="container mx-auto max-w-6xl text-center">
                    <h2 className="text-4xl font-black text-white mb-16 tracking-tight">Our Approach</h2>
                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            { icon: Icons.Analysis, title: "Deep Analysis", desc: "We thoroughly analyze your workflows to identify the highest-impact automation opportunities.", color: "purple" },
                            { icon: Icons.Custom, title: "Custom Solutions", desc: "Every automation is tailored to your specific business needs—no cookie-cutter solutions.", color: "violet" },
                            { icon: Icons.Growth, title: "Continuous Improvement", desc: "We monitor performance and iterate to ensure your ROI keeps climbing over time.", color: "indigo" }
                        ].map((item, i) => (
                            <div key={i} className="group relative bg-white/5 border border-white/10 rounded-2xl p-10 hover:-translate-y-2 transition-all duration-500">
                                <BorderBeam className="opacity-0 group-hover:opacity-100" />
                                <div className={`mx-auto mb-8 flex h-16 w-16 items-center justify-center rounded-2xl bg-${item.color}-500/20 text-${item.color}-400 group-hover:bg-${item.color}-500 group-hover:text-white transition-all shadow-[0_0_20px_rgba(0,0,0,0.3)]`}>
                                    <item.icon />
                                </div>
                                <h3 className="text-xl font-black text-white mb-4">{item.title}</h3>
                                <p className="text-slate-400 font-bold leading-relaxed text-sm">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

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

export default AboutUs;
