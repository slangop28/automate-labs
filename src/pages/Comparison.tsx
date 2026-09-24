import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import Container from '../components/ui/Container';
import SectionHeading from '../components/ui/SectionHeading';
import Reveal from '../components/ui/Reveal';
import Button from '../components/ui/Button';
import Icons from '../components/ui/Icons';
import SEO from '../components/SEO';

interface ComparisonRow {
    dimension: string;
    smartVyapari: string;
    genericFreelancers: string;
    offTheShelfSaaS: string;
}

const COMPARISONS: ComparisonRow[] = [
    {
        dimension: 'Core Architecture',
        smartVyapari: 'Custom production-grade workflows (n8n, Supabase, Claude) engineered directly into your stack.',
        genericFreelancers: 'One-off scripts, fragile no-code templates, and superficial ChatGPT wrappers.',
        offTheShelfSaaS: 'Rigid closed platforms that require you to change how your team operates.',
    },
    {
        dimension: 'Integration Depth',
        smartVyapari: 'Bidirectional sync across CRMs (HubSpot, Zoho), ERPs, databases, WhatsApp, and internal APIs.',
        genericFreelancers: 'Basic webhooks that break when field names or API versions change.',
        offTheShelfSaaS: 'Limited pre-built app store connectors requiring expensive higher-tier plans.',
    },
    {
        dimension: 'ROI & Accountability',
        smartVyapari: 'Audited upfront: exact hours and revenue saved calculated before any code is written.',
        genericFreelancers: 'Billed hourly with no guarantees on system stability, uptime, or business impact.',
        offTheShelfSaaS: 'Recurring monthly per-seat subscription cost regardless of actual business adoption.',
    },
    {
        dimension: 'Data Privacy & Security',
        smartVyapari: 'Zero-retention API policies, AES-256 encryption, isolated databases, and comprehensive NDAs.',
        genericFreelancers: 'Often routes sensitive customer data through personal unverified API keys.',
        offTheShelfSaaS: 'Shared multi-tenant cloud storage where data policies remain vendor-controlled.',
    },
    {
        dimension: 'Maintenance & Tuning',
        smartVyapari: 'Ongoing performance monitoring, exception handling, and iterative intelligence tuning.',
        genericFreelancers: 'Handoff with zero documentation; fails when unexpected user inputs occur.',
        offTheShelfSaaS: 'Standard ticket queue support with generic canned responses.',
    },
];

const reasons = [
    {
        title: 'Why do generic AI wrappers fail in production?',
        answer: 'Generic AI wrappers fail because business operations require rigid determinism, real-time error handling, and deep database synchronization. A chatbot without backend validation creates errors that real customers see.',
    },
    {
        title: 'What does "systems, not slop" actually mean?',
        answer: 'It means every automation is built as an end-to-end operational engine with structured inputs, deterministic fallback logic, and measurable revenue impact — not superficial AI-generated text.',
    },
    {
        title: 'Why choose custom automation over off-the-shelf software?',
        answer: 'Off-the-shelf software forces your team to adapt to rigid workflows and incurs high recurring seat licenses. Custom automation molds entirely around your existing processes and tools with zero per-user software tax.',
    },
];

