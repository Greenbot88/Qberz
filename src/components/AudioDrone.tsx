import { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX } from 'lucide-react';

export default function AudioDrone() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const oscillatorsRef = useRef<OscillatorNode[]>([]);
  const filterRef = useRef<BiquadFilterNode | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);
  const lfoRef = useRef<OscillatorNode | null>(null);

  const initAudio = () => {
    try {
      // Create audio context
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      const ctx = new AudioContextClass();
      audioCtxRef.current = ctx;

      // Master Gain
      const masterGain = ctx.createGain();
      masterGain.gain.setValueAtTime(0, ctx.currentTime);
      masterGain.connect(ctx.destination);
      gainNodeRef.current = masterGain;

      // Lowpass Filter to make it muddy and warm
      const filter = ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(120, ctx.currentTime);
      filter.Q.setValueAtTime(4, ctx.currentTime);
      filter.connect(masterGain);
      filterRef.current = filter;

      // Create a few oscillators for a deep, rich minor chord drone
      // Frequencies: 55Hz (A1), 82.4Hz (E2), 110Hz (A2), 130.8Hz (C3) - A minor feel
      const frequencies = [55, 82.4, 110, 130.8];
      const oscillators: OscillatorNode[] = [];

      frequencies.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        // Use sawtooth or triangle for rich harmonics
        osc.type = idx % 2 === 0 ? 'sawtooth' : 'triangle';
        osc.frequency.setValueAtTime(freq + (Math.random() * 0.5 - 0.25), ctx.currentTime); // Slight detune for chorus effect

        const oscGain = ctx.createGain();
        oscGain.gain.setValueAtTime(0.12, ctx.currentTime);

        osc.connect(oscGain);
        oscGain.connect(filter);
        osc.start();
        oscillators.push(osc);
      });

      oscillatorsRef.current = oscillators;

      // LFO to sweep the filter frequency slowly (the dramatic swells)
      const lfo = ctx.createOscillator();
      lfo.frequency.setValueAtTime(0.08, ctx.currentTime); // Very slow swell (12 seconds cycle)
      const lfoGain = ctx.createGain();
      lfoGain.gain.setValueAtTime(40, ctx.currentTime); // sweep filter between 80Hz and 160Hz

      lfo.connect(lfoGain);
      lfoGain.connect(filter.frequency);
      lfo.start();
      lfoRef.current = lfo;

      // Smoothly fade in
      masterGain.gain.linearRampToValueAtTime(0.4, ctx.currentTime + 3);

    } catch (error) {
      console.warn("Web Audio API not supported or blocked by browser policies.", error);
    }
  };

  const toggleDrone = () => {
    if (!audioCtxRef.current) {
      initAudio();
      setIsPlaying(true);
      return;
    }

    if (audioCtxRef.current.state === 'suspended') {
      audioCtxRef.current.resume();
      gainNodeRef.current?.gain.linearRampToValueAtTime(0.4, audioCtxRef.current.currentTime + 1.5);
      setIsPlaying(true);
    } else if (isPlaying) {
      // Fade out
      gainNodeRef.current?.gain.linearRampToValueAtTime(0.0001, audioCtxRef.current.currentTime + 1);
      setTimeout(() => {
        if (audioCtxRef.current && !isPlaying) {
          audioCtxRef.current.suspend();
        }
      }, 1000);
      setIsPlaying(false);
    } else {
      audioCtxRef.current.resume();
      gainNodeRef.current?.gain.linearRampToValueAtTime(0.4, audioCtxRef.current.currentTime + 1.5);
      setIsPlaying(true);
    }
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      oscillatorsRef.current.forEach(osc => {
        try { osc.stop(); } catch(e) {}
      });
      try { lfoRef.current?.stop(); } catch(e) {}
      try { audioCtxRef.current?.close(); } catch(e) {}
    };
  }, []);

  return (
    <div 
      id="ambient-drone-toggle"
      className="fixed bottom-6 right-6 z-50 flex items-center gap-2 rounded-full border border-white/10 bg-black/40 px-4 py-2 backdrop-blur-md transition-all duration-300 hover:border-brand-cyan/40"
    >
      <button
        onClick={toggleDrone}
        className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-brand-muted hover:text-brand-cyan transition-colors"
      >
        {isPlaying ? (
          <>
            <Volume2 className="h-4 w-4 text-brand-cyan animate-pulse" />
            <span className="hidden sm:inline">Signal Active</span>
          </>
        ) : (
          <>
            <VolumeX className="h-4 w-4" />
            <span className="hidden sm:inline">Muted</span>
          </>
        )}
      </button>
    </div>
  );
}
