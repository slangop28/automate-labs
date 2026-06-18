import Container from '../ui/Container';
import Reveal from '../ui/Reveal';
import Icons from '../ui/Icons';
import ContactForm from '../forms/ContactForm';

const points = [
    'A 30-minute strategy session, no commitment',
    "We map exactly what AI can take off your team's plate",
    "You get the numbers — hours and ₹ saved — before any build",
];

const ContactSection = () => (
    <section id="contact" className="py-24 md:py-32">
        <Container>
            <div className="grid items-start gap-12 lg:grid-cols-2">
                <Reveal>
                    <div>
                        <div className="mb-4 flex items-center gap-2">
                            <span className="h-px w-6 bg-clay" />
                            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-clay">Book a free audit</span>
                        </div>
                        <h2 className="font-display text-3xl font-semibold leading-tight tracking-tight text-ink md:text-5xl">
                            Have a process that repeats every day?
                        </h2>
                        <p className="mt-4 max-w-md text-lg leading-relaxed text-umber">
                            That's the one we automate. Tell us what's eating your team's time and we'll show you the
                            fastest way to fix it.
                        </p>

                        <ul className="mt-8 space-y-3">
                            {points.map((p) => (
                                <li key={p} className="flex gap-3 text-ink/85">
                                    <Icons.Check className="mt-0.5 h-5 w-5 flex-shrink-0 text-clay" />
                                    {p}
                                </li>
                            ))}
                        </ul>

                        <div className="mt-8 rounded-2xl border border-clay/30 bg-clay/8 px-5 py-4">
                            <p className="text-sm leading-relaxed text-ink/85">
                                <span className="font-semibold text-clay-deep">Early-mover pricing:</span> we're still
                                scaling, so we offer the most competitive rates around — early clients lock in multiple discounts.
                            </p>
                        </div>

                        <div className="mt-8 flex flex-wrap gap-4 text-sm">
                            <a href="mailto:atul.pandey0028@gmail.com" className="inline-flex items-center gap-2 font-medium text-ink hover:text-clay">
                                <Icons.ArrowUpRight className="h-4 w-4" /> atul.pandey0028@gmail.com
                            </a>
                            <a href="https://instagram.com/iamatul_28" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 font-medium text-ink hover:text-clay">
                                <Icons.ArrowUpRight className="h-4 w-4" /> @iamatul_28
                            </a>
                        </div>
                    </div>
                </Reveal>

                <Reveal delay={120}>
                    <ContactForm />
                </Reveal>
            </div>
        </Container>
    </section>
);

export default ContactSection;
