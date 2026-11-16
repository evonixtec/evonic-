import React from 'react';
import {
  Globe,
  Smartphone,
  BrainCircuit,
  Cpu,
  Check,
  ArrowRight,
  HardDrive,
  WifiOff,
  Lock,
  Database,
  Store,
  Building2,
  ShoppingCart,
  Utensils,
  Package,
  Factory,
  CalendarCheck,
  Layers,
  Code2,
  Receipt,
  Printer,
  RefreshCw,
} from 'lucide-react';

interface CoreServiceItem {
  id: string;
  num: string;
  title: string;
  subtitle: string;
  description: string;
  deliverables: string[];
  techStack: string[];
  icon: React.ReactNode;
}

const CORE_SERVICES: CoreServiceItem[] = [
  {
    id: 'web-dev',
    num: '01',
    title: 'Web Development',
    subtitle: 'High-Performance B2B & Cloud Web Platforms',
    description:
      'We engineer fast, responsive web applications with Next.js, TypeScript, and edge-rendered architectures built for conversion, clear navigation, and search reliability.',
    deliverables: [
      'Next.js App Router and server-rendered portals for sub-second speed',
      'Clean UI systems with strict Core Web Vitals optimization',
      'Scalable frontends and real-time operational dashboards',
      'Technical SEO architecture and structured schema integration',
    ],
    techStack: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'Node.js'],
    icon: <Globe className="w-5 h-5 text-[#C81E1E]" />,
  },
  {
    id: 'app-dev',
    num: '02',
    title: 'App Development',
    subtitle: 'Native iOS & Android Field Ecosystems',
    description:
      'Bespoke mobile applications built with React Native and Flutter featuring offline-first local storage, barcode scanning, and encrypted branch synchronization.',
    deliverables: [
      'Single codebase parity across iOS and Android field devices',
      'Offline-first capture with encrypted local SQLite databases',
      'Camera barcode scanning, Bluetooth printing, and biometric sign-in',
      'Automated App Store and Google Play release pipelines',
    ],
    techStack: ['React Native', 'Flutter', 'Swift', 'Kotlin', 'SQLite'],
    icon: <Smartphone className="w-5 h-5 text-[#C81E1E]" />,
  },
  {
    id: 'ai-solutions',
    num: '03',
    title: 'AI Solutions',
    subtitle: 'Custom AI Workflow & WhatsApp Business Automation UAE',
    description:
      'Deploy custom AI workflow & WhatsApp business automation UAE and private RAG pipelines into production operations. We connect order routing, quote intake, and enterprise knowledge search directly to CRM and ERP records.',
    deliverables: [
      'Custom AI workflow & WhatsApp business automation UAE pipelines',
      'Private RAG pipelines with vector databases (Pinecone, pgvector)',
      'Multi-agent task orchestration with strict tool-calling boundaries',
      'Zero-data-leakage governance and machine-level privacy rules',
    ],
    techStack: ['Python', 'Gemini API', 'LangChain', 'FastAPI', 'pgvector'],
    icon: <BrainCircuit className="w-5 h-5 text-[#C81E1E]" />,
  },
  {
    id: 'custom-software',
    num: '04',
    title: 'Custom Software & SaaS',
    subtitle: 'UAE Corporate Tax & E-Invoicing Ready ERP Solutions',
    description:
      'B2B inventory and POS integration Dubai & Sharjah alongside UAE corporate tax & e-invoicing ready ERP solutions. Built with multi-branch transaction engines, role-based controls, and audited financial ledgers.',
    deliverables: [
      'UAE corporate tax & e-invoicing ready ERP solutions',
      'B2B inventory and POS integration Dubai & Sharjah showrooms',
      'Industrial barcode scanning, warehouse stock, and offline POS',
      'On-premise Windows LAN and multi-region cloud failover',
    ],
    techStack: ['PostgreSQL', 'Go', 'Node.js', 'Docker', 'AWS'],
    icon: <Cpu className="w-5 h-5 text-[#C81E1E]" />,
  },
];

