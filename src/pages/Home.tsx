import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import Hero from '../components/sections/Hero';
import Metrics from '../components/sections/Metrics';
import Services from '../components/sections/Services';
import AutomationConsole from '../components/sections/AutomationConsole';
import Process from '../components/sections/Process';
import Testimonials from '../components/sections/Testimonials';
import ContactSection from '../components/sections/ContactSection';

const Home = () => (
    <div className="min-h-screen bg-cream text-ink">
        <Navbar />
        <main>
            <Hero />
            <Metrics />
            <Services />
            <AutomationConsole />
            <Process />
            <Testimonials />
            <ContactSection />
        </main>
        <Footer />
    </div>
);

export default Home;
