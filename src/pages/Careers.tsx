
import { Link } from 'react-router-dom';

const Icons = {
    Zap: () => (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" /></svg>
    ),
    ArrowLeft: () => (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m12 19-7-7 7-7" /><path d="M19 12H5" /></svg>
    ),
    Tech: () => (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
    ),
    Collaborate: () => (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg>
    ),
    Impact: () => (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" /></svg>
    )
};

const BorderBeam = ({ className = "" }: { className?: string }) => (
    <div className={`absolute inset-0 pointer-events-none ${className}`}>
        <div className="absolute inset-0 rounded-[inherit] border border-white/5 shadow-[0_0_15px_rgba(139,92,246,0.1)]" />
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-purple-500/50 to-transparent animate-border-beam" />
    </div>
);

const Careers = () => {
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
                        <span className="text-xs font-black uppercase tracking-wider text-slate-400">Careers</span>
                    </div>
                    <h1 className="text-5xl md:text-7xl font-black text-white mb-8 tracking-tighter">
                        Join Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-violet-400 to-indigo-500">Team</span>
                    </h1>
                    <p className="text-xl text-slate-400 max-w-3xl font-light leading-relaxed">
                        Help us build the next generation of autonomous intelligence. We're looking for high-performers ready to redefine modern work.
                    </p>
                </div>
            </section>

            {/* Why Join Us */}
            <section className="py-32 px-6 relative z-10">
                <div className="container mx-auto max-w-6xl">
                    <h2 className="text-4xl font-black text-white mb-16 text-center tracking-tight">Why AutomateLabs?</h2>
                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            { icon: Icons.Tech, title: "Cutting-Edge Tech", desc: "Work with the latest AI frameworks and automation engines to build systems that scale.", color: "purple" },
                            { icon: Icons.Collaborate, title: "Elite Collaboration", desc: "Join a concentrated team of engineers and designers who build world-class assets.", color: "violet" },
                            { icon: Icons.Impact, title: "Real Impact", desc: "Watch your code save thousands of manual hours and transform business bottom lines.", color: "indigo" }
                        ].map((item, i) => (
                            <div key={i} className="group relative bg-white/5 border border-white/10 rounded-2xl p-10 hover:-translate-y-2 transition-all duration-500">
                                <BorderBeam className="opacity-0 group-hover:opacity-100" />
                                <div className={`mb-8 flex h-16 w-16 items-center justify-center rounded-2xl bg-${item.color}-500/20 text-${item.color}-400 group-hover:bg-${item.color}-500 group-hover:text-white transition-all shadow-xl`}>
                                    <item.icon />
                                </div>
                                <h3 className="text-xl font-black text-white mb-4">{item.title}</h3>
                                <p className="text-slate-400 font-bold leading-relaxed text-sm">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Open Positions */}
            <section className="py-32 px-6 relative z-10 border-t border-white/5 bg-white/[0.02]">
                <div className="container mx-auto max-w-4xl">
                    <h2 className="text-4xl font-black text-white mb-4 text-center tracking-tight">Open Positions</h2>
                    <p className="text-center text-slate-400 mb-16 font-bold">We hunt for the rare 1% who build with purpose.</p>

                    <div className="relative group overflow-hidden rounded-3xl border border-white/10 bg-[#0a0118] p-12 text-center shadow-2xl">
                        <BorderBeam />
                        <div className="mb-8 inline-flex h-20 w-20 items-center justify-center rounded-full bg-purple-500/10 text-purple-400 shadow-[0_0_20px_rgba(168,85,247,0.2)]">
                            <Icons.Zap />
                        </div>
                        <h3 className="text-3xl font-black text-white mb-4">Join Our Talent Pool</h3>
                        <p className="text-slate-400 mb-10 font-bold leading-relaxed">
                            We're constantly growing. Even if you don't see a specific position, we'd love to hear from elite engineers, designers, and automation specialists.
                        </p>
                        <div className="space-y-4">
                            <p className="text-white font-black uppercase tracking-widest text-xs">Send resume & portfolio to</p>
                            <a href="mailto:atul.pandey0028@gmail.com" className="inline-block text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-500 hover:drop-shadow-[0_0_10px_rgba(168,85,247,0.5)] transition-all">
                                atul.pandey0028@gmail.com
                            </a>
                        </div>
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

export default Careers;
