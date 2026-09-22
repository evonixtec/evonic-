import React, { useState, useEffect, useRef, useCallback } from 'react';
import { HERO_SLIDES, HeroSlide, COMPANY_INFO } from '../data/content';
import { SectionId } from '../types';
import {
  ChevronLeft,
  ChevronRight,
  Sparkles,
  ArrowRight,
  Globe,
  MapPin,
  CheckCircle,
  PhoneCall,
  Search,
  Pause,
  Play,
  ShieldCheck,
} from 'lucide-react';

interface HeroSliderProps {
  onOpenQuote: (servicePrefill?: string) => void;
  onNavigate: (section: SectionId) => void;
  onOpenSearch?: () => void;
}

export const HeroSlider: React.FC<HeroSliderProps> = ({
  onOpenQuote,
  onNavigate,
  onOpenSearch,
}) => {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const slideTimerRef = useRef<NodeJS.Timeout | null>(null);

  const totalSlides = HERO_SLIDES.length;
  const currentSlide: HeroSlide = HERO_SLIDES[currentSlideIndex];

  const nextSlide = useCallback(() => {
    setCurrentSlideIndex((prev) => (prev + 1) % totalSlides);
  }, [totalSlides]);

  const prevSlide = useCallback(() => {
    setCurrentSlideIndex((prev) => (prev - 1 + totalSlides) % totalSlides);
  }, [totalSlides]);

  const goToSlide = (index: number) => {
    setCurrentSlideIndex(index);
  };

  // Auto-play timer
  useEffect(() => {
    if (isPaused) {
      if (slideTimerRef.current) clearInterval(slideTimerRef.current);
      return;
    }

    slideTimerRef.current = setInterval(() => {
      nextSlide();
    }, 6500);

    return () => {
      if (slideTimerRef.current) clearInterval(slideTimerRef.current);
    };
  }, [isPaused, nextSlide]);

  // Touch Swipe for mobile devices
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      nextSlide();
    } else if (isRightSwipe) {
      prevSlide();
    }
    setTouchStart(null);
    setTouchEnd(null);
  };

  // Execute slide action
  const handlePrimaryClick = (slide: HeroSlide) => {
    if (slide.primaryAction === 'quote') {
      onOpenQuote(slide.servicePrefill);
    } else if (slide.primaryAction === 'services') {
      onNavigate('services');
    } else if (slide.primaryAction === 'portfolio') {
      onNavigate('portfolio');
    } else if (slide.primaryAction === 'shop') {
      onNavigate('shop');
    }
  };

  const handleSecondaryClick = (slide: HeroSlide) => {
    if (slide.secondaryAction === 'services') {
      onNavigate('services');
    } else if (slide.secondaryAction === 'portfolio') {
      onNavigate('portfolio');
    } else if (slide.secondaryAction === 'shop') {
      onNavigate('shop');
    } else if (slide.secondaryAction === 'whatsapp') {
      window.open(
        `https://wa.me/${COMPANY_INFO.contact.whatsapp}?text=${encodeURIComponent(
          `Hello EVONIX TECHNOLOGIES, I saw slide "${slide.headingPrefix}" on your website and would like details.`
        )}`,
        '_blank'
      );
    }
  };

  return (
    <section
      id="hero-slider-section"
      className="relative min-h-[92vh] flex items-center pt-24 sm:pt-28 pb-16 overflow-hidden bg-slate-950 select-none"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Background Images with Cross-Fade Transition */}
      {HERO_SLIDES.map((slide, idx) => {
        const isActive = idx === currentSlideIndex;
        return (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out pointer-events-none ${
              isActive ? 'opacity-100 z-0' : 'opacity-0 -z-10'
            }`}
          >
            {/* Slide Image */}
            <img
              src={slide.bgImage}
              alt={slide.headingPrefix}
              referrerPolicy="no-referrer"
              className={`w-full h-full object-cover object-center transform transition-transform duration-10000 ${
                isActive ? 'scale-105' : 'scale-100'
              }`}
            />

            {/* Gradient Overlays for high legibility */}
            <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/85 to-slate-950/60 lg:to-slate-950/40"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-slate-950/70"></div>
            <div className="absolute inset-0 bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:28px_28px] opacity-15"></div>
          </div>
        );
      })}

      {/* Floating Ambient Lighting Glow */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 w-[550px] h-[350px] bg-cyan-500/10 blur-[130px] rounded-full pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-1/4 w-[450px] h-[300px] bg-blue-600/10 blur-[120px] rounded-full pointer-events-none"></div>

      {/* Slider Main Content Container */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Main Left Content (7 Cols) */}
          <div className="lg:col-span-7 text-center lg:text-left space-y-6">
            {/* Top UAE - Sialkot Heritage Pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/90 border border-cyan-800/60 text-xs sm:text-sm text-cyan-300 shadow-md backdrop-blur-md">
              <span className="flex items-center gap-1 text-amber-400 font-semibold">
                <Globe className="w-3.5 h-3.5" />
                Dubai (UAE)
              </span>
              <span className="text-slate-500">⟶</span>
              <span className="flex items-center gap-1 text-cyan-400 font-semibold">
                <MapPin className="w-3.5 h-3.5" />
                Sialkot (Pakistan)
              </span>
              <span className="hidden sm:inline text-slate-500">|</span>
              <span className="hidden sm:inline text-emerald-400 font-medium">
                20+ Years Experience
              </span>
            </div>

            {/* Dynamic Slide Heading */}
            <div className="space-y-2">
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.12]">
                {currentSlide.headingPrefix} <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-blue-500">
                  {currentSlide.headingGradient}
                </span>
              </h1>
              <p className="text-lg sm:text-2xl font-semibold text-slate-200 flex items-center justify-center lg:justify-start gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 inline-block animate-pulse"></span>
                {currentSlide.subHeading}
              </p>
            </div>

            {/* Slide Paragraph */}
            <p className="text-sm sm:text-base lg:text-lg text-slate-300/90 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-normal">
              {currentSlide.paragraph}
            </p>

            {/* Slide Action Buttons */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5">
              <button
                id={`hero-slide-primary-${currentSlide.id}`}
                onClick={() => handlePrimaryClick(currentSlide)}
                className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-sm sm:text-base shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Sparkles className="w-4 h-4 text-slate-950" />
                <span>{currentSlide.primaryCta}</span>
              </button>

              <button
                id={`hero-slide-secondary-${currentSlide.id}`}
                onClick={() => handleSecondaryClick(currentSlide)}
                className="w-full sm:w-auto px-6 py-3.5 rounded-xl border border-slate-700 bg-slate-900/80 hover:bg-slate-800 text-slate-200 font-semibold text-sm sm:text-base transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md backdrop-blur-sm"
              >
                <span>{currentSlide.secondaryCta}</span>
                <ArrowRight className="w-4 h-4 text-cyan-400" />
              </button>
            </div>

            {/* Quick Interactive Search Bar */}
            {onOpenSearch && (
              <div className="pt-1">
                <button
                  type="button"
                  onClick={onOpenSearch}
                  className="w-full max-w-xl flex items-center justify-between px-4 py-2.5 rounded-xl bg-slate-900/85 hover:bg-slate-900 border border-slate-700/80 hover:border-cyan-500/60 shadow-lg shadow-black/50 text-left transition-all group cursor-pointer backdrop-blur-md"
                >
                  <div className="flex items-center gap-2.5 text-xs sm:text-sm text-slate-400 group-hover:text-slate-200">
                    <Search className="w-4 h-4 text-cyan-400 group-hover:scale-110 transition-transform" />
                    <span>Search services, POS systems, laptops & Dubai portfolio...</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <kbd className="hidden sm:inline-flex items-center px-2 py-0.5 text-[10px] font-mono text-cyan-300 bg-cyan-950/80 border border-cyan-800/60 rounded">
                      ⌘K / Search
                    </kbd>
                    <ArrowRight className="w-3.5 h-3.5 text-cyan-400 group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </button>
              </div>
            )}

            {/* Slide Feature Pills */}
            <div className="pt-3 border-t border-slate-800/80 flex flex-wrap items-center justify-center lg:justify-start gap-2.5 text-xs text-slate-300">
              {currentSlide.pills.map((pill, idx) => (
                <div
                  key={idx}
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-slate-900/80 border border-slate-800 text-slate-300 backdrop-blur-sm"
                >
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                  <span>{pill}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Visual Floating Showcase Card (5 Cols) */}
          <div className="lg:col-span-5">
            <div className="relative rounded-2xl bg-gradient-to-b from-slate-900/90 to-slate-950/90 border border-slate-800 p-6 sm:p-7 shadow-2xl shadow-black/80 backdrop-blur-md">
              {/* Card Header with Live Status */}
              <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping"></span>
                  <span className="text-xs font-bold tracking-wider text-slate-300 uppercase">
                    Slide {currentSlideIndex + 1} of {totalSlides}
                  </span>
                </div>
                <span className="text-xs px-2.5 py-1 rounded-full bg-cyan-950 text-cyan-300 border border-cyan-800 font-medium">
                  {currentSlide.floatingBadge}
                </span>
              </div>

              {/* Active Slide Visual Preview Frame */}
              <div className="relative rounded-xl overflow-hidden border border-slate-700/80 aspect-video mb-4 shadow-inner group">
                <img
                  src={currentSlide.bgImage}
                  alt={currentSlide.headingPrefix}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent"></div>
                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs text-white">
                  <span className="font-semibold bg-slate-950/80 px-2.5 py-1 rounded-md backdrop-blur-sm border border-slate-800">
                    {currentSlide.floatingText}
                  </span>
                  <span className="text-[11px] text-cyan-400 font-mono">
                    Dubai ⟶ Sialkot
                  </span>
                </div>
              </div>

              {/* Fast Direct Contacts */}
              <div className="grid grid-cols-2 gap-3 text-xs pt-1">
                <a
                  href={`tel:${COMPANY_INFO.contact.phoneRaw}`}
                  className="p-2.5 rounded-xl bg-slate-950/80 border border-slate-800 hover:border-cyan-500/50 flex items-center gap-2 text-slate-300 hover:text-white transition-all"
                >
                  <PhoneCall className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                  <div>
                    <div className="text-[10px] text-slate-500">Call Direct</div>
                    <div className="font-semibold">{COMPANY_INFO.contact.phoneDisplay}</div>
                  </div>
                </a>

                <a
                  href={`https://wa.me/${COMPANY_INFO.contact.whatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-xl bg-emerald-950/50 border border-emerald-800/60 hover:bg-emerald-900/40 flex items-center gap-2 text-emerald-300 transition-all"
                >
                  <ShieldCheck className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  <div>
                    <div className="text-[10px] text-emerald-400">WhatsApp 24/7</div>
                    <div className="font-semibold">Fast Response</div>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Slider Navigation Controls Bar */}
        <div className="mt-12 flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-slate-800/80 text-xs">
          {/* Slide Indicator Dots & Numbers */}
          <div className="flex items-center gap-3">
            <span className="font-mono text-cyan-400 font-bold">
              0{currentSlideIndex + 1}
            </span>
            <div className="flex items-center gap-2">
              {HERO_SLIDES.map((slide, idx) => (
                <button
                  key={slide.id}
                  onClick={() => goToSlide(idx)}
                  aria-label={`Go to slide ${idx + 1}`}
                  className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                    idx === currentSlideIndex
                      ? 'w-8 bg-gradient-to-r from-cyan-400 to-blue-500 shadow-sm shadow-cyan-400/50'
                      : 'w-2 bg-slate-700 hover:bg-slate-500'
                  }`}
                />
              ))}
            </div>
            <span className="font-mono text-slate-500">0{totalSlides}</span>

            {/* Pause / Play button */}
            <button
              onClick={() => setIsPaused((prev) => !prev)}
              aria-label={isPaused ? 'Play slide show' : 'Pause slide show'}
              className="ml-2 p-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-white transition-colors cursor-pointer"
              title={isPaused ? 'Resume auto-play' : 'Pause auto-play'}
            >
              {isPaused ? <Play className="w-3 h-3" /> : <Pause className="w-3 h-3" />}
            </button>
          </div>

          {/* Quick Slide Titles List for Direct Jump */}
          <div className="hidden md:flex items-center gap-2">
            {HERO_SLIDES.map((slide, idx) => (
              <button
                key={slide.id}
                onClick={() => goToSlide(idx)}
                className={`px-3 py-1.5 rounded-lg transition-all text-[11px] font-medium cursor-pointer ${
                  idx === currentSlideIndex
                    ? 'bg-cyan-950 text-cyan-300 border border-cyan-800'
                    : 'text-slate-400 hover:text-slate-200 bg-slate-900/60 border border-slate-800/60'
                }`}
              >
                {idx === 0 && '1. Dubai Heritage'}
                {idx === 1 && '2. Web & POS Software'}
                {idx === 2 && '3. Laptop & Doorstep Repair'}
              </button>
            ))}
          </div>

          {/* Prev / Next Navigation Arrows */}
          <div className="flex items-center gap-2">
            <button
              id="hero-slider-prev-btn"
              onClick={prevSlide}
              aria-label="Previous slide"
              className="p-2.5 rounded-xl bg-slate-900/90 hover:bg-slate-800 border border-slate-700 text-slate-300 hover:text-white transition-all shadow-md active:scale-95 cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              id="hero-slider-next-btn"
              onClick={nextSlide}
              aria-label="Next slide"
              className="p-2.5 rounded-xl bg-slate-900/90 hover:bg-slate-800 border border-slate-700 text-slate-300 hover:text-white transition-all shadow-md active:scale-95 cursor-pointer"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
