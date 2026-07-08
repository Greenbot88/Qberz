import { useState, useEffect, FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShieldAlert, KeyRound, Check, Terminal, Lock, Unlock } from 'lucide-react';

interface VaultUnlockModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function VaultUnlockModal({ isOpen, onClose }: VaultUnlockModalProps) {
  const [decryptProgress, setDecryptProgress] = useState(0);
  const [stage, setStage] = useState<'initializing' | 'decrypting' | 'unlocked' | 'success'>('initializing');
  const [formData, setFormData] = useState({ name: '', enterprise: '', contact: '' });

  // Decryption counting effect
  useEffect(() => {
    if (!isOpen) {
      setDecryptProgress(0);
      setStage('initializing');
      return;
    }

    let interval: NodeJS.Timeout;
    
    // Initializer phase
    const initTimer = setTimeout(() => {
      setStage('decrypting');
      
      interval = setInterval(() => {
        setDecryptProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            setTimeout(() => {
              setStage('unlocked');
            }, 500);
            return 100;
          }
          // Increment randomly
          return prev + Math.floor(Math.random() * 8) + 4;
        });
      }, 80);

    }, 800);

    return () => {
      clearTimeout(initTimer);
      if (interval) clearInterval(interval);
    };
  }, [isOpen]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setStage('success');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-xl"
        >
          {/* Glowing scanner line sweeping vertically */}
          <div className="absolute inset-x-0 h-[2px] bg-brand-cyan/20 animate-[bounce_6s_infinite] pointer-events-none" />

          <motion.div
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 20 }}
            transition={{ type: 'spring', damping: 25 }}
            className="w-full max-w-lg bg-brand-bg border border-white/10 rounded-sm p-6 md:p-8 relative overflow-hidden"
          >
            {/* Corner decorations */}
            <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-brand-cyan" />
            <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-brand-cyan" />
            <div className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-brand-cyan" />
            <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-brand-cyan" />

            {/* STAGE 1: INITIALIZING */}
            {stage === 'initializing' && (
              <div className="flex flex-col items-center justify-center py-12 text-center gap-4">
                <Lock className="h-8 w-8 text-brand-violet animate-pulse" />
                <h3 className="font-mono text-sm tracking-[0.2em] uppercase text-white">
                  Establishing Secure Node
                </h3>
                <div className="w-16 h-[1px] bg-brand-violet/40 animate-pulse" />
                <span className="font-mono text-[9px] text-brand-muted">
                  GENERATING QUANTUM SYMMETRIC MATRIX...
                </span>
              </div>
            )}

            {/* STAGE 2: DECRYPTING CALCULATIONS */}
            {stage === 'decrypting' && (
              <div className="flex flex-col py-8 gap-6">
                <div className="flex justify-between items-center font-mono text-xs">
                  <span className="text-brand-cyan tracking-wider">// DECRYPTING SECURE ROUTE</span>
                  <span className="text-white">{Math.min(decryptProgress, 100)}%</span>
                </div>
                
                {/* Progress bar */}
                <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                  <motion.div 
                    className="h-full bg-gradient-to-r from-brand-violet to-brand-cyan"
                    style={{ width: `${Math.min(decryptProgress, 100)}%` }}
                  />
                </div>

                {/* Shifting hexadecimal console matrix */}
                <div className="bg-black/50 p-4 rounded border border-white/5 font-mono text-[10px] text-brand-muted h-32 overflow-hidden relative">
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-bg via-transparent to-transparent pointer-events-none" />
                  <div className="animate-[pulse_1.5s_infinite]">
                    <p>{`> ENCRYPTED FINGERPRINT SHA-512...`}</p>
                    <p>{`> ALIGNING ADAPTIVE WEIGHTS: [${(Math.random()*1000).toFixed(0)} - ${(Math.random()*1000).toFixed(0)}]`}</p>
                    <p>{`> DECONSTRUCTING ENCRYPTED TUNNEL PROTOCOLS`}</p>
                    <p>{`> KEY VECTOR: [${Array.from({length: 4}, () => Math.floor(Math.random()*16).toString(16)).join('')}]`}</p>
                    <p>{`> INJECTING SYNTHETIC ZERO-KNOWLEDGE EVIDENCE...`}</p>
                    <p>{`> ENTROPIC RESONANCE SECURED`}</p>
                  </div>
                </div>
              </div>
            )}

            {/* STAGE 3: UNLOCKED SECURE FORM */}
            {stage === 'unlocked' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex flex-col gap-6"
              >
                <div className="flex items-center gap-3 border-b border-white/10 pb-4">
                  <Unlock className="h-5 w-5 text-brand-cyan animate-pulse" />
                  <div>
                    <h3 className="font-heading font-semibold text-base tracking-wider text-white">
                      CHANNEL INSTANTIATED
                    </h3>
                    <p className="font-mono text-[9px] text-brand-muted">
                      SECURE TERMINAL ACTIVE • INQBERZ PRIVATE KEY RECOGNIZED
                    </p>
                  </div>
                </div>

                <form onSubmit={handleSubmit} className="flex flex-col gap-4 font-mono">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] tracking-widest text-brand-muted uppercase">
                      COGNIZANT NODE (NAME)
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. J. Nolan"
                      className="w-full bg-black/40 border border-white/10 px-3 py-2 text-xs text-white focus:outline-none focus:border-brand-cyan transition-colors"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] tracking-widest text-brand-muted uppercase">
                      ORGANIZATION / ENTITY
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.enterprise}
                      onChange={(e) => setFormData({ ...formData, enterprise: e.target.value })}
                      placeholder="e.g. Apex Quantum"
                      className="w-full bg-black/40 border border-white/10 px-3 py-2 text-xs text-white focus:outline-none focus:border-brand-cyan transition-colors"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] tracking-widest text-brand-muted uppercase">
                      ENTANGLED CONTACT POINT (EMAIL)
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.contact}
                      onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
                      placeholder="e.g. secure@domain.com"
                      className="w-full bg-black/40 border border-white/10 px-3 py-2 text-xs text-white focus:outline-none focus:border-brand-cyan transition-colors"
                    />
                  </div>

                  <div className="flex justify-between items-center mt-4 pt-4 border-t border-white/5">
                    <button
                      type="button"
                      onClick={onClose}
                      className="interactive-target text-[10px] tracking-wider text-brand-muted hover:text-white transition-colors"
                    >
                      ABORT TRANSIT
                    </button>
                    
                    <button
                      type="submit"
                      className="interactive-target bg-brand-cyan text-black px-5 py-2.5 rounded-sm text-[10px] tracking-widest uppercase font-semibold hover:bg-white transition-colors"
                    >
                      TRANSMIT KEY
                    </button>
                  </div>
                </form>
              </motion.div>
            )}

            {/* STAGE 4: SUCCESS */}
            {stage === 'success' && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-center py-8 text-center gap-4"
              >
                <div className="h-12 w-12 rounded-full border border-brand-cyan/20 bg-brand-cyan/5 flex items-center justify-center text-brand-cyan mb-2">
                  <Check className="h-6 w-6" />
                </div>
                <h3 className="font-heading font-semibold text-lg text-white tracking-wider">
                  TRANSMISSION COMPLETED
                </h3>
                <p className="font-mono text-[10px] text-brand-muted max-w-sm leading-relaxed">
                  Your details have been segmented, asymmetric-encrypted, and queued in our offline cache. 
                  We will reach out on the specified coordinate plane once authentication clears.
                </p>
                <span className="font-mono text-[8px] text-brand-cyan uppercase tracking-widest">
                  SECURE HASH: {Array.from({length: 6}, () => Math.floor(Math.random()*16).toString(16)).join('')}
                </span>

                <button
                  onClick={onClose}
                  className="interactive-target mt-6 font-mono text-[10px] border border-white/10 hover:border-brand-cyan/30 px-4 py-2 text-brand-muted hover:text-white transition-all rounded-sm"
                >
                  DISCONNECT
                </button>
              </motion.div>
            )}

          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
