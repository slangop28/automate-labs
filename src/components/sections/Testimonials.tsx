import Container from '../ui/Container';
import SectionHeading from '../ui/SectionHeading';
import Reveal from '../ui/Reveal';

interface Testimonial {
    quote: string;
    author: string;
    company: string;
    metric: string;
}

const testimonials: Testimonial[] = [
    {
        quote: 'AutomateLabs transformed how we manage our operations. What used to be a manual headache is now completely streamlined.',
        author: 'Benie Curves',
        company: 'Wellness & Lifestyle',
        metric: '500+ hours saved / month',
    },
    {
        quote: 'The automation systems they built let us handle 5x the volume without adding staff. Simply incredible.',
        author: 'Local Electrician',
        company: 'Professional Services',
        metric: '300% growth in bookings',
    },
    {
        quote: 'Our online presence and customer reach tripled within months. Their intelligent systems are a game-changer.',
        author: 'Shree Rang Trendz',
        company: 'Retail & Trends',
        metric: '200% increase in reach',
    },
];

const Testimonials = () => (
    <section id="results" className="border-y border-line bg-paper py-24 md:py-32">
        <Container>
            <SectionHeading
                eyebrow="Results"
                title="Owners who got their time back"
                subtitle="Real businesses, real numbers — the kind of outcome we're after on every build."
            />
            <div className="mt-14 grid gap-6 md:grid-cols-3">
                {testimonials.map((t, i) => (
                    <Reveal key={t.author} delay={i * 80} className="h-full">
                        <figure className="flex h-full flex-col rounded-2xl border border-line bg-cream p-7 shadow-soft">
                            <blockquote className="font-display text-lg leading-snug text-ink">"{t.quote}"</blockquote>
                            <figcaption className="mt-6 border-t border-line pt-5">
                                <div className="font-semibold text-ink">{t.author}</div>
                                <div className="text-sm text-umber">{t.company}</div>
                                <div className="mt-3 inline-flex rounded-full bg-clay/12 px-3 py-1 text-xs font-semibold text-clay-deep">
                                    {t.metric}
                                </div>
                            </figcaption>
                        </figure>
                    </Reveal>
                ))}
            </div>
        </Container>
    </section>
);

export default Testimonials;