const BUSINESS_SOLUTIONS: {
  num: string;
  title: string;
  description: string;
  icon: React.ReactNode;
}[] = [
  {
    num: '01',
    title: 'Retail & Single-Counter Shops',
    description:
      'One-counter rapid barcode billing, real-time stock tracking, digital customer Khata (udhaar ledger), and instant daily cash closing—built to run at full speed even when your internet is down.',
    icon: <Store className="w-5 h-5 text-[#C81E1E]" />,
  },
  {
    num: '02',
    title: 'Multi-Branch Retail Chains',
    description:
      'Centralized head-office control across multiple branches, inter-branch stock transfers, unified profit reporting, and offline-capable POS counters that sync seamlessly whenever connected.',
    icon: <Building2 className="w-5 h-5 text-[#C81E1E]" />,
  },
  {
    num: '03',
    title: 'E-Commerce & Omnichannel Sellers',
    description:
      'Connect your physical warehouse stock with your online store and marketplaces in one unified ledger—eliminating overselling while keeping your core accounting offline and secure.',
    icon: <ShoppingCart className="w-5 h-5 text-[#C81E1E]" />,
  },
  {
    num: '04',
    title: 'Restaurants, Cafés & Takeaways',
    description:
      'Visual table management, instant Kitchen Order Tickets (KOT), dine-in/takeaway/delivery billing, split bills, and recipe-level ingredient deduction designed for zero-lag rush hours.',
    icon: <Utensils className="w-5 h-5 text-[#C81E1E]" />,
  },
  {
    num: '05',
    title: 'Wholesale & Distribution',
    description:
      'Automated carton-to-piece conversions, tiered wholesale rate lists, customer credit limit alerts, supplier Khata management, and rapid bulk invoicing without cloud latency.',
    icon: <Package className="w-5 h-5 text-[#C81E1E]" />,
  },
  {
    num: '06',
    title: 'Manufacturing & Export Units',
    description:
      'End-to-end raw material purchasing, Bill of Materials (BOM), batch production tracking, and export documentation tailored to your factory workflow—ideal for sportswear, surgical, and leather manufacturers.',
    icon: <Factory className="w-5 h-5 text-[#C81E1E]" />,
  },
  {
    num: '07',
    title: 'Service Businesses, Clinics & Salons',
    description:
      'Appointment scheduling, recurring memberships, staff commission tracking, and instant receipt printing—with client history stored privately on your local system.',
    icon: <CalendarCheck className="w-5 h-5 text-[#C81E1E]" />,
  },
  {
    num: '08',
    title: 'Enterprise & High-Volume Operations',
    description:
      'Granular role-based staff permissions, custom API integrations, automated accounting exports, on-premise deployment, and dedicated team onboarding.',
    icon: <Layers className="w-5 h-5 text-[#C81E1E]" />,
  },
];

const IMPLEMENTATION_SERVICES: {
  num: string;
  title: string;
  description: string;
  icon: React.ReactNode;
}[] = [
  {
    num: '01',
    title: 'Custom Offline Software',
    description:
      'Bespoke Windows desktop and local-network business software engineered around your exact workflow—no recurring cloud dependency and complete data ownership.',
    icon: <HardDrive className="w-5 h-5 text-[#C81E1E]" />,
  },
  {
    num: '02',
    title: 'Corporate & Business Websites',
    description:
      'Clean, fast-loading, SEO-structured enterprise websites built to establish brand authority and convert B2B and local buyers.',
    icon: <Code2 className="w-5 h-5 text-[#C81E1E]" />,
  },
  {
    num: '03',
    title: 'E-Commerce Stores',
    description:
      'High-converting online storefronts equipped with local payment gateways, automated tax rules, and unified inventory management.',
    icon: <ShoppingCart className="w-5 h-5 text-[#C81E1E]" />,
  },
  {
    num: '04',
    title: 'Mobile Applications',
    description:
      'Companion Android and iOS apps for field sales teams, delivery riders, and owners—featuring offline data capture and local sync.',
    icon: <Smartphone className="w-5 h-5 text-[#C81E1E]" />,
  },
  {
    num: '05',
    title: 'Legacy Data Migration',
    description:
      'Zero-loss migration of your existing Excel sheets, old POS databases, SKU catalogs, and customer/supplier Khata balances into your new system.',
    icon: <RefreshCw className="w-5 h-5 text-[#C81E1E]" />,
  },
  {
    num: '06',
    title: 'Tax & FBR Integration Setup',
    description:
      'Complete configuration for FBR Tier-1 POS digital invoicing, NTN/STRN tax rules, and UAE VAT/corporate tax reporting right from your billing screen.',
    icon: <Receipt className="w-5 h-5 text-[#C81E1E]" />,
  },
  {
    num: '07',
    title: 'POS & Retail Hardware',
    description:
      'Plug-and-play thermal receipt printers, barcode scanners, hang-tag/label printers, cash drawers, and touch POS terminals—pre-configured and tested with your software.',
    icon: <Printer className="w-5 h-5 text-[#C81E1E]" />,
  },
];

