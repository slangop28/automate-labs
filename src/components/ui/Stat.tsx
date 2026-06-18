import { useEffect, useRef, useState } from 'react';

interface StatProps {
    /** Numeric target to count up to */
    value: number;
    prefix?: string;
    suffix?: string;
    label: string;
}

/** Counts up from 0 to `value` once it scrolls into view. */
const Stat = ({ value, prefix = '', suffix = '', label }: StatProps) => {
    const ref = useRef<HTMLDivElement>(null);
    const [display, setDisplay] = useState(0);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;

        const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (reduce) {
            setDisplay(value);
            return;
        }

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (!entry.isIntersecting) return;
                observer.disconnect();
                const duration = 1100;
                const start = performance.now();
                const tick = (now: number) => {
                    const t = Math.min((now - start) / duration, 1);
                    const eased = 1 - Math.pow(1 - t, 3);
                    setDisplay(Math.round(eased * value));
                    if (t < 1) requestAnimationFrame(tick);
                };
                requestAnimationFrame(tick);
            },
            { threshold: 0.5 }
        );
        observer.observe(el);
        return () => observer.disconnect();
    }, [value]);

    return (
        <div ref={ref}>
            <div className="font-display text-3xl font-semibold tracking-tight text-ink md:text-4xl">
                {prefix}
                {display}
                {suffix}
            </div>
            <div className="mt-1 text-xs font-medium uppercase tracking-wider text-umber">{label}</div>
        </div>
    );
};

export default Stat;
