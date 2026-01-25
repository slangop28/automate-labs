
import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

// --- Types ---

interface ShimmerButtonProps {
    children: React.ReactNode;
    primary?: boolean;
    onClick?: () => void;
    disabled?: boolean;
    className?: string;
}

interface SectionHeadingProps {
    title: string;
    subtitle: string;
    center?: boolean;
}

interface Testimonial {
    quote: string;
    author: string;
    role: string;
    company: string;
    metric: string;
}

interface Service {
    icon: React.FC;
    title: string;
    desc: string;
    points: string[];
}

// --- Helper Functions ---

const submitToSupabase = async (table: string, data: any) => {
    const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
    const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

    try {
        const response = await fetch(`${supabaseUrl}/rest/v1/${table}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'apikey': supabaseKey,
                'Authorization': `Bearer ${supabaseKey}`,
                'Prefer': 'return=minimal'
            },
            body: JSON.stringify(data)
        });
        return response.ok;
    } catch (error) {
        console.error('Submission Error:', error);
        return false;
    }
};

// --- Icons ---
const Icons = {
    Menu: () => (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="4" y1="12" x2="20" y2="12" /><line x1="4" y1="6" x2="20" y2="6" /><line x1="4" y1="18" x2="20" y2="18" /></svg>
    ),
    X: () => (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>
    ),
    ArrowRight: () => (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg>
    ),
    ChevronDown: () => (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6" /></svg>
    ),
    Zap: () => (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" /></svg>
    ),
    Cpu: () => (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="4" y="4" width="16" height="16" rx="2" /><rect x="9" y="9" width="6" height="6" /><path d="M9 1h6" /><path d="M9 23h6" /><path d="M1 9v6" /><path d="M23 9v6" /></svg>
    ),
    Globe: () => (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><path d="M2 12h20" /><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" /></svg>
    ),
    ShieldCheck: () => (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" /><path d="m9 12 2 2 4-4" /></svg>
    ),
    Rocket: () => (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" /><path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" /><path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" /><path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" /></svg>
    ),
    CheckCircle: () => (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" /></svg>
    )
};

// --- Components ---

const ShimmerButton: React.FC<ShimmerButtonProps> = ({ children, primary = true, onClick, disabled, className = "" }) => (
    <button
        onClick={onClick}
        disabled={disabled}
        className={`group relative overflow-hidden rounded-lg px-8 py-4 font-bold transition-all hover:scale-105 active:scale-95 shadow-lg ${primary
            ? 'bg-gradient-to-r from-purple-900 to-violet-800 text-white hover:shadow-purple-900/40 hover:shadow-[0_0_20px_rgba(139,92,246,0.4)]'
            : 'bg-white/5 text-white border border-white/10 hover:bg-white/10 backdrop-blur-sm hover:shadow-[0_0_15px_rgba(255,255,255,0.1)]'
            } ${disabled ? 'opacity-50 cursor-not-allowed grayscale' : ''} ${className}`}
    >
        <div className={`absolute inset-0 -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent ${primary ? 'via-white/20' : 'via-purple-400/10'} to-transparent`} />
        <span className="flex items-center gap-2 relative z-10">{children}</span>
    </button>
);

const SectionHeading: React.FC<SectionHeadingProps> = ({ title, subtitle, center = true }) => (
    <div className={`mb-16 ${center ? 'text-center' : 'text-left'}`}>
        <h2 className="mb-4 text-4xl font-extrabold tracking-tight text-white md:text-5xl drop-shadow-[0_0_15px_rgba(139,92,246,0.2)]">
            {title}
        </h2>
        <p className="mx-auto max-w-2xl text-lg text-slate-400 leading-relaxed font-light">{subtitle}</p>
    </div>
);

const DoorAnimation = () => {
    const [open, setOpen] = useState(false);
    const [removed, setRemoved] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => setOpen(true), 100);
        const removeTimer = setTimeout(() => setRemoved(true), 1600);
        return () => { clearTimeout(timer); clearTimeout(removeTimer); };
    }, []);

    if (removed) return null;

    return (
        <div className="fixed inset-0 z-[500] flex pointer-events-none overflow-hidden">
            <div className={`w-1/2 h-full bg-[#0a0118] transition-transform duration-[1500ms] ease-expo ${open ? '-translate-x-full' : 'translate-x-0'} border-r border-purple-500/20 shadow-[10px_0_50px_rgba(139,92,246,0.2)]`} />
            <div className={`w-1/2 h-full bg-[#0a0118] transition-transform duration-[1500ms] ease-expo ${open ? 'translate-x-full' : 'translate-x-0'} border-l border-purple-500/20 shadow-[-10px_0_50px_rgba(139,92,246,0.2)]`} />
            <div className={`absolute inset-0 flex items-center justify-center transition-opacity duration-1000 ${open ? 'opacity-0' : 'opacity-100'}`}>
                <div className="flex flex-col items-center gap-4">
                    <div className="text-purple-500 animate-pulse"><Icons.Zap /></div>
                    <span className="text-2xl font-black tracking-widest text-white uppercase opacity-50">AutomateLabs.in</span>
                </div>
            </div>
        </div>
    );
};

const InteractionLayer = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const particles = useRef<any[]>([]);
    const mouse = useRef({ x: 0, y: 0, active: false });

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };

        const createParticle = (x: number, y: number, isSplash = false) => {
            const count = isSplash ? 30 : 2;
            for (let i = 0; i < count; i++) {
                particles.current.push({
                    x, y,
                    vx: isSplash ? (Math.random() - 0.5) * 20 : (Math.random() - 0.5) * 3,
                    vy: isSplash ? (Math.random() - 0.5) * 20 : (Math.random() - 0.5) * 3,
                    life: 1.0,
                    decay: isSplash ? 0.015 : 0.04,
                    size: isSplash ? Math.random() * 6 + 3 : 12,
                    color: `hsl(${Math.random() * 360}, 100%, 80%)`
                });
            }
        };

        const draw = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            particles.current.forEach((p, i) => {
                p.x += p.vx;
                p.y += p.vy;
                p.life -= p.decay;
                if (p.life <= 0) {
                    particles.current.splice(i, 1);
                    return;
                }
                ctx.globalAlpha = p.life;
                ctx.shadowBlur = 25;
                ctx.shadowColor = p.color;
                ctx.fillStyle = p.color;
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.size * p.life, 0, Math.PI * 2);
                ctx.fill();
            });
            if (mouse.current.active) {
                createParticle(mouse.current.x, mouse.current.y);
            }
            requestAnimationFrame(draw);
        };

        const handleMove = (e: MouseEvent | TouchEvent) => {
            const pos = 'touches' in e ? e.touches[0] : (e as MouseEvent);
            mouse.current = { x: pos.clientX, y: pos.clientY, active: true };
        };

        const handleClick = (e: MouseEvent | TouchEvent) => {
            const pos = 'touches' in e ? e.touches[0] : (e as MouseEvent);
            createParticle(pos.clientX, pos.clientY, true);
        };

        window.addEventListener('resize', resize);
        window.addEventListener('mousemove', handleMove);
        window.addEventListener('mousedown', handleClick);
        window.addEventListener('touchstart', handleMove);
        resize();
        draw();

        return () => {
            window.removeEventListener('resize', resize);
            window.removeEventListener('mousemove', handleMove);
            window.removeEventListener('mousedown', handleClick);
            window.removeEventListener('touchstart', handleMove);
        };
    }, []);

    return <canvas ref={canvasRef} className="fixed inset-0 z-[100] pointer-events-none opacity-80 mix-blend-screen" />;
};

