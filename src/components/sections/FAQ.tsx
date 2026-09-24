import { useState } from 'react';
import Container from '../ui/Container';
import SectionHeading from '../ui/SectionHeading';
import Reveal from '../ui/Reveal';
import Icons from '../ui/Icons';

interface FAQItem {
    question: string;
    answer: string;
}

const faqs: FAQItem[] = [
    {
        question: "What makes SmartVyapari different from generic AI tools and freelancers?",
        answer: "We don't sell AI slop or generic wrapper scripts. We architect production-grade, end-to-end automation systems integrated directly into your databases, CRM, and communication channels, with measurable time and revenue ROI calculated upfront.",
    },
    {
        question: "How long does it take to build and deploy a custom AI automation system?",
        answer: "Most custom workflows and WhatsApp/voice agents are deployed within 1 to 3 weeks following our 4-step framework: Audit, Strategy, Build, and Scale.",
    },
    {
        question: "Can AI WhatsApp and voice agents integrate with our existing CRM and tools?",
        answer: "Yes. Our systems natively integrate with platforms like HubSpot, Zoho, Google Sheets, Supabase, PostgreSQL, Salesforce, and custom REST APIs via automated engines like n8n.",
    },
    {
        question: "Is my business data and customer information secure?",
        answer: "Yes. We implement enterprise-grade security protocols, including AES-256 encryption, strict NDAs, zero-retention API configurations, and isolated database architectures.",
    },
    {
        question: "What does the initial free audit involve?",
        answer: "A 30-minute consultation where we map your team's repetitive bottlenecks, calculate exact hours and rupees saved, and present a prioritized automation roadmap before you make any commitment.",
    },
];

const FAQ = () => {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    return (
        <section id="faq" className="border-t border-line bg-paper py-24 md:py-32">
            <Container className="max-w-4xl">
                <SectionHeading
                    center
                    eyebrow="Frequently Asked Questions"
                    title="Everything you need to know"
                    subtitle="Clear answers on how we build, deploy, and guarantee ROI with custom AI automation."
                />

                <div className="mt-14 space-y-4">
                    {faqs.map((faq, i) => {
                        const isOpen = openIndex === i;
                        return (
                            <Reveal key={faq.question} delay={i * 60}>
                                <div
                                    className={`overflow-hidden rounded-2xl border transition-all duration-300 ${
                                        isOpen ? 'border-clay shadow-lift bg-cream' : 'border-line bg-cream/50 hover:border-clay/40'
                                    }`}
                                >
                                    <button
                                        onClick={() => setOpenIndex(isOpen ? null : i)}
                                        className="flex w-full items-center justify-between gap-4 p-6 text-left"
                                        aria-expanded={isOpen}
                                    >
                                        <h3 className="font-display text-lg font-semibold tracking-tight text-ink md:text-xl">
                                            {faq.question}
                                        </h3>
                                        <span
                                            className={`flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full border transition-transform ${
                                                isOpen ? 'rotate-180 border-clay bg-clay text-paper' : 'border-line text-ink'
                                            }`}
                                        >
                                            {isOpen ? <Icons.Minus className="h-4 w-4" /> : <Icons.Plus className="h-4 w-4" />}
                                        </span>
                                    </button>
                                    {isOpen && (
                                        <div className="animate-fade-in border-t border-line/60 px-6 pb-6 pt-4 text-sm leading-relaxed text-umber">
                                            <p>{faq.answer}</p>
                                        </div>
                                    )}
                                </div>
                            </Reveal>
                        );
                    })}
                </div>
            </Container>
        </section>
    );
};

export default FAQ;
