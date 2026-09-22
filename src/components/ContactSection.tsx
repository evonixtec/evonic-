import React, { useState } from 'react';
import { COMPANY_INFO } from '../data/content';
import { MapPin, Mail, Phone, MessageSquare, Clock, ShieldCheck, Send, CheckCircle2, ArrowRight } from 'lucide-react';
import { sanitizeInput, checkRateLimit } from '../lib/security';

interface ContactSectionProps {
  onOpenQuote: (service?: string) => void;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ onOpenQuote }) => {
  const [formName, setFormName] = useState('');
  const [formPhone, setFormPhone] = useState('');
  const [formEmail, setFormEmail] = useState('');
  const [formService, setFormService] = useState('Website Development');
  const [formMessage, setFormMessage] = useState('');
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    const rateCheck = checkRateLimit('contact_section', 3000);
    if (!rateCheck.allowed) {
      setFormError(`Please wait ${rateCheck.remainingSecs} seconds before resubmitting.`);
      return;
    }

    setFormSubmitted(true);
  };

  const getWhatsAppChatUrl = () => {
    const cleanName = sanitizeInput(formName) || 'Customer';
    const cleanPhone = sanitizeInput(formPhone) || 'Not specified';
    const cleanMessage = sanitizeInput(formMessage) || 'I would like to inquire about your IT services in Sialkot.';

    const text = `Hello EVONIX,
Name: ${cleanName}
Phone: ${cleanPhone}
Service: ${formService}
Message: ${cleanMessage}`;
    return `https://wa.me/${COMPANY_INFO.contact.whatsapp}?text=${encodeURIComponent(text)}`;
  };

  return (
    <section id="contact" className="py-20 md:py-28 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-50 border border-red-200 text-xs font-bold text-red-700">
            <Mail className="w-3.5 h-3.5 text-red-600" />
            Get in Touch With Our Team
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight">
            Contact Us & Sialkot Office
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            Ready to elevate your business with international Dubai standards? Reach out today for websites, POS software, laptop repair, or doorstep on-site visits in Sialkot.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Direct Contact Info Cards */}
          <div className="lg:col-span-5 space-y-4">
            {/* Phone */}
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 sm:p-6 shadow-2xs hover:shadow-xs transition-shadow">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-red-600 flex-shrink-0 shadow-2xs">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider">Direct Hotline</h3>
                  <a
                    href={`tel:${COMPANY_INFO.contact.phoneRaw}`}
                    className="text-base sm:text-lg font-bold text-slate-900 hover:text-red-600 transition-colors block mt-0.5"
                  >
                    {COMPANY_INFO.contact.phoneDisplay}
                  </a>
                  <p className="text-xs text-slate-500 mt-0.5">Mon - Sat: 9:00 AM - 8:00 PM</p>
                </div>
              </div>
            </div>

            {/* WhatsApp */}
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 sm:p-6 shadow-2xs hover:shadow-xs transition-shadow">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600 flex-shrink-0 shadow-2xs">
                  <MessageSquare className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider">Instant WhatsApp Chat</h3>
                  <a
                    href={`https://wa.me/${COMPANY_INFO.contact.whatsapp}?text=${encodeURIComponent('Hello EVONIX, I want to discuss a requirement in Sialkot.')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-base sm:text-lg font-bold text-emerald-700 hover:text-emerald-800 transition-colors block mt-0.5"
                  >
                    +{COMPANY_INFO.contact.whatsappDisplay}
                  </a>
                  <p className="text-xs text-slate-500 mt-0.5">Rapid response within 5-15 minutes</p>
                </div>
              </div>
            </div>

            {/* Email */}
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 sm:p-6 shadow-2xs hover:shadow-xs transition-shadow">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-blue-600 flex-shrink-0 shadow-2xs">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider">Official Email</h3>
                  <a
                    href={`mailto:${COMPANY_INFO.contact.email}`}
                    className="text-base sm:text-lg font-bold text-slate-900 hover:text-blue-600 transition-colors block mt-0.5"
                  >
                    {COMPANY_INFO.contact.email}
                  </a>
                  <p className="text-xs text-slate-500 mt-0.5">For formal proposals & corporate inquiries</p>
                </div>
              </div>
            </div>

            {/* Office Address */}
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 sm:p-6 shadow-2xs hover:shadow-xs transition-shadow">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-amber-600 flex-shrink-0 shadow-2xs">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider">Service Lab & Office</h3>
                  <p className="text-sm font-bold text-slate-900 mt-0.5">
                    {COMPANY_INFO.contact.address}
                  </p>
                  <p className="text-xs text-slate-500 mt-0.5">Doorstep pickup & on-site IT available</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Inquiry Form */}
          <div className="lg:col-span-7 bg-slate-50 border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-2xs">
            {formSubmitted ? (
              <div className="text-center py-12 space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-2xs">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-slate-900">
                  Thank You, {formName}!
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
                  Your inquiry regarding <strong>{formService}</strong> has been received. Our senior engineer will connect with you via WhatsApp or phone shortly.
                </p>
                <div className="pt-4 flex flex-wrap justify-center gap-3">
                  <a
                    href={getWhatsAppChatUrl()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm transition-colors flex items-center gap-2"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>Open in WhatsApp Now</span>
                  </a>
                  <button
                    onClick={() => {
                      setFormSubmitted(false);
                      setFormMessage('');
                    }}
                    className="px-4 py-2.5 rounded-xl bg-white border border-slate-300 text-slate-700 text-xs font-semibold hover:bg-slate-100 transition-colors cursor-pointer"
                  >
                    Send Another Note
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <h3 className="text-xl font-bold text-slate-900">
                    Send a Direct Message
                  </h3>
                  <p className="text-xs text-slate-500 mt-1">
                    Fill out the form below or connect instantly on WhatsApp.
                  </p>
                </div>

                {formError && (
                  <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-semibold">
                    {formError}
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Your Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Usman Ali"
                      value={formName}
                      onChange={(e) => setFormName(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-slate-300 text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-red-500 shadow-2xs"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Phone / WhatsApp Number *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="e.g. 0326 3244002"
                      value={formPhone}
                      onChange={(e) => setFormPhone(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-slate-300 text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-red-500 shadow-2xs"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Email Address (Optional)
                    </label>
                    <input
                      type="email"
                      placeholder="e.g. name@company.com"
                      value={formEmail}
                      onChange={(e) => setFormEmail(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-slate-300 text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-red-500 shadow-2xs"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Service Required *
                    </label>
                    <select
                      value={formService}
                      onChange={(e) => setFormService(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-slate-300 text-xs sm:text-sm text-slate-900 focus:outline-none focus:border-red-500 shadow-2xs"
                    >
                      <option value="Website Development">Website Development & E-Commerce</option>
                      <option value="Software Development & POS Systems">Custom Software & Retail POS</option>
                      <option value="Computer, Laptop & Printer Repairing">Laptop & Printer Repairing</option>
                      <option value="Doorstep Sialkot On-Site IT Visit">Doorstep On-Site Visit in Sialkot</option>
                      <option value="General Consultation">General Inquiry / Consultation</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Message / Project Details *
                  </label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Briefly describe your website needs, POS software requirements, or hardware issues..."
                    value={formMessage}
                    onChange={(e) => setFormMessage(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-slate-300 text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-red-500 shadow-2xs"
                  />
                </div>

                <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3">
                  <button
                    type="submit"
                    className="w-full sm:w-auto px-6 py-3 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs sm:text-sm shadow-2xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Send className="w-4 h-4" />
                    <span>Submit Message</span>
                  </button>

                  <a
                    href={getWhatsAppChatUrl()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto px-5 py-3 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 font-semibold text-xs sm:text-sm border border-emerald-200 transition-colors flex items-center justify-center gap-2"
                  >
                    <MessageSquare className="w-4 h-4 text-emerald-600" />
                    <span>Or Chat on WhatsApp</span>
                  </a>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
