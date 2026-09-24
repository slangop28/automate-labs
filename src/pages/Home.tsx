import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import Hero from '../components/sections/Hero';
import Metrics from '../components/sections/Metrics';
import Services from '../components/sections/Services';
import AutomationConsole from '../components/sections/AutomationConsole';
import Process from '../components/sections/Process';
import Testimonials from '../components/sections/Testimonials';
import FAQ from '../components/sections/FAQ';
import ContactSection from '../components/sections/ContactSection';
import SEO from '../components/SEO';
import { SchemaOrg, organizationSchema, serviceSchemas, faqSchema } from '../components/SchemaOrg';

const combinedHomeSchema = [
    organizationSchema,
    ...serviceSchemas,
    faqSchema,
];

const Home = () => (
    <div className="min-h-screen bg-cream text-ink">
        <SEO
            canonicalPath="/"
            description="SmartVyapari builds custom AI automation systems, voice & WhatsApp agents, AI filmmaking, and workflow automations that replace repetitive work and save revenue."
        />
        <SchemaOrg schema={combinedHomeSchema} />
        <Navbar />
        <main>
            <Hero />
            <Metrics />
            <Services />
            <AutomationConsole />
            <Process />
            <Testimonials />
            <FAQ />
            <ContactSection />
        </main>
        <Footer />
    </div>
);

export default Home;
