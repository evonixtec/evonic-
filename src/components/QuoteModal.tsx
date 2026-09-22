import React, { useState, useEffect } from 'react';
import { COMPANY_INFO } from '../data/content';
import { X, Sparkles, Send, MessageSquare, CheckCircle, MapPin, Phone } from 'lucide-react';
import { sanitizeInput, checkRateLimit } from '../lib/security';

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
  const [locationArea, setLocationArea] = useState('Sialkot Cantt');
  const [isHomeService, setIsHomeService] = useState(false);
  const [budget, setBudget] = useState('Flexible / Best Value');
  const [details, setDetails] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [spamError, setSpamError] = useState<string | null>(null);

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSpamError(null);

    const rateCheck = checkRateLimit('quote_modal', 3000);
    if (!rateCheck.allowed) {
      setSpamError(`Please wait ${rateCheck.remainingSecs} seconds before submitting again.`);
      return;
    }

    setSubmitted(true);
  };

  const getWhatsAppMessageUrl = () => {
    const cleanName = sanitizeInput(fullName) || 'Customer';
    const cleanPhone = sanitizeInput(phone) || 'Not provided';
    const cleanLocation = sanitizeInput(locationArea) || 'Sialkot';
    const cleanDetails = sanitizeInput(details) || 'None provided';

    const text = `Hello EVONIX, I would like to request an estimate:
Name: ${cleanName}
Phone: ${cleanPhone}
Service: ${serviceType}
Location/Area: ${cleanLocation}
On-Site Visit Requested: ${isHomeService ? 'Yes' : 'No'}
Budget: ${budget}
Details: ${cleanDetails}`;
    return `https://wa.me/${COMPANY_INFO.contact.whatsapp}?text=${encodeURIComponent(text)}`;
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-slate-900/50 backdrop-blur-xs"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-2xl bg-white border border-slate-200 rounded-2xl shadow-xl overflow-hidden my-8"
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
                EVONIX • 20+ Years Dubai Experience • Sialkot, Pakistan
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
          {submitted ? (
            <div className="text-center py-8 space-y-5">
              <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-200 mx-auto flex items-center justify-center">
                <CheckCircle className="w-8 h-8" />
              </div>
              <div>
                <h4 className="text-xl font-bold text-slate-900 mb-1">
                  Thank You, {fullName || 'Valued Client'}!
                </h4>
                <p className="text-slate-600 text-sm max-w-md mx-auto">
                  Your quote request for <strong className="text-slate-900">{serviceType}</strong> has been noted. Our team in Sialkot will get back to you promptly.
                </p>
              </div>

              {/* Direct Instant WhatsApp Dispatch Button */}
              <div className="pt-4 max-w-md mx-auto space-y-3">
                <a
                  href={getWhatsAppMessageUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3.5 px-6 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-sm flex items-center justify-center gap-2 transition-all"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Send Instant Details via WhatsApp Now</span>
                </a>
                <p className="text-xs text-slate-500">
                  Or call directly: <strong className="text-slate-900">{COMPANY_INFO.contact.phoneDisplay}</strong>
                </p>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    onClose();
                  }}
                  className="mt-2 text-xs text-red-600 hover:underline font-semibold cursor-pointer"
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
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-xs sm:text-sm text-slate-900 focus:outline-none focus:border-red-500 shadow-2xs"
                >
                  <option value="Website Development">Website Development & E-Commerce</option>
                  <option value="Software Development & POS Systems">Software Development & POS Systems</option>
                  <option value="Computer, Laptop & Printer Repairing">Computer, Laptop & Printer Repairing</option>
                  <option value="Doorstep Sialkot On-Site IT Visit">Doorstep Sialkot On-Site IT Visit</option>
                  <option value="IT Networking & Infrastructure">IT Networking & Office Infrastructure</option>
                  <option value="Graphic Design & Branding">Graphic Design & Digital Branding</option>
                </select>
              </div>

              {/* Name & Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Your Name *
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

              {/* Area & Budget */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Location Area in Sialkot
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Paris Road, Small Industrial Estate"
                    value={locationArea}
                    onChange={(e) => setLocationArea(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-red-500 shadow-2xs"
                  />
                </div>
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
              </div>

              {/* On-Site Visit Checkbox */}
              <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl flex items-center gap-3">
                <input
                  type="checkbox"
                  id="home-service-cb"
                  checked={isHomeService}
                  onChange={(e) => setIsHomeService(e.target.checked)}
                  className="w-4 h-4 text-red-600 rounded border-slate-300 focus:ring-red-500"
                />
                <label htmlFor="home-service-cb" className="text-xs text-slate-700 font-medium cursor-pointer">
                  Request an engineer to visit our office/factory/home in Sialkot
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
                  <span>Submit Quote Request</span>
                </button>

                <a
                  href={getWhatsAppMessageUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 font-semibold text-xs border border-emerald-200 transition-colors flex items-center justify-center gap-2"
                >
                  <MessageSquare className="w-4 h-4 text-emerald-600" />
                  <span>Or Send via WhatsApp</span>
                </a>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
