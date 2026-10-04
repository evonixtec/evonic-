import React, { useState, useEffect } from 'react';
import {
  CheckCircle,
  Copy,
  Check,
  MessageSquare,
  Mail,
  Phone,
  Sparkles,
  X,
  ShieldCheck,
  Clock,
  ArrowRight,
  Send,
  AlertCircle
} from 'lucide-react';
import { QuotePayload, buildWhatsAppQuoteUrl, buildMailtoQuoteUrl } from '../lib/quoteService';
import { COMPANY_INFO } from '../data/content';

interface QuotationSuccessModalProps {
  quote: QuotePayload | null;
  onClose: () => void;
}

export const QuotationSuccessModal: React.FC<QuotationSuccessModalProps> = ({ quote, onClose }) => {
  const [copiedRef, setCopiedRef] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && quote) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [quote, onClose]);

  if (!quote) return null;

  const handleCopyReference = () => {
    if (quote.referenceId) {
      navigator.clipboard.writeText(quote.referenceId);
      setCopiedRef(true);
      setTimeout(() => setCopiedRef(false), 2500);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-slate-900/70 backdrop-blur-sm animate-fadeIn"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-xl bg-white border border-slate-200/90 rounded-3xl shadow-2xl overflow-hidden my-6 animate-scaleUp"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Colorful Multi-Gradient Top Ribbon */}
        <div className="h-2.5 w-full bg-gradient-to-r from-red-600 via-amber-500 via-emerald-500 to-blue-600" />

        {/* Close Button Top Right */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer z-10"
          aria-label="Close dialog"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="p-6 sm:p-8 space-y-6 max-h-[85vh] overflow-y-auto">
          {/* Header & Celebratory Icon */}
          <div className="text-center space-y-2 pt-2">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 text-white flex items-center justify-center mx-auto shadow-lg shadow-emerald-500/30">
              <CheckCircle className="w-9 h-9" />
            </div>

            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold uppercase tracking-wider mt-2">
              <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
              <span>Quotation Request Registered</span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Thank You, {quote.fullName}!
            </h3>

            <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
              Your inquiry for <strong className="text-slate-900 font-bold">{quote.serviceType}</strong> has been logged. Our engineering desk has received your request.
            </p>
          </div>

          {/* Prominent Golden / Rose Reference Number Display Box */}
          <div className="p-5 bg-gradient-to-br from-rose-50/90 via-white to-red-50/80 border-2 border-red-200 rounded-2xl shadow-sm text-center space-y-2">
            <span className="text-[11px] font-extrabold text-slate-500 uppercase tracking-widest block">
              Official Quotation Reference Code
            </span>
            <div className="flex items-center justify-center gap-2">
              <span className="text-2xl sm:text-3xl font-mono font-black text-red-600 tracking-wider">
                {quote.referenceId}
              </span>
              <button
                type="button"
                onClick={handleCopyReference}
                className="p-2.5 rounded-xl bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 transition-colors cursor-pointer shadow-xs flex items-center gap-1.5"
                title="Copy reference code"
              >
                {copiedRef ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-600" />
                    <span className="text-xs font-bold text-emerald-700">Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4 text-slate-500" />
                    <span className="text-xs font-medium text-slate-600">Copy</span>
                  </>
                )}
              </button>
            </div>
            <p className="text-[11px] text-slate-500">
              Please quote this reference number for immediate status updates and priority booking.
            </p>
          </div>

          {/* Quick Summary Pill Grid */}
          <div className="p-3 bg-slate-50 border border-slate-200/80 rounded-2xl grid grid-cols-2 sm:grid-cols-3 gap-2.5 text-left text-xs">
            <div>
              <span className="text-[10px] text-slate-400 font-bold uppercase block">Country / Region</span>
              <span className="font-bold text-slate-800 truncate block">{quote.country || 'Global'}</span>
            </div>
            <div>
              <span className="text-[10px] text-slate-400 font-bold uppercase block">Service</span>
              <span className="font-bold text-slate-800 truncate block">{quote.serviceType}</span>
            </div>
            <div>
              <span className="text-[10px] text-slate-400 font-bold uppercase block">Budget / Currency</span>
              <span className="font-bold text-slate-800 truncate block">{quote.budget || (quote.currency ? `${quote.currency} Custom` : 'Custom')}</span>
            </div>
          </div>

          {/* Email Transmission Status Box */}
          <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/90 space-y-1.5 text-left text-xs">
            <div className="flex items-center justify-between">
              <span className="font-bold text-slate-700 flex items-center gap-1.5">
                <Mail className="w-4 h-4 text-blue-600" />
                <span>Notification Routed:</span>
              </span>
              <span className="font-mono font-bold text-slate-900 bg-white px-2 py-0.5 rounded border border-slate-200 text-[11px]">
                {quote.recipientEmail}
              </span>
            </div>

            <p className="text-slate-600 text-[11px]">
              {quote.emailDispatched
                ? `✓ Automated transmission initiated to engineering desk (${quote.recipientEmail}).`
                : `✓ Direct dispatch ready. You can also send a 1-click confirmation copy below.`}
            </p>

            {quote.needsActivation && (
              <div className="mt-2 p-2.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 flex items-start gap-2 text-[11px]">
                <AlertCircle className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
                <span>
                  <strong>Admin Notice:</strong> FormSubmit has sent a one-time activation link to <strong>{quote.recipientEmail}</strong>. Please open your Gmail and click <em>"Activate Form"</em> once to receive all leads directly into your inbox.
                </span>
              </div>
            )}
          </div>

          {/* Action CTAs: WhatsApp & Direct Email */}
          <div className="space-y-3 pt-1">
            <a
              href={buildWhatsAppQuoteUrl(quote)}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-extrabold text-sm shadow-md shadow-emerald-600/25 flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              <MessageSquare className="w-4 h-4 fill-white/20" />
              <span>Send Ref #{quote.referenceId} to WhatsApp for Fast 10-Min Reply</span>
            </a>

            <div className="flex flex-col sm:flex-row items-center gap-2.5">
              <a
                href={buildMailtoQuoteUrl(quote)}
                className="w-full sm:flex-1 py-2.5 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs border border-slate-200 flex items-center justify-center gap-1.5 transition-colors cursor-pointer text-center"
              >
                <Mail className="w-3.5 h-3.5 text-slate-600" />
                <span>Send Direct Email Copy</span>
              </a>

              <a
                href={`tel:${COMPANY_INFO.contact.phoneRaw}`}
                className="w-full sm:w-auto py-2.5 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs border border-slate-200 flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
              >
                <Phone className="w-3.5 h-3.5 text-slate-600" />
                <span>{COMPANY_INFO.contact.phoneDisplay}</span>
              </a>
            </div>
          </div>

          {/* What Happens Next Timeline */}
          <div className="pt-2 border-t border-slate-100 space-y-2">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
              What Happens Next?
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-left text-xs">
              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                <span className="font-bold text-slate-900 block text-[11px]">1. Desk Review</span>
                <span className="text-[10px] text-slate-500 block mt-0.5">Assigned to senior engineer within 15 mins.</span>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                <span className="font-bold text-slate-900 block text-[11px]">2. Scope & Cost</span>
                <span className="text-[10px] text-slate-500 block mt-0.5">Transparent fixed quotation prepared.</span>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                <span className="font-bold text-slate-900 block text-[11px]">3. Contact & Delivery</span>
                <span className="text-[10px] text-slate-500 block mt-0.5">Direct WhatsApp discussion and technician dispatch.</span>
              </div>
            </div>
          </div>

          {/* Close Window Button */}
          <div className="pt-2 text-center">
            <button
              onClick={onClose}
              className="w-full py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs sm:text-sm transition-colors cursor-pointer"
            >
              Done & Close Window
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuotationSuccessModal;
