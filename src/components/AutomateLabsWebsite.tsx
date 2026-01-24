

import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../lib/supabaseClient';

// --- Types ---

interface ShimmerButtonProps {
    children: React.ReactNode;
    primary?: boolean;
    onClick?: () => void;
    className?: string;
}

interface SectionHeadingProps {
    title: string;
    subtitle: string;
    center?: boolean;
}

interface Node {
    id: number;
    startX: number;
    startY: number;
    startRot: number;
    gridX: number;
    gridY: number;
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

    console.log(`Submitting to ${table} via REST API...`);

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

        if (!response.ok) {
            const errorText = await response.text();
            console.error('Supabase REST Error:', response.status, errorText);
            throw new Error(`Server responded with ${response.status}: ${errorText}`);
        }

        console.log('Supabase REST Submission Success');
        return true;
    } catch (error) {
        console.error('Supabase REST Catch Block:', error);
        alert(`Connection Failed: ${(error as Error).message}. Please disable AdBlockers.`);
        return false;
    }
};

// --- Icons (Inline SVGs for self-containment) ---
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

// --- Helper Components ---

const ShimmerButton: React.FC<ShimmerButtonProps> = ({ children, primary = true, onClick, className = "" }) => (
    <button
        onClick={onClick}
        className={`group relative overflow-hidden rounded-lg px-8 py-4 font-bold transition-all hover:scale-105 active:scale-95 shadow-lg ${primary
            ? 'bg-gradient-to-r from-gray-900 to-gray-800 text-white hover:shadow-gray-900/30'
            : 'bg-white text-gray-900 border border-gray-200 hover:border-gray-300 hover:bg-gray-50'
            } ${className}`}
    >
        <div className={`absolute inset-0 -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent ${primary ? 'via-white/20' : 'via-gray-400/10'} to-transparent`} />
        <span className="flex items-center gap-2">{children}</span>
    </button>
);

const SectionHeading: React.FC<SectionHeadingProps> = ({ title, subtitle, center = true }) => (
    <div className={`mb-16 ${center ? 'text-center' : 'text-left'}`}>
        <h2 className="mb-4 text-4xl font-extrabold tracking-tight text-gray-900 md:text-5xl">
            {title}
        </h2>
        <p className="mx-auto max-w-2xl text-lg text-gray-600 leading-relaxed">{subtitle}</p>
    </div>
);

// --- Animation Components ---

const DoorAnimation = () => {
    const [open, setOpen] = useState(false);
    const [removed, setRemoved] = useState(false);

    useEffect(() => {
        // Start animation almost immediately
        const timer = setTimeout(() => setOpen(true), 100);
        // Remove from DOM/Layout after animation completes to free pointer events
        const removeTimer = setTimeout(() => setRemoved(true), 1600);
        return () => {
            clearTimeout(timer);
            clearTimeout(removeTimer);
        };
    }, []);

    if (removed) return null;

    return (
        <div className="fixed inset-0 z-[100] flex pointer-events-none">
            {/* Left Panel */}
            <div
                className={`h-full w-1/2 bg-gray-900 transition-transform duration-[1500ms] cubic-bezier(0.7, 0, 0.3, 1) ${open ? '-translate-x-full' : 'translate-x-0'
                    }`}
            >
                <div className={`absolute right-0 top-1/2 -translate-y-1/2 pr-8 transition-opacity duration-500 ${open ? 'opacity-0' : 'opacity-100'}`}>
                    <div className="flex items-center gap-4">
                        <div className="h-[2px] w-24 bg-white/20"></div>
                        <span className="text-xl font-bold tracking-[0.5em] text-white/40 uppercase">Automate</span>
                    </div>
                </div>
            </div>

            {/* Right Panel */}
            <div
                className={`h-full w-1/2 bg-gray-900 transition-transform duration-[1500ms] cubic-bezier(0.7, 0, 0.3, 1) ${open ? 'translate-x-full' : 'translate-x-0'
                    }`}
            >
                <div className={`absolute left-0 top-1/2 -translate-y-1/2 pl-8 transition-opacity duration-500 ${open ? 'opacity-0' : 'opacity-100'}`}>
                    <div className="flex items-center gap-4">
                        <span className="text-xl font-bold tracking-[0.5em] text-white/40 uppercase">Labs</span>
                        <div className="h-[2px] w-24 bg-white/20"></div>
                    </div>
                </div>
            </div>
        </div>
    );
};

