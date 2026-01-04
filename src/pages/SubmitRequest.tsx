import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const eligibilityCards = [
  {
    title: 'KBCNMU (Internal Users)',
    points: [
      'Official departmental request required',
      'Signed by Guide / HoD',
      'Purpose of analysis must be clearly stated',
    ],
  },
  {
    title: 'External Academic Institutions',
    points: [
      'Institutional request letter required',
      'Authorization by supervisor or authority',
      'Complete sample details mandatory',
    ],
  },
  {
    title: 'Industry / Corporate',
    points: [
      'Official request on company letterhead',
      'Authorized signatory mandatory',
      'Clearly defined scope of analysis',
    ],
  },
];

const mandatoryGuidelines = [
  'Samples must be properly prepared, labeled, and documented',
  'Incomplete or unclear requests may not be processed',
  'ATS is not responsible for poor sample quality',
  'Turnaround time depends on instrument availability and workload',
  'Result interpretation is not implied unless explicitly stated',
];

const disclaimers = [
  'ATS reserves the right to accept or reject samples',
  'Pricing and timelines are subject to change',
  'Results depend on sample condition and compliance',
  'Users are responsible for accurate information',
];

const consultancyPoints = [
  'Experienced consultants available across multiple domains',
  'Guidance on experimental design and instrument selection',
  'Support for data interpretation and methodology refinement',
  'Industry-specific testing advice for compliance and QA needs',
];

const nextSteps = [
  'Review guidelines',
  'Choose instrument',
  'Submit request via booking or contact',
  'Attach required documents during email communication',
];

