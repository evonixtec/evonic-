import React, { useState } from 'react';
import { VERIFIED_SERVICE_GALLERY, ServiceGalleryItem, COMPANY_INFO } from '../data/content';
import {
  Wrench,
  Sparkles,
  CheckCircle,
  ShieldCheck,
  MapPin,
  Phone,
  MessageSquare,
  ZoomIn,
  X,
  ExternalLink,
  Award,
  Layers,
  Clock,
  Printer
} from 'lucide-react';

interface GoogleBusinessProfileGalleryProps {
  onOpenQuote: (servicePrefill?: string) => void;
  className?: string;
  showHeader?: boolean;
}

export const GoogleBusinessProfileGallery: React.FC<GoogleBusinessProfileGalleryProps> = ({
  onOpenQuote,
  className = '',
  showHeader = true,
}) => {
  const [selectedItem, setSelectedItem] = useState<ServiceGalleryItem | null>(null);
  const [activeFilter, setActiveFilter] = useState<'all' | 'printers' | 'electronics' | 'field'>('all');

  const filteredItems = VERIFIED_SERVICE_GALLERY.filter((item) => {
    if (activeFilter === 'printers') {
      return item.id === 'hp-paper-jam' || item.id === 'canon-ink-leakage';
    }
    if (activeFilter === 'electronics') {
      return item.id === 'laptop-motherboard-repair';
    }
    if (activeFilter === 'field') {
      return item.id === 'pos-thermal-printer-setup' || item.id === 'onsite-it-support';
    }
    return true;
  });

  return (
    <section id="google-business-gallery" className={`py-16 bg-white border-b border-slate-200 ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {showHeader && (
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
            <div className="space-y-3 max-w-3xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-bold uppercase tracking-wider">
                <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
                <span>Google Business Profile Verified Workshop Gallery</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                Authentic Technician Repair & Field Operations
              </h2>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                Documented photographic proof of certified evonix hardware engineers working hands-on at our Sialkot diagnostic lab (Kolti Behram / Paris Road) and on-site corporate client premises.
              </p>
            </div>

            {/* Google Profile Badge & Verification */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 bg-slate-50 border border-slate-200 p-3.5 rounded-2xl">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
                <span className="text-xs font-bold text-slate-900">Verified Workshop</span>
              </div>
              <span className="hidden sm:inline text-slate-300">|</span>
              <div className="flex items-center gap-1 text-xs text-slate-600">
                <MapPin className="w-3.5 h-3.5 text-red-600" />
                <span>Kolti Behram & Paris Rd, Sialkot</span>
              </div>
            </div>
          </div>
        )}

        {/* Filter Navigation Tabs */}
        <div className="flex flex-wrap items-center gap-2 mb-8 pb-3 border-b border-slate-100">
          <button
            onClick={() => setActiveFilter('all')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeFilter === 'all'
                ? 'bg-slate-900 text-white shadow-xs'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            All 5 Verified Services ({VERIFIED_SERVICE_GALLERY.length})
          </button>
          <button
            onClick={() => setActiveFilter('printers')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
              activeFilter === 'printers'
                ? 'bg-red-600 text-white shadow-xs'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            <Printer className="w-3.5 h-3.5" />
            <span>HP & Canon Printers (2)</span>
          </button>
          <button
            onClick={() => setActiveFilter('electronics')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
              activeFilter === 'electronics'
                ? 'bg-red-600 text-white shadow-xs'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Laptop Motherboard Lab (1)</span>
          </button>
          <button
            onClick={() => setActiveFilter('field')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
              activeFilter === 'field'
                ? 'bg-red-600 text-white shadow-xs'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            <Wrench className="w-3.5 h-3.5" />
            <span>POS & On-Site Support (2)</span>
          </button>
        </div>

        {/* 5 Prominent Service Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-xl hover:border-red-400 transition-all flex flex-col justify-between group"
            >
              <div>
                {/* Photo Container with WebP + JPG Fallback & Exact Alt tag */}
                <div className="relative aspect-[4/3] bg-slate-900 overflow-hidden cursor-pointer" onClick={() => setSelectedItem(item)}>
                  <picture>
                    <source srcSet={item.imageWebp} type="image/webp" />
                    <img
                      src={item.imageJpg}
                      alt={item.alt}
                      loading="lazy"
                      decoding="async"
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </picture>

                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-black/20 pointer-events-none" />

                  {/* Top Badge */}
                  <div className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded-md bg-white/90 backdrop-blur-xs text-[10px] font-black text-red-600 border border-white/60 shadow-2xs">
                    {item.badge}
                  </div>

                  {/* Zoom Indicator */}
                  <div className="absolute top-2.5 right-2.5 p-1.5 rounded-full bg-slate-950/70 text-white opacity-0 group-hover:opacity-100 transition-opacity">
                    <ZoomIn className="w-3.5 h-3.5" />
                  </div>

                  {/* Bottom Image Tag Pill */}
                  <div className="absolute bottom-2.5 left-2.5 right-2.5 flex items-center justify-between text-[11px] text-white pointer-events-none">
                    <span className="font-mono text-[10px] text-emerald-300 bg-slate-950/80 px-2 py-0.5 rounded backdrop-blur-xs">
                      100% Genuine Human Tech
                    </span>
                  </div>
                </div>

                {/* Content Details Beneath Image */}
                <div className="p-4 sm:p-5 space-y-3">
                  {/* Category Label */}
                  <span className="text-[10px] font-bold uppercase tracking-wider text-red-600 block">
                    {item.category}
                  </span>

                  {/* Exact Title As Requested */}
                  <h3 className="text-base sm:text-lg font-extrabold text-slate-900 group-hover:text-red-600 transition-colors leading-snug">
                    {item.title}
                  </h3>

                  {/* Short Practical Description */}
                  <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">
                    {item.description}
                  </p>

                  {/* Technician attribution */}
                  <div className="pt-2 border-t border-slate-100 flex items-center gap-1.5 text-[11px] text-slate-500">
                    <Wrench className="w-3 h-3 text-red-500 flex-shrink-0" />
                    <span className="truncate">{item.technician}</span>
                  </div>

                  {/* Keywords Pills */}
                  <div className="flex flex-wrap gap-1 pt-1">
                    {item.tags.slice(0, 2).map((tag, idx) => (
                      <span
                        key={idx}
                        className="text-[10px] px-2 py-0.5 bg-slate-100 text-slate-600 rounded-md font-medium"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Bottom Quick Action CTAs */}
              <div className="p-4 pt-0 border-t border-slate-100 mt-2 flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => onOpenQuote(item.servicePrefill)}
                  className="flex-1 py-2 px-3 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs transition-colors text-center cursor-pointer shadow-2xs"
                >
                  Book Service
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedItem(item)}
                  aria-label={`View details for ${item.title}`}
                  className="py-2 px-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold transition-colors cursor-pointer"
                >
                  <ZoomIn className="w-3.5 h-3.5 text-slate-600" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Local SEO and Google Maps Citation Strip */}
        <div className="mt-10 p-5 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-red-100 text-red-700 flex items-center justify-center flex-shrink-0">
              <Award className="w-5 h-5 text-red-600" />
            </div>
            <div>
              <h4 className="text-xs sm:text-sm font-bold text-slate-900">
                Official Google Business Profile Photo Asset Sync
              </h4>
              <p className="text-[11px] sm:text-xs text-slate-500">
                All 5 service photographs are verified with EXIF metadata matching our Sialkot service area: Paris Road, Cantt, Daska & Sambrial.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <a
              href={`https://wa.me/${COMPANY_INFO.contact.whatsapp}?text=${encodeURIComponent('Hello evonix technologies, I saw your Google Business Profile repair gallery and need assistance.')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-colors shadow-2xs"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>WhatsApp Lab Desk</span>
            </a>
          </div>
        </div>
      </div>

      {/* Lightbox / Zoom Modal */}
      {selectedItem && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200"
          onClick={() => setSelectedItem(null)}
        >
          <div
            className="bg-white rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl border border-slate-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="p-4 sm:p-5 border-b border-slate-200 flex items-center justify-between bg-slate-50">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-1 rounded-md bg-red-100 text-red-700 font-bold text-xs uppercase">
                  {selectedItem.category}
                </span>
                <span className="text-xs text-slate-500">Sialkot Workshop Verified</span>
              </div>
              <button
                type="button"
                onClick={() => setSelectedItem(null)}
                aria-label="Close dialog"
                className="w-8 h-8 rounded-full bg-slate-200 hover:bg-slate-300 flex items-center justify-center text-slate-700 transition cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Image */}
            <div className="relative aspect-[16/10] bg-slate-950">
              <picture>
                <source srcSet={selectedItem.imageWebp} type="image/webp" />
                <img
                  src={selectedItem.imageJpg}
                  alt={selectedItem.alt}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </picture>
              <div className="absolute bottom-3 left-3 bg-slate-950/80 px-3 py-1 rounded-md text-xs text-emerald-400 font-mono backdrop-blur-xs">
                Alt: {selectedItem.alt}
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-4">
              <div>
                <h3 className="text-xl font-black text-slate-900">{selectedItem.title}</h3>
                <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
                  {selectedItem.description}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3 p-3.5 bg-slate-50 rounded-xl text-xs">
                <div>
                  <span className="text-slate-400 block text-[11px]">Assigned Engineer</span>
                  <span className="font-bold text-slate-800">{selectedItem.technician}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[11px]">Turnaround Time</span>
                  <span className="font-bold text-emerald-600">Same-Day / 3-4 Hours</span>
                </div>
              </div>

              {/* Actions */}
              <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
                <button
                  type="button"
                  onClick={() => {
                    onOpenQuote(selectedItem.servicePrefill);
                    setSelectedItem(null);
                  }}
                  className="w-full sm:w-auto flex-1 py-3 px-6 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-sm shadow-md transition-colors cursor-pointer text-center"
                >
                  Book {selectedItem.title}
                </button>
                <a
                  href={`https://wa.me/${COMPANY_INFO.contact.whatsapp}?text=${encodeURIComponent(`Hello evonix, I want to book: ${selectedItem.title}`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto px-5 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm transition-colors text-center flex items-center justify-center gap-2"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>WhatsApp Inquiry</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
