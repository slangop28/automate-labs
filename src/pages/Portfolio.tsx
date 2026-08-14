import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import Container from '../components/ui/Container';
import SectionHeading from '../components/ui/SectionHeading';
import Reveal from '../components/ui/Reveal';
import Button from '../components/ui/Button';
import Icons from '../components/ui/Icons';
import type { FC } from 'react';

interface Project {
    icon: FC<{ className?: string }>;
    tag: string;
    title: string;
    summary: string;
    stack: string[];
    metrics: { value: string; label: string }[];
}

const flagship: Project[] = [
    {
        icon: Icons.Cpu,
        tag: 'RAG / Knowledge AI',
        title: 'Enterprise Document Intelligence',
        summary:
            'A retrieval-augmented system that ingests 150+ page enterprise PDFs, embeds them into a vector store, and answers natural-language questions with cited, accurate responses in seconds — instead of manual searching.',
        stack: ['Vector embeddings', 'Semantic chunking', 'LLM orchestration', 'Cloud vector DB', 'Source citation'],
        metrics: [
            { value: '150+', label: 'page docs ingested' },
            { value: '<5s', label: 'avg query response' },
            { value: '0', label: 'manual search hours' },
        ],
    },
    {
        icon: Icons.Spark,
        tag: 'Web + Automation',
        title: 'smartvyapari.online — This Website',
        summary:
            'The entire SmartVyapari platform, engineered end to end: an animated marketing site with live lead-capture, a Supabase backend, and modular pages — built in-house as both our storefront and proof of capability.',
        stack: ['React + TypeScript', 'Tailwind CSS', 'Supabase backend', 'Custom animation', 'Cloud deployment'],
        metrics: [
            { value: '100%', label: 'in-house built' },
            { value: '5+', label: 'live integrated forms' },
            { value: '0', label: 'no-code shortcuts' },
        ],
    },
    {
        icon: Icons.Bolt,
        tag: 'Lead & Booking Automation',
        title: 'Local Electrician — Booking System',
        summary:
            "Replaced a service business's manual phone-and-paper booking with an automated lead capture, qualification, and scheduling pipeline — freeing the owner from admin and letting the business take on far more jobs.",
        stack: ['Lead capture', 'Auto-scheduling', 'CRM sync', 'Follow-up workflows'],
        metrics: [
            { value: '300%', label: 'growth in bookings' },
            { value: '24/7', label: 'lead capture uptime' },
            { value: '0', label: 'missed leads' },
        ],
    },
];

const techStack = [
    'Claude & Claude MCP', 'RAG / Vector Search', 'n8n Workflow Automation', 'Supabase / PostgreSQL',
    'Cloud Server Deployment', 'React & TypeScript', 'LLM Orchestration', 'API & CRM Integrations',
];

const agents: { icon: FC<{ className?: string }>; title: string; desc: string; points: string[] }[] = [
    {
        icon: Icons.Trending,
        title: 'Lead Generation Agents',
        desc: 'Autonomous agents that find, qualify, and warm up prospects across channels before they reach a human.',
        points: ['Multi-channel prospecting', 'Automatic qualification scoring', 'CRM-ready handoff'],
    },
    {
        icon: Icons.Phone,
        title: 'Customer Support Agents',
        desc: '24/7 AI support that resolves common questions instantly and escalates only what needs a human.',
        points: ['Instant, accurate responses', 'Knowledge-base grounded (RAG)', 'Seamless human handoff'],
    },
    {
        icon: Icons.Spark,
        title: 'Marketing & Sales Automation',
        desc: 'Agents that run outbound, nurture sequences, and follow-ups — so humans only step in to close.',
        points: ['Automated nurture sequences', 'Personalised outreach at scale', 'Plugs into your sales process'],
    },
];

interface MiniProject {
    icon: FC<{ className?: string }>;
    tag: string;
    title: string;
    desc: string;
    stack: string[];
}

