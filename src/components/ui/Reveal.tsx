import { useEffect, useRef, useState, type ReactNode } from 'react';

interface RevealProps {
    children: ReactNode;
    /** Stagger delay in ms */
    delay?: number;
    className?: string;
    as?: 'div' | 'section' | 'li' | 'article';
}

/**
 * Fades + slides its children up once when scrolled into view.
 * Respects prefers-reduced-motion via the .reveal rules in index.css.
 */
const Reveal = ({ children, delay = 0, className = '', as = 'div' }: RevealProps) => {
    const ref = useRef<HTMLDivElement>(null);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setVisible(true);
                    observer.disconnect();
                }
            },
            { threshold: 0.15, rootMargin: '0px 0px -10% 0px' }
        );
        observer.observe(el);
        return () => observer.disconnect();
    }, []);

    const Tag = as as 'div';
    return (
        <Tag
            ref={ref}
            className={`reveal ${visible ? 'is-visible' : ''} ${className}`}
            style={{ animationDelay: `${delay}ms` }}
        >
            {children}
        </Tag>
    );
};

export default Reveal;
