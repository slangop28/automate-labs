import Container from '../ui/Container';
import SectionHeading from '../ui/SectionHeading';
import Reveal from '../ui/Reveal';

const steps = [
    { step: '01', title: 'Audit', desc: 'We dig into your workflows and find what quietly eats the most time.' },
    { step: '02', title: 'Strategy', desc: 'We map the highest-ROI systems and the order to build them in.' },
    { step: '03', title: 'Build', desc: 'Agile engineering and deployment — your system, not a template.' },
    { step: '04', title: 'Scale', desc: 'We monitor, tune, and expand as the results compound.' },
];

const Process = () => (
    <section id="methodology" className="py-24 md:py-32">
        <Container>
            <SectionHeading
                eyebrow="How we work"
                title="A clear path from chaos to system"
                subtitle="No mystery, no endless scoping calls. Four steps from your first audit to a system that runs itself."
            />
            <div className="mt-14 grid gap-8 md:grid-cols-4">
                {steps.map((s, i) => (
                    <Reveal key={s.step} delay={i * 80}>
                        <div className="relative">
                            <div className="font-display text-5xl font-semibold text-clay/25">{s.step}</div>
                            <h3 className="mt-2 font-display text-xl font-semibold tracking-tight text-ink">{s.title}</h3>
                            <p className="mt-2 text-sm leading-relaxed text-umber">{s.desc}</p>
                        </div>
                    </Reveal>
                ))}
            </div>
        </Container>
    </section>
);

export default Process;