export interface ServicesProps {
  onSelectService?: (id: string) => void;
  onSelectServiceForQuote?: (serviceType?: string) => void;
  onNavigatePage?: (page: any, subTarget?: string) => void;
}

export const Services: React.FC<ServicesProps> = ({
  onSelectServiceForQuote,
  onNavigatePage,
}) => {
  return (
    <div className="bg-white text-slate-900">
      {/* ========================================================
          1. SOLUTIONS BY BUSINESS TYPE (Evonix Hisaab Pro)
         ======================================================== */}
      <section
        id="solutions-by-business-type"
        className="py-16 sm:py-20 bg-[#FAFAF9] border-b border-[#E5E7EB]"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          {/* Header */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 text-left">
            <div className="max-w-3xl space-y-2.5">
              <p className="text-xs font-semibold text-[#C81E1E]">
                01 · Solutions by Business Type
              </p>
              <h2 className="text-3xl sm:text-4xl font-semibold text-slate-900 tracking-tight">
                Offline-First Business Software Built for Every Industry
              </h2>
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                Fast, reliable desktop and local-network systems powered by Evonix Hisaab Pro—engineered to run without internet interruptions while keeping 100% of your business data on your own machine.
              </p>
            </div>

            {onSelectServiceForQuote && (
              <button
                type="button"
                onClick={() => onSelectServiceForQuote('Evonix Hisaab Pro Industry Demo')}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-[#C81E1E] hover:bg-[#A6171E] text-white font-semibold text-sm transition-colors cursor-pointer whitespace-nowrap self-start lg:self-auto"
              >
                <span>Book Free Software Demo</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Offline-First Advantage Architecture Bar */}
          <div className="bg-white border border-[#E5E7EB] rounded-xl p-5 sm:p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 text-left">
            <div className="flex items-start gap-3">
              <WifiOff className="w-5 h-5 text-[#C81E1E] flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="text-sm font-semibold text-slate-900">100% Offline Execution</h3>
                <p className="text-xs text-slate-600 mt-0.5 leading-relaxed">
                  Zero internet dependency for billing, stock updates, and Khata ledgers.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <HardDrive className="w-5 h-5 text-[#C81E1E] flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="text-sm font-semibold text-slate-900">On-Premise Machine Speed</h3>
                <p className="text-xs text-slate-600 mt-0.5 leading-relaxed">
                  Sub-second local Windows &amp; LAN queries with zero cloud loading lag.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Database className="w-5 h-5 text-[#C81E1E] flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="text-sm font-semibold text-slate-900">Automated Local Backups</h3>
                <p className="text-xs text-slate-600 mt-0.5 leading-relaxed">
                  Scheduled encrypted backups to local drives and external USB storage.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Lock className="w-5 h-5 text-[#C81E1E] flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="text-sm font-semibold text-slate-900">Full Data Privacy</h3>
                <p className="text-xs text-slate-600 mt-0.5 leading-relaxed">
                  100% of sales, buyer lists, and accounting stays on your own hardware.
                </p>
              </div>
            </div>
          </div>

          {/* 8 Business Type Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {BUSINESS_SOLUTIONS.map((item) => (
              <article
                key={item.num}
                className="bg-white border border-[#E5E7EB] hover:border-slate-300 rounded-xl p-6 flex flex-col justify-between transition-colors text-left"
              >
                <div className="space-y-3.5">
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 rounded-lg bg-[#FAFAF9] border border-[#E5E7EB] flex items-center justify-center">
                      {item.icon}
                    </div>
                    <span className="font-mono text-xs text-slate-400 tabular-nums">
                      {item.num}.
                    </span>
                  </div>

                  <h3 className="text-base sm:text-lg font-semibold text-slate-900 leading-snug">
                    {item.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                {onSelectServiceForQuote && (
                  <div className="pt-4 mt-5 border-t border-[#E5E7EB]">
                    <button
                      type="button"
                      onClick={() => onSelectServiceForQuote(`Solutions Inquiry: ${item.title}`)}
                      className="text-xs font-semibold text-[#C81E1E] hover:text-[#A6171E] inline-flex items-center gap-1 cursor-pointer"
                    >
                      <span>Request {item.title} Demo</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                )}
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================
          2. TECHNICAL & IMPLEMENTATION SERVICES
         ======================================================== */}
      <section
        id="technical-implementation-services"
        className="py-16 sm:py-20 bg-white border-b border-[#E5E7EB]"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          {/* Header */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 text-left">
            <div className="max-w-3xl space-y-2.5">
              <p className="text-xs font-semibold text-[#C81E1E]">
                02 · Technical &amp; Implementation Services
              </p>
              <h2 className="text-3xl sm:text-4xl font-semibold text-slate-900 tracking-tight">
                End-to-End Engineering, Integration &amp; Hardware Deployment
              </h2>
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                From custom offline desktop applications to FBR tax compliance and pre-configured POS hardware, we handle your entire technical setup under one roof.
              </p>
            </div>

            {onSelectServiceForQuote && (
              <button
                type="button"
                onClick={() => onSelectServiceForQuote('End-to-End Engineering & Deployment')}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-white hover:bg-[#FAFAF9] text-slate-900 font-semibold text-sm border border-[#E5E7EB] transition-colors cursor-pointer whitespace-nowrap self-start lg:self-auto"
              >
                <span>Discuss Implementation Scope</span>
                <ArrowRight className="w-4 h-4 text-[#C81E1E]" />
              </button>
            )}
          </div>

          {/* 7 Technical & Implementation Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {IMPLEMENTATION_SERVICES.map((svc) => (
              <article
                key={svc.num}
                className="bg-[#FAFAF9] border border-[#E5E7EB] hover:border-slate-300 rounded-xl p-6 flex flex-col justify-between transition-colors text-left"
              >
                <div className="space-y-3.5">
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 rounded-lg bg-white border border-[#E5E7EB] flex items-center justify-center">
                      {svc.icon}
                    </div>
                    <span className="font-mono text-xs text-slate-400 tabular-nums">
                      {svc.num}.
                    </span>
                  </div>

                  <h3 className="text-base sm:text-lg font-semibold text-slate-900 leading-snug">
                    {svc.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {svc.description}
                  </p>
                </div>

                {svc.title === 'POS & Retail Hardware' && (
                  <div className="pt-3 mt-3 border-t border-[#E5E7EB]/70 space-y-1.5 text-xs">
                    <a
                      href="/blog/heavy-duty-laser-printer-repair-daska-road-sialkot-factories"
                      onClick={(e) => {
                        if (onNavigatePage) {
                          e.preventDefault();
                          onNavigatePage('guides', 'blog/heavy-duty-laser-printer-repair-daska-road-sialkot-factories');
                        }
                      }}
                      className="block text-slate-700 hover:text-[#C81E1E] font-medium transition-colors"
                    >
                      Guide: Laser Printer Fuser Repair (Sialkot) &rarr;
                    </a>
                    <a
                      href="/blog/dell-latitude-hp-elitebook-type-c-charging-repair-sialkot"
                      onClick={(e) => {
                        if (onNavigatePage) {
                          e.preventDefault();
                          onNavigatePage('guides', 'blog/dell-latitude-hp-elitebook-type-c-charging-repair-sialkot');
                        }
                      }}
                      className="block text-slate-700 hover:text-[#C81E1E] font-medium transition-colors"
                    >
                      Guide: Laptop Type-C Charging IC Repair &rarr;
                    </a>
                  </div>
                )}

                {onSelectServiceForQuote && (
                  <div className="pt-4 mt-5 border-t border-[#E5E7EB]">
                    <button
                      type="button"
                      onClick={() => onSelectServiceForQuote(svc.title)}
                      className="text-xs font-semibold text-[#C81E1E] hover:text-[#A6171E] inline-flex items-center gap-1 cursor-pointer"
                    >
                      <span>Request Setup Quote</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                )}
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================
          3. CORE SOFTWARE & UAE ENTERPRISE CAPABILITIES
         ======================================================== */}
      <section
        id="services"
        className="py-16 sm:py-20 bg-[#FAFAF9] border-b border-[#E5E7EB]"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="max-w-3xl space-y-2.5 text-left">
            <p className="text-xs font-semibold text-[#C81E1E]">
              03 · Enterprise Engineering Matrix
            </p>
            <h2 className="text-3xl sm:text-4xl font-semibold text-slate-900 tracking-tight">
              Custom Cloud, Mobile &amp; AI Architecture
            </h2>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              Twenty years of Dubai enterprise systems engineering applied to full-stack portals, private automation pipelines, and multi-branch retail platforms.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {CORE_SERVICES.map((service) => (
              <div
                key={service.id}
                className="bg-white rounded-xl border border-[#E5E7EB] p-6 sm:p-8 flex flex-col justify-between text-left"
              >
                <div className="space-y-5">
                  <div className="flex items-start justify-between">
                    <div className="w-11 h-11 rounded-lg bg-[#FAFAF9] border border-[#E5E7EB] flex items-center justify-center">
                      {service.icon}
                    </div>
                    <span className="font-mono text-sm font-semibold text-slate-400 tabular-nums">
                      {service.num}.
                    </span>
                  </div>

                  <div className="space-y-1.5">
                    <h3 className="text-xl font-semibold text-slate-900">
                      {service.title}
                    </h3>
                    <p className="text-xs font-mono text-[#C81E1E]">
                      {service.subtitle}
                    </p>
                    <p className="text-sm text-slate-600 leading-relaxed pt-1">
                      {service.description}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-[#E5E7EB] space-y-2">
                    <div className="text-xs font-semibold text-slate-500">
                      Standard Deliverables
                    </div>
                    <ul className="space-y-2 text-xs sm:text-sm text-slate-700">
                      {service.deliverables.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <Check className="w-4 h-4 text-[#C81E1E] flex-shrink-0 mt-0.5" />
                          <span className="leading-snug">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="pt-5 mt-5 border-t border-[#E5E7EB] space-y-3">
                  {service.id === 'web-dev' && (
                    <div className="space-y-1.5 text-xs pb-2 border-b border-[#E5E7EB]/70">
                      <div className="font-semibold text-slate-500">
                        Recommended Web &amp; Export SEO Guides
                      </div>
                      <a
                        href="/blog/high-performance-landing-pages-structure-speed-seo"
                        onClick={(e) => {
                          if (onNavigatePage) {
                            e.preventDefault();
                            onNavigatePage('guides', 'blog/high-performance-landing-pages-structure-speed-seo');
                          }
                        }}
                        className="block text-slate-800 hover:text-[#C81E1E] font-medium transition-colors"
                      >
                        High-Performance Landing Pages: Speed &amp; SEO Structure &rarr;
                      </a>
                      <a
                        href="/blog/essential-elements-high-converting-b2b-portfolio-website"
                        onClick={(e) => {
                          if (onNavigatePage) {
                            e.preventDefault();
                            onNavigatePage('guides', 'blog/essential-elements-high-converting-b2b-portfolio-website');
                          }
                        }}
                        className="block text-slate-800 hover:text-[#C81E1E] font-medium transition-colors"
                      >
                        Essential Elements of a High-Converting B2B Portfolio Website &rarr;
                      </a>
                      <a
                        href="/blog/export-seo-ranking-first-page-google-daska-road-sialkot"
                        onClick={(e) => {
                          if (onNavigatePage) {
                            e.preventDefault();
                            onNavigatePage('guides', 'blog/export-seo-ranking-first-page-google-daska-road-sialkot');
                          }
                        }}
                        className="block text-slate-800 hover:text-[#C81E1E] font-medium transition-colors"
                      >
                        Export SEO Blueprint for Daska Road Factories &rarr;
                      </a>
                    </div>
                  )}
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <span className="font-mono text-[11px] text-slate-500">
                      {service.techStack.join(' · ')}
                    </span>
                    {onSelectServiceForQuote && (
                      <button
                        type="button"
                        onClick={() => onSelectServiceForQuote(service.title)}
                        className="text-xs font-semibold text-[#C81E1E] hover:text-[#A6171E] cursor-pointer whitespace-nowrap"
                      >
                        Request Scope
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* 04 · Web, SEO & Hardware Repair Engineering Guides (Direct Internal Links) */}
          <div className="bg-white rounded-xl border border-[#E5E7EB] p-6 sm:p-8 text-left space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-4 border-b border-[#E5E7EB]">
              <div className="space-y-1">
                <p className="text-xs font-semibold text-[#C81E1E]">
                  04 · Engineering &amp; Repair Field Notes
                </p>
                <h3 className="text-xl sm:text-2xl font-semibold text-slate-900 tracking-tight">
                  Web Architecture, Export SEO &amp; Hardware Repair Guides
                </h3>
                <p className="text-xs sm:text-sm text-slate-600">
                  Read practical implementation playbooks written by our web engineers and Sialkot lab technicians.
                </p>
              </div>
              <a
                href="/guides"
                onClick={(e) => {
                  if (onNavigatePage) {
                    e.preventDefault();
                    onNavigatePage('guides');
                  }
                }}
                className="text-xs font-semibold text-[#C81E1E] hover:text-[#A6171E] whitespace-nowrap inline-flex items-center gap-1"
              >
                <span>View All Guides</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <a
                href="/blog/high-performance-landing-pages-structure-speed-seo"
                onClick={(e) => {
                  if (onNavigatePage) {
                    e.preventDefault();
                    onNavigatePage('guides', 'blog/high-performance-landing-pages-structure-speed-seo');
                  }
                }}
                className="p-4 rounded-xl bg-[#FAFAF9] border border-[#E5E7EB] hover:border-[#C81E1E] transition-colors block space-y-1.5"
              >
                <span className="font-mono text-[11px] text-[#C81E1E]">Web &amp; SEO</span>
                <h4 className="text-sm font-semibold text-slate-900 leading-snug">
                  High-Performance Landing Pages: Structure, Speed &amp; SEO
                </h4>
                <p className="text-xs text-slate-600">
                  Clean layout structure, sub-second loading speed, and technical schema setup.
                </p>
              </a>

              <a
                href="/blog/essential-elements-high-converting-b2b-portfolio-website"
                onClick={(e) => {
                  if (onNavigatePage) {
                    e.preventDefault();
                    onNavigatePage('guides', 'blog/essential-elements-high-converting-b2b-portfolio-website');
                  }
                }}
                className="p-4 rounded-xl bg-[#FAFAF9] border border-[#E5E7EB] hover:border-[#C81E1E] transition-colors block space-y-1.5"
              >
                <span className="font-mono text-[11px] text-[#C81E1E]">Web &amp; B2B</span>
                <h4 className="text-sm font-semibold text-slate-900 leading-snug">
                  Essential Elements of a High-Converting B2B Portfolio Website
                </h4>
                <p className="text-xs text-slate-600">
                  Trust signals, factory proof pages, and fast inquiry flows for export buyers.
                </p>
              </a>

              <a
                href="/blog/export-seo-ranking-first-page-google-daska-road-sialkot"
                onClick={(e) => {
                  if (onNavigatePage) {
                    e.preventDefault();
                    onNavigatePage('guides', 'blog/export-seo-ranking-first-page-google-daska-road-sialkot');
                  }
                }}
                className="p-4 rounded-xl bg-[#FAFAF9] border border-[#E5E7EB] hover:border-[#C81E1E] transition-colors block space-y-1.5"
              >
                <span className="font-mono text-[11px] text-[#C81E1E]">Export SEO</span>
                <h4 className="text-sm font-semibold text-slate-900 leading-snug">
                  Export SEO: Ranking #1 on Google for Daska Road Exporters
                </h4>
                <p className="text-xs text-slate-600">
                  How Sialkot manufacturers win high-intent buyers in the US and Europe.
                </p>
              </a>

              <a
                href="/blog/heavy-duty-laser-printer-repair-daska-road-sialkot-factories"
                onClick={(e) => {
                  if (onNavigatePage) {
                    e.preventDefault();
                    onNavigatePage('guides', 'blog/heavy-duty-laser-printer-repair-daska-road-sialkot-factories');
                  }
                }}
                className="p-4 rounded-xl bg-[#FAFAF9] border border-[#E5E7EB] hover:border-[#C81E1E] transition-colors block space-y-1.5"
              >
                <span className="font-mono text-[11px] text-[#C81E1E]">IT Hardware Repair</span>
                <h4 className="text-sm font-semibold text-slate-900 leading-snug">
                  Heavy-Duty Laser Printer Fuser Repair on Daska Road, Sialkot
                </h4>
                <p className="text-xs text-slate-600">
                  Prevent industrial dust fuser jams and paper feed errors in busy factories.
                </p>
              </a>

              <a
                href="/blog/dell-latitude-hp-elitebook-type-c-charging-repair-sialkot"
                onClick={(e) => {
                  if (onNavigatePage) {
                    e.preventDefault();
                    onNavigatePage('guides', 'blog/dell-latitude-hp-elitebook-type-c-charging-repair-sialkot');
                  }
                }}
                className="p-4 rounded-xl bg-[#FAFAF9] border border-[#E5E7EB] hover:border-[#C81E1E] transition-colors block space-y-1.5"
              >
                <span className="font-mono text-[11px] text-[#C81E1E]">IT Hardware Repair</span>
                <h4 className="text-sm font-semibold text-slate-900 leading-snug">
                  Dell Latitude &amp; HP EliteBook Type-C Charging IC Repair
                </h4>
                <p className="text-xs text-slate-600">
                  Bench diagnostic and motherboard micro-soldering steps for USB-C power faults.
                </p>
              </a>
            </div>
          </div>

          {/* UAE & Cross-Border B2B FAQ Block (Updated for 2026/2027) */}
          <div className="bg-white rounded-xl border border-[#E5E7EB] p-6 sm:p-8 text-left space-y-6">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-5 border-b border-[#E5E7EB]">
              <div className="space-y-1.5">
                <p className="text-xs font-semibold text-[#C81E1E]">
                  Updated for 2026/2027 · UAE &amp; Cross-Border B2B Engineering
                </p>
                <h3 className="text-xl sm:text-2xl font-semibold text-slate-900 tracking-tight">
                  Enterprise IT, UAE E-Invoicing &amp; AI Automation FAQs
                </h3>
              </div>
              {onSelectServiceForQuote && (
                <button
                  type="button"
                  onClick={() => onSelectServiceForQuote('UAE B2B ERP & AI Automation Consultation')}
                  className="px-4 py-2 rounded-lg bg-[#C81E1E] hover:bg-[#A6171E] text-white font-semibold text-xs sm:text-sm transition-colors cursor-pointer whitespace-nowrap self-start md:self-auto"
                >
                  Book Architecture Review
                </button>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-5 rounded-xl bg-[#FAFAF9] border border-[#E5E7EB] space-y-2">
                <h4 className="text-sm sm:text-base font-semibold text-slate-900">
                  Custom AI workflow &amp; WhatsApp business automation UAE
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Automate buyer lead qualification, Arabic/English document extraction, order status updates, and ERP ticket routing via official WhatsApp Business APIs without exposing proprietary client data.
                </p>
              </div>

              <div className="p-5 rounded-xl bg-[#FAFAF9] border border-[#E5E7EB] space-y-2">
                <h4 className="text-sm sm:text-base font-semibold text-slate-900">
                  B2B inventory and POS integration Dubai &amp; Sharjah
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Unify warehouse stock levels in Al Quoz, Jebel Ali, and Sharjah industrial zones with multi-branch retail POS counters, barcode scanning, and real-time supplier replenishment ledgers.
                </p>
              </div>

              <div className="p-5 rounded-xl bg-[#FAFAF9] border border-[#E5E7EB] space-y-2">
                <h4 className="text-sm sm:text-base font-semibold text-slate-900">
                  UAE corporate tax &amp; e-invoicing ready ERP solutions
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Built-in TRN/VAT tax ledgers, structured audit logs, and UAE e-invoicing readiness aligned with FTA compliance timelines for 2026 and 2027 cross-border trading groups.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
