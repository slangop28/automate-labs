import { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, Mail, MapPin, ArrowRight } from 'lucide-react';
import { submitLead } from '../../lib/email';

/* ─── Types ─────────────────────────────────────────────────────────────── */
interface FormState {
  name: string;
  email: string;
  company: string;
  message: string;
}

/* ─── Component ─────────────────────────────────────────────────────────── */
export const ContactSection = () => {
  const [form, setForm]           = useState<FormState>({ name: '', email: '', company: '', message: '' });
  const [status, setStatus]       = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;

    setStatus('loading');
    setErrorMessage('');

    try {
      const ok = await submitLead({
        name:     form.name,
        email:    form.email,
        company:  form.company,
        message:  form.message,
        source:   'contact-section',
      });

      if (ok) {
        setStatus('success');
        setForm({ name: '', email: '', company: '', message: '' });
      } else {
        setStatus('error');
        setErrorMessage('Something went wrong. Please email us directly at hello@smartvyapari.online');
      }
    } catch {
      setStatus('error');
      setErrorMessage('Something went wrong. Please email us directly at hello@smartvyapari.online');
    }
  };

  return (
    <section id="contact" className="relative py-28 px-6 overflow-hidden">
      {/* Ambient rose glow */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <div className="h-[500px] w-[500px] rounded-full bg-[#FFB7C5]/5 blur-[120px]" />
      </div>

      <div className="relative mx-auto max-w-6xl">
        {/* Section label */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-4 text-center font-mono text-xs uppercase tracking-[0.25em] text-[#FFB7C5]"
        >
          Let's build something
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="mb-16 text-center font-display text-4xl sm:text-5xl font-semibold leading-[1.1] tracking-tight"
        >
          Ready to scale{' '}
          <em className="bg-gradient-to-r from-[#FFB7C5] via-[#E6A0B0] to-[#FDF8F9] bg-clip-text text-transparent not-italic">
            faster?
          </em>
        </motion.h2>

        <div className="grid gap-12 lg:grid-cols-2">
          {/* ── Left: info panel ── */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-col justify-between"
          >
            <div>
              <p className="text-[#B89EA5] leading-relaxed text-base">
                Tell us about your business in 2 minutes. We'll respond within 24 hours with a clear breakdown of what automation can do for you — and what it will cost.
              </p>

              <ul className="mt-8 space-y-4">
                {[
                  'A 30-minute strategy session — no commitment',
                  'We map exactly what AI can automate for you',
                  'You get real numbers: hours saved, revenue recovered',
                ].map((point, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-[#B89EA5]">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#FFB7C5]" />
                    {point}
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact details */}
            <div className="mt-10 space-y-4 rounded-2xl border border-[#FFB7C5]/15 bg-[#FFB7C5]/5 p-6">
              <div className="flex items-center gap-3 text-sm text-[#B89EA5]">
                <Mail className="h-4 w-4 text-[#FFB7C5]" />
                <a href="mailto:hello@smartvyapari.online" className="hover:text-[#FDF8F9] transition-colors">
                  hello@smartvyapari.online
                </a>
              </div>
              <div className="flex items-center gap-3 text-sm text-[#B89EA5]">
                <MapPin className="h-4 w-4 text-[#FFB7C5]" />
                Ahmedabad, India · Available globally
              </div>
            </div>
          </motion.div>

          {/* ── Right: form ── */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            {status === 'success' ? (
              <div className="flex h-full items-center justify-center rounded-3xl border border-[#FFB7C5]/20 bg-[#FFB7C5]/5 p-12 text-center">
                <div>
                  <CheckCircle2 className="mx-auto mb-4 h-12 w-12 text-[#FFB7C5]" />
                  <h3 className="font-display text-2xl font-semibold text-[#FDF8F9]">Message received!</h3>
                  <p className="mt-3 text-[#B89EA5]">We'll be in touch within 24 hours.</p>
                </div>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="space-y-5 rounded-3xl border border-[#FFB7C5]/15 bg-white/[0.03] p-5 sm:p-8 backdrop-blur-sm"
              >
                {/* Name + Email row */}
                <div className="grid gap-4 sm:grid-cols-2">
                  {(['name', 'email'] as const).map(field => (
                    <div key={field}>
                      <label className="mb-1.5 block font-mono text-[10px] uppercase tracking-[0.2em] text-[#FFB7C5]">
                        {field === 'name' ? 'Your Name' : 'Email'}
                      </label>
                      <input
                        type={field === 'email' ? 'email' : 'text'}
                        name={field}
                        value={form[field]}
                        onChange={handleChange}
                        required
                        placeholder={field === 'name' ? 'Priya Sharma' : 'priya@brand.com'}
                        className="w-full rounded-xl border border-[#FFB7C5]/15 bg-[#FFB7C5]/5 px-4 py-3 text-sm text-[#FDF8F9] placeholder-[#B89EA5]/50 outline-none focus:border-[#FFB7C5]/40 focus:ring-1 focus:ring-[#FFB7C5]/20 transition-colors"
                      />
                    </div>
                  ))}
                </div>

                {/* Company */}
                <div>
                  <label className="mb-1.5 block font-mono text-[10px] uppercase tracking-[0.2em] text-[#FFB7C5]">
                    Business / Brand
                  </label>
                  <input
                    type="text"
                    name="company"
                    value={form.company}
                    onChange={handleChange}
                    placeholder="Your company or project name"
                    className="w-full rounded-xl border border-[#FFB7C5]/15 bg-[#FFB7C5]/5 px-4 py-3 text-sm text-[#FDF8F9] placeholder-[#B89EA5]/50 outline-none focus:border-[#FFB7C5]/40 focus:ring-1 focus:ring-[#FFB7C5]/20 transition-colors"
                  />
                </div>

                {/* Message */}
                <div>
                  <label className="mb-1.5 block font-mono text-[10px] uppercase tracking-[0.2em] text-[#FFB7C5]">
                    What do you want to automate?
                  </label>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    required
                    rows={4}
                    placeholder="Describe your biggest repetitive pain point or what you'd love to automate..."
                    className="w-full resize-none rounded-xl border border-[#FFB7C5]/15 bg-[#FFB7C5]/5 px-4 py-3 text-sm text-[#FDF8F9] placeholder-[#B89EA5]/50 outline-none focus:border-[#FFB7C5]/40 focus:ring-1 focus:ring-[#FFB7C5]/20 transition-colors"
                  />
                </div>

                {/* Error */}
                {status === 'error' && (
                  <p className="text-xs text-red-400">{errorMessage}</p>
                )}

                {/* Submit */}
                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="group w-full inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#FFB7C5] via-[#E6A0B0] to-[#FDF8F9] py-3.5 text-sm font-bold uppercase tracking-wider text-[#050304] shadow-[0_0_24px_rgba(255,183,197,0.3)] transition-all duration-300 hover:shadow-[0_0_40px_rgba(255,183,197,0.5)] hover:scale-[1.02] active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {status === 'loading' ? (
                    'Sending…'
                  ) : (
                    <>
                      Send Message
                      <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                    </>
                  )}
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
