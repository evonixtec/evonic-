import React, { useState, useMemo, useEffect } from 'react';
import { Search, BookOpen, Clock, Calendar, ArrowRight, Sparkles, Filter, CheckCircle2, ChevronRight, Barcode, Wrench, ExternalLink, Laptop } from 'lucide-react';
import { ALL_BLOGS, B2B_BLOGS, HARDWARE_STORE_BLOGS, B2B_BLOG_CATEGORIES, STORE_BLOG_CATEGORIES, BlogCategory, BlogPost } from '../data/blogs';
import { SectionId } from '../types';
import { BlogReaderModal } from './BlogReaderModal';
import { EvonixMark } from './EvonixLogo';
import { applyBlogPostSEO, applyPageSEO } from '../lib/seo';
import { isStoreSubdomain, getStoreDomainUrl, getMainAgencyDomainUrl } from '../lib/domainUtils';

interface BlogHubProps {
  onNavigateSection: (sectionId: SectionId | string) => void;
  onOpenQuoteModal?: (serviceId?: string) => void;
}

export const BlogHub: React.FC<BlogHubProps> = ({ onNavigateSection, onOpenQuoteModal }) => {
  const isStore = isStoreSubdomain();
  const activeCategories = isStore ? STORE_BLOG_CATEGORIES : B2B_BLOG_CATEGORIES;
  const currentDomainBlogs = isStore ? HARDWARE_STORE_BLOGS : B2B_BLOGS;

  const [activeCategory, setActiveCategory] = useState<BlogCategory | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [visibleCount, setVisibleCount] = useState(9);
  const [readingBlog, setReadingBlog] = useState<BlogPost | null>(null);

  // Filtered list strictly scoped to current domain (B2B on main site, Hardware on store)
  const filteredBlogs = useMemo(() => {
    let pool = currentDomainBlogs;
    if (activeCategory !== 'all') {
      pool = pool.filter((b) => b.category === activeCategory);
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      pool = pool.filter(
        (b) =>
          b.title.toLowerCase().includes(q) ||
          b.excerpt.toLowerCase().includes(q) ||
          b.tags.some((t) => t.toLowerCase().includes(q)) ||
          b.content.toLowerCase().includes(q)
      );
    }
    if (selectedTag) {
      pool = pool.filter((b) => b.tags.includes(selectedTag));
    }
    return pool;
  }, [currentDomainBlogs, activeCategory, searchQuery, selectedTag]);

  // Top popular tags for current category
  const availableTags = useMemo(() => {
    const tagsMap = new Map<string, number>();
    const currentPool = activeCategory === 'all' 
      ? currentDomainBlogs 
      : currentDomainBlogs.filter((b) => b.category === activeCategory);
    
    currentPool.forEach((b) => {
      b.tags.forEach((t) => {
        tagsMap.set(t, (tagsMap.get(t) || 0) + 1);
      });
    });

    return Array.from(tagsMap.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 8)
      .map(([t]) => t);
  }, [activeCategory]);

  const displayedBlogs = filteredBlogs.slice(0, visibleCount);

  // Synchronize SEO when reading a specific guide or browsing guides hub
  useEffect(() => {
    if (readingBlog) {
      applyBlogPostSEO(readingBlog);
    } else {
      applyPageSEO('guides');
    }
  }, [readingBlog]);

  const handleOpenBlog = (blog: BlogPost) => {
    setReadingBlog(blog);
    const cleanUrl = `/blog/${blog.slug}`;
    if (window.location.pathname !== cleanUrl) {
      window.history.pushState({ blogSlug: blog.slug }, '', cleanUrl);
    }
  };

  const handleCloseBlog = () => {
    setReadingBlog(null);
    if (window.location.pathname.startsWith('/blog/')) {
      window.history.pushState({}, '', '/guides');
    }
  };

  // Support direct clean URL path (/blog/some-slug) and legacy hash (#blog-1)
  useEffect(() => {
    const checkBlogRoute = () => {
      const path = window.location.pathname.toLowerCase();
      const blogPrefixes = ['/blog/', '/blogs/', '/guides/', '/guidelines/', '/guide/'];
      for (const prefix of blogPrefixes) {
        if (path.startsWith(prefix)) {
          const slug = path.replace(prefix, '').replace(/\/$/, '');
          const target = ALL_BLOGS.find((b) => b.slug.toLowerCase() === slug || b.id.toString() === slug);
          if (target) {
            setReadingBlog(target);
            return;
          }
        }
      }

      // Direct root-level slug match (e.g. /pos-software-in-sialkot)
      const cleanRootSlug = path.replace(/^\/+|\/+$/g, '');
      if (cleanRootSlug) {
        const directTarget = ALL_BLOGS.find((b) => b.slug.toLowerCase() === cleanRootSlug || b.id.toString() === cleanRootSlug);
        if (directTarget) {
          setReadingBlog(directTarget);
          return;
        }
      }

      const hash = window.location.hash.toLowerCase();
      if (hash.startsWith('#blog-')) {
        const idOrSlug = hash.replace('#blog-', '');
        const target = ALL_BLOGS.find((b) => b.id.toString() === idOrSlug || b.slug === idOrSlug);
        if (target) setReadingBlog(target);
      }
    };

    checkBlogRoute();
    window.addEventListener('popstate', checkBlogRoute);
    window.addEventListener('hashchange', checkBlogRoute);
    return () => {
      window.removeEventListener('popstate', checkBlogRoute);
      window.removeEventListener('hashchange', checkBlogRoute);
    };
  }, []);

  return (
    <section id="blogs" className="py-20 md:py-28 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-6 text-left">
          <div className="max-w-2xl space-y-3 text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-50 border border-red-200 text-red-700 text-xs font-semibold">
              <EvonixMark className="w-3.5 h-3.5" />
              <span>
                {isStore
                  ? 'official evonix hardware store knowledge hub'
                  : 'official evonix b2b software & engineering knowledge hub'}
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#1E1E1E] tracking-tight text-left">
              {isStore
                ? `${HARDWARE_STORE_BLOGS.length}+ Hardware, Laptop & Printer Repair Guides`
                : `${B2B_BLOGS.length}+ B2B Software, Web & Enterprise AI Guides`}
            </h2>
            <p className="text-sm sm:text-base text-slate-600 leading-[1.55] font-sans text-left">
              {isStore
                ? 'Step-by-step bench diagnostics from our Sialkot hardware lab. Covering motherboard chip repair, laser fusers, thermal receipt printers, and power sequencing.'
                : 'Written by evonix engineers with 20+ years Dubai enterprise experience. Covering custom software architecture, offline-first POS systems, export portals, and modern cloud engineering.'}
            </p>
          </div>

          {/* Quick Search Input */}
          <div className="w-full md:w-80 relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder={
                isStore
                  ? `Search ${HARDWARE_STORE_BLOGS.length}+ hardware guides...`
                  : `Search ${B2B_BLOGS.length}+ B2B software guides...`
              }
              aria-label="Search tech blogs and guides"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setVisibleCount(9);
              }}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 bg-white text-xs sm:text-sm text-[#1E1E1E] placeholder-slate-400 focus:outline-none focus:border-red-500 shadow-2xs"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-500 hover:text-[#1E1E1E] font-semibold"
              >
                Clear
              </button>
            )}
          </div>
        </div>

        {/* Cross-Domain Bridge Banner: Hardware Articles Moved to store.evonixtec.com */}
        {!isStore && (
          <div className="mb-8 p-6 rounded-[28px] bg-gradient-to-r from-amber-500/10 via-amber-50 to-orange-50 border border-amber-300/80 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-2xs text-left">
            <div className="flex items-start gap-4 text-left">
              <div className="w-12 h-12 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center flex-shrink-0 text-amber-800">
                <Laptop className="w-6 h-6" />
              </div>
              <div className="space-y-1 text-left">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-bold tracking-wider uppercase text-amber-800 bg-amber-200/70 px-2 py-0.5 rounded">
                    Hardware Subdomain Hub
                  </span>
                  <span className="text-xs text-slate-600 font-medium">store.evonixtec.com</span>
                </div>
                <h3 className="text-base font-bold text-[#1E1E1E] text-left">
                  Looking for Laptop, Printer &amp; Motherboard Repair Guides?
                </h3>
                <p className="text-xs text-slate-600 leading-[1.55] text-left">
                  All 20 hardware diagnostic and bench repair articles are hosted on our dedicated Hardware Store.
                </p>
              </div>
            </div>
            {/* Single Primary Action */}
            <a
              href={getStoreDomainUrl('/guides')}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold transition-all shadow-md flex-shrink-0 cursor-pointer"
            >
              <span>View Hardware Guides</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        )}

        {isStore && (
          <div className="mb-8 p-6 rounded-[28px] bg-gradient-to-r from-blue-500/10 via-blue-50 to-slate-50 border border-blue-300/80 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-2xs text-left">
            <div className="flex items-start gap-4 text-left">
              <div className="w-12 h-12 rounded-xl bg-blue-500/20 border border-blue-500/40 flex items-center justify-center flex-shrink-0 text-blue-800">
                <BookOpen className="w-6 h-6" />
              </div>
              <div className="space-y-1 text-left">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-bold tracking-wider uppercase text-blue-800 bg-blue-200/70 px-2 py-0.5 rounded">
                    B2B Agency Hub
                  </span>
                  <span className="text-xs text-slate-600 font-medium">evonixtec.com</span>
                </div>
                <h3 className="text-base font-bold text-[#1E1E1E] text-left">
                  Looking for B2B Software, POS or Web Development?
                </h3>
                <p className="text-xs text-slate-600 leading-[1.55] text-left">
                  Read our 80+ software architecture, ERP engineering, and enterprise AI guides on the main agency domain.
                </p>
              </div>
            </div>
            {/* Single Primary Action */}
            <a
              href={getMainAgencyDomainUrl('/guides')}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition-all shadow-md flex-shrink-0 cursor-pointer"
            >
              <span>View B2B Software Guides</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        )}

        {/* Category Tabs */}
        <div className="flex flex-wrap items-center gap-2 mb-6">
          {activeCategories.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => {
                  setActiveCategory(cat.id);
                  setSelectedTag(null);
                  setVisibleCount(9);
                }}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center gap-2 border cursor-pointer ${
                  isActive
                    ? 'bg-red-600 text-white border-red-600 shadow-xs font-bold'
                    : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300 hover:bg-slate-100'
                }`}
              >
                <span>{cat.label}</span>
                <span
                  className={`text-[11px] font-mono px-2 py-0.5 rounded-full ${
                    isActive
                      ? 'bg-red-700 text-white'
                      : 'bg-slate-100 text-slate-600'
                  }`}
                >
                  {cat.count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Tag Filters */}
        {availableTags.length > 0 && (
          <div className="flex flex-wrap items-center gap-1.5 mb-8 pb-4 border-b border-slate-200">
            <span className="text-xs font-semibold text-slate-500 flex items-center gap-1 mr-1">
              <Filter className="w-3.5 h-3.5" />
              Topics:
            </span>
            {selectedTag && (
              <button
                onClick={() => setSelectedTag(null)}
                className="text-[11px] font-semibold px-2.5 py-1 rounded-lg bg-red-600 text-white cursor-pointer"
              >
                Reset Tag ✕
              </button>
            )}
            {availableTags.map((tag) => (
              <button
                key={tag}
                onClick={() => setSelectedTag(selectedTag === tag ? null : tag)}
                className={`text-[11px] font-medium px-2.5 py-1 rounded-lg transition-colors cursor-pointer ${
                  selectedTag === tag
                    ? 'bg-red-600 text-white font-bold'
                    : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
                }`}
              >
                #{tag}
              </button>
            ))}
          </div>
        )}

        {/* Featured Exporter Utility Banner: Export Barcode Label Generator Studio */}
        <div className="mb-8 p-6 rounded-[28px] bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white flex flex-col sm:flex-row items-center justify-between gap-6 border border-slate-700 shadow-sm text-left">
          <div className="flex items-start gap-4 text-left">
            <div className="w-12 h-12 rounded-xl bg-red-600/20 border border-red-500/30 flex items-center justify-center flex-shrink-0 text-red-400">
              <Barcode className="w-6 h-6" />
            </div>
            <div className="space-y-1 text-left">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold tracking-widest uppercase text-red-400">
                  Featured Sialkot Exporter Tool
                </span>
                <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  Zero Database
                </span>
              </div>
              <h3 className="text-base sm:text-lg font-bold text-white text-left">
                Export Barcode Label Generator Studio (GS1-128, Code128, Carton Stickers)
              </h3>
              <p className="text-xs text-slate-300 leading-[1.55] max-w-xl text-left">
                Generate compliant shipping labels, outer carton barcodes, and product serials for surgical, sports &amp; leather consignments.
              </p>
            </div>
          </div>
          {/* Single Primary Red Action */}
          <button
            type="button"
            onClick={() => onNavigateSection('export-barcode-studio')}
            className="whitespace-nowrap px-6 py-3 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs sm:text-sm shadow-md shadow-red-600/30 hover:shadow-red-600/50 transition-all flex items-center gap-2 cursor-pointer flex-shrink-0"
          >
            <span>Open Barcode Studio</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Trending AI Research Guide Banner */}
        <div className="mb-8 p-6 rounded-[28px] bg-gradient-to-r from-teal-950 via-slate-900 to-slate-950 text-white flex flex-col sm:flex-row items-center justify-between gap-6 border border-teal-500/40 shadow-sm text-left">
          <div className="flex items-start gap-4 text-left">
            <div className="w-12 h-12 rounded-xl bg-teal-500/20 border border-teal-400/30 flex items-center justify-center flex-shrink-0 text-teal-400">
              <Sparkles className="w-6 h-6" />
            </div>
            <div className="space-y-1 text-left">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold tracking-widest uppercase text-teal-400">
                  Trending Guide &bull; +406% Search Volume
                </span>
                <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-teal-500/20 text-teal-300 border border-teal-500/30">
                  Interactive AI Tool
                </span>
              </div>
              <h3 className="text-base sm:text-lg font-bold text-white text-left">
                Tools Required for Artificial Intelligence: 10 Best AI Tools Name for Travel Itinerary
              </h3>
              <p className="text-xs text-slate-300 leading-[1.55] max-w-xl text-left">
                Expert tested list for travel planning, flight price prediction, vacation schedules, plus free day-by-day itinerary generator.
              </p>
            </div>
          </div>
          {/* Single Primary Action */}
          <a
            href="/ai-tools-name-for-travel-itinerary"
            onClick={(e) => {
              e.preventDefault();
              onNavigateSection('ai-travel-tools');
            }}
            className="whitespace-nowrap px-6 py-3 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-xs sm:text-sm shadow-md transition-all flex items-center gap-2 cursor-pointer flex-shrink-0"
          >
            <span>Read AI Guide</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>

        {/* Results Counter */}
        <div className="flex items-center justify-between text-xs text-slate-500 mb-6">
          <span>
            Showing <strong className="text-[#1E1E1E]">{displayedBlogs.length}</strong> of{' '}
            <strong className="text-[#1E1E1E]">{filteredBlogs.length}</strong> guides
          </span>
          {activeCategory !== 'all' && (
            <span className="text-red-600 font-semibold">
              Category: {activeCategories.find((c) => c.id === activeCategory)?.label}
            </span>
          )}
        </div>

        {/* Articles Grid */}
        {displayedBlogs.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-[24px] border border-slate-200 p-8">
            <BookOpen className="w-12 h-12 text-slate-300 mx-auto mb-3" />
            <h3 className="text-lg font-bold text-[#1E1E1E]">No matching technical guides found</h3>
            <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto leading-[1.55]">
              Try searching for different keywords such as &ldquo;POS&rdquo;, &ldquo;React&rdquo;, &ldquo;Motherboard&rdquo;, or &ldquo;Printer&rdquo;.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedTag(null);
                setActiveCategory('all');
              }}
              className="mt-4 px-5 py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-xl text-xs font-bold cursor-pointer shadow-xs"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayedBlogs.map((blog) => (
              <article
                key={blog.id}
                onClick={() => handleOpenBlog(blog)}
                className="bg-white border border-slate-200 rounded-[24px] overflow-hidden shadow-2xs hover:shadow-lg hover:border-slate-300 transition-all flex flex-col justify-between cursor-pointer group text-left"
              >
                <div>
                  {/* Blog Visual Thumbnail */}
                  {blog.imageUrl && (
                    <div className="relative w-full aspect-[16/10] bg-slate-100 overflow-hidden border-b border-slate-100 rounded-t-[24px]">
                      <img
                        src={blog.imageUrl}
                        alt={blog.imageAlt || blog.title}
                        loading="lazy"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute top-3 left-3">
                        <span className="inline-flex items-center gap-1.5 text-[10px] font-bold px-2.5 py-1 rounded-full bg-slate-900/80 backdrop-blur-xs text-white shadow-xs">
                          <span
                            className={`w-1.5 h-1.5 rounded-full ${
                              blog.category === 'web-graphics'
                                ? 'bg-red-400'
                                : blog.category === 'software-dev'
                                ? 'bg-blue-400'
                                : 'bg-emerald-400'
                            }`}
                          />
                          {blog.categoryLabel}
                        </span>
                      </div>
                    </div>
                  )}

                  <div className="p-6 text-left">
                    {/* Read Time & Category Meta */}
                    <div className="flex items-center justify-between gap-2 mb-2.5">
                      <span className="text-[11px] text-slate-500 font-medium flex items-center gap-1">
                        <Clock className="w-3 h-3 text-slate-400" />
                        {blog.readTime}
                      </span>
                      <span className="text-[11px] text-slate-500 font-mono">
                        {blog.publishedDate}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="text-base sm:text-lg font-bold text-[#1E1E1E] group-hover:text-red-600 transition-colors leading-snug line-clamp-2 text-left">
                      {blog.title}
                    </h3>

                    {/* Excerpt (Left-Aligned, Line Height 1.55) */}
                    <p className="text-xs sm:text-sm text-slate-600 mt-2.5 line-clamp-2 leading-[1.55] text-left">
                      {blog.excerpt}
                    </p>

                    {/* Keyword Tags */}
                    <div className="flex flex-wrap gap-1.5 mt-3.5">
                      {blog.tags.slice(0, 3).map((tag, tIdx) => (
                        <span
                          key={tIdx}
                          className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-slate-100 text-[#1E1E1E]"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>

                    {/* Barcode Label Studio & Tool Internal Link Badge */}
                    {blog.internalLinks && blog.internalLinks.length > 0 && (
                      <div className="mt-3.5 pt-2.5 border-t border-dashed border-slate-200 flex items-center gap-1.5 text-[11px] text-slate-600">
                        <Barcode className="w-3.5 h-3.5 text-red-600 flex-shrink-0" />
                        <span className="truncate font-semibold text-slate-700 hover:text-red-600 transition-colors">
                          {blog.internalLinks[0].label}
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Footer Single Primary Read Action */}
                <div className="px-6 pb-6 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                  <span className="text-slate-500 font-medium">
                    By {blog.author.name}
                  </span>
                  <span className="inline-flex items-center gap-1.5 font-bold text-red-600 group-hover:text-red-700 group-hover:translate-x-0.5 transition-all">
                    <span>Read Guide</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </article>
            ))}
          </div>
        )}

        {/* Load More Button */}
        {visibleCount < filteredBlogs.length && (
          <div className="text-center mt-12">
            <button
              onClick={() => setVisibleCount((prev) => prev + 9)}
              className="px-6 py-3 rounded-xl bg-white hover:bg-slate-50 border border-slate-300 text-[#1E1E1E] text-xs sm:text-sm font-bold shadow-2xs transition-colors cursor-pointer"
            >
              Load More Tech Blogs & Guides ({filteredBlogs.length - visibleCount} remaining)
            </button>
          </div>
        )}
      </div>

      {/* Full Screen Reading Modal */}
      {readingBlog && (
        <BlogReaderModal
          blog={readingBlog}
          onClose={handleCloseBlog}
          onSelectBlog={(b) => handleOpenBlog(b)}
          onNavigateSection={onNavigateSection}
          onOpenQuoteModal={onOpenQuoteModal}
        />
      )}
    </section>
  );
};
