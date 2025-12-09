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
      <Card className="overflow-hidden border-0 bg-card hover:shadow-lg transition-shadow duration-300 h-full">
        <div className="relative h-56 overflow-hidden bg-gradient-to-br from-primary/10 to-secondary/10">
          {leader.image ? (
            <img
              src={leader.image}
              alt={leader.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/20 to-secondary/20">
              <div className="text-center">
                <p className="text-4xl font-bold text-primary/20">{leader.name.charAt(0)}</p>
              </div>
            </div>
          )}
        </div>

        <CardContent className="pt-6">
          <h3 className="text-lg font-bold mb-1">{leader.name}</h3>
          <p className="text-sm text-primary font-semibold mb-3">{leader.role}</p>
          <p className="text-sm text-muted-foreground line-clamp-2 mb-4">{leader.bio}</p>
          
          <div className="flex items-center gap-2 text-primary group-hover:gap-3 transition-all">
            <span className="text-sm font-medium">View Profile</span>
            <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}

export default LeaderCard;
