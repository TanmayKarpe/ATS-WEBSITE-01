import { ServicesSection } from '@/components/sections/ServicesSection';

export default function ServicesPage() {
  return (
    <>
      <div className="py-12 bg-muted/30">
        <div className="container mx-auto px-4 md:px-6">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Services</h1>
          <p className="text-xl text-muted-foreground">Choose the access category that best fits your research needs.</p>
        </div>
      </div>
      <ServicesSection />
    </>
  );
}
