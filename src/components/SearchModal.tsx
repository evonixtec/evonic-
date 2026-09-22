import React, { useState, useEffect, useRef, useMemo } from 'react';
import { SERVICES, PORTFOLIO_DATA, SHOP_PRODUCTS, COMPANY_INFO, FAQ_ITEMS } from '../data/content';
import { TESTIMONIALS_DATA } from '../data/testimonialsData';
import { ALL_BLOGS } from '../data/blogs';
import { SectionId } from '../types';
import {
  Search,
  X,
  Sparkles,
  ArrowRight,
  ExternalLink,
  MessageSquare,
  Globe,
  MonitorCheck,
  ShoppingBag,
  Cpu,
  Wrench,
  CheckCircle,
  Tag,
  CornerDownLeft,
  HelpCircle,
  BookOpen,
} from 'lucide-react';

export type SearchCategoryType = 'all' | 'services' | 'portfolio' | 'shop' | 'technologies' | 'faq' | 'blogs';

export interface SearchResultItem {
  id: string;
  type: 'service' | 'portfolio' | 'shop' | 'technology' | 'faq' | 'blog';
  title: string;
  categoryLabel: string;
  description: string;
  tags: string[];
  targetSection: SectionId;
  targetElementId?: string;
  priceOrHighlight?: string;
  whatsappMessage?: string;
}

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigateToSection: (sectionId: SectionId, elementId?: string) => void;
  onSelectForQuote: (title: string) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  onNavigateToSection,
  onSelectForQuote,
}) => {
  const [query, setQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<SearchCategoryType>('all');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const resultsContainerRef = useRef<HTMLDivElement>(null);

  // Auto focus input when opened
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 50);
      setSelectedIndex(0);
    } else {
      setQuery('');
      setSelectedCategory('all');
    }
  }, [isOpen]);

  // Aggregate all searchable items
  const allSearchItems: SearchResultItem[] = useMemo(() => {
    const items: SearchResultItem[] = [];

    // 1. Services
    SERVICES.forEach((s) => {
      items.push({
        id: `srv-${s.id}`,
        type: 'service',
        title: s.title,
        categoryLabel: `Service ${s.number}`,
        description: s.summary,
        tags: [...s.deliverables, ...s.features, 'Dubai Standard', 'Sialkot IT'],
        targetSection: 'services',
        targetElementId: `service-card-${s.id}`,
        priceOrHighlight: s.id === 'onsite-service' ? 'Doorstep in Sialkot' : 'Custom Quote',
        whatsappMessage: `Hi EVONIX TECHNOLOGIES, I am inquiring about your service: ${s.title}`,
      });
    });

    // 2. Portfolio
    PORTFOLIO_DATA.websiteClients.forEach((p) => {
      items.push({
        id: `port-${p.id}`,
        type: 'portfolio',
        title: p.title,
        categoryLabel: 'Portfolio: Dubai Websites',
        description: p.description,
        tags: [...p.tags, ...p.deliverables, p.industry, 'Dubai UAE Clients'],
        targetSection: 'portfolio',
        targetElementId: `portfolio-item-${p.id}`,
        priceOrHighlight: '15+ Yrs Dubai Track Record',
        whatsappMessage: `Hi EVONIX TECHNOLOGIES, I would like to learn more about your portfolio case study: ${p.title}`,
      });
    });

    PORTFOLIO_DATA.softwareClients.forEach((p) => {
      items.push({
        id: `port-${p.id}`,
        type: 'portfolio',
        title: p.title,
        categoryLabel: 'Portfolio: Enterprise Software',
        description: p.description,
        tags: [...p.tags, ...p.deliverables, p.industry, 'Retail POS', 'Restaurant KDS'],
        targetSection: 'portfolio',
        targetElementId: `portfolio-item-${p.id}`,
        priceOrHighlight: 'Dubai Enterprise Proven',
        whatsappMessage: `Hi EVONIX TECHNOLOGIES, I would like to book a private case study demo for: ${p.title}`,
      });
    });

    // 3. Shop Products
    SHOP_PRODUCTS.forEach((p) => {
      items.push({
        id: `shop-${p.id}`,
        type: 'shop',
        title: p.name,
        categoryLabel: `Shop: ${p.category}`,
        description: p.description,
        tags: [...p.specs, p.condition, p.warranty, p.availability],
        targetSection: 'shop',
        targetElementId: `shop-product-${p.id}`,
        priceOrHighlight: p.priceEstimate,
        whatsappMessage: `Hi EVONIX TECHNOLOGIES, I would like to inquire about purchasing: ${p.name} (${p.category})`,
      });
    });

    // 4. Technologies We Use
    const techItems = [
      { id: 'react', name: 'React.js', role: 'Dynamic Web Apps & Dashboards', category: 'Frontend', tags: ['React', 'JavaScript', 'JSX', 'Frontend', 'SPA'] },
      { id: 'nextjs', name: 'Next.js', role: 'High-Speed SSR & SEO Portals', category: 'Frontend', tags: ['Next.js', 'React', 'SSR', 'Vercel', 'SEO'] },
      { id: 'typescript', name: 'TypeScript', role: 'Enterprise Type-Safe Architecture', category: 'Frontend', tags: ['TypeScript', 'TS', 'Typed', 'JavaScript'] },
      { id: 'tailwind', name: 'Tailwind CSS', role: 'Pixel-Perfect Responsive UI', category: 'Frontend', tags: ['Tailwind', 'CSS', 'Responsive', 'UI'] },
      { id: 'flutter', name: 'Flutter / Dart', role: 'iOS & Android Native Mobile Apps', category: 'Frontend', tags: ['Flutter', 'Dart', 'Mobile', 'iOS', 'Android'] },
      { id: 'nodejs', name: 'Node.js', role: 'High-Concurrency REST & WebSockets', category: 'Backend', tags: ['Node.js', 'Node', 'Backend', 'Express', 'API'] },
      { id: 'python', name: 'Python', role: 'Data Pipelines & Automation', category: 'Backend', tags: ['Python', 'Django', 'FastAPI', 'Automation', 'AI'] },
      { id: 'laravel', name: 'Laravel / PHP', role: 'Enterprise ERP & Back-Office Portals', category: 'Backend', tags: ['Laravel', 'PHP', 'ERP', 'Backend'] },
      { id: 'csharp', name: 'C# / .NET', role: 'Desktop POS & Retail Cash Drawer APIs', category: 'Backend', tags: ['C#', '.NET', 'CSharp', 'Desktop', 'POS'] },
      { id: 'postgresql', name: 'PostgreSQL / SQL', role: 'ACID Relational Enterprise Data', category: 'Database', tags: ['Postgres', 'PostgreSQL', 'SQL', 'Database', 'RDBMS'] },
      { id: 'mysql', name: 'MySQL', role: 'Ultra-Fast Transactional Inventory', category: 'Database', tags: ['MySQL', 'SQL', 'Database', 'InnoDB'] },
      { id: 'redis', name: 'Redis', role: 'In-Memory Cache & Session State', category: 'Database', tags: ['Redis', 'Cache', 'In-Memory', 'Sessions'] },
      { id: 'firebase', name: 'Firebase Cloud', role: 'Real-Time Sync & Mobile Notification', category: 'Database', tags: ['Firebase', 'NoSQL', 'Google Cloud', 'Realtime'] },
      { id: 'docker', name: 'Docker', role: 'Containerized Reliable Deployments', category: 'DevOps', tags: ['Docker', 'Containers', 'DevOps', 'CI/CD'] },
      { id: 'linux', name: 'Linux / Ubuntu', role: 'Hardened Server & Network Security', category: 'DevOps', tags: ['Linux', 'Ubuntu', 'Server', 'Hosting'] },
      { id: 'cloud', name: 'Cloud & Networks', role: 'AWS, Cloudflare, VPN & Wi-Fi LANs', category: 'DevOps', tags: ['AWS', 'Cloudflare', 'Cloud', 'Network', 'LAN'] },
      { id: 'hardware-pos', name: 'ESC/POS & Thermal', role: 'Direct Hardware & Receipt Protocol', category: 'Hardware', tags: ['ESC/POS', 'Printer', 'Thermal', 'Receipt', 'Barcode'] },
    ];

    techItems.forEach((t) => {
      items.push({
        id: `tech-${t.id}`,
        type: 'technology',
        title: t.name,
        categoryLabel: `Tech: ${t.category}`,
        description: t.role,
        tags: [...t.tags, 'Technologies We Use', 'Dubai Standard Tech'],
        targetSection: 'technologies',
        targetElementId: `tech-badge-${t.id}`,
        priceOrHighlight: 'Enterprise Stack',
        whatsappMessage: `Hi EVONIX TECHNOLOGIES, I would like to build a project using ${t.name}.`,
      });
    });

    // 5. Frequently Asked Questions
    FAQ_ITEMS.forEach((f) => {
      items.push({
        id: `faq-${f.id}`,
        type: 'faq',
        title: f.question,
        categoryLabel: `FAQ: ${f.highlightBadge || 'Q&A'}`,
        description: f.answer,
        tags: [f.category, f.highlightBadge || 'FAQ', 'Dubai Transition', 'Doorstep', 'Pricing', 'Warranty'],
        targetSection: 'faq',
        targetElementId: f.id,
        priceOrHighlight: f.highlightBadge || 'Verified Answer',
        whatsappMessage: `Hi EVONIX TECHNOLOGIES, I have a question regarding: ${f.question}`,
      });
    });

    // 6. Global Reach & Geographic Hubs
    items.push(
      {
        id: 'reach-map',
        type: 'technology',
        title: 'Global Reach: Dubai to Sialkot Technology Corridor',
        categoryLabel: 'Global Reach (D3.js Visualization)',
        description: 'Interactive map visualization bridging 20+ years of Dubai enterprise experience with our modern Sialkot tech center.',
        tags: ['Global Reach', 'Dubai', 'Sialkot', 'UAE', 'Pakistan', 'Map', 'Expansion', 'D3', 'Bridge'],
        targetSection: 'reach',
        targetElementId: 'reach',
        priceOrHighlight: '20+ Yrs UAE Bridge',
        whatsappMessage: 'Hi EVONIX TECHNOLOGIES, I am inquiring about your Dubai enterprise experience and Sialkot operations.',
      },
      {
        id: 'reach-dubai',
        type: 'technology',
        title: 'Dubai Hub (UAE) – 20+ Years Enterprise DNA',
        categoryLabel: 'Global Reach: UAE Operations',
        description: '2004 foundation in Dubai delivering banking-grade portals, cloud ERPs, and high-concurrency systems across GCC.',
        tags: ['Dubai', 'UAE', 'Gulf', 'GCC', 'Abu Dhabi', 'Sharjah', 'Cloud ERP'],
        targetSection: 'reach',
        targetElementId: 'reach',
        priceOrHighlight: '2004 – 2024+',
        whatsappMessage: 'Hi EVONIX TECHNOLOGIES, I would like to inquire about your Dubai legacy and enterprise cloud architecture.',
      },
      {
        id: 'reach-sialkot',
        type: 'technology',
        title: 'Sialkot Tech Center – Pakistan Direct Expansion',
        categoryLabel: 'Global Reach: Pakistan Hub',
        description: 'SECP registered corporate tech center providing doorstep IT visits, export e-commerce for sports & surgical manufacturers, and genuine hardware lab.',
        tags: ['Sialkot', 'Pakistan', 'Doorstep', 'SECP', 'Export ERP', 'Surgical', 'Sports Goods', 'Hardware Lab'],
        targetSection: 'reach',
        targetElementId: 'reach',
        priceOrHighlight: 'Direct Expansion',
        whatsappMessage: 'Hi EVONIX TECHNOLOGIES, I would like to book a doorstep IT service or discuss software development in Sialkot.',
      }
    );

    // 7. Client Testimonials & Social Proof
    TESTIMONIALS_DATA.forEach((test) => {
      items.push({
        id: `testimonial-${test.id}`,
        type: 'portfolio',
        title: `${test.clientName} (${test.flag} ${test.location}) – ${test.company}`,
        categoryLabel: `Client Review: ${test.region === 'dubai' ? 'Dubai Enterprise' : 'Sialkot Business'}`,
        description: `"${test.quote.slice(0, 140)}..." – Scope: ${test.projectContext.serviceType}`,
        tags: [
          'Review',
          'Testimonial',
          'Client Feedback',
          test.clientName,
          test.company,
          test.location,
          test.region,
          test.industry,
          test.projectContext.serviceType,
        ],
        targetSection: 'testimonials',
        targetElementId: 'testimonials',
        priceOrHighlight: `${test.rating}.0 ★ Verified`,
        whatsappMessage: `Hi EVONIX TECHNOLOGIES, I saw the client review from ${test.company} and would like to discuss a similar project.`,
      });
    });

    // 8. 60 SEO Technical Blogs & Guides
    ALL_BLOGS.forEach((b) => {
      items.push({
        id: `blog-${b.id}`,
        type: 'blog',
        title: b.title,
        categoryLabel: `Blog: ${b.categoryLabel}`,
        description: b.excerpt,
        tags: [...b.tags, ...b.targetKeywords, b.categoryLabel, 'Technical Guide', 'Tutorial'],
        targetSection: 'blogs',
        targetElementId: 'blogs',
        priceOrHighlight: b.readTime,
        whatsappMessage: `Hi EVONIX TECHNOLOGIES, I am reading your article: ${b.title}`,
      });
    });

    return items;
  }, []);

  // Filter based on query and category
  const filteredResults = useMemo(() => {
    let result = allSearchItems;

    if (selectedCategory === 'services') {
      result = result.filter((item) => item.type === 'service');
    } else if (selectedCategory === 'portfolio') {
      result = result.filter((item) => item.type === 'portfolio');
    } else if (selectedCategory === 'shop') {
      result = result.filter((item) => item.type === 'shop');
    } else if (selectedCategory === 'technologies') {
      result = result.filter((item) => item.type === 'technology');
    } else if (selectedCategory === 'faq') {
      result = result.filter((item) => item.type === 'faq');
    } else if (selectedCategory === 'blogs') {
      result = result.filter((item) => item.type === 'blog');
    }

    const q = query.trim().toLowerCase();
    if (!q) {
      return result;
    }

    return result.filter((item) => {
      const matchTitle = item.title.toLowerCase().includes(q);
      const matchDesc = item.description.toLowerCase().includes(q);
      const matchCat = item.categoryLabel.toLowerCase().includes(q);
      const matchTags = item.tags.some((t) => t.toLowerCase().includes(q));
      return matchTitle || matchDesc || matchCat || matchTags;
    });
  }, [allSearchItems, selectedCategory, query]);

  // Handle keyboard navigation inside results
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;

      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev < filteredResults.length - 1 ? prev + 1 : prev));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev > 0 ? prev - 1 : 0));
      } else if (e.key === 'Enter') {
        if (filteredResults[selectedIndex]) {
          e.preventDefault();
          handleSelectResult(filteredResults[selectedIndex]);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, filteredResults, selectedIndex]);

  // Scroll selected item into view
  useEffect(() => {
    if (resultsContainerRef.current) {
      const selectedEl = resultsContainerRef.current.querySelector(
        `[data-index="${selectedIndex}"]`
      ) as HTMLElement | null;
      if (selectedEl) {
        selectedEl.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
      }
    }
  }, [selectedIndex]);

  const handleSelectResult = (item: SearchResultItem) => {
    onClose();
    onNavigateToSection(item.targetSection, item.targetElementId);
  };

  const popularSearches = [
    'POS Systems',
    'Website Development',
    'Laptop Repair',
    'Thermal Printer',
    'On-Site Sialkot',
    'Dubai Clients',
    'SSD Upgrade',
    'Restaurant Software',
  ];

  if (!isOpen) return null;

  const getItemIcon = (type: SearchResultItem['type']) => {
    switch (type) {
      case 'service':
        return <Cpu className="w-4 h-4 text-cyan-400" />;
      case 'portfolio':
        return <Globe className="w-4 h-4 text-amber-400" />;
      case 'shop':
        return <ShoppingBag className="w-4 h-4 text-emerald-400" />;
      case 'technology':
        return <Sparkles className="w-4 h-4 text-blue-400" />;
      case 'faq':
        return <HelpCircle className="w-4 h-4 text-purple-400" />;
      case 'blog':
        return <BookOpen className="w-4 h-4 text-red-500 dark:text-rose-400" />;
    }
  };

  const getBadgeColor = (type: SearchResultItem['type']) => {
    switch (type) {
      case 'service':
        return 'bg-cyan-950 text-cyan-300 border-cyan-800/60';
      case 'portfolio':
        return 'bg-amber-950 text-amber-300 border-amber-800/60';
      case 'shop':
        return 'bg-emerald-950 text-emerald-300 border-emerald-800/60';
      case 'technology':
        return 'bg-blue-950 text-blue-300 border-blue-800/60';
      case 'faq':
        return 'bg-purple-950 text-purple-300 border-purple-800/60';
      case 'blog':
        return 'bg-red-50 dark:bg-rose-950 text-red-700 dark:text-rose-300 border-red-200 dark:border-rose-800/60';
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center p-3 sm:p-6 sm:pt-16 bg-slate-950/80 backdrop-blur-md animate-fade-in"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700/80 rounded-2xl shadow-2xl shadow-black overflow-hidden flex flex-col max-h-[85vh] transition-colors"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Header Bar with Input */}
        <div className="p-4 sm:p-5 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/90 flex items-center gap-3">
          <Search className="w-5 h-5 text-red-500 dark:text-cyan-400 flex-shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            placeholder="Search services, POS software, 60 tech guides, portfolio, laptops..."
            className="w-full bg-transparent text-slate-900 dark:text-white placeholder-slate-400 text-sm sm:text-base focus:outline-none"
          />
          {query && (
            <button
              onClick={() => {
                setQuery('');
                inputRef.current?.focus();
              }}
              className="p-1 rounded-md text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-slate-800"
              title="Clear search"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <kbd className="hidden sm:inline-block px-2 py-0.5 text-[11px] font-mono font-semibold text-slate-500 dark:text-slate-400 bg-slate-200 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-md">
            ESC
          </kbd>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-slate-800 sm:hidden"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Category Filter Pills */}
        <div className="px-4 py-2.5 bg-slate-100/70 dark:bg-slate-950/40 border-b border-slate-200 dark:border-slate-800/80 flex items-center gap-2 overflow-x-auto text-xs">
          <button
            onClick={() => {
              setSelectedCategory('all');
              setSelectedIndex(0);
            }}
            className={`px-3 py-1 rounded-lg font-medium transition-all whitespace-nowrap cursor-pointer ${
              selectedCategory === 'all'
                ? 'bg-red-600 dark:bg-cyan-500 text-white dark:text-slate-950 shadow-sm font-semibold'
                : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white border border-slate-200 dark:border-slate-800'
            }`}
          >
            All Results ({allSearchItems.length})
          </button>
          <button
            onClick={() => {
              setSelectedCategory('blogs');
              setSelectedIndex(0);
            }}
            className={`px-3 py-1 rounded-lg font-medium transition-all whitespace-nowrap flex items-center gap-1.5 cursor-pointer ${
              selectedCategory === 'blogs'
                ? 'bg-red-600 dark:bg-cyan-500 text-white dark:text-slate-950 shadow-sm font-semibold'
                : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white border border-slate-200 dark:border-slate-800'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            Blogs & Tech Guides (60)
          </button>
          <button
            onClick={() => {
              setSelectedCategory('services');
              setSelectedIndex(0);
            }}
            className={`px-3 py-1 rounded-lg font-medium transition-all whitespace-nowrap flex items-center gap-1.5 cursor-pointer ${
              selectedCategory === 'services'
                ? 'bg-red-600 dark:bg-cyan-500 text-white dark:text-slate-950 shadow-sm font-semibold'
                : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white border border-slate-200 dark:border-slate-800'
            }`}
          >
            <Cpu className="w-3.5 h-3.5" />
            Our Services (4)
          </button>
          <button
            onClick={() => {
              setSelectedCategory('portfolio');
              setSelectedIndex(0);
            }}
            className={`px-3 py-1 rounded-lg font-medium transition-all whitespace-nowrap flex items-center gap-1.5 cursor-pointer ${
              selectedCategory === 'portfolio'
                ? 'bg-red-600 dark:bg-cyan-500 text-white dark:text-slate-950 shadow-sm font-semibold'
                : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white border border-slate-200 dark:border-slate-800'
            }`}
          >
            <Globe className="w-3.5 h-3.5" />
            Dubai & UAE Portfolio (7)
          </button>
          <button
            onClick={() => {
              setSelectedCategory('shop');
              setSelectedIndex(0);
            }}
            className={`px-3 py-1 rounded-lg font-medium transition-all whitespace-nowrap flex items-center gap-1.5 cursor-pointer ${
              selectedCategory === 'shop'
                ? 'bg-red-600 dark:bg-cyan-500 text-white dark:text-slate-950 shadow-sm font-semibold'
                : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white border border-slate-200 dark:border-slate-800'
            }`}
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            Hardware & Shop (8)
          </button>
          <button
            onClick={() => {
              setSelectedCategory('technologies');
              setSelectedIndex(0);
            }}
            className={`px-3 py-1 rounded-lg font-medium transition-all whitespace-nowrap flex items-center gap-1.5 cursor-pointer ${
              selectedCategory === 'technologies'
                ? 'bg-red-600 dark:bg-cyan-500 text-white dark:text-slate-950 shadow-sm font-semibold'
                : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white border border-slate-200 dark:border-slate-800'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            Tech Stack (17)
          </button>
          <button
            onClick={() => {
              setSelectedCategory('faq');
              setSelectedIndex(0);
            }}
            className={`px-3 py-1 rounded-lg font-medium transition-all whitespace-nowrap flex items-center gap-1.5 cursor-pointer ${
              selectedCategory === 'faq'
                ? 'bg-red-600 dark:bg-cyan-500 text-white dark:text-slate-950 shadow-sm font-semibold'
                : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white border border-slate-200 dark:border-slate-800'
            }`}
          >
            <HelpCircle className="w-3.5 h-3.5" />
            FAQ ({FAQ_ITEMS.length})
          </button>
        </div>

        {/* Quick Suggestions when Query is Empty */}
        {!query && (
          <div className="px-5 py-3 bg-slate-50 dark:bg-slate-900/60 border-b border-slate-200 dark:border-slate-800/60 flex items-center gap-2 flex-wrap text-xs">
            <span className="text-slate-600 dark:text-slate-400 font-medium">Quick suggestions:</span>
            {popularSearches.map((term, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setQuery(term);
                  setSelectedIndex(0);
                  inputRef.current?.focus();
                }}
                className="px-2.5 py-1 rounded-md bg-white dark:bg-slate-800/80 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 hover:text-red-600 dark:hover:text-cyan-300 border border-slate-200 dark:border-slate-700 transition-colors cursor-pointer shadow-xs"
              >
                {term}
              </button>
            ))}
          </div>
        )}

        {/* Results List */}
        <div
          ref={resultsContainerRef}
          className="flex-1 overflow-y-auto p-3 sm:p-4 space-y-2.5 divide-y divide-slate-100 dark:divide-slate-800/40"
        >
          {filteredResults.length === 0 ? (
            <div className="py-12 text-center space-y-3">
              <Search className="w-10 h-10 text-slate-400 dark:text-slate-600 mx-auto" />
              <p className="text-base font-semibold text-slate-800 dark:text-slate-300">
                No matching results found for "{query}"
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm mx-auto">
                Try searching for "POS", "website", "laptop", "printer", "on-site", or contact our Sialkot desk directly.
              </p>
              <button
                onClick={() => {
                  onClose();
                  onSelectForQuote(`Inquiry regarding: ${query}`);
                }}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-red-50 dark:bg-cyan-500/20 text-red-700 dark:text-cyan-300 border border-red-200 dark:border-cyan-500/40 text-xs font-semibold hover:bg-red-100 dark:hover:bg-cyan-500/30 transition-colors"
              >
                <Sparkles className="w-3.5 h-3.5" />
                Submit Custom Quote for "{query}"
              </button>
            </div>
          ) : (
            filteredResults.map((item, index) => {
              const isSelected = index === selectedIndex;
              return (
                <div
                  key={item.id}
                  data-index={index}
                  onMouseEnter={() => setSelectedIndex(index)}
                  className={`pt-2.5 first:pt-0 rounded-xl p-3.5 transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-slate-100 dark:bg-slate-800/90 border border-red-500/30 dark:border-cyan-800/60 shadow-md'
                      : 'hover:bg-slate-50 dark:hover:bg-slate-800/40 border border-transparent'
                  }`}
                  onClick={() => handleSelectResult(item)}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-start gap-3 flex-1 min-w-0">
                      <div className="p-2 rounded-lg bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 flex-shrink-0 mt-0.5 shadow-xs">
                        {getItemIcon(item.type)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap mb-1">
                          <span
                            className={`px-2 py-0.5 rounded text-[10px] font-semibold uppercase tracking-wider border ${getBadgeColor(
                              item.type
                            )}`}
                          >
                            {item.categoryLabel}
                          </span>
                          {item.priceOrHighlight && (
                            <span className="text-[11px] text-slate-500 dark:text-slate-400 font-mono flex items-center gap-1">
                              <Tag className="w-3 h-3 text-red-500 dark:text-cyan-400" />
                              {item.priceOrHighlight}
                            </span>
                          )}
                        </div>

                        <h4 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white truncate">
                          {item.title}
                        </h4>

                        <p className="text-xs text-slate-600 dark:text-slate-300 mt-1 line-clamp-2 leading-relaxed">
                          {item.description}
                        </p>

                        {/* Matching tags */}
                        <div className="flex flex-wrap gap-1.5 mt-2">
                          {item.tags.slice(0, 4).map((tag, tIdx) => (
                            <span
                              key={tIdx}
                              className="px-2 py-0.5 rounded text-[10px] bg-slate-100 dark:bg-slate-950/80 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-800/80"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Quick Action Buttons on Desktop */}
                    <div className="flex flex-col sm:flex-row items-end sm:items-center gap-2 flex-shrink-0">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onClose();
                          onSelectForQuote(item.title);
                        }}
                        className="px-2.5 py-1.5 rounded-lg bg-red-50 dark:bg-cyan-950 hover:bg-red-100 dark:hover:bg-cyan-900 text-red-700 dark:text-cyan-300 border border-red-200 dark:border-cyan-800/80 text-xs font-semibold transition-colors flex items-center gap-1"
                        title="Get Quote for this item"
                      >
                        <Sparkles className="w-3 h-3" />
                        <span className="hidden sm:inline">Get Quote</span>
                      </button>

                      <a
                        href={`https://wa.me/${COMPANY_INFO.contact.whatsapp}?text=${encodeURIComponent(
                          item.whatsappMessage || `Hi EVONIX TECHNOLOGIES, inquiring about: ${item.title}`
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="p-1.5 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 hover:bg-emerald-100 dark:hover:bg-emerald-900/60 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800/60 transition-colors"
                        title="WhatsApp Inquiry"
                      >
                        <MessageSquare className="w-3.5 h-3.5" />
                      </a>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleSelectResult(item);
                        }}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-slate-700"
                        title="Jump to element on page"
                      >
                        <ArrowRight className="w-4 h-4 text-red-500 dark:text-cyan-400" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Modal Footer with Keyboard Navigation hints */}
        <div className="p-3 bg-slate-50 dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
          <div className="flex items-center gap-4">
            <span className="hidden sm:inline-flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 rounded bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 font-mono text-[10px]">
                ↑
              </kbd>
              <kbd className="px-1.5 py-0.5 rounded bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 font-mono text-[10px]">
                ↓
              </kbd>{' '}
              to navigate
            </span>
            <span className="hidden sm:inline-flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 rounded bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 font-mono text-[10px]">
                ↵
              </kbd>{' '}
              to select
            </span>
            <span className="text-slate-500 dark:text-slate-400">
              Showing {filteredResults.length} of {allSearchItems.length} items
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-[11px] text-slate-500 dark:text-slate-400">Sialkot Service Desk</span>
            <a
              href={`mailto:${COMPANY_INFO.contact.email}`}
              className="text-red-600 dark:text-cyan-400 hover:underline text-[11px] font-medium"
            >
              {COMPANY_INFO.contact.email}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
