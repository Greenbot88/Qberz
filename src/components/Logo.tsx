import React from 'react';

interface LogoProps {
  className?: string;
  showText?: boolean;
  textSizeClass?: string; // e.g. "text-xl", "text-5xl"
  iconSize?: number; // width and height of the icon
  textTrackingClass?: string; // e.g. "tracking-[0.2em]"
  glitchEffect?: boolean;
}

export default function Logo({ 
  className = '', 
  showText = true, 
  textSizeClass = 'text-xl', 
  iconSize = 36,
  textTrackingClass = 'tracking-[0.3em]',
  glitchEffect = false
}: LogoProps) {
  // SVG Circle stroke parameters for perfect geometry
  const outerRadius = 38;
  const outerCircumference = 2 * Math.PI * outerRadius; // ~238.76
  const outerGap = 46; // ~70 degrees
  const outerDash = outerCircumference - outerGap;

  const innerRadius = 24;
  const innerCircumference = 2 * Math.PI * innerRadius; // ~150.8
  const innerGap = 34; // ~80 degrees
  const innerDash = innerCircumference - innerGap;

  return (
    <div className={`flex items-center gap-3.5 ${className}`}>
      {/* Precision Interlocking Dual Arc Emblem */}
      <svg
        width={iconSize}
        height={iconSize}
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="flex-shrink-0 drop-shadow-[0_0_8px_rgba(102,20,217,0.45)]"
      >
        <defs>
          {/* Outer ring gradient: Brighter Orange-Red to Magenta to Rich Violet */}
          <linearGradient id="logoOuterGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#F25041" />
            <stop offset="50%" stopColor="#BF3B84" />
            <stop offset="100%" stopColor="#6614D9" />
          </linearGradient>
          
          {/* Inner ring gradient: Light Red/Coral to Magenta */}
          <linearGradient id="logoInnerGrad" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#F25260" />
            <stop offset="100%" stopColor="#BF3B84" />
          </linearGradient>
        </defs>

        {/* Outer Ring - Gap at bottom-left */}
        <circle
          cx="50"
          cy="50"
          r={outerRadius}
          stroke="url(#logoOuterGrad)"
          strokeWidth="8.5"
          strokeLinecap="round"
          strokeDasharray={`${outerDash} ${outerGap}`}
          transform="rotate(130 50 50)"
          fill="none"
        />

        {/* Inner Ring - Gap at top-left */}
        <circle
          cx="50"
          cy="50"
          r={innerRadius}
          stroke="url(#logoInnerGrad)"
          strokeWidth="8.5"
          strokeLinecap="round"
          strokeDasharray={`${innerDash} ${innerGap}`}
          transform="rotate(-50 50 50)"
          fill="none"
        />
      </svg>

      {showText && (
        <span 
          className={`font-heading font-extrabold text-white select-none uppercase ${textSizeClass} ${textTrackingClass} ${glitchEffect ? 'glitch-text' : ''}`}
          data-text="INQBERZ"
        >
          INQBERZ
        </span>
      )}
    </div>
  );
}
