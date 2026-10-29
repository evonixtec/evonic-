import { ServiceItem, ShopProduct, PortfolioCategory, FaqItem } from '../types';

export const COMPANY_INFO = {
  name: 'EVONIX TECHNOLOGIES',
  legalName: 'evonix technologies Sialkot',
  tagline: 'Dubai-Standard Engineering & Enterprise Solutions',
  tagline1: 'Dubai-Standard Engineering & Enterprise Solutions',
  urduTagline: 'دبئی کے بین الاقوامی معیار کا سافٹ ویئر اور انٹرپرائز حل',
  about: {
    title: 'Pioneering Global IT Engineering in Sialkot',
    story: 'Founded with 20+ years of enterprise experience in Dubai, UAE, evonix brings international engineering standards, bespoke software architecture, and high-performance AI solutions to businesses worldwide.',
    mission: 'To provide global enterprises, exporters, and retailers with international-grade software architecture, rapid deployment, and clean B2B software solutions.',
    vision: 'To establish Sialkot as a premier hub for digital export commerce backed by world-class software engineering and AI-driven automation.',
  },
  contact: {
    email: 'evonixtec@gmail.com',
    phoneDisplay: '+92 326 324 4002',
    phoneRaw: '+923263244002',
    whatsapp: '923263244002',
    whatsappDisplay: '+92 326 324 4002',
    address: 'Kotli Behram, Sialkot, Pakistan',
    city: 'Sialkot',
    region: 'Punjab, Pakistan',
    postalCode: '51310',
    hours: 'Monday – Saturday: 9:00 AM – 8:00 PM | Enterprise On-Call Support 24/7',
    socials: {
      linkedin: 'https://www.linkedin.com/company/evonix-technologies',
      facebook: 'https://www.facebook.com/evonixtechnologies',
      twitter: 'https://x.com/evonixtec',
      instagram: 'https://www.instagram.com/evonixtechnologies',
      whatsapp: 'https://wa.me/923263244002',
    },
  },
  stats: [
    { value: '20+', label: 'Years Dubai & Global Experience' },
    { value: '100%', label: 'Client-Side Privacy Guarantee' },
    { value: '22+', label: 'Cross-Border Workstation Tools' },
    { value: '500+', label: 'Enterprises & Exporters Served' },
  ],
};

export interface HeroSlide {
  id: string;
  bgImage: string;
  headingPrefix: string;
  headingGradient: string;
  subHeading: string;
  paragraph: string;
  primaryCta: string;
  primaryAction: 'quote' | 'services' | 'portfolio' | 'shop';
  servicePrefill?: string;
  secondaryCta: string;
  secondaryAction: 'services' | 'portfolio' | 'shop' | 'whatsapp';
  pills: string[];
  floatingBadge: string;
  floatingText: string;
}

