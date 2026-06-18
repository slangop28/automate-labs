import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import Container from '../components/ui/Container';
import SectionHeading from '../components/ui/SectionHeading';
import Reveal from '../components/ui/Reveal';
import Button from '../components/ui/Button';
import Icons from '../components/ui/Icons';
import type { FC } from 'react';

const approach: { icon: FC<{ className?: string }>; title: string; desc: string }[] = [
    { icon: Icons.Compass, title: 'Deep analysis', desc: 'We study your workflows to find the highest-impact automation opportunities — not the flashiest ones.' },
    { icon: Icons.Cpu, title: 'Custom systems', desc: 'Every build is tailored to your business. No templates, no one-size-fits-all tools.' },
    { icon: Icons.Trending, title: 'Continuous improvement', desc: 'We monitor performance and keep tuning so your ROI climbs over time.' },
];

const stats = [
    { value: '500+', label: 'hours saved monthly' },
    { value: '85%', label: 'cost reduction' },
    { value: '24/7', label: 'intelligent runtime' },
];

const AboutUs = () => (
    <div className="min-h-screen bg-cream text-ink">
        <Navbar />

        <section className="bg-grain relative overflow-hidden pt-32 pb-16 md:pt-40 md:pb-20">
            <div className="pointer-events-none absolute -right-24 -top-24 h-96 w-96 rounded-full bg-clay-soft/40 blur-3xl" />
            <Container className="relative">
                <Reveal>
                    <div className="mb-5 flex items-center gap-2">
                        <span className="h-px w-6 bg-clay" />
                        <span className="text-xs font-semibold uppercase tracking-[0.2em] text-clay">Our story</span>
                    </div>
                    <h1 className="max-w-3xl font-display text-4xl font-semibold leading-[1.05] tracking-tight text-ink md:text-6xl">
                        We build the systems that <span className="text-clay">run the busywork.</span>
                    </h1>
                    <p className="mt-6 max-w-2xl text-lg leading-relaxed text-umber">
                        Automate Labs bridges the gap between human creativity and operational scale. We don't sell AI
                        slop — we engineer systems that solve real business problems and deliver measurable results.
                    </p>
                </Reveal>
            </Container>
        </section>

        {/* Mission + stats */}
        <section className="py-20 md:py-28">
            <Container>
                <div className="grid items-center gap-14 md:grid-cols-2">
                    <Reveal>
                        <div>
                            <h2 className="font-display text-3xl font-semibold tracking-tight text-ink md:text-4xl">Our mission</h2>
                            <p className="mt-5 text-lg leading-relaxed text-umber">
                                Repetitive tasks shouldn't consume valuable human time. Our mission is to empower
                                businesses with intelligent automation that works 24/7 — so teams focus on what
                                actually matters: innovation and growth.
                            </p>
                            <p className="mt-4 leading-relaxed text-umber">
                                We don't just build software. We architect strategic automation systems with a single
                                guiding belief: <span className="font-medium text-ink">if it repeats, it should be automated.</span>
                            </p>
                        </div>
                    </Reveal>
                    <Reveal delay={120}>
                        <div className="rounded-3xl border border-line bg-paper p-10 shadow-soft">
                            <div className="space-y-9">
                                {stats.map((s) => (
                                    <div key={s.label}>
                                        <div className="font-display text-4xl font-semibold tracking-tight text-clay">{s.value}</div>
                                        <div className="mt-1 text-xs font-medium uppercase tracking-wider text-umber">{s.label}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </Reveal>
                </div>
            </Container>
        </section>

        {/* Approach */}
        <section className="border-y border-line bg-paper py-24 md:py-32">
            <Container>
                <SectionHeading center eyebrow="How we think" title="Our approach" subtitle="Three principles behind every system we ship." />
                <div className="mt-14 grid gap-6 md:grid-cols-3">
                    {approach.map((a, i) => (
                        <Reveal key={a.title} delay={i * 80} className="h-full">
                            <div className="flex h-full flex-col rounded-2xl border border-line bg-cream p-8 shadow-soft">
                                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-clay/12 text-clay-deep">
                                    <a.icon className="h-6 w-6" />
                                </div>
                                <h3 className="font-display text-xl font-semibold tracking-tight text-ink">{a.title}</h3>
                                <p className="mt-2 text-sm leading-relaxed text-umber">{a.desc}</p>
                            </div>
                        </Reveal>
                    ))}
                </div>
                <div className="mt-14 text-center">
                    <Button href="/#contact">
                        Book a free audit
                        <Icons.ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                    </Button>
                </div>
            </Container>
        </section>

        <Footer />
    </div>
);

export default AboutUs;
