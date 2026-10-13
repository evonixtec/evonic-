import React, { useState, useEffect, useRef } from 'react';
import {
  Globe,
  ShoppingCart,
  Cpu,
  Network,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  MessageSquare,
  ShieldCheck,
  Zap,
  MapPin,
  Clock
} from 'lucide-react';
import { COMPANY_INFO } from '../data/content';

export interface CoreServiceSlide {
  id: string;
  number: string;
  title: string;
  urduSubtitle: string;
  tagline: string;
  badge: string;
  badgeColor: 'red' | 'emerald' | 'blue' | 'purple';
  description: string;
  deliverables: string[];
  imageWebp: string;
  imageJpg: string;
  alt: string;
  icon: React.ReactNode;
  coverageAreas: string;
}

const CORE_SERVICES: CoreServiceSlide[] = [
  {
    id: 'web-engineering',
    number: '01',
    title: 'Customer Website & Web Application Engineering',
    urduSubtitle: 'کسٹمر ویب سائٹ اور کسٹم ویب ایپلی کیشن انجینئرنگ',
    tagline: 'High-Performance 3D Web, Export B2B Portals & Next.js Platforms',
    badge: '⚡ Sub-Second Speed & 3D Interactive',
    badgeColor: 'blue',
    description:
      'Custom web applications engineered with Next.js 15, Three.js 3D spatial visualizers, and edge-rendered architectures. Built for Sialkot export manufacturers (Sports, Surgical, Leather) and global brands for maximum search dominance and client conversions.',
    deliverables: [
      'Interactive 3D Three.js & WebGL spatial product showcases',
      'Ultra-fast Next.js edge-rendered export catalogs & B2B inquiry portals',
      'SEO architecture tuned for Google top ranks with Schema.org & EEAT',
      'PWA offline compliance, 100/100 Core Web Vitals, mobile responsive'
    ],
    imageWebp: '/images/service_web_dev_1790044711551.webp',
    imageJpg: '/images/service_web_dev_1790044711551.jpg',
    alt: 'Custom website and web application engineering in Sialkot',
    icon: <Globe className="w-6 h-6 text-blue-500" />,
    coverageAreas: 'Sialkot Exporters, Gulf Markets & Global Clients'
  },
  {
    id: 'pos-billing-inventory',
    number: '02',
    title: 'Retail POS Billing Software & Barcode Inventory',
    urduSubtitle: 'ریٹیل پی او ایس بلنگ سافٹ ویئر اور بارکوڈ انوینٹری سسٹم',
    tagline: 'Offline-First Billing Engine, Thermal Printing & Stock Control',
    badge: '🟢 Offline-First Failsafe Architecture',
    badgeColor: 'emerald',
    description:
      'Engineered specifically for supermarkets, pharmacies, retail stores, and manufacturing warehouses in Sialkot. Continues billing even without internet, auto-syncs to cloud, prints 80mm thermal receipts instantly, and prevents inventory leakage.',
    deliverables: [
      'Offline-first cashier counter checkout (zero slowdowns or freezes)',
      'High-speed 80mm & 58mm thermal receipt printer auto-cutter integration',
      'Omni-directional 1D/2D barcode scanning & SKU live tracking',
      'Multi-branch real-time cloud reporting, cash ledger & profit audits'
    ],
    imageWebp: '/images/service_software_pos_1790044733191.webp',
    imageJpg: '/images/service_software_pos_1790044733191.jpg',
    alt: 'Retail POS billing software and inventory management system in Sialkot',
    icon: <ShoppingCart className="w-6 h-6 text-emerald-500" />,
    coverageAreas: 'Paris Road, Cantt, Daska, Ugoki & Sialkot Markets'
  },
  {
    id: 'chip-level-diagnosis',
    number: '03',
    title: 'Chip-Level Laptop, PC & Printer Motherboard Diagnosis',
    urduSubtitle: 'چپ لیول لیپ ٹاپ، پی سی اور پرنٹر مدر بورڈ لیب ڈائیگنوسس',
    tagline: 'Micro-Soldering, Thermal Imaging & Printhead Restoration',
    badge: '🔥 Advanced Micro-Soldering Lab',
    badgeColor: 'red',
    description:
      'Precision diagnostic bench in Kotli Behram, Sialkot. We troubleshoot motherboard short circuits, blown MOSFETs, failing power rails, laser printer fuser jams, and paper rollers with professional thermal imaging and oscilloscopes.',
    deliverables: [
      'Motherboard short-circuit clearance & BGA power-rail micro-soldering',
      'Thermal receipt printer head restoration & roller gear overhauls',
      'LaserJet fuser sleeve, pickup roller & continuous toner repairs',
      '100% Lossless High-Speed NVMe/SATA SSD upgrades in under 45 minutes'
    ],
    imageWebp: '/images/motherboard_repair_human_1791024094445.webp',
    imageJpg: '/images/motherboard_repair_human_1791024094445.jpg',
    alt: 'Chip level motherboard diagnostic lab for laptops and printers in Sialkot',
    icon: <Cpu className="w-6 h-6 text-red-500" />,
    coverageAreas: 'Kotli Behram Lab, Walk-in Counter & Free Diagnostics'
  },
  {
    id: 'doorstep-it-networking',
    number: '04',
    title: 'Doorstep IT, CCTV Vision & Network Cabling Maintenance',
    urduSubtitle: 'ڈور سٹیپ آئی ٹی، سی سی ٹی وی وژن اور نیٹ ورک کیبلنگ مینٹیننس',
    tagline: 'On-Site Field Engineers, Gigabit Cat6/Fiber & Server Setup',
    badge: '🛡️ Rapid On-Site Factory Visits',
    badgeColor: 'purple',
    description:
      'Factory floor and office IT infrastructure setup across Sialkot industrial zones. Certified field technicians handle structured Cat6 cabling, server racks, managed switches, UniFi Wi-Fi access points, and doorstep hardware repairs.',
    deliverables: [
      'Doorstep emergency IT technician visits across Sialkot within 90 minutes',
      'Structured Cat6/Cat6A gigabit industrial network cabling & patch panels',
      'High-definition IP CCTV camera surveillance & NVR storage setup',
      'Corporate AMC annual maintenance contracts with priority response'
    ],
    imageWebp: '/images/service_onsite_tech_1790044770537.webp',
    imageJpg: '/images/service_onsite_tech_1790044770537.jpg',
    alt: 'Doorstep IT support and industrial network cabling in Sialkot',
    icon: <Network className="w-6 h-6 text-purple-500" />,
    coverageAreas: 'Daska Road, Sambrial, Wazirabad Rd & S.I.E Sialkot'
  }
];