const AuroraBackground = () => (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-purple-900/20 blur-[120px] animate-pulse"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-indigo-900/10 blur-[150px]"></div>
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-soft-light"></div>
    </div>
);

const BorderBeam = ({ className = "" }: { className?: string }) => (
    <div className={`absolute inset-0 rounded-[inherit] pointer-events-none ${className}`}>
        <div className="absolute inset-0 rounded-[inherit] border border-white/5 shadow-[0_0_15px_rgba(139,92,246,0.1)]" />
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-purple-500/50 to-transparent animate-border-beam" />
    </div>
);

const SectionDivider = () => (
    <div className="relative h-px w-full overflow-hidden">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-purple-500/30 to-transparent"></div>
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-purple-400 to-transparent opacity-50 blur-sm animate-pulse"></div>
    </div>
);

const CallbackModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
    const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle');
    if (!isOpen) return null;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('loading');
        const form = e.target as HTMLFormElement;
        const formData = new FormData(form);
        const success = await submitToSupabase('callbacks', Object.fromEntries(formData.entries()));
        if (success) {
            setStatus('success');
            setTimeout(() => { onClose(); setStatus('idle'); }, 2000);
        } else {
            alert('Submission failed. Please try again.');
            setStatus('idle');
        }
    };

    return (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 backdrop-blur-sm bg-black/60">
            <div className="relative w-full max-w-md overflow-hidden rounded-2xl bg-[#0a0118] p-8 shadow-2xl border border-white/10 animate-[fadeIn_0.3s_ease-out]">
                <BorderBeam />
                <button onClick={onClose} className="absolute right-4 top-4 text-slate-500 hover:text-white"><Icons.X /></button>
                {status === 'success' ? (
                    <div className="text-center py-8">
                        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-purple-500/20 text-purple-400"><Icons.CheckCircle /></div>
                        <h3 className="text-2xl font-bold text-white">We'll call you soon!</h3>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <h2 className="text-3xl font-black text-white mb-2">Request Callback</h2>
                            <p className="text-slate-400 text-sm italic underline decoration-purple-500/30">Speak to an automation expert today.</p>
                        </div>
                        <div className="space-y-1">
                            <label className="text-xs font-black uppercase tracking-tighter text-slate-500">Name</label>
                            <input name="name" required className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-white focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all outline-none" placeholder="Enter your name" />
                        </div>
                        <div className="space-y-1">
                            <label className="text-xs font-black uppercase tracking-tighter text-slate-500">Phone Number</label>
                            <input name="phone" type="tel" required className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-white focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all outline-none" placeholder="+1 (555) 000-0000" />
                        </div>
                        <ShimmerButton primary className="w-full !py-4" disabled={status === 'loading'}>
                            {status === 'loading' ? 'Processing...' : 'Schedule Call'}
                        </ShimmerButton>
                    </form>
                )}
            </div>
        </div>
    );
};

