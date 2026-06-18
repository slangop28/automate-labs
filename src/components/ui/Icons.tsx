import type { FC, ReactNode } from 'react';

interface IconProps {
    className?: string;
}

const base = (children: ReactNode): FC<IconProps> => ({ className = 'w-5 h-5' }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.8}
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
    >
        {children}
    </svg>
);

export const Icons = {
    ArrowRight: base(<><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></>),
    ArrowLeft: base(<><path d="m12 19-7-7 7-7" /><path d="M19 12H5" /></>),
    ArrowUpRight: base(<><path d="M7 17 17 7" /><path d="M7 7h10v10" /></>),
    Plus: base(<><path d="M5 12h14" /><path d="M12 5v14" /></>),
    Minus: base(<path d="M5 12h14" />),
    Menu: base(<><path d="M4 6h16" /><path d="M4 12h16" /><path d="M4 18h16" /></>),
    X: base(<><path d="M18 6 6 18" /><path d="m6 6 12 12" /></>),
    Spark: base(<path d="M12 3v4m0 10v4m9-9h-4M7 12H3m13.95-6.95-2.83 2.83M9.88 14.12l-2.83 2.83m9.9 0-2.83-2.83M9.88 9.88 7.05 7.05" />),
    Bolt: base(<path d="M13 2 3 14h9l-1 8 10-12h-9l1-8z" />),
    Phone: base(<path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z" />),
    Film: base(<><rect x="3" y="3" width="18" height="18" rx="2" /><path d="M7 3v18M17 3v18M3 8h4M3 16h4M17 8h4M17 16h4" /></>),
    Cpu: base(<><rect x="6" y="6" width="12" height="12" rx="2" /><path d="M9 2v2M15 2v2M9 20v2M15 20v2M2 9h2M2 15h2M20 9h2M20 15h2" /></>),
    Compass: base(<><circle cx="12" cy="12" r="9" /><path d="m15.5 8.5-2 5-5 2 2-5 5-2z" /></>),
    Check: base(<path d="M20 6 9 17l-5-5" />),
    Trending: base(<><path d="m23 6-9.5 9.5-5-5L1 18" /><path d="M17 6h6v6" /></>),
    Clock: base(<><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></>),
    Shield: base(<><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /><path d="m9 12 2 2 4-4" /></>),
    Message: base(<path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />),
    Smartphone: base(<><rect x="5" y="2" width="14" height="20" rx="2" /><path d="M12 18h.01" /></>),
    Network: base(<><circle cx="18" cy="5" r="3" /><circle cx="6" cy="12" r="3" /><circle cx="18" cy="19" r="3" /><path d="m8.6 13.5 6.8 4M15.4 6.5l-6.8 4" /></>),
    Pen: base(<><path d="M12 20h9" /><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4 12.5-12.5z" /></>),
    Terminal: base(<><polyline points="4 17 10 11 4 5" /><line x1="12" y1="19" x2="20" y2="19" /></>),
};

export default Icons;
