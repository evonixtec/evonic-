import React, { useState, useMemo, useEffect } from 'react';
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
      const q = (searchQuery || '').toLowerCase().trim();
      const matchesQuery =
        !q ||
        (item.question || '').toLowerCase().includes(q) ||
        (item.answer || '').toLowerCase().includes(q) ||
        (item.highlightBadge && (item.highlightBadge || '').toLowerCase().includes(q));
      return matchesCategory && matchesQuery;
    });
  }, [activeCategory, searchQuery]);

  // Google Rich Snippet FAQPage Schema JSON-LD
  const faqSchema = useMemo(() => {
    return {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      '@id': 'https://www.evonixtec.com/#faq-schema',
      mainEntity: FAQ_ITEMS.map((item) => ({
        '@type': 'Question',
        name: item.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: item.answer,
        },
      })),
    };
  }, []);

  useEffect(() => {
    // Inject or update in document head for maximum crawler and Googlebot compatibility
    let scriptTag = document.getElementById('faq-rich-snippet-schema') as HTMLScriptElement;
    if (!scriptTag) {
      scriptTag = document.createElement('script');
      scriptTag.id = 'faq-rich-snippet-schema';
      scriptTag.type = 'application/ld+json';
      document.head.appendChild(scriptTag);
    }
    scriptTag.textContent = JSON.stringify(faqSchema);

    return () => {
      const existing = document.getElementById('faq-rich-snippet-schema');
      if (existing) existing.remove();
    };
  }, [faqSchema]);

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
    {
      id: 'ecommerce-etsy',
      label: 'Etsy & E-Commerce FAQ',
      count: FAQ_ITEMS.filter((f) => f.category === 'ecommerce-etsy').length,
    },
  ];

  return (
    <section id="faq" className="py-20 md:py-24 bg-[#FAFAF9] border-b border-[#E5E7EB]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-2xl mb-10 space-y-2.5 text-left">
          <p className="text-xs font-semibold text-[#C81E1E]">
            05 · Frequently Asked Questions
          </p>
          <h2 className="text-3xl sm:text-4xl font-semibold text-slate-900 tracking-tight">
            Clear answers before you start
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            Details on our Dubai engineering standards, on-site Sialkot visits, POS warranties, and project delivery.
          </p>

          {/* Search bar */}
          <div className="pt-3 max-w-md relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              id="faq-search-input"
              aria-label="Search frequently asked questions"
              type="text"
              placeholder="Search questions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-white border border-[#E5E7EB] text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#C81E1E]"
            />
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap gap-2 pt-2">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                  activeCategory === cat.id
                    ? 'bg-slate-900 text-white'
                    : 'bg-white text-slate-700 hover:bg-slate-100 border border-[#E5E7EB]'
                }`}
              >
                <span>{cat.label}</span>
                <span className="ml-1.5 text-[11px] opacity-75 tabular-nums">({cat.count})</span>
              </button>
            ))}
          </div>
        </div>

        {/* Dedicated FAQ Schema Markup Block for Google Rich Snippets */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />

        {/* FAQ Accordion List with Microdata Integration */}
        <div className="space-y-3" itemScope itemType="https://schema.org/FAQPage">
          {filteredFaqs.map((faq) => {
            const isOpen = expandedId === faq.id;
            return (
              <div
                key={faq.id}
                id={faq.id}
                itemScope
                itemProp="mainEntity"
                itemType="https://schema.org/Question"
                className="bg-white border border-[#E5E7EB] rounded-xl overflow-hidden transition-colors"
              >
                <button
                  onClick={() => toggleAccordion(faq.id)}
                  className="w-full px-5 sm:px-6 py-4 text-left flex items-center justify-between gap-4 cursor-pointer hover:bg-[#FAFAF9] transition-colors"
                  aria-expanded={isOpen}
                >
                  <div className="flex items-center gap-3">
                    <span itemProp="name" className="text-sm sm:text-base font-semibold text-slate-900">
                      {faq.question}
                    </span>
                  </div>
                  <ChevronDown
                    className={`w-4 h-4 text-slate-400 flex-shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180 text-[#C81E1E]' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div
                    itemScope
                    itemProp="acceptedAnswer"
                    itemType="https://schema.org/Answer"
                    className="px-5 sm:px-6 pb-5 pt-2 text-xs sm:text-sm text-slate-600 leading-relaxed text-left border-t border-[#E5E7EB]"
                  >
                    <p itemProp="text">{faq.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Direct Inquiry Card */}
        <div className="mt-10 bg-white border border-[#E5E7EB] rounded-xl p-6 sm:p-8 text-left flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-1">
            <h3 className="text-base sm:text-lg font-semibold text-slate-900">
              Got a question? Call us. We reply in 2 hours.
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-md">
              Speak directly with our technical team in Sialkot for fast support and consultation.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <a
              href={`https://wa.me/${COMPANY_INFO.contact.whatsapp}?text=${encodeURIComponent('Hello evonix, I have a question about your services.')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2.5 rounded-lg bg-[#C81E1E] hover:bg-[#A6171E] text-white font-semibold text-xs sm:text-sm transition-colors flex items-center gap-2 whitespace-nowrap"
            >
              <MessageSquare className="w-4 h-4" />
              <span>WhatsApp Us</span>
            </a>
            <a
              href={`tel:${COMPANY_INFO.contact.phoneRaw}`}
              className="px-4 py-2.5 rounded-lg border border-[#E5E7EB] hover:bg-[#FAFAF9] text-slate-800 font-semibold text-xs sm:text-sm transition-colors flex items-center gap-2 whitespace-nowrap"
            >
              <PhoneCall className="w-4 h-4 text-slate-500" />
              <span>Call Us</span>
            </a>
            {onOpenQuote && (
              <button
                onClick={() => onOpenQuote('General Inquiry')}
                className="px-4 py-2.5 rounded-lg border border-[#E5E7EB] hover:bg-[#FAFAF9] text-slate-800 font-semibold text-xs sm:text-sm transition-colors cursor-pointer whitespace-nowrap"
              >
                Request Callback
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