const Navbar = ({ onRequestCallback }: { onRequestCallback: () => void }) => {
    const [scrolled, setScrolled] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <nav className={`fixed top-0 z-50 w-full transition-all duration-300 ${scrolled ? 'bg-[#0a0118]/80 py-4 backdrop-blur-md shadow-lg' : 'bg-transparent py-6'}`}>
            {scrolled && <div className="absolute bottom-0 left-0 h-px w-full bg-gradient-to-r from-transparent via-purple-500/50 to-transparent"></div>}
            <div className="container mx-auto flex items-center justify-between px-6">
                <div className="flex items-center gap-2 group cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/10 text-white shadow-[0_0_15px_rgba(255,255,255,0.2)] transition-all group-hover:scale-110 group-hover:shadow-[0_0_20px_rgba(139,92,246,0.6)]">
                        <Icons.Zap />
                    </div>
                    <span className="text-xl font-black tracking-wider text-white hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.8)] transition-all">AutomateLabs.in</span>
                </div>

                <div className="hidden md:flex items-center gap-8">
                    {['Services', 'Methodology', 'Results'].map((item) => (
                        <a key={item} href={`#${item.toLowerCase()}`} className="text-sm font-black text-slate-400 transition-all hover:text-white hover:drop-shadow-[0_0_8px_rgba(168,85,247,0.8)]">
                            {item}
                        </a>
                    ))}
                    <button onClick={onRequestCallback} className="rounded-md bg-white px-4 py-2 text-sm font-black text-black transition-all hover:bg-slate-200 hover:shadow-[0_0_20px_rgba(255,255,255,0.3)] active:scale-95">
                        Request Callback
                    </button>
                </div>

                <button className="block md:hidden text-white" onClick={() => setIsOpen(!isOpen)}>
                    {isOpen ? <Icons.X /> : <Icons.Menu />}
                </button>
            </div>

            {isOpen && (
                <div className="absolute top-full left-0 w-full bg-[#0a0118] border-b border-purple-500/20 p-6 md:hidden shadow-xl backdrop-blur-xl">
                    <div className="flex flex-col gap-4">
                        {['Services', 'Methodology', 'Results'].map((item) => (
                            <a key={item} href={`#${item.toLowerCase()}`} onClick={() => setIsOpen(false)} className="text-lg font-black text-white hover:text-purple-400">{item}</a>
                        ))}
                        <button onClick={() => { onRequestCallback(); setIsOpen(false); }} className="w-full rounded-md bg-white px-4 py-2 text-lg font-black text-black">Request Callback</button>
                    </div>
                </div>
            )}
        </nav>
    );
};

