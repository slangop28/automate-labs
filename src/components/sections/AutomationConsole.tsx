import { useEffect, useRef, useState } from 'react';
import Container from '../ui/Container';
import SectionHeading from '../ui/SectionHeading';

interface Step {
    key: string;
    label: string;
    title: string;
    body: string;
}

const STEPS: Step[] = [
    {
        key: 'automation',
        label: '01 · Workflows',
        title: 'Repetitive work runs itself',
        body: 'A trigger fires, AI makes the call, and the action happens — orders routed, data synced, invoices sent. No one touches it.',
    },
    {
        key: 'agents',
        label: '02 · Voice & WhatsApp',
        title: 'Conversations get answered instantly',
        body: 'Voice and WhatsApp agents pick up in seconds, qualify the lead, book the call, and log everything to your CRM.',
    },
    {
        key: 'film',
        label: '03 · AI Film',
        title: 'Content ships at a fraction of the cost',
        body: 'Cinematic ads, UGC, and brand films generated and iterated in hours — not a six-figure shoot day.',
    },
    {
        key: 'strategy',
        label: '04 · Strategy',
        title: 'You always know the ROI first',
        body: 'Before a line of code, we audit your operations and map which systems pay back fastest.',
    },
];

/* ---- The live console mock that swaps as you scroll ---- */
const Mock = ({ index }: { index: number }) => {
    if (index === 1) {
        return (
            <div className="space-y-3">
                <div className="ml-auto max-w-[80%] rounded-2xl rounded-br-sm bg-clay px-4 py-2.5 text-sm text-paper">
                    Hi, do you handle 2BHK rentals in Bodakdev?
                </div>
                <div className="max-w-[85%] rounded-2xl rounded-bl-sm border border-line bg-cream px-4 py-2.5 text-sm text-ink">
                    Yes! I have 3 that match. Want me to book a viewing this evening?
                </div>
                <div className="flex items-center gap-2 text-xs font-medium text-clay">
                    <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-clay" /> qualifying lead · updating CRM
                </div>
            </div>
        );
    }
    if (index === 2) {
        return (
            <div className="space-y-3">
                <div className="relative flex aspect-video items-center justify-center overflow-hidden rounded-xl bg-ink">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-clay/90 text-paper">▶</div>
                    <div className="absolute bottom-2 left-2 font-mono text-[10px] uppercase tracking-wider text-cream/70">
                        brand_film_v3.mp4
                    </div>
                </div>
                <div className="h-1.5 w-full overflow-hidden rounded-full bg-line">
                    <div className="h-full w-full animate-pulse rounded-full bg-clay" />
                </div>
                <div className="font-mono text-xs text-umber">rendering · 100%</div>
            </div>
        );
    }
    if (index === 3) {
        return (
            <div className="space-y-2.5">
                {['Audit current operations', 'Map highest-ROI systems', 'Estimate hours + ₹ saved', 'Phased build plan'].map(
                    (t, i) => (
                        <div key={t} className="flex items-center gap-3 rounded-xl border border-line bg-cream px-4 py-2.5">
                            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-clay/15 font-mono text-[10px] text-clay-deep">
                                {i + 1}
                            </span>
                            <span className="text-sm text-ink">{t}</span>
                        </div>
                    )
                )}
            </div>
        );
    }
    // default: index 0 — workflow nodes
    return (
        <div className="space-y-0">
            {[
                { t: 'Trigger', d: 'New order received' },
                { t: 'AI', d: 'Validate · route · decide' },
                { t: 'Action', d: 'Update stock · notify team' },
            ].map((n, i, arr) => (
                <div key={n.t}>
                    <div className="flex items-center gap-3 rounded-2xl border border-line bg-cream px-4 py-3">
                        <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-clay/12 font-mono text-sm font-semibold text-clay-deep">
                            {i + 1}
                        </span>
                        <div>
                            <div className="text-sm font-semibold text-ink">{n.t}</div>
                            <div className="text-xs text-umber">{n.d}</div>
                        </div>
                    </div>
                    {i < arr.length - 1 && <div className="ml-[2.6rem] h-4 w-px bg-line" aria-hidden />}
                </div>
            ))}
        </div>
    );
};

const AutomationConsole = () => {
    const [active, setActive] = useState(0);
    const refs = useRef<(HTMLDivElement | null)[]>([]);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const idx = Number((entry.target as HTMLElement).dataset.index);
                        setActive(idx);
                    }
                });
            },
            { rootMargin: '-45% 0px -45% 0px', threshold: 0 }
        );
        refs.current.forEach((el) => el && observer.observe(el));
        return () => observer.disconnect();
    }, []);

    return (
        <section className="border-y border-line bg-paper py-24 md:py-32">
            <Container>
                <SectionHeading
                    eyebrow="See it work"
                    title="Watch the busywork disappear"
                    subtitle="Scroll through what a SmartVyapari system actually does once it's running."
                />

                <div className="mt-14 grid gap-12 lg:grid-cols-2">
                    {/* Sticky console */}
                    <div className="hidden lg:block">
                        <div className="sticky top-28 rounded-3xl border border-line bg-cream p-6 shadow-soft">
                            <div className="mb-5 flex items-center justify-between">
                                <span className="font-mono text-xs uppercase tracking-wider text-umber">
                                    {STEPS[active].label}
                                </span>
                                <span className="flex items-center gap-1.5 text-xs font-medium text-clay">
                                    <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-clay" /> live
                                </span>
                            </div>
                            <div key={active} className="animate-fade-in">
                                <Mock index={active} />
                            </div>
                        </div>
                    </div>

                    {/* Scrolling steps */}
                    <div className="space-y-6 lg:space-y-0">
                        {STEPS.map((s, i) => (
                            <div
                                key={s.key}
                                data-index={i}
                                ref={(el) => { refs.current[i] = el; }}
                                className="lg:flex lg:min-h-[70vh] lg:flex-col lg:justify-center"
                            >
                                <span className="font-mono text-xs uppercase tracking-wider text-clay">{s.label}</span>
                                <h3
                                    className={`mt-3 font-display text-2xl font-semibold tracking-tight transition-colors md:text-3xl ${
                                        active === i ? 'text-ink' : 'lg:text-ink/35'
                                    }`}
                                >
                                    {s.title}
                                </h3>
                                <p className="mt-3 max-w-md text-base leading-relaxed text-umber">{s.body}</p>
                                {/* Mobile inline mock */}
                                <div className="mt-5 rounded-2xl border border-line bg-cream p-5 lg:hidden">
                                    <Mock index={i} />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </Container>
        </section>
    );
};

export default AutomationConsole;
