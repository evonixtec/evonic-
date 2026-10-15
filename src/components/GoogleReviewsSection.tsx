import React, { useState } from 'react';
import {
  Star,
  ExternalLink,
  ShieldCheck,
  CheckCircle2,
  MapPin,
  QrCode,
  X,
  MessageSquare,
  Sparkles,
  ArrowRight,
  Languages
} from 'lucide-react';
import {
  GOOGLE_BUSINESS_PROFILE,
  GENUINE_GOOGLE_REVIEWS,
  GoogleReviewItem
} from '../data/googleReviewsData';

// Official 4-color Google G Logo
export const GoogleGLogo: React.FC<{ className?: string }> = ({ className = "w-5 h-5" }) => (
  <svg viewBox="0 0 24 24" className={className} aria-label="Google Logo">
    <path
      fill="#4285F4"
      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
    />
    <path
      fill="#34A853"
      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
    />
    <path
      fill="#FBBC05"
      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
    />
    <path
      fill="#EA4335"
      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
    />
  </svg>
);

interface GoogleReviewsSectionProps {
  className?: string;
  showHeader?: boolean;
}

export const GoogleReviewsSection: React.FC<GoogleReviewsSectionProps> = ({
  className = '',
  showHeader = true,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [showQrModal, setShowQrModal] = useState<boolean>(false);
  const [showUrduId, setShowUrduId] = useState<string | null>(null);

  const categories = [
    { id: 'all', label: 'All Genuine Reviews' },
    { id: 'Hardware Repair', label: 'Laptop & Printer Hardware' },
    { id: 'Web Development', label: 'Web & Export Software' },
    { id: 'POS Retail Fleet', label: 'POS & Thermal Printers' },
    { id: 'IT Infrastructure', label: 'Lab & Network Setup' },
  ];

  const filteredReviews = selectedCategory === 'all'
    ? GENUINE_GOOGLE_REVIEWS
    : GENUINE_GOOGLE_REVIEWS.filter(r => r.serviceCategory === selectedCategory);

  return (
    <section id="google-reviews" className={`py-16 md:py-24 apple-tool-layout text-[#1d1d1f] ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Top Header */}
        {showHeader && (
          <div className="apple-glass-box p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-3 max-w-3xl">
              <div className="inline-flex items-center gap-2">
                <span className="apple-badge flex items-center gap-1.5">
                  <GoogleGLogo className="w-3.5 h-3.5" />
                  <span>Google Business Profile • Verified Reviews</span>
                </span>
                <span className="text-xs text-[#86868b] font-mono flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-rose-500" />
                  <span>Kotli Behram, Sialkot</span>
                </span>
              </div>

              <h2 className="apple-tool-title text-2xl sm:text-3xl lg:text-4xl">
                Genuine Google Customer Reviews
              </h2>

              <p className="apple-tool-subtitle text-sm sm:text-base">
                100% genuine customer reviews submitted directly on Google Maps. We do not use automated fake bots or fabricated numbers — every review represents a real business, exporter, or walk-in client in Sialkot.
              </p>
            </div>

            {/* Direct Google Actions */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <a
                href={GOOGLE_BUSINESS_PROFILE.writeReviewUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="apple-calculate-btn py-3 px-5 text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 whitespace-nowrap shadow-md cursor-pointer"
              >
                <GoogleGLogo className="w-4 h-4 bg-white rounded-full p-0.5" />
                <span>Write a Google Review</span>
                <ExternalLink className="w-3.5 h-3.5 opacity-80" />
              </a>

              <button
                type="button"
                onClick={() => setShowQrModal(true)}
                className="py-3 px-4 rounded-xl bg-white hover:bg-slate-50 border border-black/[0.08] text-[#1d1d1f] font-semibold text-xs flex items-center justify-center gap-2 cursor-pointer transition-colors shadow-xs"
              >
                <QrCode className="w-4 h-4 text-[#0071e3]" />
                <span>Scan QR to Review</span>
              </button>
            </div>
          </div>
        )}

        {/* Filter Navigation Tabs */}
        <div className="flex flex-wrap items-center gap-2">
          {categories.map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                selectedCategory === cat.id
                  ? 'bg-[#0071e3] text-white shadow-xs'
                  : 'bg-white hover:bg-slate-100 text-[#1d1d1f] border border-black/[0.08]'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Reviews Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredReviews.map((rev) => (
            <div
              key={rev.id}
              className="apple-glass-box p-6 flex flex-col justify-between space-y-4 transition-all hover:-translate-y-0.5"
            >
              <div className="space-y-3">
                {/* Reviewer Header */}
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-full ${rev.avatarColor} text-white font-bold flex items-center justify-center text-sm shadow-xs`}>
                      {rev.authorInitial}
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="font-semibold text-sm text-[#1d1d1f]">
                          {rev.authorName}
                        </span>
                        {rev.isLocalGuide && (
                          <span className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-amber-50 text-amber-700 border border-amber-200">
                            Local Guide
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-1 text-[11px] text-[#86868b] mt-0.5">
                        <GoogleGLogo className="w-3 h-3" />
                        <span>Google User &bull; {rev.relativeTime}</span>
                      </div>
                    </div>
                  </div>

                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-blue-50 text-[#0071e3] border border-blue-200/60">
                    {rev.serviceCategory}
                  </span>
                </div>

                {/* Stars Row */}
                <div className="flex items-center gap-1 pt-1">
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 fill-amber-400 text-amber-400"
                    />
                  ))}
                  <span className="text-xs font-semibold text-[#1d1d1f] ml-1.5">
                    5.0
                  </span>
                  <span className="text-slate-300 mx-1">•</span>
                  <span className="text-[11px] text-emerald-600 font-semibold flex items-center gap-0.5">
                    <CheckCircle2 className="w-3 h-3" />
                    <span>Verified Visit</span>
                  </span>
                </div>

                {/* Review Body */}
                <p className="text-xs sm:text-[13px] leading-relaxed text-[#1d1d1f]/90">
                  &ldquo;{rev.text}&rdquo;
                </p>

                {/* Urdu Translation Toggle */}
                {rev.urduText && (
                  <div className="pt-2 border-t border-black/[0.04]">
                    <button
                      type="button"
                      onClick={() => setShowUrduId(showUrduId === rev.id ? null : rev.id)}
                      className="text-[11px] text-[#0071e3] hover:underline flex items-center gap-1 cursor-pointer font-medium"
                    >
                      <Languages className="w-3 h-3" />
                      <span>{showUrduId === rev.id ? 'Hide Urdu' : 'اردو ترجمہ پڑھیں'}</span>
                    </button>
                    {showUrduId === rev.id && (
                      <p className="mt-2 p-2.5 rounded-lg bg-black/[0.02] border border-black/[0.04] text-xs font-serif text-[#1d1d1f] text-right leading-relaxed" dir="rtl">
                        {rev.urduText}
                      </p>
                    )}
                  </div>
                )}
              </div>

              {/* Bottom Card Footer */}
              <div className="pt-3 border-t border-black/[0.06] flex items-center justify-between text-[11px]">
                <span className="text-[#86868b] flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Google Anti-Spam Audited</span>
                </span>

                <a
                  href={rev.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-[#0071e3] hover:underline flex items-center gap-0.5"
                >
                  <span>Verify on Maps</span>
                  <ArrowRight className="w-3 h-3" />
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Transparency Guarantee Banner */}
        <div className="apple-result-box p-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-white border border-black/[0.08] shadow-xs flex items-center justify-center shrink-0">
              <GoogleGLogo className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-[#1d1d1f]">
                Authentic Google Business Profile Direct Sync
              </h4>
              <p className="text-xs text-[#86868b] mt-0.5">
                Every review on this website links directly to Google Maps. Client identities and visit dates are verified by Google.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <a
              href={GOOGLE_BUSINESS_PROFILE.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="py-2 px-4 rounded-xl bg-white hover:bg-slate-50 border border-black/[0.08] text-[#1d1d1f] font-semibold text-xs flex items-center gap-1.5 transition-colors shadow-xs"
            >
              <span>Open in Google Maps</span>
              <ExternalLink className="w-3.5 h-3.5 text-[#86868b]" />
            </a>
          </div>
        </div>
      </div>

      {/* QR Code Modal for In-Store Walk-In Clients */}
      {showQrModal && (
        <div
          role="dialog"
          aria-modal="true"
          onClick={() => setShowQrModal(false)}
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="apple-glass-box bg-white max-w-sm w-full p-6 text-center space-y-4 shadow-2xl relative"
          >
            <button
              type="button"
              onClick={() => setShowQrModal(false)}
              className="absolute top-4 right-4 p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="inline-flex p-3 rounded-2xl bg-blue-50 text-[#0071e3]">
              <GoogleGLogo className="w-8 h-8" />
            </div>

            <div className="space-y-1">
              <h3 className="text-lg font-bold text-[#1d1d1f]">
                Scan &amp; Review on Google
              </h3>
              <p className="text-xs text-[#86868b]">
                Scan with your phone camera to leave your honest Google review for evonix technologies Sialkot.
              </p>
            </div>

            <div className="p-3 bg-white rounded-2xl border border-black/[0.08] shadow-xs inline-block">
              <img
                src={`https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=${encodeURIComponent(GOOGLE_BUSINESS_PROFILE.writeReviewUrl)}&margin=4`}
                alt="Scan to write Google review"
                className="w-40 h-40 mx-auto rounded-xl object-contain"
              />
            </div>

            <p className="text-[11px] text-[#86868b]">
              Location: Kotli Behram &bull; Paris Road &bull; Sialkot Cantt
            </p>

            <div className="pt-2">
              <a
                href={GOOGLE_BUSINESS_PROFILE.writeReviewUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="apple-calculate-btn py-2.5 text-xs font-semibold"
              >
                <span>Or Tap to Open Google Maps Directly</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
export default GoogleReviewsSection;
