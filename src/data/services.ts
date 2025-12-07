import { GraduationCap, Building2, Factory } from 'lucide-react';

export const serviceCards = [
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
