import { useCallback, useEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { supabase } from '@/supabase/client';
import { cn } from '@/lib/utils';
import { ArrowRight, Loader2, MessageCircle, RefreshCcw, Search, X, DollarSign, FileText, Phone, Layers } from 'lucide-react';

const START_NODE_KEY = 'start';

type GuideNode = {
  id?: number;
  node_key: string;
  title?: string | null;
  message?: string | null;
  node_type?: string | null;
};

type GuideOption = {
  id?: number;
  label: string;
  next_node_key: string;
};

type InstrumentRow = {
  id: string | number;
  name: string;
  code?: string | null;
  department?: string | null;
  status?: string | null;
};

type InstrumentIntent = {
  label: string;
  guideType: string;
  action?: 'booking';
};

const instrumentIntents: InstrumentIntent[] = [
  { label: 'Sample Requirement', guideType: 'sample_requirement' },
  { label: 'Pricing', guideType: 'pricing' },
  { label: 'Contact', guideType: 'contact' },
  { label: 'Capability', guideType: 'capability' },
  { label: 'Booking', guideType: 'booking', action: 'booking' },
];

export function GuidedAssistantWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [loadingNode, setLoadingNode] = useState(false);
  const [currentNode, setCurrentNode] = useState<GuideNode | null>(null);
  const [options, setOptions] = useState<GuideOption[]>([]);
  const [nodeError, setNodeError] = useState<string | null>(null);

  const [instruments, setInstruments] = useState<InstrumentRow[]>([]);
  const [instrumentsLoading, setInstrumentsLoading] = useState(false);
  const [instrumentSearch, setInstrumentSearch] = useState('');
  const [selectedInstrument, setSelectedInstrument] = useState<InstrumentRow | null>(null);

  const [intentAnswer, setIntentAnswer] = useState<string | null>(null);
  const [intentLoading, setIntentLoading] = useState(false);
  const [currentIntentType, setCurrentIntentType] = useState<string | null>(null);

  const location = useLocation();
  const navigate = useNavigate();
  const isHome = location.pathname === '/';

  const resetConversation = useCallback(() => {
    setCurrentNode(null);
    setOptions([]);
    setNodeError(null);
    setInstruments([]);
    setInstrumentSearch('');
    setSelectedInstrument(null);
    setIntentAnswer(null);
    setIntentLoading(false);
    setCurrentIntentType(null);
  }, []);

  const loadOptions = useCallback(async (nodeId?: number) => {
    if (!supabase || !nodeId) return [] as GuideOption[];
    const { data, error } = await supabase
      .from('guide_options')
      .select('id,label,next_node_key')
      .eq('node_id', nodeId)
      .order('id', { ascending: true });
    if (error) {
      console.warn('Failed to load guide options', error.message);
      return [] as GuideOption[];
    }
    return data || [];
  }, []);

  const loadInstruments = useCallback(async () => {
    if (!supabase) {
      setInstruments([]);
      return;
    }
    setInstrumentsLoading(true);
    const { data, error } = await supabase
      .from('instruments')
      .select('id,name,code,status,department')
      .eq('status', 'active')
      .order('name', { ascending: true });
    if (error) {
      console.warn('Failed to load instruments', error.message);
      setInstruments([]);
    } else {
      setInstruments(data || []);
    }
    setInstrumentsLoading(false);
  }, []);

  const loadNode = useCallback(async (nodeKey: string) => {
    setLoadingNode(true);
    setNodeError(null);
    setIntentAnswer(null);
    setSelectedInstrument(null);

    if (!supabase) {
      setNodeError('Assistant data is offline. Please use the Contact page for support.');
      setLoadingNode(false);
      return;
    }

    const { data, error } = await supabase
      .from('guide_nodes')
      .select('id,node_key,title,message,node_type')
      .eq('node_key', nodeKey)
      .maybeSingle();

    if (error || !data) {
      setNodeError('Guidance is temporarily unavailable. Redirecting to full help.');
      setLoadingNode(false);
      navigate('/contact');
      setIsOpen(false);
      return;
    }

    setCurrentNode(data);
    const loadedOptions = await loadOptions(data.id);
    setOptions(loadedOptions);

    if (data.node_type === 'instrument') {
      loadInstruments();
    } else {
      setInstruments([]);
    }

    setLoadingNode(false);
  }, [loadOptions, loadInstruments, navigate]);

  useEffect(() => {
    if (isOpen) {
      loadNode(START_NODE_KEY);
    } else {
      resetConversation();
    }
  }, [isOpen, loadNode, resetConversation]);

  const filteredInstruments = useMemo(() => {
    if (!instrumentSearch) return instruments;
    const query = instrumentSearch.toLowerCase();
    return instruments.filter((instrument) => instrument.name.toLowerCase().includes(query));
  }, [instrumentSearch, instruments]);

  const handleOptionSelect = (nextKey: string) => {
    loadNode(nextKey);
  };

  const handleInstrumentPick = (instrument: InstrumentRow) => {
    setSelectedInstrument(instrument);
    setIntentAnswer(null);
  };

  const handleIntent = async (intent: InstrumentIntent) => {
    if (!selectedInstrument) return;
    if (intent.action === 'booking') {
      setIsOpen(false);
      navigate(selectedInstrument.code ? `/instruments/${selectedInstrument.code}` : '/instruments');
      return;
    }

    if (!supabase) {
      navigate(selectedInstrument.code ? `/instruments/${selectedInstrument.code}` : '/instruments');
      setIsOpen(false);
      return;
    }

    setIntentLoading(true);
    setIntentAnswer(null);
    setCurrentIntentType(intent.guideType);
    const { data, error } = await supabase
      .from('instrument_guides')
      .select('short_answer')
      .eq('instrument_id', selectedInstrument.id)
      .eq('guide_type', intent.guideType)
      .maybeSingle();

    if (error || !data?.short_answer) {
      setIntentLoading(false);
      setIsOpen(false);
      navigate(selectedInstrument.code ? `/instruments/${selectedInstrument.code}` : '/instruments');
      return;
    }

    setIntentAnswer(data.short_answer);
    setIntentLoading(false);
  };

  const handleClose = () => {
    setIsOpen(false);
    resetConversation();
  };

  const handleStartOver = () => {
    resetConversation();
    loadNode(START_NODE_KEY);
  };

  const panelClass = cn(
    'w-[360px] sm:w-[400px] rounded-2xl border shadow-xl transition-all duration-300 backdrop-blur-xl',
    isHome
      ? 'bg-slate-950/80 text-white border-white/10 shadow-black/20'
      : 'bg-white text-slate-900 border-slate-200 shadow-slate-900/5'
  );

  const subtleText = isHome ? 'text-white/80' : 'text-slate-600';

  // Answer Card Rendering
  const renderAnswerCards = () => {
    if (!intentAnswer || !currentIntentType) return null;

    const cardBaseClass = cn(
      'rounded-xl border px-4 py-3 transition-all duration-200',
      isHome
        ? 'bg-slate-900/40 border-white/10 hover:border-secondary/40 hover:shadow-lg hover:shadow-secondary/10'
        : 'bg-slate-50 border-slate-200 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/10'
    );

    // Get icon based on intent type
    const getIntentIcon = () => {
      switch (currentIntentType) {
        case 'pricing': return DollarSign;
        case 'sample_requirement': return FileText;
        case 'contact': return Phone;
        case 'capability': return Layers;
        default: return FileText;
      }
    };

    const Icon = getIntentIcon();

    // Special handling for pricing (three cards)
    if (currentIntentType === 'pricing') {
      // Parse pricing data - expect format like "Internal: ₹500 + GST | Academic: ₹800 + GST | Industry: ₹1500 + GST"
      const pricingMatch = intentAnswer.match(/Internal[:\s]*([^|]+)\|?\s*Academic[:\s]*([^|]+)\|?\s*Industry[:\s]*(.+)/i);
      
      if (pricingMatch) {
        const [, internalPrice, academicPrice, industryPrice] = pricingMatch;
        const categories = [
          { label: 'Internal', price: internalPrice.trim(), color: 'emerald' },
          { label: 'Academic', price: academicPrice.trim(), color: 'blue' },
          { label: 'Industry', price: industryPrice.trim(), color: 'amber' }
        ];

        return (
          <div className="space-y-2">
            <div className="flex items-center gap-2 mb-3">
              <Icon size={16} className={isHome ? 'text-secondary' : 'text-primary'} />
              <span className="text-xs font-semibold uppercase tracking-wide">Pricing</span>
            </div>
            <div className="flex gap-2 overflow-x-auto pb-2 snap-x snap-mandatory scrollbar-hide">
              {categories.map(({ label, price }) => {
                // Extract base price and GST note
                const priceMatch = price.match(/(.+?)(\+\s*GST.*)?$/i);
                const basePrice = priceMatch ? priceMatch[1].trim() : price;
                const gstNote = priceMatch && priceMatch[2] ? priceMatch[2].trim() : '';

                return (
                  <div
                    key={label}
                    className={cn(
                      cardBaseClass,
                      'flex-1 min-w-[140px] snap-start'
                    )}
                  >
                    <div className="flex flex-col gap-1">
                      <span className="text-xs font-medium opacity-70">{label}</span>
                      <span className="text-base font-semibold">{basePrice}</span>
                      {gstNote && (
                        <span className="text-[10px] opacity-50">{gstNote}</span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        );
      }
    }

    // Default answer card (single card for other intents)
    return (
      <div className={cardBaseClass}>
        <div className="flex items-start gap-3">
          <Icon size={16} className={cn('mt-0.5 shrink-0', isHome ? 'text-secondary' : 'text-primary')} />
          <div className="text-sm leading-relaxed">{intentAnswer}</div>
        </div>
      </div>
    );
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      {isOpen && (
        <div className={panelClass}>
          <div className="flex items-start justify-between gap-3 px-4 pt-4">
            <div>
              <p className="text-xs uppercase tracking-[0.14em] font-semibold">
                ATS Assistant
              </p>
              <p className={cn('text-sm', subtleText)}>Button-first guidance. No chat.</p>
            </div>
            <button aria-label="Close assistant" className={cn('p-2 rounded-full border', isHome ? 'border-white/10 hover:bg-white/10' : 'border-slate-200 hover:bg-slate-50')} onClick={handleClose}>
              <X size={16} />
            </button>
          </div>

          <div className="px-4 pb-4 pt-3 space-y-4">
            {loadingNode ? (
              <div className="flex items-center gap-3 text-sm">
                <Loader2 className="h-4 w-4 animate-spin" />
                <span>Loading guidance…</span>
              </div>
            ) : nodeError ? (
              <div className="text-sm">{nodeError}</div>
            ) : currentNode ? (
              <>
                <div className="space-y-1">
                  <p className="text-sm font-semibold">
                    {currentNode.title || 'Guided help'}
                  </p>
                  <p className={cn('text-sm leading-relaxed', subtleText)}>
                    {currentNode.message || 'Select an option to continue.'}
                  </p>
                </div>

                {currentNode.node_type !== 'instrument' && options.length > 0 && (
                  <div className="grid grid-cols-1 gap-2">
                    {options.map((option) => (
                      <Button
                        key={option.id || option.next_node_key}
                        variant={isHome ? 'heroOutline' : 'secondary'}
                        className="justify-between"
                        onClick={() => handleOptionSelect(option.next_node_key)}
                      >
                        <span>{option.label}</span>
                        <ArrowRight size={16} className="opacity-70" />
                      </Button>
                    ))}
                  </div>
                )}

                {currentNode.node_type === 'instrument' && (
                  <div className="space-y-3">
                    <div
                      className={cn(
                        'flex items-center gap-2 rounded-xl border px-3 py-2',
                        isHome ? 'border-white/10 bg-white/5' : 'border-slate-200 bg-slate-50'
                      )}
                    >
                      <Search size={16} className={subtleText} />
                      <Input
                        value={instrumentSearch}
                        onChange={(e) => setInstrumentSearch(e.target.value)}
                        placeholder="Search instruments"
                        className="border-0 shadow-none focus-visible:ring-0 focus-visible:ring-offset-0 bg-transparent"
                      />
                    </div>

                    {instrumentsLoading ? (
                      <div className="flex items-center gap-2 text-sm">
                        <Loader2 className="h-4 w-4 animate-spin" />
                        <span>Loading instruments…</span>
                      </div>
                    ) : (
                      <div className="max-h-48 overflow-auto space-y-2 pr-1">
                        {filteredInstruments.map((instrument) => (
                          <button
                            key={instrument.id}
                            onClick={() => handleInstrumentPick(instrument)}
                            className={cn(
                              'w-full text-left px-3 py-2 rounded-lg border transition-colors',
                              selectedInstrument?.id === instrument.id
                                ? isHome
                                  ? 'border-secondary/60 bg-secondary/10 text-white'
                                  : 'border-primary/50 bg-primary/5'
                                : isHome
                                  ? 'border-white/10 hover:bg-white/5'
                                  : 'border-slate-200 hover:bg-slate-50'
                            )}
                          >
                            <p className="text-sm font-semibold">{instrument.name}</p>
                            {instrument.department && (
                              <p className="text-xs" aria-label="Department" >
                                {instrument.department}
                              </p>
                            )}
                          </button>
                        ))}
                        {filteredInstruments.length === 0 && (
                          <p className="text-sm">No instruments match this search.</p>
                        )}
                      </div>
                    )}

                    {selectedInstrument && (
                      <div className="space-y-2">
                        <p className="text-sm font-semibold">How can we help for {selectedInstrument.name}?</p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          {instrumentIntents.map((intent) => (
                            <Button
                              key={intent.guideType}
                              variant={isHome ? 'heroOutline' : 'secondary'}
                              onClick={() => handleIntent(intent)}
                              disabled={intentLoading}
                            >
                              {intent.label}
                            </Button>
                          ))}
                        </div>
                        {intentLoading && (
                          <div className="flex items-center gap-2 text-sm">
                            <Loader2 className="h-4 w-4 animate-spin" />
                            <span>Fetching guidance…</span>
                          </div>
                        )}
                        {intentAnswer && renderAnswerCards()}
                      </div>
                    )}
                  </div>
                )}
              </>
            ) : (
              <div className="text-sm">Open the assistant to begin.</div>
            )}

            <div
              className={cn(
                'flex items-center justify-between gap-2 pt-2 mt-1',
                isHome ? 'border-t border-white/10' : 'border-t border-slate-100'
              )}
            >
              <Button
                variant={isHome ? 'heroOutline' : 'ghost'}
                size="sm"
                onClick={handleStartOver}
                className="w-full justify-center"
              >
                <RefreshCcw size={14} className="mr-2" /> Start Over
              </Button>
              <div className={cn('text-[11px]', subtleText)}>
                Data-driven | No chat
              </div>
            </div>
          </div>
        </div>
      )}

      {!isOpen && (
        <Button
          size="lg"
          variant="glass"
          className={cn(
            'h-auto gap-3 shadow-lg transition-all duration-300',
            isHome
              ? 'rounded-full px-6 py-5 bg-gradient-to-br from-slate-900 via-slate-950 to-slate-950 text-white border-white/20 hover:border-white/30 hover:shadow-xl hover:shadow-white/5'
              : 'rounded-full px-4 py-6 bg-white text-slate-900'
          )}
          onClick={() => setIsOpen(true)}
        >
          <MessageCircle size={20} />
          <div className="flex flex-col items-start">
            <span className="text-xs uppercase tracking-[0.14em] font-semibold">Guided help</span>
            <span className="text-sm font-medium">ATS Assistant</span>
          </div>
        </Button>
      )}
    </div>
  );
}

export default GuidedAssistantWidget;
