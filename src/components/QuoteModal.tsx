import React, { useState, useEffect } from 'react';
import { COMPANY_INFO } from '../data/content';
import { X, Sparkles, Send, MessageSquare, CheckCircle, MapPin, Phone, Copy, Check, Mail } from 'lucide-react';
import { sanitizeInput, checkRateLimit } from '../lib/security';
import { SialkotLocationPicker } from './common/SialkotLocationPicker';
import { dispatchQuoteNotification, buildWhatsAppQuoteUrl, buildMailtoQuoteUrl, QuotePayload } from '../lib/quoteService';

interface QuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialService?: string;
}

export const QuoteModal: React.FC<QuoteModalProps> = ({
  isOpen,
  onClose,
  initialService = 'Website Development',
}) => {
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [serviceType, setServiceType] = useState(initialService);
  const [locationArea, setLocationArea] = useState('Paris Road & City Center');
  const [gpsData, setGpsData] = useState<{ lat: number; lng: number; detected: boolean } | undefined>();
  const [isHomeService, setIsHomeService] = useState(false);
  const [budget, setBudget] = useState('Flexible / Best Value');
  const [details, setDetails] = useState('');
  const [submittedQuote, setSubmittedQuote] = useState<QuotePayload | null>(null);
  const [spamError, setSpamError] = useState<string | null>(null);
  const [copiedRef, setCopiedRef] = useState(false);

  useEffect(() => {
    if (initialService) {
      setServiceType(initialService);
      if (initialService.toLowerCase().includes('home') || initialService.toLowerCase().includes('on-site')) {
        setIsHomeService(true);
      }
    }
  }, [initialService]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSpamError(null);

    const rateCheck = checkRateLimit('quote_modal', 3000);
    if (!rateCheck.allowed) {
      setSpamError(`Please wait ${rateCheck.remainingSecs} seconds before submitting again.`);
      return;
    }

    const cleanName = sanitizeInput(fullName) || 'Valued Client';
    const cleanPhone = sanitizeInput(phone) || 'Not provided';
    const cleanEmail = sanitizeInput(email) || '';
    const cleanLocation = sanitizeInput(locationArea) || 'Sialkot District';
    const cleanDetails = sanitizeInput(details) || '';

    const quoteRecord = await dispatchQuoteNotification({
      fullName: cleanName,
      phone: cleanPhone,
      email: cleanEmail,
      serviceType,
      locationArea: cleanLocation,
      gpsDetected: gpsData?.detected,
      gpsCoords: gpsData ? { lat: gpsData.lat, lng: gpsData.lng } : undefined,
      isHomeService,
      budget,
      details: cleanDetails,
    });

    setSubmittedQuote(quoteRecord);
  };

  const handleCopyReference = () => {
    if (submittedQuote?.referenceId) {
      navigator.clipboard.writeText(submittedQuote.referenceId);
      setCopiedRef(true);
      setTimeout(() => setCopiedRef(false), 2000);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-slate-900/60 backdrop-blur-xs"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-2xl bg-white border border-slate-200 rounded-2xl shadow-2xl overflow-hidden my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-slate-50 p-5 sm:p-6 border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-red-50 text-red-600 border border-red-200">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg sm:text-xl font-bold text-slate-900">
                Get a Free Quote & Consultation
              </h3>
              <p className="text-xs text-red-600 font-semibold">
                EVONIX • 20+ Years Dubai Experience • Sialkot Tech Center
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 max-h-[75vh] overflow-y-auto">
          {submittedQuote ? (
            <div className="text-center py-6 space-y-6">
              <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-200 mx-auto flex items-center justify-center">
                <CheckCircle className="w-8 h-8" />
              </div>

              <div>
                <h4 className="text-2xl font-black text-slate-900 mb-1">
                  Thank You for Your Consultation Request!
                </h4>
                <p className="text-slate-600 text-sm max-w-lg mx-auto">
                  Dear <strong>{submittedQuote.fullName}</strong>, your quotation for <strong className="text-slate-900">{submittedQuote.serviceType}</strong> has been registered.
                </p>
              </div>

              {/* Prominent Reference Number Display Box */}
              <div className="max-w-md mx-auto p-4.5 bg-slate-50 border-2 border-red-200 rounded-2xl text-center space-y-2">
                <span className="text-[11px] font-bold text-slate-500 uppercase tracking-widest block">
                  Your Official Quotation Reference Number
                </span>
                <div className="flex items-center justify-center gap-2">
                  <span className="text-2xl sm:text-3xl font-mono font-black text-red-600 tracking-wider">
                    {submittedQuote.referenceId}
                  </span>
                  <button
                    type="button"
                    onClick={handleCopyReference}
                    className="p-2 rounded-lg bg-white hover:bg-slate-100 border border-slate-200 text-slate-700 transition-colors cursor-pointer"
                    title="Copy reference code"
                  >
                    {copiedRef ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
                <p className="text-xs text-slate-600">
                  Notification automatically routed to our engineering desk (<span className="font-semibold text-slate-900">evonixtec@gmail.com</span>). Please save this reference code.
                </p>
              </div>

              {/* Instant WhatsApp Dispatch with Ref Code */}
              <div className="max-w-md mx-auto space-y-3 pt-2">
                <a
                  href={buildWhatsAppQuoteUrl(submittedQuote)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3.5 px-6 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-md flex items-center justify-center gap-2 transition-all cursor-pointer"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Send Ref #{submittedQuote.referenceId} to WhatsApp for Fast 10-Min Response</span>
                </a>

                <a
                  href={buildMailtoQuoteUrl(submittedQuote)}
                  className="w-full py-2.5 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs border border-slate-200 flex items-center justify-center gap-1.5 transition-colors"
                >
                  <Mail className="w-3.5 h-3.5 text-slate-500" />
                  <span>Send Direct Email Copy to evonixtec@gmail.com</span>
                </a>

                <p className="text-xs text-slate-500">
                  Or call directly: <strong className="text-slate-900">{COMPANY_INFO.contact.phoneDisplay}</strong>
                </p>

                <button
                  onClick={() => {
                    setSubmittedQuote(null);
                    onClose();
                  }}
                  className="mt-2 text-xs text-red-600 hover:underline font-bold cursor-pointer"
                >
                  Close Window
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {spamError && (
                <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-semibold">
                  {spamError}
                </div>
              )}

              {/* Service Selection */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Select Required Service *
                </label>
                <select
                  value={serviceType}
                  onChange={(e) => setServiceType(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-xs sm:text-sm text-slate-900 focus:outline-none focus:border-red-500 shadow-2xs font-medium"
                >
                  <option value="Website Development">Website Development & E-Commerce (Dubai Standards)</option>
                  <option value="Software Development & POS Systems">Software Development & Retail POS Systems</option>
                  <option value="Computer, Laptop & Printer Repairing">Computer, Laptop & Printer Repairing (Lab Diagnostic)</option>
                  <option value="Doorstep Sialkot On-Site IT Visit">Doorstep Sialkot On-Site IT Visit & Setup</option>
                  <option value="IT Networking & Infrastructure">IT Networking & Office Server Infrastructure</option>
                  <option value="Graphic Design & Branding">Graphic Design & Digital Corporate Branding</option>
                </select>
              </div>

              {/* Name & Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Your Name / Business Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Tariq Mehmood"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-red-500 shadow-2xs"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    WhatsApp / Phone Number *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="e.g. 0326 3244002"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-red-500 shadow-2xs"
                  />
                </div>
              </div>

              {/* Email Optional */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Email Address (Optional)
                </label>
                <input
                  type="email"
                  placeholder="yourname@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-red-500 shadow-2xs"
                />
              </div>

              {/* Sialkot Location Area Picker with Auto GPS Sensor & Map */}
              <SialkotLocationPicker
                value={locationArea}
                onChange={(area, data) => {
                  setLocationArea(area);
                  setGpsData(data);
                }}
                required
              />

              {/* Budget Preference */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Estimated Budget Preference
                </label>
                <select
                  value={budget}
                  onChange={(e) => setBudget(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-xs sm:text-sm text-slate-900 focus:outline-none focus:border-red-500 shadow-2xs"
                >
                  <option value="Flexible / Best Value">Flexible / Best Value</option>
                  <option value="Economy / Startup Package">Economy / Startup Package</option>
                  <option value="Professional Commercial Package">Professional Commercial Package</option>
                  <option value="Enterprise Custom Solution">Enterprise Custom Solution</option>
                </select>
              </div>

              {/* On-Site Visit Checkbox */}
              <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl flex items-center gap-3">
                <input
                  type="checkbox"
                  id="home-service-cb"
                  checked={isHomeService}
                  onChange={(e) => setIsHomeService(e.target.checked)}
                  className="w-4 h-4 text-red-600 rounded border-slate-300 focus:ring-red-500 cursor-pointer"
                />
                <label htmlFor="home-service-cb" className="text-xs text-slate-700 font-medium cursor-pointer">
                  Request an engineer to visit our office/factory/home in Sialkot (Doorstep Dispatch)
                </label>
              </div>

              {/* Project Details */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Project / Repair Details
                </label>
                <textarea
                  rows={3}
                  placeholder="Describe your requirements, issue, or scope..."
                  value={details}
                  onChange={(e) => setDetails(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-red-500 shadow-2xs"
                />
              </div>

              {/* Actions */}
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3">
                <button
                  type="submit"
                  className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs sm:text-sm transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-2xs"
                >
                  <Send className="w-4 h-4" />
                  <span>Submit Free Quote Request</span>
                </button>

                <p className="text-[11px] text-slate-500">
                  Instant Reference Code & Email Dispatch to <span className="font-semibold text-slate-700">evonixtec@gmail.com</span>
                </p>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
