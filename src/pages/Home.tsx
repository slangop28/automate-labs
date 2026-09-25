import Canvas3DBackground from '../components/3d/Canvas3DBackground';
import { HeroSection }     from '../components/sections/HeroSection';
import { AboutSection }    from '../components/sections/AboutSection';
import { EcosystemSection } from '../components/sections/EcosystemSection';
import { ViralMetricsSection } from '../components/sections/ViralMetricsSection';
import { ContactSection }  from '../components/sections/ContactSection';
import Navbar              from '../components/layout/Navbar';
import FooterSection       from '../components/layout/FooterSection';

const Home = () => (
  <div className="relative min-h-screen bg-[#050304] text-[#FDF8F9] selection:bg-[#FFB7C5]/30 selection:text-[#050304]">
    {/* Ambient 3D particle canvas — sits behind everything */}
    <Canvas3DBackground />

    <Navbar />

    <main className="relative z-10">
      <HeroSection />
      <AboutSection />
      <EcosystemSection />
      <ViralMetricsSection />
      <ContactSection />
    </main>

    <FooterSection />
  </div>
);

export default Home;
