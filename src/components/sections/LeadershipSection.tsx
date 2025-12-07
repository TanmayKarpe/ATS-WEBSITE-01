import { cn } from "@/lib/utils";

interface LeaderMember {
  id: number;
  name: string;
  profession: string;
  image: string;
}

const leaders: LeaderMember[] = [
  {
    id: 1,
    name: "Dr. Rajesh Kumar",
    profession: "Director, SAIF",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&crop=face",
  },
  {
    id: 2,
    name: "Dr. Priya Sharma",
    profession: "Deputy Director",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300&h=300&fit=crop&crop=face",
  },
  {
    id: 3,
    name: "Dr. Amit Patel",
    profession: "Chief Technical Officer",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face",
  },
  {
    id: 4,
    name: "Dr. Sunita Verma",
    profession: "Research Coordinator",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=300&h=300&fit=crop&crop=face",
  },
];

export function LeadershipSection() {
  return (
    <section className="py-20 bg-gradient-to-b from-background to-muted/30">
      <div className="container mx-auto px-4 md:px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
            Meet Our Experts
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Our Leadership
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Dedicated professionals driving excellence in analytical research and scientific advancement
          </p>
        </div>

        {/* Leadership Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {leaders.map((leader, index) => (
            <div
              key={leader.id}
              className={cn(
                "group relative bg-card rounded-2xl p-6 border border-border",
                "hover:shadow-xl hover:shadow-primary/5 hover:border-primary/20",
                "transition-all duration-500 ease-out",
                "animate-fade-in"
              )}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Profile Image */}
              <div className="relative mx-auto w-32 h-32 mb-6">
                <div className="absolute inset-0 bg-gradient-to-br from-primary to-secondary rounded-full opacity-20 group-hover:opacity-40 transition-opacity duration-300" />
                <img
                  src={leader.image}
                  alt={leader.name}
                  className="w-full h-full rounded-full object-cover border-4 border-background shadow-lg group-hover:scale-105 transition-transform duration-300"
                />
                {/* Decorative ring */}
                <div className="absolute -inset-1 rounded-full border-2 border-primary/20 group-hover:border-primary/40 transition-colors duration-300" />
              </div>

              {/* Info */}
              <div className="text-center">
                <h3 className="text-lg font-bold text-foreground mb-1 group-hover:text-primary transition-colors duration-300">
                  {leader.name}
                </h3>
                <p className="text-sm text-muted-foreground font-medium">
                  {leader.profession}
                </p>
              </div>

              {/* Hover accent line */}
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-1 bg-gradient-to-r from-primary to-secondary rounded-full group-hover:w-16 transition-all duration-300" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