// --- Sections ---

const CallbackModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

    if (!isOpen) return null;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('loading');

        const form = e.target as HTMLFormElement;
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());

        const success = await submitToSupabase('callbacks', {
            name: data.name,
            phone: data.phone,
            email: data.email,
            query: data.query
        });

        if (success) {
            setStatus('success');
            setTimeout(() => {
                onClose();
                setStatus('idle');
            }, 2000);
        } else {
            setStatus('error');
        }
    };

    return (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose}></div>
            <div className="relative w-full max-w-md overflow-hidden rounded-2xl bg-white shadow-2xl animate-[fadeIn_0.3s_ease-out] p-6">

                <button onClick={onClose} className="absolute right-4 top-4 rounded-full bg-gray-100 p-2 text-gray-500 hover:bg-gray-200">
                    <Icons.X />
                </button>

                {status === 'success' ? (
                    <div className="flex flex-col items-center justify-center text-center py-8">
                        <div className="mb-4 rounded-full bg-green-100 p-4 text-green-600"><Icons.CheckCircle /></div>
                        <h3 className="mb-2 text-2xl font-bold text-gray-900">Request Sent!</h3>
                        <p className="text-gray-600">We will call you back shortly.</p>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <h2 className="text-2xl font-bold text-gray-900">Request Callback</h2>
                            <p className="text-sm text-gray-500">Leave your details and we'll contact you.</p>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-gray-700">Name</label>
                            <input name="name" required className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-gray-900 focus:ring-1 focus:ring-gray-900" placeholder="Your Name" />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-gray-700">Phone Number</label>
                            <input name="phone" type="tel" required className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-gray-900 focus:ring-1 focus:ring-gray-900" placeholder="+1 (555) 000-0000" />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-gray-700">Email</label>
                            <input name="email" type="email" required className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-gray-900 focus:ring-1 focus:ring-gray-900" placeholder="you@example.com" />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-gray-700">Query</label>
                            <textarea name="query" rows={2} className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-gray-900 focus:ring-1 focus:ring-gray-900" placeholder="How can we help?"></textarea>
                        </div>

                        <button
                            type="submit"
                            disabled={status === 'loading'}
                            className="w-full rounded-lg bg-gray-900 py-3 font-bold text-white transition-all hover:bg-gray-800 disabled:opacity-50"
                        >
                            {status === 'loading' ? 'Sending...' : 'Request Call'}
                        </button>
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
        <nav className={`fixed top-0 z-50 w-full transition-all duration-300 ${scrolled ? 'bg-white/80 py-4 backdrop-blur-md border-b border-gray-100 shadow-sm' : 'bg-transparent py-6'}`}>
            <div className="container mx-auto flex items-center justify-between px-6">
                <div className="flex items-center gap-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gray-900 text-white">
                        <Icons.Zap />
                    </div>
                    <span className="text-xl font-bold tracking-wider text-gray-900">AutomateLabs</span>
                </div>

                <div className="hidden md:flex items-center gap-8">
                    {['Services', 'Methodology', 'Results', 'Contact'].map((item) => (
                        <a key={item} href={`#${item.toLowerCase()}`} className="text-sm font-medium text-gray-600 transition-colors hover:text-blue-600">
                            {item}
                        </a>
                    ))}
                    <button
                        onClick={onRequestCallback}
                        className="rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-white transition-all hover:bg-gray-800 hover:shadow-lg"
                    >
                        Request Callback
                    </button>
                </div>

                <button className="block md:hidden text-gray-900" onClick={() => setIsOpen(!isOpen)}>
                    {isOpen ? <Icons.X /> : <Icons.Menu />}
                </button>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="absolute top-full left-0 w-full bg-white border-b border-gray-100 p-6 md:hidden shadow-xl">
                    <div className="flex flex-col gap-4">
                        {['Services', 'Methodology', 'Results', 'Contact'].map((item) => (
                            <a key={item} href={`#${item.toLowerCase()}`} onClick={() => setIsOpen(false)} className="text-lg font-medium text-gray-900">
                                {item}
                            </a>
                        ))}
                        <button
                            onClick={() => { onRequestCallback(); setIsOpen(false); }}
                            className="w-full rounded-md bg-gray-900 px-4 py-2 text-lg font-medium text-white"
                        >
                            Request Callback
                        </button>
                    </div>
                </div>
            )}
        </nav>
    );
};

