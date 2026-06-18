import type { ReactNode } from 'react';

interface SectionHeadingProps {
    eyebrow?: string;
    title: ReactNode;
    subtitle?: string;
    center?: boolean;
    className?: string;
}

const SectionHeading = ({ eyebrow, title, subtitle, center = false, className = '' }: SectionHeadingProps) => (
    <div className={`${center ? 'mx-auto text-center' : ''} max-w-2xl ${className}`}>
        {eyebrow && (
            <div className={`mb-4 flex items-center gap-2 ${center ? 'justify-center' : ''}`}>
                <span className="h-px w-6 bg-clay" />
                <span className="text-xs font-semibold uppercase tracking-[0.2em] text-clay">{eyebrow}</span>
            </div>
        )}
        <h2 className="font-display text-3xl font-semibold leading-tight tracking-tight text-ink md:text-5xl">
            {title}
        </h2>
        {subtitle && <p className="mt-4 text-lg leading-relaxed text-umber">{subtitle}</p>}
    </div>
);

export default SectionHeading;
