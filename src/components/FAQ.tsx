import React, { useState, useMemo } from 'react';
import { HelpCircle, ChevronDown, Search, Sparkles, MessageSquare, PhoneCall } from 'lucide-react';
import { FAQ_ITEMS, COMPANY_INFO } from '../data/content';
import { FaqItem, SectionId } from '../types';

interface FAQProps {
  onOpenQuote?: (prefillService?: string) => void;
  onNavigateSection?: (sectionId: SectionId) => void;
}

export const FAQ: React.FC<FAQProps> = ({ onOpenQuote, onNavigateSection }) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedId, setExpandedId] = useState<string | null>('faq-dubai-transition-1');

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
    { id: 'all', label: 'All Questions', count: FAQ_ITEMS.length },
    {
      id: 'dubai-transition',
      label: 'Dubai-to-Pakistan Transition',
      count: FAQ_ITEMS.filter((f) => f.category === 'dubai-transition').length,
    },
    {
      id: 'pricing',
      label: 'Pricing & Currency',
      count: FAQ_ITEMS.filter((f) => f.category === 'pricing').length,
    },
    {
      id: 'onsite-support',
      label: 'Sialkot Doorstep & On-Site',
      count: FAQ_ITEMS.filter((f) => f.category === 'onsite-support').length,
    },
    {
      id: 'software-hardware',
      label: 'Software, POS & Hardware Repair',
      count: FAQ_ITEMS.filter((f) => f.category === 'software-hardware').length,
    },
  ];

  return (
    <section id="faq" className="py-20 md:py-28 bg-slate-50 border-b border-slate-200">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-50 border border-red-200 text-xs font-bold text-red-700">
            <HelpCircle className="w-3.5 h-3.5 text-red-600" />
            Frequently Asked Questions
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight">
            Clear Answers to Your Questions
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            Everything you need to know about our Dubai technical pedigree, local Sialkot visits, hardware warranties, and POS software deployments.
          </p>

          {/* Search bar */}
          <div className="pt-4 max-w-md mx-auto relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search frequently asked questions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white border border-slate-300 text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-red-500 shadow-2xs"
            />
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap justify-center gap-2 pt-3">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                  activeCategory === cat.id
                    ? 'bg-red-600 text-white shadow-2xs font-bold'
                    : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                <span>{cat.label}</span>
                <span className="ml-1.5 text-[10px] opacity-80">({cat.count})</span>
              </button>
            ))}
          </div>
        </div>

        {/* FAQ Accordion List */}
        <div className="space-y-3">
          {filteredFaqs.map((faq) => {
            const isOpen = expandedId === faq.id;
            return (
              <div
                key={faq.id}
                className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-2xs transition-all"
              >
                <button
                  onClick={() => toggleAccordion(faq.id)}
                  className="w-full px-5 sm:px-6 py-4.5 text-left flex items-center justify-between gap-4 cursor-pointer hover:bg-slate-50/80 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-sm sm:text-base font-bold text-slate-900">
                      {faq.question}
                    </span>
                    {faq.highlightBadge && (
                      <span className="hidden sm:inline-block px-2 py-0.5 rounded text-[10px] font-bold bg-red-50 text-red-700 border border-red-200">
                        {faq.highlightBadge}
                      </span>
                    )}
                  </div>
                  <ChevronDown
                    className={`w-4 h-4 text-slate-400 flex-shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180 text-red-600' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-5 sm:px-6 pb-5 pt-1 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100">
                    <p>{faq.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Still Have Questions CTA */}
        <div className="mt-12 bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 text-center shadow-2xs">
          <h3 className="text-base sm:text-lg font-bold text-slate-900">
            Have a custom requirement or question not listed here?
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-md mx-auto">
            Our engineering desk is available directly on WhatsApp for instantaneous assistance.
          </p>
          <div className="mt-4 flex flex-wrap justify-center gap-3">
            <a
              href={`https://wa.me/${COMPANY_INFO.contact.whatsapp}?text=${encodeURIComponent('Hello EVONIX, I have a specific question about your IT services.')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm transition-colors flex items-center gap-2 shadow-2xs"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Ask on WhatsApp</span>
            </a>
            {onOpenQuote && (
              <button
                onClick={() => onOpenQuote('General Inquiry')}
                className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-red-600 text-white font-bold text-xs sm:text-sm transition-colors cursor-pointer"
              >
                Request Custom Callback
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
