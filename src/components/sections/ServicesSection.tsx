import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { GraduationCap, Building2, Factory, ArrowRight, CheckCircle2 } from 'lucide-react';

const serviceCards = [
  {
    icon: GraduationCap,
    title: 'Internal Users',
    subtitle: 'Students & Faculty of KBCNMU',
    description: 'Priority access with subsidized rates for all university members. Quick turnaround for academic research projects.',
    features: ['Subsidized tariff rates', 'Priority booking', 'Research support', 'Training included'],
    buttonText: 'Apply as Internal User',
    gradient: 'from-secondary to-emerald-400',
  },
  {
    icon: Building2,
    title: 'External Academic',
    subtitle: 'Other Universities & Institutes',
    description: 'Collaborative access for researchers from other academic institutions across India and globally.',
    features: ['Competitive academic rates', 'Collaborative projects', 'Bulk discounts', 'Online submission'],
    buttonText: 'Request Academic Access',
    gradient: 'from-accent to-purple-400',
  },
  {
    icon: Factory,
    title: 'Industry & R&D Labs',
    subtitle: 'Corporate & Industrial Partners',
    description: 'Premium analytical services for quality control, product development, and industrial research needs.',
    features: ['Express processing', 'Confidential handling', 'Dedicated support', 'Custom packages'],
    buttonText: 'Contact for Industry Rates',
    gradient: 'from-blue-500 to-cyan-400',
  },
];

export function ServicesSection() {
  return (
    <section id="services" className="py-24 bg-background relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-1/2 -translate-y-1/2 -left-48 w-96 h-96 bg-secondary/10 rounded-full blur-3xl" />
      <div className="absolute top-1/4 -right-48 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full bg-accent/10 text-accent text-sm font-semibold mb-4">
            Our Services
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            How to Avail Services
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Choose the access category that best fits your research needs. We offer tailored solutions for every type of user.
          </p>
        </div>

        {/* Service Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {serviceCards.map((card, index) => (
            <Card 
              key={card.title}
              className="group relative overflow-hidden border-0 bg-card hover:shadow-2xl transition-all duration-500"
            >
              {/* Gradient Top Border */}
              <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${card.gradient}`} />

              <CardHeader className="space-y-4">
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${card.gradient} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                  <card.icon size={32} className="text-white" />
                </div>
                <div>
                  <CardTitle className="text-2xl font-bold mb-1">{card.title}</CardTitle>
                  <p className="text-sm text-muted-foreground font-medium">{card.subtitle}</p>
                </div>
              </CardHeader>

              <CardContent className="space-y-6">
                <CardDescription className="text-base leading-relaxed">
                  {card.description}
                </CardDescription>

                <ul className="space-y-3">
                  {card.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-3 text-sm">
                      <CheckCircle2 size={16} className="text-secondary shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>

              <CardFooter>
                <Button className="w-full group/btn" size="lg">
                  {card.buttonText}
                  <ArrowRight size={18} className="ml-2 group-hover/btn:translate-x-1 transition-transform" />
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
