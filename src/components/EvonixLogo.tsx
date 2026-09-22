import React from 'react';
import { useTheme } from '../context/ThemeContext';

export interface EvonixLogoProps {
  /**
   * 'full': Emblem mark + 'evonix' wordmark
   * 'mark': Just the official red geometric emblem mark
   */
  variant?: 'full' | 'mark';
  /**
   * Visual size preset
   */
  size?: 'sm' | 'md' | 'lg' | 'xl';
  /**
   * Force theme mode or allow auto detection
   */
  forceTheme?: 'dark' | 'light';
  /**
   * Additional classes for wrapper
   */
  className?: string;
}

/**
 * Official EVONIX Emblem SVG Mark
 * Features the signature crimson red faceted delta emblem (#C81D25).
 */
export const EvonixMark: React.FC<{
  className?: string;
  size?: number | string;
  title?: string;
}> = ({ className = 'w-9 h-9', size, title = 'EVONIX Official Emblem' }) => {
  return (
    <svg
      viewBox="0 0 100 90"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={size ? { width: size, height: size } : undefined}
      aria-label={title}
      role="img"
    >
      <title>{title}</title>
      <defs>
        <linearGradient id="evonixRedGlow" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#DC2626" />
          <stop offset="50%" stopColor="#C81D25" />
          <stop offset="100%" stopColor="#991B1B" />
        </linearGradient>
      </defs>
      {/* Main Faceted Ribbon / Outer Delta */}
      <path
        d="M 16 10 
           L 9 22 
           L 44 86 
           L 54 86 
           L 66 62 
           L 55 62 
           L 49 74 
           L 22 24 
           L 58 24 
           L 62 16 
           L 65 10 
           Z"
        fill="url(#evonixRedGlow)"
      />
      {/* Upper-Right Floating Facet */}
      <path
        d="M 69 10 
           L 91 10 
           L 80 32 
           Z"
        fill="url(#evonixRedGlow)"
      />
    </svg>
  );
};

/**
 * Full Official EVONIX Brand Logo (.svg)
 * Pure logo representation as requested by the user:
 * - Red faceted emblem
 * - Bold lowercase 'evonix' wordmark
 * - Signature red dot on 'i'
 * - Signature red top-right diagonal arm on 'x'
 * - Absolutely NO 'TECHNOLOGIES' word attached
 */
export const EvonixLogo: React.FC<EvonixLogoProps> = ({
  variant = 'full',
  size = 'md',
  forceTheme,
  className = '',
}) => {
  const { theme } = useTheme();
  const currentTheme = forceTheme || theme;
  const isLight = currentTheme === 'light';

  // Text color based on theme
  const textColor = isLight ? 'text-slate-950' : 'text-white';

  if (variant === 'mark') {
    const markSizes = {
      sm: 'w-7 h-7',
      md: 'w-9 h-9',
      lg: 'w-12 h-12',
      xl: 'w-16 h-16',
    };
    return <EvonixMark className={`${markSizes[size]} ${className}`} />;
  }

  const markSizeClasses = {
    sm: 'w-7 h-7 sm:w-8 sm:h-8',
    md: 'w-8 h-8 sm:w-10 sm:h-10',
    lg: 'w-11 h-11 sm:w-13 sm:h-13',
    xl: 'w-14 h-14 sm:w-18 sm:h-18',
  };

  const wordmarkSizes = {
    sm: 'text-2xl sm:text-2xl',
    md: 'text-2xl sm:text-3xl',
    lg: 'text-3xl sm:text-4xl',
    xl: 'text-4xl sm:text-5xl',
  };

  return (
    <div className={`flex items-center gap-2.5 sm:gap-3 select-none leading-none ${className}`}>
      {/* Official Red Emblem Mark */}
      <div className="relative flex-shrink-0 transition-transform duration-200 group-hover:scale-105">
        <EvonixMark className={markSizeClasses[size]} />
      </div>

      {/* Pure 'evonix' Wordmark (No 'Technologies' text) */}
      <span
        className={`font-sans font-black tracking-tight ${wordmarkSizes[size]} ${textColor} inline-flex items-center`}
        style={{ letterSpacing: '-0.04em' }}
      >
        <span>evon</span>
        {/* The 'i' with signature red circular dot */}
        <span className="relative inline-block mx-[0.5px]">
          <span className="text-inherit">ı</span>
          <span
            className="absolute -top-[0.28em] left-1/2 -translate-x-1/2 w-[0.28em] h-[0.28em] rounded-full bg-[#C81D25] shadow-sm shadow-red-500/50"
            aria-hidden="true"
          />
        </span>
        {/* The 'x' with signature red top-right arm */}
        <span className="relative inline-block ml-[0.5px]">
          {/* Base 'x' */}
          <span className="text-inherit">x</span>
          {/* Red top-right wing accent overlay */}
          <svg
            viewBox="0 0 24 24"
            fill="none"
            className="absolute inset-0 w-full h-full pointer-events-none"
            aria-hidden="true"
          >
            <path
              d="M12 12 L20 4 L22 4 L22 6 L14 14 Z"
              fill="#C81D25"
            />
          </svg>
        </span>
      </span>
    </div>
  );
};

export default EvonixLogo;
