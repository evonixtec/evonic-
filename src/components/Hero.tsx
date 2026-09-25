import React, { useState } from 'react';
import { COMPANY_INFO } from '../data/content';
import { SectionId } from '../types';
import {
  Sparkles,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Globe,
  PhoneCall,
  Search,
  MessageSquare,
  Laptop,
  Code2,
  ShoppingBag,
  Wrench,
  Cpu,
  Layers,
  Star,
  Award
} from 'lucide-react';

interface HeroProps {
  onOpenQuote: (servicePrefill?: string) => void;
  onNavigate: (section: SectionId) => void;
  onOpenSearch?: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  onOpenQuote,
  onNavigate,
  onOpenSearch,
}) => {
  const [activeTab, setActiveTab] = useState<'web' | 'software' | 'hardware'>('web');

  const pillars = {
    web: {
      title: 'Web & Digital Graphics',
      badge: 'High-Performance & Modern UI/UX',
      desc: 'Next-generation web applications, bespoke e-commerce platforms, corporate branding, and lightning-fast SEO architectures engineered to international Dubai standards.',
      features: [
        'Next.js & React High-Speed Engineering',
        'Custom E-Commerce & Multi-Currency Gateways',
        'Corporate Identity, Graphics & UI/UX Design',
        'Search Engine Optimization (SEO) & 99+ Core Vitals',
      ],
      ctaService: 'Website Development',
      buttonText: 'Order Web Development',
      color: 'border-red-200 bg-red-50/40 text-red-600',
    },
    software: {
      title: 'Software & POS Development',
      badge: 'Enterprise & Retail Automation',
      desc: 'Robust custom Point of Sale (POS) systems, inventory management, ERP solutions, and FBR-compliant digital invoicing engineered for retail, wholesale, and export manufacturers.',
      features: [
        'Retail & Wholesale POS with Barcode Automation',
        'FBR Digital Invoicing & Fiscal Tax Compliance',
        'Multi-Warehouse & Multi-Branch Cloud Sync',
        'Offline-First Reliability with Instant Backup',
      ],
      ctaService: 'Software Development & POS Systems',
      buttonText: 'Get POS System Demo',
      color: 'border-blue-200 bg-blue-50/40 text-blue-600',
    },
    hardware: {
      title: 'Laptop, Printer & Hardware Repair',
      badge: 'Certified Chip-Level Diagnostics',
      desc: 'Sialkot’s premier chip-level diagnostic and repairing lab for gaming laptops, Apple MacBooks, office workstations, thermal receipt printers, and laser printers with genuine parts.',
      features: [
        'BGA Motherboard Chip-Level Micro-Soldering',
        'Laser & Thermal Receipt Printer Maintenance',
        'MacBook & Laptop Screen, Battery & Keyboard Swaps',
        'Doorstep On-Site Business IT Support in Sialkot',
      ],
      ctaService: 'Computer, Laptop & Printer Repairing',
      buttonText: 'Book Hardware Repair',
      color: 'border-emerald-200 bg-emerald-50/40 text-emerald-600',
    },
  };

  return (
    <section id="home" className="relative pt-32 pb-20 md:pt-36 md:pb-28 overflow-hidden bg-gradient-to-b from-white via-slate-50 to-white border-b border-slate-200">
      {/* Soft geometric background grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#f1f5f9_1px,transparent_1px),linear-gradient(to_bottom,#f1f5f9_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />

      {/* Decorative ambient accent */}
      <div className="absolute top-12 left-1/2 -translate-x-1/2 w-96 h-96 bg-red-100/40 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Heritage Badge & Official Nano Tagline */}
        <div className="flex flex-col items-center text-center mb-8">
          <div className="inline-flex flex-wrap items-center justify-center gap-2 sm:gap-2.5 px-4 py-1.5 rounded-full bg-white border border-slate-200 shadow-xs text-xs sm:text-sm font-semibold text-slate-800 transition-all hover:border-red-300">
            <span className="flex items-center gap-1.5 text-emerald-600 font-bold">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping inline-block" />
              20+ Years Dubai Heritage
            </span>
            <span className="text-slate-300">•</span>
            <span className="text-red-600 font-extrabold uppercase tracking-wider text-[11px] bg-red-50 px-2.5 py-0.5 rounded-full border border-red-100">
              Dubai Precision Engineering • Sialkot Tech Hub
            </span>
            <span className="text-slate-300 hidden md:inline">•</span>
            <span className="hidden md:inline-flex items-center gap-1 text-slate-700 font-semibold">
              <Award className="w-3.5 h-3.5 text-red-600" />
              ISO & Dubai Standards
            </span>
          </div>

          {/* Master Headline */}
          <h1 className="mt-5 text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 max-w-4xl leading-[1.12]">
            Transforming Ideas into{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 via-rose-600 to-red-700">
              High-Performance
            </span>{' '}
            Digital & Hardware Solutions
          </h1>

          {/* Subheading */}
          <p className="mt-5 text-base sm:text-xl text-slate-600 max-w-3xl leading-relaxed font-normal">
            Specializing in modern custom <strong>Web Development</strong>, enterprise <strong>Software & POS Systems</strong>, and certified <strong>Laptop & Printer Repairing</strong> in Sialkot with two decades of Dubai multinational experience.
          </p>

          {/* Primary Action Buttons */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
            <button
              onClick={() => onOpenQuote()}
              className="px-6 py-3.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-sm sm:text-base shadow-sm hover:shadow-md transition-all flex items-center gap-2 cursor-pointer"
            >
              <Sparkles className="w-4 h-4" />
              <span>Request Free Consultation</span>
              <ArrowRight className="w-4 h-4 ml-1" />
            </button>

            <a
              href={`https://wa.me/${COMPANY_INFO.contact.whatsapp}?text=${encodeURIComponent('Hello EVONIX, I would like to discuss my project requirement.')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-3.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 font-semibold text-sm sm:text-base border border-emerald-200 transition-all flex items-center gap-2"
            >
              <MessageSquare className="w-4 h-4 text-emerald-600" />
              <span>WhatsApp Direct</span>
            </a>

            <button
              onClick={() => onNavigate('blogs')}
              className="px-5 py-3.5 rounded-xl bg-white hover:bg-slate-100 text-slate-800 font-semibold text-sm sm:text-base border border-slate-200 shadow-2xs transition-all flex items-center gap-2 cursor-pointer"
            >
              <Layers className="w-4 h-4 text-slate-500" />
              <span>Explore 80+ Tech Guides</span>
            </button>
          </div>
        </div>

        {/* 3 Core Pillars - Interactive Bento Preview Tabs */}
        <div className="mt-12 bg-white border border-slate-200 rounded-2xl shadow-sm p-4 sm:p-6 lg:p-8">
          {/* Tab selector */}
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 pb-6 border-b border-slate-100">
            <button
              onClick={() => setActiveTab('web')}
              className={`px-4 sm:px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 cursor-pointer ${
                activeTab === 'web'
                  ? 'bg-red-600 text-white shadow-sm'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              <Code2 className="w-4 h-4" />
              <span>1. Web & Graphics</span>
            </button>

            <button
              onClick={() => setActiveTab('software')}
              className={`px-4 sm:px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 cursor-pointer ${
                activeTab === 'software'
                  ? 'bg-red-600 text-white shadow-sm'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              <Cpu className="w-4 h-4" />
              <span>2. Software & POS</span>
            </button>

            <button
              onClick={() => setActiveTab('hardware')}
              className={`px-4 sm:px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 cursor-pointer ${
                activeTab === 'hardware'
                  ? 'bg-red-600 text-white shadow-sm'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              <Wrench className="w-4 h-4" />
              <span>3. Hardware & Repairing</span>
            </button>
          </div>

          {/* Active Pillar Card Detail */}
          <div className="mt-6 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md text-xs font-bold uppercase tracking-wider bg-slate-100 text-slate-700">
                {pillars[activeTab].badge}
              </div>

              <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                {pillars[activeTab].title}
              </h3>

              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                {pillars[activeTab].desc}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2">
                {pillars[activeTab].features.map((feat, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-slate-700 font-medium">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>

              <div className="pt-4 flex flex-wrap items-center gap-3">
                <button
                  onClick={() => onOpenQuote(pillars[activeTab].ctaService)}
                  className="px-5 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs sm:text-sm shadow-xs transition-colors flex items-center gap-2 cursor-pointer"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>{pillars[activeTab].buttonText}</span>
                </button>

                <button
                  onClick={() => onNavigate('services')}
                  className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold text-xs sm:text-sm transition-colors cursor-pointer"
                >
                  View Full Service Breakdown
                </button>
              </div>
            </div>

            {/* Visual preview box */}
            <div className="lg:col-span-5 bg-gradient-to-br from-slate-50 to-slate-100 border border-slate-200 rounded-xl p-6 space-y-4">
              <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Quality Assurance</span>
                <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                  <ShieldCheck className="w-3.5 h-3.5" /> Certified
                </span>
              </div>

              <div className="space-y-3">
                <div className="p-3 bg-white rounded-lg border border-slate-200 flex items-center gap-3 shadow-2xs">
                  <div className="w-8 h-8 rounded-lg bg-red-50 text-red-600 flex items-center justify-center font-bold text-sm">
                    01
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-900">Direct Dubai Engineering</h4>
                    <p className="text-[11px] text-slate-500">20+ years of corporate UAE standards implemented locally</p>
                  </div>
                </div>

                <div className="p-3 bg-white rounded-lg border border-slate-200 flex items-center gap-3 shadow-2xs">
                  <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold text-sm">
                    02
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-900">Transparent Pricing</h4>
                    <p className="text-[11px] text-slate-500">Fixed milestones, written invoices, no hidden surcharges</p>
                  </div>
                </div>

                <div className="p-3 bg-white rounded-lg border border-slate-200 flex items-center gap-3 shadow-2xs">
                  <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-sm">
                    03
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-900">Sialkot On-Site & Remote</h4>
                    <p className="text-[11px] text-slate-500">Physical technicians & 24/7 remote monitoring</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Four Key Metrics Strip */}
        <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white border border-slate-200 rounded-xl p-4 text-center shadow-2xs">
            <div className="text-2xl sm:text-3xl font-black text-red-600">20+</div>
            <div className="text-xs sm:text-sm font-bold text-slate-900 mt-0.5">Years Experience</div>
            <div className="text-[11px] text-slate-500">Dubai & International</div>
          </div>

          <div className="bg-white border border-slate-200 rounded-xl p-4 text-center shadow-2xs">
            <div className="text-2xl sm:text-3xl font-black text-slate-900">500+</div>
            <div className="text-xs sm:text-sm font-bold text-slate-900 mt-0.5">Projects Delivered</div>
            <div className="text-[11px] text-slate-500">Websites, POS & IT Systems</div>
          </div>

          <div className="bg-white border border-slate-200 rounded-xl p-4 text-center shadow-2xs">
            <div className="text-2xl sm:text-3xl font-black text-emerald-600">100%</div>
            <div className="text-xs sm:text-sm font-bold text-slate-900 mt-0.5">Genuine Parts</div>
            <div className="text-[11px] text-slate-500">Original Laptop & Printer Spares</div>
          </div>

          <div className="bg-white border border-slate-200 rounded-xl p-4 text-center shadow-2xs">
            <div className="text-2xl sm:text-3xl font-black text-blue-600">24/7</div>
            <div className="text-xs sm:text-sm font-bold text-slate-900 mt-0.5">Priority Support</div>
            <div className="text-[11px] text-slate-500">WhatsApp & Sialkot Doorstep</div>
          </div>
        </div>
      </div>
    </section>
  );
};
