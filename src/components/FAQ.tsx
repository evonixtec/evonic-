import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  HelpCircle,
  ChevronDown,
  Search,
  Sparkles,
  PhoneCall,
  MessageSquare,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  Clock,
  MapPin,
  Coins,
  Cpu,
} from 'lucide-react';
import { FAQ_ITEMS } from '../data/content';
import { FaqItem, SectionId } from '../types';
import { FadeInSection } from './FadeInSection';

interface FAQProps {
  onOpenQuote?: (prefillService?: string) => void;
  onNavigateSection?: (sectionId: SectionId) => void;
}

export const FAQ: React.FC<FAQProps> = ({ onOpenQuote, onNavigateSection }) => {
  const [activeCategory, setActiveCategory] = useState<
    'all' | 'dubai-transition' | 'pricing' | 'onsite-support' | 'software-hardware'
  >('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedId, setExpandedId] = useState<string | null>('faq-dubai-transition-1');

  // Filter items based on category and search query
  const filteredFaqs = useMemo(() => {
    return FAQ_ITEMS.filter((item) => {
      const matchesCategory =
        activeCategory === 'all' || item.category === activeCategory;
      const q = searchQuery.toLowerCase().trim();
      const matchesQuery =
        !q ||
        item.question.toLowerCase().includes(q) ||
        item.answer.toLowerCase().includes(q) ||
        (item.highlightBadge && item.highlightBadge.toLowerCase().includes(q));
      return matchesCategory && matchesQuery;
    });
  }, [activeCategory, searchQuery]);

  const toggleAccordion = (id: string) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  const categories = [
    { id: 'all', label: 'All Questions', count: FAQ_ITEMS.length, icon: HelpCircle },
    {
      id: 'dubai-transition',
      label: 'Dubai-to-Pakistan Transition',
      count: FAQ_ITEMS.filter((f) => f.category === 'dubai-transition').length,
      icon: Sparkles,
    },
    {
      id: 'pricing',
      label: 'Pricing & Transparent Quotes',
      count: FAQ_ITEMS.filter((f) => f.category === 'pricing').length,
      icon: Coins,
    },
    {
      id: 'onsite-support',
      label: 'Sialkot Doorstep Support',
      count: FAQ_ITEMS.filter((f) => f.category === 'onsite-support').length,
      icon: MapPin,
    },
    {
      id: 'software-hardware',
      label: 'Software, POS & Hardware',
      count: FAQ_ITEMS.filter((f) => f.category === 'software-hardware').length,
      icon: Cpu,
    },
  ];

  const handleAction = (item: FaqItem) => {
    if (!item.actionPrefill) return;

    if (item.actionPrefill === 'quote') {
      onOpenQuote && onOpenQuote('General Inquiry');
    } else if (item.actionPrefill === 'On-Site Home & Office Service') {
      onOpenQuote && onOpenQuote('On-Site Home & Office Service');
    } else if (item.actionPrefill === 'contact') {
      if (onNavigateSection) onNavigateSection('contact');
      else document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
    } else if (item.actionPrefill === 'shop') {
      if (onNavigateSection) onNavigateSection('shop');
      else document.getElementById('shop')?.scrollIntoView({ behavior: 'smooth' });
    } else if (item.actionPrefill === 'about') {
      if (onNavigateSection) onNavigateSection('about');
      else document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="faq" className="py-24 bg-slate-950 border-t border-slate-900 relative overflow-hidden">
      {/* Ambient background glows */}
      <div className="absolute top-1/3 left-10 w-96 h-96 bg-cyan-900/10 blur-[140px] rounded-full pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-10 w-96 h-96 bg-blue-900/10 blur-[140px] rounded-full pointer-events-none"></div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section Header */}
        <FadeInSection direction="up" delay={50} duration={600}>
          <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950/80 border border-cyan-800/60 text-xs font-semibold text-cyan-300 shadow-inner">
              <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
              Frequently Asked Questions & Answers
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
              Got Questions? We Have Answers.
            </h2>

            <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
              Clear, transparent information about our 20+ years Dubai heritage, local Sialkot on-site technician response, and zero-risk service pricing.
            </p>

            {/* Quick in-section Search Input */}
            <div className="pt-4 max-w-md mx-auto">
              <div className="relative">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search questions (e.g., Dubai, pricing, doorstep, POS, repair)..."
                  className="w-full bg-slate-900/90 border border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition-colors shadow-inner"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-white"
                  >
                    Clear
                  </button>
                )}
              </div>
            </div>

            {/* Category Filter Pills */}
            <div className="flex flex-wrap justify-center gap-2 pt-4">
              {categories.map((cat) => {
                const Icon = cat.icon;
                const isActive = activeCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    onClick={() => {
                      setActiveCategory(cat.id as any);
                      setExpandedId(null);
                    }}
                    className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all duration-300 cursor-pointer flex items-center gap-1.5 ${
                      isActive
                        ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 shadow-md shadow-cyan-500/25 font-bold'
                        : 'bg-slate-900/80 text-slate-400 hover:text-white border border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    <span>{cat.label}</span>
                    <span
                      className={`px-1.5 py-0.5 rounded-full text-[10px] font-mono ${
                        isActive ? 'bg-slate-950/30 text-slate-900' : 'bg-slate-800 text-slate-400'
                      }`}
                    >
                      {cat.count}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </FadeInSection>

        {/* Accordion List */}
        <div className="space-y-3.5">
          {filteredFaqs.length === 0 ? (
            <div className="text-center py-12 px-4 rounded-2xl bg-slate-900/50 border border-slate-800">
              <HelpCircle className="w-10 h-10 text-slate-500 mx-auto mb-3" />
              <p className="text-slate-300 font-semibold text-base">No matching questions found</p>
              <p className="text-slate-500 text-xs mt-1">
                Try searching with different terms or contact our support team directly.
              </p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setActiveCategory('all');
                }}
                className="mt-4 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-cyan-300 text-xs font-semibold transition-colors"
              >
                Reset Search Filters
              </button>
            </div>
          ) : (
            filteredFaqs.map((faq, idx) => {
              const isOpen = expandedId === faq.id;

              return (
                <FadeInSection key={faq.id} direction="up" delay={idx * 30} duration={400}>
                  <div
                    id={faq.id}
                    className={`rounded-2xl transition-all duration-300 border overflow-hidden ${
                      isOpen
                        ? 'bg-slate-900/90 border-cyan-500/50 shadow-xl shadow-cyan-950/30 ring-1 ring-cyan-500/20'
                        : 'bg-slate-900/50 hover:bg-slate-900/80 border-slate-800/80 hover:border-slate-700 shadow-md'
                    }`}
                  >
                    {/* Accordion Trigger Header */}
                    <button
                      type="button"
                      onClick={() => toggleAccordion(faq.id)}
                      className="w-full px-5 sm:px-6 py-4 sm:py-5 flex items-center justify-between gap-4 text-left cursor-pointer focus:outline-none transition-colors"
                      aria-expanded={isOpen}
                    >
                      <div className="flex items-start sm:items-center gap-3 pr-2">
                        <div
                          className={`mt-0.5 sm:mt-0 p-2 rounded-xl border flex-shrink-0 transition-colors ${
                            isOpen
                              ? 'bg-cyan-500/10 text-cyan-400 border-cyan-500/30'
                              : 'bg-slate-950 text-slate-400 border-slate-800'
                          }`}
                        >
                          <HelpCircle className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="flex flex-wrap items-center gap-2 mb-1">
                            {faq.highlightBadge && (
                              <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-semibold bg-cyan-950 text-cyan-300 border border-cyan-800/60">
                                {faq.highlightBadge}
                              </span>
                            )}
                          </div>
                          <span className="text-sm sm:text-base font-bold text-white tracking-tight leading-snug">
                            {faq.question}
                          </span>
                        </div>
                      </div>

                      <div
                        className={`p-1.5 rounded-lg border flex-shrink-0 transition-transform duration-300 ${
                          isOpen
                            ? 'rotate-180 bg-cyan-500 text-slate-950 border-cyan-400'
                            : 'bg-slate-950 text-slate-400 border-slate-800'
                        }`}
                      >
                        <ChevronDown className="w-4 h-4" />
                      </div>
                    </button>

                    {/* Accordion Content Collapse */}
                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.25, ease: 'easeInOut' }}
                          className="overflow-hidden"
                        >
                          <div className="px-5 sm:px-6 pb-5 pt-1 text-slate-300 text-xs sm:text-sm leading-relaxed border-t border-slate-800/60">
                            <div className="pt-3 space-y-3">
                              <p>{faq.answer}</p>

                              {/* Action button if defined */}
                              {faq.actionText && (
                                <div className="pt-2 flex items-center gap-3">
                                  <button
                                    onClick={() => handleAction(faq)}
                                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 text-xs font-semibold transition-all cursor-pointer"
                                  >
                                    <span>{faq.actionText}</span>
                                    <ArrowRight className="w-3 h-3 text-cyan-400" />
                                  </button>
                                </div>
                              )}
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </FadeInSection>
              );
            })
          )}
        </div>

        {/* Bottom Fast Contact Banner */}
        <FadeInSection direction="up" delay={150} duration={600}>
          <div className="mt-14 p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-slate-900 via-slate-900/90 to-slate-950 border border-slate-800/90 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-32 bg-cyan-500/5 blur-3xl pointer-events-none"></div>

            <div className="space-y-1.5 text-center sm:text-left">
              <div className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-cyan-400">
                <Clock className="w-3.5 h-3.5" />
                Response within minutes on WhatsApp
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-white">
                Have a unique question or urgent hardware repair in Sialkot?
              </h3>
              <p className="text-xs sm:text-sm text-slate-400 max-w-xl">
                Our Dubai-experienced certified engineers are available on direct call and WhatsApp for instant answers, technical quotations, and doorstep dispatch.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
              <a
                href="https://wa.me/9232632440002?text=Hello%20EVONIX%20TECHNOLOGIES%2C%20I%20have%20a%20question%20regarding%20your%20services."
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-5 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-emerald-900/30 transition-all cursor-pointer whitespace-nowrap"
              >
                <MessageSquare className="w-4 h-4 fill-white" />
                <span>WhatsApp Desk</span>
              </a>

              <a
                href="tel:+9232632440002"
                className="w-full sm:w-auto px-5 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-cyan-300 border border-cyan-800/60 font-semibold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer whitespace-nowrap"
              >
                <PhoneCall className="w-4 h-4 text-cyan-400" />
                <span>+92 326 324 40002</span>
              </a>
            </div>
          </div>
        </FadeInSection>
      </div>
    </section>
  );
};