export const HERO_SLIDES: HeroSlide[] = [
  {
    id: 'hero-enterprise-b2b',
    bgImage: '/images/hero_dubai_tech_1790044690065.webp',
    headingPrefix: 'Enterprise Software &',
    headingGradient: 'B2B Engineering',
    subHeading: 'Over 20 Years of Commercial Tech Practice in Dubai & Global Markets',
    paragraph:
      'We bring two decades of international IT expertise to high-growth enterprises. From bespoke web applications to high-capacity ERP backbones and cloud infrastructure, we engineer systems that run with sub-second response times.',
    primaryCta: 'Request Enterprise Quote',
    primaryAction: 'quote',
    servicePrefill: 'Full Enterprise Software Consultancy',
    secondaryCta: 'View B2B Services',
    secondaryAction: 'services',
    pills: ['20+ Years UAE Pedigree', 'Dedicated Engineering Team', 'Direct Architect Consultation'],
    floatingBadge: 'Dubai ⟶ Global',
    floatingText: 'Enterprise Software House',
  },
  {
    id: 'hero-ai-solutions',
    bgImage: '/images/portfolio/portfolio_corporate.webp',
    headingPrefix: 'Enterprise AI Solutions',
    headingGradient: '& Workflow Automation',
    subHeading: 'Private Machine Learning Pipelines & Autonomous Agent Workflows',
    paragraph:
      'Equip your organization with bespoke AI pipelines, automated operational routing, real-time data ingestion, and scalable cloud architectures engineered to international security standards.',
    primaryCta: 'Schedule AI Consultation',
    primaryAction: 'quote',
    servicePrefill: 'AI Solutions & Cloud Automation',
    secondaryCta: 'View Case Studies',
    secondaryAction: 'portfolio',
    pills: ['Autonomous AI Workflows', 'Private Cloud Architecture', 'Zero-Data-Leak Guarantees'],
    floatingBadge: 'Enterprise AI',
    floatingText: 'Modern Intelligence',
  },
  {
    id: 'hero-industrial-erp',
    bgImage: '/images/Compute_industrial_cargo.webp',
    headingPrefix: 'Sialkot Industrial ERP',
    headingGradient: '& Supply Chain Systems',
    subHeading: 'Engineered for Surgical, Leather & Sports Goods Exporters',
    paragraph:
      'Track complete factory lifecycles from raw material forge or tannery drums to finished carton dispatch. Enforce FDA/CE audit logs, piece-rate worker payroll, WeBOC customs declarations, and container stuffing.',
    primaryCta: 'View Sialkot Industrial ERP',
    primaryAction: 'services',
    servicePrefill: 'Sialkot Industrial Export ERP',
    secondaryCta: 'Review Industry Modules',
    secondaryAction: 'services',
    pills: ['FDA / ISO 13485 Audit Logs', 'WeBOC Customs & HS Codes', 'Offline-First LAN Sync'],
    floatingBadge: 'Sialkot Hub',
    floatingText: 'Industrial Export ERP',
  },
  {
    id: 'hero-web-development',
    bgImage: '/images/service_web_dev_1790044711551.webp',
    headingPrefix: 'Custom Web Platforms',
    headingGradient: 'Built for Global Scale',
    subHeading: 'High-Performance Web Applications & Export Portals',
    paragraph:
      'Present your enterprise offerings, export catalogs, and B2B services to international buyers with fast, search-optimized web platforms built on modern React and distributed cloud architecture.',
    primaryCta: 'Start Web Project',
    primaryAction: 'quote',
    servicePrefill: 'Custom Website Development',
    secondaryCta: 'View Case Studies',
    secondaryAction: 'portfolio',
    pills: ['Mobile-First Architecture', 'Global Cloud CDN', '99+ Core Web Vitals'],
    floatingBadge: 'Web Platforms',
    floatingText: 'Global Export Portals',
  },
];

export interface ServiceGalleryItem {
  id: string;
  title: string;
  category: string;
  description: string;
  technician: string;
  tags: string[];
  imageJpg: string;
  imageWebp: string;
  alt: string;
  badge: string;
  servicePrefill?: string;
}

