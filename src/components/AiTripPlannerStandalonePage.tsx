import React from 'react';
import {
  Sparkles,
  Plane,
  Calendar,
  Compass,
  ArrowRight,
  BookOpen,
  HelpCircle,
  Phone,
  ChevronRight,
  MapPin,
  CheckCircle2
} from 'lucide-react';
import { AiTripPlannerTool } from './AiTripPlannerTool';
import { COMPANY_INFO } from '../data/content';

interface AiTripPlannerStandalonePageProps {
  onNavigatePage: (page: string) => void;
  onOpenQuote?: () => void;
}

export const AiTripPlannerStandalonePage: React.FC<AiTripPlannerStandalonePageProps> = ({
  onNavigatePage,
  onOpenQuote
}) => {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-10">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumbs" className="flex items-center gap-2 text-xs text-slate-400">
          <button onClick={() => onNavigatePage('home')} className="hover:text-white cursor-pointer">
            Home
          </button>
          <ChevronRight className="w-3 h-3 text-slate-600" />
          <button onClick={() => onNavigatePage('tools')} className="hover:text-white cursor-pointer">
            Tools
          </button>
          <ChevronRight className="w-3 h-3 text-slate-600" />
          <span className="text-teal-400 font-semibold" aria-current="page">
            AI Trip Planner
          </span>
        </nav>

        {/* 150-Word SEO Intro Header */}
        <header className="space-y-4 border-b border-slate-800 pb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/10 border border-teal-500/30 text-teal-400 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>AI Travel Itinerary Generator &bull; 2026 Edition</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
            AI Trip Planner: Free Day-by-Day Vacation Itinerary Generator
          </h1>

          {/* Exactly ~145-155 words SEO Intro */}
          <div className="prose prose-invert max-w-none text-slate-300 text-sm sm:text-base leading-relaxed space-y-3">
            <p>
              Planning a vacation should feel simple, not stressful. The Evonixtec AI Trip Planner is a free artificial intelligence tool built for modern travelers. Instead of spending hours reading scattered travel blogs and comparing forums, you can now generate a complete day-by-day vacation plan in 30 seconds.
            </p>
            <p>
              Just select your destination city, length of stay, budget level, and travel party. Our AI algorithm creates a realistic schedule with morning walks, historic landmarks, local dining spots, and sunset views. You also receive practical packing checklists and transit advice tailored to your city.
            </p>
            <p>
              Whether you are planning a solo weekend in Dubai, a family holiday in Tokyo, or a cultural road trip across Europe, this tool calculates estimated daily expenses and organizes your route smoothly. Try it below for free with zero sign-up required.
            </p>
          </div>

          {/* Interlinking Callout to Article */}
          <div className="pt-2">
            <button
              onClick={() => onNavigatePage('ai-travel-tools')}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-850 border border-teal-500/30 text-teal-300 text-xs sm:text-sm font-bold transition-all cursor-pointer"
            >
              <BookOpen className="w-4 h-4 text-teal-400" />
              <span>Read our complete guide: 10 Best AI Tools Name for Travel Itinerary (2026)</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </header>

        {/* Live Interactive Generator */}
        <section id="trip-planner-engine">
          <AiTripPlannerTool onOpenArticle={() => onNavigatePage('ai-travel-tools')} />
        </section>

        {/* Key Benefits Grid */}
        <section className="space-y-4 pt-4">
          <h2 className="text-xl sm:text-2xl font-bold text-white">
            Why Use Artificial Intelligence for Trip Planning?
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
              <div className="w-8 h-8 rounded-lg bg-teal-500/20 text-teal-400 flex items-center justify-center">
                <Compass className="w-4 h-4" />
              </div>
              <h3 className="text-base font-bold text-white">Realistic Daily Timing</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Activities are grouped by geographic zones to minimize walking fatigue and transit costs.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
              <div className="w-8 h-8 rounded-lg bg-cyan-500/20 text-cyan-400 flex items-center justify-center">
                <Plane className="w-4 h-4" />
              </div>
              <h3 className="text-base font-bold text-white">Transparent Budget Estimates</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Day-by-day spending estimates for dining, attractions, and local transport based on current city pricing.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
              <div className="w-8 h-8 rounded-lg bg-purple-500/20 text-purple-400 flex items-center justify-center">
                <CheckCircle2 className="w-4 h-4" />
              </div>
              <h3 className="text-base font-bold text-white">One-Click Share &amp; Export</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Copy text directly, print an offline travel PDF, or send your itinerary to travel partners on WhatsApp.
              </p>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="space-y-4 pt-6 border-t border-slate-800">
          <div className="flex items-center gap-2 text-teal-400">
            <HelpCircle className="w-5 h-5" />
            <h2 className="text-xl sm:text-2xl font-bold text-white">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-3 pt-2">
            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-1.5">
              <h3 className="text-sm font-bold text-white">Is this AI Trip Planner free to use?</h3>
              <p className="text-xs text-slate-300">
                Yes, it is 100% free with unlimited itinerary generations and zero credit card required.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-1.5">
              <h3 className="text-sm font-bold text-white">Can I customize my trip after generating?</h3>
              <p className="text-xs text-slate-300">
                Yes, you can adjust your destination, switch duration, change budget tiers, or regenerate a fresh schedule anytime.
              </p>
            </div>
          </div>
        </section>

        {/* Contact Banner (Rule 4) */}
        <section className="p-6 rounded-2xl bg-slate-900 border border-teal-500/30 flex flex-wrap items-center justify-between gap-4 mt-8">
          <div>
            <h3 className="text-lg font-bold text-white">Got a question? Call us.</h3>
            <p className="text-sm text-slate-400">We reply in 2 hours.</p>
          </div>
          <a
            href={`tel:${COMPANY_INFO.contact.phoneRaw}`}
            className="px-5 py-2.5 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-xs flex items-center gap-2"
          >
            <Phone className="w-3.5 h-3.5" />
            <span>{COMPANY_INFO.contact.phoneDisplay}</span>
          </a>
        </section>
      </div>
    </div>
  );
};
