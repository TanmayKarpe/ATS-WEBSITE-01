export type Leader = {
  id: string;
  name: string;
  role: string;
  qualifications?: string;
  bio: string;
  email?: string[];
  phone?: string[];
  achievements?: string;
  dob?: string;
  image?: string;
};

export const leaders: Leader[] = [
  {
    id: 'governor',
    name: 'Shri Acharya Devvrat',
    role: 'Governor of Maharashtra & Gujarat (Chancellor)',
    qualifications: 'Graduate; Postgraduate; B.Ed.; Diploma in Yoga Science; Doctor of Naturopathy and Yogic Science',
    bio: 'Experienced educationist with over 45 years of service in teaching and administration. His leadership has played a significant role in integrating modern scientific approaches with traditional knowledge systems to promote sustainable development. He has championed scientific natural farming, large-scale experimental implementation models, renewable energy initiatives, and the establishment of naturopathy and yogic science institutions. As Chancellor of multiple universities, he continues to promote scientific temper, research excellence, and youth development.',
    achievements: '• Pioneer of scientific natural farming, enabling the transition of over 9.5 lakh farmers from chemical-based to natural farming methods, significantly reducing environmental toxicity and saving ₹1,300+ crore in fertilizer subsidies\n• Modernized education systems by transforming Gurukul Kurukshetra into a premier institution integrating Vedic values with modern laboratories and competitive exam preparation\n• Founded Chaman Vatika International Kanya Gurukul, strengthening women\'s education and social reform initiatives including Beti Bachao Beti Padhao and water conservation\n• Recipient of multiple national and international honors, including Honorary D.Litt degrees (2023) for contributions to education and social welfare\n• Serves as Governor of Gujarat and Maharashtra (Additional Charge) and Chancellor of 24 state universities, aligning higher education with national scientific and innovation goals',
    dob: '18 January 1959',
    image: '/governor.png',
  },
  {
    id: 'vice-chancellor',
    name: 'Prof. V. L. Maheshwari',
    role: 'Vice-Chancellor',
    qualifications: 'M.Sc. (Biochemistry), Ph.D.',
    bio: 'Distinguished biochemist with extensive expertise in protein biochemistry, plant tissue culture, and sustainable agri-biotechnology. As former Director of the School of Life Sciences, he pioneered bio-based pest management approaches utilizing plant secondary metabolites and microbial protease inhibitors, leading the industrial transfer of biopesticide processing technology in 2004 with patent recognition in natural product chemistry.\n\nCurrently serving as Vice-Chancellor of KBCNMU, Jalgaon, he has been instrumental in institutionalizing advanced analytical and research instrumentation including HPTLC, chromatographic structural confirmation, and in-silico molecular docking. His research has impacted multiple areas including development of antidiabetic and antimicrobial agents, GM food risk assessment, and crop productivity enhancement in saline environments, supported by international collaborations with the University of Virginia and Iowa State University.',
    achievements: '• Published 115+ research papers with 1,600+ citations in peer-reviewed journals\n• Industrial transfer of biopesticide processing technology (2004); patent holder in natural product chemistry\n• Recipient of BOYSCAST Fellowship (University of Virginia) and Norman E. Borlaug Fellowship (Iowa State University)\n• Served in senior academic leadership roles for 20+ years, including Director of School of Life Sciences and IQAC leadership\n• Guided 22 Ph.D. scholars across biochemistry, plant science, microbial biotechnology, and nano-biotechnology',
    email: ['vco@nmu.ac.in', 'vc@nmu.ac.in'],
    phone: ['+91-257-2257204', '+91-257-2257206'],
    image: '/vice-chancellor.png',
  },
  {
    id: 'pro-vice-chancellor',
    name: 'Prof. S. T. Ingle',
    role: 'Pro-Vice-Chancellor',
    qualifications: 'M.Sc. (Environmental Science), Ph.D.',
    bio: 'Prof. Sopan Tukaram Ingle is a distinguished environmental scientist and senior academic leader with nearly three decades of expertise in Environmental Impact Assessment, sustainable energy systems, and occupational health monitoring. As Head of the School of Environmental and Earth Sciences at KBC North Maharashtra University, he has played a pivotal role in integrating Geospatial Technology (GIS) and geochemical modeling into environmental surveillance and natural resource management. His work spans environmental auditing, green energy innovation, and data-driven climate mitigation, contributing significantly to regional and national sustainability initiatives.',
    achievements: '• Filed a patent for a multi-layered modified chlorophyll-based dye-sensitized solar cell (DSSC), offering a metal-free, eco-friendly alternative to conventional ruthenium-based solar technologies\n• Served as a high-level scientific consultant on 20+ industrial and government projects, including Social Impact Assessments for irrigation dams and Environmental Audits for pharmaceutical and polyester industries\n• Successfully mobilized over ₹6.4 crore in research funding from agencies such as UGC, DST, and MPCB, strengthening advanced research infrastructure and regional air-quality monitoring capabilities\n• As a long-standing Director of IQAC, played a central role in achieving NAAC \'A\' Grade accreditation through institutionalization of rigorous academic and administrative quality standards\n• Active member of the District Environmental Committee (Collector\'s Office), contributing directly to policy decisions on water conservation, solid waste management, and pollution control',
    email: ['pvc@nmu.ac.in', 'pvcresearch@nmu.ac.in'],
    image: '/pro-vc.png',
  },
  {
    id: 'registrar',
    name: 'Dr. Vinod Patil',
    role: 'Registrar',
    qualifications: 'Ph.D.',
    bio: 'Serving as Registrar of KBCNMU, responsible for administrative coordination and university operations.',
    email: ['registrar@nmu.ac.in'],
    phone: ['+91-257-2257215'],
    image: '/registrar.png',
  },
];

export function getLeaderById(id: string): Leader | undefined {
  return leaders.find((leader) => leader.id === id);
}
