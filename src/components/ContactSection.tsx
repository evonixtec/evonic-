import React, { useState } from 'react';
import { COMPANY_INFO } from '../data/content';
import { MapPin, Mail, Phone, MessageSquare, Clock, ShieldCheck, Send, CheckCircle2, Wrench } from 'lucide-react';
import { FadeInSection } from './FadeInSection';

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
  };

  const getWhatsAppChatUrl = () => {
    const text = `Hello EVONIX TECHNOLOGIES,
Name: ${formName || 'Customer'}
Phone: ${formPhone || 'Not specified'}
Service: ${formService}
Message: ${formMessage || 'I would like to inquire about your IT services in Sialkot.'}`;
    return `https://wa.me/${COMPANY_INFO.contact.whatsapp}?text=${encodeURIComponent(text)}`;
  };

  return (
    <section id="contact" className="py-20 bg-slate-950 border-t border-slate-800/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <FadeInSection direction="up" delay={50} duration={600}>
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-800/60 text-xs font-semibold text-cyan-300">
              <Mail className="w-3.5 h-3.5" />
              Get in Touch With Our Team
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Contact Us
            </h2>
            <p className="text-slate-400 text-sm sm:text-base">
              Ready to elevate your business with international Dubai standards? Reach out today for websites, POS software, laptop repair, or doorstep on-site visits in Sialkot.
            </p>
          </div>
        </FadeInSection>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left 5 Cols: Contact Information & Sialkot Service Coverage */}
          <FadeInSection direction="up" delay={100} duration={700} className="lg:col-span-5 space-y-6">
            {/* Contact Details Card */}
            <div className="rounded-2xl bg-slate-900/60 border border-slate-800 p-6 sm:p-7 space-y-5 shadow-xl">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-cyan-400"></span>
                Headquarters & Sialkot Service Desk
              </h3>

              <div className="space-y-4 text-sm text-slate-300">
                <div className="flex items-start gap-3.5">
                  <div className="p-2.5 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 flex-shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="font-semibold text-white">Location & Coverage</div>
                    <div className="text-slate-400 text-xs mt-0.5">
                      {COMPANY_INFO.contact.city}, {COMPANY_INFO.contact.region}
                    </div>
                    <div className="text-cyan-400 text-[11px] mt-0.5 font-medium">
                      Doorstep On-Site Service across entire city
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex-shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="font-semibold text-white">Official Email</div>
                    <a
                      href={`mailto:${COMPANY_INFO.contact.email}`}
                      className="text-slate-400 hover:text-cyan-300 text-xs mt-0.5 block transition-colors font-mono"
                    >
                      {COMPANY_INFO.contact.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="p-2.5 rounded-xl bg-blue-500/10 text-blue-400 border border-blue-500/20 flex-shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="font-semibold text-white">Direct Phone & WhatsApp</div>
                    <a
                      href={`tel:${COMPANY_INFO.contact.phoneRaw}`}
                      className="text-cyan-400 hover:text-cyan-300 text-xs mt-0.5 block font-mono font-medium transition-colors"
                    >
                      {COMPANY_INFO.contact.phoneDisplay} (Call Now)
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex-shrink-0">
                    <MessageSquare className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="font-semibold text-white">WhatsApp Fast Chat</div>
                    <a
                      href={`https://wa.me/${COMPANY_INFO.contact.whatsapp}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-emerald-400 hover:underline text-xs mt-0.5 block font-medium"
                    >
                      {COMPANY_INFO.contact.whatsappDisplay} (Click to Chat)
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20 flex-shrink-0">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="font-semibold text-white">Working Hours</div>
                    <div className="text-slate-400 text-xs mt-0.5">
                      {COMPANY_INFO.contact.hours}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Sialkot Localities Coverage Card */}
            <div className="rounded-2xl bg-slate-900/40 border border-slate-800 p-6 space-y-3">
              <h4 className="text-sm font-bold text-white flex items-center gap-2">
                <Wrench className="w-4 h-4 text-amber-400" />
                Sialkot Doorstep Service Areas
              </h4>
              <p className="text-xs text-slate-400">
                Our technicians are mobile and equipped to visit your workplace or home across:
              </p>
              <div className="flex flex-wrap gap-1.5 pt-1">
                {COMPANY_INFO.contact.homeServiceAreas.map((area, idx) => (
                  <span
                    key={idx}
                    className="px-2.5 py-1 rounded-md text-[11px] font-medium bg-slate-950 text-slate-300 border border-slate-800"
                  >
                    {area}
                  </span>
                ))}
              </div>
            </div>
          </FadeInSection>

          {/* Right 7 Cols: Interactive Message & Quote Request Form */}
          <FadeInSection direction="up" delay={200} duration={700} className="lg:col-span-7">
            <div className="rounded-2xl bg-slate-900/70 border border-slate-800 p-6 sm:p-8 shadow-2xl relative">
              <div className="flex items-center justify-between pb-4 mb-6 border-b border-slate-800">
                <div>
                  <h3 className="text-lg sm:text-xl font-bold text-white">
                    Send Us an Instant Inquiry
                  </h3>
                  <p className="text-xs text-slate-400 mt-0.5">
                    We usually respond within 30 minutes during working hours.
                  </p>
                </div>
                <span className="hidden sm:inline-flex items-center gap-1 text-xs px-2.5 py-1 rounded-full bg-cyan-950 text-cyan-300 border border-cyan-800 font-medium">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  Fast Response
                </span>
              </div>

              {formSubmitted ? (
                <div className="py-10 text-center space-y-4">
                  <div className="w-14 h-14 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 mx-auto flex items-center justify-center">
                    <CheckCircle2 className="w-7 h-7" />
                  </div>
                  <h4 className="text-xl font-bold text-white">
                    Message Received!
                  </h4>
                  <p className="text-slate-300 text-xs sm:text-sm max-w-md mx-auto">
                    Thank you <span className="text-cyan-400 font-semibold">{formName}</span>. Your inquiry for{' '}
                    <span className="text-cyan-400 font-semibold">{formService}</span> has been sent to our Sialkot office.
                  </p>
                  <div className="pt-3 flex flex-col sm:flex-row items-center justify-center gap-3">
                    <a
                      href={getWhatsAppChatUrl()}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center justify-center gap-2"
                    >
                      <MessageSquare className="w-4 h-4" />
                      Open in WhatsApp Now
                    </a>
                    <button
                      onClick={() => setFormSubmitted(false)}
                      className="text-xs text-slate-400 hover:text-white cursor-pointer"
                    >
                      Send Another Message
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-slate-300 mb-1.5">
                        Your Name <span className="text-cyan-400">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={formName}
                        onChange={(e) => setFormName(e.target.value)}
                        placeholder="Muhammad Bilal"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white text-sm focus:outline-none focus:border-cyan-500 placeholder-slate-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-slate-300 mb-1.5">
                        WhatsApp / Phone <span className="text-cyan-400">*</span>
                      </label>
                      <input
                        type="tel"
                        required
                        value={formPhone}
                        onChange={(e) => setFormPhone(e.target.value)}
                        placeholder="0326 3244002"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white text-sm focus:outline-none focus:border-cyan-500 placeholder-slate-500"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-slate-300 mb-1.5">
                        Email Address
                      </label>
                      <input
                        type="email"
                        value={formEmail}
                        onChange={(e) => setFormEmail(e.target.value)}
                        placeholder="bilal@example.com"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white text-sm focus:outline-none focus:border-cyan-500 placeholder-slate-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-slate-300 mb-1.5">
                        Service of Interest
                      </label>
                      <select
                        value={formService}
                        onChange={(e) => setFormService(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white text-sm focus:outline-none focus:border-cyan-500"
                      >
                        <option value="Website Development">Service 1: Website Development</option>
                        <option value="Software & Mobile App Development">Service 2: Software & POS Systems</option>
                        <option value="Computer, Laptop & Printer Services">Service 3: Computer, Laptop & Printer Services</option>
                        <option value="On-Site Home & Office Service">Service 4: On-Site Home & Office Service in Sialkot</option>
                        <option value="Hardware / Laptop / POS Purchase">Hardware & Shop Equipment Purchase</option>
                        <option value="Private Portfolio Case Study">Private Portfolio Case Study (NDA)</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1.5">
                      Your Message or Address
                    </label>
                    <textarea
                      rows={4}
                      required
                      value={formMessage}
                      onChange={(e) => setFormMessage(e.target.value)}
                      placeholder="Please specify what you need: e.g. We need a modern e-commerce website for our sports goods company, or laptop screen replacement at Paris Road..."
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white text-sm focus:outline-none focus:border-cyan-500 placeholder-slate-500"
                    />
                  </div>

                  <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <p className="text-[11px] text-slate-400 text-center sm:text-left">
                      Email to: <span className="text-white font-mono">{COMPANY_INFO.contact.email}</span>
                    </p>
                    <button
                      type="submit"
                      className="w-full sm:w-auto px-7 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-sm shadow-md shadow-cyan-500/20 flex items-center justify-center gap-2 cursor-pointer transition-all"
                    >
                      <Send className="w-4 h-4 text-slate-950" />
                      Send Message
                    </button>
                  </div>
                </form>
              )}
            </div>
          </FadeInSection>
        </div>
      </div>
    </section>
  );
};
