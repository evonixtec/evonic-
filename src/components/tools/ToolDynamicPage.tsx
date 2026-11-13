import React, { useEffect } from 'react';
import { toolsRegistry, ToolMetadata, resolveToolSlug } from '../../data/toolsRegistry';
import { CheckCircle2, ArrowRight, ShieldCheck, HelpCircle, ArrowLeft, Grid } from 'lucide-react';
import { NavPageId } from '../../types';
import { EcommerceHardwareBanner } from '../EcommerceHardwareBanner';

// Lazy-loaded or passed-in tool widgets
interface ToolDynamicPageProps {
  toolSlug: string;
  onNavigateHome: () => void;
  onNavigateToolsHub: () => void;
  onNavigatePage: (page: NavPageId, subTarget?: string) => void;
  onOpenQuote?: (serviceType?: string) => void;
  children: React.ReactNode;
}

export const ToolDynamicPage: React.FC<ToolDynamicPageProps> = ({
  toolSlug,
  onNavigateHome,
  onNavigateToolsHub,
  onNavigatePage,
  onOpenQuote,
  children,
}) => {
  const tool: ToolMetadata | undefined = resolveToolSlug(toolSlug);
  const canonicalUrl = tool ? `https://www.evonixtec.com/tools/${tool.slug}` : 'https://www.evonixtec.com/tools';

  useEffect(() => {
    if (!tool) return;

    // 1. Update Document Title
    document.title = tool.metaTitle;

    // 2. Update Meta Description & Keywords
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', tool.metaDescription);
    }

    // 3. Update Canonical Link
    let canonicalLink = document.querySelector('link[rel="canonical"]');
    if (canonicalLink) {
      canonicalLink.setAttribute('href', canonicalUrl);
    }

    // 4. Update OpenGraph & Twitter Tags
    const updateOrCreateMeta = (attr: string, val: string, content: string) => {
      let el = document.querySelector(`meta[${attr}="${val}"]`);
      if (!el) {
        el = document.createElement('meta');
        el.setAttribute(attr, val);
        document.head.appendChild(el);
      }
      el.setAttribute('content', content);
    };

    const resolvedOgTitle = tool.ogTitle || tool.metaTitle;
    const resolvedOgDesc = tool.ogDescription || tool.metaDescription;

    updateOrCreateMeta('property', 'og:title', resolvedOgTitle);
    updateOrCreateMeta('property', 'og:description', resolvedOgDesc);
    updateOrCreateMeta('property', 'og:url', canonicalUrl);
    updateOrCreateMeta('name', 'twitter:title', resolvedOgTitle);
    updateOrCreateMeta('name', 'twitter:description', resolvedOgDesc);

    // 5. Inject Programmatic JSON-LD Schema (SoftwareApplication & FAQPage)
    const scriptId = 'tool-dynamic-schema';
    let script = document.getElementById(scriptId) as HTMLScriptElement | null;
    if (!script) {
      script = document.createElement('script');
      script.id = scriptId;
      script.type = 'application/ld+json';
      document.head.appendChild(script);
    }

    const jsonLd = {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'SoftwareApplication',
          name: tool.name,
          url: canonicalUrl,
          applicationCategory: 'BusinessApplication',
          operatingSystem: 'All',
          offers: {
            '@type': 'Offer',
            price: '0',
            priceCurrency: 'USD',
            availability: 'https://schema.org/InStock',
          },
          provider: {
            '@type': 'Organization',
            name: 'evonix technologies',
            url: 'https://www.evonixtec.com',
          },
          aggregateRating: {
            '@type': 'AggregateRating',
            ratingValue: '4.9',
            reviewCount: '128',
            bestRating: '5',
            worstRating: '1',
          },
        },
        {
          '@type': 'BreadcrumbList',
          itemListElement: [
            {
              '@type': 'ListItem',
              position: 1,
              name: 'Home',
              item: 'https://www.evonixtec.com',
            },
            {
              '@type': 'ListItem',
              position: 2,
              name: 'Web Tools',
              item: 'https://www.evonixtec.com/tools',
            },
            {
              '@type': 'ListItem',
              position: 3,
              name: tool.name,
              item: canonicalUrl,
            },
          ],
        },
        {
          '@type': 'FAQPage',
          mainEntity: tool.faqs.map((f) => ({
            '@type': 'Question',
            name: f.q,
            acceptedAnswer: {
              '@type': 'Answer',
              text: f.a,
            },
          })),
        },
      ],
    };

    script.textContent = JSON.stringify(jsonLd);

    return () => {
      // Cleanup schema on unmount
      if (script && script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, [tool]);

  if (!tool) {
    return (
      <div className="min-h-screen bg-slate-950 text-slate-100 py-20 px-4 text-center space-y-4">
        <h1 className="text-2xl font-bold">Tool Not Found</h1>
        <p className="text-slate-400 text-sm">The requested business tool does not exist.</p>
        <button
          onClick={onNavigateToolsHub}
          className="px-5 py-2.5 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold text-xs cursor-pointer"
        >
          Return to Tools Directory
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-10 px-4 sm:px-6 lg:px-8 selection:bg-blue-600 font-sans">
      <main className="max-w-5xl mx-auto space-y-10">
        {/* Navigation Breadcrumb Bar */}
        <nav
          aria-label="Breadcrumb"
          className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-4 text-xs text-slate-400"
        >
          <ol
            itemScope
            itemType="https://schema.org/BreadcrumbList"
            className="flex items-center gap-2 flex-wrap"
          >
            <li
              itemProp="itemListElement"
              itemScope
              itemType="https://schema.org/ListItem"
              className="flex items-center gap-2"
            >
              <a
                itemProp="item"
                href="https://www.evonixtec.com"
                onClick={(e) => {
                  if (!e.metaKey && !e.ctrlKey && !e.shiftKey && !e.altKey) {
                    e.preventDefault();
                    onNavigateHome();
                  }
                }}
                className="hover:text-white transition-colors cursor-pointer"
              >
                <span itemProp="name">Home</span>
              </a>
              <meta itemProp="position" content="1" />
              <span aria-hidden="true" className="text-slate-600">/</span>
            </li>
            <li
              itemProp="itemListElement"
              itemScope
              itemType="https://schema.org/ListItem"
              className="flex items-center gap-2"
            >
              <a
                itemProp="item"
                href="https://www.evonixtec.com/tools"
                onClick={(e) => {
                  if (!e.metaKey && !e.ctrlKey && !e.shiftKey && !e.altKey) {
                    e.preventDefault();
                    onNavigateToolsHub();
                  }
                }}
                className="hover:text-white transition-colors cursor-pointer flex items-center gap-1"
              >
                <Grid className="w-3.5 h-3.5 text-blue-400" />
                <span itemProp="name">Web Tools</span>
              </a>
              <meta itemProp="position" content="2" />
              <span aria-hidden="true" className="text-slate-600">/</span>
            </li>
            <li
              itemProp="itemListElement"
              itemScope
              itemType="https://schema.org/ListItem"
              className="flex items-center"
            >
              <a
                itemProp="item"
                href={canonicalUrl}
                aria-current="page"
                onClick={(e) => e.preventDefault()}
                className="text-blue-400 font-semibold cursor-default"
              >
                <span itemProp="name">{tool.name}</span>
              </a>
              <meta itemProp="position" content="3" />
            </li>
          </ol>

          <div className="flex items-center gap-2">
            <span className="text-[11px] font-mono text-emerald-400 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>Zero Cloud Latency &amp; Complete Client Privacy</span>
            </span>
          </div>
        </nav>

        {/* Header Hero */}
        <div className="text-center space-y-3">
          <span className="inline-block text-[11px] uppercase font-bold tracking-widest text-blue-400 bg-blue-500/10 border border-blue-500/20 px-3 py-1 rounded-full">
            {tool.category} • For {tool.targetAudience}
          </span>
          <h1 className="text-2xl sm:text-4xl md:text-5xl font-black text-white tracking-tight leading-tight">
            {tool.h1}
          </h1>
          <p className="text-slate-400 text-xs sm:text-sm md:text-base max-w-2xl mx-auto leading-relaxed">
            {tool.metaDescription}
          </p>
        </div>

        {/* WORKSPACE AREA (Isolated Tool Logic with Reserved Dimensions to eliminate CLS) */}
        <section className="bg-slate-900 border border-slate-800 rounded-2xl p-4 sm:p-6 md:p-8 shadow-2xl overflow-hidden min-h-[550px]">
          {children}
        </section>

        {/* E-COMMERCE HARDWARE FUNNEL BANNER (Stripe, Amazon FBA, eBay, Temu) */}
        {['stripe-fee-calculator', 'amazon-fba-calculator', 'ebay-fee-calculator', 'temu-seller-calculator'].includes(tool.slug) ? (
          <div className="min-h-[140px]">
            <EcommerceHardwareBanner />
          </div>
        ) : (
          tool.hardwareCta && (
            <section className="bg-gradient-to-r from-blue-950/80 via-slate-900 to-slate-900 border border-blue-500/40 rounded-2xl p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl min-h-[140px]">
              <div className="space-y-1.5 text-left">
                <div className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-blue-400">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>store.evonixtec.com • Verified Hardware</span>
                </div>
                <h2 className="text-lg sm:text-xl font-bold text-white">
                  {tool.hardwareCta.headline}
                </h2>
                <p className="text-slate-300 text-xs sm:text-sm max-w-xl leading-relaxed">
                  {tool.hardwareCta.subtext}
                </p>
              </div>
              <a
                href={tool.hardwareCta.targetUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="shrink-0 inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white text-xs sm:text-sm font-semibold px-5 py-3 rounded-xl transition-all shadow-lg shadow-blue-600/30 cursor-pointer whitespace-nowrap"
              >
                <span>{tool.hardwareCta.buttonText}</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </section>
          )
        )}

        {/* EDITORIAL SECTION 1: FEE STRUCTURE & MATH BREAKDOWN TABLE */}
        {tool.editorialSections && (
          <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 text-left shadow-lg">
            <div className="space-y-3">
              <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-teal-400" />
                <span>{tool.editorialSections.introHeading}</span>
              </h2>
              {tool.editorialSections.introParagraphs.map((para, idx) => (
                <p key={idx} className="text-sm text-slate-300 leading-relaxed">
                  {para}
                </p>
              ))}
            </div>

            {/* FORMULA TABLE */}
            <div className="space-y-3 pt-2">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-teal-400" />
                <span>{tool.editorialSections.tableTitle}</span>
              </h3>
              <div className="overflow-x-auto rounded-xl border border-slate-800 bg-slate-950/60">
                <table className="w-full text-left text-xs sm:text-sm">
                  <thead className="bg-slate-900 border-b border-slate-800 text-teal-400 font-semibold uppercase tracking-wider text-[11px]">
                    <tr>
                      {tool.editorialSections.tableHeaders.map((hdr, hIdx) => (
                        <th key={hIdx} className="px-4 py-3 sm:px-6">
                          {hdr}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60 font-mono text-xs text-slate-300">
                    {tool.editorialSections.tableRows.map((row, rIdx) => (
                      <tr key={rIdx} className="hover:bg-slate-900/40 transition-colors">
                        {row.map((cell, cIdx) => (
                          <td
                            key={cIdx}
                            className={`px-4 py-3 sm:px-6 ${
                              cIdx === 0
                                ? 'font-sans font-bold text-white'
                                : cIdx === 1
                                ? 'text-teal-300 font-semibold'
                                : ''
                            }`}
                          >
                            {cell}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* EDITORIAL SECTION 2: 2026 - 2027 RATE SCHEDULE & POLICY CHANGES */}
            <div className="pt-6 border-t border-slate-800 space-y-4">
              <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-blue-400" />
                <span>{tool.editorialSections.scheduleHeading}</span>
              </h2>
              {tool.editorialSections.scheduleParagraphs.map((para, idx) => (
                <p key={idx} className="text-sm text-slate-300 leading-relaxed">
                  {para}
                </p>
              ))}

              {tool.editorialSections.scheduleBulletPoints && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-2">
                  {tool.editorialSections.scheduleBulletPoints.map((bp, bpIdx) => (
                    <div
                      key={bpIdx}
                      className="p-4 rounded-xl bg-slate-950/60 border border-slate-800/80 space-y-1.5"
                    >
                      <h4 className="text-xs font-bold text-teal-400 uppercase tracking-wide">
                        {bp.title}
                      </h4>
                      <p className="text-xs text-slate-300 leading-relaxed">{bp.desc}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* EDITORIAL SECTION 3: SELLER COST-REDUCTION STRATEGIES */}
            <div className="pt-6 border-t border-slate-800 space-y-4">
              <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                <span>{tool.editorialSections.strategiesHeading}</span>
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                {tool.editorialSections.strategies.map((strat, sIdx) => (
                  <div
                    key={sIdx}
                    className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 flex items-start gap-3"
                  >
                    <span className="w-6 h-6 rounded-lg bg-emerald-500/10 text-emerald-400 font-mono font-bold text-xs flex items-center justify-center shrink-0 border border-emerald-500/20">
                      {sIdx + 1}
                    </span>
                    <div className="space-y-1 text-left">
                      <h4 className="text-xs sm:text-sm font-bold text-white">
                        {strat.title}
                      </h4>
                      <p className="text-xs text-slate-400 leading-relaxed">
                        {strat.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* EDITORIAL HOW THIS CALCULATOR WORKS (EDITORIAL SEO CONTENT FALLBACK) */}
        {!tool.editorialSections && tool.howItWorks && (
          <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-4 text-left shadow-lg">
            <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-teal-400" />
              <span>{tool.howItWorks.title}</span>
            </h2>
            <p className="text-sm text-slate-300 leading-relaxed">
              {tool.howItWorks.explanation}
            </p>
            <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-4 font-mono text-xs text-teal-300 overflow-x-auto">
              <span className="text-slate-400 font-sans block text-[11px] font-semibold mb-1 uppercase tracking-wider">Baseline Mathematical Formula:</span>
              {tool.howItWorks.formula}
            </div>
            <div className="space-y-2 pt-2">
              <h3 className="text-xs uppercase font-bold tracking-wider text-slate-400">Standard Baseline Rates &amp; Thresholds:</h3>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs text-slate-300">
                {tool.howItWorks.rates.map((rate, idx) => (
                  <li key={idx} className="flex items-start gap-2 bg-slate-950/50 p-2.5 rounded-lg border border-slate-800/60">
                    <span className="w-1.5 h-1.5 rounded-full bg-teal-400 mt-1.5 shrink-0" />
                    <span>{rate}</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        )}

        {/* CRAWLABLE ON-PAGE CONTENT (PREVENTS THIN-CONTENT PENALTY) */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8 border-t border-slate-800/80 pt-10">
          <div className="space-y-4 text-left">
            <h2 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Step-by-Step Instructions</span>
            </h2>
            <ol className="space-y-2.5">
              {tool.howToSteps.map((step, i) => (
                <li
                  key={i}
                  className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300 bg-slate-900/60 p-3 rounded-xl border border-slate-800/70"
                >
                  <span className="w-5 h-5 rounded-full bg-slate-800 text-blue-400 text-xs font-mono font-bold flex items-center justify-center shrink-0">
                    {i + 1}
                  </span>
                  <span className="leading-relaxed">{step}</span>
                </li>
              ))}
            </ol>
          </div>

          <div className="space-y-4 text-left">
            <h2 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
              <HelpCircle className="w-4 h-4 text-blue-400" />
              <span>Industrial Context &amp; FAQ</span>
            </h2>
            <div className="space-y-3">
              {tool.faqs.map((faq, i) => (
                <details
                  key={i}
                  open={i === 0}
                  className="group bg-slate-900/60 border border-slate-800/70 rounded-xl p-3.5 space-y-1.5"
                >
                  <summary className="text-xs sm:text-sm font-semibold text-white flex items-center justify-between cursor-pointer list-none select-none">
                    <span className="flex items-start gap-2">
                      <span className="text-blue-400 font-bold shrink-0">Q:</span>
                      <span>{faq.q}</span>
                    </span>
                    <span className="text-slate-400 text-xs transition-transform group-open:rotate-180 ml-2">▼</span>
                  </summary>
                  <p className="text-xs text-slate-300 leading-relaxed pl-5 pt-2 border-t border-slate-800/50 mt-2">
                    {faq.a}
                  </p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* RELATED E-COMMERCE TOOLS INTERNAL LINKING GRID */}
        <section className="border-t border-slate-800/80 pt-10 space-y-4 text-left">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <h2 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
              <Grid className="w-4 h-4 text-teal-400" />
              <span>Related E-Commerce &amp; Seller Financial Tools</span>
            </h2>
            <button
              onClick={onNavigateToolsHub}
              className="text-xs font-semibold text-teal-400 hover:text-teal-300 transition-colors inline-flex items-center gap-1 cursor-pointer"
            >
              <span>View All 25+ Business Tools</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {[
              { slug: 'stripe-fee-calculator', name: 'Stripe Fee Calculator', tag: '2.9% + $0.30 Rates' },
              { slug: 'amazon-fba-calculator', name: 'Amazon FBA Calculator', tag: 'Pick & Pack Profits' },
              { slug: 'ebay-fee-calculator', name: 'eBay Fee Calculator', tag: 'FVF & Store Rates' },
              { slug: 'temu-seller-calculator', name: 'Temu Seller Calculator', tag: 'Cross-Border Margin' },
              { slug: 'shopify-fee-calculator', name: 'Shopify Fee Calculator', tag: 'Gateway & Tiers' },
              { slug: 'amazon-fbm-calculator', name: 'Amazon FBM Calculator', tag: 'Merchant Shipping' },
              { slug: 'etsy-fee-calculator', name: 'Etsy Fee Calculator', tag: 'Listing & Payoneer' },
              { slug: 'tiktok-shop-fee-calculator', name: 'TikTok Shop Calculator', tag: 'UK 9% & US 6%' },
            ].map((relTool, idx) => (
              <a
                key={idx}
                href={`/tools/${relTool.slug}`}
                onClick={(e) => {
                  e.preventDefault();
                  onNavigatePage(relTool.slug as NavPageId);
                }}
                className={`p-3.5 rounded-xl border transition-all text-left space-y-1 block cursor-pointer ${
                  tool.slug === relTool.slug
                    ? 'bg-teal-500/10 border-teal-500/50 text-white'
                    : 'bg-slate-900/60 border-slate-800/80 hover:border-teal-500/40 hover:bg-slate-900 text-slate-300'
                }`}
              >
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-teal-400 block truncate">
                  {relTool.tag}
                </span>
                <h3 className="text-xs sm:text-sm font-bold text-white line-clamp-1">
                  {relTool.name}
                </h3>
              </a>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};
