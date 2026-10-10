import React, { useState } from 'react';
import { COMPANY_INFO } from '../data/content';
import { MapPin, Mail, Phone, MessageSquare, Clock, ShieldCheck, Send, CheckCircle2, ArrowRight, Copy, Check, Globe } from 'lucide-react';
import { sanitizeInput, checkRateLimit } from '../lib/security';
import { SialkotLocationPicker } from './common/SialkotLocationPicker';
import { dispatchQuoteNotification, buildWhatsAppQuoteUrl, buildMailtoQuoteUrl, QuotePayload } from '../lib/quoteService';
import { QuotationSuccessModal } from './QuotationSuccessModal';

const COUNTRIES = [
  { code: 'AE', name: 'United Arab Emirates', dialCode: '+971', flag: '🇦🇪', placeholder: '50 123 4567' },
  { code: 'US', name: 'United States', dialCode: '+1', flag: '🇺🇸', placeholder: '(555) 234-5678' },
  { code: 'GB', name: 'United Kingdom', dialCode: '+44', flag: '🇬🇧', placeholder: '7911 123456' },
  { code: 'SA', name: 'Saudi Arabia', dialCode: '+966', flag: '🇸🇦', placeholder: '50 123 4567' },
  { code: 'CA', name: 'Canada', dialCode: '+1', flag: '🇨🇦', placeholder: '(416) 555-0199' },
  { code: 'DE', name: 'Germany / Europe', dialCode: '+49', flag: '🇩🇪', placeholder: '151 12345678' },
  { code: 'AU', name: 'Australia', dialCode: '+61', flag: '🇦🇺', placeholder: '412 345 678' },
  { code: 'PK', name: 'Pakistan', dialCode: '+92', flag: '🇵🇰', placeholder: '326 3244002' },
  { code: 'OTHER', name: 'Other International', dialCode: '+', flag: '🌐', placeholder: 'Phone number' },
];

