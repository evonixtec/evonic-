import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Calendar, Clock, User, Share2, Check, ArrowRight, BookOpen, ExternalLink, Sparkles } from 'lucide-react';
import { BlogPost, getRelatedBlogs } from '../data/blogs';
import { SectionId } from '../types';
import { EvonixMark } from './EvonixLogo';

interface BlogReaderModalProps {
  blog: BlogPost | null;
  onClose: () => void;
  onSelectBlog: (blog: BlogPost) => void;
  onNavigateSection: (sectionId: SectionId) => void;
  onOpenQuoteModal?: (serviceId?: string) => void;
}

export const BlogReaderModal: React.FC<BlogReaderModalProps> = ({
  blog,
  onClose,
  onSelectBlog,
  onNavigateSection,
  onOpenQuoteModal,
}) => {
  const [copied, setCopied] = useState(false);

  if (!blog) return null;

  const related = getRelatedBlogs(blog.slug, 3);

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleWhatsAppShare = () => {
    const text = encodeURIComponent(`Read this guide on EVONIX: ${blog.title}`);
    window.open(`https://api.whatsapp.com/send?text=${text}`, '_blank');
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-md flex items-center justify-center p-3 sm:p-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 20 }}
          transition={{ duration: 0.25 }}
          className="relative w-full max-w-4xl bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden flex flex-col max-h-[92vh]"
        >
          {/* Top Bar */}
          <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50/90 dark:bg-slate-900/90 sticky top-0 z-20 backdrop-blur">
            <div className="flex items-center gap-3">
              <div className="p-1.5 rounded-xl bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900/50">
                <EvonixMark className="w-6 h-6" />
              </div>
              <div>
                <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-red-100 dark:bg-red-950/60 text-red-700 dark:text-red-400 border border-red-200 dark:border-red-900/40">
                  {blog.categoryLabel}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleShare}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 transition-colors"
                title="Copy Link"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Share2 className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied!' : 'Share'}</span>
              </button>

              <button
                onClick={onClose}
                className="p-2 text-slate-400 hover:text-slate-700 dark:hover:text-white rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                aria-label="Close reader"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Article Scroll Body */}
          <div className="p-6 sm:p-10 overflow-y-auto space-y-8 font-sans">
            {/* Article Header */}
            <div className="space-y-4 border-b border-slate-200 dark:border-slate-800 pb-6">
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight">
                {blog.title}
              </h1>

              <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 dark:text-slate-400">
                <span className="flex items-center gap-1.5">
                  <User className="w-4 h-4 text-red-500" />
                  <span className="font-semibold text-slate-800 dark:text-slate-200">{blog.author.name}</span>
                  <span>({blog.author.role})</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5" />
                  {blog.publishedDate}
                </span>
                <span className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-cyan-500" />
                  {blog.readTime}
                </span>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-1.5 pt-1">
                {blog.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-[11px] font-medium px-2.5 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Excerpt Lead */}
            <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border-l-4 border-red-600 text-sm sm:text-base text-slate-700 dark:text-slate-300 font-medium leading-relaxed">
              {blog.excerpt}
            </div>

            {/* Markdown-style Content Renderer */}
            <div className="prose dark:prose-invert max-w-none text-slate-800 dark:text-slate-200 leading-relaxed space-y-4">
              {blog.content
                .trim()
                .split('\n\n')
                .map((paragraph, pIdx) => {
                  const trimmed = paragraph.trim();
                  if (trimmed.startsWith('### ')) {
                    return (
                      <h3 key={pIdx} className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white pt-3 pb-1 border-b border-slate-100 dark:border-slate-800/60">
                        {trimmed.replace('### ', '')}
                      </h3>
                    );
                  }
                  if (trimmed.startsWith('#### ')) {
                    return (
                      <h4 key={pIdx} className="text-lg font-bold text-red-600 dark:text-red-400 pt-2">
                        {trimmed.replace('#### ', '')}
                      </h4>
                    );
                  }
                  if (trimmed.startsWith('- ') || trimmed.startsWith('1. ')) {
                    const items = trimmed.split('\n');
                    return (
                      <ul key={pIdx} className="space-y-2 pl-4 list-disc text-sm sm:text-base text-slate-700 dark:text-slate-300">
                        {items.map((item, itemIdx) => (
                          <li key={itemIdx}>
                            {item.replace(/^[-\d.]+\s*/, '')}
                          </li>
                        ))}
                      </ul>
                    );
                  }
                  return (
                    <p key={pIdx} className="text-sm sm:text-base text-slate-700 dark:text-slate-300 leading-relaxed">
                      {trimmed}
                    </p>
                  );
                })}
            </div>

            {/* Internal Links Block (SEO & Navigation) */}
            {blog.internalLinks && blog.internalLinks.length > 0 && (
              <div className="p-6 rounded-2xl bg-gradient-to-r from-red-50/60 via-slate-50 to-cyan-50/40 dark:from-red-950/20 dark:via-slate-900 dark:to-cyan-950/20 border border-slate-200 dark:border-slate-800 space-y-3">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-red-500" />
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white">
                    Related EVONIX Services & Solutions
                  </h4>
                </div>
                <div className="flex flex-wrap gap-2.5">
                  {blog.internalLinks.map((link, lIdx) => (
                    <button
                      key={lIdx}
                      onClick={() => {
                        onClose();
                        onNavigateSection(link.targetSection);
                      }}
                      className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-300 dark:border-slate-700 hover:border-red-500 dark:hover:border-red-500 hover:text-red-600 transition-all shadow-sm"
                    >
                      <span>{link.anchorText}</span>
                      <ArrowRight className="w-3.5 h-3.5 text-red-500" />
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* CTA Box: Get Free Consultation / Quote */}
            <div className="rounded-2xl p-6 sm:p-8 bg-slate-900 text-white dark:bg-slate-950 border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl relative overflow-hidden">
              <div className="space-y-1.5 text-center sm:text-left">
                <h4 className="text-lg sm:text-xl font-bold">
                  Need Professional Implementation?
                </h4>
                <p className="text-xs sm:text-sm text-slate-400 max-w-md">
                  Get Dubai-standard execution for your website, POS software, or laptop repairs right here in Sialkot and all Pakistan.
                </p>
              </div>

              <div className="flex items-center gap-3 flex-shrink-0">
                <button
                  onClick={() => {
                    onClose();
                    if (onOpenQuoteModal) onOpenQuoteModal();
                    else onNavigateSection('contact');
                  }}
                  className="px-5 py-2.5 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold text-xs sm:text-sm shadow-lg shadow-red-600/30 transition-colors"
                >
                  Get a Free Quote
                </button>
                <button
                  onClick={handleWhatsAppShare}
                  className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm transition-colors"
                >
                  WhatsApp Us
                </button>
              </div>
            </div>

            {/* Related Articles */}
            {related.length > 0 && (
              <div className="space-y-4 pt-4 border-t border-slate-200 dark:border-slate-800">
                <h4 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-red-500" />
                  Related Guides in {blog.categoryLabel}
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {related.map((rel) => (
                    <div
                      key={rel.id}
                      onClick={() => onSelectBlog(rel)}
                      className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-800/40 hover:border-red-400 dark:hover:border-red-500/60 cursor-pointer transition-all space-y-2 group"
                    >
                      <span className="text-[10px] font-mono text-cyan-600 dark:text-cyan-400 font-semibold">
                        {rel.readTime}
                      </span>
                      <h5 className="text-xs font-bold text-slate-900 dark:text-white line-clamp-2 group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors">
                        {rel.title}
                      </h5>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-2">
                        {rel.excerpt}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
