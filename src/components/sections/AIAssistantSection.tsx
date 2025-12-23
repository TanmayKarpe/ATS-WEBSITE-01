import { Button } from '@/components/ui/button';
import { Bot, Sparkles, Send, ClipboardCheck, FileText, DollarSign, Shield } from 'lucide-react';

export function AIAssistantSection() {
  return (
    <section className="py-24 bg-gradient-to-br from-primary via-primary/95 to-accent/80 relative overflow-hidden">
      {/* Animated Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-secondary/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-accent/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        {/* Subtle animated gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent animate-[gradient_15s_ease_infinite]" />
      </div>

      {/* Grid Pattern */}
      <div className="absolute inset-0 opacity-10" style={{
        backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
        backgroundSize: '40px 40px'
      }} />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="text-white space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20">
              <Sparkles size={16} className="text-secondary" />
              <span className="text-sm font-medium">Official ATS Guidance</span>
            </div>

            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
              Guided Instrument
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-secondary to-emerald-300">
                Assistance
              </span>
            </h2>

            <div className="space-y-4 max-w-xl">
              {[
                { icon: ClipboardCheck, text: 'Instrument selection guidance', delay: '0ms' },
                { icon: FileText, text: 'Sample preparation rules', delay: '100ms' },
                { icon: DollarSign, text: 'Official tariffs & booking', delay: '200ms' },
                { icon: Shield, text: 'Policies & procedures', delay: '300ms' }
              ].map(({ icon: Icon, text, delay }) => (
                <div 
                  key={text} 
                  className="flex items-center gap-3 text-white/90 animate-[fadeSlideIn_0.6s_ease-out_forwards] opacity-0"
                  style={{ animationDelay: delay }}
                >
                  <div className="w-10 h-10 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center shrink-0">
                    <Icon size={18} className="text-secondary" />
                  </div>
                  <span className="text-base font-medium">{text}</span>
                </div>
              ))}
            </div>

            <Button variant="hero" size="lg" className="mt-6">
              <Sparkles size={20} />
              Get Guided Help
            </Button>
          </div>

          {/* Widget Preview with Enhanced Effects */}
          <div className="relative">
            {/* Floating container with animation */}
            <div className="animate-[float_6s_ease-in-out_infinite] hover:scale-105 transition-transform duration-500">
              <div className="bg-card rounded-3xl shadow-2xl overflow-hidden max-w-md mx-auto border border-border/50 relative">
                {/* Gradient glow behind */}
                <div className="absolute -inset-1 bg-gradient-to-br from-secondary/30 via-accent/20 to-primary/30 rounded-3xl blur-xl opacity-75" />
                
                {/* Widget content */}
                <div className="relative bg-card rounded-3xl overflow-hidden">
                  {/* Header */}
                  <div className="bg-gradient-to-r from-primary to-accent p-4 flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
                      <Bot size={24} className="text-white" />
                    </div>
                    <div>
                      <p className="font-semibold text-white">ATS Guided Assistant</p>
                      <p className="text-xs text-white/70 flex items-center gap-1">
                        <span className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
                        Ready to guide
                      </p>
                    </div>
                  </div>

                  {/* Chat Body */}
                  <div className="p-4 space-y-4 bg-muted/50 min-h-[300px]">
                    {/* Bot Message */}
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center shrink-0">
                        <Bot size={16} className="text-primary-foreground" />
                      </div>
                      <div className="bg-card rounded-2xl rounded-tl-sm p-4 shadow-sm max-w-[80%]">
                        <p className="text-sm">
                          👋 Welcome to ATS guidance. I can help you with:
                        </p>
                        <div className="flex flex-wrap gap-2 mt-3">
                          {['Instruments', 'Tariffs', 'Booking'].map((tag) => (
                            <span key={tag} className="px-3 py-1 rounded-full bg-muted text-xs font-medium">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* User Message */}
                    <div className="flex items-start gap-3 justify-end">
                      <div className="bg-primary text-primary-foreground rounded-2xl rounded-tr-sm p-4 max-w-[80%]">
                        <p className="text-sm">What are the sample requirements for FE-SEM analysis?</p>
                      </div>
                    </div>

                    {/* Typing Indicator */}
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center shrink-0">
                        <Bot size={16} className="text-primary-foreground" />
                      </div>
                      <div className="bg-card rounded-2xl rounded-tl-sm p-4 shadow-sm">
                        <div className="flex gap-1">
                          <span className="w-2 h-2 rounded-full bg-muted-foreground/40 animate-bounce" />
                          <span className="w-2 h-2 rounded-full bg-muted-foreground/40 animate-bounce" style={{ animationDelay: '0.2s' }} />
                          <span className="w-2 h-2 rounded-full bg-muted-foreground/40 animate-bounce" style={{ animationDelay: '0.4s' }} />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Input */}
                  <div className="p-4 border-t border-border bg-card">
                    <div className="flex items-center gap-3">
                      <input
                        type="text"
                        placeholder="Type your question..."
                        className="flex-1 bg-muted rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-primary/20"
                        disabled
                      />
                      <button className="w-12 h-12 rounded-xl bg-primary text-primary-foreground flex items-center justify-center hover:bg-primary/90 transition-colors">
                        <Send size={18} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Enhanced Decorative Elements */}
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-secondary/40 rounded-full blur-2xl animate-pulse" />
            <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-accent/40 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '1.5s' }} />
          </div>
        </div>
      </div>

      {/* Custom Animations */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        @keyframes fadeSlideIn {
          from {
            opacity: 0;
            transform: translateX(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        @keyframes gradient {
          0%, 100% { transform: translateX(-50%) translateY(-50%) rotate(0deg); }
          50% { transform: translateX(-50%) translateY(-50%) rotate(180deg); }
        }
      `}</style>
    </section>
  );
}
