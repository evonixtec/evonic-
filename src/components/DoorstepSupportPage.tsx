import React, { useState } from 'react';
import {
  Wrench,
  Clock,
  ShieldCheck,
  Phone,
  MessageSquare,
  CheckCircle2,
  MapPin,
  AlertTriangle,
  Send,
  Building2,
  Cpu,
  Wifi,
  Printer
} from 'lucide-react';
import { COMPANY_INFO } from '../data/content';
import { NavPageId } from './Navbar';
import { sanitizeInput, checkRateLimit } from '../lib/security';

interface DoorstepSupportPageProps {
  onNavigatePage: (page: NavPageId, subTarget?: string) => void;
  onOpenQuote: (serviceType?: string) => void;
}

export const DoorstepSupportPage: React.FC<DoorstepSupportPageProps> = ({
  onNavigatePage,
  onOpenQuote
}) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [company, setCompany] = useState('');
  const [area, setArea] = useState('Kotli Behram / Paris Road');
  const [problem, setProblem] = useState('');
  const [urgency, setUrgency] = useState<'emergency' | 'standard'>('emergency');
  const [ticketId, setTicketId] = useState<string | null>(null);
  const [formError, setFormError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim() || !phone.trim()) {
      setFormError('Please enter your name and phone number.');
      return;
    }

    const rateOk = checkRateLimit('doorstep_form', 4, 60000);
    if (!rateOk) {
      setFormError('Too many attempts. Please wait 1 minute.');
      return;
    }

    setFormError(null);
    const code = `EVO-DISPATCH-${Math.floor(1000 + Math.random() * 9000)}`;
    setTicketId(code);
  };

  const handleWhatsApp = () => {
    const text =
      `*evonix Doorstep IT Dispatch Request*\n` +
      `Ticket: *${ticketId || 'New'}*\n` +
      `Name: ${sanitizeInput(name)}\n` +
      `Phone: ${sanitizeInput(phone)}\n` +
      `Company: ${sanitizeInput(company || 'Personal')}\n` +
      `Location: ${area}\n` +
      `Urgency: ${urgency === 'emergency' ? 'URGENT (45-Min Arrival)' : 'Standard'}\n` +
      `Issue: ${sanitizeInput(problem || 'IT Hardware issue')}`;

    const url = `https://wa.me/${COMPANY_INFO.contact.whatsapp}?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="bg-slate-50 min-h-screen text-slate-900 pb-20">
      {/* Hero Header */}
      <section className="bg-gradient-to-b from-slate-900 via-slate-900 to-slate-800 text-white pt-28 pb-16 px-4 sm:px-6 lg:px-8 border-b border-slate-700">
        <div className="max-w-5xl mx-auto text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-red-500/20 text-red-400 border border-red-500/30 text-xs font-semibold uppercase tracking-wider">
            <Clock className="w-3.5 h-3.5" />
            <span>45-Min Emergency Field Dispatch</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
            Doorstep IT Support & On-Site Hardware Repair in Sialkot
          </h1>

          <p className="text-slate-300 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            Need an IT engineer right now? We send certified technicians to your factory, office, or home in Sialkot.
          </p>

          <div className="pt-2 flex flex-wrap justify-center gap-3">
            <button
              onClick={() => onOpenQuote('Doorstep IT Engineer Visit')}
              className="px-6 py-3 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold text-sm shadow-lg shadow-red-600/30 transition-all flex items-center gap-2 cursor-pointer"
            >
              <Wrench className="w-4 h-4" />
              <span>Book An On-Site Engineer</span>
            </button>
            <a
              href={`https://wa.me/${COMPANY_INFO.contact.whatsapp}?text=${encodeURIComponent('Hello evonix, I need urgent doorstep IT support in Sialkot.')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm shadow-lg shadow-emerald-600/30 transition-all flex items-center gap-2"
            >
              <MessageSquare className="w-4 h-4" />
              <span>WhatsApp Us Now</span>
            </a>
          </div>
        </div>
      </section>

      {/* Main Content Layout */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 space-y-12">
        {/* Coverage Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3">
            <div className="w-10 h-10 rounded-xl bg-red-50 flex items-center justify-center text-red-600">
              <Clock className="w-5 h-5" />
            </div>
            <h2 className="text-lg font-bold">Fast Sialkot Dispatch</h2>
            <p className="text-slate-600 text-sm leading-relaxed">
              We arrive in 45 minutes across Kotli Behram, Paris Road, Sialkot Cantt, and Small Industrial Estate.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3">
            <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600">
              <Wrench className="w-5 h-5" />
            </div>
            <h2 className="text-lg font-bold">Chip & Board Repair</h2>
            <p className="text-slate-600 text-sm leading-relaxed">
              We fix dead laptops, broken power rails, thermal paste issues, and noisy cooling fans on your site.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-600">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h2 className="text-lg font-bold">90-Day Warranty</h2>
            <p className="text-slate-600 text-sm leading-relaxed">
              All hardware fixes come with 90-day peace of mind. If the same issue happens, we return for free.
            </p>
          </div>
        </div>

        {/* Dispatch Pass Generator Form */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-md">
          <div className="max-w-2xl mx-auto space-y-6">
            <div className="text-center space-y-2">
              <h2 className="text-2xl font-bold text-slate-900">Request An On-Site Visit</h2>
              <p className="text-slate-600 text-sm">
                Fill this short form. Our mobile van receives your location immediately.
              </p>
            </div>

            {formError && (
              <div className="p-3 bg-red-50 text-red-700 text-xs font-semibold rounded-xl border border-red-200 flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 flex-shrink-0" />
                <span>{formError}</span>
              </div>
            )}

            {ticketId ? (
              <div className="p-6 bg-emerald-50 rounded-2xl border border-emerald-200 text-center space-y-4">
                <div className="w-12 h-12 mx-auto rounded-full bg-emerald-600 text-white flex items-center justify-center">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-emerald-900">Your Dispatch Ticket Is Ready!</h3>
                <p className="text-emerald-800 text-sm">
                  Ticket Code: <strong className="font-mono text-base">{ticketId}</strong>
                </p>
                <button
                  onClick={handleWhatsApp}
                  className="px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm shadow-md transition-all flex items-center gap-2 mx-auto cursor-pointer"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Send Ticket to WhatsApp</span>
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Your Full Name *</label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Tariq Mehmood"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:border-red-500 focus:outline-none"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Phone / WhatsApp *</label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="e.g. 0300 1234567"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:border-red-500 focus:outline-none"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Company / Factory Name</label>
                    <input
                      type="text"
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                      placeholder="Optional"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:border-red-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Sialkot Sector</label>
                    <select
                      value={area}
                      onChange={(e) => setArea(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:border-red-500 focus:outline-none bg-white"
                    >
                      <option value="Kotli Behram / Paris Road">Kotli Behram / Paris Road</option>
                      <option value="Sialkot Cantt">Sialkot Cantt</option>
                      <option value="Small Industrial Estate (SIE 1 & 2)">Small Industrial Estate (SIE 1 & 2)</option>
                      <option value="Daska Road Industrial Hub">Daska Road Industrial Hub</option>
                      <option value="Sambrial Dry Port & SIAL Airport">Sambrial Dry Port & SIAL Airport</option>
                      <option value="Wazirabad Cutlery Corridor">Wazirabad Cutlery Corridor</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Describe The Issue</label>
                  <textarea
                    rows={3}
                    value={problem}
                    onChange={(e) => setProblem(e.target.value)}
                    placeholder="e.g. Factory network switch is down. Server cannot connect to accounting POS."
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:border-red-500 focus:outline-none"
                  ></textarea>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Arrival Urgency</label>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => setUrgency('emergency')}
                      className={`py-2.5 px-3 rounded-xl border text-xs font-bold transition-all ${
                        urgency === 'emergency'
                          ? 'bg-red-50 border-red-500 text-red-700'
                          : 'border-slate-300 text-slate-600'
                      }`}
                    >
                      Emergency (45-Min Arrival)
                    </button>
                    <button
                      type="button"
                      onClick={() => setUrgency('standard')}
                      className={`py-2.5 px-3 rounded-xl border text-xs font-bold transition-all ${
                        urgency === 'standard'
                          ? 'bg-blue-50 border-blue-500 text-blue-700'
                          : 'border-slate-300 text-slate-600'
                      }`}
                    >
                      Standard Visit (Today)
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>Generate Dispatch Pass</span>
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Services Solved at Doorstep */}
        <div className="space-y-6">
          <div className="text-center space-y-2">
            <h2 className="text-2xl font-bold">What We Fix At Your Doorstep</h2>
            <p className="text-slate-600 text-sm">
              Certified Dubai standard engineers ready for any factory outage.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white p-5 rounded-2xl border border-slate-200 space-y-2">
              <Wifi className="w-6 h-6 text-red-600" />
              <h3 className="font-bold text-sm">Factory Network Down</h3>
              <p className="text-slate-600 text-xs leading-relaxed">
                We fix optical fiber cuts, broken switches, and internet failover issues in export units.
              </p>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200 space-y-2">
              <Printer className="w-6 h-6 text-orange-600" />
              <h3 className="font-bold text-sm">Barcode & POS Printers</h3>
              <p className="text-slate-600 text-xs leading-relaxed">
                We clean thermal printer heads, unjam shipping label cutters, and setup network drivers.
              </p>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200 space-y-2">
              <Cpu className="w-6 h-6 text-blue-600" />
              <h3 className="font-bold text-sm">Dead Workstations</h3>
              <p className="text-slate-600 text-xs leading-relaxed">
                We test power supplies, replace bad RAM, install fast SSDs, and rescue lost files.
              </p>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200 space-y-2">
              <Building2 className="w-6 h-6 text-emerald-600" />
              <h3 className="font-bold text-sm">WeBOC Customs PCs</h3>
              <p className="text-slate-600 text-xs leading-relaxed">
                We set up safe digital tokens, fix Java gateway bugs, and restore customs portal access.
              </p>
            </div>
          </div>
        </div>

        {/* Direct Contact Banner Rule 4 */}
        <div className="bg-slate-900 text-white p-8 rounded-3xl text-center space-y-4">
          <h2 className="text-2xl font-bold">Got a question? Call us. We reply in 2 hours.</h2>
          <p className="text-slate-300 text-sm">
            Our physical lab is at Kotli Behram, Sialkot. You can call our support team anytime.
          </p>
          <div className="flex flex-wrap justify-center gap-4 pt-2">
            <a
              href={`tel:${COMPANY_INFO.contact.phoneRaw}`}
              className="px-6 py-3 rounded-xl bg-white text-slate-900 font-bold text-sm hover:bg-slate-100 transition-all flex items-center gap-2"
            >
              <Phone className="w-4 h-4 text-red-600" />
              <span>{COMPANY_INFO.contact.phoneDisplay}</span>
            </a>
            <button
              onClick={() => onNavigatePage('contact')}
              className="px-6 py-3 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold text-sm transition-all cursor-pointer"
            >
              <span>Visit Contact Page</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
