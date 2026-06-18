import Container from '../ui/Container';
import SectionHeading from '../ui/SectionHeading';
import Reveal from '../ui/Reveal';
import Icons from '../ui/Icons';
import type { FC } from 'react';

interface Service {
    icon: FC<{ className?: string }>;
    title: string;
    desc: string;
    points: string[];
}

const services: Service[] = [
    {
        icon: Icons.Cpu,
        title: 'Custom AI Automation Systems',
        desc: 'The repetitive work, handled end to end — from lead intake to invoicing.',
        points: ['AI SDR & outreach engines', 'Intelligent website chatbots', 'Internal ops & invoicing automation', 'AI-powered CRMs & dashboards'],
    },
    {
        icon: Icons.Phone,
        title: 'AI Voice & WhatsApp Agents',
        desc: '24/7 human-like agents that answer, qualify, book, and follow up — on call and on WhatsApp.',
        points: ['Inbound & outbound calling', 'Lead qualification & booking', 'WhatsApp automations', 'CRM updates & call summaries'],
    },
    {
        icon: Icons.Film,
        title: 'AI Filmmaking',
        desc: 'Cinematic, story-driven AI video for brands and products — at a fraction of a shoot day.',
        points: ['Product & brand cinematics', 'AI ads & UGC content', 'Founder avatars', 'Fast, low-cost iterations'],
    },
    {
        icon: Icons.Spark,
        title: 'AI Agents',
        desc: 'Smart agents that automate tasks, answer questions, and support workflows — built to scale.',
        points: ['Task & workflow automation', 'Lead-gen & support agents', 'Knowledge-grounded (RAG)', 'Plugs into your stack'],
    },
    {
        icon: Icons.Compass,
        title: 'AI Strategy & Consulting',
        desc: "Not sure what to automate? We audit operations and map the highest-ROI systems first.",
        points: ['Operations audit', 'Automation roadmap', 'ROI prioritisation', 'Implementation plan'],
    },
];

const ServiceCard = ({ service }: { service: Service }) => (
    <div className="group flex h-full flex-col rounded-2xl border border-line bg-paper p-7 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:border-clay/40 hover:shadow-lift">
        <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-clay/12 text-clay-deep transition-colors group-hover:bg-clay group-hover:text-paper">
            <service.icon className="h-6 w-6" />
        </div>
        <h3 className="font-display text-xl font-semibold tracking-tight text-ink">{service.title}</h3>
        <p className="mt-2 text-sm leading-relaxed text-umber">{service.desc}</p>
        <ul className="mt-5 space-y-2.5 border-t border-line pt-5">
            {service.points.map((p) => (
                <li key={p} className="flex gap-2 text-sm text-ink/85">
                    <Icons.Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-clay" />
                    {p}
                </li>
            ))}
        </ul>
    </div>
);

const Services = () => (
    <section id="services" className="py-24 md:py-32">
        <Container>
            <SectionHeading
                eyebrow="What we build"
                title={<>Five ways we put AI to work</>}
                subtitle="Every engagement starts with the same question: what repeats in your business? Then we build the system that handles it."
            />
            <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {services.map((s, i) => (
                    <Reveal key={s.title} delay={i * 70} className="h-full">
                        <ServiceCard service={s} />
                    </Reveal>
                ))}
                {/* Closing prompt card */}
                <Reveal delay={services.length * 70} className="h-full">
                    <div className="flex h-full flex-col justify-center rounded-2xl border border-dashed border-clay/40 bg-clay/5 p-7">
                        <h3 className="font-display text-xl font-semibold tracking-tight text-ink">
                            If it repeats, we can automate it.
                        </h3>
                        <p className="mt-2 text-sm leading-relaxed text-umber">
                            Don't see your exact use case? That's most of our work. Tell us the process and we'll scope it.
                        </p>
                        <a href="#contact" className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-clay-deep hover:text-clay">
                            Start a conversation <Icons.ArrowRight className="h-4 w-4" />
                        </a>
                    </div>
                </Reveal>
            </div>
        </Container>
    </section>
);

export default Services;