const moreProjects: MiniProject[] = [
    {
        icon: Icons.Message,
        tag: 'Conversational AI',
        title: 'WhatsApp Automation Agents',
        desc: '24/7 WhatsApp agents that qualify leads, answer FAQs, book appointments, and keep your CRM in sync.',
        stack: ['Evolution API', 'n8n', 'LLM'],
    },
    {
        icon: Icons.Smartphone,
        tag: 'Mobile + AI',
        title: 'End-to-End Mobile Apps with LLM',
        desc: 'Full mobile apps shipped with native AI baked in — chat, summarisation, and smart assistants inside the product.',
        stack: ['React Native', 'LLM APIs', 'Supabase'],
    },
    {
        icon: Icons.Network,
        tag: 'Agentic Engineering',
        title: 'Multi-Agent Dev Orchestration',
        desc: 'Multi-agent systems that take software from spec to shipped — planning, coding, reviewing, and testing autonomously.',
        stack: ['Multi-agent', 'Claude', 'CI/CD'],
    },
    {
        icon: Icons.Pen,
        tag: 'Speech-to-Text',
        title: 'InstaScribe',
        desc: 'Transcribes Instagram reels and short-form video into clean, speaker-labelled text — searchable and ready to repurpose.',
        stack: ['Whisper', 'pyannote', 'Python'],
    },
    {
        icon: Icons.Film,
        tag: 'AI Video',
        title: 'Video Factory',
        desc: 'An LLM-driven pipeline that edits and assembles video programmatically with Remotion and HyperFrames — prompts in, finished cuts out.',
        stack: ['Remotion', 'HyperFrames', 'LLM'],
    },
    {
        icon: Icons.Terminal,
        tag: 'AI Enablement',
        title: 'Claude Code Adoption',
        desc: 'We embed Claude Code into personal, creator, and team workflows — agents, skills, and automations so you ship far faster.',
        stack: ['Claude Code', 'MCP', 'Skills'],
    },
];

const MiniCard = ({ p }: { p: MiniProject }) => (
    <div className="group flex h-full flex-col rounded-2xl border border-line bg-paper p-7 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:border-clay/40 hover:shadow-lift">
        <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-clay/12 text-clay-deep transition-colors group-hover:bg-clay group-hover:text-paper">
            <p.icon className="h-6 w-6" />
        </div>
        <span className="text-xs font-semibold uppercase tracking-wider text-clay">{p.tag}</span>
        <h3 className="mt-2 font-display text-xl font-semibold tracking-tight text-ink">{p.title}</h3>
        <p className="mt-2 text-sm leading-relaxed text-umber">{p.desc}</p>
        <div className="mt-5 flex flex-wrap gap-2 border-t border-line pt-5">
            {p.stack.map((s) => (
                <span key={s} className="rounded-full border border-line bg-cream px-2.5 py-1 text-[11px] font-medium text-ink/75">
                    {s}
                </span>
            ))}
        </div>
    </div>
);

