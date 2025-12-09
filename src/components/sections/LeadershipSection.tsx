import { leaders } from "@/data/leaders";
import { LeaderCard } from "@/components/leaders/LeaderCard";

export function LeadershipSection() {
  return (
    <section className="py-20 bg-gradient-to-b from-background to-muted/30">
      <div className="container mx-auto px-4 md:px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
            Meet Our Leadership
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            University Leadership
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Distinguished leaders committed to excellence in education, research, and institutional advancement
          </p>
        </div>

        {/* Leadership Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {leaders.map((leader) => (
            <LeaderCard key={leader.id} leader={leader} />
          ))}
        </div>
      </div>
    </section>
  );
}
