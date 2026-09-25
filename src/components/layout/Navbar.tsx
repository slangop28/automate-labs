import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Menu, X } from 'lucide-react';

interface NavItem {
  label: string;
  href?: string;
  to?: string;
}

const navItems: NavItem[] = [
  { label: 'Automation Systems', href: '/#ecosystem' },
  { label: 'AI Agents', href: '/#about' },
  { label: "Don't know what to build?", to: '/case-studies' },
  { label: 'Portfolio', to: '/portfolio' },
  { label: 'Learning Hub', to: '/learning' },
];

export const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-[#050304]/80 backdrop-blur-xl border-b border-[#FFB7C5]/10 py-3.5 shadow-2xl'
          : 'bg-transparent py-5 md:py-7'
      }`}
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8 md:px-10 lg:px-12 flex items-center justify-between">
        {/* Stylish Brand Wordmark — No square box, no 3 dots, no AUTONOMOUS AI badge */}
        <Link to="/" className="group flex items-center shrink-0">
          <span className="font-display text-2xl sm:text-3xl md:text-[2rem] font-light tracking-tight text-[#FDF8F9] transition-transform duration-300 group-hover:scale-[1.02]">
            Smart{' '}
            <span className="font-serif italic font-normal text-gradient-ai">
              Vyapari
            </span>
          </span>
        </Link>

        {/* Independent Floating Navigation Tabs — Custom refined spacing */}
        <nav className="hidden md:flex items-center gap-5 lg:gap-7 xl:gap-8">
          {navItems.map((item) => {
            const isQuestion = item.label.includes('build');
            const content = (
              <span
                className={`relative group font-medium transition-colors duration-300 ${
                  isQuestion
                    ? 'text-[#FFB7C5] hover:text-[#FDF8F9] font-serif italic text-sm lg:text-[15px]'
                    : 'text-[13px] lg:text-[13.5px] uppercase tracking-wider text-[#B89EA5] hover:text-[#FDF8F9]'
                }`}
              >
                {item.label}
                {/* Subtle refined rose hover accent line */}
                <span className="absolute -bottom-1 left-0 w-0 h-[1.5px] bg-gradient-to-r from-[#FFB7C5] to-[#E6A0B0] transition-all duration-300 ease-out group-hover:w-full opacity-80" />
              </span>
            );

            return item.to ? (
              <Link key={item.label} to={item.to} className="py-1">
                {content}
              </Link>
            ) : (
              <a key={item.label} href={item.href} className="py-1">
                {content}
              </a>
            );
          })}
        </nav>

        {/* Independent Luxury CTA Button */}
        <div className="hidden md:flex items-center shrink-0">
          <a
            href="/#contact"
            className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-gradient-to-r from-[#FFB7C5] via-[#E6A0B0] to-[#FDF8F9] p-[1px] shadow-glow-sm transition-all duration-300 hover:shadow-glow-md hover:scale-[1.03] active:scale-[0.98]"
          >
            <div className="flex items-center gap-2 rounded-full bg-[#050304]/90 px-5 lg:px-6 py-2.5 text-xs font-semibold uppercase tracking-wider text-[#FDF8F9] transition-colors duration-300 group-hover:bg-transparent group-hover:text-[#050304]">
              <span>Deploy AI Workflows</span>
              <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
            </div>
          </a>
        </div>

        {/* Mobile Menu Toggle Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="flex md:hidden rounded-full p-2.5 text-[#B89EA5] hover:text-[#FDF8F9] hover:bg-[#FFB7C5]/08 transition-colors"
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
            className="md:hidden bg-[#050304]/95 backdrop-blur-2xl border-b border-[#FFB7C5]/12 px-6 py-6 mt-3 shadow-2xl"
          >
            <div className="flex flex-col gap-4">
              {navItems.map((item) =>
                item.to ? (
                  <Link
                    key={item.label}
                    to={item.to}
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-sm font-medium tracking-wide uppercase text-[#B89EA5] hover:text-[#FDF8F9] py-1.5 transition-colors"
                  >
                    {item.label}
                  </Link>
                ) : (
                  <a
                    key={item.label}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-sm font-medium tracking-wide uppercase text-[#B89EA5] hover:text-[#FDF8F9] py-1.5 transition-colors"
                  >
                    {item.label}
                  </a>
                )
              )}
              <a
                href="/#contact"
                onClick={() => setMobileMenuOpen(false)}
                className="mt-3 flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#FFB7C5] via-[#E6A0B0] to-[#FDF8F9] py-3 text-xs font-bold uppercase tracking-wider text-[#050304] shadow-glow-sm"
              >
                <span>Deploy AI Workflows</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
