import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';

type Variant = 'primary' | 'outline' | 'ghost';

interface ButtonProps {
    children: ReactNode;
    to?: string;
    href?: string;
    onClick?: () => void;
    variant?: Variant;
    className?: string;
    type?: 'button' | 'submit';
}

const variants: Record<Variant, string> = {
    primary:
        'bg-clay text-paper shadow-clay hover:bg-clay-deep hover:-translate-y-0.5 active:translate-y-0',
    outline:
        'border border-line bg-paper text-ink hover:border-clay hover:text-clay hover:-translate-y-0.5',
    ghost: 'text-ink hover:text-clay',
};

const base =
    'group inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold tracking-tight transition-all duration-300 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-clay focus-visible:ring-offset-2 focus-visible:ring-offset-cream';

const Button = ({ children, to, href, onClick, variant = 'primary', className = '', type = 'button' }: ButtonProps) => {
    const cls = `${base} ${variants[variant]} ${className}`;
    if (to) return <Link to={to} className={cls}>{children}</Link>;
    if (href) return <a href={href} className={cls}>{children}</a>;
    return <button type={type} onClick={onClick} className={cls}>{children}</button>;
};

export default Button;
