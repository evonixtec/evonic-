import React, { useState, useEffect } from 'react';
import { COMPANY_INFO } from '../data/content';
import {
  X,
  Sparkles,
  Send,
  MessageSquare,
  CheckCircle,
  MapPin,
  Phone,
  Copy,
  Check,
  Mail,
  AlertCircle,
  Globe,
  Building2,
  ShieldCheck,
  Video,
  Clock,
  DollarSign
} from 'lucide-react';
import { sanitizeInput, checkRateLimit } from '../lib/security';
import { SialkotLocationPicker } from './common/SialkotLocationPicker';
import {
  dispatchQuoteNotification,
  buildWhatsAppQuoteUrl,
  buildMailtoQuoteUrl,
  QuotePayload
} from '../lib/quoteService';

interface CountryOption {
  code: string;
  name: string;
  dialCode: string;
  flag: string;
  currency: string;
  placeholder: string;
}

const COUNTRIES: CountryOption[] = [
  { code: 'AE', name: 'United Arab Emirates', dialCode: '+971', flag: '🇦🇪', currency: 'AED', placeholder: '50 123 4567' },
  { code: 'US', name: 'United States', dialCode: '+1', flag: '🇺🇸', currency: 'USD', placeholder: '(555) 234-5678' },
  { code: 'GB', name: 'United Kingdom', dialCode: '+44', flag: '🇬🇧', currency: 'GBP', placeholder: '7911 123456' },
  { code: 'SA', name: 'Saudi Arabia', dialCode: '+966', flag: '🇸🇦', currency: 'SAR', placeholder: '50 123 4567' },
  { code: 'CA', name: 'Canada', dialCode: '+1', flag: '🇨🇦', currency: 'USD', placeholder: '(416) 555-0199' },
  { code: 'DE', name: 'Germany / Europe', dialCode: '+49', flag: '🇩🇪', currency: 'EUR', placeholder: '151 12345678' },
  { code: 'QA', name: 'Qatar', dialCode: '+974', flag: '🇶🇦', currency: 'QAR', placeholder: '3312 3456' },
  { code: 'OM', name: 'Oman', dialCode: '+968', flag: '🇴🇲', currency: 'OMR', placeholder: '9123 4567' },
  { code: 'KW', name: 'Kuwait', dialCode: '+965', flag: '🇰🇼', currency: 'KWD', placeholder: '9123 4567' },
  { code: 'BH', name: 'Bahrain', dialCode: '+973', flag: '🇧🇭', currency: 'BHD', placeholder: '3612 3456' },
  { code: 'AU', name: 'Australia', dialCode: '+61', flag: '🇦🇺', currency: 'USD', placeholder: '412 345 678' },
  { code: 'PK', name: 'Pakistan', dialCode: '+92', flag: '🇵🇰', currency: 'PKR', placeholder: '326 3244002' },
  { code: 'OTHER', name: 'Other International', dialCode: '+', flag: '🌐', currency: 'USD', placeholder: 'Enter phone number' },
];

const STANDARD_SERVICES = [
  'Website Development & Enterprise Portals',
  'Dedicated Developer Hiring & Remote Teams',
  'Software Development & Retail POS Systems',
  'Global Multi-Currency E-Commerce Stores',
  'Custom ERP & Industrial Production Software',
  'Computer, Laptop & Printer Repairing',
  'Doorstep Sialkot On-Site IT Visit',
  'IT Networking & Office Server Infrastructure',
  'Graphic Design & Digital Branding',
];

interface QuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialService?: string;
  onNavigatePage?: (page: string) => void;
}

