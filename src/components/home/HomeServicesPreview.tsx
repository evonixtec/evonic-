import React, { useState } from 'react';
import { SERVICES, VERIFIED_SERVICE_GALLERY, ServiceGalleryItem, COMPANY_INFO } from '../../data/content';
import { OptimizedImage } from '../common/OptimizedImage';
import {
  ArrowRight,
  Sparkles,
  Wrench,
  CheckCircle2,
  Printer,
  ShieldCheck,
  ZoomIn,
  X,
  Phone,
  MessageSquare,
  Search,
  MapPin
} from 'lucide-react';

interface HomeServicesPreviewProps {
  onNavigateToServices: () => void;
  onOpenQuote: (serviceName?: string) => void;
}

export const HomeServicesPreview: React.FC<HomeServicesPreviewProps> = ({
  onNavigateToServices,
  onOpenQuote,
}) => {
  const [selectedPhoto, setSelectedPhoto] = useState<ServiceGalleryItem | null>(null);

  return (
    <section id="our-services-section" className="py-16 md:py-20 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-100 text-red-700 text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-red-600" />
              <span>Our Services</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
              Our Core Services in Sialkot
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              International 20-year Dubai quality standards applied to web systems, point-of-sale software, and precision hardware servicing.
            </p>
          </div>

          <button
            onClick={onNavigateToServices}
            className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-white hover:bg-slate-100 text-red-600 font-bold text-sm border border-slate-200 shadow-2xs hover:shadow-xs transition-all cursor-pointer group flex-shrink-0"
          >
            <span>View All Services</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* 4 Main Core Service Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {SERVICES.map((service) => (
            <div
              key={service.id}
              className="bg-white rounded-2xl border border-slate-200 p-6 flex flex-col justify-between hover:shadow-lg hover:border-red-300 transition-all group"
            >
              <div className="space-y-4">
                {service.imageUrl && (
                  <div className="rounded-xl overflow-hidden h-36 w-full border border-slate-100 relative bg-slate-100">
                    <OptimizedImage
                      src={service.imageUrl}
                      webpSrc={service.imageWebp}
                      alt={service.imageAlt || service.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-2 left-2 px-2 py-0.5 rounded-md bg-white/90 backdrop-blur-xs text-[10px] font-bold text-red-600 border border-slate-200">
                      Service {service.number}
                    </div>
                  </div>
                )}

                <div>
                  <h3 className="text-base sm:text-lg font-bold text-slate-900 group-hover:text-red-600 transition-colors line-clamp-2">
                    {service.title}
                  </h3>
                  <p className="text-xs text-slate-600 mt-2 line-clamp-3 leading-relaxed">
                    {service.summary}
                  </p>
                </div>

                <div className="space-y-1.5 pt-2 border-t border-slate-100">
                  {service.deliverables.slice(0, 3).map((item, idx) => (
                    <div key={idx} className="flex items-start gap-1.5 text-xs text-slate-700">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0 mt-0.5" />
                      <span className="truncate">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-5 mt-4 border-t border-slate-100 flex items-center justify-between gap-2">
                <button
                  onClick={() => onOpenQuote(service.title)}
                  className="px-3.5 py-1.5 rounded-lg bg-red-600 hover:bg-red-700 text-white font-bold text-xs transition-colors cursor-pointer"
                >
                  Get Quote
                </button>
                <button
                  onClick={onNavigateToServices}
                  className="text-xs font-semibold text-slate-600 hover:text-red-600 flex items-center gap-1 transition-colors cursor-pointer"
                >
                  <span>Details</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* ------------------------------------------------------------- */}
        {/* 5 VERIFIED HANDS-ON WORKSHOP REPAIRS (GOOGLE BUSINESS GALLERY) */}
        {/* ------------------------------------------------------------- */}
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-sm">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4 pb-6 border-b border-slate-100">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-bold uppercase tracking-wider mb-2 border border-blue-200">
                <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
                <span>Google Business Profile Verified Gallery</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                Live Workshop & Hardware Repair Photos
              </h3>
              <p className="text-slate-600 text-xs sm:text-sm mt-1">
                Real photographs of our technicians repairing printers, laptops, POS machines, and network systems in Sialkot.
              </p>
            </div>

            <div className="flex items-center gap-2 text-xs font-bold text-slate-500 bg-slate-50 px-3.5 py-2 rounded-xl border border-slate-200">
              <MapPin className="w-4 h-4 text-red-600" />
              <span>Kotli Behram & Paris Road Lab</span>
            </div>
          </div>

          {/* 5 Image Cards Row with Exact Title Beneath Each Image */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
            {VERIFIED_SERVICE_GALLERY.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-2xs hover:shadow-lg hover:border-red-400 transition-all flex flex-col justify-between group"
              >
                <div>
                  {/* Photo with WebP + JPG Fallback & Exact Alt Tag */}
                  <div
                    className="relative aspect-[4/3] bg-slate-900 overflow-hidden cursor-pointer"
                    onClick={() => setSelectedPhoto(item)}
                  >
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

                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent pointer-events-none" />

                    <div className="absolute top-2 left-2 px-2 py-0.5 rounded-md bg-white/90 backdrop-blur-xs text-[10px] font-bold text-red-600 border border-white/60">
                      {item.badge}
                    </div>

                    <div className="absolute top-2 right-2 p-1.5 rounded-full bg-slate-950/70 text-white opacity-0 group-hover:opacity-100 transition-opacity">
                      <ZoomIn className="w-3 h-3" />
                    </div>

                    <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between text-[10px] text-emerald-300 font-mono">
                      <span>✓ Real Photo</span>
                    </div>
                  </div>

                  {/* Title directly beneath each image */}
                  <div className="p-4 space-y-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-red-600 block">
                      {item.category}
                    </span>

                    <h4 className="text-sm sm:text-base font-extrabold text-slate-900 group-hover:text-red-600 transition-colors leading-snug">
                      {item.title}
                    </h4>

                    <p className="text-xs text-slate-600 leading-relaxed line-clamp-2">
                      {item.description}
                    </p>

                    {/* Google Search Rank Keyword badge */}
                    <div className="pt-2 border-t border-slate-100 flex items-center gap-1.5 text-[11px] text-slate-500 font-mono">
                      <Search className="w-3 h-3 text-blue-500 flex-shrink-0" />
                      <span className="truncate text-[10px]">alt: "{item.alt}"</span>
                    </div>
                  </div>
                </div>

                {/* Card Action Buttons */}
                <div className="p-4 pt-0 border-t border-slate-100 mt-2 flex items-center gap-2">
                  <button
                    onClick={() => onOpenQuote(item.servicePrefill)}
                    className="flex-1 py-1.5 px-3 rounded-lg bg-red-600 hover:bg-red-700 text-white font-bold text-xs transition-colors cursor-pointer text-center"
                  >
                    Book Fix
                  </button>
                  <button
                    onClick={() => setSelectedPhoto(item)}
                    className="p-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-600 text-xs transition-colors cursor-pointer"
                    title="Zoom in on photo"
                  >
                    <ZoomIn className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Quick Help Strip */}
          <div className="mt-8 pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-600">
            <div className="flex items-center gap-2">
              <Printer className="w-4 h-4 text-red-600" />
              <span>Need quick repair for HP LaserJet, Canon, or Thermal printer in Sialkot? Call or WhatsApp us.</span>
            </div>
            <a
              href={`https://wa.me/${COMPANY_INFO.contact.whatsapp}?text=${encodeURIComponent('Hello EVONIX TECHNOLOGIES, I need hardware repair for my printer/laptop.')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs transition-colors"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>WhatsApp Lab Desk</span>
            </a>
          </div>
        </div>

      </div>

      {/* Lightbox Zoom Dialog */}
      {selectedPhoto && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200"
          onClick={() => setSelectedPhoto(null)}
        >
          <div
            className="bg-white rounded-3xl max-w-xl w-full overflow-hidden shadow-2xl border border-slate-200"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-4 border-b border-slate-200 flex items-center justify-between bg-slate-50">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-md bg-red-100 text-red-700 font-bold text-xs uppercase">
                  {selectedPhoto.category}
                </span>
                <span className="text-xs text-slate-500">Google Verified</span>
              </div>
              <button
                onClick={() => setSelectedPhoto(null)}
                className="w-7 h-7 rounded-full bg-slate-200 hover:bg-slate-300 flex items-center justify-center text-slate-700 transition cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="relative aspect-[16/10] bg-slate-950">
              <picture>
                <source srcSet={selectedPhoto.imageWebp} type="image/webp" />
                <img
                  src={selectedPhoto.imageJpg}
                  alt={selectedPhoto.alt}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </picture>
              <div className="absolute bottom-3 left-3 bg-slate-950/80 px-2.5 py-1 rounded text-xs text-emerald-400 font-mono">
                ALT Tag: {selectedPhoto.alt}
              </div>
            </div>

            <div className="p-5 space-y-3">
              <h3 className="text-lg font-black text-slate-900">{selectedPhoto.title}</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                {selectedPhoto.description}
              </p>

              <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl text-xs">
                <div>
                  <span className="text-slate-400 block text-[10px]">Technician</span>
                  <span className="font-bold text-slate-800">{selectedPhoto.technician}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px]">Turnaround Time</span>
                  <span className="font-bold text-emerald-600">Same-Day / 3-4 Hours</span>
                </div>
              </div>

              <div className="pt-2 flex items-center gap-3">
                <button
                  onClick={() => {
                    onOpenQuote(selectedPhoto.servicePrefill);
                    setSelectedPhoto(null);
                  }}
                  className="flex-1 py-2.5 px-4 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs shadow-md transition-colors cursor-pointer text-center"
                >
                  Book This Service
                </button>
                <a
                  href={`https://wa.me/${COMPANY_INFO.contact.whatsapp}?text=${encodeURIComponent(`Hello EVONIX, I want to book: ${selectedPhoto.title}`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs transition-colors flex items-center gap-1.5"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>WhatsApp</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