export default function SubmitRequestPage() {
  // Simple intersection-observer based in-view utility for calm, one-time animations
  const useInView = (options: IntersectionObserverInit & { once?: boolean } = { threshold: 0.15, once: true }) => {
    const ref = useRef<HTMLDivElement | null>(null);
    const [inView, setInView] = useState(false);
    useEffect(() => {
      const el = ref.current;
      if (!el) return;
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setInView(true);
            if (options.once) observer.disconnect();
          }
        });
      }, options);
      observer.observe(el);
      return () => observer.disconnect();
    }, []);
    return { ref, inView } as const;
  };

  return (
    <div className="container mx-auto px-4 md:px-6 py-16">
      <div className="max-w-5xl mx-auto space-y-12">
        <header className="text-center space-y-4">
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-semibold">
            Submission Guidelines
          </div>
          <div className="space-y-3">
            <h1 className="text-4xl md:text-5xl font-bold">Submit Sample Request</h1>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Review the eligibility and mandatory guidelines before submitting samples or booking instruments. Clear documentation helps us process your request efficiently.
            </p>
          </div>
        </header>

        <section className="space-y-4 bg-muted/20 rounded-2xl p-6 md:p-8">
          <div className="flex items-center justify-between gap-4 flex-wrap">
            <div>
              <p className="text-sm uppercase tracking-wide text-primary font-semibold">Eligibility</p>
              <h2 className="text-2xl font-bold">Who can submit</h2>
            </div>
            <span className="text-sm text-muted-foreground">Ensure you select the correct category when contacting ATS.</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {eligibilityCards.map((card, idx) => {
              const { ref, inView } = useInView({ threshold: 0.15, once: true });
              return (
                <div
                  key={card.title}
                  ref={ref}
                  style={{ transitionDelay: `${idx * 120}ms` }}
                  className={`transform transition-all duration-700 ease-out ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}`}
                >
                  <Card className="h-full transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-lg">{card.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3 text-sm text-muted-foreground">
                      <ul className="space-y-2">
                        {card.points.map((point) => (
                          <li key={point} className="flex items-start gap-2">
                            <span className="mt-1 h-1.5 w-1.5 rounded-full bg-primary" aria-hidden />
                            <span>{point}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </div>
              );
            })}
          </div>
        </section>

        <section className="space-y-4 bg-card/40 rounded-2xl p-6 md:p-8">
          <div className="flex items-center justify-between gap-4 flex-wrap">
            <div>
              <p className="text-sm uppercase tracking-wide text-primary font-semibold">Mandatory Guidelines</p>
              <h2 className="text-2xl font-bold">Follow before submission</h2>
            </div>
            <span className="text-sm text-muted-foreground">Requests without these details may be delayed.</span>
          </div>
          {/* scale-fade entrance */}
          {(() => {
            const { ref, inView } = useInView({ threshold: 0.1, once: true });
            return (
              <Card
                ref={ref as any}
                className={`border-dashed transform transition-all duration-700 ease-out ${inView ? 'opacity-100 scale-100' : 'opacity-0 scale-[0.98]'}`}
              >
                <CardContent className="pt-6">
              <ul className="space-y-3 text-sm text-muted-foreground">
                {mandatoryGuidelines.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="mt-1.5 inline-flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-primary text-xs font-bold">!</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
                </CardContent>
              </Card>
            );
          })()}
        </section>

        <section className="space-y-4 bg-muted/10 rounded-2xl p-6 md:p-8">
          <div className="flex items-center justify-between gap-4 flex-wrap">
            <div>
              <p className="text-sm uppercase tracking-wide text-primary font-semibold">Disclaimer</p>
              <h2 className="text-2xl font-bold">Administrative notes</h2>
            </div>
            <span className="text-sm text-muted-foreground">Policies apply to all categories.</span>
          </div>
          {(() => {
            const { ref, inView } = useInView({ threshold: 0.1, once: true });
            return (
              <Card ref={ref as any} className={`transition-opacity duration-700 ${inView ? 'opacity-100' : 'opacity-60'}`}>
                <CardContent className="pt-6">
              <ul className="space-y-2 text-sm text-muted-foreground">
                {disclaimers.map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <span className="mt-1 h-1.5 w-1.5 rounded-full bg-muted-foreground/60" aria-hidden />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
                </CardContent>
              </Card>
            );
          })()}
        </section>

        <section className="space-y-4 bg-card/30 rounded-2xl p-6 md:p-8">
          <div className="flex items-center justify-between gap-4 flex-wrap">
            <div>
              <p className="text-sm uppercase tracking-wide text-primary font-semibold">Consultancy Support</p>
              <h2 className="text-2xl font-bold">Expert guidance when you need it</h2>
            </div>
            <span className="text-sm text-muted-foreground">Available before or after you submit samples.</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {consultancyPoints.map((point, index) => {
              const { ref, inView } = useInView({ threshold: 0.12, once: true });
              return (
                <Card
                  key={point}
                  ref={ref as any}
                  className={`h-full transition-all duration-600 ease-out ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-1'}`}
                >
                  <CardContent className="pt-5 flex items-start gap-3 text-sm text-muted-foreground">
                    <span className="mt-1 h-2 w-2 rounded-full bg-primary" aria-hidden />
                    <span>{point}</span>
                  </CardContent>
                </Card>
              );
            })}
          </div>
          <div className="flex justify-start">
            <Link to="/consultancy">
              <Button size="lg" className="transition-all duration-300 hover:shadow-lg">Contact ATS for Consultancy</Button>
            </Link>
          </div>
        </section>

        <section className="space-y-4 bg-card/30 rounded-2xl p-6 md:p-8">
          <div className="flex items-center justify-between gap-4 flex-wrap">
            <div>
              <p className="text-sm uppercase tracking-wide text-primary font-semibold">What happens next</p>
              <h2 className="text-2xl font-bold">Simple submission flow</h2>
            </div>
            <span className="text-sm text-muted-foreground">Keep documents ready for faster processing.</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {nextSteps.map((step, index) => {
              const { ref, inView } = useInView({ threshold: 0.15, once: true });
              return (
                <div
                  key={step}
                  ref={ref}
                  style={{ transitionDelay: `${index * 140}ms` }}
                  className={`group flex gap-4 p-4 rounded-xl border bg-card/50 transform transition-all duration-700 ease-out ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}`}
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary font-semibold transition-colors group-hover:bg-primary group-hover:text-white">
                    {index + 1}
                  </div>
                  <div className="text-sm font-medium text-foreground">{step}</div>
                </div>
              );
            })}
          </div>
        </section>

        <section className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link to="/instruments">
            <Button size="lg" className="transition-all duration-300 hover:shadow-lg hover:brightness-105">Proceed to Instruments</Button>
          </Link>
          <Link to="/contact">
            <Button size="lg" variant="outline" className="transition-all duration-300 hover:shadow-md hover:border-primary/40">Contact ATS</Button>
          </Link>
        </section>
      </div>
    </div>
  );
}
