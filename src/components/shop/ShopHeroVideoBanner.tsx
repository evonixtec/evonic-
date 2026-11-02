import React, { useState, useEffect, useRef } from 'react';
import { 
  Laptop, 
  Printer, 
  Monitor, 
  Keyboard, 
  HardDrive, 
  Cpu, 
  Sparkles, 
  ShieldCheck, 
  Truck, 
  ArrowRight, 
  MessageCircle, 
  Phone, 
  Play, 
  Pause, 
  ChevronLeft, 
  ChevronRight, 
  CheckCircle2, 
  Zap,
  ShoppingBag,
  Flame,
  Percent
} from 'lucide-react';
import { COMPANY_INFO } from '../../data/content';

interface ShopBannerSlide {
  id: string;
  categoryTag: string;
  badge: string;
  badgeUrdu: string;
  title: string;
  titleUrdu: string;
  description: string;
  priceTag: string;
  discountBadge: string;
  productImg: string;
  glowColor: string;
  accentGradient: string;
  specs: string[];
  categoryFilterId: string;
  whatsappMessage: string;
}

interface ShopHeroVideoBannerProps {
  onSelectCategory?: (categoryId: string) => void;
  onInquireProduct?: (productName: string) => void;
}

export const ShopHeroVideoBanner: React.FC<ShopHeroVideoBannerProps> = ({
  onSelectCategory,
  onInquireProduct,
}) => {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [progress, setProgress] = useState(0);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const SLIDE_DURATION = 6500; // 6.5s per slide

  const slides: ShopBannerSlide[] = [
    {
      id: 'slide-laptops',
      categoryTag: 'CERTIFIED ENTERPRISE LAPTOPS',
      badge: 'Dubai Direct Import Business Laptops',
      badgeUrdu: 'دبئی سے براہ راست امپورٹ بزنس لیپ ٹاپس',
      title: 'Enterprise Business Laptops & Workstations',
      titleUrdu: 'ڈیل، لینووو تھنک پیڈ اور ایچ پی ایلیٹ بکس — 20% ڈسکاؤنٹ پر',
      description: 'Grade-A tested Dell Latitude, Lenovo ThinkPad, and HP EliteBook corporate laptops. 40-point bench inspection, NVMe SSD, DDR4/DDR5 RAM, with 90-day written lab warranty.',
      priceTag: 'Starting Rs. 42,000',
      discountBadge: '20% OFF Market Rates',
      productImg: '/images/shop/laptop_dell_latitude.webp',
      glowColor: 'rgba(59, 130, 246, 0.28)',
      accentGradient: 'from-blue-600 to-cyan-500',
      specs: [
        'Intel Core i5 / i7 Processors',
        '8GB - 32GB High-Speed RAM',
        '256GB - 1TB Ultra M.2 SSD',
        '90-Day Written Lab Warranty'
      ],
      categoryFilterId: 'Laptops & PCs',
      whatsappMessage: 'Hello Evonix Store, I want to inquire about your Certified Enterprise Business Laptops.',
    },
    {
      id: 'slide-pos-cashier',
      categoryTag: 'RETAIL & PHARMACY AUTOMATION',
      badge: 'POS Cashier Machines & Thermal Printers',
      badgeUrdu: 'پی او ایس کیشیئر مشینیں اور 80mm تھرمل پرنٹرز',
      title: 'Touchscreen POS & Cashier Billing Machines',
      titleUrdu: '15.6 انچ ٹچ اسکرین بلنگ سسٹم، آٹو کٹر پرنٹر اور کیش دراز',
      description: 'High-speed 80mm ESC/POS thermal receipt printers with 260mm/s auto-cutter, 15.6" capacitive touch terminals, and heavy 5-bill steel cash drawers with RJ11 auto-kick.',
      priceTag: 'Printers from Rs. 18,500',
      discountBadge: 'Same-Day Sialkot COD',
      productImg: '/images/shop/printer_thermal_receipt.webp',
      glowColor: 'rgba(16, 185, 129, 0.28)',
      accentGradient: 'from-emerald-500 to-teal-400',
      specs: [
        '260mm/s Japanese Print Head',
        '15.6" PCAP Multi-Touch Terminal',
        'Heavy-Gauge 5-Bill Cash Drawer',
        '1-Year Local Replacement Sialkot'
      ],
      categoryFilterId: 'Thermal & POS Printers',
      whatsappMessage: 'Hello Evonix Store, I want to order POS Cashier Machines & Thermal Receipt Printers.',
    },
    {
      id: 'slide-peripherals',
      categoryTag: 'HIGH-PERFORMANCE PERIPHERALS',
      badge: 'Mechanical Keyboards, Mice & 2D Scanners',
      badgeUrdu: 'مکینیکل کی بورڈز، وائرلیس ماؤس اور 2D اسکینرز',
      title: 'Precision Cashier & Developer Peripherals',
      titleUrdu: 'ہائی ڈسپلے آپٹیکل ماؤس، مکینیکل کی بورڈز اور وائرلیس بارکوڈ اسکینرز',
      description: 'Ergonomic 1D/2D wireless handheld barcode scanners with laser aim, tactile mechanical keyboards, and precision optical mice built for heavy-duty daily operations.',
      priceTag: 'Scanners from Rs. 9,500',
      discountBadge: 'Tested in Hand',
      productImg: '/images/shop/pos_barcode_scanner.webp',
      glowColor: 'rgba(168, 85, 247, 0.28)',
      accentGradient: 'from-purple-600 to-pink-500',
      specs: [
        '2.4G Wireless + Bluetooth Dual Mode',
        'Decodes Blister Foils & Screens',
        '185g Ergonomic Handheld Grip',
        'Durable Mechanical Tactile Keys'
      ],
      categoryFilterId: 'Spare Parts & Accessories',
      whatsappMessage: 'Hello Evonix Store, I want to purchase Peripherals (Scanners, Keyboards, Mice).',
    },
    {
      id: 'slide-storage-parts',
      categoryTag: 'ULTRA-SPEED STORAGE & MEMORY',
      badge: 'High-Speed NVMe SSDs & DDR4/DDR5 RAM',
      badgeUrdu: 'ہائی اسپیڈ سالڈ اسٹیٹ ڈرائیوز اور ریم میموری',
      title: 'Solid-State Storage Drives & RAM Upgrades',
      titleUrdu: 'سیمسنگ 980 این وی ایم ای ایس ایس ڈیز اور ہائی پرفارمنس ڈی ڈی آر 4/5 ریم',
      description: 'Up to 3,500MB/s read speeds with genuine Samsung and Western Digital M.2 NVMe SSDs, plus Kingston Fury high-frequency RAM kits for instant workstation booting.',
      priceTag: 'SSDs from Rs. 4,500',
      discountBadge: 'Genuine Chips with Warranty',
      productImg: '/images/shop/ssd_nvme_m2.webp',
      glowColor: 'rgba(245, 158, 11, 0.28)',
      accentGradient: 'from-amber-500 to-orange-400',
      specs: [
        'PCIe Gen 3.0 / 4.0 M.2 Speeds',
        'Zero Noise & Low Power Consumption',
        'Kingston / Samsung Genuine Silicon',
        'Free On-Site Bench Cloning'
      ],
      categoryFilterId: 'Spare Parts & Accessories',
      whatsappMessage: 'Hello Evonix Store, I need NVMe SSD or RAM upgrades for my computer.',
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

  const handleWhatsAppAction = (slide: ShopBannerSlide) => {
    const cleanNumber = COMPANY_INFO.contact.whatsapp.replace(/[^0-9]/g, '');
    const url = `https://wa.me/${cleanNumber}?text=${encodeURIComponent(slide.whatsappMessage)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  // High-Tech 60fps Dynamic Canvas Video Engine
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || 1200);
    let height = (canvas.height = canvas.parentElement?.clientHeight || 560);

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };
    window.addEventListener('resize', handleResize);

    // Particle nodes
    const particleCount = 40;
    const particles: { x: number; y: number; vx: number; vy: number; radius: number; alpha: number }[] = [];
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.8,
        vy: (Math.random() - 0.5) * 0.8,
        radius: Math.random() * 2 + 1,
        alpha: Math.random() * 0.5 + 0.2,
      });
    }

    let scanBeamY = 0;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // 1. Perspective Cyber Grid
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.035)';
      ctx.lineWidth = 1;
      const gridSize = 36;
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

      // 2. High-Tech Laser Scan Beam Video Simulation
      scanBeamY = (scanBeamY + 1.4) % height;
      const beamGrad = ctx.createLinearGradient(0, scanBeamY - 30, 0, scanBeamY + 30);
      beamGrad.addColorStop(0, 'rgba(255, 255, 255, 0)');
      beamGrad.addColorStop(0.5, currentSlide.glowColor || 'rgba(59, 130, 246, 0.2)');
      beamGrad.addColorStop(1, 'rgba(255, 255, 255, 0)');
      ctx.fillStyle = beamGrad;
      ctx.fillRect(0, scanBeamY - 30, width, 60);

      // 3. Floating Light Particles
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        ctx.fillStyle = `rgba(255, 255, 255, ${p.alpha * 0.7})`;
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
      className="relative overflow-hidden rounded-[32px] bg-slate-950 border border-slate-800 shadow-2xl mb-12"
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
                    ? 'bg-gradient-to-r from-red-500 via-amber-400 to-emerald-400'
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
              <span className="hidden lg:inline text-amber-400 text-[10px] font-semibold">{s.priceTag}</span>
            </div>
          </button>
        ))}
      </div>

      {/* Main Slide Content Area */}
      <div className="relative z-10 p-5 sm:p-8 lg:p-12 min-h-[460px] flex items-center">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center w-full">
          
          {/* LEFT: Text, Headings, Urdu Branding, Specs & Action Buttons (lg:col-span-7) */}
          <div className="lg:col-span-7 space-y-5 text-left">
            
            {/* Top Badges */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-950/90 border border-red-500/50 text-red-300 text-xs font-black uppercase tracking-wider shadow-sm">
                <Flame className="w-3.5 h-3.5 text-red-400 animate-pulse" />
                <span>{currentSlide.badge}</span>
              </span>

              <span className="inline-flex items-center px-3 py-1 rounded-full bg-slate-900 border border-slate-700 text-slate-300 text-xs font-bold font-sans">
                {currentSlide.badgeUrdu}
              </span>

              <span className="inline-flex items-center gap-1 text-[11px] font-bold text-amber-400 bg-amber-950/40 px-2.5 py-0.5 rounded-md border border-amber-500/20">
                <Percent className="w-3 h-3" />
                <span>{currentSlide.discountBadge}</span>
              </span>
            </div>

            {/* Main Headline */}
            <div>
              <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
                {currentSlide.title}
              </h2>

              <p className="mt-1 text-sm sm:text-base font-bold text-amber-400 tracking-wide font-sans">
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

            {/* Price & CTA Action Buttons */}
            <div className="pt-2 flex flex-wrap items-center gap-3">
              <div className="px-4 py-2 rounded-xl bg-slate-900 border border-red-500/40 text-left">
                <span className="text-[10px] text-slate-400 block uppercase font-bold">Direct Dubai Import</span>
                <span className="text-xl sm:text-2xl font-black text-white">{currentSlide.priceTag}</span>
              </div>

              <button
                type="button"
                onClick={() => handleWhatsAppAction(currentSlide)}
                className="px-6 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm uppercase tracking-wider transition-all shadow-lg shadow-emerald-950/40 flex items-center gap-2 cursor-pointer group"
              >
                <MessageCircle className="w-4 h-4 fill-current text-white group-hover:scale-110 transition-transform" />
                <span>Order via WhatsApp (COD)</span>
              </button>

              {onSelectCategory && (
                <button
                  type="button"
                  onClick={() => onSelectCategory(currentSlide.categoryFilterId)}
                  className="px-4 py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 font-bold text-xs sm:text-sm transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <span>Filter {currentSlide.categoryFilterId}</span>
                  <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
                </button>
              )}
            </div>

          </div>

          {/* RIGHT: Floating 3D Hardware Visual Showcase (lg:col-span-5) */}
          <div className="lg:col-span-5 relative flex items-center justify-center">
            
            {/* Ambient Radial Lighting */}
            <div className="absolute w-72 h-72 rounded-full bg-red-600/15 blur-3xl pointer-events-none" />

            {/* High-Impact Hardware Showcase Card */}
            <div className="relative w-full max-w-sm rounded-3xl bg-gradient-to-b from-slate-900/90 to-slate-950/90 border border-slate-700/80 p-5 shadow-2xl backdrop-blur-md space-y-4 group">
              
              {/* Product Photo with Scanline Overlay */}
              <div className="relative aspect-4/3 rounded-2xl overflow-hidden bg-slate-950 border border-slate-800 flex items-center justify-center">
                <img
                  src={currentSlide.productImg}
                  alt={currentSlide.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).src = '/images/shop/laptop_dell_latitude.webp';
                  }}
                />

                {/* Badges */}
                <div className="absolute top-2.5 left-2.5 px-2.5 py-1 rounded-md bg-slate-950/90 border border-slate-700 text-[10px] font-bold text-white flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
                  <span>40-Point Lab Tested</span>
                </div>

                <div className="absolute top-2.5 right-2.5 px-2 py-0.5 rounded bg-red-950/90 border border-red-500/40 text-[10px] font-bold text-red-300">
                  {currentSlide.discountBadge}
                </div>

                <div className="absolute bottom-2.5 right-2.5 px-2.5 py-1 rounded-md bg-slate-950/90 border border-slate-700 text-[11px] font-black text-amber-400">
                  {currentSlide.priceTag}
                </div>
              </div>

              {/* Physical Sialkot Depot Verification */}
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800/90 flex items-center justify-between text-xs text-slate-300">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span className="font-semibold text-[11px]">Sialkot Written Warranty</span>
                </div>
                <span className="text-[10px] text-slate-400 font-mono">Kotli Behram</span>
              </div>

              {/* Direct Fast Button */}
              <button
                type="button"
                onClick={() => handleWhatsAppAction(currentSlide)}
                className="w-full py-2.5 px-3 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold text-xs transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-sm"
              >
                <span>Inquire Instant Stock &amp; Delivery</span>
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
            {isPlaying ? <Pause className="w-3.5 h-3.5 text-amber-400" /> : <Play className="w-3.5 h-3.5 text-amber-400" />}
            <span className="hidden sm:inline font-mono text-[10px]">{isPlaying ? 'Auto-play ON' : 'Paused'}</span>
          </button>
        </div>

        {/* Counter Info */}
        <div className="flex items-center gap-2">
          <span className="text-xs font-mono font-bold text-amber-400">
            0{currentSlideIndex + 1} / 0{slides.length}
          </span>
          <span className="hidden md:inline text-xs text-slate-400">
            • Laptops, POS Cashier Machines, Keyboards, Mice &amp; NVMe Storage
          </span>
        </div>
      </div>

    </div>
  );
};
