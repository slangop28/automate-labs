import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Icons from '../ui/Icons';
import Button from '../ui/Button';

type NavLink = { label: string; to?: string; href?: string };

const navLinks: NavLink[] = [
    { label: 'Services', href: '/#services' },
    { label: 'Case Studies', to: '/case-studies' },
    { label: 'Learning', to: '/learning' },
    { label: 'Portfolio', to: '/portfolio' },
    { label: 'About', to: '/about' },
];

const Logo = () => (
    <Link to="/" className="flex items-center gap-2.5">
        <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-clay text-paper shadow-clay">
            <Icons.Bolt className="h-5 w-5" />
        </span>
        <span className="font-display text-lg font-semibold tracking-tight text-ink">
            Automate<span className="text-clay">Labs</span>
        </span>
    </Link>
);

const Navbar = () => {
    const [scrolled, setScrolled] = useState(false);
    const [open, setOpen] = useState(false);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 12);
        onScroll();
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    const renderLink = (l: (typeof navLinks)[number]) => {
        const cls = 'text-sm font-medium text-ink/80 transition-colors hover:text-clay';
        return l.to ? (
            <Link key={l.label} to={l.to} className={cls} onClick={() => setOpen(false)}>
                {l.label}
            </Link>
        ) : (
            <a key={l.label} href={l.href} className={cls} onClick={() => setOpen(false)}>
                {l.label}
            </a>
        );
    };

    return (
        <header
            className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
                scrolled ? 'border-b border-line bg-cream/80 backdrop-blur-md' : 'border-b border-transparent'
            }`}
        >
            <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4 md:px-8">
                <Logo />

                <div className="hidden items-center gap-8 md:flex">
                    {navLinks.map(renderLink)}
                </div>

                <div className="hidden md:block">
                    <Button href="/#contact" className="px-5 py-2.5">
                        Book a free audit
                        <Icons.ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                    </Button>
                </div>

                <button
                    className="rounded-lg p-2 text-ink md:hidden"
                    onClick={() => setOpen((v) => !v)}
                    aria-label={open ? 'Close menu' : 'Open menu'}
                    aria-expanded={open}
                >
                    {open ? <Icons.X /> : <Icons.Menu />}
                </button>
            </nav>

            {open && (
                <div className="border-t border-line bg-cream/95 backdrop-blur-md md:hidden">
                    <div className="flex flex-col gap-4 px-6 py-6">
                        {navLinks.map(renderLink)}
                        <Button href="/#contact" className="mt-2 w-full">
                            Book a free audit
                            <Icons.ArrowRight className="h-4 w-4" />
                        </Button>
                    </div>
                </div>
            )}
        </header>
    );
};

export default Navbar;
