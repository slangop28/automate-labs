import { useState } from 'react';
import { submitLead } from '../../lib/email';
import Icons from '../ui/Icons';

const field =
    'w-full rounded-xl border border-line bg-cream px-4 py-3 text-sm text-ink placeholder:text-umber/60 outline-none transition-all focus:border-clay focus:ring-2 focus:ring-clay/20';

const ContactForm = () => {
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setStatus('loading');
        const form = e.currentTarget;
        const data = Object.fromEntries(new FormData(form)) as Record<string, string>;
        const ok = await submitLead({
            name: data.name,
            email: data.email,
            company: data.company,
            phone: data.phone,
            message: data.message,
            source: 'website-contact',
        });
        if (ok) {
            setStatus('success');
            form.reset();
        } else {
            setStatus('error');
        }
    };

    if (status === 'success') {
        return (
            <div className="rounded-2xl border border-line bg-paper p-10 text-center">
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-clay/15 text-clay">
                    <Icons.Check className="h-7 w-7" />
                </div>
                <h3 className="font-display text-2xl font-semibold text-ink">Got it — talk soon.</h3>
                <p className="mt-2 text-sm text-umber">
                    Your message is in. We'll reply from Atul's inbox within one business day.
                </p>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit} className="rounded-2xl border border-line bg-paper p-6 md:p-8">
            <div className="grid gap-4 md:grid-cols-2">
                <div>
                    <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-umber">Name</label>
                    <input name="name" required placeholder="Your name" className={field} />
                </div>
                <div>
                    <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-umber">Email</label>
                    <input name="email" type="email" required placeholder="you@company.com" className={field} />
                </div>
                <div>
                    <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-umber">Company</label>
                    <input name="company" placeholder="Company (optional)" className={field} />
                </div>
                <div>
                    <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-umber">Phone</label>
                    <input name="phone" type="tel" placeholder="+91 ..." className={field} />
                </div>
            </div>
            <div className="mt-4">
                <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-umber">
                    What repeats in your business?
                </label>
                <textarea
                    name="message"
                    rows={4}
                    required
                    placeholder="Tell us the process that's eating your team's time — we'll map what AI can take off their plate."
                    className={field}
                />
            </div>

            {status === 'error' && (
                <p className="mt-4 text-sm text-clay-deep">Something went wrong. Please try again or email atul.pandey0028@gmail.com.</p>
            )}

            <button
                type="submit"
                disabled={status === 'loading'}
                className="group mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-clay px-6 py-3.5 text-sm font-semibold text-paper shadow-clay transition-all hover:bg-clay-deep disabled:opacity-60 sm:w-auto"
            >
                {status === 'loading' ? 'Sending…' : 'Book my free audit'}
                {status !== 'loading' && <Icons.ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />}
            </button>
            <p className="mt-3 text-xs text-umber">No commitment · 30-min strategy session · we reply within a day.</p>
        </form>
    );
};

export default ContactForm;