export const VERIFIED_SERVICE_GALLERY: ServiceGalleryItem[] = [
  {
    id: 'hp-paper-jam',
    title: 'HP LaserJet Roller & Paper Feed Restoration',
    category: 'Printers & Imaging',
    description: 'Replaced worn pickup rollers and cleared gear assembly jams on enterprise HP LaserJet units for Paris Road offices.',
    technician: 'Engr. Hamza - Senior Hardware Lead',
    tags: ['HP LaserJet', 'Roller Kit', 'Paper Feed', 'Sialkot Tech'],
    imageJpg: '/images/hp_paper_jam_1791024057573.jpg',
    imageWebp: '/images/hp_paper_jam_1791024057573.webp',
    alt: 'HP LaserJet printer roller repair and paper jam fix at Sialkot diagnostic bench',
    badge: 'Printer Workshop',
    servicePrefill: 'HP Printer Roller Repair',
  },
  {
    id: 'canon-ink-leakage',
    title: 'Canon Continuous Ink System & Printhead Service',
    category: 'Printers & Imaging',
    description: 'Cleaned clogged ink delivery tubes, purged airlocks, and aligned precision printheads for high-volume photo printing.',
    technician: 'Faraz Reza - Imaging Technician',
    tags: ['Canon Pixma', 'Printhead Clean', 'Ink System', 'Kotli Behram'],
    imageJpg: '/images/canon_ink_repair_1791024077688.jpg',
    imageWebp: '/images/canon_ink_repair_1791024077688.webp',
    alt: 'Canon printer ink tube cleaning and printhead maintenance in Sialkot lab',
    badge: 'Imaging Bench',
    servicePrefill: 'Canon Printhead Service',
  },
  {
    id: 'laptop-motherboard-repair',
    title: 'Laptop Motherboard Power Rail Micro-Soldering',
    category: 'Circuit Board Lab',
    description: 'Traced shorted ceramic capacitors along the 19V primary power rail and replaced damaged MOSFETs under stereo microscope.',
    technician: 'Engr. Hamza - Micro-Electronics Specialist',
    tags: ['Laptop Motherboard', 'Power Rail', 'Micro-Soldering', 'Chip Level'],
    imageJpg: '/images/motherboard_repair_human_1791024094445.jpg',
    imageWebp: '/images/motherboard_repair_human_1791024094445.webp',
    alt: 'Laptop motherboard micro-soldering and capacitor replacement under microscope in Sialkot',
    badge: 'Chip-Level Lab',
    servicePrefill: 'Laptop Motherboard Repair',
  },
  {
    id: 'pos-thermal-printer-setup',
    title: 'Thermal POS Billing Terminal & Cash Drawer Setup',
    category: 'Retail Hardware',
    description: 'Configured high-speed 80mm thermal receipt printers, USB barcode scanners, and auto-kick cash drawers for retail counter checkout.',
    technician: 'Rabia Noor - Systems Specialist',
    tags: ['Thermal Printer', 'POS Terminal', 'Barcode Reader', 'Retail Setup'],
    imageJpg: '/images/pos_thermal_setup_1791024110070.jpg',
    imageWebp: '/images/pos_thermal_setup_1791024110070.webp',
    alt: 'POS billing terminal and thermal receipt printer setup for retail shop in Sialkot',
    badge: 'Retail Hardware',
    servicePrefill: 'POS Terminal Setup',
  },
  {
    id: 'onsite-it-support',
    title: 'On-Site Factory LAN Cabling & Router Configuration',
    category: 'Field Operations',
    description: 'Ran CAT6 cabling, terminated RJ45 patch panels, and deployed dual-band Wi-Fi access points across an industrial sports factory.',
    technician: 'Faraz Reza & Field Support Crew',
    tags: ['On-Site Visit', 'Network Cabling', 'Factory LAN', 'Daska Road'],
    imageJpg: '/images/onsite_technician_human_1791024124026.jpg',
    imageWebp: '/images/onsite_technician_human_1791024124026.webp',
    alt: 'On-site IT technician setting up network cabling at industrial factory near Sialkot',
    badge: 'Field Station',
    servicePrefill: 'On-Site Network Cabling',
  },
];

