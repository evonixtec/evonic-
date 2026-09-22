import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Quote,
  Star,
  ShieldCheck,
  ChevronLeft,
  ChevronRight,
  Play,
  Pause,
  MapPin,
  TrendingUp,
  CheckCircle2,
  ArrowRight,
  Clock,
  Sparkles,
  Building2,
  Award,
  ThumbsUp,
  MessageSquare,
} from 'lucide-react';
import { TESTIMONIALS_DATA } from '../data/testimonialsData';
import { TestimonialItem, SectionId } from '../types';
import { FadeInSection } from './FadeInSection';

interface TestimonialsProps {
  onOpenQuote?: (context?: string) => void;
  onNavigateSection?: (sectionId: SectionId) => void;
}

export const Testimonials: React.FC<TestimonialsProps> = ({
  onOpenQuote,
  onNavigateSection,
}) => {
  const [activeFilter, setActiveFilter] = useState<'all' | 'dubai' | 'sialkot'>('all');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);
  const slideDuration = 6000; // 6 seconds per slide
  const progressIntervalRef = useRef<number | null>(null);

  // Filtered testimonials
  const filteredList = useMemo(() => {
    if (activeFilter === 'all') return TESTIMONIALS_DATA;
    return TESTIMONIALS_DATA.filter((item) => item.region === activeFilter);
  }, [activeFilter]);

  // Reset index when filter changes
  useEffect(() => {
    setCurrentIndex(0);
    setProgress(0);
  }, [activeFilter]);

  // Navigate functions
  const handleNext = useCallback(() => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % filteredList.length);
    setProgress(0);
  }, [filteredList.length]);

  const handlePrev = useCallback(() => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + filteredList.length) % filteredList.length);
    setProgress(0);
  }, [filteredList.length]);

  const handleSelect = (idx: number) => {
    setDirection(idx > currentIndex ? 1 : -1);
    setCurrentIndex(idx);
    setProgress(0);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const activeElement = document.activeElement;
      if (
        activeElement &&
        (activeElement.tagName === 'INPUT' ||
          activeElement.tagName === 'TEXTAREA' ||
          activeElement.tagName === 'SELECT')
      ) {
        return;
      }
      if (e.key === 'ArrowLeft') {
        handlePrev();
      } else if (e.key === 'ArrowRight') {
        handleNext();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleNext, handlePrev]);

  // Autoplay timer with progressive indicator
  useEffect(() => {
    if (!isPlaying || isHovered) {
      if (progressIntervalRef.current) {
        clearInterval(progressIntervalRef.current);
        progressIntervalRef.current = null;
      }
      return;
    }

    const stepMs = 50;
    progressIntervalRef.current = window.setInterval(() => {
      setProgress((prev) => {
        const next = prev + (stepMs / slideDuration) * 100;
        if (next >= 100) {
          handleNext();
          return 0;
        }
        return next;
      });
    }, stepMs);

    return () => {
      if (progressIntervalRef.current) {
        clearInterval(progressIntervalRef.current);
        progressIntervalRef.current = null;
      }
    };
  }, [isPlaying, isHovered, handleNext]);

  const currentItem: TestimonialItem = filteredList[currentIndex] || filteredList[0];

  // Animation variants
  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 80 : -80,
      opacity: 0,
      scale: 0.98,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        x: { type: 'spring' as const, stiffness: 300, damping: 30 },
        opacity: { duration: 0.25 },
      },
    },
    exit: (dir: number) => ({
      x: dir > 0 ? -80 : 80,
      opacity: 0,
      scale: 0.98,
      transition: {
        x: { type: 'spring' as const, stiffness: 300, damping: 30 },
        opacity: { duration: 0.2 },
      },
    }),
  };

  const isDubai = currentItem.region === 'dubai';

  return (
    <section
      id="testimonials"
      className="py-24 bg-slate-950 border-t border-slate-900 relative overflow-hidden"
    >
      {/* Ambient background glow */}
      <div className="absolute top-1/4 -left-20 w-96 h-96 bg-cyan-950/20 blur-[130px] rounded-full pointer-events-none" />
      <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-emerald-950/20 blur-[130px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section Header */}
        <FadeInSection direction="up" delay={50} duration={600}>
          <div className="text-center max-w-3xl mx-auto mb-10 space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950/80 border border-cyan-800/60 text-xs font-semibold text-cyan-300 shadow-inner">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              <span>Verified Client Social Proof</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
              Trusted in Dubai,{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-emerald-400">
                Proven in Sialkot
              </span>
            </h2>

            <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
              Read authentic feedback from enterprise directors in the UAE and business leaders across Sialkot who rely on our 20+ years of engineering rigor.
            </p>

            {/* Region Filter Buttons */}
            <div className="pt-3 flex flex-wrap justify-center gap-2">
              <button
                onClick={() => setActiveFilter('all')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                  activeFilter === 'all'
                    ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 shadow-lg shadow-cyan-500/25'
                    : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
                }`}
              >
                <span>All Client Stories ({TESTIMONIALS_DATA.length})</span>
              </button>

              <button
                onClick={() => setActiveFilter('dubai')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                  activeFilter === 'dubai'
                    ? 'bg-cyan-500 text-slate-950 shadow-lg shadow-cyan-500/25 font-bold'
                    : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
                }`}
              >
                <span>🇦🇪 Dubai & UAE Enterprise (4)</span>
              </button>

              <button
                onClick={() => setActiveFilter('sialkot')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                  activeFilter === 'sialkot'
                    ? 'bg-emerald-500 text-slate-950 shadow-lg shadow-emerald-500/25 font-bold'
                    : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
                }`}
              >
                <span>🇵🇰 Sialkot & Pakistan Clients (4)</span>
              </button>
            </div>
          </div>
        </FadeInSection>

        {/* Carousel Container */}
        <div
          className="max-w-4xl mx-auto"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Main Card Viewport */}
          <div className="relative rounded-3xl bg-slate-900/80 border border-slate-800 p-6 sm:p-10 shadow-2xl backdrop-blur-xl overflow-hidden min-h-[440px] flex flex-col justify-between">
            {/* Top accent line that shifts with region */}
            <div
              className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${
                isDubai
                  ? 'from-cyan-500 via-sky-400 to-blue-600'
                  : 'from-emerald-500 via-teal-400 to-cyan-500'
              }`}
            />

            {/* Top Bar: Stars, Region Tag & Autoplay Controls */}
            <div className="flex flex-wrap items-center justify-between gap-3 pb-6 border-b border-slate-800/80">
              <div className="flex items-center gap-3">
                {/* 5-star rating */}
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 fill-amber-400 text-amber-400"
                    />
                  ))}
                </div>
                <span className="text-xs font-mono font-bold text-amber-400">5.0 / 5.0</span>
                <span className="text-slate-600">•</span>
                <span className="text-xs text-slate-400 font-medium">
                  {currentItem.industry}
                </span>
              </div>

              {/* Verified badge & Autoplay button */}
              <div className="flex items-center gap-2">
                <span
                  className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-[11px] font-mono font-semibold border ${
                    isDubai
                      ? 'bg-cyan-950/80 text-cyan-300 border-cyan-800/60'
                      : 'bg-emerald-950/80 text-emerald-300 border-emerald-800/60'
                  }`}
                >
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>{currentItem.verifiedBadge}</span>
                </span>

                {/* Autoplay Pause/Play toggle */}
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="p-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors cursor-pointer"
                  title={isPlaying ? 'Pause Auto-slide' : 'Resume Auto-slide'}
                  aria-label="Toggle auto-play"
                >
                  {isPlaying ? (
                    <Pause className="w-3.5 h-3.5 text-cyan-400" />
                  ) : (
                    <Play className="w-3.5 h-3.5 text-slate-400" />
                  )}
                </button>
              </div>
            </div>

            {/* Slide Content (Animated via motion/react) */}
            <div className="my-6 relative overflow-hidden">
              <AnimatePresence mode="wait" custom={direction}>
                <motion.div
                  key={currentItem.id}
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  className="space-y-6"
                >
                  {/* Testimonial Quote */}
                  <div className="relative">
                    <Quote className="absolute -top-3 -left-2 w-8 h-8 text-slate-800/70 -z-10 pointer-events-none" />
                    <p className="text-base sm:text-lg lg:text-xl text-slate-100 font-normal leading-relaxed italic">
                      "{currentItem.quote}"
                    </p>
                  </div>

                  {/* Project Context Box (Social Proof Anchor) */}
                  <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800/90 space-y-2.5">
                    <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
                      <span className="text-[11px] font-mono text-cyan-400 font-semibold uppercase tracking-wider flex items-center gap-1.5">
                        <Building2 className="w-3.5 h-3.5" />
                        Project Scope:
                      </span>
                      <span className="text-[11px] font-mono text-slate-400 flex items-center gap-1">
                        <Clock className="w-3 h-3 text-slate-500" />
                        {currentItem.projectContext.timeline}
                      </span>
                    </div>

                    <div className="text-xs sm:text-sm font-semibold text-white">
                      {currentItem.projectContext.serviceType}
                    </div>

                    <div className="pt-2 border-t border-slate-900 flex items-start gap-2 text-xs text-slate-300">
                      <TrendingUp className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                      <div>
                        <strong className="text-emerald-300">Key Business Outcome:</strong>{' '}
                        <span>{currentItem.projectContext.keyOutcome}</span>
                      </div>
                    </div>
                  </div>

                  {/* Client Identity & Location */}
                  <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
                    <div className="flex items-center gap-3.5">
                      {/* Avatar initials with themed gradient */}
                      <div
                        className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${currentItem.avatarBg} flex items-center justify-center text-white font-extrabold text-base shadow-md border border-white/10`}
                      >
                        {currentItem.clientName
                          .split(' ')
                          .map((n) => n[0])
                          .slice(0, 2)
                          .join('')}
                      </div>

                      <div>
                        <h4 className="text-base font-bold text-white flex items-center gap-2">
                          <span>{currentItem.clientName}</span>
                          <span className="text-sm">{currentItem.flag}</span>
                        </h4>
                        <p className="text-xs text-slate-400">
                          {currentItem.role} •{' '}
                          <span className="text-slate-300 font-medium">
                            {currentItem.company}
                          </span>
                        </p>
                        <p className="text-[11px] text-slate-500 flex items-center gap-1 mt-0.5">
                          <MapPin className="w-3 h-3 text-cyan-400" />
                          <span>{currentItem.location}</span>
                        </p>
                      </div>
                    </div>

                    {/* Quick WhatsApp / Quote inquiry anchor */}
                    <button
                      onClick={() =>
                        onOpenQuote &&
                        onOpenQuote(`Inquiry regarding ${currentItem.projectContext.serviceType}`)
                      }
                      className="px-3.5 py-2 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-cyan-300 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <span>Discuss Similar Project</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Bottom Carousel Controls Bar */}
            <div className="pt-6 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-4">
              {/* Slide Counter and Progress Bar */}
              <div className="flex items-center gap-3">
                <span className="text-xs font-mono text-slate-400">
                  <strong className="text-white">
                    {String(currentIndex + 1).padStart(2, '0')}
                  </strong>{' '}
                  / {String(filteredList.length).padStart(2, '0')}
                </span>

                {/* Micro progress bar for current slide duration */}
                <div className="w-20 h-1.5 bg-slate-800 rounded-full overflow-hidden">
                  <div
                    className={`h-full transition-all duration-75 ${
                      isDubai ? 'bg-cyan-400' : 'bg-emerald-400'
                    }`}
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>

              {/* Jump Dot Indicators */}
              <div className="flex items-center gap-1.5">
                {filteredList.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSelect(idx)}
                    className={`h-2 rounded-full transition-all cursor-pointer ${
                      idx === currentIndex
                        ? `w-6 ${isDubai ? 'bg-cyan-400' : 'bg-emerald-400'}`
                        : 'w-2 bg-slate-800 hover:bg-slate-700'
                    }`}
                    aria-label={`Go to slide ${idx + 1}`}
                  />
                ))}
              </div>

              {/* Prev / Next Navigation Buttons */}
              <div className="flex items-center gap-2">
                <button
                  onClick={handlePrev}
                  className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer border border-slate-700/60"
                  aria-label="Previous testimonial"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={handleNext}
                  className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer border border-slate-700/60"
                  aria-label="Next testimonial"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Quick Click Thumbnail Grid underneath main card */}
          <div className="mt-5 grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            {filteredList.map((item, idx) => {
              const isSelected = idx === currentIndex;
              return (
                <button
                  key={item.id}
                  onClick={() => handleSelect(idx)}
                  className={`p-2.5 rounded-2xl text-left transition-all cursor-pointer border ${
                    isSelected
                      ? 'bg-slate-900 border-cyan-500/60 ring-1 ring-cyan-500/30'
                      : 'bg-slate-950/60 hover:bg-slate-900/60 border-slate-800/80 opacity-70 hover:opacity-100'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span className="text-xs">{item.flag}</span>
                    <span className="text-xs font-bold text-white truncate">
                      {item.clientName}
                    </span>
                  </div>
                  <div className="text-[10px] text-slate-400 truncate mt-0.5">
                    {item.company}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Social Proof Metric Highlights Ribbon */}
        <div className="mt-14 max-w-5xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 text-center">
            <div className="text-2xl font-black text-cyan-400 font-mono">100%</div>
            <div className="text-xs font-bold text-white mt-1">Direct Client Reviews</div>
            <div className="text-[10px] text-slate-400 mt-0.5">UAE & Sialkot Delivery</div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 text-center">
            <div className="text-2xl font-black text-white font-mono">20+ Yrs</div>
            <div className="text-xs font-bold text-white mt-1">Enterprise Track Record</div>
            <div className="text-[10px] text-slate-400 mt-0.5">Dubai Experience</div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 text-center">
            <div className="text-2xl font-black text-emerald-400 font-mono">PKR 0</div>
            <div className="text-xs font-bold text-white mt-1">Zero-Risk Guarantee</div>
            <div className="text-[10px] text-slate-400 mt-0.5">Zero Charge If Unresolved</div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 text-center">
            <div className="text-2xl font-black text-sky-400 font-mono">2-4 Hrs</div>
            <div className="text-xs font-bold text-white mt-1">Sialkot Doorstep SLA</div>
            <div className="text-[10px] text-slate-400 mt-0.5">Rapid On-Site Dispatch</div>
          </div>
        </div>
      </div>
    </section>
  );
};
