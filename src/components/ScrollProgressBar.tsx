import React, { useState, useEffect } from 'react';

export const ScrollProgressBar: React.FC = () => {
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    let ticking = false;

    const updateScrollProgress = () => {
      const scrollY = window.scrollY || window.pageYOffset;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      
      if (docHeight <= 0) {
        setProgress(0);
        setIsVisible(false);
      } else {
        const currentProgress = (scrollY / docHeight) * 100;
        const clamped = Math.min(100, Math.max(0, currentProgress));
        setProgress(clamped);
        setIsVisible(scrollY > 10);
      }
      ticking = false;
    };

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateScrollProgress);
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });
    updateScrollProgress();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  // Compute smooth color interpolation from Red -> Coral -> Amber -> Emerald -> Royal Blue
  const getTipColor = (pct: number) => {
    if (pct <= 20) {
      // 0% -> 20%: Red (0) to Coral-Orange (28)
      const hue = (pct / 20) * 28;
      return `hsl(${hue}, 92%, 52%)`;
    } else if (pct <= 45) {
      // 20% -> 45%: Orange (28) to Amber/Gold (48)
      const hue = 28 + ((pct - 20) / 25) * 20;
      return `hsl(${hue}, 95%, 50%)`;
    } else if (pct <= 70) {
      // 45% -> 70%: Gold (48) to Emerald (155)
      const hue = 48 + ((pct - 45) / 25) * 107;
      return `hsl(${hue}, 85%, 44%)`;
    } else {
      // 70% -> 100%: Emerald (155) to Vivid Blue (220)
      const hue = 155 + ((pct - 70) / 30) * 65;
      return `hsl(${hue}, 90%, 56%)`;
    }
  };

  const tipColor = getTipColor(progress);

  return (
    <div
      className={`fixed top-0 left-0 right-0 h-[3.5px] z-[60] pointer-events-none transition-opacity duration-300 ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
      role="progressbar"
      aria-label="Page reading progress"
      aria-valuenow={Math.round(progress)}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      {/* Background Track */}
      <div className="absolute inset-0 bg-slate-200/50 backdrop-blur-xs" />

      {/* Dynamic Color-Changing Fill Bar */}
      <div
        className="h-full relative transition-[width] duration-75 ease-out"
        style={{
          width: `${progress}%`,
          background: `linear-gradient(90deg, #dc2626 0%, ${tipColor} 100%)`,
          boxShadow: `0 1px 6px ${tipColor}66`,
        }}
      >
        {/* Glow bead at the leading tip */}
        <div
          className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full -mr-1"
          style={{
            backgroundColor: tipColor,
            boxShadow: `0 0 10px 2px ${tipColor}`,
          }}
        />
      </div>
    </div>
  );
};
