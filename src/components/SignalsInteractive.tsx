import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShieldCheck, Cpu, Zap, Radar, EyeOff } from 'lucide-react';

interface SignalItem {
  id: string;
  num: string;
  title: string;
  sentence: string;
  icon: any;
}

const SIGNALS_DATA: SignalItem[] = [
  {
    id: 'invisible-intelligence',
    num: '01',
    title: 'Invisible Intelligence',
    sentence: 'We don\'t wait for alerts. We observe intent before execution begins.',
    icon: EyeOff
  },
  {
    id: 'adaptive-security',
    num: '02',
    title: 'Adaptive Security',
    sentence: 'Anticipation is the only absolute armor. If you can see the attack, you are already too late.',
    icon: Radar
  },
  {
    id: 'quantum-readiness',
    num: '03',
    title: 'Quantum Readiness',
    sentence: 'The future isn\'t merely connected. It is entangled, and we secure the states.',
    icon: Zap
  },
  {
    id: 'machine-reasoning',
    num: '04',
    title: 'Machine Reasoning',
    sentence: 'Every byte has a hidden motive. We analyze the thought, not just the telemetry.',
    icon: Cpu
  },
  {
    id: 'cyber-resilience',
    num: '05',
    title: 'Cyber Resilience',
    sentence: 'Security isn\'t software. It is an architecture of complete and calculated uncertainty.',
    icon: ShieldCheck
  }
];

export default function SignalsInteractive() {
  const [activeId, setActiveId] = useState<string>('invisible-intelligence');

  return (
    <div className="w-full max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
      {/* Signals Selector Panel (Left/Top) */}
      <div className="md:col-span-6 flex flex-col gap-3">
        {SIGNALS_DATA.map((signal) => {
          const isActive = activeId === signal.id;
          const Icon = signal.icon;
          
          return (
            <button
              key={signal.id}
              onClick={() => setActiveId(signal.id)}
              onMouseEnter={() => setActiveId(signal.id)}
              className={`interactive-target w-full text-left p-4 rounded-sm border transition-all duration-500 flex items-center justify-between ${
                isActive
                  ? 'bg-brand-surface/80 border-brand-cyan/60 shadow-[0_0_20px_rgba(0,245,255,0.05)]'
                  : 'bg-black/20 border-white/5 hover:border-white/20'
              }`}
            >
              <div className="flex items-center gap-4">
                <span className={`font-mono text-xs ${isActive ? 'text-brand-cyan' : 'text-brand-muted'}`}>
                  {signal.num}
                </span>
                <div>
                  <h4 className={`font-heading font-semibold text-sm tracking-wider ${isActive ? 'text-white' : 'text-brand-muted/80'}`}>
                    {signal.title}
                  </h4>
                </div>
              </div>
              <Icon className={`h-4 w-4 transition-colors duration-500 ${isActive ? 'text-brand-cyan animate-pulse' : 'text-brand-muted/40'}`} />
            </button>
          );
        })}
      </div>

      {/* Mysterious Description Inspector (Right/Bottom) */}
      <div className="md:col-span-6 h-full min-h-[220px] flex flex-col justify-between p-6 rounded-sm border border-white/5 bg-black/40 backdrop-blur-md relative overflow-hidden">
        {/* Subtle grid accent inside the card */}
        <div className="absolute inset-0 bg-grid opacity-10 pointer-events-none" />
        
        {/* Glowing vertical lines */}
        <div className="absolute left-0 top-0 h-full w-[1px] bg-gradient-to-b from-brand-cyan/50 via-brand-violet/50 to-transparent" />

        <AnimatePresence mode="wait">
          {activeId && (
            <motion.div
              key={activeId}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="flex flex-col justify-between h-full gap-6 z-10"
            >
              <div>
                <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-brand-cyan block mb-2">
                  // SIGNAL {SIGNALS_DATA.find(s => s.id === activeId)?.num} INCOMING
                </span>
                <p className="font-sans text-base md:text-lg text-white font-light leading-relaxed tracking-wide italic">
                  "{SIGNALS_DATA.find(s => s.id === activeId)?.sentence}"
                </p>
              </div>

              {/* Graphical particle-like scanner indicator */}
              <div className="flex items-end gap-1.5 h-6">
                <span className="font-mono text-[9px] tracking-widest text-brand-muted mr-4">RESONANCE</span>
                <div className="h-3 w-1.5 bg-brand-cyan/60 animate-[pulse_0.8s_infinite]" />
                <div className="h-5 w-1.5 bg-brand-cyan/80 animate-[pulse_1.2s_infinite]" style={{ animationDelay: '0.2s' }} />
                <div className="h-2 w-1.5 bg-brand-violet/60 animate-[pulse_0.9s_infinite]" style={{ animationDelay: '0.1s' }} />
                <div className="h-4 w-1.5 bg-brand-violet/80 animate-[pulse_1.1s_infinite]" style={{ animationDelay: '0.4s' }} />
                <div className="h-1 w-1.5 bg-brand-muted/40 animate-[pulse_1.5s_infinite]" style={{ animationDelay: '0.3s' }} />
                <div className="h-3 w-1.5 bg-brand-cyan/40 animate-[pulse_0.7s_infinite]" style={{ animationDelay: '0.5s' }} />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
