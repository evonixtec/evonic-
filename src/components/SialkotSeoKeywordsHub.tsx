import React, { useState, useMemo } from 'react';
import { Search, Sparkles, TrendingUp, Target, Award, CheckCircle2, Globe, Wrench, ShieldCheck, ArrowRight, ExternalLink } from 'lucide-react';
import { NavPageId } from './Navbar';

interface SeoKeyword {
  keyword: string;
  category: 'Core IT' | 'Daska Road' | 'Rangpura' | 'Hardware Repair' | 'Retail POS' | 'Export B2B';
  monthlyVolumeTier: 'High (1K - 5K)' | 'Medium (500 - 1K)' | 'Emerging Local (100 - 500)';
  searchIntent: 'Commercial' | 'Transactional' | 'Local Doorstep';
  rankingDifficulty: 'Low' | 'Medium' | 'Competitive';
  targetPage: NavPageId;
  strategicNote: string;
}

const SIALKOT_SEO_KEYWORDS: SeoKeyword[] = [
  // 1. Core Sialkot IT & Software House
  {
    keyword: 'IT company in Sialkot',
    category: 'Core IT',
    monthlyVolumeTier: 'High (1K - 5K)',
    searchIntent: 'Commercial',
    rankingDifficulty: 'Competitive',
    targetPage: 'home',
    strategicNote: 'Primary broad query searched by businesses looking for technology partners in Sialkot.',
  },
  {
    keyword: 'best software house in Sialkot',
    category: 'Core IT',
    monthlyVolumeTier: 'High (1K - 5K)',
    searchIntent: 'Commercial',
    rankingDifficulty: 'Competitive',
    targetPage: 'about',
    strategicNote: 'High conversion intent for custom software, web apps, and enterprise engineering.',
  },
  {
    keyword: 'website development company in Sialkot',
    category: 'Core IT',
    monthlyVolumeTier: 'High (1K - 5K)',
    searchIntent: 'Transactional',
    rankingDifficulty: 'Medium',
    targetPage: 'services',
    strategicNote: 'Targeted by local exporters and retail shops needing modern responsive websites.',
  },
  {
    keyword: 'web design services Sialkot Paris Road',
    category: 'Core IT',
    monthlyVolumeTier: 'Medium (500 - 1K)',
    searchIntent: 'Local Doorstep',
    rankingDifficulty: 'Low',
    targetPage: 'services',
    strategicNote: 'Hyper-local query around central corporate banks and trade consultants on Paris Road.',
  },

  // 2. Daska Road & Surgical Industrial Belt
  {
    keyword: 'laptop repairing Daska Road Sialkot',
    category: 'Daska Road',
    monthlyVolumeTier: 'Medium (500 - 1K)',
    searchIntent: 'Transactional',
    rankingDifficulty: 'Low',
    targetPage: 'guides',
    strategicNote: 'Factory directors whose office laptops crash need immediate on-site technicians on Daska Road.',
  },
  {
    keyword: 'surgical ERP software Daska Road Sialkot',
    category: 'Daska Road',
    monthlyVolumeTier: 'Medium (500 - 1K)',
    searchIntent: 'Commercial',
    rankingDifficulty: 'Low',
    targetPage: 'services',
    strategicNote: 'Very high financial value. Surgical manufacturers wanting metal forging and gatepass tracking.',
  },
  {
    keyword: 'emergency IT support Daska Road factories',
    category: 'Daska Road',
    monthlyVolumeTier: 'Emerging Local (100 - 500)',
    searchIntent: 'Local Doorstep',
    rankingDifficulty: 'Low',
    targetPage: 'contact',
    strategicNote: 'Urgent calls when factory internet, barcode printer, or generator power surge trips servers.',
  },
  {
    keyword: 'sports goods web development Daska Road',
    category: 'Daska Road',
    monthlyVolumeTier: 'Medium (500 - 1K)',
    searchIntent: 'Commercial',
    rankingDifficulty: 'Low',
    targetPage: 'portfolio',
    strategicNote: 'Export apparel manufacturers seeking 3D uniform configurators and online wholesale carts.',
  },

  // 3. Rangpura & Leather/Retail Area
  {
    keyword: 'retail POS software Rangpura Bazar Sialkot',
    category: 'Rangpura',
    monthlyVolumeTier: 'Medium (500 - 1K)',
    searchIntent: 'Transactional',
    rankingDifficulty: 'Low',
    targetPage: 'services',
    strategicNote: 'Garment shops and retail counters needing fast offline billing and 80mm thermal receipt printing.',
  },
  {
    keyword: 'leather export website development Rangpura',
    category: 'Rangpura',
    monthlyVolumeTier: 'Medium (500 - 1K)',
    searchIntent: 'Commercial',
    rankingDifficulty: 'Low',
    targetPage: 'portfolio',
    strategicNote: 'Leather motorbike suits and safety glove tanneries seeking European buyer RFQ portals.',
  },
  {
    keyword: 'computer repair near Rangpura Sialkot',
    category: 'Rangpura',
    monthlyVolumeTier: 'High (1K - 5K)',
    searchIntent: 'Local Doorstep',
    rankingDifficulty: 'Medium',
    targetPage: 'services',
    strategicNote: 'High daily local consumer and shopkeeper search for laptop, desktop, and printer repairs.',
  },
  {
    keyword: 'thermal printer repair Rangpura Sialkot',
    category: 'Rangpura',
    monthlyVolumeTier: 'Emerging Local (100 - 500)',
    searchIntent: 'Transactional',
    rankingDifficulty: 'Low',
    targetPage: 'shop',
    strategicNote: 'Faded receipt printing or paper cutter jams during peak retail evening shopping hours.',
  },

  // 4. Chip-Level Hardware & Laptop Repairing
  {
    keyword: 'laptop motherboard repair in Sialkot',
    category: 'Hardware Repair',
    monthlyVolumeTier: 'High (1K - 5K)',
    searchIntent: 'Transactional',
    rankingDifficulty: 'Medium',
    targetPage: 'services',
    strategicNote: 'Component-level SMD micro-soldering for 19V rail short circuits, replacing blown capacitors.',
  },
  {
    keyword: 'chip level laptop repairing Sialkot Cantt',
    category: 'Hardware Repair',
    monthlyVolumeTier: 'Medium (500 - 1K)',
    searchIntent: 'Local Doorstep',
    rankingDifficulty: 'Low',
    targetPage: 'services',
    strategicNote: 'High trust query around Sialkot Cantt for stereo microscope diagnostics without board replacement.',
  },
  {
    keyword: 'broken laptop hinge repair Sialkot',
    category: 'Hardware Repair',
    monthlyVolumeTier: 'Medium (500 - 1K)',
    searchIntent: 'Transactional',
    rankingDifficulty: 'Low',
    targetPage: 'services',
    strategicNote: 'Structural chemical epoxy restoration for HP, Dell, and Lenovo laptops with cracked palmrests.',
  },
  {
    keyword: 'doorstep computer technician Sialkot',
    category: 'Hardware Repair',
    monthlyVolumeTier: 'High (1K - 5K)',
    searchIntent: 'Local Doorstep',
    rankingDifficulty: 'Medium',
    targetPage: 'contact',
    strategicNote: 'Top-ranking local query when customers want engineers to come to their factory, office, or home.',
  },

  // 5. Point of Sale & Billing Systems
  {
    keyword: 'point of sale software in Sialkot',
    category: 'Retail POS',
    monthlyVolumeTier: 'High (1K - 5K)',
    searchIntent: 'Commercial',
    rankingDifficulty: 'Medium',
    targetPage: 'services',
    strategicNote: 'Supermarkets, pharmacies, clothing brands, and bakeries seeking reliable POS software.',
  },
  {
    keyword: 'offline billing software Sialkot',
    category: 'Retail POS',
    monthlyVolumeTier: 'Medium (500 - 1K)',
    searchIntent: 'Transactional',
    rankingDifficulty: 'Low',
    targetPage: 'services',
    strategicNote: 'Crucial in Sialkot due to frequent fiber broadband micro-drops; stores need zero-latency offline billing.',
  },
  {
    keyword: 'barcode scanner and thermal printer price Sialkot',
    category: 'Retail POS',
    monthlyVolumeTier: 'Medium (500 - 1K)',
    searchIntent: 'Commercial',
    rankingDifficulty: 'Low',
    targetPage: 'shop',
    strategicNote: 'Commercial hardware buyers looking for original Xprinter, Epson, and 2D handheld scanners.',
  },

  // 6. Global B2B Export Inquiries
  {
    keyword: 'surgical instruments manufacturer website Pakistan',
    category: 'Export B2B',
    monthlyVolumeTier: 'Medium (500 - 1K)',
    searchIntent: 'Commercial',
    rankingDifficulty: 'Medium',
    targetPage: 'portfolio',
    strategicNote: 'Searched by overseas medical distributors in the UK, Germany, and USA looking for Sialkot OEMs.',
  },
  {
    keyword: 'custom teamwear uniform builder software',
    category: 'Export B2B',
    monthlyVolumeTier: 'Medium (500 - 1K)',
    searchIntent: 'Commercial',
    rankingDifficulty: 'Low',
    targetPage: 'portfolio',
    strategicNote: 'High-margin niche query for 3D sports jerseys and combat gear export portals.',
  },
];

