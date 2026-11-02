import React, { useState, useEffect, useRef } from 'react';
import { 
  Sparkles, 
  FileText, 
  Barcode, 
  Boxes, 
  Calculator, 
  ArrowRight, 
  ShieldCheck, 
  Globe, 
  Play, 
  Pause, 
  ChevronLeft, 
  ChevronRight, 
  CheckCircle2, 
  Search,
  Code,
  Layers
} from 'lucide-react';
import { NavPageId } from '../../types';

interface ToolBannerSlide {
  id: string;
  categoryTag: string;
  badge: string;
  badgeUrdu: string;
  title: string;
  titleUrdu: string;
  description: string;
  toolSlug: string;
  navTarget: NavPageId | string;
  productImg: string;
  glowColor: string;
  accentGradient: string;
  specs: string[];
  ctaText: string;
}

interface ToolsHeroVideoBannerProps {
  onLaunchTool?: (target: NavPageId | string) => void;
  onFilterCategory?: (category: string) => void;
}

export const ToolsHeroVideoBanner: React.FC<ToolsHeroVideoBannerProps> = ({
  onLaunchTool,
  onFilterCategory,
}) => {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [progress, setProgress] = useState(0);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const SLIDE_DURATION = 6500; // 6.5s per slide

  const slides: ToolBannerSlide[] = [
    {
      id: 'slide-trend-intelligence',
      categoryTag: 'AI & MARKET TRENDS ENGINE',
      badge: 'Trend Intelligence Suite (V15 Build)',
      badgeUrdu: 'ٹرینڈ انٹیلیجنس سوٹ — ریئل ٹائم ریسرچ انجن',
      title: 'Multi-Platform Keyword Trend Intelligence',
      titleUrdu: 'گوگل، ایمیزون، ای بے، بنگ اور یوٹیوب کے لائیو کی ورڈ اسکورز',
      description: 'Analyze real-time keyword velocity and search volume across 5 global platforms simultaneously. Batch analyze up to 500 keywords with instant CSV export and zero server logs.',
      toolSlug: 'trend-intelligence-suite',
      navTarget: 'trend-intelligence-suite',
      productImg: '/images/GEO_and_E-E-A-T_Diagnostic.webp',
      glowColor: 'rgba(168, 85, 247, 0.28)',
      accentGradient: 'from-purple-600 to-indigo-500',
      specs: [
        '5-Platform Live Scoring Algorithm',
        'Batch 500 Keywords CSV Export',
        '100% Client-Side Private Processing',
        'Automated Edge Failover Grid'
      ],
      ctaText: 'Launch Trend Intelligence',
    },
    {
      id: 'slide-global-invoice',
      categoryTag: 'COMMERCIAL BILLING & TAXES',
      badge: 'Global Micro-Invoice & Thermal Generator',
      badgeUrdu: 'گلوبل مائیکرو انوائس اور تھرمل ریسپٹ جنریٹر',
      title: 'Instant Multi-Currency Invoicing & 80mm Receipts',
      titleUrdu: '100 سے زائد ممالک کے لیے جی ایس ٹی، ویٹ اور 80mm پرنٹر ریسپٹس',
      description: 'Generate legally compliant commercial invoices, tax receipts, and 80mm ESC/POS slips for retail stores and exporters. Supports 100+ national currencies with instant PDF download.',
      toolSlug: 'invoice-generator',
      navTarget: 'invoice',
      productImg: '/images/micro-invoice-generator-2026.webp',
      glowColor: 'rgba(16, 185, 129, 0.28)',
      accentGradient: 'from-emerald-500 to-teal-400',
      specs: [
        '100+ Currencies & Real-Time Math',
        '80mm & 58mm Thermal Print Layout',
        'EAN/QR Code Embedded on Invoices',
        'Zero Signup & Zero Server Storage'
      ],
      ctaText: 'Open Invoice Generator',
    },
    {
      id: 'slide-cbm-engine',
      categoryTag: 'EXPORT FREIGHT & CONTAINER LOGISTICS',
      badge: 'B2B Industrial CBM & Cargo Engine',
      badgeUrdu: 'سی بی ایم کارگو اور کنٹینر اسپیس کیلکولیٹر',
      title: 'Precision CBM Volumetric Freight Allocator',
      titleUrdu: '20 فٹ، 40 فٹ اور ہائی کیوب کنٹینرز کے لیے کارگو کیوبک میٹرز',
      description: 'Calculate exact cubic meters (CBM), air courier volumetric weight (/5000), air cargo (/6000), and 20ft/40ft ocean container packing utilization for Sialkot export consignments.',
      toolSlug: 'export-cbm-calculator',
      navTarget: 'cbm-calculator',
      productImg: '/images/Compute_industrial_cargo.webp',
      glowColor: 'rgba(6, 182, 212, 0.28)',
      accentGradient: 'from-cyan-500 to-blue-500',
      specs: [
        '20ft / 40ft / 40HC Container Limits',
        'Air Courier vs Air Cargo Divisor Logic',
        'Visual Packing Capacity Bars',
        'Instant Freight Forwarder Summary'
      ],
      ctaText: 'Calculate Container CBM',
    },
    {
      id: 'slide-barcode-studio',
      categoryTag: 'INDUSTRIAL PACKAGING & COMPLIANCE',
      badge: 'Export Barcode Label Studio & Tax Suites',
      badgeUrdu: 'ایکسپورٹ بارکوڈ اسٹوڈیو اور انٹرنیشنل ٹیکس انجن',
      title: 'GS1-128 & 4x6" Logistics Label Generator',
      titleUrdu: 'جی ایس ون 128 بارکوڈز، 4x6 آؤٹر کارٹن لیبلز اور یو کے ویٹ رولز',
      description: 'Vector-sharp GS1-128, EAN-13, and Code 128 outer carton label studio paired with UK/EU VAT reverse charge compliance engines and US Section 321 de minimis estimators.',
      toolSlug: 'barcode-label-studio',
      navTarget: 'export-barcode-studio',
      productImg: '/images/export-barcode-studio-2026.webp',
      glowColor: 'rgba(245, 158, 11, 0.28)',
      accentGradient: 'from-amber-500 to-orange-400',
      specs: [
        'Vector SVG & 300 DPI PNG Barcodes',
        'Thermal 4x6" Outer Carton Templates',
        'HMRC Section 55A VAT Automation',
        'US Section 321 De Minimis Formulas'
      ],
      ctaText: 'Open Barcode Studio',
    },
  ];

  const currentSlide = slides[currentSlideIndex];

  // Auto-play timer
  useEffect(() => {
    if (!isPlaying) return;

    const intervalTime = 50;
    const step = (intervalTime / SLIDE_DURATION) * 100;

    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          setCurrentSlideIndex((old) => (old + 1) % slides.length);
          return 0;
        }
        return prev + step;
      });
    }, intervalTime);

    return () => clearInterval(timer);
  }, [isPlaying, slides.length]);

  const handleNext = () => {
    setCurrentSlideIndex((prev) => (prev + 1) % slides.length);
    setProgress(0);
  };

  const handlePrev = () => {
    setCurrentSlideIndex((prev) => (prev - 1 + slides.length) % slides.length);
    setProgress(0);
  };

  const handleSelectSlide = (idx: number) => {
    setCurrentSlideIndex(idx);
    setProgress(0);
  };

  const handleLaunch = (slide: ToolBannerSlide) => {
    if (onLaunchTool) {
      onLaunchTool(slide.navTarget);
    }
  };

  // High-Tech 60fps Dynamic Canvas Video Simulation for Tools
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || 1200);
    let height = (canvas.height = canvas.parentElement?.clientHeight || 520);

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };
    window.addEventListener('resize', handleResize);

    const particleCount = 42;
    const particles: { x: number; y: number; vx: number; vy: number; radius: number; alpha: number }[] = [];
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.75,
        vy: (Math.random() - 0.5) * 0.75,
        radius: Math.random() * 2 + 1,
        alpha: Math.random() * 0.5 + 0.25,
      });
    }

    let laserSweepY = 0;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Cyber Matrix Grid
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.035)';
      ctx.lineWidth = 1;
      const gridSize = 38;
      for (let x = 0; x < width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y < height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // Laser Sweep Simulation
      laserSweepY = (laserSweepY + 1.3) % height;
      const laserGrad = ctx.createLinearGradient(0, laserSweepY - 28, 0, laserSweepY + 28);
      laserGrad.addColorStop(0, 'rgba(255, 255, 255, 0)');
      laserGrad.addColorStop(0.5, currentSlide.glowColor || 'rgba(168, 85, 247, 0.2)');
      laserGrad.addColorStop(1, 'rgba(255, 255, 255, 0)');
      ctx.fillStyle = laserGrad;
      ctx.fillRect(0, laserSweepY - 28, width, 56);

      // Interactive Glowing Particles
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        ctx.fillStyle = `rgba(255, 255, 255, ${p.alpha * 0.65})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [currentSlide.glowColor]);

  return (
    <div 
      className="relative overflow-hidden rounded-[32px] bg-slate-950 border border-slate-800 shadow-2xl mb-10"
      onMouseEnter={() => setIsPlaying(false)}
      onMouseLeave={() => setIsPlaying(true)}
    >
      {/* Dynamic 60fps Cyber Canvas Video Simulation */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none z-0"
      />

      {/* Glassmorphic Ambient Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-slate-950/95 via-slate-950/85 to-slate-950/90 z-1 pointer-events-none" />

      {/* Top Slide Navigation Progress Bars */}
      <div className="relative z-10 grid grid-cols-2 sm:grid-cols-4 gap-2 p-3 sm:px-6 pt-4 border-b border-slate-800/80 bg-slate-950/50 backdrop-blur-xs">
        {slides.map((s, idx) => (
          <button
            key={s.id}
            type="button"
            onClick={() => handleSelectSlide(idx)}
            className="group/pill text-left cursor-pointer space-y-1"
          >
            <div className="h-1 rounded-full bg-slate-800 overflow-hidden">
              <div 
                className={`h-full transition-all duration-75 ${
                  currentSlideIndex === idx
                    ? 'bg-gradient-to-r from-blue-500 via-purple-400 to-emerald-400'
                    : idx < currentSlideIndex
                    ? 'bg-slate-600'
                    : 'bg-transparent'
                }`}
                style={{
                  width: currentSlideIndex === idx ? `${progress}%` : idx < currentSlideIndex ? '100%' : '0%',
                }}
              />
            </div>
            <div className="flex items-center justify-between text-[11px] font-mono">
              <span className={`truncate font-bold ${currentSlideIndex === idx ? 'text-white' : 'text-slate-400 group-hover/pill:text-slate-200'}`}>
                0{idx + 1}. {s.badge.split(' ')[0]} {s.badge.split(' ')[1] || ''}
              </span>
              <span className="hidden lg:inline text-emerald-400 text-[10px] font-semibold">100% Free</span>
            </div>
          </button>
        ))}
      </div>

      {/* Main Slide Content Area */}
      <div className="relative z-10 p-5 sm:p-8 lg:p-12 min-h-[440px] flex items-center">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center w-full">
          
          {/* LEFT: Heading, Urdu Subtitle, Description, Specs & Launch CTAs (lg:col-span-7) */}
          <div className="lg:col-span-7 space-y-5 text-left">
            
            {/* Top Badges */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-950/90 border border-blue-500/50 text-blue-300 text-xs font-black uppercase tracking-wider shadow-sm">
                <Sparkles className="w-3.5 h-3.5 text-blue-400 animate-pulse" />
                <span>{currentSlide.badge}</span>
              </span>

              <span className="inline-flex items-center px-3 py-1 rounded-full bg-slate-900 border border-slate-700 text-slate-300 text-xs font-bold font-sans">
                {currentSlide.badgeUrdu}
              </span>

              <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-400 bg-emerald-950/40 px-2.5 py-0.5 rounded-md border border-emerald-500/20">
                <ShieldCheck className="w-3 h-3" />
                <span>Zero Server Storage • Private</span>
              </span>
            </div>

            {/* Main Headline */}
            <div>
              <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
                {currentSlide.title}
              </h2>

              <p className="mt-1 text-sm sm:text-base font-bold text-cyan-400 tracking-wide font-sans">
                {currentSlide.titleUrdu}
              </p>
            </div>

            {/* Description */}
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-xl">
              {currentSlide.description}
            </p>

            {/* 4 Feature Spec Badges */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1 max-w-xl">
              {currentSlide.specs.map((spec, sIdx) => (
                <div key={sIdx} className="p-2 rounded-lg bg-slate-900/90 border border-slate-800 text-[11px] text-slate-300 flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span className="truncate font-medium">{spec}</span>
                </div>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="pt-2 flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={() => handleLaunch(currentSlide)}
                className="px-6 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs sm:text-sm uppercase tracking-wider transition-all shadow-lg shadow-blue-950/40 flex items-center gap-2 cursor-pointer group"
              >
                <span>{currentSlide.ctaText}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <div className="px-4 py-3 rounded-xl bg-slate-900/90 border border-slate-800 text-xs text-slate-400 flex items-center gap-2">
                <Globe className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Instant Browser Workstation • 0 Cloud Wait</span>
              </div>
            </div>

          </div>

          {/* RIGHT: Floating High-Tech Tool Preview Showcase (lg:col-span-5) */}
          <div className="lg:col-span-5 relative flex items-center justify-center">
            
            {/* Ambient Lighting */}
            <div className="absolute w-72 h-72 rounded-full bg-blue-600/15 blur-3xl pointer-events-none" />

            {/* Tool Visual Card */}
            <div className="relative w-full max-w-sm rounded-3xl bg-gradient-to-b from-slate-900/90 to-slate-950/90 border border-slate-700/80 p-5 shadow-2xl backdrop-blur-md space-y-4 group">
              
              {/* Tool Mockup / Feature Visual */}
              <div className="relative aspect-4/3 rounded-2xl overflow-hidden bg-slate-950 border border-slate-800 flex items-center justify-center">
                <img
                  src={currentSlide.productImg}
                  alt={currentSlide.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).src = '/images/micro-invoice-generator-2026.webp';
                  }}
                />

                {/* Badge */}
                <div className="absolute top-2.5 left-2.5 px-2.5 py-1 rounded-md bg-slate-950/90 border border-slate-700 text-[10px] font-bold text-white flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-blue-400 animate-ping"></span>
                  <span>Interactive Engine</span>
                </div>

                <div className="absolute top-2.5 right-2.5 px-2 py-0.5 rounded bg-emerald-950/90 border border-emerald-500/40 text-[10px] font-bold text-emerald-300">
                  Free Forever
                </div>
              </div>

              {/* Verified Privacy Note */}
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800/90 flex items-center justify-between text-xs text-slate-300">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span className="font-semibold text-[11px]">Zero Cloud Latency</span>
                </div>
                <span className="text-[10px] text-slate-400 font-mono">100% Client-Side</span>
              </div>

              {/* Direct Launch Button */}
              <button
                type="button"
                onClick={() => handleLaunch(currentSlide)}
                className="w-full py-2.5 px-3 rounded-xl bg-blue-600/90 hover:bg-blue-500 text-white font-bold text-xs transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-sm"
              >
                <span>Launch {currentSlide.badge.split(' ')[0]}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

            </div>

          </div>

        </div>
      </div>

      {/* Slider Footer Navigation Controls */}
      <div className="relative z-10 p-3 sm:px-6 bg-slate-950/80 border-t border-slate-800 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handlePrev}
            className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 transition-colors cursor-pointer"
            aria-label="Previous Slide"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          <button
            type="button"
            onClick={handleNext}
            className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 transition-colors cursor-pointer"
            aria-label="Next Slide"
          >
            <ChevronRight className="w-4 h-4" />
          </button>

          <button
            type="button"
            onClick={() => setIsPlaying(!isPlaying)}
            className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 transition-colors cursor-pointer text-xs flex items-center gap-1.5"
            aria-label={isPlaying ? 'Pause Auto-slide' : 'Play Auto-slide'}
          >
            {isPlaying ? <Pause className="w-3.5 h-3.5 text-cyan-400" /> : <Play className="w-3.5 h-3.5 text-cyan-400" />}
            <span className="hidden sm:inline font-mono text-[10px]">{isPlaying ? 'Auto-play ON' : 'Paused'}</span>
          </button>
        </div>

        {/* Counter Info */}
        <div className="flex items-center gap-2">
          <span className="text-xs font-mono font-bold text-cyan-400">
            0{currentSlideIndex + 1} / 0{slides.length}
          </span>
          <span className="hidden md:inline text-xs text-slate-400">
            • 26 Free Enterprise E-Commerce, Export &amp; Packaging Calculators
          </span>
        </div>
      </div>

    </div>
  );
};
