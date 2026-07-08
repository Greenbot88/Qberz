import { motion } from 'motion/react';

interface ScrollIndicatorProps {
  activeIndex: number;
  onNavigate: (index: number) => void;
}

const INDICATORS = [
  { idx: 0, label: 'INTRO' },
  { idx: 1, label: '01 VISIBILITY' },
  { idx: 2, label: '02 STOP YESTERDAY' },
  { idx: 3, label: '03 WEAPONIZED' },
  { idx: 4, label: '04 ENCRYPTION' },
  { idx: 5, label: '05 ANTICIPATION' },
  { idx: 6, label: '06 THE 1%' },
  { idx: 7, label: '07 CERTAINTY' },
  { idx: 8, label: '08 BREADCRUMBS' },
  { idx: 9, label: '09 EVOLUTION' },
  { idx: 10, label: '10 UNCERTAINTY' },
  { idx: 11, label: '11 ARCHITECTURE' },
  { idx: 12, label: '12 TERMINAL' },
  { idx: 13, label: '13 SIGNALS' },
  { idx: 14, label: '14 ATTACKERS' },
  { idx: 15, label: '15 CONFIDENTIALITY' },
  { idx: 16, label: '16 DECISIONS' },
  { idx: 17, label: '17 NARRATIVES' },
  { idx: 18, label: '18 QUANTUM MAP' },
  { idx: 19, label: '19 MANIPULATED' },
  { idx: 20, label: '20 THE SECURE VAULT' },
];

export default function ScrollIndicator({ activeIndex, onNavigate }: ScrollIndicatorProps) {
  return (
    <div className="fixed right-6 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col gap-2 items-end">
      <div className="font-mono text-[8px] tracking-[0.2em] text-brand-muted/40 uppercase mb-2">
        COORDINATE GRID
      </div>
      
      {INDICATORS.map((indicator) => {
        const isActive = activeIndex === indicator.idx;
        
        return (
          <button
            key={indicator.idx}
            onClick={() => onNavigate(indicator.idx)}
            className="group flex items-center gap-3 text-right focus:outline-none interactive-target"
          >
            {/* Label reveals only on hover or when active */}
            <span 
              className={`font-mono text-[9px] tracking-widest uppercase transition-all duration-300 ${
                isActive 
                  ? 'text-brand-cyan opacity-100 font-semibold' 
                  : 'text-brand-muted/30 opacity-0 group-hover:opacity-100'
              }`}
            >
              {indicator.label}
            </span>

            {/* Indicator Dot */}
            <div className="relative flex items-center justify-center w-3 h-3">
              {isActive && (
                <motion.div
                  layoutId="activeIndicatorRing"
                  className="absolute w-3 h-3 rounded-full border border-brand-cyan"
                  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                />
              )}
              <div 
                className={`w-1 h-1 rounded-full transition-all duration-300 ${
                  isActive 
                    ? 'bg-brand-cyan' 
                    : 'bg-brand-muted/40 group-hover:bg-brand-cyan/60 group-hover:scale-150'
                }`}
              />
            </div>
          </button>
        );
      })}
    </div>
  );
}
