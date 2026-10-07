import React, { useState } from 'react';
import { ContactShapeCanvas } from './3d/ContactShapeCanvas';
import { Send, CheckCircle2, MessageSquare, Mail, Phone, MapPin, Sparkles } from 'lucide-react';
import { COMPANY_INFO } from '../data/content';

export const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    service: 'web-dev',
    budget: '$3k-$10k',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 600);
  };

  const handleWhatsAppDirect = () => {
    const text = encodeURIComponent(
      `Hello EVONIXTEC! I'm interested in starting a project regarding ${formData.service || 'software development'}. My name is ${formData.name || 'there'}.`
    );
    window.open(`https://wa.me/${COMPANY_INFO.contact.whatsapp}?text=${text}`, '_blank');
  };

  return (
    <section id="contact" className="relative py-24 sm:py-32 bg-[#0a0a0f] border-t border-white/5">
      {/* Background Glow */}
      <div className="absolute bottom-1/4 right-1/4 w-[450px] h-[450px] bg-[#00D4FF]/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="text-xs font-mono text-slate-400">
            <span>04. Initiation</span>
            <span aria-hidden="true"> · </span>
            <span className="text-[#00D4FF]">Schedule Architecture Discovery</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black font-display tracking-tight text-white uppercase">
            Let's Engineer Your <br />
            <span className="text-gradient-cyan-purple">Next Breakthrough</span>
          </h2>

          <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
            Have a web, mobile, or enterprise AI challenge? Talk directly with our engineering directors. Guaranteed confidential response within 12 hours.
          </p>
        </div>

        {/* 2-Column Layout: 3D Shape & Contact Info / Interactive Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Column: 3D Quantum Core Shape & Direct Channels */}
          <div className="lg:col-span-5 space-y-8">
            <div className="rounded-3xl glass-panel border border-white/10 p-4 sm:p-6 relative overflow-hidden">
              <ContactShapeCanvas />
            </div>

            {/* Direct Contact Cards */}
            <div className="space-y-3">
              <div className="p-4 rounded-2xl glass-panel border border-white/10 flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-cyan-950/60 border border-cyan-800 text-[#00D4FF] flex items-center justify-center flex-shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-mono text-slate-400">Direct Engineering Inbox</div>
                  <a
                    href={`mailto:${COMPANY_INFO.contact.email}`}
                    className="text-sm font-bold text-white hover:text-[#00D4FF] transition-colors"
                  >
                    {COMPANY_INFO.contact.email}
                  </a>
                </div>
              </div>

              <div className="p-4 rounded-2xl glass-panel border border-white/10 flex items-center justify-between">
                <div className="flex items-center gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-emerald-950/60 border border-emerald-800 text-emerald-400 flex items-center justify-center flex-shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs font-mono text-slate-400">WhatsApp &amp; Direct Phone</div>
                    <div className="text-sm font-bold text-white">
                      {COMPANY_INFO.contact.phoneDisplay}
                    </div>
                  </div>
                </div>

                <button
                  onClick={handleWhatsAppDirect}
                  className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-black font-bold text-xs font-mono cursor-pointer transition-colors"
                >
                  Chat Now
                </button>
              </div>

              <div className="p-4 rounded-2xl glass-panel border border-white/10 flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-purple-950/60 border border-purple-800 text-[#A855F7] flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-mono text-slate-400">Main Lab &amp; Office</div>
                  <div className="text-xs text-slate-300">
                    {COMPANY_INFO.contact.address}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Proposal Form */}
          <div className="lg:col-span-7">
            <div className="rounded-3xl glass-panel-glow border border-white/10 p-8 sm:p-10 relative">
              {submitted ? (
                <div className="text-center py-12 space-y-4 animate-fadeIn">
                  <div className="w-16 h-16 rounded-2xl bg-emerald-950 border border-emerald-500/50 text-emerald-400 flex items-center justify-center mx-auto shadow-[0_0_30px_rgba(16,185,129,0.3)]">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-bold font-display text-white">
                    Discovery Request Transmitted
                  </h3>
                  <p className="text-sm text-slate-300 max-w-md mx-auto leading-relaxed">
                    Thank you, {formData.name || 'there'}. Our senior software architects have received your requirements and will reach out to <strong>{formData.email}</strong> within 12 hours.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="mt-4 px-5 py-2.5 rounded-xl glass-panel text-xs font-mono text-[#00D4FF] hover:border-[#00D4FF] cursor-pointer"
                  >
                    Submit Another Inquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <h3 className="text-xl font-bold font-display text-white">
                      Project Specification Form
                    </h3>
                    <p className="text-xs font-mono text-slate-400 mt-1">
                      Fill out your technical requirements for rapid scoping
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-mono text-slate-300">Your Full Name</label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. Alex Henderson"
                        className="w-full px-4 py-3 rounded-xl bg-slate-900/80 border border-white/10 text-white text-sm focus:outline-hidden focus:border-[#00D4FF] transition-colors"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-mono text-slate-300">Work Email Address</label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="alex@company.com"
                        className="w-full px-4 py-3 rounded-xl bg-slate-900/80 border border-white/10 text-white text-sm focus:outline-hidden focus:border-[#00D4FF] transition-colors"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-mono text-slate-300">Target Capability</label>
                      <select
                        value={formData.service}
                        onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-white/10 text-white text-sm focus:outline-hidden focus:border-[#00D4FF]"
                      >
                        <option value="web-dev">Web Development &amp; 3D Three.js</option>
                        <option value="app-dev">Mobile App Development (iOS &amp; Android)</option>
                        <option value="ai-solutions">Enterprise AI &amp; Neural RAG</option>
                        <option value="custom-software">Custom SaaS &amp; Cloud Platform</option>
                        <option value="consultancy">IT Consultancy &amp; Hardware Diagnostics</option>
                      </select>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-mono text-slate-300">Estimated Budget Scope</label>
                      <select
                        value={formData.budget}
                        onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-white/10 text-white text-sm focus:outline-hidden focus:border-[#00D4FF]"
                      >
                        <option value="$3k-$10k">$3,000 – $10,000 USD</option>
                        <option value="$10k-$25k">$10,000 – $25,000 USD</option>
                        <option value="$25k-$50k">$25,000 – $50,000 USD</option>
                        <option value="$50k+">$50,000+ Enterprise Scale</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-mono text-slate-300">Project Overview &amp; Goals</label>
                    <textarea
                      rows={4}
                      required
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Describe what you want to build, existing tech stack, target timeline..."
                      className="w-full px-4 py-3 rounded-xl bg-slate-900/80 border border-white/10 text-white text-sm focus:outline-hidden focus:border-[#00D4FF] transition-colors"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-4 rounded-xl bg-gradient-to-r from-[#00D4FF] via-[#38bdf8] to-[#A855F7] text-black font-bold font-sora text-sm sm:text-base hover:opacity-95 shadow-[0_0_30px_rgba(0,212,255,0.4)] transition-all cursor-pointer flex items-center justify-center gap-2"
                  >
                    {loading ? (
                      <span className="flex items-center gap-2 font-mono text-xs">
                        <span className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
                        Transmitting Proposal...
                      </span>
                    ) : (
                      <>
                        <Send className="w-4 h-4 stroke-[2.5]" />
                        <span>Send Architecture Request</span>
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
