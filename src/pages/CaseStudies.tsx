import { useMemo, useState } from 'react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import Container from '../components/ui/Container';
import Button from '../components/ui/Button';
import Reveal from '../components/ui/Reveal';
import Stat from '../components/ui/Stat';
import Icons from '../components/ui/Icons';

interface Metric {
    value: number;
    prefix?: string;
    suffix?: string;
    label: string;
}

interface CaseStudy {
    id: string;
    category: 'ecommerce' | 'sales' | 'data' | 'creators';
    industry: string;
    title: string;
    summary: string;
    problem: string;
    system: string[];
    result: string;
    metrics?: Metric[];
    highlights?: string[];
}

const CASES: CaseStudy[] = [
    {
        id: 'ecommerce-ops',
        category: 'ecommerce',
        industry: 'Retail · E-commerce',
        title: 'Order & Inventory Automation',
        summary: 'A growing retailer was running every order by hand and reconciling stock in spreadsheets.',
        problem:
            'Orders were processed manually and inventory lived across channels in spreadsheets. It was slow, and the mistakes shipped to real customers.',
        system: [
            'Auto-routes every incoming order straight to fulfilment',
            'Syncs inventory across all channels in real time',
            'Flags exceptions before they ever reach a customer',
        ],
        result: 'Order processing dropped from hours to minutes — with no manual errors leaving the door.',
        metrics: [
            { value: 500, suffix: '+', label: 'hours saved / month' },
            { value: 85, suffix: '%', label: 'faster processing' },
            { value: 0, label: 'shipping errors' },
        ],
    },
    {
        id: 'crm-agents',
        category: 'sales',
        industry: 'B2B Sales',
        title: 'AI Lead-Qualification & CRM Agents',
        summary: 'Inbound leads were going cold while a busy team tried to keep up with follow-ups.',
        problem:
            'Every new lead depended on a human remembering to reply. The good ones cooled off before anyone reached them, and the CRM was always a step behind reality.',
        system: [
            'AI agents qualify each new lead within seconds',
            'CRM updates itself — zero manual data entry',
            'Follow-ups and meetings get booked around the clock',
        ],
        result: 'Three times more leads converted, on top of a CRM that finally stays accurate.',
        metrics: [
            { value: 3, suffix: 'x', label: 'lead conversion' },
            { value: 24, suffix: '/7', label: 'availability' },
            { value: 100, suffix: '%', label: 'data accuracy' },
        ],
    },
    {
        id: 'data-reporting',
        category: 'data',
        industry: 'Financial services',
        title: 'Automated Reporting Pipeline',
        summary: 'Analysts spent days each week rebuilding the same reports from raw exports.',
        problem:
            'A finance team rebuilt identical weekly reports by hand from messy exports. It ate analyst time and still arrived late.',
        system: [
            'Pulls and cleans data from every source automatically',
            'Generates the full weekly report on a schedule',
            'Surfaces anomalies in real time, not after the fact',
        ],
        result: 'Weekly reporting went from days of work to five minutes, unattended.',
        metrics: [
            { value: 95, suffix: '%', label: 'lower reporting cost' },
            { value: 5, suffix: ' min', label: 'to full report' },
            { value: 100, suffix: '%', label: 'on-time delivery' },
        ],
    },
    {
        id: 'creator-engine',
        category: 'creators',
        industry: 'Creator economy',
        title: 'Creator Content Engine',
        summary: "A creator's growth was capped by how much one team could produce and track.",
        problem:
            'Content output, engagement tracking, and brand deals were all manual — so growth was limited by hours in the day, and partnerships slipped through the cracks.',
        system: [
            'Automated content scheduling and repurposing',
            'Engagement and performance tracking in one dashboard',
            'A managed pipeline for brand partnerships',
        ],
        result: 'More output, clearer numbers, and deals that no longer fall through the cracks.',
        highlights: ['Content automation', 'Engagement tracking', 'Partnership management'],
    },
    {
        id: 'scaled-ops',
        category: 'creators',
        industry: 'Multi-brand operations',
        title: 'Scaled Operations System',
        summary: 'Multiple brands and teams meant workflows sprawled across a dozen disconnected tools.',
        problem:
            'Running several brands meant approvals, workflows, and revenue tracking were scattered across a dozen tools that never talked to each other.',
        system: [
            'Unified multi-workflow automation across every team',
            'Shared task and approval pipelines',
            'Revenue tracking across all streams in one place',
        ],
        result: 'One system runs the whole operation instead of a dozen that drift out of sync.',
        highlights: ['Multi-workflow automation', 'Team collaboration', 'Revenue optimization'],
    },
];