export const SERVICES: (ServiceItem & {
  number: string;
  summary: string;
  deliverables: string[];
  features: string[];
})[] = [
  {
    id: 'web-development',
    number: '01',
    title: 'Custom Website & Web Application Engineering',
    category: 'software',
    summary:
      'High-performance company websites, B2B export portals, and product catalogs built for international speed, clean SEO, and mobile devices.',
    description:
      'We build fast, secure websites tailored for businesses in Sialkot and overseas. Every page loads under 1 second, works on all phones, and helps you win international buyers.',
    deliverables: [
      'Responsive Mobile & Desktop Layout',
      'Export Catalog & RFQ Inquiry Forms',
      'Ultra-Fast CDN Hosting & SSL Security',
      'Google Search Console & SEO Foundation',
    ],
    features: [
      'Modern TypeScript & React Code',
      'Zero Bloat Architecture',
      'WhatsApp Click-to-Chat Button',
      'Automated Sitemap & Schema Markup',
    ],
    imageUrl: '/images/service_web_dev_1790044711551.jpg',
    imageWebp: '/images/service_web_dev_1790044711551.webp',
    imageAlt: 'Custom website development and web applications by evonix technologies in Sialkot',
  },
  {
    id: 'software-pos',
    number: '02',
    title: 'Retail POS, Billing Software & Inventory Systems',
    category: 'software',
    summary:
      'Reliable point-of-sale software for retail stores, supermarkets, pharmacies, and restaurants with offline sales capability and inventory control.',
    description:
      'Say goodbye to register freezes. Our point-of-sale systems work without internet, sync stock across branches, and print clear receipts in less than a second.',
    deliverables: [
      'Offline-First Checkout Register',
      'Thermal Receipt & Barcode Printing',
      'Real-Time Stock & Low-Stock Alerts',
      'Multi-User Staff & Cashier Permissions',
    ],
    features: [
      'FBR POS Integration Compatibility',
      'Fast Barcode Scanning Flow',
      'Daily Sales Profit Reports',
      'Doorstep Training in Sialkot',
    ],
    imageUrl: '/images/service_software_pos_1790044733191.jpg',
    imageWebp: '/images/service_software_pos_1790044733191.webp',
    imageAlt: 'Point of sale billing software and inventory tracking in Sialkot',
  },
  {
    id: 'ai-automation',
    number: '03',
    title: 'AI & Enterprise Automation Solutions',
    category: 'software',
    summary:
      'Autonomous LLM agent pipelines, intelligent document parsing, customer workflow automation, and proprietary model integrations engineered to enterprise data security standards.',
    description:
      'Deploy production-ready artificial intelligence directly into your daily operational workflows. We construct secure Retrieval-Augmented Generation (RAG) pipelines, private vector stores, and automated decision engines with zero data leakage.',
    deliverables: [
      'Private RAG Pipelines with Vector Database Search',
      'Autonomous Task & Operations Ingestion Agents',
      'Enterprise LLM Fine-Tuning & Quantized Inference',
      'Client Data Privacy & Zero-Leakage Governance',
    ],
    features: [
      'Custom Gemini API & Open-Weights Model Tuning',
      'High-Accuracy Tool-Calling Pipelines',
      'Real-Time Semantic Knowledge Retrieval',
      'End-to-End Enterprise Role Security',
    ],
    imageUrl: '/src/assets/images/portfolio_pos_retail.jpg',
    imageWebp: '/src/assets/images/portfolio_pos_retail.jpg',
    imageAlt: 'Enterprise AI solutions and workflow automation by evonix technologies',
  },
  {
    id: 'cloud-architecture',
    number: '04',
    title: 'Cloud & Scalable Architecture',
    category: 'software',
    summary:
      'High-availability distributed cloud infrastructure, microservices orchestration, automated CI/CD pipelines, and 99.9% uptime SLA engineering on AWS, Google Cloud, and Cloudflare.',
    description:
      'Ensure your mission-critical applications handle millions of requests without slowdowns. We engineer multi-region database failovers, event-driven streaming queues, and containerized Kubernetes clusters.',
    deliverables: [
      'Multi-Region Cloud Deployment (AWS / GCP / Cloudflare)',
      'Automated Zero-Downtime CI/CD Build Pipelines',
      'High-Throughput PostgreSQL & Redis Caching Layers',
      '99.9% Uptime SLA & Real-Time Telemetry Monitoring',
    ],
    features: [
      'Kubernetes & Docker Container Orchestration',
      'Edge CDN & Global Serverless Edge Computing',
      'DDoS Mitigation & SOC-2 Compliance Ready',
      '24/7 Dedicated Cloud Infrastructure Support',
    ],
    imageUrl: '/src/assets/images/portfolio_logistics_cloud_1791375396392.jpg',
    imageWebp: '/src/assets/images/portfolio_logistics_cloud_1791375396392.jpg',
    imageAlt: 'High-scale enterprise cloud infrastructure and architecture by evonix technologies',
  },
];

