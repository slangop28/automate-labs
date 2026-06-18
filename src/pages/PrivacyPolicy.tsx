import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import Container from '../components/ui/Container';
import Reveal from '../components/ui/Reveal';

const PrivacyPolicy = () => (
    <div className="min-h-screen bg-cream text-ink">
        <Navbar />

        <section className="pt-32 pb-12 md:pt-40">
            <Container className="max-w-3xl">
                <h1 className="font-display text-4xl font-semibold tracking-tight text-ink md:text-5xl">Privacy Policy</h1>
                <p className="mt-3 text-xs font-semibold uppercase tracking-wider text-umber">Last updated: January 26, 2026</p>
            </Container>
        </section>

        <section className="pb-24">
            <Container className="max-w-3xl">
                <Reveal>
                    <div className="space-y-10">
                        <div>
                            <h2 className="font-display text-2xl font-semibold tracking-tight text-ink">1. Introduction</h2>
                            <p className="mt-3 leading-relaxed text-umber">
                                Automate Labs ("we," "our," or "us") is committed to protecting your privacy. This policy
                                explains how we collect, use, disclose, and safeguard your information when you visit our
                                website or use our services.
                            </p>
                        </div>

                        <div>
                            <h2 className="font-display text-2xl font-semibold tracking-tight text-ink">2. Information we collect</h2>
                            <p className="mt-3 leading-relaxed text-umber">We collect information you voluntarily provide when you interact with our platform:</p>
                            <ul className="mt-5 grid gap-3 sm:grid-cols-2">
                                {['Request a callback / consultation', 'Book a free audit', 'Newsletter subscription', 'Form interactions'].map((item) => (
                                    <li key={item} className="flex items-center gap-3 rounded-xl border border-line bg-paper p-4 text-sm text-ink/85">
                                        <span className="h-1.5 w-1.5 rounded-full bg-clay" /> {item}
                                    </li>
                                ))}
                            </ul>
                            <div className="mt-5 rounded-2xl border border-line bg-paper p-6">
                                <p className="text-xs font-semibold uppercase tracking-wider text-clay-deep">Collected data types</p>
                                <p className="mt-2 text-sm leading-relaxed text-umber">
                                    Name, email address, phone number, company details, and specific business automation requirements.
                                </p>
                            </div>
                        </div>

                        <div>
                            <h2 className="font-display text-2xl font-semibold tracking-tight text-ink">3. How we use data</h2>
                            <div className="mt-4 space-y-3">
                                {['Respond to service inquiries', 'Schedule strategic consultations', 'Deliver automation insights via newsletter', 'Comply with legal standards'].map((item, i) => (
                                    <div key={item} className="flex items-start gap-4 rounded-xl border border-line bg-paper p-4">
                                        <span className="font-mono text-sm font-semibold text-clay-deep">0{i + 1}</span>
                                        <span className="text-sm text-ink/85">{item}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="grid gap-6 md:grid-cols-2">
                            <div className="rounded-2xl border border-line bg-paper p-7">
                                <h2 className="font-display text-xl font-semibold tracking-tight text-ink">4. Security</h2>
                                <p className="mt-3 text-sm leading-relaxed text-umber">
                                    We implement premium technical measures, including AES-256 encryption, to protect your business data.
                                </p>
                            </div>
                            <div className="rounded-2xl border border-line bg-paper p-7">
                                <h2 className="font-display text-xl font-semibold tracking-tight text-ink">5. Data sharing</h2>
                                <p className="mt-3 text-sm leading-relaxed text-umber">
                                    We do not sell data. We only share information with critical service providers under strict NDAs, or when legally required.
                                </p>
                            </div>
                        </div>

                        <div>
                            <h2 className="font-display text-2xl font-semibold tracking-tight text-ink">6. Contact</h2>
                            <p className="mt-3 leading-relaxed text-umber">
                                For data inquiries, reach out at{' '}
                                <a href="mailto:atul.pandey0028@gmail.com" className="font-medium text-clay hover:text-clay-deep">atul.pandey0028@gmail.com</a>.
                            </p>
                        </div>
                    </div>
                </Reveal>
            </Container>
        </section>

        <Footer />
    </div>
);

export default PrivacyPolicy;