export const QuoteModal: React.FC<QuoteModalProps> = ({
  isOpen,
  onClose,
  initialService = 'Website Development & Enterprise Portals',
  onNavigatePage,
}) => {
  // Client Region Type: 'international' (Default Global) | 'pakistan' (Local)
  const [clientType, setClientType] = useState<'international' | 'pakistan'>('international');

  // Form Fields
  const [selectedCountryCode, setSelectedCountryCode] = useState<string>('AE');
  const [fullName, setFullName] = useState('');
  const [organization, setOrganization] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [serviceType, setServiceType] = useState(initialService);
  const [internationalLocation, setInternationalLocation] = useState('Dubai, UAE');
  const [localLocationArea, setLocalLocationArea] = useState('Paris Road & City Center');
  const [gpsData, setGpsData] = useState<{ lat: number; lng: number; detected: boolean } | undefined>();
  const [isHomeService, setIsHomeService] = useState(false);
  const [currency, setCurrency] = useState('USD');
  const [budget, setBudget] = useState('Commercial Project ($1,500 - $5,000)');
  const [preferredContact, setPreferredContact] = useState('WhatsApp / Call');
  const [timeZone, setTimeZone] = useState('Gulf Standard Time (GST / UTC+4)');
  const [details, setDetails] = useState('');

  // Status
  const [submittedQuote, setSubmittedQuote] = useState<QuotePayload | null>(null);
  const [spamError, setSpamError] = useState<string | null>(null);
  const [copiedRef, setCopiedRef] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const selectedCountry = COUNTRIES.find((c) => c.code === selectedCountryCode) || COUNTRIES[0];

  useEffect(() => {
    if (initialService) {
      setServiceType(initialService);
      const safeInit = (initialService || '').toLowerCase();
      if (safeInit.includes('home') || safeInit.includes('on-site') || safeInit.includes('doorstep') || safeInit.includes('sialkot')) {
        setClientType('pakistan');
        setSelectedCountryCode('PK');
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

  const handleCountryChange = (code: string) => {
    setSelectedCountryCode(code);
    const countryObj = COUNTRIES.find((c) => c.code === code);
    if (countryObj) {
      if (code === 'PK') {
        setClientType('pakistan');
        setCurrency('PKR');
        setBudget('Commercial Commercial Package');
      } else {
        setClientType('international');
        if (code === 'AE') {
          setCurrency('AED');
          setInternationalLocation('Dubai, UAE');
          setTimeZone('Gulf Standard Time (GST / UTC+4)');
          setBudget('Commercial Scope (5,500 - 18,000 AED)');
        } else if (code === 'GB') {
          setCurrency('GBP');
          setInternationalLocation('London, United Kingdom');
          setTimeZone('London / Western Europe (GMT / BST)');
          setBudget('Commercial Scope (£1,200 - £4,000)');
        } else if (code === 'DE') {
          setCurrency('EUR');
          setInternationalLocation('Frankfurt, Germany');
          setTimeZone('Central European Time (CET)');
          setBudget('Commercial Scope (€1,500 - €4,500)');
        } else {
          setCurrency('USD');
          setInternationalLocation(`${countryObj.name}`);
          setTimeZone('Americas / International Flexible');
          setBudget('Commercial Project ($1,500 - $5,000)');
        }
      }
    }
  };

  const handleTabSwitch = (type: 'international' | 'pakistan') => {
    setClientType(type);
    if (type === 'pakistan') {
      setSelectedCountryCode('PK');
      setCurrency('PKR');
      setBudget('Commercial Package (Rs. 65,000 - Rs. 150,000)');
    } else {
      setSelectedCountryCode('AE');
      setCurrency('USD');
      setInternationalLocation('Dubai, UAE');
      setBudget('Commercial Project ($1,500 - $5,000)');
      setIsHomeService(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSpamError(null);

    const rateCheck = checkRateLimit('quote_modal', 3000);
    if (!rateCheck.allowed) {
      setSpamError(`Please wait ${rateCheck.remainingSecs} seconds before submitting again.`);
      return;
    }

    setIsSubmitting(true);
    try {
      const cleanName = sanitizeInput(fullName) || 'Valued Client';
      const cleanOrg = sanitizeInput(organization);
      const cleanPhone = sanitizeInput(phone) || 'Not provided';
      const cleanEmail = sanitizeInput(email) || '';
      const cleanDetails = sanitizeInput(details) || '';

      const locationStr =
        clientType === 'pakistan'
          ? sanitizeInput(localLocationArea) || 'Pakistan'
          : sanitizeInput(internationalLocation) || selectedCountry.name;

      const fullCustomerName = cleanOrg ? `${cleanName} (${cleanOrg})` : cleanName;

      const quoteRecord = await dispatchQuoteNotification({
        fullName: fullCustomerName,
        phone: cleanPhone,
        countryCode: selectedCountry.dialCode,
        country: selectedCountry.name,
        currency,
        preferredContactMethod: preferredContact,
        timeZone,
        email: cleanEmail,
        serviceType,
        locationArea: locationStr,
        gpsDetected: clientType === 'pakistan' ? gpsData?.detected : false,
        gpsCoords: clientType === 'pakistan' && gpsData ? { lat: gpsData.lat, lng: gpsData.lng } : undefined,
        isHomeService: clientType === 'pakistan' ? isHomeService : false,
        budget,
        details: cleanDetails,
      });

      setSubmittedQuote(quoteRecord);
    } catch (err) {
      console.error('Error submitting quote:', err);
    } finally {
      setIsSubmitting(false);
    }
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
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto bg-slate-900/70 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-2xl bg-white border border-slate-200/90 rounded-3xl shadow-2xl overflow-hidden my-6 animate-scaleUp"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Multi-Gradient Top Ribbon */}
        <div className="h-2.5 w-full bg-gradient-to-r from-blue-600 via-emerald-500 via-amber-500 to-red-600" />

        {/* Header */}
        <div className="bg-gradient-to-b from-slate-50 to-white px-5 sm:px-7 py-5 border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-700 text-white flex items-center justify-center shadow-md shadow-blue-500/25 flex-shrink-0">
              <Globe className="w-6 h-6 text-amber-300" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg sm:text-xl font-black text-slate-900 tracking-tight">
                  International Quotation & Proposal
                </h3>
                <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                  Global
                </span>
              </div>
              <p className="text-xs text-slate-500 font-medium mt-0.5">
                evonix • 20+ Years UAE Corporate Heritage • Global Delivery & Sialkot Lab
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 sm:p-7 max-h-[80vh] overflow-y-auto">
          {submittedQuote ? (
            /* Celebratory Submission Confirmation */
            <div className="text-center py-4 space-y-5">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 text-white border-4 border-emerald-100 mx-auto flex items-center justify-center shadow-lg shadow-emerald-500/25">
                <CheckCircle className="w-9 h-9" />
              </div>

              <div>
                <h4 className="text-2xl font-black text-slate-900 mb-1">
                  Thank You, {submittedQuote.fullName}!
                </h4>
                <p className="text-slate-600 text-xs sm:text-sm max-w-md mx-auto leading-relaxed">
                  Your formal proposal request for <strong className="text-slate-900 font-bold">{submittedQuote.serviceType}</strong> ({submittedQuote.country || 'Global'}) has been registered and routed to our technical desk.
                </p>
              </div>

              {/* Reference Number Display Box */}
              <div className="max-w-md mx-auto p-5 bg-gradient-to-br from-rose-50/90 via-white to-red-50/80 border-2 border-red-200 rounded-2xl text-center space-y-2 shadow-sm">
                <span className="text-[11px] font-extrabold text-slate-500 uppercase tracking-widest block">
                  Official Quotation Reference Number
                </span>
                <div className="flex items-center justify-center gap-2">
                  <span className="text-2xl sm:text-3xl font-mono font-black text-red-600 tracking-wider">
                    {submittedQuote.referenceId}
                  </span>
                  <button
                    type="button"
                    onClick={handleCopyReference}
                    className="p-2 rounded-xl bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 transition-colors cursor-pointer shadow-xs flex items-center gap-1.5"
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
                <p className="text-xs text-slate-600">
                  Transmitted directly to our engineering desk (<span className="font-semibold text-slate-900">evonixtec@gmail.com</span>).
                </p>
              </div>

              {/* Summary Details Badge */}
              <div className="max-w-md mx-auto p-3 bg-slate-50 border border-slate-200 rounded-2xl grid grid-cols-2 sm:grid-cols-3 gap-2 text-left text-xs">
                <div>
                  <span className="text-[10px] text-slate-400 font-bold uppercase block">Country</span>
                  <span className="font-bold text-slate-800 truncate block">{submittedQuote.country}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 font-bold uppercase block">Contact</span>
                  <span className="font-bold text-slate-800 truncate block">{submittedQuote.phone}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 font-bold uppercase block">Budget Preference</span>
                  <span className="font-bold text-slate-800 truncate block">{submittedQuote.budget}</span>
                </div>
              </div>

              {/* Email Delivery Status */}
              <div className="max-w-md mx-auto p-3 rounded-xl bg-slate-50 border border-slate-200 text-left text-xs space-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-700 flex items-center gap-1.5">
                    <Mail className="w-3.5 h-3.5 text-blue-600" />
                    <span>Email Dispatch Status:</span>
                  </span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800">
                    Active
                  </span>
                </div>
                <p className="text-slate-600 text-[11px]">
                  {submittedQuote.emailDispatchMessage || `Routed to evonixtec@gmail.com`}
                </p>
                {submittedQuote.needsActivation && (
                  <div className="mt-2 p-2 rounded-lg bg-amber-50 border border-amber-200 text-amber-900 text-[11px] flex items-start gap-1.5">
                    <AlertCircle className="w-3.5 h-3.5 text-amber-600 flex-shrink-0 mt-0.5" />
                    <span>
                      <strong>Admin Note:</strong> Please click <em>"Activate Form"</em> in the email sent by FormSubmit to evonixtec@gmail.com.
                    </span>
                  </div>
                )}
              </div>

              {/* Instant WhatsApp & Email Buttons */}
              <div className="max-w-md mx-auto space-y-2.5 pt-1">
                <a
                  href={buildWhatsAppQuoteUrl(submittedQuote)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-extrabold text-sm shadow-md shadow-emerald-600/25 flex items-center justify-center gap-2 transition-all cursor-pointer"
                >
                  <MessageSquare className="w-4 h-4 fill-white/20" />
                  <span>Send Ref #{submittedQuote.referenceId} to WhatsApp for Fast 10-Min Response</span>
                </a>

                <a
                  href={buildMailtoQuoteUrl(submittedQuote)}
                  className="w-full py-2.5 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs border border-slate-200 flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Mail className="w-3.5 h-3.5 text-slate-500" />
                  <span>Send Direct Email Copy to evonixtec@gmail.com</span>
                </a>

                <div className="pt-2">
                  <button
                    onClick={() => {
                      setSubmittedQuote(null);
                      onClose();
                    }}
                    className="px-6 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs transition-colors cursor-pointer"
                  >
                    Done & Close Window
                  </button>
                </div>
              </div>
            </div>
          ) : (
            /* International Quotation Form */
            <form onSubmit={handleSubmit} className="space-y-4">
              {spamError && (
                <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-semibold">
                  {spamError}
                </div>
              )}

              {/* 1. Client Scope Switcher (International vs Pakistan) */}
              <div className="p-1.5 bg-slate-100 rounded-2xl border border-slate-200 flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => handleTabSwitch('international')}
                  className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                    clientType === 'international'
                      ? 'bg-white text-slate-900 shadow-sm border border-slate-200/80'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <Globe className="w-3.5 h-3.5 text-blue-600" />
                  <span>International & Global Client (UAE, USA, UK, Europe, Worldwide)</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleTabSwitch('pakistan')}
                  className={`py-2 px-3.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                    clientType === 'pakistan'
                      ? 'bg-white text-slate-900 shadow-sm border border-slate-200/80'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <span>🇵🇰 Pakistan & Sialkot Direct</span>
                </button>
              </div>

              {/* 2. Country & Contact Information */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {/* Country Selector */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center justify-between">
                    <span>Your Country / Region *</span>
                    <span className="text-[10px] text-slate-400 font-normal">Dial: {selectedCountry.dialCode}</span>
                  </label>
                  <select
                    value={selectedCountryCode}
                    onChange={(e) => handleCountryChange(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-xs sm:text-sm text-slate-900 focus:outline-none focus:border-blue-500 font-semibold shadow-2xs"
                  >
                    {COUNTRIES.map((c) => (
                      <option key={c.code} value={c.code}>
                        {c.flag} {c.name} ({c.dialCode})
                      </option>
                    ))}
                  </select>
                </div>

                {/* Service Selection */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Required Service / Architecture *
                  </label>
                  <select
                    value={serviceType}
                    onChange={(e) => setServiceType(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-xs sm:text-sm text-slate-900 focus:outline-none focus:border-blue-500 font-medium shadow-2xs truncate"
                  >
                    {STANDARD_SERVICES.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                    {!STANDARD_SERVICES.includes(serviceType) && (
                      <option value={serviceType}>💻 {serviceType}</option>
                    )}
                  </select>
                </div>
              </div>

              {/* Developer Cost Calculator Callout */}
              <div className="p-3 bg-gradient-to-r from-blue-50 via-indigo-50/60 to-purple-50 border border-blue-200/90 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 shadow-2xs">
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="w-7 h-7 rounded-xl bg-blue-600 text-white flex items-center justify-center flex-shrink-0 text-xs font-bold shadow-xs">
                    💻
                  </div>
                  <div className="min-w-0">
                    <span className="text-xs font-bold text-slate-900 block truncate">
                      Hiring Dedicated Remote Software Developers?
                    </span>
                    <span className="text-[11px] text-blue-700 block truncate">
                      Senior full-stack dev at $22/hr vs $80/hr USA. Save $110,000+ per engineer.
                    </span>
                  </div>
                </div>
                {onNavigatePage && (
                  <button
                    type="button"
                    onClick={() => {
                      onClose();
                      onNavigatePage('developer-cost-calculator');
                    }}
                    className="px-3 py-1 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-[11px] font-bold whitespace-nowrap shadow-xs cursor-pointer transition-colors flex-shrink-0"
                  >
                    Open Calculator ➔
                  </button>
                )}
              </div>

              {/* 3. Name & Organization */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder={clientType === 'international' ? 'e.g. John Miller / Tariq' : 'e.g. Usman Ali'}
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-500 shadow-2xs"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Company / Organization (Optional)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Apex Global Trading LLC"
                    value={organization}
                    onChange={(e) => setOrganization(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-500 shadow-2xs"
                  />
                </div>
              </div>

              {/* 4. Phone with International Dial Code & Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Phone / WhatsApp Number *
                  </label>
                  <div className="flex rounded-xl shadow-2xs overflow-hidden border border-slate-300 focus-within:border-blue-500">
                    <span className="inline-flex items-center px-3 bg-slate-100 text-slate-700 text-xs font-bold border-r border-slate-300 select-none">
                      {selectedCountry.flag} {selectedCountry.dialCode}
                    </span>
                    <input
                      type="tel"
                      required
                      placeholder={`e.g. ${selectedCountry.placeholder}`}
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full px-3 py-2.5 bg-slate-50 text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="name@company.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-500 shadow-2xs"
                  />
                </div>
              </div>

              {/* 5. Location Handling (International City vs Sialkot Area) */}
              {clientType === 'international' ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      City & Country *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Dubai, UAE / London, UK / New York, USA"
                      value={internationalLocation}
                      onChange={(e) => setInternationalLocation(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-500 shadow-2xs"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Timezone / Preferred Meeting Time
                    </label>
                    <select
                      value={timeZone}
                      onChange={(e) => setTimeZone(e.target.value)}
                      className="w-full px-3 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-xs text-slate-900 focus:outline-none focus:border-blue-500 shadow-2xs"
                    >
                      <option value="Gulf Standard Time (GST / UTC+4)">Gulf Standard Time (GST - Dubai / Gulf)</option>
                      <option value="London / Europe (GMT / BST / CET)">London / Western Europe (GMT / BST / CET)</option>
                      <option value="US Eastern Time (EST / UTC-5)">US Eastern Time (EST - NY, FL)</option>
                      <option value="US Central / Pacific (CST / PST)">US Central / Pacific (TX, CA)</option>
                      <option value="Pakistan / South Asia (PKT / UTC+5)">Pakistan / South Asia (PKT)</option>
                      <option value="Flexible Any Time">Flexible (Coordinate via WhatsApp)</option>
                    </select>
                  </div>
                </div>
              ) : (
                <div className="space-y-3">
                  <SialkotLocationPicker
                    value={localLocationArea}
                    onChange={(area, data) => {
                      setLocalLocationArea(area);
                      setGpsData(data);
                    }}
                    required
                  />

                  {/* Sialkot Doorstep IT Visit */}
                  <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl flex items-center gap-3">
                    <input
                      type="checkbox"
                      id="home-service-cb"
                      checked={isHomeService}
                      onChange={(e) => setIsHomeService(e.target.checked)}
                      className="w-4 h-4 text-red-600 rounded border-slate-300 focus:ring-red-500 cursor-pointer"
                    />
                    <label htmlFor="home-service-cb" className="text-xs text-slate-700 font-medium cursor-pointer">
                      Request doorstep engineer visit in Sialkot (Home / Office / Factory Dispatch)
                    </label>
                  </div>
                </div>
              )}

              {/* 6. Budget & Consultation Channel */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Currency & Estimated Budget
                  </label>
                  <select
                    value={budget}
                    onChange={(e) => setBudget(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-xs text-slate-900 focus:outline-none focus:border-blue-500 shadow-2xs font-medium"
                  >
                    {clientType === 'international' ? (
                      <>
                        <option value="Starter / Pilot Project ($500 - $1,500)">Starter / Pilot Project ($500 - $1,500 USD)</option>
                        <option value="Commercial Project ($1,500 - $5,000)">Commercial Project ($1,500 - $5,000 USD)</option>
                        <option value="Enterprise Architecture ($5,000+ USD)">Enterprise Architecture ($5,000+ USD)</option>
                        <option value="Dedicated Developer ($15 - $22/hr Monthly)">Dedicated Full-Time Developer ($15 - $22/hr)</option>
                        <option value="Gulf Corporate Scope (5,500 - 20,000+ AED)">Gulf Corporate Scope (5,500 - 20,000+ AED)</option>
                        <option value="Flexible / Need Custom Scope Proposal">Flexible / Need Custom Scope Proposal</option>
                      </>
                    ) : (
                      <>
                        <option value="Flexible / Best Value">Flexible / Best Value</option>
                        <option value="Economy Startup Package (PKR 35k - 65k)">Economy Startup Package (PKR 35k - 65k)</option>
                        <option value="Commercial Web / POS (PKR 65k - 150k)">Commercial Web / POS (PKR 65k - 150k)</option>
                        <option value="Custom Factory ERP (PKR 150k+)">Custom Factory ERP (PKR 150k+)</option>
                      </>
                    )}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Preferred Consultation Method
                  </label>
                  <select
                    value={preferredContact}
                    onChange={(e) => setPreferredContact(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-xs text-slate-900 focus:outline-none focus:border-blue-500 shadow-2xs font-medium"
                  >
                    <option value="WhatsApp / Call">📱 WhatsApp Chat & Audio Call</option>
                    <option value="Google Meet / Zoom Video Call">🎥 Google Meet / Zoom Video Call</option>
                    <option value="Official Email Written Proposal">📧 Formal Written Proposal by Email</option>
                    <option value="Direct Phone Call">📞 Direct International Phone Call</option>
                  </select>
                </div>
              </div>

              {/* 7. Requirements & Project Notes */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Project Scope & Technical Specifications
                </label>
                <textarea
                  rows={3}
                  placeholder={
                    clientType === 'international'
                      ? 'Describe your project objectives, timeline, required technologies, or developer headcount...'
                      : 'Describe your website requirements, retail POS software needs, or hardware issues...'
                  }
                  value={details}
                  onChange={(e) => setDetails(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-500 shadow-2xs"
                />
              </div>

              {/* Trust Badge Ribbon */}
              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200/80 flex flex-wrap items-center justify-between gap-2 text-[11px] text-slate-600">
                <div className="flex items-center gap-1.5 font-medium">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                  <span>Strict NDA Protected & 100% IP Code Ownership</span>
                </div>
                <div className="flex items-center gap-1.5 font-medium">
                  <Clock className="w-3.5 h-3.5 text-blue-600 flex-shrink-0" />
                  <span>2-Hour Rapid Technical Response</span>
                </div>
              </div>

              {/* Submit & Dispatch */}
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 disabled:opacity-75 text-white font-black text-xs sm:text-sm transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md shadow-blue-600/25"
                >
                  {isSubmitting ? (
                    <>
                      <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Dispatching to evonixtec@gmail.com...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Submit International Quote Request</span>
                    </>
                  )}
                </button>

                <p className="text-[11px] text-slate-500 font-medium">
                  Direct routing to <span className="font-bold text-slate-800">evonixtec@gmail.com</span>
                </p>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default QuoteModal;
