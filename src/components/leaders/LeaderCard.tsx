import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { ChevronRight } from 'lucide-react';
import type { Leader } from '@/data/leaders';

type Props = {
  leader: Leader;
};

export function LeaderCard({ leader }: Props) {
  return (
    <Link to={`/leadership/${leader.id}`} className="group">
      <Card className="overflow-visible border-0 bg-card hover:shadow-lg transition-shadow duration-300 h-full">
        {/* Circular Image Container - 150px on desktop, 120px on mobile */}
        <div className="flex justify-center pt-8 pb-4">
          <div className="relative w-32 h-32 sm:w-36 sm:h-36 lg:w-40 lg:h-40 rounded-full overflow-hidden bg-gradient-to-br from-primary/10 to-secondary/10 shadow-md ring-2 ring-background">
            {leader.image ? (
              <img
                src={leader.image}
                alt={leader.name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/20 to-secondary/20">
                <p className="text-5xl sm:text-6xl font-bold text-primary/20">{leader.name.charAt(0)}</p>
              </div>
            )}
          </div>
        </div>

        <CardContent className="pt-6 pb-6 flex flex-col items-center text-center">
          <h3 className="text-lg font-bold mb-2">{leader.name}</h3>
          <p className="text-sm text-primary font-semibold mb-4">{leader.role}</p>
          
          <div className="flex items-center gap-1 text-primary group-hover:gap-2 transition-all mt-auto">
            <span className="text-sm font-medium">View Profile</span>
            <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}

export default LeaderCard;