interface SialkotSeoKeywordsHubProps {
  onNavigatePage: (page: NavPageId) => void;
}

export const SialkotSeoKeywordsHub: React.FC<SialkotSeoKeywordsHubProps> = ({ onNavigatePage }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories = ['All', 'Core IT', 'Daska Road', 'Rangpura', 'Hardware Repair', 'Retail POS', 'Export B2B'];

  const filteredKeywords = useMemo(() => {
    return SIALKOT_SEO_KEYWORDS.filter((item) => {
      const matchesCat = selectedCategory === 'All' || item.category === selectedCategory;
      const matchesSearch = item.keyword.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.strategicNote.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCat && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  return (
    <section id="sialkot-seo-hub" className="py-20 md:py-28 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-50 border border-red-200 text-red-700 text-xs font-bold uppercase tracking-wider">
            <TrendingUp className="w-3.5 h-3.5 text-red-600" />
            <span>Sialkot Search Engine Optimization Authority Hub</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight">
            High-Value Sialkot Ranking Keywords & Local SEO Strategy
          </h2>
          <p className="text-base text-slate-600 leading-relaxed font-sans">
            Curated roadmap of high-intent search queries across Daska Road, Rangpura, Paris Road, and Sialkot Cantt. Every page and blog on EVONIX is semantically structured to rank #1 on Google for these exact queries.
          </p>
        </div>

        {/* Filter and Search Controls */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8">
          {/* Category Tabs */}
          <div className="flex flex-wrap gap-1.5">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-red-600 text-white shadow-2xs'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="w-full md:w-72 relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Filter ranking keywords..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-xl border border-slate-300 text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-red-500"
            />
          </div>
        </div>

        {/* Keywords Table / Card Grid */}
        <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-2xs bg-white mb-12">
          <table className="w-full text-left border-collapse text-xs sm:text-sm">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase tracking-wider text-[11px] font-bold">
                <th className="py-3.5 px-4 sm:px-6">Target Sialkot Keyword</th>
                <th className="py-3.5 px-4">Category</th>
                <th className="py-3.5 px-4">Search Volume</th>
                <th className="py-3.5 px-4">Intent</th>
                <th className="py-3.5 px-4">Difficulty</th>
                <th className="py-3.5 px-4 sm:px-6">Strategic Application</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-sans">
              {filteredKeywords.map((item, idx) => (
                <tr key={idx} className="hover:bg-slate-50 transition-colors">
                  <td className="py-3.5 px-4 sm:px-6 font-bold text-slate-900">
                    <div className="flex items-center gap-2">
                      <Sparkles className="w-3.5 h-3.5 text-red-600 flex-shrink-0" />
                      <span>{item.keyword}</span>
                    </div>
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 text-[11px] font-medium whitespace-nowrap">
                      {item.category}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-slate-600 whitespace-nowrap">
                    {item.monthlyVolumeTier}
                  </td>
                  <td className="py-3.5 px-4">
                    <span
                      className={`px-2 py-0.5 rounded text-[11px] font-semibold whitespace-nowrap ${
                        item.searchIntent === 'Transactional'
                          ? 'bg-red-50 text-red-700'
                          : item.searchIntent === 'Local Doorstep'
                          ? 'bg-emerald-50 text-emerald-700'
                          : 'bg-blue-50 text-blue-700'
                      }`}
                    >
                      {item.searchIntent}
                    </span>
                  </td>
                  <td className="py-3.5 px-4">
                    <span
                      className={`text-[11px] font-bold ${
                        item.rankingDifficulty === 'Low'
                          ? 'text-emerald-600'
                          : item.rankingDifficulty === 'Medium'
                          ? 'text-amber-600'
                          : 'text-slate-600'
                      }`}
                    >
                      {item.rankingDifficulty}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 sm:px-6 text-slate-600 text-xs">
                    <div className="flex items-center justify-between gap-3">
                      <span>{item.strategicNote}</span>
                      <button
                        onClick={() => onNavigatePage(item.targetPage)}
                        className="text-red-600 hover:text-red-700 font-bold whitespace-nowrap inline-flex items-center gap-1 cursor-pointer"
                      >
                        <span>View Page</span>
                        <ArrowRight className="w-3 h-3" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* 5-Step Strategic Blueprint to Rank #1 on Google in Sialkot */}
        <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-10 border border-slate-800 shadow-xl space-y-8">
          <div className="space-y-2">
            <span className="text-xs font-bold text-red-400 uppercase tracking-wider block">
              EVONIX Local SEO Master Plan
            </span>
            <h3 className="text-2xl sm:text-3xl font-black tracking-tight">
              5-Step Blueprint to Rank #1 on Google in Sialkot
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 max-w-3xl leading-relaxed">
              Based on Google local ranking algorithm updates (proximity, relevance, prominence). Here is how EVONIX ensures continuous top rankings for technology and hardware repair in Sialkot.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-2.5">
              <div className="w-8 h-8 rounded-xl bg-red-600 text-white flex items-center justify-center font-bold text-sm">
                1
              </div>
              <h4 className="text-sm font-bold text-white">Local Area Landing Pages</h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                Dedicated content clusters for Daska Road, Rangpura, Small Industrial Estate, and Paris Road capturing localized long-tail searches with genuine field case studies.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-2.5">
              <div className="w-8 h-8 rounded-xl bg-red-600 text-white flex items-center justify-center font-bold text-sm">
                2
              </div>
              <h4 className="text-sm font-bold text-white">Schema.org LocalBusiness Markup</h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                Rich JSON-LD structured data with precise GPS coordinates (32.4945° N, 74.5229° E), opening hours, phone number, and service areas feeds Google Knowledge Graph directly.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-2.5">
              <div className="w-8 h-8 rounded-xl bg-red-600 text-white flex items-center justify-center font-bold text-sm">
                3
              </div>
              <h4 className="text-sm font-bold text-white">Verified Customer Reviews</h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                Authentic testimonials citing specific factory names and streets (e.g. Al-Madina Surgical on Daska Road) send massive relevance signals to Google algorithms.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-2.5">
              <div className="w-8 h-8 rounded-xl bg-red-600 text-white flex items-center justify-center font-bold text-sm">
                4
              </div>
              <h4 className="text-sm font-bold text-white">Fast Mobile Performance (Sub-1s)</h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                Google mobile-first indexing prioritizes lightweight Vite/React builds with zero render-blocking scripts, ensuring lightning-fast load times even on cellular 3G/4G networks.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-2.5">
              <div className="w-8 h-8 rounded-xl bg-red-600 text-white flex items-center justify-center font-bold text-sm">
                5
              </div>
              <h4 className="text-sm font-bold text-white">Direct WhatsApp Lead Triggers</h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                High user interaction and low bounce rate because visitors can immediately connect with our engineers via WhatsApp with one tap, signaling high satisfaction to Google.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-gradient-to-br from-red-600 to-red-700 text-white space-y-2.5 flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-red-200">
                  Ready to Grow Your Sialkot Ranking?
                </span>
                <h4 className="text-base font-bold mt-1">Want EVONIX To Build Your SEO Platform?</h4>
                <p className="text-xs text-red-100 mt-1 leading-relaxed">
                  We engineer B2B export portals that rank at the top of Google in the USA, Germany, and the UK.
                </p>
              </div>
              <button
                onClick={() => onNavigatePage('contact')}
                className="py-2.5 px-4 rounded-xl bg-white text-red-700 hover:bg-slate-100 font-extrabold text-xs shadow-md transition-all flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <span>Book Free SEO Audit</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