const HeroSection = ({ onOpenAudit }: { onOpenAudit: () => void }) => (
    <section className="relative h-screen flex flex-col justify-center items-center overflow-hidden" id="hero">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0118]/50 via-transparent to-[#0a0118] pointer-events-none"></div>
        <div className="relative z-10 flex flex-col items-center justify-center text-center px-4 animate-[fadeIn_1s_ease-out]">
            <div className="mb-8 inline-flex items-center rounded-full border border-white/5 bg-white/5 px-4 py-1.5 shadow-2xl backdrop-blur-md">
                <span className="flex h-2 w-2 rounded-full bg-purple-500 animate-pulse mr-2 shadow-[0_0_10px_#a855f7]"></span>
                <span className="text-xs font-black uppercase tracking-wider text-slate-400">Intelligent Automation Systems</span>
            </div>
            <h1 className="mb-6 max-w-5xl text-6xl font-black tracking-tight text-white md:text-8xl leading-tight">
                Turn Chaos Into <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-violet-400 to-indigo-500 animate-gradient drop-shadow-[0_0_30px_rgba(168,85,247,0.4)]">Clarity.</span>
            </h1>
            <p className="mb-12 max-w-2xl text-xl text-slate-400 leading-relaxed font-light">
                We engineer sophisticated AI automations and custom SaaS solutions that streamline workflows and eliminate inefficiencies.
            </p>
            <div className="flex flex-col gap-6 sm:flex-row mt-4">
                <ShimmerButton onClick={onOpenAudit} className="!bg-purple-700 !text-white hover:!bg-purple-600 shadow-[0_0_30px_rgba(124,58,237,0.4)]">
                    Book Free Audit <Icons.ArrowRight />
                </ShimmerButton>
                <Link to="/case-studies">
                    <ShimmerButton primary={false} className="!bg-white/5 !text-white !border-white/10 hover:!bg-white/10 backdrop-blur-sm">See Case Studies</ShimmerButton>
                </Link>
            </div>
        </div>
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
            <div className="flex flex-col items-center gap-2 text-slate-500">
                <span className="text-xs uppercase tracking-widest font-black">Scroll to Explore</span>
                <Icons.ChevronDown />
            </div>
        </div>
    </section>
);

