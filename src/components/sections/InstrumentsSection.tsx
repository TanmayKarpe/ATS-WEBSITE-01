import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

import instrumentFesem from '@/assets/instrument-fesem.jpg';
import instrumentFtir from '@/assets/instrument-ftir.jpg';
import instrumentXrd from '@/assets/instrument-xrd.jpg';
import instrumentUvvis from '@/assets/instrument-uvvis.jpg';
import instrumentGcms from '@/assets/instrument-gcms.jpg';
import instrumentNmr from '@/assets/instrument-nmr.jpg';

const instruments = [
  {
    name: 'FE-SEM',
    fullName: 'Field Emission Scanning Electron Microscope',
    capability: 'High-resolution surface imaging up to 1nm, EDS analysis for elemental composition',
    image: instrumentFesem,
  },
  {
    name: 'FTIR Spectrometer',
    fullName: 'Fourier Transform Infrared Spectrometer',
    capability: 'Molecular structure analysis, functional group identification, ATR & transmission modes',
    image: instrumentFtir,
  },
  {
    name: 'XRD System',
    fullName: 'X-Ray Diffractometer',
    capability: 'Crystal structure determination, phase identification, thin film analysis',
    image: instrumentXrd,
  },
  {
    name: 'UV-Vis Spectrophotometer',
    fullName: 'UV-Visible Spectrophotometer',
    capability: 'Absorption spectroscopy, concentration determination, optical bandgap analysis',
    image: instrumentUvvis,
  },
  {
    name: 'GC-MS',
    fullName: 'Gas Chromatography Mass Spectrometry',
    capability: 'Volatile compound separation & identification, purity analysis, trace detection',
    image: instrumentGcms,
  },
  {
    name: 'NMR',
    fullName: 'Nuclear Magnetic Resonance Spectrometer',
    capability: 'Molecular structure elucidation, 1H and 13C NMR, 2D experiments',
    image: instrumentNmr,
  },
];

export function InstrumentsSection() {
  return (
    <section id="instruments" className="py-24 bg-muted/50 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5" style={{
        backgroundImage: 'radial-gradient(circle at 2px 2px, currentColor 1px, transparent 0)',
        backgroundSize: '32px 32px'
      }} />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-4">
            Our Instruments
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            State-of-the-Art Equipment
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Explore our comprehensive range of advanced analytical instruments designed to meet diverse research needs.
          </p>
        </div>

        {/* Instruments Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {instruments.map((instrument, index) => (
            <Card 
              key={instrument.name}
              className="group overflow-hidden border-0 bg-card"
            >
              {/* Image Container */}
              <div className="relative h-48 overflow-hidden bg-gradient-to-br from-primary/5 to-secondary/5">
                <img
                  src={instrument.image}
                  alt={instrument.fullName}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent" />
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 rounded-full bg-primary text-primary-foreground text-xs font-semibold">
                    {instrument.name}
                  </span>
                </div>
              </div>

              <CardContent className="pt-6">
                <h3 className="font-bold text-lg mb-2">{instrument.fullName}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {instrument.capability}
                </p>
              </CardContent>

              <CardFooter>
                <Button variant="ghost" className="w-full group/btn">
                  Learn More
                  <ArrowRight size={16} className="ml-2 group-hover/btn:translate-x-1 transition-transform" />
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <Button variant="outline" size="lg">
            View All Instruments
            <ArrowRight size={18} className="ml-2" />
          </Button>
        </div>
      </div>
    </section>
  );
}
