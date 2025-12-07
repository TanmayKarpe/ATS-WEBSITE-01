export interface LeaderMember {
  id: number;
  name: string;
  profession: string;
  image: string;
}

export const leaders: LeaderMember[] = [
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
