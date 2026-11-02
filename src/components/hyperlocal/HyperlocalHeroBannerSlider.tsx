import React, { useState, useEffect, useRef } from 'react';
import { 
  Printer, 
  Barcode, 
  Monitor, 
  Truck, 
  ShieldCheck, 
  ChevronRight, 
  ChevronLeft, 
  Sparkles, 
  ArrowRight, 
  Phone, 
  MessageCircle, 
  Activity, 
  CheckCircle2, 
  Play, 
  Pause,
  Layers,
  Building2
} from 'lucide-react';
import { LocalProduct } from '../../data/hyperlocalData';

interface BannerSlide {
  id: string;
  tagline: string;
  badge: string;
  badgeUrdu: string;
  title: string;
  titleUrdu: string;
  description: string;
  descriptionUrdu: string;
  priceTag: string;
  productImg: string;
  accentColor: string; // Tailwind color token
  glowColor: string; // CSS color for canvas
  specs: string[];
  ctaText: string;
  ctaActionText: string;
  productSku: string;
}

interface HyperlocalHeroBannerSliderProps {
  onSelectProduct?: (sku: string) => void;
  onOpenReceiptDemo?: () => void;
  whatsappNumber?: string;
  contactPhone?: string;
}

export const HyperlocalHeroBannerSlider: React.FC<HyperlocalHeroBannerSliderProps> = ({
  onSelectProduct,
  onOpenReceiptDemo,
  whatsappNumber = '923263244002',
  contactPhone = '+923263244002',
}) => {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [progress, setProgress] = useState(0);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const SLIDE_DURATION = 6000; // 6 seconds per banner

  const slides: BannerSlide[] = [
    {
      id: 'slide-thermal-shop',
      tagline: 'SIALKOT CENTRAL B2B DEPOT',
      badge: 'POS Hardware & Thermal Shop',
      badgeUrdu: 'پی او ایس ہارڈویئر اینڈ تھرمل شاپ',
      title: 'POS Hardware & Thermal Shop Depot',
      titleUrdu: 'پی او ایس ہارڈویئر اینڈ تھرمل شاپ — سیالکوٹ سنٹرل ڈپو',
      description: 'Heavy-duty 80mm & 58mm ESC/POS thermal receipt printers with 260mm/s auto-cutter, dual USB+LAN ports & 1-Year Local Sialkot Replacement Warranty.',
      descriptionUrdu: 'ہائی اسپیڈ 80 ملی میٹر تھرمل ریسپٹ پرنٹرز، آٹو کٹر، یو ایس بی اور لین پورٹس مع کیش آن ڈیلیوری۔',
      priceTag: 'Rs. 18,500',
      productImg: '/images/shop/printer_thermal_receipt.webp',
      accentColor: 'from-emerald-500 to-teal-400',
      glowColor: 'rgba(16, 185, 129, 0.25)',
      specs: [
        '260mm/s Japanese Print Head',
        '1,500,000 Guaranteed Auto-Cuts',
        'Dual USB 2.0 + LAN Ethernet',
        '24V RJ11 Auto Cash Drawer Kick'
      ],
      ctaText: 'Order 80mm Printer (COD)',
      ctaActionText: 'Order 80mm Printer via WhatsApp',
      productSku: 'EVX-PRN-80U',
    },
    {
      id: 'slide-medical-pos',
      tagline: 'PHARMACY & HOSPITAL CERTIFIED',
      badge: 'Medical Store & Pharmacy POS Systems',
      badgeUrdu: 'میڈیکل اسٹور و فارمیسی پی او ایس سسٹمز',
      title: 'Medical Store & Pharmacy POS Precision Hardware',
      titleUrdu: 'میڈیکل اسٹورز اور فارمیسیز کے لیے تصدیق شدہ پی او ایس بلنگ',
      description: 'DRAP-compliant 80mm drug batch receipt printing & 2D wireless barcode scanners. Instant zero-glare reading of medicine blister foils and curved syrup bottles.',
      descriptionUrdu: 'ڈرگ ریگولیٹری اتھارٹی کے مطابق ایکسپائری اور بیچ پرنٹنگ اور میڈیسن فوائل بارکوڈ اسکیننگ۔',
      priceTag: 'Rs. 9,500',
      productImg: '/images/shop/pos_barcode_scanner.webp',
      accentColor: 'from-teal-400 to-cyan-400',
      glowColor: 'rgba(20, 184, 166, 0.25)',
      specs: [
        'DRAP Batch & Expiry Compliance',
        'Reads Blister Foil DataMatrix & QR',
        '185g Ergonomic Handheld Grip',
        '100m Wireless 2.4G + Bluetooth'
      ],
      ctaText: 'Order 2D Scanner (COD)',
      ctaActionText: 'Order 2D Barcode Scanner via WhatsApp',
      productSku: 'EVX-SCN-2DW',
    },
    {
      id: 'slide-touch-pos',
      tagline: 'ALL-IN-ONE BILLING COUNTERS',
      badge: 'Capacitive Touchscreen POS Workstations',
      badgeUrdu: '15.6 انچ آل ان ون ٹچ بلنگ کاؤنٹر',
      title: 'Touchscreen POS Billing Workstations',
      titleUrdu: '15.6 انچ ٹچ اسکرین بلنگ سسٹم مع آئی 5 پروسیسر اور ہیوی کیش دراز',
      description: 'Bezel-free 15.6" capacitive multi-touch terminal powered by Intel Core i5 with 8GB RAM, 128GB fast SSD, and heavy-gauge 5-bill steel cash drawer.',
      descriptionUrdu: 'پریمیئم انٹیل کور آئی 5 آل ان ون ٹچ مشین، سالڈ ایلومینیم بیس اور 5 بل کیش ڈرائر۔',
      priceTag: 'Rs. 68,000',
      productImg: '/images/shop/pos_terminal_screen.webp',
      accentColor: 'from-blue-500 to-indigo-400',
      glowColor: 'rgba(59, 130, 246, 0.25)',
      specs: [
        '15.6" True-Flat 10-Point Touch',
        'Intel Core i5 + 8GB High-Speed RAM',
        'Anti-Vibration Aluminum Base',
        '5-Bill / 8-Coin Steel Cash Drawer'
      ],
      ctaText: 'Order Touch Terminal (COD)',
      ctaActionText: 'Order Touch POS Workstation via WhatsApp',
      productSku: 'EVX-POS-T15',
    },
    {
      id: 'slide-export-barcode',
      tagline: 'EXPORT FACTORY & LOGISTICS',
      badge: '4x6" Industrial Shipping Barcode Printers',
      badgeUrdu: '4x6 انچ ایکسپورٹ لاجسٹکس بارکوڈ پرنٹر',
      title: 'Industrial 4x6" Export Barcode & Shipping Printers',
      titleUrdu: 'سیالکوٹ سرجیکل اور لیدر انڈسٹری کے لیے 4x6 ایکسپریس لیبل پرنٹرز',
      description: 'Zero-ink direct thermal 4x6" shipping label printer for DHL, FedEx, UPS, and WeBOC export containers. 203 DPI crisp resolution for barcode compliance.',
      descriptionUrdu: 'زیرو انک ڈائریکٹ تھرمل 4x6 شپنگ لیبل پرنٹر برائے ڈی ایچ ایل، فیڈیکس اور کسٹم کنسائنمنٹس۔',
      priceTag: 'Rs. 24,500',
      productImg: '/images/shop/printer_barcode_label.webp',
      accentColor: 'from-amber-400 to-orange-400',
      glowColor: 'rgba(245, 158, 11, 0.25)',
      specs: [
        '152 mm/s High Speed 4x6" Printing',
        'Zero Ink / Zero Ribbon Cartridges',
        'DHL, FedEx & UPS Waybill Ready',
        'Heavy-Duty Commercial Thermal Head'
      ],
      ctaText: 'Order 4x6 Printer (COD)',
      ctaActionText: 'Order 4x6 Export Printer via WhatsApp',
      productSku: 'EVX-LBL-4X6',
    },
  ];

  const currentSlide = slides[currentSlideIndex];

  // Auto-slide Timer & Progress Loop
  useEffect(() => {
    if (!isPlaying) return;

    const intervalTime = 50; // update progress every 50ms
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

  const handleWhatsAppOrder = (slide: BannerSlide) => {
    const cleanNumber = whatsappNumber.replace(/[^0-9]/g, '');
    const message = [
      `Assalam-o-Alaikum Evonix Sialkot POS Depot,`,
      `I want to order from your *POS Hardware & Thermal Shop* banner:`,
      ``,
      `*Item:* ${slide.title}`,
      `*SKU:* ${slide.productSku}`,
      `*Price:* ${slide.priceTag}`,
      `*Location:* Sialkot Division (Same-Day COD)`,
      ``,
      `Please confirm stock and dispatch rider arrival time.`,
    ].join('\n');

    window.open(`https://wa.me/${cleanNumber}?text=${encodeURIComponent(message)}`, '_blank', 'noopener,noreferrer');
  };

  // High-Tech Cyber Canvas Particle & Laser Scanline Simulation Background
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || 1200);
    let height = (canvas.height = canvas.parentElement?.clientHeight || 600);

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };
    window.addEventListener('resize', handleResize);

    // Particle nodes
    const particleCount = 45;
    const particles: { x: number; y: number; vx: number; vy: number; radius: number; alpha: number }[] = [];
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.7,
        vy: (Math.random() - 0.5) * 0.7,
        radius: Math.random() * 2 + 1,
        alpha: Math.random() * 0.5 + 0.2,
      });
    }

    let scanlineY = 0;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // 1. Subtle Cyber Digital Grid
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.03)';
      ctx.lineWidth = 1;
      const gridSize = 40;
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

      // 2. High-Tech Laser Scanline Sweep
      scanlineY = (scanlineY + 1.2) % height;
      const grad = ctx.createLinearGradient(0, scanlineY - 25, 0, scanlineY + 25);
      grad.addColorStop(0, 'rgba(16, 185, 129, 0)');
      grad.addColorStop(0.5, currentSlide.glowColor || 'rgba(16, 185, 129, 0.18)');
      grad.addColorStop(1, 'rgba(16, 185, 129, 0)');
      ctx.fillStyle = grad;
      ctx.fillRect(0, scanlineY - 25, width, 50);

      // 3. Floating Light Particles
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        ctx.fillStyle = `rgba(255, 255, 255, ${p.alpha * 0.6})`;
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
    <section 
      className="relative overflow-hidden rounded-3xl bg-slate-950 border border-slate-800 shadow-2xl my-6"
      onMouseEnter={() => setIsPlaying(false)}
      onMouseLeave={() => setIsPlaying(true)}
    >
      {/* Dynamic Animated Video Simulation Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none z-0"
      />

      {/* Video Loop Background Ambient Layer with Glassmorphism */}
      <div className="absolute inset-0 bg-gradient-to-r from-slate-950/95 via-slate-950/85 to-slate-950/90 z-1 pointer-events-none" />

      {/* Slide Top Progress Bars */}
      <div className="relative z-10 grid grid-cols-4 gap-1.5 p-3 sm:px-6 pt-4 border-b border-slate-800/80 bg-slate-950/40 backdrop-blur-xs">
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
                    ? 'bg-gradient-to-r from-emerald-500 to-teal-400'
                    : idx < currentSlideIndex
                    ? 'bg-emerald-800/60'
                    : 'bg-transparent'
                }`}
                style={{
                  width: currentSlideIndex === idx ? `${progress}%` : idx < currentSlideIndex ? '100%' : '0%',
                }}
              />
            </div>
            <div className="flex items-center justify-between text-[10px] font-mono">
              <span className={`truncate font-semibold ${currentSlideIndex === idx ? 'text-emerald-400' : 'text-slate-500 group-hover/pill:text-slate-300'}`}>
                0{idx + 1}. {s.badge.split(' ')[0]} {s.badge.split(' ')[1] || ''}
              </span>
              <span className="hidden sm:inline text-slate-600 text-[9px]">{s.priceTag}</span>
            </div>
          </button>
        ))}
      </div>

      {/* MAIN BANNER SLIDE CONTENT */}
      <div className="relative z-10 p-5 sm:p-8 lg:p-12 min-h-[460px] flex items-center">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center w-full">
          
          {/* LEFT: Text Content, Badges, Heading, Specs & CTAs (lg:col-span-7) */}
          <div className="lg:col-span-7 space-y-5 text-left">
            
            {/* Top Pill Badges with Dual English & Urdu Branding */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-950/90 border border-emerald-500/50 text-emerald-300 text-xs font-black uppercase tracking-wider shadow-sm">
                <Sparkles className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
                <span>{currentSlide.badge}</span>
              </span>

              {/* Urdu Badge */}
              <span className="inline-flex items-center px-3 py-1 rounded-full bg-slate-900 border border-slate-700 text-slate-300 text-xs font-bold font-sans">
                {currentSlide.badgeUrdu}
              </span>

              <span className="hidden sm:inline-flex items-center gap-1 text-[11px] font-bold text-emerald-400 bg-emerald-950/40 px-2.5 py-0.5 rounded-md border border-emerald-500/20">
                <Truck className="w-3 h-3" />
                <span>Same-Day Sialkot COD</span>
              </span>
            </div>

            {/* Main Headline */}
            <div>
              <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
                {currentSlide.title}
              </h2>

              {/* Prominent Urdu Subtitle as requested by user */}
              <p className="mt-1 text-sm sm:text-base font-bold text-emerald-400 tracking-wide font-sans">
                {currentSlide.titleUrdu}
              </p>
            </div>

            {/* Description */}
            <div className="space-y-1">
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-xl">
                {currentSlide.description}
              </p>
              <p className="text-[11px] sm:text-xs text-slate-400 leading-normal max-w-xl font-sans">
                {currentSlide.descriptionUrdu}
              </p>
            </div>

            {/* 4 Quick Spec Badges */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1 max-w-xl">
              {currentSlide.specs.map((spec, sIdx) => (
                <div key={sIdx} className="p-2 rounded-lg bg-slate-900/90 border border-slate-800 text-[11px] text-slate-300 flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span className="truncate font-medium">{spec}</span>
                </div>
              ))}
            </div>

            {/* Pricing & Call-to-Action Buttons */}
            <div className="pt-2 flex flex-wrap items-center gap-3">
              <div className="px-4 py-2 rounded-xl bg-slate-900 border border-emerald-500/40 text-left">
                <span className="text-[10px] text-slate-400 block uppercase font-bold">Depot Direct Rate</span>
                <span className="text-xl sm:text-2xl font-black text-emerald-400">{currentSlide.priceTag}</span>
              </div>

              <button
                type="button"
                onClick={() => handleWhatsAppOrder(currentSlide)}
                className="px-6 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm uppercase tracking-wider transition-all shadow-lg shadow-emerald-950/40 flex items-center gap-2 cursor-pointer group"
              >
                <MessageCircle className="w-4 h-4 fill-current text-white group-hover:scale-110 transition-transform" />
                <span>{currentSlide.ctaText}</span>
              </button>

              <a
                href={`tel:${contactPhone}`}
                className="px-4 py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 font-bold text-xs sm:text-sm transition-colors flex items-center gap-1.5"
              >
                <Phone className="w-3.5 h-3.5 text-emerald-400" />
                <span>{contactPhone}</span>
              </a>

              {onOpenReceiptDemo && currentSlideIndex === 1 && (
                <button
                  type="button"
                  onClick={onOpenReceiptDemo}
                  className="px-4 py-3 rounded-xl bg-emerald-950/80 hover:bg-emerald-900 border border-emerald-500/40 text-emerald-300 text-xs font-bold transition-colors cursor-pointer"
                >
                  View Sample Medical Receipt
                </button>
              )}
            </div>

          </div>

          {/* RIGHT: Floating 3D Hardware Visual Showcase (lg:col-span-5) */}
          <div className="lg:col-span-5 relative flex items-center justify-center">
            
            {/* Glowing Ambient Radial Backdrop */}
            <div className="absolute w-72 h-72 rounded-full bg-emerald-500/15 blur-3xl pointer-events-none" />

            {/* Hardware Card Showcase */}
            <div className="relative w-full max-w-sm rounded-3xl bg-gradient-to-b from-slate-900/90 to-slate-950/90 border border-slate-700/80 p-5 shadow-2xl backdrop-blur-md space-y-4 group">
              
              {/* Product Photo with Scanline Overlay */}
              <div className="relative aspect-4/3 rounded-2xl overflow-hidden bg-slate-950 border border-slate-800 flex items-center justify-center">
                <img
                  src={currentSlide.productImg}
                  alt={currentSlide.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).src = '/images/shop/shop_thermal_printer.webp';
                  }}
                />

                {/* Live Inspection Badge */}
                <div className="absolute top-2.5 left-2.5 px-2.5 py-1 rounded-md bg-slate-950/90 border border-slate-700 text-[10px] font-bold text-white flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
                  <span>Tested in Hand</span>
                </div>

                <div className="absolute top-2.5 right-2.5 px-2 py-0.5 rounded bg-emerald-950/90 border border-emerald-500/40 text-[10px] font-bold text-emerald-300">
                  Sialkot Depot
                </div>

                <div className="absolute bottom-2.5 right-2.5 px-2.5 py-1 rounded-md bg-slate-950/90 border border-slate-700 text-[11px] font-black text-emerald-400">
                  {currentSlide.priceTag}
                </div>
              </div>

              {/* Physical Depot Verification */}
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800/90 flex items-center justify-between text-xs text-slate-300">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span className="font-semibold text-[11px]">1-Year Local Replacement</span>
                </div>
                <span className="text-[10px] text-slate-400 font-mono">Kotli Behram</span>
              </div>

              {/* Direct Fast Button */}
              <button
                type="button"
                onClick={() => handleWhatsAppOrder(currentSlide)}
                className="w-full py-2.5 px-3 rounded-xl bg-emerald-600/90 hover:bg-emerald-500 text-white font-bold text-xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Instant WhatsApp Dispatch</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

            </div>

          </div>

        </div>
      </div>

      {/* SLIDER FOOTER CONTROLS */}
      <div className="relative z-10 p-3 sm:px-6 bg-slate-950/70 border-t border-slate-800 flex items-center justify-between">
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
            {isPlaying ? <Pause className="w-3.5 h-3.5 text-emerald-400" /> : <Play className="w-3.5 h-3.5 text-emerald-400" />}
            <span className="hidden sm:inline font-mono text-[10px]">{isPlaying ? 'Auto-play ON' : 'Paused'}</span>
          </button>
        </div>

        {/* Slide Counter Indicator */}
        <div className="flex items-center gap-2">
          <span className="text-xs font-mono font-bold text-emerald-400">
            0{currentSlideIndex + 1} / 0{slides.length}
          </span>
          <span className="hidden md:inline text-xs text-slate-400">
            • 2–4 Hour Same-Day Doorstep Dispatch across Sialkot Division
          </span>
        </div>
      </div>

    </section>
  );
};
