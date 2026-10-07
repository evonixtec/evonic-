import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sun, Moon, Sparkles } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

interface ThemeSwitcherProps {
  variant?: 'icon' | 'pill' | 'expanded';
  className?: string;
  showLabel?: boolean;
}

export const ThemeSwitcher: React.FC<ThemeSwitcherProps> = ({
  variant = 'icon',
  className = '',
  showLabel = false,
}) => {
  const { theme, isDark, toggleTheme } = useTheme();

  if (variant === 'expanded') {
    return (
      <div
        className={`flex items-center justify-between p-3 rounded-2xl bg-slate-900 border border-slate-800 transition-colors ${className}`}
      >
        <div className="flex items-center gap-2.5">
          <div
            className={`w-8 h-8 rounded-xl flex items-center justify-center transition-colors ${
              isDark
                ? 'bg-cyan-950/80 text-cyan-400 border border-cyan-800/60'
                : 'bg-amber-100 text-amber-600 border border-amber-300'
            }`}
          >
            {isDark ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
          </div>
          <div>
            <div className="text-xs font-bold text-white flex items-center gap-1.5">
              <span>Display Theme</span>
              <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-800 text-cyan-400 border border-slate-700">
                {isDark ? 'Dark Mode' : 'Light (High-Contrast)'}
              </span>
            </div>
            <p className="text-[11px] text-slate-400">
              {isDark
                ? 'Cyber tech atmosphere with eye-safe dark tones'
                : 'High-contrast light mode for bright sun/office lighting'}
            </p>
          </div>
        </div>

        {/* Tactile Toggle Switch */}
        <button
          onClick={toggleTheme}
          role="switch"
          aria-checked={!isDark}
          aria-label={`Toggle theme: currently ${isDark ? 'Dark Mode' : 'High-Contrast Light Mode'}`}
          className={`relative w-14 h-8 rounded-full p-1 transition-colors cursor-pointer focus:outline-none focus:ring-2 focus:ring-cyan-500/50 ${
            isDark ? 'bg-slate-800 border border-slate-700' : 'bg-cyan-500 border border-cyan-400 shadow-md'
          }`}
        >
          <motion.div
            layout
            transition={{ type: 'spring', stiffness: 500, damping: 30 }}
            className={`w-6 h-6 rounded-full flex items-center justify-center text-xs shadow-md ${
              isDark ? 'bg-cyan-400 text-slate-950 ml-0' : 'bg-white text-cyan-700 ml-auto'
            }`}
          >
            {isDark ? <Moon className="w-3.5 h-3.5" /> : <Sun className="w-3.5 h-3.5" />}
          </motion.div>
        </button>
      </div>
    );
  }

  if (variant === 'pill') {
    return (
      <button
        onClick={toggleTheme}
        role="switch"
        aria-checked={!isDark}
        aria-label={`Switch to ${isDark ? 'high-contrast light' : 'dark'} mode`}
        className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-xl border text-xs font-semibold transition-all cursor-pointer shadow-sm ${
          isDark
            ? 'bg-slate-900/90 hover:bg-slate-800 text-slate-300 hover:text-cyan-300 border-slate-800'
            : 'bg-white hover:bg-slate-50 text-slate-900 hover:text-cyan-600 border-slate-300 shadow-md'
        } ${className}`}
      >
        <AnimatePresence mode="wait">
          {isDark ? (
            <motion.span
              key="dark-icon"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="text-cyan-400 flex items-center"
            >
              <Moon className="w-3.5 h-3.5" />
            </motion.span>
          ) : (
            <motion.span
              key="light-icon"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="text-amber-500 flex items-center"
            >
              <Sun className="w-3.5 h-3.5" />
            </motion.span>
          )}
        </AnimatePresence>

        <span>{isDark ? 'Dark Mode' : 'High-Contrast Light'}</span>
      </button>
    );
  }

  // Default: 'icon' button
  return (
    <button
      onClick={toggleTheme}
      role="switch"
      aria-checked={!isDark}
      aria-label={`Switch to ${isDark ? 'high-contrast light mode' : 'dark mode'}`}
      title={isDark ? 'Switch to High-Contrast Light Mode' : 'Switch to Dark Mode'}
      className={`relative p-2 sm:p-2.5 rounded-xl border transition-all duration-200 cursor-pointer group flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-cyan-500/50 ${
        isDark
          ? 'bg-slate-900/90 hover:bg-slate-800 text-slate-300 hover:text-cyan-300 border-slate-800 hover:border-slate-700 shadow-sm'
          : 'bg-white hover:bg-slate-100 text-slate-800 hover:text-amber-600 border-slate-300 shadow-sm'
      } ${className}`}
    >
      <AnimatePresence mode="wait">
        {isDark ? (
          <motion.div
            key="moon"
            initial={{ scale: 0.5, rotate: -45, opacity: 0 }}
            animate={{ scale: 1, rotate: 0, opacity: 1 }}
            exit={{ scale: 0.5, rotate: 45, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="flex items-center justify-center"
          >
            <Moon className="w-4 h-4 text-cyan-400 group-hover:scale-110 transition-transform" />
          </motion.div>
        ) : (
          <motion.div
            key="sun"
            initial={{ scale: 0.5, rotate: 45, opacity: 0 }}
            animate={{ scale: 1, rotate: 0, opacity: 1 }}
            exit={{ scale: 0.5, rotate: -45, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="flex items-center justify-center"
          >
            <Sun className="w-4 h-4 text-amber-500 group-hover:scale-110 transition-transform" />
          </motion.div>
        )}
      </AnimatePresence>

      {showLabel && (
        <span className="ml-1.5 text-xs font-semibold">
          {isDark ? 'Dark' : 'Light'}
        </span>
      )}
    </button>
  );
};