const ProjectCard = ({ p }: { p: Project }) => (
    <div className="rounded-2xl border border-line bg-paper p-8 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-lift md:p-10">
        <div className="grid gap-8 md:grid-cols-[auto_1fr] md:items-start">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-clay/12 text-clay-deep">
                <p.icon className="h-7 w-7" />
            </div>
            <div>
                <span className="inline-flex rounded-full bg-clay/12 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-clay-deep">
                    {p.tag}
                </span>
                <h3 className="mt-4 font-display text-2xl font-semibold tracking-tight text-ink md:text-3xl">{p.title}</h3>
                <p className="mt-3 leading-relaxed text-umber">{p.summary}</p>
                <div className="mt-6 flex flex-wrap gap-2">
                    {p.stack.map((s) => (
                        <span key={s} className="rounded-full border border-line bg-cream px-3 py-1.5 text-xs font-medium text-ink/80">
                            {s}
                        </span>
                    ))}
                </div>
                <div className="mt-7 grid grid-cols-3 gap-4 border-t border-line pt-6">
                    {p.metrics.map((m) => (
                        <div key={m.label}>
                            <div className="font-display text-2xl font-semibold tracking-tight text-clay md:text-3xl">{m.value}</div>
                            <div className="mt-1 text-[11px] font-medium uppercase tracking-wider text-umber">{m.label}</div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    </div>
);

const Portfolio = () => (
    <div className="min-h-screen bg-cream text-ink">
        <Navbar />

        <section className="bg-grain relative overflow-hidden pt-32 pb-16 md:pt-40 md:pb-20">
            <div className="pointer-events-none absolute -right-24 -top-24 h-96 w-96 rounded-full bg-clay-soft/40 blur-3xl" />
            <Container className="relative">
                <Reveal>
                    <div className="mb-5 flex items-center gap-2">
                        <span className="h-px w-6 bg-clay" />
                        <span className="text-xs font-semibold uppercase tracking-[0.2em] text-clay">Selected work</span>
                    </div>
                    <h1 className="max-w-3xl font-display text-4xl font-semibold leading-[1.05] tracking-tight text-ink md:text-6xl">
                        Built. Shipped. <span className="text-clay">Running.</span>
                    </h1>
                    <p className="mt-6 max-w-2xl text-lg leading-relaxed text-umber">
                        From enterprise AI knowledge engines to small-business automations — the systems we've engineered,
                        and the agent stack we're building next.
                    </p>
                </Reveal>
            </Container>
        </section>

        <section className="py-20 md:py-24">
            <Container>
                <SectionHeading eyebrow="Flagship builds" title="Proof, not promises" subtitle="Three systems that show the range — deep AI engineering, full-stack product, and small-business automation." />
                <div className="mt-12 space-y-6">
                    {flagship.map((p, i) => (
                        <Reveal key={p.title} delay={i * 70}>
                            <ProjectCard p={p} />
                        </Reveal>
                    ))}
                </div>
            </Container>
        </section>

        <section className="border-t border-line py-20 md:py-24">
            <Container>
                <SectionHeading eyebrow="More from the lab" title="Systems we're building & shipping" subtitle="From WhatsApp agents to multi-agent dev teams and AI video pipelines — the range of what we put to work." />
                <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {moreProjects.map((p, i) => (
                        <Reveal key={p.title} delay={i * 60} className="h-full">
                            <MiniCard p={p} />
                        </Reveal>
                    ))}
                </div>
            </Container>
        </section>

        <section className="border-y border-line bg-paper py-24 md:py-28">
            <Container>
                <SectionHeading center eyebrow="The toolkit" title="What's under the hood" subtitle="Production-grade tooling, chosen for reliability at scale — not just demos." />
                <div className="mt-12 flex flex-wrap justify-center gap-3">
                    {techStack.map((tech) => (
                        <span key={tech} className="rounded-full border border-line bg-cream px-5 py-2.5 text-sm font-medium text-ink/80 transition-colors hover:border-clay hover:text-clay">
                            {tech}
                        </span>
                    ))}
                </div>
            </Container>
        </section>

        <section className="py-24 md:py-28">
            <Container>
                <SectionHeading center eyebrow="What we build" title="The agent stack we're rolling out" subtitle="The same engineering behind our RAG systems and automations, packaged into agents you can put to work." />
                <div className="mt-12 grid gap-6 md:grid-cols-3">
                    {agents.map((a, i) => (
                        <Reveal key={a.title} delay={i * 80} className="h-full">
                            <div className="flex h-full flex-col rounded-2xl border border-line bg-paper p-7 shadow-soft">
                                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-clay/12 text-clay-deep">
                                    <a.icon className="h-6 w-6" />
                                </div>
                                <h3 className="font-display text-xl font-semibold tracking-tight text-ink">{a.title}</h3>
                                <p className="mt-2 text-sm leading-relaxed text-umber">{a.desc}</p>
                                <ul className="mt-5 space-y-2.5 border-t border-line pt-5">
                                    {a.points.map((pt) => (
                                        <li key={pt} className="flex gap-2 text-sm text-ink/85">
                                            <Icons.Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-clay" /> {pt}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </Reveal>
                    ))}
                </div>
            </Container>
        </section>

        <section className="border-t border-line py-24 md:py-28">
            <Container className="max-w-3xl text-center">
                <Reveal>
                    <div className="mx-auto mb-8 max-w-xl rounded-2xl border border-clay/30 bg-clay/8 px-6 py-5">
                        <p className="text-sm font-semibold uppercase tracking-wider text-clay-deep">Early-mover pricing</p>
                        <p className="mt-2 text-base leading-relaxed text-ink/85">
                            We're still scaling — so we offer the most competitive rates in the market, and early clients
                            lock in <span className="font-semibold text-clay-deep">multiple discounts</span>. Get in before we grow.
                        </p>
                    </div>
                    <h2 className="font-display text-3xl font-semibold tracking-tight text-ink md:text-5xl">
                        Have a workflow worth <span className="text-clay">automating?</span>
                    </h2>
                    <p className="mx-auto mt-4 max-w-xl text-umber">
                        Tell us what's eating your time and we'll figure out the fastest way to fix it.
                    </p>
                    <div className="mt-8 flex flex-wrap justify-center gap-3">
                        <Button href="/#contact">
                            Book a free audit
                            <Icons.ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                        </Button>
                        <Button variant="outline" href="https://instagram.com/iamatul_28">
                            @iamatul_28
                        </Button>
                    </div>
                </Reveal>
            </Container>
        </section>

        <Footer />
    </div>
);

export default Portfolio;
