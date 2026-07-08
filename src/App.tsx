import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ArrowDown, 
  Brain, 
  Atom, 
  Satellite, 
  Fingerprint, 
  Network, 
  Dna, 
  Key, 
  Cloud,
  ChevronDown,
  Terminal as TerminalIcon,
  ShieldAlert,
  Compass,
  FileKey2
} from 'lucide-react';

import CanvasBackground from './components/CanvasBackground';
import AudioDrone from './components/AudioDrone';
import CursorOrb from './components/CursorOrb';
import TypewriterIntro from './components/TypewriterIntro';
import SignalsInteractive from './components/SignalsInteractive';
import VaultUnlockModal from './components/VaultUnlockModal';
import ScrollIndicator from './components/ScrollIndicator';

export default function App() {
  const [introPassed, setIntroPassed] = useState(false);
  const [scrollIndex, setScrollIndex] = useState(0);
  const [glitchActive, setGlitchActive] = useState(false);
  const [vaultOpen, setVaultOpen] = useState(false);
  const [hoveredIconText, setHoveredIconText] = useState<string | null>(null);

  const isScrollingRef = useRef(false);
  const touchStartYRef = useRef(0);

  // Transition to next/prev sections with brief screen glitch
  const triggerTransition = (newIndex: number) => {
    setGlitchActive(true);
    setScrollIndex(newIndex);
    setTimeout(() => {
      setGlitchActive(false);
    }, 450);
  };

  const nextSection = () => {
    if (scrollIndex < 20) {
      triggerTransition(scrollIndex + 1);
    }
  };

  const prevSection = () => {
    if (scrollIndex > 0) {
      triggerTransition(scrollIndex - 1);
    }
  };

  // Keyboard and scroll wheel listeners
  useEffect(() => {
    if (!introPassed) return;

    const handleWheel = (e: WheelEvent) => {
      if (vaultOpen) return;
      if (isScrollingRef.current) return;

      if (Math.abs(e.deltaY) > 25) {
        isScrollingRef.current = true;
        if (e.deltaY > 0) {
          nextSection();
        } else {
          prevSection();
        }
        setTimeout(() => {
          isScrollingRef.current = false;
        }, 1100); // 1.1s debounce prevents kinetic scroll loops
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (vaultOpen) return;
      if (isScrollingRef.current) return;

      if (e.key === 'ArrowDown' || e.key === ' ' || e.key === 'PageDown') {
        e.preventDefault();
        isScrollingRef.current = true;
        nextSection();
        setTimeout(() => { isScrollingRef.current = false; }, 1100);
      } else if (e.key === 'ArrowUp' || e.key === 'PageUp') {
        e.preventDefault();
        isScrollingRef.current = true;
        prevSection();
        setTimeout(() => { isScrollingRef.current = false; }, 1100);
      }
    };

    const handleTouchStart = (e: TouchEvent) => {
      touchStartYRef.current = e.touches[0].clientY;
    };

    const handleTouchEnd = (e: TouchEvent) => {
      if (vaultOpen) return;
      if (isScrollingRef.current) return;

      const touchEndY = e.changedTouches[0].clientY;
      const deltaY = touchStartYRef.current - touchEndY;

      if (Math.abs(deltaY) > 50) {
        isScrollingRef.current = true;
        if (deltaY > 0) {
          nextSection();
        } else {
          prevSection();
        }
        setTimeout(() => {
          isScrollingRef.current = false;
        }, 1100);
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: true });
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchend', handleTouchEnd, { passive: true });

    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, [introPassed, scrollIndex, vaultOpen]);

  // Handle intro finish
  const handleIntroEnter = () => {
    setIntroPassed(true);
    setScrollIndex(1); // jump to first continuous scroll section
  };

  // Continuous Terminal Typer simulation for Scroll 12
  const [terminalLines, setTerminalLines] = useState<string[]>([]);
  useEffect(() => {
    if (scrollIndex !== 12) return;
    setTerminalLines(['Initializing security envelope...']);

    const steps = [
      'Establishing quantum entangled canal...',
      'Deep learning models active (98.4% certainty).',
      'Scanning local environment vectors...',
      'Analyzing adaptive intent waveforms...',
      'Threat identified: Unknown quantum-break attempt.',
      'Defensive counter-mutate signature compiled.',
      'Response vector successfully initiated.',
      'System stable. Continuous observation active.'
    ];

    let tIndex = 0;
    const interval = setInterval(() => {
      if (tIndex < steps.length) {
        setTerminalLines(prev => [...prev, `> ${steps[tIndex]}`]);
        tIndex++;
      } else {
        clearInterval(interval);
      }
    }, 1500);

    return () => clearInterval(interval);
  }, [scrollIndex]);

  // Predefined hover icons for Scroll 18
  const iconsData = [
    { icon: Brain, label: 'AI', sentence: 'We don\'t train algorithms. We anticipate behavioral motives.' },
    { icon: Atom, label: 'Quantum', sentence: 'Entangled states do not suffer from local physical interception.' },
    { icon: Satellite, label: 'Satellite', sentence: 'Telemetry is latency. Absolute security operates out-of-band.' },
    { icon: Fingerprint, label: 'Fingerprint', sentence: 'Every cyber adversary leaves an indelible digital signature of intent.' },
    { icon: Network, label: 'Neural Network', sentence: 'Synapses of defense must mutate faster than malicious vectors.' },
    { icon: Dna, label: 'DNA', sentence: 'Core defense system must be biologically adaptive and self-healing.' },
    { icon: Key, label: 'Encryption', sentence: 'Perfect trust exists only in calculated zero-knowledge certainty.' },
    { icon: Cloud, label: 'Cloud', sentence: 'Distributed networks are resilient only when completely decentralized.' }
  ];

  // If intro sequence is active, lock viewport there
  if (!introPassed) {
    return (
      <>
        <TypewriterIntro onEnter={handleIntroEnter} />
        <CursorOrb />
      </>
    );
  }

  // Define section render content helper
  const renderSectionContent = () => {
    switch (scrollIndex) {
      case 1:
        return (
          <div className="flex flex-col items-center justify-center text-center px-6 max-w-4xl">
            <motion.h1 
              initial={{ scale: 1.2, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1 }}
              className="font-heading font-extrabold text-3xl md:text-5xl lg:text-6xl tracking-tight leading-tight text-white uppercase"
            >
              Every attack begins before you know it exists.
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="mt-6 font-sans text-brand-muted text-sm md:text-base tracking-widest font-light"
            >
              Not every threat is visible. <span className="text-white">Not every defense should be.</span>
            </motion.p>
          </div>
        );

      case 2:
        return (
          <div className="flex flex-col items-center justify-center text-center px-6">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2 }}
              className="font-sans font-light text-2xl md:text-4xl lg:text-5xl tracking-wide max-w-3xl leading-snug"
            >
              Firewalls stop yesterday. <br />
              <span className="font-semibold text-brand-cyan">We stop tomorrow.</span>
            </motion.h2>
          </div>
        );

      case 3:
        return (
          <div className="flex flex-col items-center justify-center text-center px-6 relative max-w-4xl">
            <div className="absolute inset-0 bg-brand-red/5 blur-[120px] pointer-events-none rounded-full" />
            <motion.span 
              className="font-mono text-[10px] tracking-[0.4em] text-brand-red uppercase mb-4 block"
              animate={{ opacity: [1, 0.4, 1] }}
              transition={{ repeat: Infinity, duration: 2 }}
            >
              // SYSTEMS OUT_OF_BALANCE
            </motion.span>
            <h2 className="font-heading font-extrabold text-4xl md:text-6xl tracking-tight text-white uppercase relative">
              "Intelligence is no longer artificial. <br />
              <span className="text-brand-red glitch-text" data-text="It's weaponized.">It's weaponized."</span>
            </h2>
          </div>
        );

      case 4:
        return (
          <div className="flex flex-col items-center justify-center text-center px-6 max-w-4xl">
            {/* Spinning Quantum Wireframe Representation */}
            <div className="relative w-48 h-48 mb-8 flex items-center justify-center">
              <div className="absolute inset-0 border border-brand-violet/30 rounded-full animate-spin [animation-duration:8s]" />
              <div className="absolute w-40 h-40 border border-brand-cyan/20 rounded-full animate-spin [animation-duration:12s] [animation-direction:reverse]" />
              <div className="absolute w-28 h-28 border border-white/5 rounded-full animate-pulse" />
              <div className="w-4 h-4 bg-white rounded-full shadow-[0_0_15px_#ffffff] animate-ping" />
            </div>
            
            <h3 className="font-sans font-light text-xl md:text-3xl tracking-wide text-brand-muted max-w-2xl leading-relaxed">
              Quantum doesn't break encryption. <br />
              <span className="text-white font-medium">It changes the rules of reality.</span>
            </h3>
          </div>
        );

      case 5:
        return (
          <div className="flex flex-col items-center justify-center w-full max-w-6xl px-6">
            <span className="font-mono text-[9px] tracking-[0.3em] text-brand-muted uppercase mb-8">// SEGMENTED PARADIGMS</span>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
              {/* Card 1 */}
              <motion.div 
                whileHover={{ rotateY: 10, scale: 1.03 }}
                className="interactive-target p-8 bg-brand-surface border border-white/5 hover:border-brand-cyan/40 rounded-sm flex flex-col gap-4 text-left transition-all duration-500"
              >
                <span className="font-mono text-xs text-brand-cyan font-semibold">01 / AI</span>
                <h4 className="font-heading font-bold text-lg text-white uppercase tracking-wider">Not automation.</h4>
                <p className="font-mono text-xs text-brand-muted">Prediction.</p>
              </motion.div>

              {/* Card 2 */}
              <motion.div 
                whileHover={{ rotateY: -10, scale: 1.03 }}
                className="interactive-target p-8 bg-brand-surface border border-white/5 hover:border-brand-violet/40 rounded-sm flex flex-col gap-4 text-left transition-all duration-500"
              >
                <span className="font-mono text-xs text-brand-violet font-semibold">02 / Cybersecurity</span>
                <h4 className="font-heading font-bold text-lg text-white uppercase tracking-wider">Not detection.</h4>
                <p className="font-mono text-xs text-brand-muted">Anticipation.</p>
              </motion.div>

              {/* Card 3 */}
              <motion.div 
                whileHover={{ rotateY: 8, scale: 1.03 }}
                className="interactive-target p-8 bg-brand-surface border border-white/5 hover:border-white/30 rounded-sm flex flex-col gap-4 text-left transition-all duration-500"
              >
                <span className="font-mono text-xs text-white/50 font-semibold">03 / Quantum</span>
                <h4 className="font-heading font-bold text-lg text-white uppercase tracking-wider">Not computing.</h4>
                <p className="font-mono text-xs text-brand-muted">Possibility.</p>
              </motion.div>
            </div>
          </div>
        );

      case 6:
        return (
          <div className="flex flex-col md:flex-row items-center justify-center gap-16 px-6 max-w-5xl">
            <div className="text-center md:text-left flex flex-col gap-2">
              <span className="font-heading font-extrabold text-7xl md:text-9xl text-white tracking-tighter leading-none">
                99%
              </span>
              <p className="font-mono text-xs uppercase tracking-widest text-brand-muted">
                Of attacks leave evidence.
              </p>
            </div>

            <div className="h-16 w-[1px] bg-white/10 hidden md:block" />

            <div className="text-center md:text-left flex flex-col gap-2">
              <span className="font-heading font-extrabold text-7xl md:text-9xl text-brand-cyan tracking-tighter leading-none">
                1%
              </span>
              <p className="font-mono text-xs uppercase tracking-widest text-brand-muted">
                Leave questions.
              </p>
            </div>

            <div className="h-16 w-[1px] bg-white/10 hidden md:block" />

            <div className="text-center md:text-left max-w-xs">
              <h4 className="font-heading text-lg font-bold uppercase tracking-wider text-white">
                We focus on the 1%.
              </h4>
              <p className="font-sans text-xs text-brand-muted mt-2 leading-relaxed">
                When logs are clean, signatures match, and endpoints report normal... that is where threat evolves.
              </p>
            </div>
          </div>
        );

      case 7:
        return (
          <div className="flex flex-col items-center justify-center text-center px-6 max-w-4xl relative">
            <div className="absolute inset-0 bg-brand-red/10 blur-[140px] pointer-events-none rounded-full" />
            <span className="font-mono text-[10px] tracking-[0.4em] text-brand-red uppercase mb-4">
              // WARNING ENVELOPE ACTIVATED
            </span>
            <h3 className="font-heading font-extrabold text-3xl md:text-5xl lg:text-6xl text-white uppercase leading-tight">
              The biggest cyber risk <br className="hidden md:inline" />
              isn't malware.
            </h3>
            
            {/* Dramatically delayed subphrase representing "Pause... It's certainty" */}
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.8, duration: 1 }}
              className="mt-6 font-sans text-brand-red text-xl md:text-2xl tracking-widest font-medium uppercase border-t border-brand-red/30 pt-4 px-8"
            >
              It's certainty.
            </motion.p>
          </div>
        );

      case 8:
        return (
          <div className="flex flex-col items-center justify-center text-center px-6 max-w-5xl">
            <span className="font-mono text-[9px] tracking-[0.3em] text-brand-muted uppercase mb-12">
              // ENTANGLED CONCEPTS
            </span>
            
            {/* Word Soup Breadcrumbs */}
            <div className="flex flex-wrap justify-center gap-x-8 gap-y-6 max-w-3xl">
              {[
                "Zero Trust", "Adaptive Intelligence", "Post Quantum", 
                "Digital Twin", "Threat Modeling", "Autonomous Defense", 
                "Quantum Randomness", "Dark AI", "Synthetic Identity", "Behavioral Intelligence"
              ].map((word, idx) => (
                <motion.span
                  key={word}
                  initial={{ opacity: 0.1, scale: 0.95 }}
                  animate={{ opacity: 0.8, scale: 1 }}
                  whileHover={{ opacity: 1, scale: 1.1, color: '#00F5FF' }}
                  transition={{ delay: idx * 0.1, duration: 0.5 }}
                  className="interactive-target font-mono text-xs md:text-sm tracking-widest text-brand-muted border border-white/5 hover:border-brand-cyan/20 px-4 py-2 rounded-full cursor-none bg-brand-surface/40 backdrop-blur-sm transition-all duration-300"
                >
                  {word}
                </motion.span>
              ))}
            </div>
            
            <p className="mt-12 font-mono text-[10px] tracking-widest text-brand-muted/50 uppercase max-w-md italic">
              "We speak the terminology of attackers. We leave brochures to suppliers."
            </p>
          </div>
        );

      case 9:
        return (
          <div className="flex flex-col items-center justify-center text-center px-6 max-w-4xl">
            <span className="font-mono text-[9px] tracking-[0.3em] text-brand-cyan uppercase mb-6">// CONTINUOUS GAME THEORY</span>
            
            <h2 className="font-heading font-extrabold text-3xl md:text-5xl lg:text-6xl text-white uppercase leading-snug">
              AI protects. AI attacks. <br />
              <span className="text-brand-violet italic">Which side evolves faster?</span>
            </h2>
            
            <div className="w-16 h-[1px] bg-brand-violet/40 my-8" />
            <p className="font-mono text-xs text-brand-muted tracking-widest max-w-lg">
              Dynamic mutation engines are deployed by state actors. Traditional static parameters cannot match adaptive agency.
            </p>
          </div>
        );

      case 10:
        return (
          <div className="flex flex-col items-center justify-center text-center px-6 max-w-4xl">
            <h2 className="font-heading font-extrabold text-3xl md:text-5xl lg:text-7xl text-white uppercase leading-tight tracking-tight">
              Most companies sell cybersecurity. <br />
              <span className="text-brand-cyan font-light block mt-4">We engineer uncertainty.</span>
            </h2>
          </div>
        );

      case 11:
        return (
          <div className="flex flex-col items-center justify-center text-center px-6 max-w-3xl">
            <span className="font-mono text-[9px] tracking-[0.3em] text-brand-muted uppercase mb-4">// CORE STRUCTURAL MAXIM</span>
            <h2 className="font-sans font-light text-2xl md:text-4xl text-white leading-relaxed tracking-wide">
              Security isn't software. <br />
              <span className="font-semibold text-brand-violet uppercase font-heading text-3xl md:text-5xl tracking-widest">It's architecture.</span>
            </h2>
          </div>
        );

      case 12:
        return (
          <div className="flex flex-col items-center justify-center px-6 w-full max-w-3xl">
            <div className="w-full bg-brand-surface border border-white/10 rounded-sm p-6 font-mono text-xs relative overflow-hidden">
              <div className="absolute top-2 right-4 flex gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-brand-red/60" />
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/60" />
                <div className="w-2.5 h-2.5 rounded-full bg-green-500/60" />
              </div>
              
              <div className="flex items-center gap-2 border-b border-white/5 pb-3 mb-4">
                <TerminalIcon className="h-4 w-4 text-brand-cyan" />
                <span className="text-brand-muted tracking-widest text-[9px] uppercase">
                  INQBERZ INTENTIONAL AUTOMATED SIMULATOR
                </span>
              </div>

              <div className="space-y-2 text-brand-muted font-light h-48 overflow-y-auto no-scrollbar">
                {terminalLines.map((line, idx) => (
                  <p key={idx} className={idx === terminalLines.length - 1 ? 'text-brand-cyan font-medium' : ''}>
                    {line}
                  </p>
                ))}
                <span className="w-1.5 h-3 bg-brand-cyan inline-block animate-pulse ml-1" />
              </div>
            </div>
          </div>
        );

      case 13:
        return (
          <div className="flex flex-col items-center justify-center w-full max-w-5xl px-6">
            <div className="text-center mb-10">
              <span className="font-mono text-[9px] tracking-[0.3em] text-brand-muted uppercase mb-2 block">// SPECTRUM RANGE</span>
              <h2 className="font-heading font-extrabold text-2xl md:text-4xl text-white uppercase tracking-wider">
                SIGNALS RECEIVED
              </h2>
            </div>
            
            <SignalsInteractive />
          </div>
        );

      case 14:
        return (
          <div className="flex flex-col items-center justify-center text-center px-6 max-w-4xl">
            <span className="font-mono text-[9px] tracking-[0.3em] text-brand-red uppercase mb-6">// VENDOR REJECTION</span>
            
            <h2 className="font-heading font-extrabold text-3xl md:text-5xl lg:text-6xl text-white uppercase leading-tight">
              You don't need another vendor.
            </h2>
            <p className="mt-6 font-sans text-brand-muted text-lg md:text-2xl font-light tracking-wide max-w-3xl leading-relaxed">
              You need someone <span className="text-brand-cyan font-medium">your attackers haven't anticipated.</span>
            </p>
          </div>
        );

      case 15:
        return (
          <div className="flex flex-col items-center justify-center text-center px-6 max-w-3xl">
            <h3 className="font-sans font-light text-xl md:text-3xl text-brand-muted leading-relaxed tracking-wide">
              Confidentiality isn't a promise. <br />
              <span className="text-white font-medium font-heading uppercase text-3xl md:text-5xl block mt-4 tracking-wider">It's infrastructure.</span>
            </h3>
          </div>
        );

      case 16:
        return (
          <div className="flex flex-col items-center justify-center text-center px-6 max-w-4xl">
            <span className="font-mono text-[9px] tracking-[0.3em] text-brand-cyan uppercase mb-8">// TIMELINE SHIFT</span>
            
            <div className="flex flex-col gap-8 md:gap-12 text-left md:text-center">
              <div>
                <p className="font-mono text-[10px] tracking-widest text-brand-muted uppercase">TODAY'S SECURITY</p>
                <p className="font-heading font-extrabold text-2xl md:text-4xl text-white tracking-wide mt-1">
                  Protects data.
                </p>
              </div>
              
              <div className="h-[1px] w-24 bg-white/10 mx-auto" />
              
              <div>
                <p className="font-mono text-[10px] tracking-widest text-brand-cyan uppercase">TOMORROW'S SECURITY</p>
                <p className="font-heading font-extrabold text-2xl md:text-4xl text-brand-cyan tracking-wide mt-1">
                  Protects decisions.
                </p>
              </div>
            </div>
          </div>
        );

      case 17:
        return (
          <div className="flex flex-col items-center justify-center text-center px-6 max-w-4xl">
            <span className="font-mono text-[9px] tracking-[0.3em] text-brand-muted uppercase mb-4">// CODEBOOKS & PATTERNS</span>
            <h2 className="font-heading font-extrabold text-3xl md:text-5xl lg:text-6xl text-white uppercase leading-snug">
              "Every algorithm tells a story. <br />
              <span className="text-brand-violet italic">We read the ones nobody notices."</span>
            </h2>
          </div>
        );

      case 18:
        return (
          <div className="flex flex-col items-center justify-center w-full max-w-4xl px-6">
            <span className="font-mono text-[9px] tracking-[0.3em] text-brand-muted uppercase mb-8 block text-center">// INTERACTIVE QUANTUM CODES</span>
            
            {/* Grid of only icons, hover reveals one sentence */}
            <div className="grid grid-cols-4 md:grid-cols-8 gap-6 w-full justify-items-center">
              {iconsData.map((item, idx) => {
                const Icon = item.icon;
                return (
                  <button
                    key={idx}
                    onMouseEnter={() => setHoveredIconText(item.sentence)}
                    onMouseLeave={() => setHoveredIconText(null)}
                    onClick={() => setHoveredIconText(item.sentence)}
                    className="interactive-target h-14 w-14 rounded-sm border border-white/5 bg-brand-surface/20 flex items-center justify-center text-brand-muted hover:text-brand-cyan hover:border-brand-cyan/40 hover:bg-brand-surface transition-all duration-300"
                  >
                    <Icon className="h-6 w-6" />
                  </button>
                );
              })}
            </div>

            {/* Hover Sentence Panel */}
            <div className="mt-12 h-16 w-full max-w-lg border border-dashed border-white/10 bg-black/40 p-4 rounded-sm flex items-center justify-center text-center relative overflow-hidden">
              <AnimatePresence mode="wait">
                {hoveredIconText ? (
                  <motion.p
                    key={hoveredIconText}
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    transition={{ duration: 0.2 }}
                    className="font-mono text-xs text-white"
                  >
                    {hoveredIconText}
                  </motion.p>
                ) : (
                  <motion.p
                    key="placeholder"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.4 }}
                    exit={{ opacity: 0 }}
                    className="font-mono text-[10px] uppercase tracking-widest text-brand-muted"
                  >
                    Hover/select an icon to observe its fingerprint
                  </motion.p>
                )}
              </AnimatePresence>
            </div>
          </div>
        );

      case 19:
        return (
          <div className="flex flex-col items-center justify-center text-center px-6 max-w-4xl">
            <span className="font-mono text-[9px] tracking-[0.3em] text-brand-muted uppercase mb-6">// COGNITIVE OPERATIONS</span>
            <h2 className="font-heading font-extrabold text-4xl md:text-6xl lg:text-7xl text-white uppercase leading-tight">
              The future won't be hacked. <br />
              <span className="text-brand-cyan font-light block mt-4">It will be manipulated.</span>
            </h2>
          </div>
        );

      case 20:
        return (
          <div className="flex flex-col items-center justify-center text-center px-6 max-w-xl w-full">
            {/* Final Logo */}
            <h2 className="font-heading font-extrabold text-5xl md:text-6xl tracking-[0.3em] text-white uppercase glitch-text" data-text="INQBERZ">
              INQBERZ
            </h2>
            
            <p className="font-sans font-light text-base md:text-lg text-brand-muted mt-6 mb-8 leading-relaxed">
              Some conversations shouldn't happen over email.
            </p>

            {/* Magnetic CTA trigger */}
            <button
              onClick={() => setVaultOpen(true)}
              className="interactive-target relative group flex items-center justify-center gap-3 overflow-hidden border border-brand-cyan px-8 py-4 bg-brand-cyan/5 rounded-sm text-xs font-mono tracking-[0.3em] uppercase text-brand-cyan hover:text-black hover:bg-brand-cyan transition-all duration-500"
            >
              <FileKey2 className="h-4 w-4 animate-pulse group-hover:rotate-12 transition-transform" />
              REQUEST ACCESS
            </button>

            {/* Footer Elements inside Section 20 */}
            <div className="w-full mt-16 pt-8 border-t border-white/5 grid grid-cols-2 gap-4 font-mono text-[9px] tracking-wider text-brand-muted text-left">
              <div className="flex flex-col gap-1.5">
                <span>SECURE@INQBERZ.SEC</span>
                <span>GENEVA / CH</span>
                <span>LINKEDIN/INQBERZ</span>
              </div>
              <div className="flex flex-col gap-1.5 text-right">
                <span>SHA-256: 9E:2D:A5...</span>
                <span>VERSION: v01.2035</span>
                <span>BUILD: #C399A2</span>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="relative min-h-screen bg-[#050505] text-white flex flex-col justify-between overflow-hidden">
      
      {/* Glitch Overlay effects */}
      {glitchActive && (
        <div className="fixed inset-0 z-50 bg-brand-cyan/5 mix-blend-difference pointer-events-none transition-opacity duration-300">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle,rgba(109,93,253,0.15),transparent)] animate-pulse" />
        </div>
      )}

      {/* Main interactive Background Canvas */}
      <CanvasBackground scrollIndex={scrollIndex} glitchActive={glitchActive} />

      {/* Procedural Audio Drone component */}
      <AudioDrone />

      {/* Custom Adaptive Cursor Orb */}
      <CursorOrb />

      {/* Sidebar narrative coordinates indicator */}
      <ScrollIndicator 
        activeIndex={scrollIndex} 
        onNavigate={(idx) => triggerTransition(idx)} 
      />

      {/* Top logo watermark showing the timeline focus */}
      <header className="fixed top-6 left-6 z-40 flex items-center gap-2">
        <span className="font-heading font-extrabold text-base tracking-[0.2em] text-white">
          INQBERZ
        </span>
        <div className="w-1.5 h-1.5 rounded-full bg-brand-cyan animate-ping" />
      </header>

      {/* Central narrative viewport */}
      <main className="flex-1 flex items-center justify-center min-h-screen py-20 relative select-none">
        <AnimatePresence mode="wait">
          <motion.div
            key={scrollIndex}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="w-full flex justify-center items-center"
          >
            {renderSectionContent()}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Bottom status markers */}
      <footer className="fixed bottom-6 left-6 z-40 font-mono text-[8px] tracking-[0.25em] text-brand-muted hidden sm:flex items-center gap-4">
        <span>UTC TIMELINE: 2035.07</span>
        <span className="opacity-30">•</span>
        <span>INDEX: {scrollIndex.toString().padStart(2, '0')} / 20</span>
        {scrollIndex < 20 && (
          <button 
            onClick={nextSection}
            className="interactive-target flex items-center gap-1 text-brand-cyan hover:text-white transition-colors duration-300"
          >
            <span>NEXT COORD</span>
            <ChevronDown className="h-3 w-3 animate-bounce" />
          </button>
        )}
      </footer>

      {/* Vault Decryption Modal Form */}
      <VaultUnlockModal 
        isOpen={vaultOpen} 
        onClose={() => setVaultOpen(false)} 
      />

    </div>
  );
}
