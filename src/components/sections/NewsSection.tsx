import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { ArrowRight, GraduationCap, Wrench, Zap, CheckCircle } from 'lucide-react';
import { getFacilityUpdates, getUpdateTypeBadge, type FacilityUpdate } from '@/services/facilityUpdates';

export function NewsSection() {
  const [updates, setUpdates] = useState<FacilityUpdate[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedUpdate, setSelectedUpdate] = useState<FacilityUpdate | null>(null);

  useEffect(() => {
    async function loadUpdates() {
      setLoading(true);
      const data = await getFacilityUpdates(3);
      setUpdates(data);
      setLoading(false);
    }
    loadUpdates();
  }, []);

  const getUpdateIcon = (type: FacilityUpdate['update_type']) => {
    switch (type) {
      case 'training': return GraduationCap;
      case 'availability': return CheckCircle;
      case 'maintenance': return Wrench;
      case 'highlight': return Zap;
      default: return Zap;
    }
  };

  return (
    <section id="updates" className="py-24 bg-muted/50 relative">
      <div className="container mx-auto px-4 md:px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full bg-secondary/10 text-secondary text-sm font-semibold mb-4">
            Stay Updated
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Facility Updates & Instrument Highlights
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Latest updates on instrument training, availability, maintenance, and facility highlights.
          </p>
        </div>

        {/* Update Cards */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="overflow-hidden border-0 bg-card animate-pulse">
                <CardHeader className="space-y-4">
                  <div className="h-6 bg-muted rounded w-1/3" />
                  <div className="h-6 bg-muted rounded w-full" />
                </CardHeader>
                <CardContent>
                  <div className="h-20 bg-muted rounded" />
                </CardContent>
              </Card>
            ))}
          </div>
        ) : updates.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No updates available at the moment.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {updates.map((update) => {
              const badge = getUpdateTypeBadge(update.update_type);
              const Icon = getUpdateIcon(update.update_type);

              return (
                <Card 
                  key={update.id}
                  className="group overflow-hidden border-0 bg-card hover:shadow-xl transition-all duration-300"
                >
                  <CardHeader className="space-y-4">
                    <div className="flex items-center gap-2">
                      <div className={`px-3 py-1.5 rounded-full ${badge.color} ${badge.textColor} text-xs font-semibold flex items-center gap-2`}>
                        <Icon size={14} />
                        {badge.label}
                      </div>
                    </div>
                    <CardTitle className="text-lg font-bold leading-tight group-hover:text-primary transition-colors">
                      {update.title}
                    </CardTitle>
                    {update.instrument && (
                      <p className="text-xs text-muted-foreground font-medium">
                        {update.instrument.name}
                      </p>
                    )}
                  </CardHeader>

                  <CardContent>
                    <CardDescription className="text-base leading-relaxed line-clamp-3">
                      {update.short_description}
                    </CardDescription>
                  </CardContent>

                  <CardFooter>
                    <Button 
                      variant="ghost" 
                      className="w-full group/btn"
                      onClick={() => setSelectedUpdate(update)}
                    >
                      Read More
                      <ArrowRight size={16} className="ml-2 group-hover/btn:translate-x-1 transition-transform" />
                    </Button>
                  </CardFooter>
                </Card>
              );
            })}
          </div>
        )}
      </div>

      {/* Read More Modal */}
      <Dialog open={!!selectedUpdate} onOpenChange={(open) => !open && setSelectedUpdate(null)}>
        <DialogContent className="max-w-2xl">
          {selectedUpdate && (
            <>
              <DialogHeader>
                <div className="flex items-center gap-2 mb-3">
                  {(() => {
                    const badge = getUpdateTypeBadge(selectedUpdate.update_type);
                    const Icon = getUpdateIcon(selectedUpdate.update_type);
                    return (
                      <div className={`px-3 py-1.5 rounded-full ${badge.color} ${badge.textColor} text-xs font-semibold flex items-center gap-2`}>
                        <Icon size={14} />
                        {badge.label}
                      </div>
                    );
                  })()}
                </div>
                <DialogTitle className="text-2xl">{selectedUpdate.title}</DialogTitle>
                {selectedUpdate.instrument && (
                  <DialogDescription className="text-base font-medium text-foreground/70">
                    {selectedUpdate.instrument.name}
                  </DialogDescription>
                )}
              </DialogHeader>
              <div className="mt-4 space-y-4">
                <div className="text-sm leading-relaxed text-foreground/80">
                  {selectedUpdate.detailed_description || selectedUpdate.short_description}
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}
