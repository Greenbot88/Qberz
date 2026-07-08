import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Terminal } from 'lucide-react';
import Logo from './Logo';

interface TypewriterIntroProps {
  onEnter: () => void;
}

type Phase = 
  | 'idle_cursor'        // 0-2s cursor blinking only
  | 'typing_phrase_1'   // "Most companies protect data."
  | 'pause_phrase_1'    // pause before erase
  | 'erasing_phrase_1'  // erase
  | 'typing_phrase_2'   // "We protect what's next."
  | 'pause_phrase_2'    // pause before erase
  | 'erasing_phrase_2'  // erase
  | 'typing_phrase_3'   // "We protect what nobody knows exists."
  | 'pause_phrase_3'    // pause
  | 'fade_out_all'      // everything disappears
  | 'logo_reveal';      // logo INQBERZ with subtitle and ENTER button

export default function TypewriterIntro({ onEnter }: TypewriterIntroProps) {
  const [phase, setPhase] = useState<Phase>('idle_cursor');
  const [displayedText, setDisplayedText] = useState('');

  useEffect(() => {
    let timer: NodeJS.Timeout;

    // Phrase constants
    const p1 = "Most companies protect data.";
    const p2 = "We protect what's next.";
    const p3 = "We protect what nobody knows exists.";

    if (phase === 'idle_cursor') {
      timer = setTimeout(() => {
        setPhase('typing_phrase_1');
      }, 2000);
    } 
    
    else if (phase === 'typing_phrase_1') {
      if (displayedText.length < p1.length) {
        timer = setTimeout(() => {
          setDisplayedText(p1.slice(0, displayedText.length + 1));
        }, 75); // Typing speed
      } else {
        timer = setTimeout(() => {
          setPhase('pause_phrase_1');
        }, 1200);
      }
    } 
    
    else if (phase === 'pause_phrase_1') {
      timer = setTimeout(() => {
        setPhase('erasing_phrase_1');
      }, 500);
    } 
    
    else if (phase === 'erasing_phrase_1') {
      if (displayedText.length > 0) {
        timer = setTimeout(() => {
          setDisplayedText(displayedText.slice(0, -1));
        }, 30); // Erase speed
      } else {
        timer = setTimeout(() => {
          setPhase('typing_phrase_2');
        }, 500);
      }
    } 
    
    else if (phase === 'typing_phrase_2') {
      if (displayedText.length < p2.length) {
        timer = setTimeout(() => {
          setDisplayedText(p2.slice(0, displayedText.length + 1));
        }, 75);
      } else {
        timer = setTimeout(() => {
          setPhase('pause_phrase_2');
        }, 1200);
      }
    } 
    
    else if (phase === 'pause_phrase_2') {
      timer = setTimeout(() => {
        setPhase('erasing_phrase_2');
      }, 500);
    } 
    
    else if (phase === 'erasing_phrase_2') {
      if (displayedText.length > 0) {
        timer = setTimeout(() => {
          setDisplayedText(displayedText.slice(0, -1));
        }, 30);
      } else {
        timer = setTimeout(() => {
          setPhase('typing_phrase_3');
        }, 500);
      }
    } 
    
    else if (phase === 'typing_phrase_3') {
      if (displayedText.length < p3.length) {
        timer = setTimeout(() => {
          setDisplayedText(p3.slice(0, displayedText.length + 1));
        }, 85);
      } else {
        timer = setTimeout(() => {
          setPhase('pause_phrase_3');
        }, 2000);
      }
    } 
    
    else if (phase === 'pause_phrase_3') {
      timer = setTimeout(() => {
        setPhase('fade_out_all');
      }, 500);
    } 
    
    else if (phase === 'fade_out_all') {
      timer = setTimeout(() => {
        setPhase('logo_reveal');
      }, 1000);
    }

    return () => clearTimeout(timer);
  }, [phase, displayedText]);

  // Fast skip function for users who want to jump straight into the application
  const handleSkip = () => {
    setPhase('logo_reveal');
  };

  const isTypewriterPhase = 
    phase !== 'logo_reveal' && 
    phase !== 'fade_out_all';

  return (
    <div className="relative flex h-screen w-screen items-center justify-center bg-[#0D0D0D] overflow-hidden select-none">
      
      {/* Decorative vertical/horizontal scanning grid lines to make it cinematic */}
      <div className="absolute inset-0 bg-grid opacity-20 pointer-events-none" />
      <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-brand-cyan/20 to-transparent animate-pulse pointer-events-none" />

      {/* Skip Intro button in top right */}
      {isTypewriterPhase && (
        <button
          onClick={handleSkip}
          className="interactive-target absolute top-8 right-8 font-mono text-[10px] tracking-[0.2em] text-brand-muted hover:text-brand-cyan transition-colors border border-white/10 hover:border-brand-cyan/30 px-3 py-1.5 rounded-sm bg-black/40 backdrop-blur-sm"
        >
          SKIP SEQUENCE
        </button>
      )}

      <AnimatePresence mode="wait">
        {isTypewriterPhase ? (
          <motion.div
            key="typewriter-screen"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="flex items-center justify-center px-6 text-center"
          >
            <h1 className="font-mono text-lg md:text-2xl lg:text-3xl font-light tracking-wide text-white flex items-center justify-center h-20">
              <span>{displayedText}</span>
              <span className="w-[12px] h-[24px] md:h-[30px] bg-brand-cyan ml-2 animate-[pulse_1s_infinite] inline-block" />
            </h1>
          </motion.div>
        ) : phase === 'logo_reveal' ? (
          <motion.div
            key="logo-screen"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-center justify-center text-center px-4"
          >
            {/* INQBERZ logo with dynamic tracking letters and SVG vector branding */}
            <motion.div
              initial={{ letterSpacing: '0.4em', y: -10, opacity: 0 }}
              animate={{ letterSpacing: '0.8em', y: 0, opacity: 1 }}
              transition={{ duration: 4, ease: "easeOut" }}
              className="flex justify-center items-center"
            >
              <Logo 
                showText={true} 
                textSizeClass="text-4xl md:text-6xl lg:text-7xl font-extrabold" 
                iconSize={80}
                textTrackingClass="tracking-[0.4em]"
                glitchEffect={true}
              />
            </motion.div>

            {/* Glowing horizontal divider bar */}
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: '120px' }}
              transition={{ delay: 0.8, duration: 1.2, ease: "easeInOut" }}
              className="h-[1px] bg-gradient-to-r from-transparent via-brand-cyan to-transparent my-6"
            />

            {/* AI • Cybersecurity • Quantum Subtitles */}
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 1 }}
              className="font-mono text-[11px] md:text-xs uppercase tracking-[0.4em] text-brand-muted mb-12"
            >
              <span className="text-brand-cyan">AI</span>
              <span className="mx-2 text-white/20">•</span>
              <span className="text-brand-violet">Cybersecurity</span>
              <span className="mx-2 text-white/20">•</span>
              <span className="text-white">Quantum</span>
            </motion.p>

            {/* Enter Button */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.4, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            >
              <button
                onClick={onEnter}
                className="interactive-target relative group flex items-center justify-center gap-3 overflow-hidden border border-white/20 px-8 py-4 bg-transparent rounded-sm text-xs font-mono tracking-[0.3em] uppercase text-white hover:text-brand-cyan transition-all duration-500 hover:border-brand-cyan/60"
                style={{
                  boxShadow: 'inset 0 0 0 0 rgba(0, 245, 255, 0)'
                }}
              >
                {/* Magnetic-like glowing border sweep */}
                <span className="absolute inset-0 block bg-gradient-to-r from-brand-cyan/0 via-brand-cyan/10 to-brand-cyan/0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out" />
                
                <Terminal className="h-4 w-4 text-brand-violet group-hover:text-brand-cyan transition-colors duration-300" />
                ENTER THE MATRIX
              </button>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
