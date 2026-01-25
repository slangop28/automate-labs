
import { Link } from 'react-router-dom';

const Icons = {
    Zap: () => (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" /></svg>
    ),
    ArrowLeft: () => (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m12 19-7-7 7-7" /><path d="M19 12H5" /></svg>
    )
};

const PrivacyPolicy = () => {
    return (
        <div className="min-h-screen bg-[#0a0118] text-slate-300 selection:bg-purple-900/30">
            {/* Background elements */}
            <div className="fixed inset-0 pointer-events-none overflow-hidden">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-purple-900/5 blur-[120px]"></div>
                <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-indigo-900/5 blur-[150px]"></div>
            </div>

            {/* Header */}
            <section className="relative pt-32 pb-20 px-6 border-b border-white/5">
                <div className="container mx-auto max-w-4xl relative z-10">
                    <Link to="/" className="inline-flex items-center gap-2 text-slate-400 hover:text-white mb-10 transition-all font-black uppercase tracking-tighter text-sm group">
                        <span className="group-hover:-translate-x-1 transition-transform"><Icons.ArrowLeft /></span>
                        Back to Home
                    </Link>
                    <h1 className="text-4xl md:text-5xl font-black text-white mb-4 tracking-tighter">Privacy Policy</h1>
                    <p className="text-slate-500 font-bold uppercase tracking-widest text-xs">Last updated: January 26, 2026</p>
                </div>
            </section>

            {/* Content */}
            <section className="py-24 px-6 relative z-10">
                <div className="container mx-auto max-w-4xl">
                    <div className="space-y-12">

                        <div className="bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur-sm">
                            <h2 className="text-2xl font-black text-white mb-6 tracking-tight">1. Introduction</h2>
                            <p className="text-slate-400 leading-relaxed font-bold">
                                AutomateLabs ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our services.
                            </p>
                        </div>

                        <div>
                            <h2 className="text-2xl font-black text-white mb-6 tracking-tight">2. Information We Collect</h2>
                            <p className="mb-4">We collect information voluntarily provided to us when you interact with our platform:</p>
                            <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 my-8">
                                {[
                                    "Request callback/consultation",
                                    "Book a free audit",
                                    "Newsletter subscription",
                                    "Form interactions"
                                ].map((item, i) => (
                                    <li key={i} className="bg-white/5 border border-white/5 p-4 rounded-xl flex items-center gap-3">
                                        <span className="h-1.5 w-1.5 rounded-full bg-purple-500"></span>
                                        <span className="text-sm font-bold text-slate-300">{item}</span>
                                    </li>
                                ))}
                            </ul>
                            <div className="bg-purple-900/10 border border-purple-500/20 p-6 rounded-2xl">
                                <p className="text-sm font-black text-purple-200 uppercase tracking-widest mb-4">Collected Data Types:</p>
                                <p className="text-slate-400 text-sm leading-relaxed">Name, Email address, Phone number, Company details, and specific business automation requirements.</p>
                            </div>
                        </div>

                        <div>
                            <h2 className="text-2xl font-black text-white mb-6 tracking-tight">3. How We Use Data</h2>
                            <p className="mb-6">We utilize your information to engineer better solutions:</p>
                            <div className="space-y-4">
                                {[
                                    "Respond to service inquiries",
                                    "Schedule strategic consultations",
                                    "Deliver automation insights via newsletter",
                                    "Compliance with legal standards"
                                ].map((item, i) => (
                                    <div key={i} className="flex items-start gap-4 p-4 rounded-xl hover:bg-white/5 transition-colors border border-transparent hover:border-white/5">
                                        <div className="text-purple-500 font-black">0{i + 1}</div>
                                        <div className="text-slate-300 font-bold">{item}</div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-8">
                            <div className="bg-white/5 border border-white/10 p-8 rounded-2xl">
                                <h2 className="text-xl font-black text-white mb-4">4. Security</h2>
                                <p className="text-sm text-slate-400 leading-relaxed font-bold">
                                    We implement premium technical measures including AES-256 encryption to protect your strategic business data.
                                </p>
                            </div>
                            <div className="bg-white/5 border border-white/10 p-8 rounded-2xl">
                                <h2 className="text-xl font-black text-white mb-4">5. Data Sharing</h2>
                                <p className="text-sm text-slate-400 leading-relaxed font-bold">
                                    We do not sell data. We only share information with critical service providers under strict NDAs or when legally required.
                                </p>
                            </div>
                        </div>

                        <div>
                            <h2 className="text-2xl font-black text-white mb-6 tracking-tight">6. Contact</h2>
                            <p className="text-slate-400 font-bold">
                                For data inquiries, reach out to our systems administrator via the main contact channels.
                            </p>
                        </div>

                    </div>
                </div>
            </section>

            <footer className="py-20 border-t border-white/5 bg-[#0a0118]/50 overflow-hidden relative">
                <div className="container mx-auto px-6 text-center relative z-10">
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

export default PrivacyPolicy;
