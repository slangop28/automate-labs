import Container from '../ui/Container';
import Button from '../ui/Button';
import Icons from '../ui/Icons';

const flowSteps = [
    { label: 'Trigger', detail: 'New lead · WhatsApp · form' },
    { label: 'AI', detail: 'Qualify · decide · draft reply' },
    { label: 'Action', detail: 'Book call · update CRM · notify you' },
];

const Hero = () => (
    <section className="bg-grain relative overflow-hidden pt-32 pb-20 md:pt-40 md:pb-28">
        <div className="pointer-events-none absolute -right-32 -top-24 h-[28rem] w-[28rem] rounded-full bg-clay-soft/40 blur-3xl" />
        <Container className="relative">
            <div className="grid items-center gap-14 lg:grid-cols-[1.1fr_0.9fr]">
                <div>
                    <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-line bg-paper px-4 py-1.5">
                        <span className="h-2 w-2 rounded-full bg-clay" />
                        <span className="text-xs font-semibold uppercase tracking-[0.16em] text-umber">
                            AI Automation Agency · Ahmedabad
                        </span>
                    </div>

                    <h1 className="font-display text-[2.6rem] font-semibold leading-[1.04] tracking-tight text-ink md:text-6xl">
                        We don't sell AI slop.
                        <br />
                        We build systems that <span className="text-clay">save revenue.</span>
                    </h1>

                    <p className="mt-6 max-w-xl text-lg leading-relaxed text-umber">
                        Automate Labs designs end-to-end AI automations — custom workflows, voice &amp; WhatsApp agents,
                        AI films, and agents — that replace repetitive work and grow your bottom line.
                    </p>

                    <div className="mt-9 flex flex-wrap gap-3">
                        <Button href="#contact">
                            Book a free audit
                            <Icons.ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                        </Button>
                        <Button variant="outline" to="/case-studies">
                            See case studies
                        </Button>
                    </div>
                </div>

                {/* Decorative "system" card — a tiny always-running pipeline */}
                <div className="relative">
                    <div className="animate-floaty rounded-3xl border border-line bg-paper p-6 shadow-lift">
                        <div className="mb-5 flex items-center justify-between">
                            <span className="font-mono text-xs uppercase tracking-wider text-umber">automation · live</span>
                            <span className="flex items-center gap-1.5 text-xs font-medium text-clay">
                                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-clay" /> running
                            </span>
                        </div>
                        <div className="space-y-3">
                            {flowSteps.map((s, i) => (
                                <div key={s.label}>
                                    <div className="flex items-center gap-3 rounded-2xl border border-line bg-cream px-4 py-3">
                                        <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-clay/12 font-mono text-sm font-semibold text-clay-deep">
                                            {i + 1}
                                        </span>
                                        <div>
                                            <div className="text-sm font-semibold text-ink">{s.label}</div>
                                            <div className="text-xs text-umber">{s.detail}</div>
                                        </div>
                                    </div>
                                    {i < flowSteps.length - 1 && (
                                        <div className="ml-[2.6rem] h-4 w-px bg-line" aria-hidden />
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </Container>
    </section>
);

export default Hero;
