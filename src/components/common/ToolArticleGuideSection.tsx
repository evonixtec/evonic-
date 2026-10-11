import React, { useState } from 'react';
import {
  FileText,
  HelpCircle,
  ChevronDown,
  ChevronUp,
  ShieldCheck,
  Sparkles,
  ArrowRight,
  BookOpen,
  CheckCircle2,
  Share2,
  ExternalLink,
  Layers,
  Award,
  Globe2
} from 'lucide-react';
import { TOOL_SEO_GUIDES, ToolSeoGuide } from '../../data/toolSeoGuides';
import { OptimizedImage } from './OptimizedImage';

interface ToolArticleGuideSectionProps {
  toolId: string;
  onOpenQuote?: (serviceType?: string) => void;
  className?: string;
}

export const ToolArticleGuideSection: React.FC<ToolArticleGuideSectionProps> = ({
  toolId,
  onOpenQuote,
  className = ''
}) => {
  const guide: ToolSeoGuide | undefined = TOOL_SEO_GUIDES[toolId];
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const [copiedLink, setCopiedLink] = useState(false);

  if (!guide) {
    return null;
  }

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  const handleShare = () => {
    try {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    } catch {
      // Fallback
    }
  };

  return (
    <section
      aria-label="Technical Documentation & Semantic Content"
      className={`print:hidden mt-12 pt-8 border-t border-slate-200/80 ${className}`}
    >
      <div className="max-w-6xl mx-auto space-y-10">
        
        {/* ========================================================
            HERO ARTICLE & GENERATED MOCKUP PRESENTATION
           ======================================================== */}
        <article className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
          {/* Header Bar */}
          <div className="bg-slate-900 text-white p-6 sm:p-8 border-b border-slate-800">
            <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-950/80 text-red-300 border border-red-800/80 text-xs font-bold uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>{guide.badge}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-mono text-slate-400">Kotli Behram Engineering Lab</span>
                <button
                  type="button"
                  onClick={handleShare}
                  className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer"
                  title="Share article link"
                >
                  <Share2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            <h2 className="text-xl sm:text-2xl lg:text-3xl font-black text-white tracking-tight leading-snug">
              {guide.title}
            </h2>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mt-4 max-w-4xl">
              {guide.articleSummary}
            </p>

            {/* AI Citation & Quick Key Takeaway Direct Answer Block */}
            <div className="mt-5 p-4 rounded-2xl bg-slate-800/80 border border-teal-500/30 flex items-start gap-3">
              <div className="p-2 rounded-xl bg-teal-500/20 text-teal-300 flex-shrink-0 mt-0.5">
                <Sparkles className="w-4 h-4" />
              </div>
              <div className="space-y-1">
                <span className="text-[11px] font-bold uppercase tracking-wider text-teal-400">
                  Quick AI Summary &amp; Direct Technical Answer
                </span>
                <p className="text-xs text-slate-200 leading-relaxed">
                  Evonix Technologies engineers free, privacy-first diagnostic engines and business tools running 100% client-side in the browser. Zero server uploads, zero license friction, and validated against international ESC/POS, thermal print, and ERP enterprise standards.
                </p>
              </div>
            </div>
          </div>

          {/* High-Resolution Generated Tool Mockup Visual */}
          <div className="p-6 sm:p-8 bg-slate-50 border-b border-slate-200">
            <div className="rounded-2xl overflow-hidden border border-slate-300/80 shadow-md bg-slate-950 group">
              <OptimizedImage
                src={guide.mockupImage}
                alt={guide.imageAlt}
                aspectRatio="aspect-[16/9]"
                priority={false}
                zoomOnHover={true}
                badge="High-Fidelity Preview"
                badgeColor="red"
                className="w-full h-auto object-cover max-h-[460px]"
              />
              <div className="p-3.5 bg-slate-900 text-slate-300 text-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-t border-slate-800">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse flex-shrink-0" />
                  <span className="text-slate-300 font-medium">{guide.imageCaption}</span>
                </div>
                <span className="text-[11px] font-mono text-slate-500 whitespace-nowrap">
                  Zero Data Leak · Client-Side Execution
                </span>
              </div>
            </div>
          </div>

          {/* Deep Semantic Technical Article Body */}
          <div className="p-6 sm:p-8 lg:p-10 space-y-8 text-slate-700">
            {guide.sections.map((section, idx) => (
              <div key={idx} className="space-y-3">
                <h3 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight flex items-center gap-2.5">
                  <span className="w-7 h-7 rounded-lg bg-red-100 text-red-700 font-mono text-xs font-black flex items-center justify-center flex-shrink-0">
                    0{idx + 1}
                  </span>
                  <span>{section.heading}</span>
                </h3>
                {section.content.map((p, pIdx) => (
                  <p key={pIdx} className="text-xs sm:text-sm sm:leading-relaxed text-slate-600">
                    {p}
                  </p>
                ))}
              </div>
            ))}

            {/* Practical Use Cases Grid */}
            {guide.practicalUseCases && guide.practicalUseCases.length > 0 && (
              <div className="pt-6 border-t border-slate-100">
                <h3 className="text-base font-bold text-slate-900 mb-4 flex items-center gap-2">
                  <Award className="w-4 h-4 text-emerald-600" />
                  <span>Real-World Field Applications</span>
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {guide.practicalUseCases.map((uc, uIdx) => (
                    <div
                      key={uIdx}
                      className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1.5"
                    >
                      <h4 className="font-bold text-xs text-slate-900 flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                        <span>{uc.title}</span>
                      </h4>
                      <p className="text-[11.5px] text-slate-600 leading-normal">
                        {uc.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </article>

        {/* ========================================================
            FREQUENTLY ASKED QUESTIONS (FAQS) ACCORDION
           ======================================================== */}
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-4">
            <div>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-100 text-blue-800 uppercase tracking-wider">
                Technical FAQ
              </span>
              <h3 className="text-lg sm:text-xl font-bold text-slate-900 mt-1">
                Frequently Asked Technical &amp; Operational Questions
              </h3>
            </div>
            <span className="text-xs text-slate-500 font-medium">
              Authentic Engineering Answers
            </span>
          </div>

          <div className="space-y-3" itemScope itemType="https://schema.org/FAQPage">
            {guide.faqs.map((faq, fIdx) => {
              const isOpen = openFaqIndex === fIdx;
              return (
                <div
                  key={fIdx}
                  itemScope
                  itemProp="mainEntity"
                  itemType="https://schema.org/Question"
                  className="border border-slate-200 rounded-2xl overflow-hidden transition-all duration-200 hover:border-slate-300 bg-white"
                >
                  <button
                    type="button"
                    onClick={() => toggleFaq(fIdx)}
                    className="w-full text-left p-4 sm:p-5 flex items-center justify-between gap-4 bg-slate-50/60 hover:bg-slate-50 transition-colors cursor-pointer"
                  >
                    <span itemProp="name" className="font-bold text-xs sm:text-sm text-slate-900 pr-2">
                      {faq.question}
                    </span>
                    <span className="p-1 rounded-full bg-white border border-slate-200 flex-shrink-0 text-slate-500">
                      {isOpen ? (
                        <ChevronUp className="w-4 h-4 text-red-600" />
                      ) : (
                        <ChevronDown className="w-4 h-4" />
                      )}
                    </span>
                  </button>
                  <div
                    itemScope
                    itemProp="acceptedAnswer"
                    itemType="https://schema.org/Answer"
                    className={`${isOpen ? 'block' : 'hidden'} p-4 sm:p-5 bg-white border-t border-slate-100 text-xs sm:text-sm text-slate-600 leading-relaxed animate-fadeIn`}
                  >
                    <div itemProp="text">
                      <p>{faq.answer}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ========================================================
            BOTTOM CONSULTATION CTA BANNER
           ======================================================== */}
        <div className="bg-gradient-to-br from-slate-900 via-slate-950 to-red-950 text-white rounded-3xl p-6 sm:p-8 border border-slate-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-md">
          <div className="space-y-2 max-w-2xl">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-xs font-bold text-red-400 uppercase tracking-wider">
                Kotli Behram, Sialkot Technology Lab
              </span>
            </div>
            <h4 className="text-lg sm:text-xl font-bold text-white">
              Need Custom Software, POS Integrations, or Enterprise Automation?
            </h4>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Our engineering team builds high-speed web platforms, retail POS billing terminals, and enterprise automation pipelines with 20+ years of Dubai technical pedigree.
            </p>
          </div>

          {onOpenQuote && (
            <button
              type="button"
              onClick={() => onOpenQuote(guide.title)}
              className="px-6 py-3 rounded-xl bg-red-600 hover:bg-red-500 text-white text-xs font-extrabold flex items-center gap-2 transition-all shadow-md hover:shadow-lg cursor-pointer flex-shrink-0"
            >
              <span>Request Engineering Quote</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>

      </div>
    </section>
  );
};