const HeroSection = ({ onOpenAudit }: { onOpenAudit: () => void }) => {
    return (
        <section className="relative h-screen flex flex-col justify-center items-center overflow-hidden bg-white" id="hero">
            {/* Soft Gradient Background */}
            <div className="absolute inset-0 bg-gradient-to-b from-gray-50/80 via-white to-white pointer-events-none"></div>

            {/* Content Container */}
            <div className="relative z-10 flex flex-col items-center justify-center text-center px-4 animate-[fadeIn_1s_ease-out]">
                <div className="mb-8 inline-flex items-center rounded-full border border-gray-200 bg-white px-4 py-1.5 shadow-sm">
                    <span className="flex h-2 w-2 rounded-full bg-green-500 animate-pulse mr-2"></span>
                    <span className="text-xs font-bold uppercase tracking-wider text-gray-600">Intelligent Automation Systems</span>
                </div>

                <h1 className="mb-6 max-w-5xl text-6xl font-extrabold tracking-tight text-gray-900 md:text-8xl leading-tight">
                    Turn Chaos Into <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-600 to-gray-900">Clarity.</span>
                </h1>

                <p className="mb-12 max-w-2xl text-xl text-gray-600 leading-relaxed font-light">
                    We engineer sophisticated AI automations and custom SaaS solutions that streamline workflows, eliminate inefficiencies, and unlock new levels of productivity.
                </p>

                <div className="flex flex-col gap-4 sm:flex-row mt-4">
                    <ShimmerButton onClick={onOpenAudit}>Book Free Audit <Icons.ArrowRight /></ShimmerButton>
                    <Link to="/case-studies">
                        <ShimmerButton primary={false}>See Case Studies</ShimmerButton>
                    </Link>
                </div>
            </div>

            {/* Scroll Indicator */}
            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
                <div className="flex flex-col items-center gap-2 text-gray-400">
                    <span className="text-xs uppercase tracking-widest font-semibold">Scroll to Explore</span>
                    <Icons.ChevronDown />
                </div>
            </div>
        </section>
    );
};

