import React, { useState, useMemo, useEffect } from 'react';
import { Search, BookOpen, Clock, Calendar, ArrowRight, Sparkles, Filter, CheckCircle2, ChevronRight } from 'lucide-react';
import { ALL_BLOGS, BLOG_CATEGORIES, BlogCategory, BlogPost, searchBlogs } from '../data/blogs';
import { SectionId } from '../types';
import { BlogReaderModal } from './BlogReaderModal';
import { EvonixMark } from './EvonixLogo';
import { applyBlogPostSEO, applyPageSEO } from '../lib/seo';

interface BlogHubProps {
  onNavigateSection: (sectionId: SectionId) => void;
  onOpenQuoteModal?: (serviceId?: string) => void;
}

export const BlogHub: React.FC<BlogHubProps> = ({ onNavigateSection, onOpenQuoteModal }) => {
  const [activeCategory, setActiveCategory] = useState<BlogCategory | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [visibleCount, setVisibleCount] = useState(9);
  const [readingBlog, setReadingBlog] = useState<BlogPost | null>(null);

  // Filtered list
  const filteredBlogs = useMemo(() => {
    let pool = searchBlogs(searchQuery, activeCategory);
    if (selectedTag) {
      pool = pool.filter((b) => b.tags.includes(selectedTag));
    }
    return pool;
  }, [searchQuery, activeCategory, selectedTag]);

  // Top popular tags for current category
  const availableTags = useMemo(() => {
    const tagsMap = new Map<string, number>();
    const currentPool = activeCategory === 'all' 
      ? ALL_BLOGS 
      : ALL_BLOGS.filter((b) => b.category === activeCategory);
    
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
    window.location.hash = `blog-${blog.id}`;
  };

  const handleCloseBlog = () => {
    setReadingBlog(null);
    window.location.hash = 'guides';
  };

  // Support direct hash deep-linking (e.g., #blog-1 or #guide-pos-thermal-printer)
  useEffect(() => {
    const checkBlogHash = () => {
      const hash = window.location.hash.toLowerCase();
      if (hash.startsWith('#blog-')) {
        const idOrSlug = hash.replace('#blog-', '');
        const target = ALL_BLOGS.find((b) => b.id.toString() === idOrSlug || b.slug === idOrSlug);
        if (target) setReadingBlog(target);
      }
    };
    checkBlogHash();
    window.addEventListener('hashchange', checkBlogHash);
    return () => window.removeEventListener('hashchange', checkBlogHash);
  }, []);

  return (
    <section id="blogs" className="py-20 md:py-28 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="max-w-2xl space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-50 border border-red-200 text-red-700 text-xs font-bold uppercase tracking-wider">
              <EvonixMark className="w-3.5 h-3.5" />
              <span>EVONIX Technical Knowledge Base & SEO Guides</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight">
              {ALL_BLOGS.length}+ Tech Guides & Sialkot Field Case Studies
            </h2>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-sans">
              Curated by EVONIX engineers with 20+ years Dubai enterprise experience. Featuring real on-site emergency field repairs on Daska Road & Rangpura, surgical ERP deployments, offline POS systems, and chip-level motherboard labs.
            </p>
          </div>

          {/* Quick Search Input */}
          <div className="w-full md:w-80 relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search 60 articles by keyword..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setVisibleCount(9);
              }}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 bg-white text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-red-500 shadow-2xs"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600 font-semibold"
              >
                Clear
              </button>
            )}
          </div>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap items-center gap-2 mb-6">
          {BLOG_CATEGORIES.map((cat) => {
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

        {/* Results Counter */}
        <div className="flex items-center justify-between text-xs text-slate-500 mb-6">
          <span>
            Showing <strong className="text-slate-900">{displayedBlogs.length}</strong> of{' '}
            <strong className="text-slate-900">{filteredBlogs.length}</strong> guides
          </span>
          {activeCategory !== 'all' && (
            <span className="text-red-600 font-semibold">
              Category: {BLOG_CATEGORIES.find((c) => c.id === activeCategory)?.label}
            </span>
          )}
        </div>

        {/* Articles Grid */}
        {displayedBlogs.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-2xl border border-slate-200 p-8">
            <BookOpen className="w-12 h-12 text-slate-300 mx-auto mb-3" />
            <h3 className="text-lg font-bold text-slate-900">No matching technical guides found</h3>
            <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
              Try searching for different keywords such as &ldquo;POS&rdquo;, &ldquo;React&rdquo;, &ldquo;Motherboard&rdquo;, or &ldquo;Printer&rdquo;.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedTag(null);
                setActiveCategory('all');
              }}
              className="mt-4 px-4 py-2 bg-red-600 text-white rounded-xl text-xs font-semibold cursor-pointer"
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
                className="bg-white border border-slate-200 rounded-2xl p-6 shadow-2xs hover:shadow-md hover:border-slate-300 transition-all flex flex-col justify-between cursor-pointer group"
              >
                <div>
                  {/* Category Pill and Meta */}
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="inline-flex items-center gap-1.5 text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700">
                      <span
                        className={`w-1.5 h-1.5 rounded-full ${
                          blog.category === 'web-graphics'
                            ? 'bg-red-500'
                            : blog.category === 'software-dev'
                            ? 'bg-blue-500'
                            : 'bg-emerald-500'
                        }`}
                      />
                      {blog.categoryLabel}
                    </span>
                    <span className="text-[11px] text-slate-500 flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {blog.readTime}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-base sm:text-lg font-bold text-slate-900 group-hover:text-red-600 transition-colors leading-snug line-clamp-2">
                    {blog.title}
                  </h3>

                  {/* Excerpt */}
                  <p className="text-xs sm:text-sm text-slate-600 mt-2.5 line-clamp-3 leading-relaxed">
                    {blog.excerpt}
                  </p>

                  {/* Keyword Tags */}
                  <div className="flex flex-wrap gap-1.5 mt-4">
                    {blog.tags.slice(0, 3).map((tag, tIdx) => (
                      <span
                        key={tIdx}
                        className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-100 text-slate-600"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Footer read action */}
                <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
                  <span className="text-slate-400 font-medium">
                    {blog.publishedDate}
                  </span>
                  <span className="inline-flex items-center gap-1 font-bold text-red-600 group-hover:translate-x-0.5 transition-transform">
                    Read Guide
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
              className="px-6 py-3 rounded-xl bg-white hover:bg-slate-100 border border-slate-300 text-slate-800 text-xs sm:text-sm font-bold shadow-2xs transition-colors cursor-pointer"
            >
              Load More Technical Guides ({filteredBlogs.length - visibleCount} remaining)
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
