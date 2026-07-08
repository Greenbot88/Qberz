import { useEffect, useState, useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'motion/react';

export default function CursorOrb() {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const cursorRef = useRef<HTMLDivElement | null>(null);

  // Smooth springs for cursor movement to give it organic inertia
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { damping: 25, stiffness: 250, mass: 0.5 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    // Disable on touch devices
    if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
      return;
    }

    setIsVisible(true);

    const moveCursor = (e: MouseEvent) => {
      // Offset by half of cursor size to center it (outer width is 40px)
      cursorX.set(e.clientX - 20);
      cursorY.set(e.clientY - 20);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const isInteractive = 
        target.tagName === 'BUTTON' || 
        target.tagName === 'A' || 
        target.closest('button') !== null || 
        target.closest('a') !== null || 
        target.classList.contains('interactive-target') ||
        target.closest('.interactive-target') !== null;

      setIsHovered(!!isInteractive);
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mouseover', handleMouseOver);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mouseover', handleMouseOver);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [cursorX, cursorY]);

  if (!isVisible) return null;

  return (
    <>
      {/* Outer Glow Halo */}
      <motion.div
        ref={cursorRef}
        className="fixed top-0 left-0 z-50 pointer-events-none h-10 w-10 rounded-full border border-brand-cyan/20 bg-brand-cyan/5 mix-blend-screen"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
        }}
        animate={{
          scale: isHovered ? (isClicking ? 1.4 : 1.8) : (isClicking ? 0.75 : 1),
          borderColor: isHovered 
            ? 'rgba(242, 82, 96, 0.8)' 
            : 'rgba(102, 20, 217, 0.3)',
          backgroundColor: isHovered 
            ? 'rgba(242, 82, 96, 0.08)' 
            : 'rgba(102, 20, 217, 0.02)',
          boxShadow: isHovered 
            ? '0 0 20px rgba(242, 82, 96, 0.3)' 
            : '0 0 10px rgba(102, 20, 217, 0.1)',
        }}
        transition={{
          type: 'spring',
          stiffness: 500,
          damping: 28,
          mass: 0.2
        }}
      >
        {/* Core Dot / Crosshair */}
        <div 
          className={`absolute inset-0 m-auto rounded-full transition-all duration-300 ${
            isHovered 
              ? 'h-1 w-1 bg-brand-cyan scale-150 shadow-[0_0_8px_#F25260]' 
              : 'h-2 w-2 bg-brand-violet shadow-[0_0_4px_#6614D9]'
          }`} 
        />
        {isHovered && (
          <div className="absolute inset-0 border border-dashed border-brand-cyan/40 rounded-full animate-spin [animation-duration:10s]" />
        )}
      </motion.div>
    </>
  );
}
