import { Link } from 'react-router-dom';
import Icons from '../ui/Icons';

type FooterLink = { label: string; to?: string; href?: string };
type FooterColumn = { title: string; links: FooterLink[] };

const columns: FooterColumn[] = [
    {
        title: 'Services',
        links: [
            { label: 'Custom AI Automation', href: '/#services' },
            { label: 'Voice & WhatsApp Agents', href: '/#services' },
            { label: 'AI Filmmaking', href: '/#services' },
            { label: 'AI Strategy', href: '/#services' },
        ],
    },
    {
        title: 'Company',
        links: [
            { label: 'Case Studies', to: '/case-studies' },
            { label: 'Learning', to: '/learning' },
            { label: 'Portfolio', to: '/portfolio' },
            { label: 'About', to: '/about' },
        ],
    },
    {
        title: 'Legal',
        links: [
            { label: 'Privacy Policy', to: '/privacy' },
            { label: 'Careers', to: '/careers' },
        ],
    },
];

const Footer = () => (
    <footer className="border-t border-line bg-paper">
        <div className="mx-auto max-w-6xl px-6 py-16 md:px-8">
            <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
                <div>
                    <div className="flex items-center gap-2.5">
                        <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-clay text-paper">
                            <Icons.Bolt className="h-5 w-5" />
                        </span>
                        <span className="font-display text-lg font-semibold tracking-tight text-ink">
                            Smart<span className="text-clay">Vyapari</span>
                        </span>
                    </div>
                    <p className="mt-4 max-w-xs font-display text-lg leading-snug text-ink">
                        We don't sell AI slop. We build end-to-end systems that save revenue.
                    </p>
                </div>

                {columns.map((col) => (
                    <div key={col.title}>
                        <h4 className="text-xs font-semibold uppercase tracking-[0.18em] text-umber">{col.title}</h4>
                        <ul className="mt-4 space-y-3">
                            {col.links.map((l) => (
                                <li key={l.label}>
                                    {l.to ? (
                                        <Link to={l.to} className="text-sm text-ink/75 transition-colors hover:text-clay">
                                            {l.label}
                                        </Link>
                                    ) : (
                                        <a href={l.href} className="text-sm text-ink/75 transition-colors hover:text-clay">
                                            {l.label}
                                        </a>
                                    )}
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>

            <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-line pt-8 text-sm text-umber md:flex-row">
                <span>© {new Date().getFullYear()} SmartVyapari · Ahmedabad, India</span>
                <span className="font-mono text-xs">built with intelligent systems</span>
            </div>
        </div>
    </footer>
);

export default Footer;
