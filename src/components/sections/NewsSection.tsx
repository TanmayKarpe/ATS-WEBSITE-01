import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, ArrowRight, Wrench, GraduationCap, Newspaper } from 'lucide-react';

const newsItems = [
  {
    type: 'Training',
    icon: GraduationCap,
    title: 'Hands-on Training Workshop on FE-SEM',
    description: 'Two-day intensive workshop on sample preparation and imaging techniques for field emission scanning electron microscopy.',
    date: 'Dec 15-16, 2025',
    color: 'bg-secondary',
  },
  {
    type: 'Announcement',
    icon: Newspaper,
    title: 'New NMR Spectrometer Installation',
    description: 'SAIF is pleased to announce the installation of a new 500 MHz NMR spectrometer with advanced capabilities.',
    date: 'Nov 28, 2025',
    color: 'bg-accent',
  },
  {
    type: 'Maintenance',
    icon: Wrench,
    title: 'Scheduled Maintenance: XRD System',
    description: 'The X-Ray Diffractometer will be under scheduled maintenance. Samples submitted before Dec 1 will be processed.',
    date: 'Dec 5-8, 2025',
    color: 'bg-amber-500',
  },
];

export function NewsSection() {
  return (
    <section id="training" className="py-24 bg-muted/50 relative">
      <div className="container mx-auto px-4 md:px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full bg-secondary/10 text-secondary text-sm font-semibold mb-4">
            Stay Updated
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            News & Updates
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Keep track of the latest training programs, workshops, and facility announcements.
          </p>
        </div>

        {/* News Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {newsItems.map((item, index) => (
            <Card 
              key={item.title}
              className="group overflow-hidden border-0 bg-card hover:shadow-xl transition-all duration-300"
            >
              <CardHeader className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className={`px-3 py-1.5 rounded-full ${item.color} text-white text-xs font-semibold flex items-center gap-2`}>
                    <item.icon size={14} />
                    {item.type}
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground text-sm">
                    <Calendar size={14} />
                    {item.date}
                  </div>
                </div>
                <CardTitle className="text-lg font-bold leading-tight group-hover:text-primary transition-colors">
                  {item.title}
                </CardTitle>
              </CardHeader>

              <CardContent>
                <CardDescription className="text-base leading-relaxed">
                  {item.description}
                </CardDescription>
              </CardContent>

              <CardFooter>
                <Button variant="ghost" className="w-full group/btn">
                  Read More
                  <ArrowRight size={16} className="ml-2 group-hover/btn:translate-x-1 transition-transform" />
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <Button variant="outline" size="lg">
            View All Updates
            <ArrowRight size={18} className="ml-2" />
          </Button>
        </div>
      </div>
    </section>
  );
}