interface ContactSectionProps {
  onOpenQuote: (service?: string) => void;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ onOpenQuote }) => {
  const [selectedCountryCode, setSelectedCountryCode] = useState('AE');
  const [formName, setFormName] = useState('');
  const [formPhone, setFormPhone] = useState('');
  const [formEmail, setFormEmail] = useState('');
  const [formService, setFormService] = useState('Website Development & Enterprise Portals');
  const [formLocation, setFormLocation] = useState('Paris Road & City Center');
  const [internationalCity, setInternationalCity] = useState('Dubai, UAE');
  const [gpsData, setGpsData] = useState<{ lat: number; lng: number; detected: boolean } | undefined>();
  const [formMessage, setFormMessage] = useState('');
  const [submittedRecord, setSubmittedRecord] = useState<QuotePayload | null>(null);
  const [formError, setFormError] = useState<string | null>(null);
  const [copiedRef, setCopiedRef] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const selectedCountry = COUNTRIES.find((c) => c.code === selectedCountryCode) || COUNTRIES[0];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    const rateCheck = checkRateLimit('contact_section', 3000);
    if (!rateCheck.allowed) {
      setFormError(`Please wait ${rateCheck.remainingSecs} seconds before resubmitting.`);
      return;
    }

    setIsSubmitting(true);
    try {
      const cleanName = sanitizeInput(formName) || 'Customer';
      const cleanPhone = sanitizeInput(formPhone) || 'Not specified';
      const cleanEmail = sanitizeInput(formEmail) || '';
      const cleanLocation = sanitizeInput(formLocation) || 'Sialkot District';
      const cleanInternationalCity = sanitizeInput(internationalCity) || selectedCountry.name;
      const cleanMessage = sanitizeInput(formMessage) || 'General inquiry submitted via Contact form.';

      const finalLocation = selectedCountryCode === 'PK' ? cleanLocation : cleanInternationalCity;

      const record = await dispatchQuoteNotification({
        fullName: cleanName,
        phone: cleanPhone,
        countryCode: selectedCountry.dialCode,
        country: selectedCountry.name,
        email: cleanEmail,
        serviceType: formService,
        locationArea: finalLocation,
        gpsDetected: selectedCountryCode === 'PK' ? gpsData?.detected : false,
        gpsCoords: selectedCountryCode === 'PK' && gpsData ? { lat: gpsData.lat, lng: gpsData.lng } : undefined,
        isHomeService: selectedCountryCode === 'PK' && ((formService || '').toLowerCase().includes('doorstep') || (formService || '').toLowerCase().includes('repair')),
        details: cleanMessage,
      });

      setSubmittedRecord(record);
    } catch (err) {
      console.error('Error submitting contact form:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCopyRef = () => {
    if (submittedRecord?.referenceId) {
      navigator.clipboard.writeText(submittedRecord.referenceId);
      setCopiedRef(true);
      setTimeout(() => setCopiedRef(false), 2000);
    }
  };

  return (
    <section id="contact" className="relative py-20 md:py-28 overflow-hidden bg-gradient-to-b from-slate-50 via-red-50/20 to-slate-50 border-b border-slate-200">
      {/* Colorful Atmospheric Tech Grid Background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] bg-[size:3.5rem_3.5rem] [mask-image:radial-gradient(ellipse_75%_55%_at_50%_40%,#000_70%,transparent_100%)] opacity-70 pointer-events-none" />
      
      {/* Radiant Colorful Ambient Light Spheres */}
      <div className="absolute top-10 left-10 w-96 h-96 bg-red-400/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 right-10 w-96 h-96 bg-blue-400/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-1/3 w-96 h-96 bg-emerald-400/15 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-red-50 to-rose-100/70 border border-red-200 text-xs font-bold text-red-700 shadow-2xs">
            <Mail className="w-3.5 h-3.5 text-red-600" />
            <span>Direct Sialkot Engineering Desk</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight">
            Contact Us & Sialkot Office
          </h2>
          <p className="text-slate-700 text-base sm:text-lg font-bold">
            Got a question? Call us. We reply in 2 hours.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Direct Colorful Contact Info Cards */}
          <div className="lg:col-span-5 space-y-4">
            {/* 1. Direct Hotline Card (Colorful Crimson/Rose) */}
            <div className="bg-gradient-to-br from-rose-50/90 via-white to-red-50/70 border-2 border-red-200 rounded-3xl p-5 sm:p-6 shadow-[0_8px_25px_rgba(220,38,38,0.06)] hover:shadow-[0_12px_32px_rgba(220,38,38,0.12)] transition-all">
              <div className="flex items-start gap-4">
                <div className="w-13 h-13 rounded-2xl bg-gradient-to-br from-red-600 via-rose-600 to-red-700 text-white flex items-center justify-center flex-shrink-0 shadow-lg shadow-red-500/30">
                  <Phone className="w-6 h-6 animate-pulse" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="text-xs font-bold text-red-700 uppercase tracking-wider">Direct Hotline</h3>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-red-100 text-red-800">
                      Live Call
                    </span>
                  </div>
                  <a
                    href={`tel:${COMPANY_INFO.contact.phoneRaw}`}
                    className="text-lg sm:text-xl font-black text-slate-900 hover:text-red-600 transition-colors block mt-1"
                  >
                    {COMPANY_INFO.contact.phoneDisplay}
                  </a>
                  <p className="text-xs text-slate-600 mt-1 font-medium">Mon - Sat: 9:00 AM - 8:00 PM • Kotli Behram, Sialkot, Pakistan</p>
                </div>
              </div>
            </div>

            {/* 2. WhatsApp Card (Colorful Emerald/Teal) */}
            <div className="bg-gradient-to-br from-emerald-50/90 via-white to-teal-50/70 border-2 border-emerald-200 rounded-3xl p-5 sm:p-6 shadow-[0_8px_25px_rgba(16,185,129,0.06)] hover:shadow-[0_12px_32px_rgba(16,185,129,0.12)] transition-all">
              <div className="flex items-start gap-4">
                <div className="w-13 h-13 rounded-2xl bg-gradient-to-br from-emerald-500 via-emerald-600 to-teal-700 text-white flex items-center justify-center flex-shrink-0 shadow-lg shadow-emerald-500/30">
                  <MessageSquare className="w-6 h-6 fill-white/20" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="text-xs font-bold text-emerald-800 uppercase tracking-wider">Instant WhatsApp Chat</h3>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                      5-15 Min Reply
                    </span>
                  </div>
                  <a
                    href={`https://wa.me/${COMPANY_INFO.contact.whatsapp}?text=${encodeURIComponent('Hello evonix, I want to discuss a requirement in Sialkot.')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-lg sm:text-xl font-black text-emerald-800 hover:text-emerald-900 transition-colors block mt-1"
                  >
                    +{COMPANY_INFO.contact.whatsappDisplay}
                  </a>
                  <div className="mt-2.5">
                    <a
                      href={`https://wa.me/${COMPANY_INFO.contact.whatsapp}?text=${encodeURIComponent('Hello evonix, I want to discuss a requirement in Sialkot.')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white text-xs font-bold shadow-md shadow-emerald-600/25 transition-all"
                    >
                      <MessageSquare className="w-3.5 h-3.5" />
                      <span>Start WhatsApp Conversation →</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* 3. Official Email Card (Colorful Sapphire/Blue) */}
            <div className="bg-gradient-to-br from-blue-50/90 via-white to-indigo-50/70 border-2 border-blue-200 rounded-3xl p-5 sm:p-6 shadow-[0_8px_25px_rgba(59,130,246,0.06)] hover:shadow-[0_12px_32px_rgba(59,130,246,0.12)] transition-all">
              <div className="flex items-start gap-4">
                <div className="w-13 h-13 rounded-2xl bg-gradient-to-br from-blue-600 via-indigo-600 to-blue-800 text-white flex items-center justify-center flex-shrink-0 shadow-lg shadow-blue-500/30">
                  <Mail className="w-6 h-6" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="text-xs font-bold text-blue-800 uppercase tracking-wider">Official Email</h3>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-100 text-blue-800">
                      Corporate RFQ
                    </span>
                  </div>
                  <a
                    href={`mailto:${COMPANY_INFO.contact.email}`}
                    className="text-base sm:text-lg font-bold text-blue-900 hover:text-blue-700 transition-colors block mt-1"
                  >
                    {COMPANY_INFO.contact.email}
                  </a>
                  <p className="text-xs text-slate-600 mt-1 font-medium">For formal tenders, export proposals & AMC agreements</p>
                </div>
              </div>
            </div>

            {/* 4. Office Address Card (Colorful Amber/Gold) */}
            <div className="bg-gradient-to-br from-amber-50/90 via-white to-orange-50/70 border-2 border-amber-200 rounded-3xl p-5 sm:p-6 shadow-[0_8px_25px_rgba(245,158,11,0.06)] hover:shadow-[0_12px_32px_rgba(245,158,11,0.12)] transition-all">
              <div className="flex items-start gap-4">
                <div className="w-13 h-13 rounded-2xl bg-gradient-to-br from-amber-500 via-amber-600 to-orange-600 text-white flex items-center justify-center flex-shrink-0 shadow-lg shadow-amber-500/30">
                  <MapPin className="w-6 h-6" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="text-xs font-bold text-amber-800 uppercase tracking-wider">Service Lab & Office</h3>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-100 text-amber-900">
                      Walk-Ins Welcome
                    </span>
                  </div>
                  <p className="text-sm font-bold text-slate-900 mt-1">
                    {COMPANY_INFO.contact.address}
                  </p>
                  <p className="text-xs text-emerald-800 font-bold mt-1.5 flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                    <span>Doorstep on-site technician dispatch across Sialkot</span>
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Colorful Interactive Inquiry Form */}
          <div className="lg:col-span-7 bg-white border-2 border-slate-200/90 rounded-3xl shadow-xl overflow-hidden relative">
            {/* Colorful Multi-Gradient Top Ribbon */}
            <div className="h-2 w-full bg-gradient-to-r from-red-600 via-amber-500 via-emerald-500 to-blue-600" />

            <div className="p-6 sm:p-8">
              {submittedRecord ? (
                <div className="text-center py-8 space-y-5">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 text-white flex items-center justify-center mx-auto shadow-lg shadow-emerald-500/30">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>

                  <h3 className="text-2xl font-black text-slate-900">
                    Thank You, {submittedRecord.fullName}!
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto leading-relaxed font-medium">
                    Your inquiry regarding <strong>{submittedRecord.serviceType}</strong> in <strong>{submittedRecord.locationArea}</strong> has been logged and routed to our technical team.
                  </p>

                  {/* Reference Number Box */}
                  <div className="max-w-md mx-auto p-5 bg-gradient-to-br from-red-50/80 via-white to-rose-50/50 border-2 border-red-200 rounded-2xl shadow-sm space-y-2">
                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest block">
                      Inquiry Reference Number
                    </span>
                    <div className="flex items-center justify-center gap-2">
                      <span className="text-2xl sm:text-3xl font-mono font-black text-red-600 tracking-wider">
                        {submittedRecord.referenceId}
                      </span>
                      <button
                        type="button"
                        onClick={handleCopyRef}
                        className="p-2 rounded-xl bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 transition-colors cursor-pointer shadow-2xs"
                        title="Copy Reference"
                      >
                        {copiedRef ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                      </button>
                    </div>
                    <p className="text-[11px] text-slate-500">
                      Dispatched to <span className="font-semibold text-slate-700">evonixtec@gmail.com</span>. Please quote this ID for immediate updates.
                    </p>
                  </div>

                  <div className="pt-2 flex flex-col sm:flex-row justify-center gap-3">
                    <a
                      href={buildWhatsAppQuoteUrl(submittedRecord)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-extrabold text-xs sm:text-sm transition-all flex items-center justify-center gap-2 shadow-md shadow-emerald-600/30"
                    >
                      <MessageSquare className="w-4 h-4" />
                      <span>Send Ref #{submittedRecord.referenceId} to WhatsApp</span>
                    </a>

                    <button
                      onClick={() => {
                        setSubmittedRecord(null);
                        setFormMessage('');
                      }}
                      className="px-5 py-3.5 rounded-xl bg-slate-100 border border-slate-300 text-slate-700 text-xs font-bold hover:bg-slate-200 transition-colors cursor-pointer"
                    >
                      Send Another Note
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="border-b border-slate-100 pb-3">
                    <span className="text-[11px] font-bold text-red-600 uppercase tracking-wider block">
                      Rapid Response Consultation
                    </span>
                    <h3 className="text-xl sm:text-2xl font-black text-slate-900 mt-0.5">
                      Send a Direct Message & Get Free Quotation
                    </h3>
                    <p className="text-xs text-slate-500 mt-1">
                      Fill out the form below. An instant Reference Code will be generated and routed directly to <span className="text-slate-800 font-bold">evonixtec@gmail.com</span>.
                    </p>
                  </div>

                  {formError && (
                    <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-semibold">
                      {formError}
                    </div>
                  )}

                  {/* Country & Name */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="contact-country" className="block text-xs font-bold text-slate-700 mb-1 flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-blue-500" />
                        <span>Your Country / Region *</span>
                      </label>
                      <select
                        id="contact-country"
                        aria-label="Your Country or Region"
                        value={selectedCountryCode}
                        onChange={(e) => {
                          setSelectedCountryCode(e.target.value);
                          const c = COUNTRIES.find((co) => co.code === e.target.value);
                          if (c && e.target.value !== 'PK') {
                            setInternationalCity(c.name === 'United Arab Emirates' ? 'Dubai, UAE' : c.name);
                          }
                        }}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50/70 border border-slate-300 text-xs sm:text-sm text-slate-900 focus:outline-none focus:border-blue-500 font-bold shadow-2xs"
                      >
                        {COUNTRIES.map((c) => (
                          <option key={c.code} value={c.code}>
                            {c.flag} {c.name} ({c.dialCode})
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label htmlFor="contact-name" className="block text-xs font-bold text-slate-700 mb-1 flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-red-500" />
                        <span>Your Full Name *</span>
                      </label>
                      <input
                        id="contact-name"
                        aria-label="Your Full Name"
                        type="text"
                        required
                        placeholder="e.g. Tariq Mehmood / John Miller"
                        value={formName}
                        onChange={(e) => setFormName(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50/70 border border-slate-300 text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-red-500 focus:bg-white focus:ring-4 focus:ring-red-500/10 transition-all shadow-2xs font-semibold"
                      />
                    </div>
                  </div>

                  {/* Phone & Email */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="contact-phone" className="block text-xs font-bold text-slate-700 mb-1 flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-emerald-500" />
                        <span>Phone / WhatsApp *</span>
                      </label>
                      <div className="flex rounded-xl shadow-2xs overflow-hidden border border-slate-300 focus-within:border-emerald-500">
                        <span className="inline-flex items-center px-3 bg-slate-100 text-slate-700 text-xs font-bold border-r border-slate-300 select-none">
                          {selectedCountry.flag} {selectedCountry.dialCode}
                        </span>
                        <input
                          id="contact-phone"
                          aria-label="Phone or WhatsApp Number"
                          type="tel"
                          required
                          placeholder={`e.g. ${selectedCountry.placeholder}`}
                          value={formPhone}
                          onChange={(e) => setFormPhone(e.target.value)}
                          className="w-full px-3 py-2.5 bg-slate-50/70 text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:bg-white font-semibold"
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="contact-email" className="block text-xs font-bold text-slate-700 mb-1 flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-blue-500" />
                        <span>Email Address (Optional)</span>
                      </label>
                      <input
                        id="contact-email"
                        aria-label="Email Address"
                        type="email"
                        placeholder="name@company.com"
                        value={formEmail}
                        onChange={(e) => setFormEmail(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50/70 border border-slate-300 text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10 transition-all shadow-2xs"
                      />
                    </div>
                  </div>

                  {/* Service & Location */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="contact-service" className="block text-xs font-bold text-slate-700 mb-1 flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-purple-500" />
                        <span>Service Required *</span>
                      </label>
                      <select
                        id="contact-service"
                        aria-label="Service Required"
                        value={formService}
                        onChange={(e) => setFormService(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50/70 border border-slate-300 text-xs sm:text-sm text-slate-900 focus:outline-none focus:border-purple-500 focus:bg-white focus:ring-4 focus:ring-purple-500/10 transition-all shadow-2xs font-semibold"
                      >
                        <option value="Website Development & Enterprise Portals">Website Development & Enterprise Portals</option>
                        <option value="Dedicated Developer Hiring & Remote Teams">💻 Dedicated Remote Developer (Save 72%)</option>
                        <option value="Software Development & Retail POS Systems">Custom Software & Retail POS</option>
                        <option value="Global Multi-Currency E-Commerce Stores">Global E-Commerce Stores (Stripe/Multi-Currency)</option>
                        <option value="Computer, Laptop & Printer Repairing">Laptop & Printer Repairing</option>
                        <option value="Doorstep Sialkot On-Site IT Visit">Doorstep On-Site Visit in Sialkot</option>
                        <option value="General Consultation">General International Inquiry</option>
                      </select>
                    </div>

                    <div>
                      <label htmlFor="contact-location" className="block text-xs font-bold text-slate-700 mb-1 flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-amber-500" />
                        <span>City / District *</span>
                      </label>
                      {selectedCountryCode === 'PK' ? (
                        <div className="bg-slate-50/70 rounded-xl border border-slate-300 overflow-hidden">
                          <SialkotLocationPicker
                            value={formLocation}
                            onChange={(area, data) => {
                              setFormLocation(area);
                              setGpsData(data);
                            }}
                            required
                          />
                        </div>
                      ) : (
                        <input
                          id="contact-location"
                          aria-label="City or District"
                          type="text"
                          required
                          placeholder="e.g. Dubai, UAE / London, UK / New York, USA"
                          value={internationalCity}
                          onChange={(e) => setInternationalCity(e.target.value)}
                          className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50/70 border border-slate-300 text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-amber-500 focus:bg-white focus:ring-4 focus:ring-amber-500/10 transition-all shadow-2xs font-semibold"
                        />
                      )}
                    </div>
                  </div>

                  <div>
                    <label htmlFor="contact-message" className="block text-xs font-bold text-slate-700 mb-1 flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-rose-500" />
                      <span>Message / Project Details *</span>
                    </label>
                    <textarea
                      id="contact-message"
                      aria-label="Message or Project Details"
                      rows={3}
                      required
                      placeholder="Briefly describe your website needs, POS software requirements, or hardware issues..."
                      value={formMessage}
                      onChange={(e) => setFormMessage(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50/70 border border-slate-300 text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-red-500 focus:bg-white focus:ring-4 focus:ring-red-500/10 transition-all shadow-2xs"
                    />
                  </div>

                  <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-gradient-to-r from-red-600 via-rose-600 to-red-700 hover:from-red-700 hover:to-rose-700 active:from-red-800 disabled:opacity-75 text-white font-black text-xs sm:text-sm shadow-md shadow-red-600/30 hover:shadow-lg hover:shadow-red-600/40 transition-all flex items-center justify-center gap-2 cursor-pointer hover:-translate-y-0.5 active:translate-y-0"
                    >
                      {isSubmitting ? (
                        <>
                          <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          <span>Routing to evonixtec@gmail.com...</span>
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4" />
                          <span>Submit & Generate Official Reference Pass</span>
                        </>
                      )}
                    </button>

                    <p className="text-[11px] text-slate-500 font-medium">
                      Immediate routing to <span className="font-bold text-slate-800">evonixtec@gmail.com</span>
                    </p>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Floating Centered Pop-up Modal for Customer with Reference Number & Email Notification */}
      <QuotationSuccessModal
        quote={submittedRecord}
        onClose={() => {
          setSubmittedRecord(null);
          setFormMessage('');
        }}
      />
    </section>
  );
};
