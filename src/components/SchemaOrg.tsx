import { useEffect } from 'react';
import type { Organization, Service, FAQPage, WithContext, Thing } from 'schema-dts';

interface SchemaOrgProps {
    schema: WithContext<Thing> | WithContext<Thing>[];
}

export const SchemaOrg = ({ schema }: SchemaOrgProps) => {
    useEffect(() => {
        const id = 'json-ld-structured-data';
        let script = document.getElementById(id) as HTMLScriptElement | null;
        if (!script) {
            script = document.createElement('script');
            script.id = id;
            script.type = 'application/ld+json';
            document.head.appendChild(script);
        }
        script.textContent = JSON.stringify(schema, null, 2);

        return () => {
            if (script && script.parentNode) {
                script.parentNode.removeChild(script);
            }
        };
    }, [schema]);

    return null;
};

// --- Standard Schemas for SmartVyapari ---

export const organizationSchema: WithContext<Organization> = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': 'https://smartvyapari.online/#organization',
    name: 'SmartVyapari',
    alternateName: 'Smart Vyapari AI Automation Agency',
    url: 'https://smartvyapari.online',
    logo: 'https://smartvyapari.online/vite.svg',
    description: "We don't sell AI slop. We build systems that save revenue. Custom AI workflows, voice & WhatsApp agents, AI filmmaking, and enterprise automation.",
    slogan: "We don't sell AI slop. We build systems that save revenue.",
    foundingLocation: {
        '@type': 'Place',
        name: 'Rajhans Belliza, Surat, Gujarat, India',
    },
    address: {
        '@type': 'PostalAddress',
        streetAddress: 'Rajhans Belliza',
        addressLocality: 'Surat',
        addressRegion: 'Gujarat',
        addressCountry: 'IN',
    },
    contactPoint: {
        '@type': 'ContactPoint',
        contactType: 'sales and customer service',
        email: 'hello@smartvyapari.online',
        availableLanguage: ['English', 'Hindi', 'Gujarati'],
    },
    sameAs: [
        'https://instagram.com/iamatul_28',
        'https://smartvyapari.online',
    ],
    knowsAbout: [
        'AI Workflow Automation',
        'WhatsApp AI Agents',
        'AI Voice Agents',
        'AI Filmmaking & Commercial Video Ads',
        'Enterprise RAG Knowledge Systems',
        'n8n Workflow Automation',
        'Claude Code Adoption',
    ],
};

export const serviceSchemas: WithContext<Service>[] = [
    {
        '@context': 'https://schema.org',
        '@type': 'Service',
        '@id': 'https://smartvyapari.online/#service-workflow-automation',
        serviceType: 'Custom AI Workflow Automation',
        name: 'Custom AI Automation Systems',
        provider: {
            '@id': 'https://smartvyapari.online/#organization',
        },
        description: 'End-to-end AI automation systems replacing manual data entry, order routing, CRM synchronization, and multi-app business workflows.',
        offers: {
            '@type': 'Offer',
            priceCurrency: 'INR',
            availability: 'https://schema.org/InStock',
        },
        areaServed: 'Worldwide',
    },
    {
        '@context': 'https://schema.org',
        '@type': 'Service',
        '@id': 'https://smartvyapari.online/#service-whatsapp-voice-agents',
        serviceType: 'Conversational AI & Voice Agents',
        name: 'AI Voice & WhatsApp Agents',
        provider: {
            '@id': 'https://smartvyapari.online/#organization',
        },
        description: '24/7 human-like conversational AI agents that qualify incoming leads, answer customer questions, book appointments, and sync data directly to your CRM.',
        offers: {
            '@type': 'Offer',
            priceCurrency: 'INR',
            availability: 'https://schema.org/InStock',
        },
        areaServed: 'Worldwide',
    },
    {
        '@context': 'https://schema.org',
        '@type': 'Service',
        '@id': 'https://smartvyapari.online/#service-ai-filmmaking',
        serviceType: 'AI Video Production & Filmmaking',
        name: 'AI Filmmaking & Commercial Ads',
        provider: {
            '@id': 'https://smartvyapari.online/#organization',
        },
        description: 'Cinematic, story-driven AI video production, high-converting social ads, UGC content, and programmatic video pipelines with Remotion.',
        offers: {
            '@type': 'Offer',
            priceCurrency: 'INR',
            availability: 'https://schema.org/InStock',
        },
        areaServed: 'Worldwide',
    },
    {
        '@context': 'https://schema.org',
        '@type': 'Service',
        '@id': 'https://smartvyapari.online/#service-ai-agents-rag',
        serviceType: 'Enterprise RAG & Autonomous AI Agents',
        name: 'Enterprise AI Agents & Knowledge Systems',
        provider: {
            '@id': 'https://smartvyapari.online/#organization',
        },
        description: 'Retrieval-Augmented Generation (RAG) agents that ingest enterprise documentation and deliver cited, verified responses in seconds without hallucination.',
        offers: {
            '@type': 'Offer',
            priceCurrency: 'INR',
            availability: 'https://schema.org/InStock',
        },
        areaServed: 'Worldwide',
    },
    {
        '@context': 'https://schema.org',
        '@type': 'Service',
        '@id': 'https://smartvyapari.online/#service-strategy-consulting',
        serviceType: 'AI Strategy & Operations Consulting',
        name: 'AI Strategy, Audit & Operations Consulting',
        provider: {
            '@id': 'https://smartvyapari.online/#organization',
        },
        description: '30-minute operational audits, high-ROI workflow identification, and custom automation architecture roadmaps before any code is written.',
        offers: {
            '@type': 'Offer',
            priceCurrency: 'INR',
            availability: 'https://schema.org/InStock',
        },
        areaServed: 'Worldwide',
    },
];

export const faqSchema: WithContext<FAQPage> = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    '@id': 'https://smartvyapari.online/#faq',
    mainEntity: [
        {
            '@type': 'Question',
            name: "What makes SmartVyapari different from generic AI tools and freelancers?",
            acceptedAnswer: {
                '@type': 'Answer',
                text: "We don't sell AI slop or generic chat wrappers. We architect production-grade, end-to-end automation systems integrated directly into your databases, CRM, and communication channels, with measurable time and revenue ROI mapped upfront.",
            },
        },
        {
            '@type': 'Question',
            name: "How long does it take to build and deploy a custom AI automation system?",
            acceptedAnswer: {
                '@type': 'Answer',
                text: "Most custom workflows and WhatsApp/voice agents are deployed within 1 to 3 weeks following our 4-step framework: Audit, Strategy, Build, and Scale.",
            },
        },
        {
            '@type': 'Question',
            name: "Can AI WhatsApp and voice agents integrate with our existing CRM and tools?",
            acceptedAnswer: {
                '@type': 'Answer',
                text: "Yes. Our systems natively integrate with platforms like HubSpot, Zoho, Google Sheets, Supabase, PostgreSQL, Salesforce, and custom REST APIs via automated engines like n8n.",
            },
        },
        {
            '@type': 'Question',
            name: "Is my business data and customer information secure?",
            acceptedAnswer: {
                '@type': 'Answer',
                text: "Yes. We implement enterprise-grade security protocols, including AES-256 encryption, strict NDAs, zero-retention API policies, and isolated database architectures.",
            },
        },
        {
            '@type': 'Question',
            name: "What does the initial audit involve?",
            acceptedAnswer: {
                '@type': 'Answer',
                text: "A 30-minute consultation where we map your repetitive bottlenecks, calculate exact hours and rupees saved, and present a prioritized automation roadmap before you make any commitment.",
            },
        },
    ],
};