const FILTERS = [
    { id: 'all', label: 'All work' },
    { id: 'ecommerce', label: 'E-commerce' },
    { id: 'sales', label: 'Sales & CRM' },
    { id: 'data', label: 'Data & Ops' },
    { id: 'creators', label: 'Creators' },
] as const;

const CaseCard = ({ study, open, onToggle }: { study: CaseStudy; open: boolean; onToggle: () => void }) => (
    <article
        className={`overflow-hidden rounded-2xl border bg-paper transition-all duration-300 ${
            open ? 'border-clay shadow-lift' : 'border-line shadow-soft hover:-translate-y-1 hover:shadow-lift'
        }`}
    >
        <button
            onClick={onToggle}
            className="flex w-full items-start justify-between gap-4 p-6 text-left md:p-8"
            aria-expanded={open}
        >
            <div>
                <span className="text-xs font-semibold uppercase tracking-[0.16em] text-clay">{study.industry}</span>
                <h3 className="mt-2 font-display text-xl font-semibold tracking-tight text-ink md:text-2xl">
                    {study.title}
                </h3>
                <p className="mt-2 max-w-xl text-sm leading-relaxed text-umber">{study.summary}</p>
            </div>
            <span
                className={`mt-1 flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full border transition-all ${
                    open ? 'rotate-180 border-clay bg-clay text-paper' : 'border-line text-ink'
                }`}
            >
                {open ? <Icons.Minus className="h-4 w-4" /> : <Icons.Plus className="h-4 w-4" />}
            </span>
        </button>

        {study.metrics && (
            <div className="grid grid-cols-3 gap-4 border-t border-line px-6 py-6 md:px-8">
                {study.metrics.map((m) => (
                    <Stat key={m.label} value={m.value} prefix={m.prefix} suffix={m.suffix} label={m.label} />
                ))}
            </div>
        )}

        {study.highlights && (
            <div className="flex flex-wrap gap-2 border-t border-line px-6 py-6 md:px-8">
                {study.highlights.map((h) => (
                    <span
                        key={h}
                        className="inline-flex items-center gap-1.5 rounded-full bg-clay-soft/50 px-3 py-1.5 text-xs font-medium text-clay-deep"
                    >
                        <Icons.Check className="h-3.5 w-3.5" />
                        {h}
                    </span>
                ))}
            </div>
        )}

        {open && (
            <div className="animate-fade-in border-t border-line px-6 py-8 md:px-8">
                <div className="grid gap-8 md:grid-cols-3">
                    <div>
                        <h4 className="mb-2 text-xs font-semibold uppercase tracking-[0.16em] text-umber">The problem</h4>
                        <p className="text-sm leading-relaxed text-ink/85">{study.problem}</p>
                    </div>
                    <div>
                        <h4 className="mb-2 text-xs font-semibold uppercase tracking-[0.16em] text-umber">What we built</h4>
                        <ul className="space-y-2">
                            {study.system.map((s) => (
                                <li key={s} className="flex gap-2 text-sm leading-relaxed text-ink/85">
                                    <Icons.Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-clay" />
                                    {s}
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div>
                        <h4 className="mb-2 text-xs font-semibold uppercase tracking-[0.16em] text-umber">The result</h4>
                        <p className="text-sm leading-relaxed text-ink/85">{study.result}</p>
                    </div>
                </div>
            </div>
        )}
    </article>
);

const CaseStudies = () => {
    const [filter, setFilter] = useState<string>('all');
    const [openId, setOpenId] = useState<string | null>(CASES[0].id);

    const visible = useMemo(
        () => (filter === 'all' ? CASES : CASES.filter((c) => c.category === filter)),
        [filter]
    );

    return (
        <div className="min-h-screen bg-cream text-ink">
            <Navbar />

            {/* Hero */}
            <section className="bg-grain relative overflow-hidden pt-32 pb-16 md:pt-40 md:pb-20">
                <div className="pointer-events-none absolute -right-24 -top-24 h-96 w-96 rounded-full bg-clay-soft/40 blur-3xl" />
                <Container className="relative">
                    <Reveal>
                        <div className="mb-5 flex items-center gap-2">
                            <span className="h-px w-6 bg-clay" />
                            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-clay">
                                Proof, not promises
                            </span>
                        </div>
                        <h1 className="max-w-3xl font-display text-4xl font-semibold leading-[1.05] tracking-tight text-ink md:text-6xl">
                            Real systems. <span className="text-clay">Real revenue.</span>
                        </h1>
                        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-umber">
                            We don't sell AI slop. Every project below is an end-to-end system that replaced repetitive
                            work and put time and money back into the business. Open one to see how it was built.
                        </p>
                        <div className="mt-8 flex flex-wrap gap-3">
                            <Button href="/#contact">
                                Book a free audit
                                <Icons.ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                            </Button>
                            <Button variant="outline" href="#work">
                                See the work
                            </Button>
                        </div>
                    </Reveal>
                </Container>
            </section>

            {/* Filters + case studies */}
            <section id="work" className="pb-24">
                <Container>
                    <div className="mb-10 flex flex-wrap gap-2 border-b border-line pb-6">
                        {FILTERS.map((f) => (
                            <button
                                key={f.id}
                                onClick={() => setFilter(f.id)}
                                className={`rounded-full px-4 py-2 text-sm font-medium transition-all ${
                                    filter === f.id
                                        ? 'bg-ink text-paper'
                                        : 'border border-line text-ink/70 hover:border-clay hover:text-clay'
                                }`}
                            >
                                {f.label}
                            </button>
                        ))}
                    </div>

                    <div className="space-y-5">
                        {visible.map((study, i) => (
                            <Reveal key={study.id} delay={i * 70}>
                                <CaseCard
                                    study={study}
                                    open={openId === study.id}
                                    onToggle={() => setOpenId((id) => (id === study.id ? null : study.id))}
                                />
                            </Reveal>
                        ))}
                    </div>
                </Container>
            </section>

            {/* Closing CTA */}
            <section className="pb-24">
                <Container>
                    <Reveal>
                        <div className="relative overflow-hidden rounded-3xl bg-ink px-8 py-14 text-center md:px-16 md:py-20">
                            <div className="pointer-events-none absolute -left-16 -top-16 h-64 w-64 rounded-full bg-clay/30 blur-3xl" />
                            <div className="pointer-events-none absolute -bottom-16 -right-16 h-64 w-64 rounded-full bg-clay/20 blur-3xl" />
                            <h2 className="relative mx-auto max-w-2xl font-display text-3xl font-semibold leading-tight tracking-tight text-cream md:text-4xl">
                                Have a process that repeats every day? That's the one we automate.
                            </h2>
                            <p className="relative mx-auto mt-4 max-w-xl text-cream/70">
                                Book a free audit and we'll map exactly what AI can take off your team's plate — and what
                                it's worth to you.
                            </p>
                            <div className="relative mt-8 flex justify-center">
                                <Button href="/#contact">
                                    Book your free audit
                                    <Icons.ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                                </Button>
                            </div>
                        </div>
                    </Reveal>
                </Container>
            </section>

            <Footer />
        </div>
    );
};

export default CaseStudies;