interface SialkotCoreServicesSliderProps {
  onBookService?: (serviceName: string) => void;
  onNavigateServices?: () => void;
}

export const SialkotCoreServicesSlider: React.FC<SialkotCoreServicesSliderProps> = ({
  onBookService,
  onNavigateServices,
}) => {
  const [currentSlide, setCurrentSlide] = useState<number>(0);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);
  const touchStartX = useRef<number | null>(null);

  const SLIDE_DURATION = 5000; // 5 seconds per slide

  // Auto-play interval with smooth progress bar
  useEffect(() => {
    if (isPaused) return;

    const intervalStep = 50;
    const progressIncrement = (intervalStep / SLIDE_DURATION) * 100;

    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          setCurrentSlide((curr) => (curr + 1) % CORE_SERVICES.length);
          return 0;
        }
        return prev + progressIncrement;
      });
    }, intervalStep);

    return () => clearInterval(timer);
  }, [isPaused, currentSlide]);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
    setProgress(0);
  };

  const handleNext = () => {
    setCurrentSlide((curr) => (curr + 1) % CORE_SERVICES.length);
    setProgress(0);
  };

  const handlePrev = () => {
    setCurrentSlide((curr) => (curr - 1 + CORE_SERVICES.length) % CORE_SERVICES.length);
    setProgress(0);
  };

  // Touch Swipe for mobile/tablets
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX.current - touchEndX;

    if (diff > 50) {
      handleNext();
    } else if (diff < -50) {
      handlePrev();
    }
    touchStartX.current = null;
  };

  const current = CORE_SERVICES[currentSlide];

  const generateWhatsAppLink = (service: CoreServiceSlide) => {
    const text = `Hello EVONIX Technologies, I would like to inquire about your Sialkot service:\n*${service.title}*\nCategory: Service ${service.number}\nPlease share details and immediate booking availability.`;
    return `https://wa.me/${COMPANY_INFO.contact.whatsapp}?text=${encodeURIComponent(text)}`;
  };

  return (
    <div
      className="relative bg-slate-900 rounded-3xl border border-slate-800 overflow-hidden shadow-2xl text-white select-none"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Top Slider Progress Bar */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-slate-800 z-30">
        <div
          className="h-full bg-gradient-to-r from-red-500 via-blue-500 to-emerald-400 transition-all ease-linear"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Main Slide Presentation Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[480px] lg:min-h-[500px]">
        
        {/* Left Column: Visual Showcase with Smooth Transition */}
        <div className="lg:col-span-5 relative bg-slate-950 overflow-hidden flex items-center justify-center min-h-[260px] sm:min-h-[320px] lg:min-h-full">
          <picture key={current.id}>
            <source srcSet={current.imageWebp} type="image/webp" />
            <img
              src={current.imageJpg}
              alt={current.alt}
              loading="eager"
              decoding="async"
              className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
            />
          </picture>

          {/* Vignette Overlay for Crisp Contrast */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent lg:bg-gradient-to-r lg:from-transparent lg:to-slate-900" />

          {/* Floating High-Contrast Badge */}
          <div className="absolute top-4 left-4 z-20 flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-slate-900/90 backdrop-blur-md border border-slate-700 text-xs font-mono font-bold text-white flex items-center gap-1.5 shadow-lg">
              <span className="w-2 h-2 rounded-full bg-red-500 animate-ping inline-block" />
              <span>Service {current.number} of 04</span>
            </span>

            <span className="px-3 py-1 rounded-full bg-red-600/90 text-white text-[11px] font-bold tracking-wide shadow-md">
              {current.badge}
            </span>
          </div>

          {/* Bottom Floating Location Pin */}
          <div className="absolute bottom-4 left-4 right-4 z-20 flex items-center justify-between text-xs text-slate-300 bg-slate-900/80 backdrop-blur-md px-3.5 py-2 rounded-xl border border-slate-700/80">
            <div className="flex items-center gap-1.5 font-medium">
              <MapPin className="w-3.5 h-3.5 text-red-400 flex-shrink-0" />
              <span className="truncate">{current.coverageAreas}</span>
            </div>
            <span className="text-[10px] text-emerald-400 font-bold bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-800">
              Verified
            </span>
          </div>
        </div>

        {/* Right Column: In-Depth Service Breakdown & Actions */}
        <div className="lg:col-span-7 p-6 sm:p-8 lg:p-10 flex flex-col justify-between space-y-6 relative z-10 bg-slate-900">
          <div className="space-y-4">
            
            {/* Top Meta Header */}
            <div className="flex items-center justify-between gap-3 flex-wrap">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-xl bg-slate-800 border border-slate-700 text-white shadow-xs">
                  {current.icon}
                </div>
                <div>
                  <span className="text-xs font-mono font-bold uppercase tracking-wider text-red-400 block">
                    EVONIX SIALKOT CORE SERVICE
                  </span>
                  <span className="text-[11px] text-slate-400">
                    Dubai Standards · 20+ Yrs Enterprise Engineering
                  </span>
                </div>
              </div>

              {/* Slider Controls (Prev / Next Buttons) */}
              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={handlePrev}
                  className="p-2 rounded-xl bg-slate-800 hover:bg-red-600 text-slate-300 hover:text-white border border-slate-700 transition-colors cursor-pointer"
                  title="Previous Service Slide"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={handleNext}
                  className="p-2 rounded-xl bg-slate-800 hover:bg-red-600 text-slate-300 hover:text-white border border-slate-700 transition-colors cursor-pointer"
                  title="Next Service Slide"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Service Title & Urdu Translation Header */}
            <div>
              <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight leading-tight">
                {current.title}
              </h3>
              <p className="text-sm font-semibold text-red-400 mt-1" dir="rtl">
                {current.urduSubtitle}
              </p>
              <p className="text-xs sm:text-sm text-slate-400 font-mono mt-1">
                {current.tagline}
              </p>
            </div>

            {/* Description */}
            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
              {current.description}
            </p>

            {/* Key Deliverables Checkpoints */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2 border-t border-slate-800">
              {current.deliverables.map((item, idx) => (
                <div key={idx} className="flex items-start gap-2 text-xs text-slate-200">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                  <span className="leading-snug">{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Action Buttons & Slide Indicators */}
          <div className="pt-4 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
            
            {/* Direct CTA Buttons */}
            <div className="flex flex-wrap items-center gap-2.5 w-full sm:w-auto">
              <button
                type="button"
                onClick={() => onBookService ? onBookService(current.title) : undefined}
                className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold text-xs sm:text-sm transition-all shadow-lg hover:shadow-red-600/30 cursor-pointer"
              >
                <Sparkles className="w-4 h-4" />
                <span>Book / Request Quote</span>
              </button>

              <a
                href={generateWhatsAppLink(current)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm transition-all shadow-md cursor-pointer"
              >
                <MessageSquare className="w-4 h-4" />
                <span>WhatsApp Specialist</span>
              </a>

              {onNavigateServices && (
                <button
                  type="button"
                  onClick={onNavigateServices}
                  className="text-xs text-slate-400 hover:text-white font-medium flex items-center gap-1 transition-colors cursor-pointer px-2 py-2"
                >
                  <span>All Specs</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* 4 Interactive Thumbnail Tabs */}
            <div className="flex items-center gap-2 w-full sm:w-auto justify-center sm:justify-end">
              {CORE_SERVICES.map((s, idx) => (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => goToSlide(idx)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                    currentSlide === idx
                      ? 'bg-red-600 text-white ring-2 ring-red-400 shadow-md scale-105'
                      : 'bg-slate-800 hover:bg-slate-700 text-slate-400'
                  }`}
                  title={s.title}
                >
                  <span>{s.number}</span>
                  <span className="hidden xl:inline text-[11px] font-sans font-normal opacity-90 truncate max-w-[90px]">
                    {s.title.split(' ')[0]}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
