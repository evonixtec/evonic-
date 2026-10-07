import React, { useEffect, useState } from 'react';

interface LoadingScreenProps {
  onComplete: () => void;
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [isFading, setIsFading] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsFading(true);
            setTimeout(onComplete, 700);
          }, 300);
          return 100;
        }
        const increment = Math.floor(Math.random() * 18) + 8;
        return Math.min(100, prev + increment);
      });
    }, 70);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#0a0a0f] text-white transition-opacity duration-700 select-none ${
        isFading ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      {/* Background Radial Glow */}
      <div className="absolute w-[500px] h-[500px] bg-gradient-to-tr from-[#00D4FF]/10 to-[#A855F7]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 flex flex-col items-center space-y-6 max-w-sm w-full px-6 text-center">
        {/* EVONIXTEC 3D-styled Logo Mark */}
        <div className="relative w-20 h-20 flex items-center justify-center">
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-[#00D4FF] to-[#A855F7] opacity-20 blur-xl animate-pulse" />
          <div className="w-18 h-18 rounded-2xl border border-[#00D4FF]/40 bg-slate-900/90 flex items-center justify-center shadow-[0_0_30px_rgba(0,212,255,0.25)]">
            <svg
              className="w-10 h-10 text-[#00D4FF]"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polygon points="12 2 2 7 12 12 22 7 12 2" className="text-[#00D4FF]" stroke="#00D4FF" />
              <polyline points="2 17 12 22 22 17" className="text-[#A855F7]" stroke="#A855F7" />
              <polyline points="2 12 12 17 22 12" stroke="white" />
            </svg>
          </div>
        </div>

        {/* Brand Wordmark & Tagline */}
        <div>
          <h1 className="text-2xl font-black tracking-wider font-display bg-gradient-to-r from-white via-[#00D4FF] to-[#A855F7] bg-clip-text text-transparent">
            EVONIXTEC
          </h1>
          <p className="text-xs text-slate-400 font-mono tracking-widest uppercase mt-1">
            Quantum Engine Booting
          </p>
        </div>

        {/* Progress Bar */}
        <div className="w-full space-y-2">
          <div className="w-full h-1.5 bg-slate-800/80 rounded-full overflow-hidden border border-white/5">
            <div
              className="h-full bg-gradient-to-r from-[#00D4FF] to-[#A855F7] transition-all duration-150 ease-out shadow-[0_0_12px_#00D4FF]"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="flex justify-between items-center text-[11px] font-mono text-slate-500">
            <span>INITIALIZING 3D WEBGL</span>
            <span className="text-[#00D4FF] font-bold">{progress}%</span>
          </div>
        </div>
      </div>
    </div>
  );
};
