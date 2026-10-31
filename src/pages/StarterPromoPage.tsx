import React, { useEffect } from 'react';
import {
  CheckCircle2,
  MessageCircle,
  Phone,
  ShieldCheck,
  Zap,
  Globe,
  Mail,
  Clock,
  Sparkles,
  Server,
  ArrowRight,
  HelpCircle,
} from 'lucide-react';

export const StarterPromoPage: React.FC = () => {
  const whatsappNumber = '923263244002';

  // Apply noindex, nofollow directive strictly so this campaign does not index on Google
  useEffect(() => {
    const metaRobots = document.querySelector('meta[name="robots"]');
    const prevRobots = metaRobots?.getAttribute('content') || 'index, follow';

    const updateTag = (name: string, content: string) => {
      let el = document.querySelector(`meta[name="${name}"]`);
      if (!el) {
        el = document.createElement('meta');
        el.setAttribute('name', name);
        document.head.appendChild(el);
      }
      el.setAttribute('content', content);
    };

    updateTag('robots', 'noindex, nofollow');
    updateTag('googlebot', 'noindex, nofollow');
    updateTag('bingbot', 'noindex, nofollow');
    document.title = 'November Business Web Starter Pack | Evonix Technologies';

    return () => {
      updateTag('robots', prevRobots);
      updateTag('googlebot', prevRobots);
      updateTag('bingbot', prevRobots);
    };
  }, []);

  const getWhatsAppLink = (pkgName: string) => {
    const text = encodeURIComponent(
      `Hello Evonix Technologies, I want to book the "${pkgName}" November offer for my business.`
    );
    return `https://wa.me/${whatsappNumber}?text=${text}`;
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 antialiased selection:bg-blue-600 selection:text-white">
      {/* Header Bar */}
      <header className="border-b border-slate-800/80 bg-slate-950/80 backdrop-blur sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="font-black text-xl tracking-tight text-white">
              EVONIX <span className="text-blue-500 font-medium text-sm">PROMO</span>
            </span>
          </div>
          <div className="flex items-center gap-3">
            <a
              href="tel:+923263244002"
              className="hidden sm:inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-slate-200 transition-colors"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>+92 326 324 4002</span>
            </a>
            <a
              href={getWhatsAppLink('General Inquiry')}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs md:text-sm font-semibold px-4 py-2 rounded-lg transition-all shadow-lg shadow-emerald-950/40"
            >
              <MessageCircle className="w-4 h-4" />
              <span>WhatsApp Direct</span>
            </a>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-16 md:py-24 px-4 text-center max-w-4xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-blue-500/30 bg-blue-500/10 text-blue-400 text-xs font-semibold uppercase tracking-wider mb-6">
          <Clock className="w-3.5 h-3.5" />
          November Special Offer — Strictly Limited to 10 Slots
        </div>

        <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-white mb-6 leading-tight">
          Launch Your Modern Business Website in{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
            Under 5 Days
          </span>
        </h1>

        <p className="text-slate-400 text-base md:text-lg max-w-2xl mx-auto mb-10 leading-relaxed">
          Upgrade from basic business cards and social pages to a high-speed, modern web presence tailored for Sialkot, Punjab businesses, and exporters.
        </p>

        {/* Quick Highlights */}
        <div className="flex flex-wrap justify-center gap-4 sm:gap-6 text-xs md:text-sm text-slate-300 mb-12">
          <span className="flex items-center gap-1.5 bg-slate-900 border border-slate-800 px-3.5 py-1.5 rounded-md">
            <Zap className="w-4 h-4 text-amber-400" /> Ultra-Fast Loading
          </span>
          <span className="flex items-center gap-1.5 bg-slate-900 border border-slate-800 px-3.5 py-1.5 rounded-md">
            <ShieldCheck className="w-4 h-4 text-emerald-400" /> 100% Mobile Optimized
          </span>
          <span className="flex items-center gap-1.5 bg-slate-900 border border-slate-800 px-3.5 py-1.5 rounded-md">
            <Globe className="w-4 h-4 text-blue-400" /> Direct WhatsApp Integration
          </span>
        </div>
      </section>

      {/* Pricing Comparison Cards */}
      <section className="max-w-5xl mx-auto px-4 pb-20">
        <div className="grid md:grid-cols-2 gap-8 items-stretch">
          {/* Package 1: Starter Pack */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 md:p-8 flex flex-col justify-between hover:border-slate-700 transition-all">
            <div>
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-bold text-white">Starter Website</h3>
                  <p className="text-xs text-slate-400 mt-1">
                    For businesses with existing hosting or simple landing needs
                  </p>
                </div>
                <span className="bg-slate-800 text-slate-300 text-xs font-semibold px-2.5 py-1 rounded">
                  3-4 Days
                </span>
              </div>

              <div className="mb-6 pb-6 border-b border-slate-800">
                <span className="text-4xl font-extrabold text-white">PKR 20,000</span>
                <span className="text-xs text-slate-400 block mt-1">
                  Excludes domain & cloud hosting (Client provides)
                </span>
              </div>

              <ul className="space-y-3.5 text-sm text-slate-300 mb-8">
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                  <span>1 to 3 Pages High-Converting Business Portfolio</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                  <span>100% Mobile, Tablet & Desktop Responsive Layout</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                  <span>Direct WhatsApp Floating Chat & Instant Call Button</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                  <span>Google Maps Location & Social Media Integration</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                  <span>Fast Turnaround: Live in 3-4 Working Days</span>
                </li>
                <li className="flex items-start gap-2.5 text-slate-400">
                  <Server className="w-4 h-4 text-slate-500 shrink-0 mt-0.5" />
                  <span>Client provides domain & cPanel/Hosting credentials</span>
                </li>
              </ul>
            </div>

            <a
              href={getWhatsAppLink('Starter Website (PKR 20,000)')}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 bg-slate-800 hover:bg-slate-700 text-white font-semibold py-3 px-4 rounded-xl transition-all border border-slate-700"
            >
              <MessageCircle className="w-4 h-4 text-emerald-400" />
              <span>Book Starter Package</span>
            </a>
          </div>

          {/* Package 2: Full Business Suite */}
          <div className="bg-gradient-to-b from-blue-950/40 via-slate-900 to-slate-900 border-2 border-blue-500/80 rounded-2xl p-6 md:p-8 flex flex-col justify-between relative shadow-2xl shadow-blue-950/50">
            <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-blue-600 text-white text-xs font-bold uppercase tracking-wider py-1 px-4 rounded-full flex items-center gap-1.5 shadow-md">
              <Sparkles className="w-3 h-3" /> Most Popular Choice
            </div>

            <div>
              <div className="flex justify-between items-start mb-4 mt-1">
                <div>
                  <h3 className="text-xl font-bold text-white">Full Business Suite</h3>
                  <p className="text-xs text-blue-300/80 mt-1">
                    Complete turnkey solution — zero technical setup required
                  </p>
                </div>
                <span className="bg-blue-950 border border-blue-800 text-blue-300 text-xs font-semibold px-2.5 py-1 rounded">
                  4-5 Days
                </span>
              </div>

              <div className="mb-6 pb-6 border-b border-slate-800">
                <span className="text-4xl font-extrabold text-white">PKR 30,000</span>
                <span className="text-xs text-emerald-400 font-medium block mt-1">
                  All-Inclusive: Free .com Domain + Cloud Hosting for 1 Year
                </span>
              </div>

              <ul className="space-y-3.5 text-sm text-slate-200 mb-8">
                <li className="flex items-start gap-2.5 font-semibold text-white">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>Free .com Domain Registration (1 Year Included)</span>
                </li>
                <li className="flex items-start gap-2.5 font-semibold text-white">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>High-Speed Cloud SSD Hosting (1 Year Included)</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                  <span>Up to 5 Business Pages (Home, About, Services, Products, Contact)</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                  <span>Up to 3 Professional Business Email Accounts (@yourcompany.com)</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                  <span>Direct WhatsApp Floating Chat & Instant Call Button</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                  <span>Basic On-Page SEO (Google Search Console Setup & Meta Tags)</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                  <span>Standard Turnaround: Live in 4-5 Working Days</span>
                </li>
              </ul>
            </div>

            <a
              href={getWhatsAppLink('Full Business Suite (PKR 30,000)')}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500 text-white font-bold py-3.5 px-4 rounded-xl transition-all shadow-lg shadow-blue-600/30"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Book Full Suite Package</span>
            </a>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="border-t border-slate-900 bg-slate-950 py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-center text-white mb-12">
            Simple 3-Step Process
          </h2>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-slate-900/60 border border-slate-800 p-6 rounded-xl">
              <div className="w-8 h-8 rounded-lg bg-blue-600/20 text-blue-400 font-bold flex items-center justify-center mb-4">
                1
              </div>
              <h3 className="font-bold text-white mb-2">Share Details</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Send us your logo, business profile, and phone number via WhatsApp.
              </p>
            </div>

            <div className="bg-slate-900/60 border border-slate-800 p-6 rounded-xl">
              <div className="w-8 h-8 rounded-lg bg-blue-600/20 text-blue-400 font-bold flex items-center justify-center mb-4">
                2
              </div>
              <h3 className="font-bold text-white mb-2">We Design & Build</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Our engineering team builds your modern responsive site in 3-5 days.
              </p>
            </div>

            <div className="bg-slate-900/60 border border-slate-800 p-6 rounded-xl">
              <div className="w-8 h-8 rounded-lg bg-emerald-600/20 text-emerald-400 font-bold flex items-center justify-center mb-4">
                3
              </div>
              <h3 className="font-bold text-white mb-2">Go Live & Grow</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Review your website, connect your domain, and start receiving leads.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Enterprise Reassurance & Scope Note */}
      <section className="py-12 px-4 max-w-3xl mx-auto text-center border-t border-slate-900">
        <p className="text-xs text-slate-500 leading-relaxed">
          Evonix Technologies Sialkot • Diagnostic & Engineering Hub. This special promotional campaign is available for limited slots only. For large enterprise ERP, WeBOC customs integrations, or multi-branch architectures, visit our main agency portal.
        </p>
      </section>
    </div>
  );
};
