import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { HeroSection } from '@/components/sections/HeroSection';
import { AboutSection } from '@/components/sections/AboutSection';
import { InstrumentsSection } from '@/components/sections/InstrumentsSection';
import { ServicesSection } from '@/components/sections/ServicesSection';
import { AIAssistantSection } from '@/components/sections/AIAssistantSection';
import { NewsSection } from '@/components/sections/NewsSection';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection />
        <AboutSection />
        <InstrumentsSection />
        <ServicesSection />
        <AIAssistantSection />
        <NewsSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
