import React, { useState, useEffect } from 'react';
import { COMPANY_INFO } from '../data/content';
import { X, Sparkles, Send, MessageSquare, CheckCircle, MapPin, Shield, Phone } from 'lucide-react';

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
    setSubmitted(true);
  };

  const getWhatsAppMessageUrl = () => {
    const message = `*NEW INQUIRY - EVONIX TECHNOLOGIES*
*Name:* ${fullName || 'Interested Client'}
*Phone:* ${phone || 'Not specified'}
*Email:* ${email || 'Not specified'}
*Service:* ${serviceType}
*Sialkot Area:* ${locationArea}
*Home Service Required:* ${isHomeService ? 'YES (Doorstep Technician in Sialkot)' : 'NO / Lab or Remote'}
*Budget Preference:* ${budget}
*Requirements:* ${details || 'Please contact me to discuss details.'}`;
    return `https://wa.me/${COMPANY_INFO.contact.whatsapp}?text=${encodeURIComponent(message)}`;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-slate-950/80 backdrop-blur-sm animate-fade-in">
      <div
        className="relative w-full max-w-2xl bg-slate-900 border border-slate-700/80 rounded-2xl shadow-2xl shadow-black overflow-hidden my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-slate-950 via-slate-900 to-cyan-950/80 p-6 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg sm:text-xl font-bold text-white">
                Get a Free Quote & Consultation
              </h3>
              <p className="text-xs text-cyan-400 font-medium">
                EVONIX TECHNOLOGIES • 20+ Years Dubai Experience • Sialkot, Pakistan
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 max-h-[80vh] overflow-y-auto">
          {submitted ? (
            <div className="text-center py-8 space-y-5">
              <div className="w-16 h-16 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 mx-auto flex items-center justify-center">
                <CheckCircle className="w-8 h-8" />
              </div>
              <div>
                <h4 className="text-xl font-bold text-white mb-1">
                  Thank You, {fullName || 'Valued Client'}!
                </h4>
                <p className="text-slate-300 text-sm max-w-md mx-auto">
                  Your quote request for <span className="text-cyan-400 font-semibold">{serviceType}</span> has been noted. Our team in Sialkot will get back to you promptly.
                </p>
              </div>

              {/* Direct Instant WhatsApp Dispatch Button */}
              <div className="pt-4 max-w-md mx-auto space-y-3">
                <a
                  href={getWhatsAppMessageUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3.5 px-6 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm shadow-lg shadow-emerald-600/30 flex items-center justify-center gap-2 transition-all"
                >
                  <MessageSquare className="w-4 h-4" />
                  Send Instant Details via WhatsApp Now
                </a>
                <p className="text-xs text-slate-400">
                  Or call directly: <span className="text-white font-semibold">{COMPANY_INFO.contact.phoneDisplay}</span>
                </p>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    onClose();
                  }}
                  className="mt-2 text-xs text-cyan-400 hover:underline"
                >
                  Close Window
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Service Selection */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                  Select Required Service
                </label>
                <select
                  value={serviceType}
                  onChange={(e) => {
                    setServiceType(e.target.value);
                    if (e.target.value.includes('On-Site') || e.target.value.includes('Home')) {
                      setIsHomeService(true);
                    }
                  }}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white text-sm focus:outline-none focus:border-cyan-500 transition-colors"
                >
                  <option value="Website Development">Service 1: Website Development (E-Commerce, Corporate, SEO)</option>
                  <option value="Software & Mobile App Development">Service 2: Software & POS Systems (Supermarket, Restaurant, Retail)</option>
                  <option value="Computer, Laptop & Printer Services">Service 3: Computer, Laptop & Printer Services (Chip repair, Upgrades)</option>
                  <option value="On-Site Home & Office Service">Service 4: On-Site Home & Office Service (Sialkot Doorstep Technician)</option>
                  <option value="Confidential NDA Case Study Presentation">Private Portfolio & Case Study Consultation</option>
                  <option value="Hardware / POS Equipment Purchase">Shop & Equipment Inquiry (POS, Laptops, Printers)</option>
                </select>
              </div>

              {/* Name and Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1.5">
                    Your Full Name <span className="text-cyan-400">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="e.g. Muhammad Usman"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white text-sm focus:outline-none focus:border-cyan-500 placeholder-slate-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1.5">
                    WhatsApp / Phone Number <span className="text-cyan-400">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="e.g. 0300 1234567"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white text-sm focus:outline-none focus:border-cyan-500 placeholder-slate-500"
                  />
                </div>
              </div>

              {/* Email & Area in Sialkot */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1.5">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="yourname@gmail.com"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white text-sm focus:outline-none focus:border-cyan-500 placeholder-slate-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1.5">
                    Your Location / Sialkot Locality
                  </label>
                  <select
                    value={locationArea}
                    onChange={(e) => setLocationArea(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white text-sm focus:outline-none focus:border-cyan-500"
                  >
                    {COMPANY_INFO.contact.homeServiceAreas.map((area, idx) => (
                      <option key={idx} value={area}>
                        {area}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* On-Site Doorstep Toggle */}
              <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-amber-500/10 text-amber-400 border border-amber-500/20">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs font-semibold text-white block">
                      Do you need an On-Site Technician at your Home/Office?
                    </span>
                    <span className="text-[11px] text-slate-400">
                      No lab visit required. We dispatch a technician in Sialkot.
                    </span>
                  </div>
                </div>
                <input
                  type="checkbox"
                  id="home-service-checkbox"
                  checked={isHomeService}
                  onChange={(e) => setIsHomeService(e.target.checked)}
                  className="w-5 h-5 rounded text-cyan-500 bg-slate-900 border-slate-700 focus:ring-cyan-500"
                />
              </div>

              {/* Requirement Details */}
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1.5">
                  Describe Your Requirement / Issue
                </label>
                <textarea
                  rows={3}
                  value={details}
                  onChange={(e) => setDetails(e.target.value)}
                  placeholder="e.g. Need a supermarket POS with 2 barcode scanners and thermal printer, or my Dell laptop has a black display issue in Cantt..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white text-sm focus:outline-none focus:border-cyan-500 placeholder-slate-500"
                />
              </div>

              {/* Actions */}
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="w-full sm:w-auto px-4 py-2.5 rounded-xl border border-slate-700 text-slate-300 hover:text-white hover:bg-slate-800 text-xs font-semibold transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-sm shadow-md shadow-cyan-500/20 flex items-center justify-center gap-2 transition-all cursor-pointer"
                >
                  <Send className="w-4 h-4 text-slate-950" />
                  Submit Quote Request
                </button>
              </div>

              {/* Trust Footnote */}
              <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400">
                <span className="flex items-center gap-1">
                  <Shield className="w-3.5 h-3.5 text-emerald-400" />
                  100% Free Initial Assessment
                </span>
                <span>Direct Email: {COMPANY_INFO.contact.email}</span>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
