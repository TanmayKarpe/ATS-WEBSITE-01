import { Link, useParams } from 'react-router-dom';
import { useEffect, useMemo, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { instruments as staticInstruments } from '@/data/instruments';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogTrigger, DialogClose } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { AlertCircle, Mail, Phone, Info } from 'lucide-react';
import { openEmailDraft } from '@/lib/emailDraft';

export default function InstrumentDetailPage() {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [visibleSections, setVisibleSections] = useState<Set<string>>(new Set());
  
  // Booking form state
  const [userCategory, setUserCategory] = useState<string>('');
  const [fullName, setFullName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userPhone, setUserPhone] = useState('');
  const [prn, setPrn] = useState('');
  const [institution, setInstitution] = useState('');
  const [purpose, setPurpose] = useState('');
  const [sampleDetails, setSampleDetails] = useState('');
  const [bookingError, setBookingError] = useState<string | null>(null);
  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [row, setRow] = useState<any | null>(null);
  const { code } = useParams();

  const imageByName = useMemo(() => {
    const map = new Map<string, string | undefined>();
    staticInstruments.forEach((it) => {
      if (it.name) map.set(it.name.toLowerCase(), it.image);
      if (it.id) map.set(it.id.toLowerCase(), it.image);
    });
    return map;
  }, []);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      console.log('[TEMP DEBUG][InstrumentDetail] Loading instrument', {
        code,
        hasSupabase: Boolean(supabase),
        mode: import.meta.env.MODE,
      });
      if (!code) {
        setError('Instrument not found');
        setLoading(false);
        return;
      }
      if (!supabase) {
        console.warn('[TEMP DEBUG][InstrumentDetail] Supabase client missing; check env vars');
        setError('Data service unavailable');
        setLoading(false);
        return;
      }
      try {
        console.log('[TEMP DEBUG][InstrumentDetail] Firing instrument detail query');
        const { data, error } = await supabase
          .from('instruments')
          .select('*')
          .eq('code', code)
          .maybeSingle();
        if (error) {
          console.error('[TEMP DEBUG][InstrumentDetail] Supabase query error', {
            message: error.message,
            code: error.code,
            details: error.details,
            hint: error.hint,
          });
          throw error;
        }
        if (!data) {
          console.warn('[TEMP DEBUG][InstrumentDetail] No instrument found', { code });
        }
        if (!cancelled) setRow(data || null);
      } catch (e: any) {
        if (!cancelled) setError(e?.message || 'Failed to load instrument');
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    load();
    return () => { cancelled = true };
  }, [code]);

  // Scroll-based animation observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleSections((prev) => new Set(prev).add(entry.target.id));
          }
        });
      },
      { threshold: 0.1, rootMargin: '-50px' }
    );

    const sections = document.querySelectorAll('[data-animate]');
    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, [row]);

  // Single image derived from instrument title (<Instrument Title>.png)
  const SUPABASE_PUBLIC_URL = `${import.meta.env.VITE_SUPABASE_URL}/storage/v1/object/public`;
  const filename = row?.image_filenames;
  const imageUrl = filename
    ? `${SUPABASE_PUBLIC_URL}/instrument_raw/${encodeURIComponent(filename)}`
    : `/placeholder.svg`;

  console.log(row?.name || code, row?.image_filenames);

  if (loading) return <div className="container py-12 text-muted-foreground">Loading…</div>;
  
  if (error || !row) {
    return (
      <div className="container py-12">
        <div className="max-w-md mx-auto text-center">
          <div className="mb-6 flex justify-center">
            <div className="rounded-full bg-muted p-6">
              <AlertCircle className="h-12 w-12 text-muted-foreground" />
            </div>
          </div>
          <h2 className="text-2xl font-bold mb-2">Instrument Not Found</h2>
          <p className="text-muted-foreground mb-6">
            {error || "The instrument you're looking for could not be found in our database."}
          </p>
          <div className="flex gap-3 justify-center">
            <Link to="/instruments">
              <Button variant="outline">Browse Instruments</Button>
            </Link>
            <Link to="/contact">
              <Button>Contact Us</Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Extract data from Supabase row
  const name: string = row?.name || String(code);
  const manufacturer: string = row?.make || row?.manufacturer || '';
  const modelNumber: string = row?.model || '';
  // DO NOT use overview/description - removed per requirement
  const contactName: string = row?.contact_name || '';
  const contactEmail: string = row?.contact_email || row?.coordinator_email || 'ats@nmu.ac.in';
  const contactPhone: string = row?.contact_phone || '';
  const priceInternal = row?.price_internal || null;
  const priceExternal = row?.price_external || null;
  const priceIndustry = row?.price_industry || null;
  
  // Parse applications (array or text)
  let applications: string[] = [];
  if (row?.applications) {
    if (Array.isArray(row.applications)) {
      applications = row.applications;
    } else if (typeof row.applications === 'string') {
      applications = row.applications.split('\n').filter(Boolean);
    }
  } else if (row?.metadata?.applications && Array.isArray(row.metadata.applications)) {
    applications = row.metadata.applications;
  }

  // Parse sample requirements
  let sampleRequirements: string = '';
  if (row?.sample_requirements) {
    if (typeof row.sample_requirements === 'string') {
      sampleRequirements = row.sample_requirements;
    } else if (Array.isArray(row.sample_requirements)) {
      sampleRequirements = row.sample_requirements.join('. ');
    }
  } else if (row?.sample) {
    sampleRequirements = typeof row.sample === 'string' ? row.sample : '';
  }

  // Parse technical specs as key-value pairs
  let technicalSpecs: Record<string, string> = {};
  if (row?.specifications) {
    if (typeof row.specifications === 'object' && !Array.isArray(row.specifications)) {
      technicalSpecs = row.specifications;
    } else if (typeof row.specifications === 'string') {
      // Try to parse structured specs from text
      const lines = row.specifications.split('\n').filter(Boolean);
      lines.forEach((line: string) => {
        const colonIndex = line.indexOf(':');
        if (colonIndex > 0) {
          const key = line.substring(0, colonIndex).trim();
          const value = line.substring(colonIndex + 1).trim();
          technicalSpecs[key] = value;
        }
      });
    }
  }
  
  // Always include manufacturer and model in specs
  if (manufacturer) technicalSpecs['Manufacturer'] = manufacturer;
  if (modelNumber) technicalSpecs['Model'] = modelNumber;

  // Category-specific guidelines
  const categoryGuidelines: Record<string, string[]> = {
    'KBCNMU (Internal Users)': [
      'Request must be submitted through the department',
      'Signed approval from Guide / HoD required',
      'Clear purpose of analysis must be stated'
    ],
    'External Academic Institutions': [
      'Official institutional request required',
      'Signed by supervisor or authorized authority',
      'Sample details must be clearly specified'
    ],
    'Industry / Corporate': [
      'Official request on company letterhead required',
      'Authorized signatory mandatory',
      'Scope of analysis must be clearly defined'
    ]
  };

  // Reset form fields when category changes
  const handleCategoryChange = (value: string) => {
    setUserCategory(value);
    setFullName('');
    setUserEmail('');
    setUserPhone('');
    setPrn('');
    setInstitution('');
    setPurpose('');
    setSampleDetails('');
    setBookingError(null);
  };

  const handleBooking = () => {
    setBookingError(null);
    
    if (!userCategory) return setBookingError('Please select your user category');
    if (!fullName.trim()) return setBookingError('Full name is required');
    if (!userEmail.trim()) return setBookingError('Email is required');
    if (!userPhone.trim()) return setBookingError('Phone number is required');
    if (userCategory === 'KBCNMU (Internal Users)' && !prn.trim()) return setBookingError('PRN is required for internal users');
    if (!institution.trim()) return setBookingError('Institution / Company name is required');
    if (!purpose.trim()) return setBookingError('Purpose of analysis is required');
    if (!sampleDetails.trim()) return setBookingError('Sample details are required');
    const subject = `Instrument Request – ${name}`;

    const prnLine = userCategory === 'KBCNMU (Internal Users)' && prn.trim() ? `PRN: ${prn}\n` : '';
    
    const body = `
Dear Sir/Madam,

I would like to request the following service:

Instrument: ${name}
Purpose of Analysis:
${purpose}

Sample Details:
${sampleDetails}

User Details:
Name: ${fullName}
${prnLine}Institution: ${institution}
Phone: ${userPhone}
Email: ${userEmail}

Regards,
${fullName}
`.trim();

    openEmailDraft('ats@nmu.ac.in', subject, body)

    setIsBookingOpen(false);
    setUserCategory('');
    setFullName('');
    setUserEmail('');
    setUserPhone('');
    setPrn('');
    setInstitution('');
    setPurpose('');
    setSampleDetails('');
  };

  return (
    <div className="container py-12">
      <style>{`
        [data-animate] {
          opacity: 0;
          transform: translateY(20px);
          transition: opacity 0.6s ease-out, transform 0.6s ease-out;
        }
        [data-animate].visible {
          opacity: 1;
          transform: translateY(0);
        }
      `}</style>

      <div className="mb-8">
        <Link to="/instruments" className="text-sm text-muted-foreground hover:text-foreground underline">
          ← Back to instruments
        </Link>
      </div>

      {/* TOP SECTION - TWO COLUMN LAYOUT */}
      <div className="mb-16">
        <div className="grid grid-cols-1 lg:grid-cols-[420px_1fr] gap-12 items-start">
          
          {/* LEFT COLUMN: Image + Technical Specifications */}
          <div className="space-y-8">
            {/* Instrument Image */}
            <div className="relative rounded-xl overflow-hidden bg-gradient-to-br from-muted to-muted/50 shadow-2xl ring-1 ring-black/5">
              <img 
                src={imageUrl}
                alt={name} 
                className="w-full h-80 object-cover filter saturate-[0.94] contrast-[1.03] blur-[0.45px]" 
                onError={(e) => {
                  e.currentTarget.src = `/placeholder.svg`;
                }}
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/5 via-transparent to-black/15" />
            </div>

            {/* Technical Specifications - Below Image */}
            {Object.keys(technicalSpecs).length > 0 && (
              <div>
                <h2 className="text-xl font-bold text-slate-900 mb-6">Technical Specifications</h2>
                <div className="grid grid-cols-1 gap-3">
                  {Object.entries(technicalSpecs).map(([key, value]) => (
                    <Card 
                      key={key} 
                      className="hover:shadow-sm transition-all duration-200 bg-white border border-slate-100"
                    >
                      <CardContent className="p-3">
                        <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-1">
                          {key}
                        </p>
                        <p className="text-base font-semibold">{value}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* RIGHT COLUMN: Name + Manufacturer/Model + Applications */}
          <div className="space-y-8">
            {/* Instrument Name & Details */}
            <div className="space-y-4">
              <h1 className="text-5xl font-bold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent leading-tight">
                {name}
              </h1>
              {(manufacturer || modelNumber) && (
                <div className="flex flex-wrap gap-6 text-base">
                  {manufacturer && (
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-muted-foreground">Manufacturer:</span>
                      <span className="font-medium">{manufacturer}</span>
                    </div>
                  )}
                  {modelNumber && (
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-muted-foreground">Model:</span>
                      <span className="font-medium">{modelNumber}</span>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Applications - PRIMARY CONTENT (ENLARGED) */}
            {applications.length > 0 && (
              <div>
                <h2 className="text-xl font-bold text-slate-900 mb-6">Applications</h2>
                <div className="space-y-4">
                  {applications.map((app, i) => (
                    <Card 
                      key={i} 
                      className="bg-white hover:shadow-xl transition-all duration-300 hover:-translate-x-1 border-l-4 border-l-slate-400 hover:border-l-slate-600"
                    >
                      <CardContent className="p-5">
                        <div className="flex items-start gap-4">
                          <div className="rounded-full bg-slate-200 p-2.5 shrink-0 mt-0.5">
                            <div className="h-2 w-2 rounded-full bg-slate-700" />
                          </div>
                          <p className="text-base leading-relaxed tracking-tight font-medium text-slate-900">{app}</p>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {/* Sample Requirements - SUBORDINATE CARD (Hard-positioned below Applications) */}
            {sampleRequirements && (
              <div className="mt-8">
                <h2 className="text-xl font-bold text-slate-900 mb-4">Sample Requirements</h2>
                <Card className="bg-white border border-slate-200 border-l-4 border-l-slate-400 shadow-sm hover:shadow-md transition-all duration-200">
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <div className="rounded-md bg-slate-100 p-2 shrink-0">
                        <AlertCircle className="h-3.5 w-3.5 text-slate-600" />
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-slate-900 mb-1 tracking-tight">Sample Preparation Guidelines</p>
                        <p className="text-xs text-slate-700 leading-relaxed tracking-tight">{sampleRequirements}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* INFORMATION SPINE SECTIONS - Unified Alignment & Rhythm */}
      <div className="space-y-16">

        {/* PRICING - THREE-COLUMN COMPARISON LAYOUT */}
        <section 
          id="pricing-section" 
          data-animate 
          className={visibleSections.has('pricing-section') ? 'visible' : ''}
        >
          <div className="flex items-center gap-3 mb-6">
            <h2 className="text-xl font-bold text-slate-900">Pricing</h2>
            <div className="h-px w-8 bg-slate-300" />
          </div>
          <p className="text-xs text-slate-600 mb-6">Indicative rates (subject to change)</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* KBCNMU Students / Faculty - Internal Card */}
            <div className="bg-white border border-slate-200 hover:border-slate-300 hover:shadow-md transition-all duration-300 rounded-lg p-5">
              <div className="mb-4">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Internal</span>
              </div>
              <h3 className="text-base font-semibold text-slate-900 mb-3 line-clamp-2 tracking-tight">KBCNMU Students / Faculty</h3>
              <p className="text-2xl font-bold text-slate-900 leading-tight">{priceInternal || 'Contact for details'}</p>
            </div>

            {/* Other Academic Institutions - Neutral Card */}
            <div className="bg-white border border-slate-200 hover:border-slate-300 hover:shadow-sm transition-all duration-300 rounded-lg p-5">
              <div className="mb-4 h-5" />
              <h3 className="text-base font-semibold text-slate-900 mb-3 line-clamp-2 tracking-tight">Other Academic Institutions</h3>
              <p className="text-2xl font-bold text-slate-900 leading-tight">{priceExternal || 'Contact for details'}</p>
            </div>

            {/* Industry / Corporate - Commercial Card */}
            <div className="bg-white border border-slate-200 hover:border-slate-300 hover:shadow-md transition-all duration-300 rounded-lg p-5">
              <div className="mb-4">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Commercial</span>
              </div>
              <h3 className="text-base font-semibold text-slate-900 mb-3 line-clamp-2 tracking-tight">Industry / Corporate</h3>
              <div className="space-y-1">
                <p className="text-2xl font-bold text-slate-900 leading-tight">{priceIndustry || 'Contact for details'}</p>
                <p className="text-xs text-slate-500 font-medium">GST included</p>
              </div>
            </div>
          </div>
        </section>

        {/* CONTACT INFORMATION - INFORMATION SPINE ALIGNED */}
        <section 
          id="contact-section" 
          data-animate 
          className={visibleSections.has('contact-section') ? 'visible' : ''}
        >
          <div className="flex items-center gap-3 mb-6">
            <h2 className="text-xl font-bold text-slate-900">Contact Information</h2>
            <div className="h-px w-8 bg-slate-300" />
          </div>
          <Card className="shadow-sm border border-slate-200 hover:shadow-md transition-all duration-200">
            <CardContent className="pt-6 pb-6">
              <div className="space-y-5">
                {contactName && (
                  <div>
                    <p className="text-xs font-semibold text-slate-500 mb-2 uppercase tracking-wider">Instrument Contact</p>
                    <p className="text-lg font-bold text-slate-900">{contactName}</p>
                  </div>
                )}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {contactEmail && (
                    <div className="flex items-center gap-4 p-4 rounded-lg bg-white border border-slate-100">
                      <div className="rounded-full bg-slate-100 p-2.5">
                        <Mail className="h-4 w-4 text-slate-600" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-xs text-slate-600 mb-1 font-medium">Email</p>
                        <p className="font-semibold text-sm text-slate-900 break-all leading-tight">{contactEmail}</p>
                      </div>
                    </div>
                  )}
                  {contactPhone && (
                    <div className="flex items-center gap-4 p-4 rounded-lg bg-white border border-slate-100">
                      <div className="rounded-full bg-slate-100 p-2.5">
                        <Phone className="h-4 w-4 text-slate-600" />
                      </div>
                      <div>
                        <p className="text-xs text-slate-600 mb-1 font-medium">Phone</p>
                        <p className="font-semibold text-sm text-slate-900 leading-tight">{contactPhone}</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* BOOKING CTA - Separated Section */}
        <section 
          id="booking-section" 
          data-animate 
          className={visibleSections.has('booking-section') ? 'visible' : ''}
        >
          <Card className="bg-gradient-to-br from-primary/5 to-primary/10 border-2 border-primary/20 shadow-xl">
            <CardContent className="pt-8 pb-8">
              <div className="text-center space-y-6">
                <div>
                  <h3 className="text-2xl font-bold mb-2">Ready to Book?</h3>
                  <p className="text-muted-foreground">
                    Complete the booking form to request instrument access
                  </p>
                </div>
                <Dialog open={isBookingOpen} onOpenChange={setIsBookingOpen}>
                  <DialogTrigger asChild>
                    <Button size="lg" className="text-lg px-8 py-6 shadow-lg hover:shadow-xl transition-all">
                      Book this Instrument
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                      <DialogTitle>Book {name}</DialogTitle>
                      <DialogDescription>
                        Select your category and provide required details. An email draft will be opened in your default email client.
                      </DialogDescription>
                    </DialogHeader>
                    
                    <div className="space-y-6">
                      {/* User Category Selection (MANDATORY) */}
                      <div>
                        <Label htmlFor="userCategory" className="text-base font-semibold">
                          User Category <span className="text-destructive">*</span>
                        </Label>
                        <Select value={userCategory} onValueChange={handleCategoryChange}>
                          <SelectTrigger id="userCategory" className="mt-2">
                            <SelectValue placeholder="Select your category" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="KBCNMU (Internal Users)">KBCNMU (Internal Users)</SelectItem>
                            <SelectItem value="External Academic Institutions">External Academic Institutions</SelectItem>
                            <SelectItem value="Industry / Corporate">Industry / Corporate</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      {/* Category-Specific Guidelines */}
                      {userCategory && categoryGuidelines[userCategory] && (
                        <div className="rounded-lg border-2 border-blue-200 bg-blue-50 p-4">
                          <div className="flex items-start gap-2">
                            <Info className="h-5 w-5 text-blue-600 mt-0.5 shrink-0" />
                            <div>
                              <h4 className="font-semibold text-blue-900 mb-2">Mandatory Requirements</h4>
                              <ul className="space-y-1 text-sm text-blue-800">
                                {categoryGuidelines[userCategory].map((guideline, i) => (
                                  <li key={i} className="flex items-start">
                                    <span className="mr-2">•</span>
                                    <span>{guideline}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Booking Form Fields (disabled until category selected) */}
                      <div className={!userCategory ? 'opacity-50 pointer-events-none' : ''}>
                        <div className="space-y-4">
                          <div>
                            <Label htmlFor="fullName">Full Name <span className="text-destructive">*</span></Label>
                            <Input
                              id="fullName"
                              value={fullName}
                              onChange={(e) => setFullName(e.target.value)}
                              placeholder="Your full name"
                              disabled={!userCategory}
                              required
                            />
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <Label htmlFor="userEmail">Email <span className="text-destructive">*</span></Label>
                              <Input
                                id="userEmail"
                                type="email"
                                value={userEmail}
                                onChange={(e) => setUserEmail(e.target.value)}
                                placeholder="your@email.com"
                                disabled={!userCategory}
                                required
                              />
                            </div>
                            <div>
                              <Label htmlFor="userPhone">Phone <span className="text-destructive">*</span></Label>
                              <Input
                                id="userPhone"
                                type="tel"
                                value={userPhone}
                                onChange={(e) => setUserPhone(e.target.value)}
                                placeholder="+91 XXXXXXXXXX"
                                disabled={!userCategory}
                                required
                              />
                            </div>
                          </div>

                          {userCategory === 'KBCNMU (Internal Users)' && (
                            <div>
                              <Label htmlFor="prn">PRN <span className="text-destructive">*</span></Label>
                              <Input
                                id="prn"
                                value={prn}
                                onChange={(e) => setPrn(e.target.value)}
                                placeholder="Enter your PRN"
                                disabled={!userCategory}
                                required
                              />
                            </div>
                          )}

                          <div>
                            <Label htmlFor="institution">
                              Institution / Company Name <span className="text-destructive">*</span>
                            </Label>
                            <Input
                              id="institution"
                              value={institution}
                              onChange={(e) => setInstitution(e.target.value)}
                              placeholder="e.g., KBCNMU or ABC Research Institute"
                              disabled={!userCategory}
                              required
                            />
                          </div>

                          <div>
                            <Label htmlFor="instrumentName">Instrument Name</Label>
                            <Input
                              id="instrumentName"
                              value={name}
                              readOnly
                              disabled
                              className="bg-muted"
                            />
                          </div>

                          <div>
                            <Label htmlFor="purpose">
                              Purpose of Analysis <span className="text-destructive">*</span>
                            </Label>
                            <Textarea
                              id="purpose"
                              value={purpose}
                              onChange={(e) => setPurpose(e.target.value)}
                              placeholder="Clearly describe the purpose and expected outcomes"
                              rows={3}
                              disabled={!userCategory}
                              required
                            />
                          </div>

                          <div>
                            <Label htmlFor="sampleDetails">
                              Sample Details <span className="text-destructive">*</span>
                            </Label>
                            <Textarea
                              id="sampleDetails"
                              value={sampleDetails}
                              onChange={(e) => setSampleDetails(e.target.value)}
                              placeholder="Sample type, quantity, preparation method, etc."
                              rows={3}
                              disabled={!userCategory}
                              required
                            />
                          </div>
                        </div>
                      </div>

                      {bookingError && (
                        <div className="rounded-md bg-destructive/10 border border-destructive/20 p-3">
                          <p className="text-sm text-destructive font-medium">{bookingError}</p>
                        </div>
                      )}
                    </div>

                    <DialogFooter>
                      <DialogClose asChild>
                        <Button variant="ghost">Cancel</Button>
                      </DialogClose>
                      <Button 
                        onClick={handleBooking}
                        disabled={!userCategory}
                      >
                        Generate Email Draft
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  );
}