const MetricsSection = () => {
    const stats = [
        { value: "500+", label: "Hours Saved Monthly" },
        { value: "85%", label: "Operational Cost Reduction" },
        { value: "3x", label: "Faster Deployment Time" },
        { value: "100%", label: "Client Satisfaction" }
    ];

    return (
        <section className="relative bg-white py-24 border-b border-gray-100">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-2 gap-12 md:grid-cols-4">
                    {stats.map((stat, i) => (
                        <div key={i} className="group text-center">
                            <div className="mb-2 text-5xl font-black text-gray-900 sm:text-6xl md:text-7xl tracking-tighter group-hover:-translate-y-1 transition-transform duration-300">
                                {stat.value}
                            </div>
                            <div className="text-xs font-bold uppercase tracking-widest text-gray-500 group-hover:text-blue-600 transition-colors">
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
            desc: "Transform manual bottlenecks into self-driving workflows. We implement autonomous agents that work 24/7 to handle your repetitive tasks with zero error rate.",
            points: ["Workflow Analysis & Optimization", "Custom AI Agent Development", "Seamless API Integrations"]
        },
        {
            icon: Icons.ShieldCheck,
            title: "Custom SaaS Solutions",
            desc: "Stop settling for off-the-shelf limitations. We architect secure, cloud-native software tailored perfectly to your unique business requirements and compliance needs.",
            points: ["Enterprise-Grade Security", "Scalable Cloud Architecture", "Multi-Tenant Systems"]
        },
        {
            icon: Icons.Rocket,
            title: "High-Performance Web & Mobile",
            desc: "Capture your audience instantly. We build lightning-fast, SEO-optimized digital experiences that convert visitors into loyal customers across all devices.",
            points: ["Sub-second Load Times", "Conversion Rate Optimization", "Progressive Web Apps (PWA)"]
        }
    ];

    return (
        <section id="services" className="bg-gray-50 py-32">
            <div className="container mx-auto px-6">
                <SectionHeading
                    title="Engineered for Impact"
                    subtitle="We don't just write code. We build strategic assets that solve real business problems and drive measurable growth."
                />

                <div className="grid gap-8 md:grid-cols-3">
                    {services.map((service, i) => (
                        <div key={i} className="group relative rounded-xl bg-white p-8 transition-all duration-300 hover:-translate-y-2 shadow-[0_2px_10px_rgb(0,0,0,0.05)] hover:shadow-[0_20px_40px_rgb(0,0,0,0.08)] border border-gray-100">
                            <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-lg bg-gray-100 text-gray-900 group-hover:bg-gray-900 group-hover:text-white transition-colors duration-300">
                                <service.icon />
                            </div>
                            <h3 className="mb-4 text-2xl font-bold text-gray-900 leading-tight">{service.title}</h3>
                            <p className="mb-8 text-gray-600 leading-relaxed font-light">{service.desc}</p>
                            <ul className="space-y-3">
                                {service.points.map((point, idx) => (
                                    <li key={idx} className="flex items-start gap-3 text-sm text-gray-600 font-medium">
                                        <span className="mt-0.5 text-green-500"><Icons.CheckCircle /></span>
                                        {point}
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
        {
            quote: "AutomateLabs didn't just build us a tool; they completely revolutionized how we handle logistics. What used to take 4 people a whole week is now done automatically in 30 minutes.",
            author: "Sarah Jenkins",
            role: "COO",
            company: "LogiTech Global",
            metric: "500+ Hours Saved / Month"
        },
        {
            quote: "The custom SaaS platform they engineered allowed us to scale from 100 to 10,000 users without a single hiccup. Their attention to security and architecture is world-class.",
            author: "David Chen",
            role: "CTO",
            company: "FinStream",
            metric: "100x User Scaling"
        },
        {
            quote: "Our conversion rate doubled within a month of launching the new site. The speed and animation quality is unlike anything else in our industry. Truly premium work.",
            author: "Elena Rodriguez",
            role: "Marketing Director",
            company: "LuxRealEstate",
            metric: "200% Conversion Increase"
        }
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            setActive((prev) => (prev + 1) % testimonials.length);
        }, 5000);
        return () => clearInterval(interval);
    }, [testimonials.length]);

    return (
        <section id="results" className="relative bg-white py-32 overflow-hidden border-t border-gray-100">
            <div className="container mx-auto relative px-6 z-10">
                <div className="flex flex-col items-center">
                    <div className="mb-8 rounded-full border border-gray-200 bg-gray-50 px-4 py-1 text-xs font-bold uppercase tracking-widest text-gray-500">
                        Success Stories
                    </div>

                    <div className="h-[400px] w-full max-w-4xl relative">
                        {testimonials.map((item, i) => (
                            <div
                                key={i}
                                className={`absolute inset-0 flex flex-col items-center text-center transition-all duration-700 ease-out ${i === active ? "opacity-100 translate-x-0 blur-0" : "opacity-0 translate-x-10 blur-sm pointer-events-none"
                                    }`}
                            >
                                <p className="mb-10 text-3xl font-serif italic leading-relaxed text-gray-900 md:text-5xl">
                                    "{item.quote}"
                                </p>
                                <div className="flex flex-col items-center gap-2">
                                    <h4 className="text-xl font-bold text-gray-900">{item.author}</h4>
                                    <p className="text-gray-500 font-medium">{item.role} @ {item.company}</p>
                                    <div className="mt-4 rounded-full bg-blue-50 px-6 py-2 text-sm font-bold text-blue-900">
                                        {item.metric}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="flex gap-2 mt-8">
                        {testimonials.map((_, i) => (
                            <button
                                key={i}
                                onClick={() => setActive(i)}
                                className={`h-2 rounded-full transition-all duration-300 ${i === active ? 'w-12 bg-gray-900' : 'w-2 bg-gray-300 hover:bg-gray-400'}`}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

const ProcessSection = () => {
    const steps = [
        { id: "01", name: "Discover", title: "Deep Dive Audit", desc: "We analyze your current workflows and identify the highest-impact opportunities for automation." },
        { id: "02", name: "Design", title: "Strategic Roadmap", desc: "We architect a custom solution blueprint, selecting the best stack for scalability and security." },
        { id: "03", name: "Deploy", title: "Agile Build", desc: "Our rapid development cycles ensure you get functional tools fast, with rigorous testing phases." },
        { id: "04", name: "Optimize", title: "Continuous Growth", desc: "We track performance metrics post-launch and iterate to ensure your ROI keeps climbing." },
    ];

    return (
        <section id="methodology" className="bg-gray-900 py-32 px-6 text-white">
            <div className="container mx-auto">
                <div className="mb-16 text-center">
                    <h2 className="mb-4 text-4xl font-extrabold tracking-tight text-white md:text-5xl">From Concept to Core</h2>
                    <p className="mx-auto max-w-2xl text-lg text-gray-400">Our proven four-step methodology ensures predictable success and rapid value delivery.</p>
                </div>

                <div className="grid gap-6 md:grid-cols-4">
                    {steps.map((step, i) => (
                        <div key={i} className="group relative p-6 border-l border-white/10 hover:border-white transition-colors duration-300">
                            <span className="text-6xl font-black text-white absolute -top-4 -left-2 opacity-10 group-hover:opacity-20 transition-opacity z-0 select-none">
                                {step.id}
                            </span>
                            <div className="relative z-10">
                                <h4 className="text-blue-400 font-bold uppercase tracking-wider text-sm mb-2">{step.name}</h4>
                                <h3 className="text-xl font-bold text-white mb-3">{step.title}</h3>
                                <p className="text-gray-400 text-sm leading-relaxed">{step.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

const FinalCTA = ({ onOpenAudit }: { onOpenAudit: () => void }) => (
    <section className="relative py-32 overflow-hidden items-center flex flex-col justify-center text-center px-6 bg-white">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMSIgY3k9IjEiIHI9IjEiIGZpbGw9InJnYmEoMCwwLDAsMC4wNSkiLz48L3N2Zz4=')] opacity-50"></div>

        <div className="relative z-10 max-w-4xl mx-auto">
            <h2 className="text-5xl md:text-7xl font-bold text-gray-900 mb-8 tracking-tighter">
                Stop wasting time on <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-800">manual tasks.</span>
            </h2>
            <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
                Join the forward-thinking companies saving thousands of hours every month.
                Your custom automation roadmap is just one call away.
            </p>
            <div className="flex flex-col items-center gap-6">
                <ShimmerButton onClick={onOpenAudit} className="scale-125 shadow-xl">Book Your Free Automation Audit</ShimmerButton>
                <div className="flex items-center gap-2 text-sm text-gray-500 font-medium">
                    <Icons.ShieldCheck />
                    <span>No commitment • 30-min strategy session</span>
                </div>
            </div>
        </div>
    </section>
)

const Footer = () => {
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setStatus('loading');

        const target = e.target as typeof e.target & {
            0: { value: string };
            1: { value: string };
            2: { value: string };
            reset: () => void;
        };

        const success = await submitToSupabase('callbacks', {
            name: target[0].value,
            email: target[1].value,
            query: target[2].value
        });

        if (success) {
            setStatus('success');
            target.reset();
        } else {
            setStatus('error');
        }

        setTimeout(() => setStatus('idle'), 3000);
    };

    return (
        <footer id="contact" className="bg-white border-t border-gray-200 pt-20 pb-10">
            <div className="container mx-auto px-6">
                <div className="grid gap-16 md:grid-cols-2">
                    {/* Brand Info */}
                    <div className="space-y-6">
                        <div className="flex items-center gap-2">
                            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gray-900 text-white">
                                <Icons.Zap />
                            </div>
                            <span className="text-xl font-bold tracking-wider text-gray-900">AutomateLabs</span>
                        </div>
                        <p className="text-gray-500 leading-relaxed">
                            We build the future of business operations through intelligent software and seamless automation.
                        </p>
                        <div className="flex gap-4 pt-4">
                            {/* Social Placeholders */}
                            {[1, 2, 3].map(i => (
                                <div key={i} className="h-10 w-10 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors cursor-pointer flex items-center justify-center text-gray-600">
                                    <Icons.Globe />
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-gray-900 font-bold mb-6">Company</h4>
                        <ul className="space-y-4 text-gray-600">
                            <li><Link to="/about" className="hover:text-blue-600 cursor-pointer transition-colors">About Us</Link></li>
                            <li><Link to="/case-studies" className="hover:text-blue-600 cursor-pointer transition-colors">Case Studies</Link></li>
                            <li><Link to="/careers" className="hover:text-blue-600 cursor-pointer transition-colors">Careers</Link></li>
                            <li><Link to="/privacy" className="hover:text-blue-600 cursor-pointer transition-colors">Privacy Policy</Link></li>
                        </ul>
                    </div>

                    {/* Contact Form */}
                    <div>
                        <h4 className="text-gray-900 font-bold mb-6">Start Your Project</h4>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <input
                                    type="text"
                                    placeholder="Name"
                                    required
                                    className="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 text-gray-900 placeholder-gray-400 focus:border-gray-900 focus:outline-none focus:ring-1 focus:ring-gray-900 transition-all"
                                />
                            </div>
                            <div>
                                <input
                                    type="email"
                                    placeholder="Email Address"
                                    required
                                    className="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 text-gray-900 placeholder-gray-400 focus:border-gray-900 focus:outline-none focus:ring-1 focus:ring-gray-900 transition-all"
                                />
                            </div>
                            <div>
                                <textarea
                                    placeholder="Tell us about your project..."
                                    required
                                    rows={3}
                                    className="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 text-gray-900 placeholder-gray-400 focus:border-gray-900 focus:outline-none focus:ring-1 focus:ring-gray-900 transition-all"
                                ></textarea>
                            </div>
                            <button
                                type="submit"
                                disabled={status === 'loading' || status === 'success'}
                                className={`w-full rounded-lg py-3 font-bold transition-all ${status === 'success'
                                    ? 'bg-green-500 text-white'
                                    : 'bg-gray-900 text-white hover:bg-gray-800'
                                    }`}
                            >
                                {status === 'idle' && "Send Message"}
                                {status === 'loading' && <span className="animate-pulse">Sending...</span>}
                                {status === 'success' && "Message Sent!"}
                            </button>
                        </form>
                    </div>
                </div>

                <div className="mt-20 border-t border-gray-100 pt-8 text-center text-sm text-gray-500">
                    © {new Date().getFullYear()} AutomateLabs.in. All rights reserved.
                </div>
            </div>
        </footer>
    );
}

// --- Audit Form Component ---

const AuditModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

    if (!isOpen) return null;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('loading');

        const form = e.target as HTMLFormElement;
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());

        const success = await submitToSupabase('audits', {
            full_name: data.fullName,
            email: data.email,
            phone: data.phone,
            company_name: data.companyName,
            objective: data.objective,
            bottlenecks: data.bottlenecks
        });

        if (success) {
            setStatus('success');
            setTimeout(() => {
                onClose();
                setStatus('idle');
            }, 2000);
        } else {
            setStatus('error');
        }
    };

    return (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose}></div>
            <div className="relative w-full max-w-4xl overflow-hidden rounded-2xl bg-white shadow-2xl animate-[fadeIn_0.3s_ease-out] flex flex-col md:flex-row max-h-[90vh]">

                {/* Close Button */}
                <button onClick={onClose} className="absolute right-4 top-4 z-10 rounded-full bg-gray-100 p-2 text-gray-500 hover:bg-gray-200">
                    <Icons.X />
                </button>

                {/* Sidebar (Context) */}
                <div className="hidden w-1/3 bg-gray-900 p-8 text-white md:flex flex-col justify-between">
                    <div>
                        <div className="mb-6 flex items-center gap-2">
                            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600 text-white"><Icons.Zap /></div>
                            <span className="font-bold tracking-wider">AutomateLabs</span>
                        </div>
                        <h3 className="mb-4 text-2xl font-bold">Your Roadmap to Efficiency starts here.</h3>
                        <p className="text-gray-400">Tell us about your current operations, and we'll build a custom automation strategy for you.</p>
                    </div>
                    <div className="space-y-4">
                        <div className="flex items-center gap-3 text-sm text-gray-400">
                            <Icons.CheckCircle /> <span>Free 30-min Consultation</span>
                        </div>
                        <div className="flex items-center gap-3 text-sm text-gray-400">
                            <Icons.CheckCircle /> <span>Custom ROI Analysis</span>
                        </div>
                        <div className="flex items-center gap-3 text-sm text-gray-400">
                            <Icons.CheckCircle /> <span>No Commitment Required</span>
                        </div>
                    </div>
                </div>

                {/* Form Content */}
                <div className="flex-1 overflow-y-auto p-8">
                    {status === 'success' ? (
                        <div className="flex h-full flex-col items-center justify-center text-center">
                            <div className="mb-4 rounded-full bg-green-100 p-4 text-green-600"><Icons.CheckCircle /></div>
                            <h3 className="mb-2 text-2xl font-bold text-gray-900">Request Received!</h3>
                            <p className="text-gray-600">We'll be in touch shortly to schedule your audit.</p>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <h2 className="text-2xl font-bold text-gray-900">Configure Your Audit</h2>
                                <p className="text-gray-500 text-sm">Please provide as much detail as possible.</p>
                            </div>

                            <div className="grid gap-6 md:grid-cols-2">
                                <div className="space-y-2">
                                    <label className="text-sm font-semibold text-gray-700">Full Name</label>
                                    <input name="fullName" required className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-gray-900 focus:ring-1 focus:ring-gray-900" placeholder="John Doe" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-semibold text-gray-700">Work Email</label>
                                    <input name="email" type="email" required className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-gray-900 focus:ring-1 focus:ring-gray-900" placeholder="john@company.com" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-semibold text-gray-700">Phone</label>
                                    <input name="phone" type="tel" className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-gray-900 focus:ring-1 focus:ring-gray-900" placeholder="+1 (555) 000-0000" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-semibold text-gray-700">Company Name</label>
                                    <input name="companyName" required className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-gray-900 focus:ring-1 focus:ring-gray-900" placeholder="Acme Inc." />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-gray-700">Primary Objective</label>
                                <select name="objective" className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-gray-900 focus:ring-1 focus:ring-gray-900">
                                    <option>Reduce Operational Costs</option>
                                    <option>Save Employee Time</option>
                                    <option>Scale Operations</option>
                                    <option>Improve Data Accuracy</option>
                                </select>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-gray-700">Key Bottlenecks</label>
                                <textarea name="bottlenecks" rows={3} className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-gray-900 focus:ring-1 focus:ring-gray-900" placeholder="Describe the manual processes you want to automate..."></textarea>
                            </div>

                            <div className="flex justify-end pt-4">
                                <button type="button" onClick={onClose} className="mr-4 px-6 py-2 text-sm font-semibold text-gray-600 hover:text-gray-900">Cancel</button>
                                <button
                                    type="submit"
                                    disabled={status === 'loading'}
                                    className="rounded-lg bg-gray-900 px-8 py-3 font-bold text-white transition-all hover:bg-gray-800 disabled:opacity-50"
                                >
                                    {status === 'loading' ? 'Submitting...' : 'Book Audit'}
                                </button>
                            </div>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
};

// --- Main Application Component ---

// --- Debug Component ---
const DebugBanner = () => {
    const url = import.meta.env.VITE_SUPABASE_URL;
    const key = import.meta.env.VITE_SUPABASE_ANON_KEY;

    if (!url || !key) return (
        <div className="fixed top-0 left-0 w-full bg-red-600 text-white p-2 z-[9999] text-center font-bold text-xs">
            ⚠️ CONFIG ERROR: Supabase Keys Missing! Restart 'npm run dev' or check .env file.
        </div>
    );

    return (
        <div className="fixed bottom-0 left-0 bg-gray-900 text-white p-2 z-[9999] text-xs font-mono opacity-75 pointer-events-none">
            ✅ Connected to: {url?.substring(8, 20)}... <br />
            🔑 Key Loaded: {key?.length > 10 ? 'Yes' : 'No'}
        </div>
    );
};

export default function AutomateLabsWebsite() {
    const [isAuditOpen, setIsAuditOpen] = useState(false);
    const [isCallbackOpen, setIsCallbackOpen] = useState(false);

    return (
        <div className="min-h-screen w-full bg-white font-sans text-gray-900 selection:bg-gray-200 selection:text-black">
            <DebugBanner />
            <AuditModal isOpen={isAuditOpen} onClose={() => setIsAuditOpen(false)} />
            <CallbackModal isOpen={isCallbackOpen} onClose={() => setIsCallbackOpen(false)} />
            <DoorAnimation />
            <Navbar onRequestCallback={() => setIsCallbackOpen(true)} />
            <main>
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
