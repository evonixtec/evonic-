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
  Building2,
  Clock,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { TESTIMONIALS_DATA } from '../data/testimonialsData';
import { TestimonialItem, SectionId } from '../types';

interface TestimonialsProps {
  onOpenQuote?: (context?: string) => void;
  onNavigateSection?: (sectionId: SectionId) => void;
}

export const Testimonials: React.FC<TestimonialsProps> = ({
  onOpenQuote,
}) => {
  const [activeFilter, setActiveFilter] = useState<'all' | 'dubai' | 'sialkot'>('all');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);
  const slideDuration = 6000;
  const progressIntervalRef = useRef<number | null>(null);

  const filteredList = useMemo(() => {
    if (activeFilter === 'all') return TESTIMONIALS_DATA;
    return TESTIMONIALS_DATA.filter((item) => item.region === activeFilter);
  }, [activeFilter]);

  useEffect(() => {
    setCurrentIndex(0);
    setProgress(0);
  }, [activeFilter]);

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

  const handleSelect = (index: number) => {
    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
    setProgress(0);
  };

  useEffect(() => {
    if (!isPlaying || isHovered) {
      if (progressIntervalRef.current) {
        clearInterval(progressIntervalRef.current);
        progressIntervalRef.current = null;
      }
      return;
    }

    const stepMs = 50;
    const increment = (stepMs / slideDuration) * 100;

    progressIntervalRef.current = window.setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          handleNext();
          return 0;
        }
        return prev + increment;
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

  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 40 : -40,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
      transition: {
        x: { type: 'spring' as const, stiffness: 300, damping: 30 },
        opacity: { duration: 0.25 },
      },
    },
    exit: (dir: number) => ({
      x: dir > 0 ? -40 : 40,
      opacity: 0,
      transition: {
        x: { type: 'spring' as const, stiffness: 300, damping: 30 },
        opacity: { duration: 0.2 },
      },
    }),
  };

  return (
    <section
      id="testimonials"
      className="py-20 md:py-28 bg-white border-b border-slate-200"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-50 border border-red-200 text-xs font-bold text-red-700">
            <Sparkles className="w-3.5 h-3.5 text-red-600" />
            <span>Verified Client Feedback</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight">
            Trusted in Dubai, Proven in Sialkot
          </h2>

          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            Read authentic feedback from enterprise directors in the UAE and business leaders across Sialkot who rely on our 20+ years of engineering rigor.
          </p>

          {/* Region Filter Buttons */}
          <div className="pt-3 flex flex-wrap justify-center gap-2">
            <button
              onClick={() => setActiveFilter('all')}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                activeFilter === 'all'
                  ? 'bg-red-600 text-white shadow-2xs font-bold'
                  : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              <span>All Stories ({TESTIMONIALS_DATA.length})</span>
            </button>

            <button
              onClick={() => setActiveFilter('dubai')}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                activeFilter === 'dubai'
                  ? 'bg-red-600 text-white shadow-2xs font-bold'
                  : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              <span>🇦🇪 Dubai & UAE Enterprise (4)</span>
            </button>

            <button
              onClick={() => setActiveFilter('sialkot')}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                activeFilter === 'sialkot'
                  ? 'bg-red-600 text-white shadow-2xs font-bold'
                  : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              <span>🇵🇰 Sialkot & Pakistan Clients (4)</span>
            </button>
          </div>
        </div>

        {/* Carousel Container */}
        <div
          className="max-w-4xl mx-auto"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Main Card Viewport */}
          <div className="relative rounded-3xl bg-slate-50 border border-slate-200 p-6 sm:p-10 shadow-2xs overflow-hidden min-h-[420px] flex flex-col justify-between">
            {/* Top Bar: Stars, Region Tag & Autoplay Controls */}
            <div className="flex flex-wrap items-center justify-between gap-3 pb-6 border-b border-slate-200">
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 fill-amber-500 text-amber-500"
                    />
                  ))}
                </div>
                <span className="text-xs font-mono font-bold text-amber-700">5.0 / 5.0</span>
                <span className="text-slate-300">•</span>
                <span className="text-xs text-slate-600 font-medium">
                  {currentItem.industry}
                </span>
              </div>

              {/* Verified badge & Autoplay button */}
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-[11px] font-mono font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  <span>{currentItem.verifiedBadge}</span>
                </span>

                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="p-1.5 rounded-lg bg-white border border-slate-200 hover:bg-slate-100 text-slate-500 transition-colors cursor-pointer"
                  title={isPlaying ? 'Pause Auto-slide' : 'Resume Auto-slide'}
                  aria-label="Toggle auto-play"
                >
                  {isPlaying ? (
                    <Pause className="w-3.5 h-3.5 text-slate-600" />
                  ) : (
                    <Play className="w-3.5 h-3.5 text-slate-600" />
                  )}
                </button>
              </div>
            </div>

            {/* Slide Content */}
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
                    <Quote className="absolute -top-3 -left-2 w-8 h-8 text-slate-200 -z-10 pointer-events-none" />
                    <p className="text-base sm:text-lg lg:text-xl text-slate-800 font-normal leading-relaxed italic">
                      "{currentItem.quote}"
                    </p>
                  </div>

                  {/* Project Context Box */}
                  <div className="p-4 rounded-2xl bg-white border border-slate-200 space-y-2.5 shadow-2xs">
                    <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
                      <span className="text-[11px] font-mono text-red-600 font-bold uppercase tracking-wider flex items-center gap-1.5">
                        <Building2 className="w-3.5 h-3.5" />
                        Project Scope:
                      </span>
                      <span className="text-[11px] font-mono text-slate-500 flex items-center gap-1">
                        <Clock className="w-3 h-3 text-slate-400" />
                        {currentItem.projectContext.timeline}
                      </span>
                    </div>

                    <div className="text-xs sm:text-sm font-bold text-slate-900">
                      {currentItem.projectContext.serviceType}
                    </div>

                    <div className="pt-2 border-t border-slate-100 flex items-start gap-2 text-xs text-slate-600">
                      <TrendingUp className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <strong className="text-slate-900">Key Business Outcome:</strong>{' '}
                        <span>{currentItem.projectContext.keyOutcome}</span>
                      </div>
                    </div>
                  </div>

                  {/* Client Identity & Location */}
                  <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
                    <div className="flex items-center gap-3.5">
                      <div className="w-12 h-12 rounded-2xl bg-red-600 flex items-center justify-center text-white font-extrabold text-base shadow-2xs">
                        {currentItem.clientName
                          .split(' ')
                          .map((n) => n[0])
                          .slice(0, 2)
                          .join('')}
                      </div>

                      <div>
                        <h4 className="text-base font-bold text-slate-900 flex items-center gap-2">
                          <span>{currentItem.clientName}</span>
                          <span className="text-sm">{currentItem.flag}</span>
                        </h4>
                        <p className="text-xs text-slate-500">
                          {currentItem.role} •{' '}
                          <span className="text-slate-700 font-medium">
                            {currentItem.company}
                          </span>
                        </p>
                        <p className="text-[11px] text-slate-500 flex items-center gap-1 mt-0.5">
                          <MapPin className="w-3 h-3 text-red-600" />
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
                      className="px-3.5 py-2 rounded-xl bg-white border border-slate-200 hover:bg-slate-100 text-slate-800 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer shadow-2xs"
                    >
                      <span>Discuss Similar Project</span>
                      <ArrowRight className="w-3.5 h-3.5 text-red-600" />
                    </button>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Bottom Carousel Controls Bar */}
            <div className="pt-6 border-t border-slate-200 flex flex-wrap items-center justify-between gap-4">
              {/* Slide Counter and Progress Bar */}
              <div className="flex items-center gap-3">
                <span className="text-xs font-mono text-slate-500">
                  <strong className="text-slate-900">
                    {String(currentIndex + 1).padStart(2, '0')}
                  </strong>{' '}
                  / {String(filteredList.length).padStart(2, '0')}
                </span>

                <div className="w-20 h-1.5 bg-slate-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-red-600 transition-all duration-75"
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
                        ? 'w-6 bg-red-600'
                        : 'w-2 bg-slate-200 hover:bg-slate-300'
                    }`}
                    aria-label={`Go to slide ${idx + 1}`}
                  />
                ))}
              </div>

              {/* Prev / Next Navigation Buttons */}
              <div className="flex items-center gap-2">
                <button
                  onClick={handlePrev}
                  className="p-2.5 rounded-xl bg-white hover:bg-slate-100 text-slate-700 transition-colors cursor-pointer border border-slate-200 shadow-2xs"
                  aria-label="Previous testimonial"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={handleNext}
                  className="p-2.5 rounded-xl bg-white hover:bg-slate-100 text-slate-700 transition-colors cursor-pointer border border-slate-200 shadow-2xs"
                  aria-label="Next testimonial"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