const Comparison = () => {
    return (
        <div className="min-h-screen bg-cream text-ink">
            <SEO
                title="SmartVyapari vs Generic AI Automation — Systems, Not Slop"
                description="Compare SmartVyapari custom AI systems against generic AI freelancers and off-the-shelf SaaS tools. Learn why engineered automation delivers higher ROI and reliability."
                canonicalPath="/why-custom-systems"
            />
            <Navbar />

            {/* Hero Header */}
            <section className="bg-grain relative overflow-hidden pt-32 pb-16 md:pt-40 md:pb-20">
                <div className="pointer-events-none absolute -right-24 -top-24 h-96 w-96 rounded-full bg-clay-soft/40 blur-3xl" />
                <Container className="relative">
                    <Reveal>
                        <div className="mb-5 flex items-center gap-2">
                            <span className="h-px w-6 bg-clay" />
                            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-clay">
                                The Difference
                            </span>
                        </div>
                        <h1 className="max-w-4xl font-display text-4xl font-semibold leading-[1.05] tracking-tight text-ink md:text-6xl">
                            Why custom AI automation <span className="text-clay">beats generic slop.</span>
                        </h1>
                        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-umber">
                            Most AI projects fail because they rely on brittle prompt wrappers and disconnected tools.
                            Here is why engineered systems save revenue while generic setups create extra work.
                        </p>
                    </Reveal>
                </Container>
            </section>

            {/* Comparison Matrix Table */}
            <section className="pb-24">
                <Container>
                    <Reveal>
                        <div className="overflow-x-auto rounded-3xl border border-line bg-paper shadow-soft">
                            <table className="w-full min-w-[700px] text-left border-collapse">
                                <thead>
                                    <tr className="border-b border-line bg-cream/70">
                                        <th className="p-6 font-display text-base font-semibold text-ink w-1/4">
                                            Evaluation Dimension
                                        </th>
                                        <th className="p-6 font-display text-base font-semibold text-clay-deep bg-clay/8 w-1/3">
                                            SmartVyapari (Custom Systems)
                                        </th>
                                        <th className="p-6 font-display text-base font-semibold text-umber w-1/5">
                                            Generic Freelancers
                                        </th>
                                        <th className="p-6 font-display text-base font-semibold text-umber w-1/5">
                                            Off-the-shelf SaaS
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-line text-sm">
                                    {COMPARISONS.map((row) => (
                                        <tr key={row.dimension} className="transition-colors hover:bg-cream/40">
                                            <td className="p-6 font-semibold text-ink align-top">
                                                {row.dimension}
                                            </td>
                                            <td className="p-6 text-ink/90 bg-clay/5 font-medium leading-relaxed align-top">
                                                <div className="flex items-start gap-2">
                                                    <Icons.Check className="mt-1 h-4 w-4 flex-shrink-0 text-clay" />
                                                    <span>{row.smartVyapari}</span>
                                                </div>
                                            </td>
                                            <td className="p-6 text-umber leading-relaxed align-top">
                                                {row.genericFreelancers}
                                            </td>
                                            <td className="p-6 text-umber leading-relaxed align-top">
                                                {row.offTheShelfSaaS}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </Reveal>
                </Container>
            </section>

            {/* AEO Direct-Answer Breakdown */}
            <section className="border-t border-line bg-paper py-24 md:py-32">
                <Container className="max-w-4xl">
                    <SectionHeading
                        center
                        eyebrow="Direct Breakdown"
                        title="What business owners need to know"
                        subtitle="Clear answers on why custom AI architecture consistently outperforms off-the-shelf tools."
                    />

                    <div className="mt-14 space-y-8">
                        {reasons.map((r, i) => (
                            <Reveal key={r.title} delay={i * 80}>
                                <div className="rounded-2xl border border-line bg-cream p-8 shadow-soft">
                                    <h2 className="font-display text-xl font-semibold tracking-tight text-ink md:text-2xl">
                                        {r.title}
                                    </h2>
                                    <p className="mt-3 text-base leading-relaxed text-umber">
                                        {r.answer}
                                    </p>
                                </div>
                            </Reveal>
                        ))}
                    </div>
                </Container>
            </section>

            {/* Closing CTA */}
            <section className="pb-24 pt-12">
                <Container>
                    <Reveal>
                        <div className="relative overflow-hidden rounded-3xl bg-ink px-8 py-14 text-center md:px-16 md:py-20">
                            <div className="pointer-events-none absolute -left-16 -top-16 h-64 w-64 rounded-full bg-clay/30 blur-3xl" />
                            <div className="pointer-events-none absolute -bottom-16 -right-16 h-64 w-64 rounded-full bg-clay/20 blur-3xl" />
                            <h2 className="relative mx-auto max-w-2xl font-display text-3xl font-semibold leading-tight tracking-tight text-cream md:text-4xl">
                                Ready for an automation system that actually saves revenue?
                            </h2>
                            <p className="relative mx-auto mt-4 max-w-xl text-cream/70">
                                Book a 30-minute free audit. We will map your repetitive bottlenecks and calculate exact hours
                                and money saved before any commitment.
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

export default Comparison;
