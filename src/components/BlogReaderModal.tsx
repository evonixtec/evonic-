import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  X,
  Calendar,
  Clock,
  User,
  Share2,
  Check,
  ArrowRight,
  BookOpen,
  Star,
  Quote,
  Terminal,
  CheckCircle2,
  Barcode,
  FileText,
  Sparkles,
  ExternalLink,
} from 'lucide-react';
import { BlogPost, getRelatedBlogs } from '../data/blogs';
import { SectionId } from '../types';
import { EvonixMark } from './EvonixLogo';

interface BlogReaderModalProps {
  blog: BlogPost | null;
  onClose: () => void;
  onSelectBlog: (blog: BlogPost) => void;
  onNavigateSection: (sectionId: SectionId | string) => void;
  onOpenQuoteModal?: (serviceId?: string) => void;
}

// Thoroughly clean any raw markdown artifacts and AI formatting residue
const sanitizePureText = (text: string): string => {
  return text
    // Eliminate complex AI artifact combinations like * > **— or **— or > **
    .replace(/\*?\s*>\s*\*+\s*—?/g, ' ')
    .replace(/\*+\s*—\s*\*+/g, ' ')
    .replace(/[>~_`]/g, '')
    .replace(/\*{2,}/g, '')
    .replace(/^\s*[-*•]\s+/, '')
    .trim();
};

// Render inline text with clean bolding for key terms without any markdown syntax leaking
const renderInlineText = (text: string) => {
  // First strip complex AI sign combinations
  let clean = text
    .replace(/\*?\s*>\s*\*+\s*—?/g, ' ')
    .replace(/\*+\s*—\s*\*+/g, ' ')
    .replace(/^[>*\s—]+/, '')
    .trim();

  // If text has bold markers **word**, render them as <strong>, else clean any stray asterisks
  const parts = clean.split(/(\*\*.*?\*\*)/g);
  return parts.map((part, idx) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      const boldText = part.slice(2, -2).replace(/[*_~`>—]/g, '').trim();
      return (
        <strong key={idx} className="font-bold text-slate-900">
          {boldText}
        </strong>
      );
    }
    // Remove any remaining stray asterisks, backticks, or signs
    const sanitized = part.replace(/[*_~`]/g, '');
    return sanitized;
  });
};

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

            {/* Unique Relevant Hero Visual Image */}
            {blog.imageUrl && (
              <div className="relative w-full rounded-2xl overflow-hidden border border-slate-200 bg-slate-100 shadow-sm group">
                <img
                  src={blog.imageUrl}
                  alt={blog.imageAlt || blog.title}
                  className="w-full h-auto max-h-[380px] object-cover"
                />
                {blog.imageAlt && (
                  <div className="px-4 py-2.5 bg-slate-50 border-t border-slate-200 text-xs text-slate-500 italic flex items-center justify-between">
                    <span>{blog.imageAlt}</span>
                    <span className="text-[10px] font-mono text-slate-400">evonix lab documentation</span>
                  </div>
                )}
              </div>
            )}

            {/* Human-Crafted Content Renderer (Zero AI artifacts) */}
            <div className="max-w-none text-slate-800 leading-relaxed space-y-5 text-sm sm:text-base">
              {(() => {
                // Split content into clean logical blocks
                const rawBlocks = blog.content.trim().split(/\n\s*\n/);

                return rawBlocks.map((block, bIdx) => {
                  const trimmed = block.trim();
                  if (!trimmed) return null;

                  // 1. Diagnostic code / telemetry block
                  if (trimmed.startsWith('```') || trimmed.includes('Diagnostic Log') || trimmed.includes('Rail Resistance:')) {
                    const cleanCode = trimmed.replace(/```[a-z]*\n?/g, '').replace(/```/g, '').trim();
                    return (
                      <div key={bIdx} className="my-5 rounded-2xl bg-slate-900 text-slate-100 p-5 font-mono text-xs sm:text-sm border border-slate-800 shadow-md">
                        <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-800 text-slate-400">
                          <span className="flex items-center gap-2">
                            <Terminal className="w-4 h-4 text-emerald-400" />
                            <span className="font-semibold text-slate-200">Mobile Lab Diagnostic Telemetry</span>
                          </span>
                          <span className="text-[11px] text-emerald-400 font-medium">evonix verified</span>
                        </div>
                        <pre className="whitespace-pre-wrap leading-relaxed overflow-x-auto text-emerald-300/90 font-mono">
                          {cleanCode}
                        </pre>
                      </div>
                    );
                  }

                  // 2. Testimonial / Review Card
                  if (trimmed.includes('Verified Client') || trimmed.includes('Client:') || trimmed.includes('★★★★★')) {
                    const lines = trimmed.split('\n').map(l => l.replace(/^[>*\s—]+/, '').trim()).filter(Boolean);
                    const quoteLine = lines.find(l => l.startsWith('"') || l.endsWith('"') || (!l.includes('Client:') && !l.includes('Verified') && l.length > 25)) || '';
                    const clientLine = lines.find(l => l.includes('Client:') || l.includes('Director') || l.includes('CEO') || l.includes('Manager') || l.includes('Partner') || l.includes('Chairman')) || '';

                    return (
                      <div key={bIdx} className="my-6 p-6 rounded-2xl bg-gradient-to-br from-amber-50/70 via-white to-slate-50 border border-amber-200/80 shadow-xs relative">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-1.5 text-amber-500">
                            {[...Array(5)].map((_, sIdx) => (
                              <Star key={sIdx} className="w-4 h-4 fill-amber-400 text-amber-400" />
                            ))}
                            <span className="ml-2 text-xs font-bold text-slate-800">5.0 / 5.0</span>
                          </div>
                          <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 flex items-center gap-1">
                            <CheckCircle2 className="w-3 h-3" />
                            Verified On-Site Client
                          </span>
                        </div>

                        {quoteLine && (
                          <div className="relative pl-6 py-1">
                            <Quote className="w-5 h-5 text-amber-300 absolute left-0 top-0 -scale-x-100" />
                            <p className="text-slate-800 text-sm sm:text-base font-normal italic leading-relaxed">
                              {quoteLine.replace(/^"|"$/g, '').replace(/[*_~`>—]/g, '')}
                            </p>
                          </div>
                        )}

                        {clientLine && (
                          <div className="mt-4 pt-3 border-t border-amber-100 flex items-center justify-between text-xs text-slate-600">
                            <span className="font-semibold text-slate-900">
                              {clientLine.replace(/^Client:\s*/, '').replace(/[*_~`>—]/g, '')}
                            </span>
                            <span className="text-[11px] text-slate-500">Sialkot Field Audit</span>
                          </div>
                        )}
                      </div>
                    );
                  }

                  // 3. Check if block is a heading followed by lines, or pure heading
                  const lines = trimmed.split('\n');
                  const firstLine = lines[0].trim();

                  // Heading detection
                  if (firstLine.startsWith('### ') || firstLine.startsWith('#### ') || (lines.length === 1 && firstLine.length < 90 && !firstLine.endsWith('.'))) {
                    const cleanTitle = firstLine.replace(/^#{1,4}\s*/, '').replace(/[*_~`>—]/g, '').trim();
                    const remainingLines = lines.slice(1);

                    return (
                      <div key={bIdx} className="space-y-3 pt-2">
                        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight border-b border-slate-100 pb-2">
                          {cleanTitle}
                        </h2>
                        {remainingLines.length > 0 && (
                          <div className="space-y-2">
                            {remainingLines.map((rLine, rIdx) => {
                              const rTrimmed = rLine.trim();
                              if (!rTrimmed) return null;
                              if (rTrimmed.startsWith('- ') || rTrimmed.startsWith('* ') || /^\d+\.\s/.test(rTrimmed)) {
                                return (
                                  <div key={rIdx} className="flex items-start gap-2.5 text-slate-700 pl-1">
                                    <span className="w-1.5 h-1.5 rounded-full bg-red-600 mt-2 flex-shrink-0" />
                                    <span className="leading-relaxed">{renderInlineText(rTrimmed)}</span>
                                  </div>
                                );
                              }
                              return (
                                <p key={rIdx} className="text-slate-700 leading-relaxed">
                                  {renderInlineText(rTrimmed)}
                                </p>
                              );
                            })}
                          </div>
                        )}
                      </div>
                    );
                  }

                  // 4. Bullet / Numbered Lists
                  if (lines.every(l => !l.trim() || l.trim().startsWith('- ') || l.trim().startsWith('* ') || /^\d+\.\s/.test(l.trim()))) {
                    return (
                      <ul key={bIdx} className="space-y-2.5 pl-2 my-3 text-slate-700">
                        {lines.map((it, iIdx) => {
                          const cleanItem = it.replace(/^[-*•\d.]\s*/, '').trim();
                          if (!cleanItem) return null;
                          return (
                            <li key={iIdx} className="flex items-start gap-2.5">
                              <span className="w-1.5 h-1.5 rounded-full bg-red-600 mt-2 flex-shrink-0" />
                              <span className="leading-relaxed">
                                {renderInlineText(cleanItem)}
                              </span>
                            </li>
                          );
                        })}
                      </ul>
                    );
                  }

                  // 5. Standard paragraph
                  return (
                    <p key={bIdx} className="text-slate-700 leading-relaxed">
                      {renderInlineText(trimmed)}
                    </p>
                  );
                });
              })()}
            </div>

            {/* Prominent Sialkot Export Barcode Label Studio Internal Link Card */}
            <div className="p-6 rounded-2xl bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 border border-slate-700 text-white shadow-md flex flex-col sm:flex-row items-center justify-between gap-5">
              <div className="flex items-start gap-3.5">
                <div className="p-3 rounded-xl bg-red-600/20 border border-red-500/30 text-red-400 flex-shrink-0">
                  <Barcode className="w-6 h-6" />
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-red-500/20 text-red-300 border border-red-500/30 font-mono">
                      FREE B2B EXPORT TOOL
                    </span>
                    <span className="text-xs text-slate-400">GS1-128 &amp; Code128</span>
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-white tracking-tight">
                    Sialkot Export Barcode &amp; Shipping Carton Label Studio
                  </h3>
                  <p className="text-xs text-slate-300 max-w-xl leading-relaxed">
                    Create compliant thermal shipping labels, outer carton barcodes, and destination manifests for Sialkot surgical, leather, and sports consignments with instant zero-database printing.
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => {
                  onClose();
                  onNavigateSection('export-barcode-studio');
                }}
                className="whitespace-nowrap px-5 py-3 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs sm:text-sm shadow-md transition-all flex items-center gap-2 cursor-pointer flex-shrink-0"
              >
                <span>Open Barcode Studio</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* Contextual Architecture & Service Internal Links Grid */}
            {blog.internalLinks && blog.internalLinks.length > 0 && (
              <div className="space-y-3 pt-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                    Recommended Technical Architectures &amp; Tools
                  </span>
                  <span className="text-[11px] text-slate-400 font-mono">internal documentation</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {blog.internalLinks.map((link, lIdx) => (
                    <button
                      key={lIdx}
                      type="button"
                      onClick={() => {
                        onClose();
                        onNavigateSection(link.targetSection);
                        if (onOpenQuoteModal && (link.targetSection === 'contact' || link.targetSection === 'services')) {
                          onOpenQuoteModal(link.label);
                        }
                      }}
                      className="p-4 rounded-xl border border-slate-200 hover:border-red-300 hover:bg-red-50/40 transition-all text-left flex items-center justify-between group cursor-pointer bg-white shadow-2xs"
                    >
                      <div className="pr-3">
                        <span className="text-[11px] font-bold text-red-600 block">
                          {link.label}
                        </span>
                        <span className="text-xs font-semibold text-slate-800 group-hover:text-red-700 transition-colors block mt-0.5">
                          {link.anchorText}
                        </span>
                        {link.description && (
                          <span className="text-[11px] text-slate-500 block mt-1 line-clamp-1">
                            {link.description}
                          </span>
                        )}
                      </div>
                      <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-red-600 group-hover:translate-x-1 transition-all flex-shrink-0" />
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* evonix Engineering Consultation Banner */}
            <div className="p-6 rounded-2xl bg-red-50 border border-red-200 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <span className="text-xs font-semibold text-red-600 block">
                  evonix enterprise solutions
                </span>
                <h3 className="text-base sm:text-lg font-bold text-slate-900 mt-0.5">
                  Need professional execution for this technical architecture?
                </h3>
                <p className="text-xs text-slate-600 mt-1">
                  Connect with our Dubai &amp; Sialkot engineering teams for dedicated consulting or doorstep hardware repair.
                </p>
              </div>
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onNavigateSection('contact');
                  if (onOpenQuoteModal) {
                    onOpenQuoteModal(blog.title);
                  }
                }}
                className="whitespace-nowrap px-5 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs sm:text-sm shadow-2xs transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <span>Contact evonix</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* Related Articles Section */}
            {related.length > 0 && (
              <div className="border-t border-slate-200 pt-8 space-y-4">
                <div className="flex items-center gap-2 text-slate-900 font-bold text-lg">
                  <BookOpen className="w-5 h-5 text-red-600" />
                  <span>Related Technical Case Studies</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {related.map((rel) => (
                    <button
                      key={rel.id}
                      onClick={() => onSelectBlog(rel)}
                      className="p-4 rounded-xl border border-slate-200 hover:border-slate-300 hover:bg-slate-50 transition-all text-left flex flex-col justify-between group cursor-pointer"
                    >
                      <div>
                        <span className="text-[10px] font-semibold text-red-600 uppercase">
                          {rel.categoryLabel}
                        </span>
                        <h4 className="text-xs sm:text-sm font-bold text-slate-900 group-hover:text-red-600 transition-colors line-clamp-2 mt-1">
                          {rel.title}
                        </h4>
                      </div>
                      <span className="text-[11px] text-slate-400 mt-3 block">
                        {rel.readTime}
                      </span>
                    </button>
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