export const PORTFOLIO_DATA: {
  websiteClients: PortfolioCategory[];
  softwareClients: PortfolioCategory[];
} = {
  websiteClients: [
    {
      id: 'apex-capital-dubai',
      title: 'Aura Capital Institutional Trading Portal',
      description: 'High-speed institutional financial analytics portal built for a private trading desk in Dubai International Financial Centre.',
      industry: 'FinTech & Capital Markets (Dubai)',
      tags: ['Next.js', 'High Speed', 'Dubai FinTech', 'TypeScript'],
      deliverables: ['Fast Tick Telemetry', 'Secure Client Dashboard', 'Sub-Second Loading'],
      imageUrl: '/src/assets/images/portfolio_fintech_platform_1791375370830.jpg',
      imageWebp: '/src/assets/images/portfolio_fintech_platform_1791375370830.jpg',
      imageAlt: 'Aura Capital financial portal designed for Dubai trading desk',
    },
    {
      id: 'al-mansoor-sports',
      title: 'Shahzad Sports Global B2B Export Catalog',
      description: 'Digital export showroom and bulk RFQ quotation system for a premier Sialkot soccer ball and sports glove exporter.',
      industry: 'Sports Goods Manufacturing (Sialkot)',
      tags: ['Export Web', 'B2B Catalog', 'RFQ Engine', 'Sialkot Exporter'],
      deliverables: ['Digital Product Catalog', 'RFQ WhatsApp Gateway', 'Mobile Optimized'],
      imageUrl: '/src/assets/images/portfolio_ai_copilot_suite_1791375382774.jpg',
      imageWebp: '/src/assets/images/portfolio_ai_copilot_suite_1791375382774.jpg',
      imageAlt: 'Shahzad Sports export catalog website for international buyers',
    },
    {
      id: 'horizon-cargo-logistics',
      title: 'Horizon Cargo Shipping & Customs Portal',
      description: 'Container tracking and export paperwork platform serving cross-border sea freight shipments between Karachi and Dubai.',
      industry: 'International Logistics & Freight',
      tags: ['Freight SaaS', 'Tracking', 'Customs Docs', 'Cargo Portal'],
      deliverables: ['Container Status Lookups', 'CBM Calculator', 'Automated Paperwork'],
      imageUrl: '/src/assets/images/portfolio_logistics_cloud_1791375396392.jpg',
      imageWebp: '/src/assets/images/portfolio_logistics_cloud_1791375396392.jpg',
      imageAlt: 'Horizon Cargo shipping logistics platform for export tracking',
    },
  ],
  softwareClients: [
    {
      id: 'gourmet-mart-pos',
      title: 'Al-Mansoor Gourmet Mart Multi-Branch POS',
      description: 'Point-of-sale system managing 12,000+ grocery items with instant barcode lookups across 4 retail supermarket branches in the UAE.',
      industry: 'Supermarket & Retail Chain (UAE)',
      tags: ['Retail POS', 'Offline Mode', 'Barcode Scanning', 'Stock Sync'],
      deliverables: ['Multi-Branch Realtime Sync', 'Cash Register Failsafe', 'Inventory Forecasting'],
      imageUrl: '/src/assets/images/portfolio_mobile_app_mesh_1791375407563.jpg',
      imageWebp: '/src/assets/images/portfolio_mobile_app_mesh_1791375407563.jpg',
      imageAlt: 'Multi branch POS system for retail supermarkets in UAE',
    },
    {
      id: 'sialkot-surgical-erp',
      title: 'Precision Surgical Lot & Batch Tracking ERP',
      description: 'Factory floor production software tracking stainless steel surgical instruments from forging to ultrasonic cleaning and packaging.',
      industry: 'Surgical Instrument Exporters (Sialkot)',
      tags: ['Factory ERP', 'Batch Tracking', 'Export Quality', 'Sialkot Surgical'],
      deliverables: ['Production Stage Logs', 'Inspection Sign-Off', 'Shipping Carton Labels'],
      imageUrl: '/src/assets/images/portfolio_pos_retail.jpg',
      imageWebp: '/src/assets/images/portfolio_pos_retail.jpg',
      imageAlt: 'Surgical instrument production tracking software in Sialkot',
    },
  ],
};

