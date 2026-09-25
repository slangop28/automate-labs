import { Link } from 'react-router-dom';
import { ArrowUpRight, Mail } from 'lucide-react';
import Icons from '../ui/Icons';

export const FooterSection = () => {
  return (
    <footer className="relative z-10 bg-[#050304]/95 backdrop-blur-xl border-t border-[#FFB7C5]/12 pt-20 pb-12 overflow-hidden">
      {/* Ambient background rose glow */}
      <div className="pointer-events-none absolute bottom-0 left-1/2 -translate-x-1/2 h-64 w-[700px] rounded-full bg-[#FFB7C5]/06 blur-[130px]" />

      <div className="relative z-10 mx-auto max-w-6xl px-6 md:px-8">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          {/* Brand Info */}
          <div>
            <Link to="/" className="group flex items-center">
              <span className="font-display text-2xl md:text-3xl font-light tracking-tight text-[#FDF8F9]">
                Smart{' '}
                <span className="font-serif italic font-normal text-gradient-ai">
                  Vyapari
                </span>
              </span>
            </Link>

            <p className="mt-4 text-sm leading-relaxed text-[#B89EA5] max-w-xs">
              Autonomous AI Architecture &amp; Business Automation. We build self-healing AI agents, deterministic workflow pipelines, and high-end 3D digital infrastructure.
            </p>

            <div className="mt-6 flex items-center gap-3 text-xs text-[#B89EA5]">
              <span className="flex h-2 w-2 rounded-full bg-[#FFB7C5] animate-pulse" />
              <span className="font-mono text-[#E2C2C9]">All Autonomous Systems Operational</span>
            </div>
          </div>

          {/* Quick Links: Services */}
          <div>
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-[#FFB7C5]">Systems</h4>
            <ul className="mt-4 space-y-2.5 text-sm text-[#B89EA5]">
              <li>
                <a href="/#ecosystem" className="hover:text-[#FDF8F9] hover:drop-shadow-[0_0_8px_rgba(255,183,197,0.4)] transition-colors">n8n Workflow Automation</a>
              </li>
              <li>
                <a href="/#ecosystem" className="hover:text-[#FDF8F9] hover:drop-shadow-[0_0_8px_rgba(255,183,197,0.4)] transition-colors">AI Inbound &amp; WhatsApp SDR</a>
              </li>
              <li>
                <a href="/#ecosystem" className="hover:text-[#FDF8F9] hover:drop-shadow-[0_0_8px_rgba(255,183,197,0.4)] transition-colors">Supabase Cloud Database</a>
              </li>
              <li>
                <a href="/#ecosystem" className="hover:text-[#FDF8F9] hover:drop-shadow-[0_0_8px_rgba(255,183,197,0.4)] transition-colors">3D Digital Infrastructure</a>
              </li>
            </ul>
          </div>

          {/* Quick Links: Navigation */}
          <div>
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-[#FFB7C5]">Company</h4>
            <ul className="mt-4 space-y-2.5 text-sm text-[#B89EA5]">
              <li>
                <Link to="/case-studies" className="hover:text-[#FDF8F9] hover:drop-shadow-[0_0_8px_rgba(255,183,197,0.4)] transition-colors">Don't know what to build?</Link>
              </li>
              <li>
                <Link to="/portfolio" className="hover:text-[#FDF8F9] hover:drop-shadow-[0_0_8px_rgba(255,183,197,0.4)] transition-colors">Selected Portfolio</Link>
              </li>
              <li>
                <Link to="/learning" className="hover:text-[#FDF8F9] hover:drop-shadow-[0_0_8px_rgba(255,183,197,0.4)] transition-colors">Free AI Learning Hub</Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-[#FDF8F9] hover:drop-shadow-[0_0_8px_rgba(255,183,197,0.4)] transition-colors">About SmartVyapari</Link>
              </li>
            </ul>
          </div>

          {/* Connect & Legal */}
          <div>
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-[#FFB7C5]">Connect</h4>
            <ul className="mt-4 space-y-2.5 text-sm text-[#B89EA5]">
              <li>
                <a
                  href="mailto:hello@smartvyapari.online"
                  className="flex items-center gap-1.5 hover:text-[#FDF8F9] hover:drop-shadow-[0_0_8px_rgba(255,183,197,0.4)] transition-colors"
                >
                  <Mail className="h-4 w-4 text-[#FFB7C5]" />
                  <span>Email Direct</span>
                  <ArrowUpRight className="h-3 w-3 opacity-60" />
                </a>
              </li>
              <li>
                <a
                  href="https://instagram.com/iamatul_28"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 hover:text-[#FDF8F9] hover:drop-shadow-[0_0_8px_rgba(255,183,197,0.4)] transition-colors"
                >
                  <Icons.Instagram className="h-4 w-4 text-[#E6A0B0]" />
                  <span>@iamatul_28</span>
                  <ArrowUpRight className="h-3 w-3 opacity-60" />
                </a>
              </li>
              <li>
                <Link to="/privacy" className="hover:text-[#FDF8F9] transition-colors">Privacy Policy</Link>
              </li>
              <li>
                <Link to="/careers" className="hover:text-[#FDF8F9] transition-colors">Careers</Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-[#FFB7C5]/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#8C5460]">
          <div>
            © {new Date().getFullYear()} SmartVyapari (smartvyapari.online) · Ahmedabad, India. All rights reserved.
          </div>
          <div className="font-mono text-[#B89EA5] flex items-center gap-2">
            <span>Built with Autonomous AI &amp; n8n</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;
