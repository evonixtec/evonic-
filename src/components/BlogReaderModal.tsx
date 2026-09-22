import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Calendar, Clock, User, Share2, Check, ArrowRight, BookOpen } from 'lucide-react';
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

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 20 }}
          transition={{ duration: 0.25 }}
          className="relative w-full max-w-4xl bg-white rounded-3xl shadow-xl border border-slate-200 overflow-hidden flex flex-col max-h-[92vh]"
        >
          {/* Top Bar */}
          <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between bg-slate-50 sticky top-0 z-20">
            <div className="flex items-center gap-3">
              <div className="p-1.5 rounded-xl bg-red-50 border border-red-200">
                <EvonixMark className="w-6 h-6" />
              </div>
              <div>
                <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-red-50 text-red-700 border border-red-200">
                  {blog.categoryLabel}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleShare}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-xl border border-slate-200 hover:bg-slate-100 text-slate-700 transition-colors cursor-pointer"
                title="Copy Link"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Share2 className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied!' : 'Share'}</span>
              </button>

              <button
                onClick={onClose}
                className="p-2 text-slate-400 hover:text-slate-700 rounded-xl hover:bg-slate-100 transition-colors cursor-pointer"
                aria-label="Close reader"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Article Scroll Body */}
          <div className="p-6 sm:p-10 overflow-y-auto space-y-8 font-sans">
            {/* Article Header */}
            <div className="space-y-4 border-b border-slate-200 pb-6">
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
                {blog.title}
              </h1>

              <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500">
                <span className="flex items-center gap-1.5">
                  <User className="w-4 h-4 text-red-600" />
                  <span className="font-semibold text-slate-800">{blog.author.name}</span>
                  <span>({blog.author.role})</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5" />
                  {blog.publishedDate}
                </span>
                <span className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-blue-600" />
                  {blog.readTime}
                </span>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-1.5 pt-1">
                {blog.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-[11px] font-medium px-2.5 py-0.5 rounded-md bg-slate-100 text-slate-600"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Excerpt Lead */}
            <div className="p-5 rounded-2xl bg-slate-50 border-l-4 border-red-600 text-sm sm:text-base text-slate-700 font-medium leading-relaxed">
              {blog.excerpt}
            </div>

            {/* Markdown-style Content Renderer */}
            <div className="max-w-none text-slate-800 leading-relaxed space-y-4 text-sm sm:text-base">
              {blog.content
                .trim()
                .split('\n\n')
                .map((paragraph, pIdx) => {
                  const trimmed = paragraph.trim();
                  if (trimmed.startsWith('### ')) {
                    return (
                      <h3 key={pIdx} className="text-xl sm:text-2xl font-bold text-slate-900 pt-3 pb-1 border-b border-slate-100">
                        {trimmed.replace('### ', '')}
                      </h3>
                    );
                  }
                  if (trimmed.startsWith('#### ')) {
                    return (
                      <h4 key={pIdx} className="text-lg font-bold text-red-600 pt-2">
                        {trimmed.replace('#### ', '')}
                      </h4>
                    );
                  }
                  if (trimmed.startsWith('- ') || trimmed.startsWith('1. ')) {
                    const items = trimmed.split('\n');
                    return (
                      <ul key={pIdx} className="space-y-1.5 pl-5 list-disc text-slate-700">
                        {items.map((it, iIdx) => (
                          <li key={iIdx}>
                            {it.replace(/^[-\d.]\s*/, '')}
                          </li>
                        ))}
                      </ul>
                    );
                  }
                  return (
                    <p key={pIdx} className="text-slate-700 leading-relaxed">
                      {trimmed}
                    </p>
                  );
                })}
            </div>

            {/* Internal Link CTA Banner */}
            <div className="p-6 rounded-2xl bg-red-50 border border-red-200 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <span className="text-xs font-bold text-red-600 uppercase tracking-wider block">
                  EVONIX Enterprise Solution
                </span>
                <h4 className="text-base sm:text-lg font-bold text-slate-900 mt-0.5">
                  Need professional execution for this technical architecture?
                </h4>
                <p className="text-xs text-slate-600 mt-1">
                  Connect with our Dubai & Sialkot engineering teams for dedicated consulting or doorstep hardware repair.
                </p>
              </div>
              {(() => {
                const primaryLink = blog.internalLinks?.[0] || {
                  label: 'Get a Free Quote & Consultation',
                  targetSection: 'contact' as SectionId,
                  anchorText: 'Contact EVONIX',
                };
                return (
                  <button
                    onClick={() => {
                      onClose();
                      onNavigateSection(primaryLink.targetSection);
                      if (onOpenQuoteModal) {
                        onOpenQuoteModal(primaryLink.label);
                      }
                    }}
                    className="px-5 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs sm:text-sm whitespace-nowrap shadow-2xs transition-colors flex items-center gap-1.5 cursor-pointer"
                  >
                    <span>{primaryLink.label}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                );
              })()}
            </div>

            {/* Related Articles */}
            {related.length > 0 && (
              <div className="pt-6 border-t border-slate-200">
                <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-red-600" />
                  Related Technical Guides
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {related.map((rel) => (
                    <div
                      key={rel.id}
                      onClick={() => onSelectBlog(rel)}
                      className="p-4 rounded-xl border border-slate-200 hover:border-red-300 hover:bg-slate-50 transition-all cursor-pointer group"
                    >
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-100 text-slate-600">
                        {rel.readTime}
                      </span>
                      <h4 className="text-xs sm:text-sm font-bold text-slate-900 group-hover:text-red-600 transition-colors mt-2 line-clamp-2">
                        {rel.title}
                      </h4>
                      <p className="text-[11px] text-slate-500 mt-1 line-clamp-2">
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