import { COMPREHENSIVE_STORE_PRODUCTS } from './storeProducts';

export const SHOP_PRODUCTS: ShopProduct[] = COMPREHENSIVE_STORE_PRODUCTS;

export const FAQ_ITEMS: FaqItem[] = [
  {
    id: 'faq-dubai-transition-1',
    category: 'dubai-transition',
    highlightBadge: 'Dubai Pedigree',
    question: 'How does your Dubai experience benefit clients in Sialkot?',
    answer:
      'We spent over 20 years engineering high-volume retail software and web portals in Dubai. We bring those same strict quality standards, clean code, and reliable hardware testing directly to Sialkot, without enterprise consulting agency markups.',
  },
  {
    id: 'faq-onsite-support-1',
    category: 'onsite-support',
    highlightBadge: 'Doorstep Visits',
    question: 'Do you visit factories and shops in Sialkot for on-site repairs?',
    answer:
      'Yes. Our technicians travel directly to your facility in Paris Road, Cantt, Daska Road, Sambrial, and surrounding industrial zones. We bring diagnostic tools and replacement parts to fix problems on the spot.',
  },
  {
    id: 'faq-pricing-1',
    category: 'pricing',
    highlightBadge: 'Transparent Pricing',
    question: 'How do you charge for IT services and hardware repair?',
    answer:
      'We provide straightforward quotes before touching any equipment. Simple diagnosis at our bench is free, and we only charge once you approve the fix. Software projects receive fixed-price milestone agreements.',
  },
  {
    id: 'faq-software-hardware-1',
    category: 'software-hardware',
    highlightBadge: 'POS Warranty',
    question: 'What warranty do you offer on POS systems and imported hardware?',
    answer:
      'All brand new POS terminals and thermal printers include a 1-year local replacement warranty. Our imported business laptops include a 3-month lab warranty and 10-day testing guarantee with full local support.',
  },
  {
    id: 'faq-software-hardware-2',
    category: 'software-hardware',
    highlightBadge: 'Offline Failsafe',
    question: 'Does your POS billing software continue working if the internet goes down?',
    answer:
      'Yes. Our point-of-sale systems run on an offline-first architecture. You can keep scanning barcodes, printing receipts, and taking cash. The system automatically syncs transactions to the cloud once internet reconnects.',
  },
  {
    id: 'faq-dubai-transition-2',
    category: 'dubai-transition',
    highlightBadge: 'Custom Builds',
    question: 'Can you build custom web software for export manufacturers?',
    answer:
      'Yes. We build custom B2B web catalogs, quotation request engines, and internal production tracking systems designed specifically for sports goods, surgical instruments, and leather exporters in Sialkot.',
  },
  {
    id: 'faq-free-calculators',
    category: 'pricing',
    highlightBadge: '100% Free Tools',
    question: 'Are all Evonix online calculators and eCommerce tools free to use?',
    answer:
      'Yes! Under our Special Launch Offer, all 20+ Evonix fee calculators, export tools, and shipping workstations are 100% free with unlimited calculations. There are no payment requirements, no credit card checks, and no license key locks needed.',
  },
];