const MetricsSection = () => {
    const stats = [
        { value: "500+", label: "Hours Saved Monthly" },
        { value: "85%", label: "Operational Cost Reduction" },
        { value: "3x", label: "Faster Deployment Time" },
        { value: "100%", label: "Client Satisfaction" }
    ];

    return (
        <section className="relative backdrop-blur-sm bg-white/[0.02]">
            <SectionDivider />
            <div className="container mx-auto px-6 py-24">
                <div className="grid grid-cols-2 gap-12 md:grid-cols-4">
                    {stats.map((stat, i) => (
                        <div key={i} className="group text-center">
                            <div className="mb-2 text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-violet-400 to-indigo-500 sm:text-6xl md:text-7xl tracking-tighter group-hover:-translate-y-2 transition-transform duration-300 drop-shadow-[0_0_15px_rgba(139,92,246,0.5)]">
                                {stat.value}
                            </div>
                            <div className="text-sm font-black uppercase tracking-widest text-white transition-colors group-hover:text-purple-400">
                                {stat.label}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

const FeaturesSection = () => {
    const services: Service[] = [
        {
            icon: Icons.Cpu,
            title: "Intelligent AI Automations",
            desc: "Transform manual bottlenecks into self-driving workflows. We implement autonomous agents that work 24/7.",
            points: ["Workflow Analysis & Optimization", "Custom AI Agent Development", "Seamless API Integrations"]
        },
        {
            icon: Icons.ShieldCheck,
            title: "Custom SaaS Solutions",
            desc: "Stop settling for off-the-shelf limitations. We architect secure, cloud-native software tailored perfectly.",
            points: ["Enterprise-Grade Security", "Scalable Cloud Architecture", "Multi-Tenant Systems"]
        },
        {
            icon: Icons.Rocket,
            title: "High-Performance Web & Mobile",
            desc: "Capture your audience instantly. We build lightning-fast, SEO-optimized digital experiences.",
            points: ["Sub-second Load Times", "Conversion Rate Optimization", "Progressive Web Apps (PWA)"]
        }
    ];

    return (
        <section id="services" className="relative bg-[#0a0118]">
            <SectionDivider />
            <div className="container mx-auto px-6 py-32">
                <SectionHeading title="Engineered for Impact" subtitle="We build strategic assets that solve real business problems." />
                <div className="grid gap-8 md:grid-cols-3">
                    {services.map((service, i) => (
                        <div key={i} className="group relative rounded-2xl bg-white/5 p-8 transition-all duration-300 hover:-translate-y-2 border border-white/10 backdrop-blur-sm overflow-hidden text-center">
                            <BorderBeam className="opacity-0 group-hover:opacity-100" />
                            <div className="mb-6 mx-auto inline-flex h-14 w-14 items-center justify-center rounded-xl bg-white/5 text-slate-300 group-hover:bg-purple-600 group-hover:text-white group-hover:shadow-[0_0_20px_rgba(168,85,247,0.4)] transition-all">
                                <service.icon />
                            </div>
                            <h3 className="mb-4 text-2xl font-black text-white">{service.title}</h3>
                            <p className="mb-8 text-slate-400 font-light text-sm">{service.desc}</p>
                            <ul className="space-y-3 text-left">
                                {service.points.map((point, idx) => (
                                    <li key={idx} className="flex items-center gap-3 text-xs text-slate-400 font-bold">
                                        <span className="text-purple-400"><Icons.CheckCircle /></span> {point}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

const TestimonialsSection = () => {
    const [active, setActive] = useState(0);
    const testimonials: Testimonial[] = [
        { quote: "AutomateLabs revolutionized how we handle logistics. What took 4 people a week is now done automatically in 30 mins.", author: "Sarah Jenkins", role: "COO", company: "LogiTech Global", metric: "500+ Hours Saved / Month" },
        { quote: "The custom SaaS platform allowed us to scale from 100 to 10,000 users without a hiccup. World-class architecture.", author: "David Chen", role: "CTO", company: "FinStream", metric: "100x User Scaling" },
        { quote: "Our conversion rate doubled within a month. Truly premium work.", author: "Elena Rodriguez", role: "Marketing Director", company: "LuxRealEstate", metric: "200% Conversion Increase" }
    ];

    useEffect(() => {
        const interval = setInterval(() => setActive((p) => (p + 1) % testimonials.length), 5000);
        return () => clearInterval(interval);
    }, [testimonials.length]);

    return (
        <section id="results" className="relative overflow-hidden bg-[#0a0118]/80 backdrop-blur-sm">
            <SectionDivider />
            <div className="container mx-auto relative px-6 py-32 z-10">
                <div className="flex flex-col items-center">
                    <div className="mb-8 rounded-full border border-white/5 bg-white/5 px-4 py-1 text-xs font-black uppercase tracking-widest text-slate-400">Success Stories</div>
                    <div className="h-[300px] w-full max-w-4xl relative">
                        {testimonials.map((item, i) => (
                            <div key={i} className={`absolute inset-0 flex flex-col items-center text-center transition-all duration-700 ease-out ${i === active ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10 pointer-events-none"}`}>
                                <p className="mb-8 text-3xl font-serif italic text-white md:text-5xl drop-shadow-[0_0_20px_rgba(255,255,255,0.1)]">"{item.quote}"</p>
                                <div className="flex flex-col items-center gap-1">
                                    <h4 className="text-xl font-black text-white">{item.author}</h4>
                                    <p className="text-slate-500 font-bold text-sm">{item.role} @ {item.company}</p>
                                    <div className="mt-4 rounded-full bg-purple-900/40 border border-purple-500/20 px-6 py-2 text-sm font-black text-purple-100 shadow-[0_0_15px_rgba(139,92,246,0.3)]">{item.metric}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="flex gap-2 mt-8">
                        {testimonials.map((_, i) => (
                            <button key={i} onClick={() => setActive(i)} className={`h-2 rounded-full transition-all duration-500 ${i === active ? 'w-12 bg-purple-500 shadow-[0_0_10px_rgba(168,85,247,0.5)]' : 'w-2 bg-white/10'}`} />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

const ProcessSection = () => (
    <section id="methodology" className="relative bg-[#0a0118]">
        <SectionDivider />
        <div className="container mx-auto px-6 py-32">
            <SectionHeading title="The Methodology" subtitle="How we deliver excellence, step by step." />
            <div className="grid gap-12 md:grid-cols-4">
                {[
                    { step: "01", title: "Audit", desc: "Deep dive into your workflows." },
                    { step: "02", title: "Strategy", desc: "Crafting the perfect roadmap." },
                    { step: "03", title: "Build", desc: "Agile engineering and deployment." },
                    { step: "04", title: "Scale", desc: "Continuous optimization and growth." }
                ].map((item, i) => (
                    <div key={i} className="group relative">
                        <div className="text-6xl font-black text-white/5 transition-colors group-hover:text-purple-500/20">{item.step}</div>
                        <h4 className="text-xl font-black text-white mt-[-20px]">{item.title}</h4>
                        <p className="text-slate-500 font-bold text-sm mt-2">{item.desc}</p>
                    </div>
                ))}
            </div>
        </div>
    </section>
);

const FinalCTA = ({ onOpenAudit }: { onOpenAudit: () => void }) => (
    <section className="relative overflow-hidden items-center flex flex-col justify-center text-center px-6 bg-[#0a0118]">
        <SectionDivider />
        <div className="relative z-10 max-w-4xl mx-auto py-32">
            <h2 className="text-4xl md:text-7xl font-black text-white mb-8 tracking-tighter">
                Stop wasting time on <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-indigo-400 to-violet-500 drop-shadow-[0_0_20px_rgba(168,85,247,0.3)]">manual tasks.</span>
            </h2>
            <ShimmerButton onClick={onOpenAudit} className="scale-125 !bg-white !text-black shadow-[0_0_40px_rgba(255,255,255,0.3)] hover:scale-150 transition-all duration-500">Book Your Free Audit</ShimmerButton>
            <div className="flex items-center justify-center gap-2 text-sm text-slate-500 font-black pt-10">
                <span className="text-purple-400"><Icons.ShieldCheck /></span> No commitment • 30-min strategy session
            </div>
        </div>
    </section>
);

const Footer = () => {
    const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle');

    const handleSubscribe = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('loading');
        const form = e.target as HTMLFormElement;
        const formData = new FormData(form);
        const success = await submitToSupabase('newsletter', Object.fromEntries(formData.entries()));
        if (success) {
            setStatus('success');
            form.reset();
            setTimeout(() => setStatus('idle'), 3000);
        } else {
            alert('Subscription failed. Please try again.');
            setStatus('idle');
        }
    };

    return (
        <footer className="bg-[#0a0118] relative z-10">
            <SectionDivider />
            <div className="container mx-auto px-6 py-20">
                <div className="grid gap-12 lg:grid-cols-4 md:grid-cols-2">
                    <div className="space-y-6 lg:col-span-1">
                        <div className="flex items-center gap-2 group cursor-pointer">
                            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/10 text-white shadow-[0_0_15px_rgba(255,255,255,0.2)] group-hover:shadow-[0_0_20px_rgba(139,92,246,0.6)] transition-all">
                                <Icons.Zap />
                            </div>
                            <span className="text-xl font-black tracking-wider text-white">AutomateLabs.in</span>
                        </div>
                        <p className="text-slate-400 font-bold text-sm leading-relaxed">Empowering businesses through intelligent software and autonomous AI systems.</p>
                    </div>

                    <div className="lg:col-span-1">
                        <h4 className="text-white font-black mb-6 uppercase tracking-widest text-xs">Company</h4>
                        <ul className="space-y-4">
                            <li><Link to="/about" className="text-sm font-black text-slate-500 transition-all hover:text-white hover:drop-shadow-[0_0_8px_rgba(168,85,247,0.8)]">About Us</Link></li>
                            <li><Link to="/case-studies" className="text-sm font-black text-slate-500 transition-all hover:text-white hover:drop-shadow-[0_0_8px_rgba(168,85,247,0.8)]">Case Studies</Link></li>
                            <li><Link to="/careers" className="text-sm font-black text-slate-500 transition-all hover:text-white hover:drop-shadow-[0_0_8px_rgba(168,85,247,0.8)]">Careers</Link></li>
                            <li><Link to="/privacy" className="text-sm font-black text-slate-500 transition-all hover:text-white hover:drop-shadow-[0_0_8px_rgba(168,85,247,0.8)]">Privacy Policy</Link></li>
                        </ul>
                    </div>

                    <div className="lg:col-span-2 relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-sm">
                        <BorderBeam />
                        <div className="relative z-10">
                            <h4 className="text-white font-black mb-2 text-xl">Subscribe to our Newsletter</h4>
                            <p className="text-slate-500 text-sm mb-6 font-bold">Get the latest automation insights delivered to your inbox.</p>

                            {status === 'success' ? (
                                <div className="py-4 text-center bg-purple-500/10 border border-purple-500/20 rounded-lg animate-pulse">
                                    <span className="text-purple-400 font-black">Welcome to the future! You're subscribed.</span>
                                </div>
                            ) : (
                                <form onSubmit={handleSubscribe} className="space-y-4">
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <input name="name" required className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-slate-600 focus:border-purple-500 transition-all outline-none text-sm" placeholder="Full Name" />
                                        <input name="phone" type="tel" required className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-slate-600 focus:border-purple-500 transition-all outline-none text-sm" placeholder="Phone Number" />
                                    </div>
                                    <div className="flex flex-col sm:flex-row gap-4">
                                        <input name="email" type="email" required className="flex-1 rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-slate-600 focus:border-purple-500 transition-all outline-none text-sm" placeholder="Email Address" />
                                        <ShimmerButton primary className="!py-3 !px-6 text-sm" disabled={status === 'loading'}>
                                            {status === 'loading' ? 'Subscribing...' : 'Subscribe'}
                                        </ShimmerButton>
                                    </div>
                                </form>
                            )}
                        </div>
                    </div>
                </div>
                <div className="mt-20 border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
                    <div className="text-xs font-black text-slate-600 lowercase tracking-widest leading-relaxed opacity-50">
                        © {new Date().getFullYear()} AutomateLabs.in • built with intelligent systems
                    </div>
                    <div className="flex gap-6">
                        <div className="h-2 w-2 rounded-full bg-purple-500/20"></div>
                        <div className="h-2 w-2 rounded-full bg-purple-500/40"></div>
                        <div className="h-2 w-2 rounded-full bg-purple-500/60"></div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

const AuditModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
    const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle');
    if (!isOpen) return null;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('loading');
        const form = e.target as HTMLFormElement;
        const success = await submitToSupabase('audits', Object.fromEntries(new FormData(form)));
        if (success) {
            setStatus('success');
            setTimeout(() => { onClose(); setStatus('idle'); }, 2000);
        } else {
            alert('Submission failed.');
            setStatus('idle');
        }
    };

    return (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <div className="relative w-full max-w-4xl overflow-hidden rounded-2xl bg-[#0a0118] shadow-2xl flex flex-col md:flex-row max-h-[90vh] border border-white/10">
                <BorderBeam />
                <button onClick={onClose} className="absolute right-4 top-4 z-10 text-slate-500 hover:text-white transition-colors"><Icons.X /></button>
                <div className="hidden w-1/3 bg-gradient-to-b from-purple-900 to-[#0a0118] p-8 text-white md:flex flex-col justify-between border-r border-white/5">
                    <div>
                        <div className="mb-6 flex items-center gap-2">
                            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/10"><Icons.Zap /></div>
                            <span className="font-black tracking-wider uppercase text-sm opacity-80">AutomateLabs.in</span>
                        </div>
                        <h3 className="text-3xl font-black leading-tight mb-4">Your Roadmap Starts Here</h3>
                        <p className="text-slate-400 text-sm font-bold">Get a custom automation strategy for your business.</p>
                    </div>
                </div>
                <div className="flex-1 overflow-y-auto p-8 lg:p-12">
                    {status === 'success' ? (
                        <div className="text-center py-12">
                            <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-purple-500/20 text-purple-400 shadow-[0_0_20px_rgba(168,85,247,0.3)]"><Icons.CheckCircle /></div>
                            <h3 className="text-2xl font-black text-white">Audit Requested!</h3>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <h2 className="text-3xl font-black text-white">Configure Your Audit</h2>
                            <div className="grid gap-6 md:grid-cols-2">
                                <div className="space-y-1">
                                    <label className="text-xs font-black uppercase text-slate-500">Company Name</label>
                                    <input name="companyName" required className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-white focus:border-purple-500 outline-none transition-all placeholder:text-slate-700" placeholder="e.g. Acme Corp" />
                                </div>
                                <div className="space-y-1">
                                    <label className="text-xs font-black uppercase text-slate-500">Phone (+91)</label>
                                    <input name="phone" type="tel" required className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-white focus:border-purple-500 outline-none transition-all placeholder:text-slate-700" placeholder="+91 00000 00000" />
                                </div>
                            </div>
                            <div className="grid gap-6 md:grid-cols-2">
                                <div className="space-y-1">
                                    <label className="text-xs font-black uppercase text-slate-500">Email Address</label>
                                    <input name="email" type="email" required className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-white focus:border-purple-500 outline-none transition-all placeholder:text-slate-700" placeholder="john@company.com" />
                                </div>
                                <div className="space-y-1">
                                    <label className="text-xs font-black uppercase text-slate-500">Business Niche</label>
                                    <input name="niche" required className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-white focus:border-purple-500 outline-none transition-all placeholder:text-slate-700" placeholder="e.g. Real Estate" />
                                </div>
                            </div>
                            <div className="space-y-1">
                                <label className="text-xs font-black uppercase text-slate-500">Key Bottleneck (Optional)</label>
                                <textarea name="bottlenecks" rows={2} className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-white focus:border-purple-500 outline-none transition-all placeholder:text-slate-700" placeholder="What should we automate?" />
                            </div>
                            <ShimmerButton primary className="w-full !py-4" disabled={status === 'loading'}>Book Audit</ShimmerButton>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
};

export default function AutomateLabsWebsite() {
    const [isAuditOpen, setIsAuditOpen] = useState(false);
    const [isCallbackOpen, setIsCallbackOpen] = useState(false);

    return (
        <div className="min-h-screen w-full font-sans text-slate-300 selection:bg-purple-900/30 selection:text-white relative bg-[#0a0118]">
            <AuditModal isOpen={isAuditOpen} onClose={() => setIsAuditOpen(false)} />
            <CallbackModal isOpen={isCallbackOpen} onClose={() => setIsCallbackOpen(false)} />
            <InteractionLayer />
            <AuroraBackground />
            <DoorAnimation />
            <Navbar onRequestCallback={() => setIsCallbackOpen(true)} />
            <main className="relative z-10">
                <HeroSection onOpenAudit={() => setIsAuditOpen(true)} />
                <MetricsSection />
                <FeaturesSection />
                <TestimonialsSection />
                <ProcessSection />
                <FinalCTA onOpenAudit={() => setIsAuditOpen(true)} />
            </main>
            <Footer />
        </div>
    );
}
