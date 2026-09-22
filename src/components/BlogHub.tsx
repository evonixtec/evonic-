import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, BookOpen, Clock, Calendar, ArrowRight, Sparkles, Filter, CheckCircle2, ChevronRight } from 'lucide-react';
import { ALL_BLOGS, BLOG_CATEGORIES, BlogCategory, BlogPost, searchBlogs } from '../data/blogs';
import { SectionId } from '../types';
import { BlogReaderModal } from './BlogReaderModal';
import { EvonixMark } from './EvonixLogo';

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

  return (
    <section id="blogs" className="py-20 bg-slate-50 dark:bg-slate-950/60 border-t border-slate-200 dark:border-slate-800 relative transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="max-w-2xl space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-100 dark:bg-red-950/60 border border-red-200 dark:border-red-900/50 text-red-700 dark:text-red-400 text-xs font-bold uppercase tracking-wider">
              <EvonixMark className="w-3.5 h-3.5" />
              <span>EVONIX Technical Knowledge Base & SEO Guides</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              60 In-Depth Tech Guides & Industry Blueprints
            </h2>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed font-sans">
              Curated by EVONIX engineers across Dubai, Sialkot, and Pune. Explore practical architectures, chip-level repair protocols, and conversion-focused web development.
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
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs sm:text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-red-500 shadow-sm"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600 dark:hover:text-white"
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
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center gap-2 border ${
                  isActive
                    ? 'bg-red-600 text-white border-red-600 shadow-md shadow-red-600/25'
                    : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
                }`}
              >
                <span>{cat.label}</span>
                <span
                  className={`text-[11px] font-mono px-2 py-0.5 rounded-full ${
                    isActive
                      ? 'bg-red-700/60 text-white'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400'
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
          <div className="flex flex-wrap items-center gap-1.5 mb-8 pb-4 border-b border-slate-200 dark:border-slate-800">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 flex items-center gap-1 mr-1">
              <Filter className="w-3.5 h-3.5" />
              Topics:
            </span>
            {selectedTag && (
              <button
                onClick={() => setSelectedTag(null)}
                className="text-[11px] font-semibold px-2.5 py-1 rounded-lg bg-red-600 text-white"
              >
                Reset Tag ✕
              </button>
            )}
            {availableTags.map((tag) => (
              <button
                key={tag}
                onClick={() => setSelectedTag(selectedTag === tag ? null : tag)}
                className={`text-[11px] font-medium px-2.5 py-1 rounded-lg transition-colors ${
                  selectedTag === tag
                    ? 'bg-red-600 text-white'
                    : 'bg-slate-200/80 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-300 dark:hover:bg-slate-700'
                }`}
              >
                #{tag}
              </button>
            ))}
          </div>
        )}

        {/* Results Count */}
        <div className="mb-6 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
          <span>
            Showing <strong className="text-slate-900 dark:text-white">{displayedBlogs.length}</strong> of{' '}
            <strong className="text-slate-900 dark:text-white">{filteredBlogs.length}</strong> articles
          </span>
          {activeCategory !== 'all' && (
            <span className="font-medium text-red-600 dark:text-red-400">
              20 Specialized Articles in this Category
            </span>
          )}
        </div>

        {/* Articles Grid */}
        {displayedBlogs.length === 0 ? (
          <div className="text-center py-16 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-8">
            <BookOpen className="w-10 h-10 text-slate-300 dark:text-slate-700 mx-auto mb-3" />
            <h3 className="text-lg font-bold text-slate-800 dark:text-slate-200">No articles matched your search</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 max-w-sm mx-auto">
              Try searching for terms like "motherboard", "Figma", "POS", "thermal", or select "All Articles".
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedTag(null);
                setActiveCategory('all');
              }}
              className="mt-4 px-4 py-2 rounded-xl bg-slate-900 text-white dark:bg-white dark:text-slate-900 text-xs font-semibold"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayedBlogs.map((blog) => (
              <motion.article
                key={blog.id}
                layout
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                className="group flex flex-col justify-between bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800/80 hover:border-red-500/50 dark:hover:border-red-500/50 p-6 shadow-sm hover:shadow-xl hover:shadow-slate-900/5 transition-all duration-200"
              >
                <div className="space-y-3.5">
                  {/* Category & Read Time */}
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-md bg-red-50 dark:bg-red-950/40 text-red-600 dark:text-red-400 border border-red-200 dark:border-red-900/40">
                      {blog.categoryLabel}
                    </span>
                    <span className="flex items-center gap-1 text-[11px] font-mono text-slate-500 dark:text-slate-400">
                      <Clock className="w-3 h-3 text-cyan-500" />
                      {blog.readTime}
                    </span>
                  </div>

                  {/* Title */}
                  <h3
                    onClick={() => setReadingBlog(blog)}
                    className="text-base sm:text-lg font-bold text-slate-900 dark:text-white group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors line-clamp-2 cursor-pointer leading-snug"
                  >
                    {blog.title}
                  </h3>

                  {/* Excerpt */}
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 line-clamp-3 leading-relaxed">
                    {blog.excerpt}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1 pt-1">
                    {blog.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="text-[10px] font-medium px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800/70 text-slate-600 dark:text-slate-300"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Footer Meta & Action */}
                <div className="pt-5 mt-5 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-[10px] font-bold text-red-600">
                      {blog.author.name.charAt(0)}
                    </div>
                    <div className="text-[11px]">
                      <p className="font-semibold text-slate-800 dark:text-slate-200 leading-none">
                        {blog.author.name}
                      </p>
                      <p className="text-[10px] text-slate-400 mt-0.5">{blog.publishedDate}</p>
                    </div>
                  </div>

                  <button
                    onClick={() => setReadingBlog(blog)}
                    className="inline-flex items-center gap-1 text-xs font-bold text-red-600 dark:text-red-400 hover:gap-1.5 transition-all group-hover:translate-x-0.5"
                  >
                    <span>Read Guide</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </motion.article>
            ))}
          </div>
        )}

        {/* Load More Button */}
        {visibleCount < filteredBlogs.length && (
          <div className="mt-12 text-center">
            <button
              onClick={() => setVisibleCount((prev) => prev + 9)}
              className="px-6 py-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 hover:border-red-500 dark:hover:border-red-500 text-slate-800 dark:text-slate-200 font-bold text-xs sm:text-sm shadow-sm transition-all"
            >
              Load More Articles ({filteredBlogs.length - visibleCount} Remaining)
            </button>
          </div>
        )}
      </div>

      {/* Reader Modal */}
      <BlogReaderModal
        blog={readingBlog}
        onClose={() => setReadingBlog(null)}
        onSelectBlog={(blog) => setReadingBlog(blog)}
        onNavigateSection={onNavigateSection}
        onOpenQuoteModal={onOpenQuoteModal}
      />
    </section>
  );
};
