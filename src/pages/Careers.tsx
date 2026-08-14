import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import Container from '../components/ui/Container';
import SectionHeading from '../components/ui/SectionHeading';
import Reveal from '../components/ui/Reveal';
import Icons from '../components/ui/Icons';
import type { FC } from 'react';

const reasons: { icon: FC<{ className?: string }>; title: string; desc: string }[] = [
    { icon: Icons.Bolt, title: 'Cutting-edge tech', desc: 'Work with the latest AI frameworks and automation engines to build systems that scale.' },
    { icon: Icons.Spark, title: 'Elite collaboration', desc: 'Join a concentrated team of engineers and designers who build world-class assets.' },
    { icon: Icons.Trending, title: 'Real impact', desc: 'Watch your work save thousands of manual hours and move real business bottom lines.' },
];

const Careers = () => (
    <div className="min-h-screen bg-cream text-ink">
        <Navbar />

        <section className="bg-grain relative overflow-hidden pt-32 pb-16 md:pt-40 md:pb-20">
            <div className="pointer-events-none absolute -right-24 -top-24 h-96 w-96 rounded-full bg-clay-soft/40 blur-3xl" />
            <Container className="relative">
                <Reveal>
                    <div className="mb-5 flex items-center gap-2">
                        <span className="h-px w-6 bg-clay" />
                        <span className="text-xs font-semibold uppercase tracking-[0.2em] text-clay">Careers</span>
                    </div>
                    <h1 className="max-w-3xl font-display text-4xl font-semibold leading-[1.05] tracking-tight text-ink md:text-6xl">
                        Join the team building <span className="text-clay">autonomous work.</span>
                    </h1>
                    <p className="mt-6 max-w-2xl text-lg leading-relaxed text-umber">
                        We're looking for high-performers ready to redefine how businesses run. If you build with
                        purpose, we want to hear from you.
                    </p>
                </Reveal>
            </Container>
        </section>

        <section className="py-20 md:py-28">
            <Container>
                <SectionHeading center eyebrow="Why us" title="Why SmartVyapari?" />
                <div className="mt-14 grid gap-6 md:grid-cols-3">
                    {reasons.map((r, i) => (
                        <Reveal key={r.title} delay={i * 80} className="h-full">
                            <div className="flex h-full flex-col rounded-2xl border border-line bg-paper p-8 shadow-soft">
                                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-clay/12 text-clay-deep">
                                    <r.icon className="h-6 w-6" />
                                </div>
                                <h3 className="font-display text-xl font-semibold tracking-tight text-ink">{r.title}</h3>
                                <p className="mt-2 text-sm leading-relaxed text-umber">{r.desc}</p>
                            </div>
                        </Reveal>
                    ))}
                </div>
            </Container>
        </section>

        <section className="border-t border-line bg-paper py-24 md:py-28">
            <Container className="max-w-3xl">
                <Reveal>
                    <div className="rounded-3xl border border-line bg-cream p-10 text-center shadow-soft md:p-14">
                        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-clay/12 text-clay-deep">
                            <Icons.Bolt className="h-7 w-7" />
                        </div>
                        <h2 className="font-display text-3xl font-semibold tracking-tight text-ink">Join our talent pool</h2>
                        <p className="mx-auto mt-4 max-w-xl leading-relaxed text-umber">
                            We're constantly growing. Even if you don't see a specific role, we'd love to hear from elite
                            engineers, designers, and automation specialists.
                        </p>
                        <p className="mt-8 text-xs font-semibold uppercase tracking-wider text-umber">Send resume &amp; portfolio to</p>
                        <a
                            href="mailto:atul.pandey0028@gmail.com"
                            className="mt-2 inline-block font-display text-2xl font-semibold text-clay hover:text-clay-deep"
                        >
                            atul.pandey0028@gmail.com
                        </a>
                    </div>
                </Reveal>
            </Container>
        </section>

        <Footer />
    </div>
);

export default Careers;
