import { NavPageId } from '../components/Navbar';
import type { BlogPost } from '../data/blogs/types';

export interface PageMetadata {
  title: string;
  description: string;
  ogTitle: string;
  ogDescription: string;
  ogType: 'website' | 'article';
  ogImage?: string;
  canonicalUrl: string;
  keywords: string[];
  structuredData?: object;
}

const BASE_URL = 'https://www.evonixtec.com';
const STORE_BASE_URL = 'https://store.evonixtec.com';
const TOOLS_BASE_URL = 'https://tools.evonixtec.com';
const DEFAULT_OG_IMAGE = `${BASE_URL}/og-image.jpg`;
const OFFICIAL_SQUARE_LOGO = {
  '@type': 'ImageObject',
  url: `${BASE_URL}/logo-192x192.png`,
  width: 192,
  height: 192,
};

export const ORGANIZATION_SCHEMA = {
  '@type': ['Organization', 'ProfessionalService'],
  '@id': `${BASE_URL}/#organization`,
  name: 'Evonix Technologies',
  alternateName: 'evonix technologies',
  url: `${BASE_URL}/`,
  logo: OFFICIAL_SQUARE_LOGO,
  image: `${BASE_URL}/logo-192x192.png`,
  telephone: '+923263244002',
  email: 'info@evonixtec.com',
  sameAs: [
    'https://evonixtec.com',
    'https://www.linkedin.com/company/evonix-technologies',
    'https://www.facebook.com/profile.php?id=61595290703138',
    'https://www.instagram.com/evonixtechnologies',
  ],
};

export const SITE_NAVIGATION_SCHEMA = {
  '@type': 'SiteNavigationElement',
  '@id': `${BASE_URL}/#site-navigation`,
  name: [
    'Software Services',
    'POS Software Pricing',
    'Sialkot Export ERP',
    'Free Business Tools',
    'Retail & Tech Guides',
    'Client Portfolio',
  ],
  url: [
    `${BASE_URL}/services`,
    `${BASE_URL}/services/software-pos`,
    `${BASE_URL}/sialkot-export-erp`,
    `${BASE_URL}/tools`,
    `${BASE_URL}/guides`,
    `${BASE_URL}/portfolio`,
  ],
};

/**
 * Common LocalBusiness schema for Evonix Technologies in Sialkot
 */
export const LOCAL_BUSINESS_SCHEMA = {
  '@type': 'LocalBusiness',
  '@id': `${BASE_URL}/#business`,
  name: 'Evonix Technologies',
  alternateName: 'evonix technologies',
  logo: OFFICIAL_SQUARE_LOGO,
  image: `${BASE_URL}/logo-192x192.png`,
  url: `${BASE_URL}/`,
  telephone: '+92 326 324 4002',
  email: 'info@evonixtec.com',
  priceRange: 'PKR 50000 - PKR 1500000',
  currenciesAccepted: 'PKR, USD, AED, EUR',
  paymentAccepted: 'Bank Transfer, Wire, Credit Card, Raast',
  hasMap: 'https://maps.google.com/?q=Kotli+Behram+Sialkot+Pakistan',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Kotli Behram, Sialkot, Pakistan',
    addressLocality: 'Sialkot',
    addressRegion: 'Punjab',
    postalCode: '51310',
    addressCountry: 'PK',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 32.4945,
    longitude: 74.5229,
  },
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
      opens: '09:00',
      closes: '20:00',
    },
  ],
  areaServed: [
    { '@type': 'City', name: 'Sialkot' },
    { '@type': 'AdministrativeArea', name: 'Kotli Behram Sialkot' },
    { '@type': 'AdministrativeArea', name: 'Sialkot Cantt' },
    { '@type': 'AdministrativeArea', name: 'Paris Road Sialkot' },
    { '@type': 'AdministrativeArea', name: 'Daska Road Sialkot' },
    { '@type': 'AdministrativeArea', name: 'Sambrial' },
    { '@type': 'AdministrativeArea', name: 'Small Industrial Estate Sialkot' },
    { '@type': 'AdministrativeArea', name: 'Wazirabad' },
    { '@type': 'Country', name: 'Pakistan' },
    { '@type': 'Country', name: 'United Arab Emirates' },
  ],
  knowsAbout: [
    'Enterprise Software Engineering',
    'Custom Industrial ERP Systems',
    'Cloud Architecture & Microservices',
    'Autonomous AI Automation Pipelines',
    'High-Throughput Web Applications',
    'Export Manufacturing Supply Chain Software',
    'WeBOC Customs & Tax Integration',
  ],
  description:
    'Premier B2B enterprise software engineering agency and cloud consultancy in Sialkot, delivering high-performance custom web applications, industrial ERP systems, and private AI automation backed by 20+ years Dubai international experience.',
};

/**
 * Builds a valid Schema.org BreadcrumbList object (guarantees non-empty full URL on every ListItem)
 */
export function buildBreadcrumbSchema(items: { name: string; url: string }[]) {
  const safeItems =
    items && items.length > 0 ? items : [{ name: 'Home', url: `${BASE_URL}/` }];

  const normalizeItemUrl = (rawUrl: string | undefined): string => {
    const trimmed = (rawUrl || '').trim();
    if (!trimmed || trimmed === '/') {
      return `${BASE_URL}/`;
    }
    if (trimmed.startsWith('http://') || trimmed.startsWith('https://')) {
      return trimmed.endsWith('/') && trimmed !== `${BASE_URL}/` && trimmed !== `${TOOLS_BASE_URL}/` && trimmed !== `${STORE_BASE_URL}/`
        ? trimmed.slice(0, -1)
        : trimmed;
    }
    const clean = `${BASE_URL}${trimmed.startsWith('/') ? '' : '/'}${trimmed}`;
    return clean.endsWith('/') && clean !== `${BASE_URL}/` ? clean.slice(0, -1) : clean;
  };

  const normalizedItems = safeItems.map((item, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    name: (item.name || '').trim() || 'Page',
    item: normalizeItemUrl(item.url),
  }));

  const lastUrl = normalizedItems[normalizedItems.length - 1].item;
  return {
    '@type': 'BreadcrumbList',
    '@id': `${lastUrl}#breadcrumb`,
    itemListElement: normalizedItems,
  };
}

/**
 * Individual Schema.org Service objects for /services and Google Rich Results
 */
export const INDIVIDUAL_SERVICES_SCHEMAS = [
  {
    '@type': 'Service',
    '@id': `${BASE_URL}/services#web-development`,
    name: 'Website & B2B E-Commerce Development Sialkot',
    serviceType: 'Web Development & UI/UX Engineering',
    category: 'Software Development',
    description:
      'High-conversion B2B export websites, React + Vite single-page applications, and multi-currency e-commerce portals built with Dubai engineering standards for Sialkot surgical, leather, and sports manufacturers.',
    provider: { '@id': `${BASE_URL}/#business` },
    areaServed: { '@type': 'City', name: 'Sialkot' },
    termsOfService: `${BASE_URL}/terms-and-conditions`,
    offers: {
      '@type': 'Offer',
      price: '45000',
      priceCurrency: 'PKR',
      priceValidUntil: '2026-12-31',
      availability: 'https://schema.org/InStock',
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Web Engineering Capabilities',
      itemListElement: [
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Sialkot Exporter B2B Web Portal' } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'React & Vite SPA Performance Tuning' } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'SEO & Schema.org Rich Snippet Optimization' } },
      ],
    },
  },
  {
    '@type': 'Service',
    '@id': `${BASE_URL}/services#pos-erp-software`,
    name: 'Retail Point of Sale (POS) & ERP Software Sialkot',
    serviceType: 'POS Software Development & Deployment',
    category: 'Enterprise Software',
    description:
      'Offline-first retail POS software, multi-counter supermarket billing, and surgical/sports factory ERP systems with LAN synchronization and thermal receipt printer support in Sialkot.',
    provider: { '@id': `${BASE_URL}/#business` },
    areaServed: { '@type': 'City', name: 'Sialkot' },
    termsOfService: `${BASE_URL}/terms-and-conditions`,
    offers: {
      '@type': 'Offer',
      price: '35000',
      priceCurrency: 'PKR',
      priceValidUntil: '2026-12-31',
      availability: 'https://schema.org/InStock',
    },
  },
  {
    '@type': 'Service',
    '@id': `${BASE_URL}/services#enterprise-software`,
    name: 'Bespoke Enterprise Software & Microservices Architecture',
    serviceType: 'Enterprise Software Development & Systems Architecture',
    category: 'Enterprise Software',
    description:
      'High-throughput distributed systems, event-driven microservices, sub-second latency transactional databases, and resilient API gateways engineered to Dubai standards.',
    provider: { '@id': `${BASE_URL}/#business` },
    areaServed: [
      { '@type': 'AdministrativeArea', name: 'Paris Road Sialkot' },
      { '@type': 'AdministrativeArea', name: 'Sialkot Cantt' },
      { '@type': 'AdministrativeArea', name: 'Daska Road' },
    ],
    termsOfService: `${BASE_URL}/terms-and-conditions`,
    offers: {
      '@type': 'Offer',
      price: '150000',
      priceCurrency: 'PKR',
      priceValidUntil: '2026-12-31',
      availability: 'https://schema.org/InStock',
    },
  },
  {
    '@type': 'Service',
    '@id': `${BASE_URL}/services#ai-solutions`,
    name: 'Private AI Automation & Intelligent Agent Pipelines',
    serviceType: 'Artificial Intelligence & Machine Learning Engineering',
    category: 'AI Solutions',
    description:
      'Private enterprise LLM integration, intelligent document extraction, export invoice validation, and predictive manufacturing workflow automation.',
    provider: { '@id': `${BASE_URL}/#business` },
    areaServed: { '@type': 'City', name: 'Sialkot' },
    offers: {
      '@type': 'Offer',
      price: '120000',
      priceCurrency: 'PKR',
      priceValidUntil: '2026-12-31',
      availability: 'https://schema.org/InStock',
    },
  },
  {
    '@type': 'Service',
    '@id': `${BASE_URL}/services#factory-it-infrastructure`,
    name: 'Sialkot Export Factory IT Infrastructure & Customs WeBOC Security',
    serviceType: 'Enterprise Network & Cybersecurity Consulting',
    category: 'Industrial IT Infrastructure',
    description:
      'Immutable Synology NAS ransomware backups, isolated grounding for GEPCO generator surges, WeBOC customs filing network hardening, and factory-wide SD-WAN dual-fiber failover in Sialkot.',
    provider: { '@id': `${BASE_URL}/#business` },
    areaServed: [
      { '@type': 'AdministrativeArea', name: 'Daska Road Sialkot' },
      { '@type': 'AdministrativeArea', name: 'Sambrial Dry Port' },
      { '@type': 'AdministrativeArea', name: 'Small Industrial Estate' },
    ],
    offers: {
      '@type': 'Offer',
      price: '65000',
      priceCurrency: 'PKR',
      priceValidUntil: '2026-12-31',
      availability: 'https://schema.org/InStock',
    },
  },
  {
    '@type': 'Service',
    '@id': `${BASE_URL}/services#it-consultancy`,
    name: 'Industrial IT Consultancy & Enterprise Systems Architecture Sialkot',
    serviceType: 'IT Consultancy & Strategic Infrastructure Planning',
    category: 'IT Consulting',
    description:
      'Executive IT consultancy for Sialkot export manufacturing factories (surgical, sports goods, leather). Strategic enterprise architecture, WeBOC customs network hardening, high-availability SD-WAN dual-fiber failover, and digital automation built to Dubai standards.',
    provider: { '@id': `${BASE_URL}/#business` },
    areaServed: [
      { '@type': 'City', name: 'Sialkot' },
      { '@type': 'AdministrativeArea', name: 'Daska Road' },
      { '@type': 'AdministrativeArea', name: 'Small Industrial Estate' },
      { '@type': 'AdministrativeArea', name: 'Sambrial' },
    ],
    termsOfService: `${BASE_URL}/terms-and-conditions`,
    offers: {
      '@type': 'Offer',
      price: '50000',
      priceCurrency: 'PKR',
      priceValidUntil: '2026-12-31',
      availability: 'https://schema.org/InStock',
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'IT Consultancy Solutions',
      itemListElement: [
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Sialkot Export Factory IT Infrastructure Audit' } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Disaster Recovery & Immutable NAS Backup Planning' } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'FBR POS & ERP Integration Consultancy' } },
      ],
    },
  },
  {
    '@type': 'Service',
    '@id': `${BASE_URL}/services#hardware-maintenance`,
    name: 'Industrial Hardware Maintenance Services & Factory AMC Sialkot',
    serviceType: 'Hardware Maintenance & Industrial Preventative Servicing',
    category: 'Hardware Maintenance Services',
    description:
      'Preventative hardware maintenance services and Annual Maintenance Contracts (AMC) for Sialkot industrial sectors. Multi-user workstations, accounts servers, 80mm POS thermal printers, barcode scanners, and chip-level PCB diagnostics with rapid 60-minute doorstep field dispatch.',
    provider: { '@id': `${BASE_URL}/#business` },
    areaServed: [
      { '@type': 'City', name: 'Sialkot' },
      { '@type': 'AdministrativeArea', name: 'Paris Road Sialkot' },
      { '@type': 'AdministrativeArea', name: 'Sialkot Cantt' },
      { '@type': 'AdministrativeArea', name: 'Small Industrial Estate' },
    ],
    termsOfService: `${BASE_URL}/warranty-policy`,
    offers: {
      '@type': 'Offer',
      price: '15000',
      priceCurrency: 'PKR',
      priceValidUntil: '2026-12-31',
      availability: 'https://schema.org/InStock',
    },
  },
];

/**
 * Question and Answer Schema for Google Search Console FAQ Rich Results
 */
export const FAQ_PAGE_SCHEMA = {
  '@type': 'FAQPage',
  '@id': `${BASE_URL}/#faq`,
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What IT consultancy and hardware maintenance services does evonix provide in Sialkot?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'evonix provides enterprise web engineering, custom retail POS software, factory IT infrastructure AMC contracts, WeBOC customs networking, and chip-level motherboard, laptop, and thermal printer repair backed by 20+ years of Dubai international experience.',
      },
    },
    {
      '@type': 'Question',
      name: 'Where is evonix located in Sialkot, and do you offer doorstep on-site visits?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Our diagnostic lab desk is located at Kotli Behram, Paris Road and Cantt Hub, Sialkot. We offer 15-minute to 60-minute doorstep dispatch across Sialkot City, Daska Road, Small Industrial Estate, Sambrial Dry Port, and Wazirabad.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can evonix repair laptop motherboards and thermal receipt printers at the chip level?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes, our certified hardware laboratory features stereo microscopes, DC bench power supplies, thermal infrared cameras, and precision SMD micro-soldering stations for component-level repair of blown MOSFETs, shorted capacitors, charging ICs, thermal printheads, and auto-cutters.',
      },
    },
    {
      '@type': 'Question',
      name: 'Does evonix develop custom export ERP and retail POS software?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes, evonix engineers custom offline-first POS systems, multilingual export trade portals, barcode inventory engines, and automated billing software tailored for Sialkot surgical, sportswear, leather, and retail businesses.',
      },
    },
    {
      '@type': 'Question',
      name: 'How can I request a free quote or book a technical consultation with evonix?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'You can request a free consultation directly through our website with GPS area detection, generate a tracking reference number, or message our engineering desk via WhatsApp at +92 326 324 4002.',
      },
    },
  ],
};

/**
 * FAQPage JSON-LD for Evonix Hisaab Pro Offline Retail & Business POS (/services/software-pos & /services)
 */
export const HISAAB_PRO_FAQ_SCHEMA = {
  '@type': 'FAQPage',
  '@id': `${BASE_URL}/services/software-pos#faq`,
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Does Evonix Hisaab Pro work as offline POS software without internet?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Evonix Hisaab Pro is native Windows offline POS software without internet dependency. Barcode scanning, multi-unit billing, stock updates, and Digital Khata ledgers execute locally on your PC or counter LAN without freezing during Wi-Fi outages.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can I use it as Kiryana store ka software with loose weights, dozens, and cartons?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. As dedicated Kiryana store ka software, you can purchase stock in cartons or sacks and sell in loose weight, pieces, or dozens with automatic unit conversion, customer udhaar limits, and bulk Excel product import.',
      },
    },
    {
      '@type': 'Question',
      name: 'How do Digital khata WhatsApp reminders work from a Windows PC?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Every udhaar invoice updates the customer account automatically. Whenever you check your overdue receivables (7, 15, or 30+ days), Digital khata WhatsApp reminders let you send itemized balance messages and receipts via WhatsApp Desktop or Web in one click.',
      },
    },
    {
      '@type': 'Question',
      name: 'How does Evonix Hisaab Pro help on how to run a retail shop in Pakistan with less leakage?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Shop owners learning how to run a retail shop in Pakistan profitably need two things: PIN-locked staff controls and real net profit tracking. Cashiers cannot approve refunds or extra discounts without a Manager PIN, daily Galla counts verify cash at closing, and COGS + expenses reveal true daily profit.',
      },
    },
    {
      '@type': 'Question',
      name: 'What happens to my data if my Windows PC has an issue or power outage?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Your sales, inventory, and Khata database stay saved safely on your machine with silent automated daily backups to a secondary local drive or USB flash drive—allowing full restoration within minutes.',
      },
    },
    {
      '@type': 'Question',
      name: 'Does it support FBR Tier-1 POS, Excel migration, and 58mm/80mm thermal hardware?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Our onboarding team performs zero-loss data migration from Excel sheets or paper registers, configures FBR Tier-1 POS digital invoicing if required, and connects all standard 58mm/80mm thermal printers, barcode scanners, and automatic cash drawers.',
      },
    },
  ],
};

/**
 * Shared Google Search Console compliant Merchant & Shipping Schema objects
 */
export const DEFAULT_MERCHANT_RETURN_POLICY = {
  '@type': 'MerchantReturnPolicy',
  applicableCountry: 'PK',
  returnPolicyCategory: 'https://schema.org/MerchantReturnFiniteReturnWindow',
  merchantReturnDays: 10,
  returnMethod: 'https://schema.org/ReturnInStore',
  returnFees: 'https://schema.org/FreeReturn',
};

export const DEFAULT_SHIPPING_DETAILS = {
  '@type': 'OfferShippingDetails',
  shippingRate: {
    '@type': 'MonetaryAmount',
    value: 0,
    currency: 'PKR',
  },
  shippingDestination: {
    '@type': 'DefinedRegion',
    addressCountry: 'PK',
  },
  deliveryTime: {
    '@type': 'ShippingDeliveryTime',
    handlingTime: {
      '@type': 'QuantitativeValue',
      minValue: 0,
      maxValue: 1,
      unitCode: 'DAY',
    },
    transitTime: {
      '@type': 'QuantitativeValue',
      minValue: 1,
      maxValue: 3,
      unitCode: 'DAY',
    },
  },
};

export const DEFAULT_PRODUCT_AGGREGATE_RATING = {
  '@type': 'AggregateRating',
  ratingValue: '4.9',
  reviewCount: '148',
  bestRating: '5',
  worstRating: '1',
};

export const DEFAULT_PRODUCT_REVIEW = [
  {
    '@type': 'Review',
    author: {
      '@type': 'Person',
      name: 'Tariq Mahmood',
    },
    datePublished: '2025-10-15',
    reviewBody: 'Genuine commercial quality hardware with fast on-site delivery in Sialkot. Tested before payment.',
    reviewRating: {
      '@type': 'Rating',
      ratingValue: '5',
      bestRating: '5',
    },
  },
];

/**
 * Individual Schema.org Product objects for /shop and Google Merchant / Product snippets
 */
export const INDIVIDUAL_PRODUCTS_SCHEMAS = [
  {
    '@type': 'Product',
    '@id': `${BASE_URL}/shop#pos-dual-screen-15`,
    name: 'evonix All-in-One Dual-Screen Capacitive Touch POS Terminal (15.6" + 11.6")',
    image: DEFAULT_OG_IMAGE,
    description:
      'Heavy-duty industrial capacitive touch POS terminal for Sialkot supermarkets, pharmacies, and restaurants. Intel Core i5 processor, 8GB DDR4 RAM, 128GB High-Speed SSD with customer-facing display.',
    sku: 'EVO-POS-DS15',
    mpn: 'POS-DS-156-I5',
    gtin13: '8907452290001',
    gtin: '8907452290001',
    brand: {
      '@type': 'Brand',
      name: 'evonix',
    },
    aggregateRating: DEFAULT_PRODUCT_AGGREGATE_RATING,
    review: DEFAULT_PRODUCT_REVIEW,
    offers: {
      '@type': 'Offer',
      url: `${BASE_URL}/shop`,
      price: '68500',
      priceCurrency: 'PKR',
      validFrom: '2025-01-01',
      priceValidUntil: '2027-12-31',
      itemCondition: 'https://schema.org/NewCondition',
      availability: 'https://schema.org/InStock',
      seller: { '@id': `${BASE_URL}/#business` },
      hasMerchantReturnPolicy: DEFAULT_MERCHANT_RETURN_POLICY,
      shippingDetails: DEFAULT_SHIPPING_DETAILS,
      warranty: '1 Year Sialkot On-Site Warranty',
    },
  },
  {
    '@type': 'Product',
    '@id': `${BASE_URL}/shop#thermal-printer-80mm`,
    name: 'evonix Commercial 80mm High-Speed Thermal Receipt Printer with Auto-Cutter',
    image: DEFAULT_OG_IMAGE,
    description:
      'High-speed 260mm/s commercial 80mm thermal receipt printer with Japanese auto-cutter mechanism. USB + LAN + Cash Drawer interface, fully compatible with all retail POS software in Sialkot.',
    sku: 'EVO-PRN-80C',
    mpn: 'PRN-80-CUT-LAN',
    gtin13: '8907452290002',
    gtin: '8907452290002',
    brand: {
      '@type': 'Brand',
      name: 'evonix',
    },
    aggregateRating: DEFAULT_PRODUCT_AGGREGATE_RATING,
    review: DEFAULT_PRODUCT_REVIEW,
    offers: {
      '@type': 'Offer',
      url: `${BASE_URL}/shop`,
      price: '16500',
      priceCurrency: 'PKR',
      validFrom: '2025-01-01',
      priceValidUntil: '2027-12-31',
      itemCondition: 'https://schema.org/NewCondition',
      availability: 'https://schema.org/InStock',
      seller: { '@id': `${BASE_URL}/#business` },
      hasMerchantReturnPolicy: DEFAULT_MERCHANT_RETURN_POLICY,
      shippingDetails: DEFAULT_SHIPPING_DETAILS,
    },
  },
  {
    '@type': 'Product',
    '@id': `${BASE_URL}/shop#barcode-scanner-2d`,
    name: 'evonix Omnidirectional 2D & 1D Desktop Hands-Free Barcode Scanner',
    image: DEFAULT_OG_IMAGE,
    description:
      'High-precision optical CMOS desktop barcode scanner. Instant recognition of crumpled, damaged, or phone-screen QR codes and 1D retail barcodes. Plug-and-play USB for Sialkot shops.',
    sku: 'EVO-SCN-2D',
    mpn: 'SCN-OMNI-2D-USB',
    gtin13: '8907452290003',
    gtin: '8907452290003',
    brand: {
      '@type': 'Brand',
      name: 'evonix',
    },
    aggregateRating: DEFAULT_PRODUCT_AGGREGATE_RATING,
    review: DEFAULT_PRODUCT_REVIEW,
    offers: {
      '@type': 'Offer',
      url: `${BASE_URL}/shop`,
      price: '12800',
      priceCurrency: 'PKR',
      validFrom: '2025-01-01',
      priceValidUntil: '2027-12-31',
      itemCondition: 'https://schema.org/NewCondition',
      availability: 'https://schema.org/InStock',
      seller: { '@id': `${BASE_URL}/#business` },
      hasMerchantReturnPolicy: DEFAULT_MERCHANT_RETURN_POLICY,
      shippingDetails: DEFAULT_SHIPPING_DETAILS,
    },
  },
  {
    '@type': 'Product',
    '@id': `${BASE_URL}/shop#business-laptop-core-i7`,
    name: 'Dell Latitude / HP EliteBook Core i7 Business Workstation Laptop (Grade A+)',
    image: DEFAULT_OG_IMAGE,
    description:
      'Imported commercial-grade business laptop with Intel Core i7 10th/11th Gen, 16GB DDR4 RAM, 512GB NVMe SSD, Full HD IPS anti-glare display. Fully tested with hardware warranty in Sialkot.',
    sku: 'EVO-LAP-I7B',
    mpn: 'LAP-I7-16-512-FHD',
    gtin13: '8907452290004',
    gtin: '8907452290004',
    brand: {
      '@type': 'Brand',
      name: 'Dell / HP',
    },
    aggregateRating: DEFAULT_PRODUCT_AGGREGATE_RATING,
    review: DEFAULT_PRODUCT_REVIEW,
    offers: {
      '@type': 'Offer',
      url: `${BASE_URL}/shop`,
      price: '78000',
      priceCurrency: 'PKR',
      validFrom: '2025-01-01',
      priceValidUntil: '2027-12-31',
      itemCondition: 'https://schema.org/RefurbishedCondition',
      availability: 'https://schema.org/InStock',
      seller: { '@id': `${BASE_URL}/#business` },
      hasMerchantReturnPolicy: DEFAULT_MERCHANT_RETURN_POLICY,
      shippingDetails: DEFAULT_SHIPPING_DETAILS,
    },
  },
];

/**
 * Route-Specific SEO Metadata & Initial Schema Definitions
 */
export const SIALKOT_PAGE_SEO: Record<NavPageId, PageMetadata> = {
  home: {
    title: 'Evonix Technologies | Software & POS',
    description:
      'Evonix Technologies builds custom software, offline retail POS systems, and Sialkot export ERPs backed by 20+ years of UAE engineering standards.',
    ogTitle: 'Evonix Technologies | Software & POS',
    ogDescription:
      'Custom software engineering, offline retail POS systems, and Sialkot export ERPs backed by 20+ years of UAE technology leadership.',
    ogType: 'website',
    ogImage: DEFAULT_OG_IMAGE,
    canonicalUrl: `${BASE_URL}/`,
    keywords: [
      'enterprise software Sialkot',
      'B2B software engineering',
      'custom ERP software Sialkot',
      'AI solutions Sialkot',
      'cloud architecture Sialkot',
      'software house in Sialkot',
      'export manufacturing ERP',
      'Dubai software expertise',
      'Evonix Technologies',
    ],
  },

  services: {
    title: 'Software Development Services | Evonix',
    description:
      'Custom web engineering, offline-first Windows POS software, industrial export ERPs, and cloud architecture built by Evonix Technologies in Sialkot.',
    ogTitle: 'Software Development Services | Evonix',
    ogDescription:
      'Full-suite custom software development, manufacturing ERPs, WeBOC customs integration, and offline POS solutions.',
    ogType: 'website',
    ogImage: DEFAULT_OG_IMAGE,
    canonicalUrl: `${BASE_URL}/services`,
    keywords: [
      'software development services',
      'custom software development Sialkot',
      'export ERP software Sialkot',
      'B2B web development',
      'cloud architecture',
      'software consultancy Sialkot',
      'Sialkot manufacturing ERP',
    ],
  },

  portfolio: {
    title: 'Client Portfolio & Case Studies | Evonix',
    description:
      'Proven web development, industrial ERP, and multi-branch POS deployments delivered for exporters and retail brands across UAE and Pakistan.',
    ogTitle: 'Client Portfolio & Case Studies | Evonix',
    ogDescription:
      'High-volume e-commerce systems, custom export ERP portals, and retail POS deployments delivered for UAE and Sialkot clients.',
    ogType: 'website',
    ogImage: DEFAULT_OG_IMAGE,
    canonicalUrl: `${BASE_URL}/portfolio`,
    keywords: [
      'IT portfolio Sialkot',
      'software projects Sialkot',
      'Sialkot export software case studies',
      'web development portfolio Sialkot',
      'sports goods ERP software Sialkot',
      'surgical instruments ERP Sialkot',
      'enterprise retail POS portfolio',
    ],
  },

  shop: {
    title: 'POS Hardware & Laptops | Evonix Store',
    description:
      'Buy commercial business laptops, touch POS terminals, 80mm thermal receipt printers, and barcode scanners with local warranty on store.evonixtec.com.',
    ogTitle: 'POS Hardware & Laptops | Evonix Store',
    ogDescription:
      'Imported commercial laptops, touch POS machines, thermal receipt printers, and barcode scanners on store.evonixtec.com.',
    ogType: 'website',
    ogImage: DEFAULT_OG_IMAGE,
    canonicalUrl: `${STORE_BASE_URL}/shop`,
    keywords: [
      'buy laptop in Sialkot',
      'business laptop Sialkot',
      'POS machine price in Sialkot',
      'thermal receipt printer Sialkot',
      'barcode scanner Sialkot',
      'touch screen POS terminal Sialkot',
    ],
  },

  about: {
    title: 'About Evonix Technologies | Dubai Heritage',
    description:
      'Evonix Technologies brings 20+ years of UAE IT consultancy, custom software engineering, and hardware lab testing to Sialkot businesses.',
    ogTitle: 'About Evonix Technologies | Dubai Heritage',
    ogDescription:
      'Two decades of UAE enterprise IT engineering now operating in Sialkot. Meet our leadership and diagnostic engineering desk.',
    ogType: 'website',
    ogImage: DEFAULT_OG_IMAGE,
    canonicalUrl: `${BASE_URL}/about`,
    keywords: [
      'about Evonix Technologies',
      'IT consultancy Sialkot',
      'industrial hardware maintenance Sialkot',
      'IT company in Sialkot profile',
      'Dubai IT experience in Pakistan',
      'IT leadership Sialkot',
    ],
  },

  guides: {
    title: 'Retail & Technical Guides | Evonix',
    description:
      'Practical technical guides by Evonix engineers covering offline POS management, Sialkot factory ERPs, thermal printers, and retail workflows.',
    ogTitle: 'Retail & Technical Guides | Evonix',
    ogDescription:
      'Official engineering tutorials, retail POS tips, and Sialkot industrial software guides written by Evonix specialists.',
    ogType: 'website',
    ogImage: DEFAULT_OG_IMAGE,
    canonicalUrl: `${BASE_URL}/guides`,
    keywords: [
      'IT blogs Sialkot',
      'tech blog Sialkot',
      'POS software guide Pakistan',
      'thermal printer troubleshooting Sialkot',
      'IT troubleshooting guides Sialkot',
      'web development guide Sialkot',
    ],
  },

  contact: {
    title: 'Contact Evonix | Sialkot IT Consultants',
    description:
      'Got a question? Call us at +92 326 324 4002. We reply in 2 hours with doorstep IT support across Kotli Behram, Paris Road, and Sialkot Cantt.',
    ogTitle: 'Contact Evonix | Sialkot IT Consultants',
    ogDescription:
      'Got a question? Call us. We reply in 2 hours. Rapid doorstep dispatch across Kotli Behram, Cantt, Sambrial, and Daska Road.',
    ogType: 'website',
    ogImage: DEFAULT_OG_IMAGE,
    canonicalUrl: `${BASE_URL}/contact`,
    keywords: [
      'contact IT consultant Sialkot',
      'computer repair Kotli Behram Sialkot',
      'doorstep IT technician Kotli Behram Sialkot',
      'industrial IT support Sialkot',
      'contact IT company Sialkot',
    ],
  },

  locations: {
    title: 'Local IT Hubs: Daska & Sambrial | Evonix',
    description:
      'Doorstep industrial IT consultancy, retail POS systems, and hardware servicing across Daska, Sambrial Dry Port, and Wazirabad within 45 minutes.',
    ogTitle: 'Local IT Hubs: Daska & Sambrial | Evonix',
    ogDescription:
      'Priority industrial IT engineering, WeBOC server maintenance, and retail POS support across Daska, Sambrial, and Wazirabad.',
    ogType: 'website',
    ogImage: DEFAULT_OG_IMAGE,
    canonicalUrl: `${BASE_URL}/locations`,
    keywords: [
      'IT company Daska',
      'hardware maintenance Sambrial',
      'IT support Sambrial Dry Port',
      'computer repair Wazirabad',
      'POS software Daska',
      'retail billing software Wazirabad',
    ],
  },

  invoice: {
    title: 'Free Global Invoice Generator | Evonix',
    description:
      'Create multi-currency commercial invoices in your browser with automatic tax math, Code128 barcodes, and instant A4 PDF export with zero signup.',
    ogTitle: 'Free Global Invoice Generator | Evonix',
    ogDescription:
      'Create commercial invoices locally in your browser with 150+ currencies, tax rules, and instant A4 PDF downloads.',
    ogType: 'website',
    ogImage: `${BASE_URL}/images/micro-invoice-generator-2026.png`,
    canonicalUrl: `${BASE_URL}/tools/invoice-generator`,
    keywords: [
      'invoice generator',
      'free invoice generator',
      'online invoice generator',
      'micro invoice',
      'multi-currency invoice',
    ],
  },

  'ecommerce-calculator': {
    title: 'E-Commerce Margin Calculator | Evonix',
    description:
      'Simulate Leopards, TCS, Trax, and PostEx COD fees, ad CAC, and RTO return losses in Pakistan with instant unit-profit calculations.',
    ogTitle: 'E-Commerce Margin Calculator | Evonix',
    ogDescription:
      'Calculate Pakistani COD courier tariffs, return rate cushions, and unit profit margins with zero database tracking.',
    ogType: 'website',
    ogImage: `${BASE_URL}/images/ecommerce-calculator-2026.png`,
    canonicalUrl: `${BASE_URL}/tools/ecommerce-margin-calculator`,
    keywords: [
      'ecommerce profit calculator pakistan',
      'courier shipping margin calculator',
      'leopards courier rates calculator',
      'tcs cod tariff calculator',
      'rto return rate loss calculator',
    ],
  },

  'cbm-calculator': {
    title: 'Export CBM Freight Calculator | Evonix',
    description:
      'Compute carton Cubic Meters (CBM), DHL/FedEx air cargo volumetric weight, and 20ft/40ft container loading plans instantly.',
    ogTitle: 'Export CBM Freight Calculator | Evonix',
    ogDescription:
      'Compute export carton CBM, air cargo volumetric weight, and ocean container loading capacity offline.',
    ogType: 'website',
    ogImage: `${BASE_URL}/images/cbm-calculator-2026.png`,
    canonicalUrl: `${BASE_URL}/tools/export-cbm-calculator`,
    keywords: [
      'cbm calculator',
      'export cbm calculator',
      'cubic meter calculator shipping',
      'air freight volumetric weight calculator',
    ],
  },

  'developer-cost-calculator': {
    title: 'Developer Cost Calculator | Evonix',
    description:
      'Compare US vs dedicated Pakistan software engineer rates and calculate annual engineering savings with instant role cost breakdowns.',
    ogTitle: 'Developer Cost Calculator | Evonix',
    ogDescription:
      'Calculate cost to hire dedicated software developers via Evonix Technologies and compare offshore team savings.',
    ogType: 'website',
    ogImage: `${BASE_URL}/images/developer-cost-calculator-2026.png`,
    canonicalUrl: `${BASE_URL}/tools/developer-cost-calculator`,
    keywords: [
      'hire dedicated developer cost calculator',
      'offshore developer hourly rate',
      'evonix technologies developer rates',
    ],
  },

  'ai-visibility-checker': {
    title: 'AI Visibility & E-E-A-T Checker | Evonix',
    description:
      'Audit your domain Google E-E-A-T signals and Generative Engine Optimization readiness for ChatGPT, Claude, and AI Overviews.',
    ogTitle: 'AI Visibility & E-E-A-T Checker | Evonix',
    ogDescription:
      'Free client-side E-E-A-T and AI search readiness checker for domain structured data and entity visibility.',
    ogType: 'website',
    ogImage: `${BASE_URL}/images/ai-visibility-checker-2026.png`,
    canonicalUrl: `${BASE_URL}/tools/ai-visibility-checker`,
    keywords: [
      'ai visibility checker',
      'website eeat checker',
      'generative engine optimization tool',
    ],
  },

  tools: {
    title: 'Free Business Tools & Calculators | Evonix',
    description:
      'Access 26+ free browser calculators for e-commerce margins, marketplace fees, export CBM freight, HS duties, and commercial invoicing.',
    ogTitle: 'Free Business Tools & Calculators | Evonix',
    ogDescription:
      'Zero-database browser calculators for international exporters, e-commerce sellers, freelancers, and retail shops.',
    ogType: 'website',
    ogImage: DEFAULT_OG_IMAGE,
    canonicalUrl: `${BASE_URL}/tools`,
    keywords: [
      'free business tools',
      'online tools portfolio',
      'free business calculators',
      'zero database tools',
      'sialkot export utilities',
    ],
  },

  'export-barcode-studio': {
    title: 'Export Barcode Label Studio | Evonix',
    description:
      'Print 4x6 direct thermal shipping carton labels, GS1-128 barcodes, and Code 128 export tags for surgical, sports, and leather boxes.',
    ogTitle: 'Export Barcode Label Studio | Evonix',
    ogDescription:
      'Compliant outer carton thermal barcode generator for exporters with GS1-128 and Code 128 rendering.',
    ogType: 'website',
    ogImage: `${BASE_URL}/images/export-barcode-studio-2026.png`,
    canonicalUrl: `${BASE_URL}/tools/barcode-label-studio`,
    keywords: [
      'export barcode label studio',
      'gs1 128 carton barcode generator',
      'shipping label maker 4x6',
    ],
  },

  'live-repair-tracker': {
    title: 'Live RMA Repair Tracker | Evonix',
    description:
      'Check live bench repair ticket progress, motherboard voltage diagnostics, and 90-day warranty records at the Evonix Sialkot service lab.',
    ogTitle: 'Live RMA Repair Tracker | Evonix',
    ogDescription:
      'Live RMA tracking for motherboard, laptop, and thermal printer repairs at Evonix Sialkot.',
    ogType: 'website',
    ogImage: `${BASE_URL}/images/live-repair-tracker-2026.png`,
    canonicalUrl: `${BASE_URL}/tools/live-repair-tracker`,
    keywords: [
      'live repair tracker',
      'rma status tracking sialkot',
      'laptop repair tracking online',
    ],
  },

  'printer-diagnostics': {
    title: 'Thermal Printer Diagnostics | Evonix',
    description:
      'Step-by-step interactive troubleshooter for 80mm ESC/POS thermal receipt printers, blurred barcodes, cutter jams, and USB driver faults.',
    ogTitle: 'Thermal Printer Diagnostics | Evonix',
    ogDescription:
      'Diagnose and fix thermal receipt printer paper jams, cutter lockups, and ESC/POS errors interactively.',
    ogType: 'website',
    ogImage: `${BASE_URL}/images/printer-diagnostics-2026.png`,
    canonicalUrl: `${BASE_URL}/tools/printer-diagnostics`,
    keywords: [
      'thermal printer diagnostic tool',
      'esc pos printer troubleshooter',
      'receipt printer repair sialkot',
    ],
  },

  'factory-network-tester': {
    title: 'Factory Network Latency Test | Evonix',
    description:
      'Measure factory LAN latency, SQL ERP sync response times, and WeBOC customs gateway ping stability in real time.',
    ogTitle: 'Factory Network Latency Test | Evonix',
    ogDescription:
      'Real-time latency, jitter, and packet loss diagnostics for factory ERPs and customs gateways.',
    ogType: 'website',
    ogImage: `${BASE_URL}/images/factory-network-tester-2026.png`,
    canonicalUrl: `${BASE_URL}/tools/factory-network-tester`,
    keywords: [
      'factory network latency test',
      'weboc customs ping stability',
      'erp database latency benchmark',
    ],
  },

  'ai-travel-tools': {
    title: '10 Best AI Travel Tools [2026] | Evonix',
    description:
      'Compare the 10 best AI travel planning tools in 2026 for flight fare alerts, automated hotel routing, and free day-by-day trip schedules.',
    ogTitle: '10 Best AI Travel Tools [2026] | Evonix',
    ogDescription:
      'Top 10 AI travel planning platforms for flights, hotels, and custom vacation schedules in 2026.',
    ogType: 'article',
    ogImage: DEFAULT_OG_IMAGE,
    canonicalUrl: `${BASE_URL}/ai-tools-name-for-travel-itinerary`,
    keywords: [
      'ai tools for travel itinerary',
      'best ai tools for travel planning',
      'ai travel tools',
    ],
  },

  'ai-trip-planner': {
    title: 'AI Trip Planner & Itinerary | Evonix',
    description:
      'Generate custom day-by-day vacation itineraries with daily budget estimates, local food stops, and transit tips in seconds.',
    ogTitle: 'AI Trip Planner & Itinerary | Evonix',
    ogDescription:
      'Free AI travel itinerary builder with day-wise schedules, budget tiers, and local transit suggestions.',
    ogType: 'website',
    ogImage: `${BASE_URL}/images/ai-trip-planner-2026.png`,
    canonicalUrl: `${BASE_URL}/tools/ai-trip-planner`,
    keywords: [
      'ai trip planner',
      'free itinerary generator',
      'travel itinerary ai',
    ],
  },

  admin: {
    title: 'Admin Security Hub | Evonix',
    description: 'Protected management console for Evonix Technologies operations in Kotli Behram, Sialkot.',
    canonicalUrl: `${BASE_URL}/admin`,
    ogTitle: 'Admin Security Hub | Evonix',
    ogDescription: 'Protected management console.',
    ogType: 'website',
    ogImage: `${BASE_URL}/og-image.jpg`,
    keywords: ['admin security', 'internal portal'],
  },

  'doorstep-support': {
    title: 'Doorstep IT Support Sialkot | Evonix',
    description:
      '45-minute on-site IT engineer dispatch across Sialkot, Sambrial, Daska, and Wazirabad for POS counters, servers, and LAN networks.',
    canonicalUrl: `${STORE_BASE_URL}/services/doorstep-support`,
    ogTitle: 'Doorstep IT Support Sialkot | Evonix',
    ogDescription:
      'On-site IT and POS support across Sialkot with 45-minute field technician arrival.',
    ogType: 'website',
    ogImage: DEFAULT_OG_IMAGE,
    keywords: [
      'doorstep IT support Sialkot',
      'on-site computer repair Sialkot',
      'POS emergency support Sialkot',
    ],
  },

  'sialkot-export-erp': {
    title: 'Sialkot Export ERP Software | Evonix',
    description:
      'Custom manufacturing ERP for Sialkot surgical, leather, and sportswear exporters featuring job-card tracking, packing lists, and WeBOC billing.',
    canonicalUrl: `${BASE_URL}/sialkot-export-erp`,
    ogTitle: 'Sialkot Export ERP Software | Evonix',
    ogDescription:
      'Industrial export ERP built for Sialkot factories to manage raw materials, job cards, packing lists, and WeBOC compliance.',
    ogType: 'website',
    ogImage: DEFAULT_OG_IMAGE,
    keywords: [
      'sialkot export erp',
      'surgical manufacturing erp sialkot',
      'leather factory erp sialkot',
      'weboc billing software',
    ],
  },

  guidelines: {
    title: 'IT & Hardware Guidelines | Evonix',
    description:
      'Engineering standards for factory server backups, GEPCO power surge protection, and component-level hardware diagnostics.',
    canonicalUrl: `${BASE_URL}/guidelines`,
    ogTitle: 'IT & Hardware Guidelines | Evonix',
    ogDescription:
      'Technical guidelines for industrial networks, server backups, and safe hardware maintenance.',
    ogType: 'article',
    ogImage: DEFAULT_OG_IMAGE,
    keywords: [
      'it guidelines sialkot',
      'hardware repair guidelines',
      'factory network best practices',
    ],
  },

  'ebay-fee-calculator': {
    title: 'eBay Fee & Profit Calculator | Evonix',
    description:
      'Calculate eBay Final Value Fees, promoted ad rates, shipping costs, and real-time FX profits across 10 international eBay marketplaces.',
    canonicalUrl: `${BASE_URL}/tools/ebay-fee-calculator`,
    ogTitle: 'eBay Fee & Profit Calculator | Evonix',
    ogDescription:
      'Calculate eBay seller fees, promoted listings, and net profits accurately across 10 global marketplaces.',
    ogType: 'website',
    ogImage: `${BASE_URL}/images/ebay-fee-calculator-2026.png`,
    keywords: [
      'ebay fee calculator',
      'ebay profit calculator',
      'ebay final value fee calculator',
    ],
  },

  'uk-eu-vat-calculator': {
    title: 'UK & EU VAT Reverse Charge | Evonix',
    description:
      'Verify HMRC Section 55A and EU Directive 2006/112/EC zero-rated B2B reverse charge VAT rules and generate compliant invoice clauses.',
    canonicalUrl: `${BASE_URL}/tools/uk-eu-vat-calculator`,
    ogTitle: 'UK & EU VAT Reverse Charge | Evonix',
    ogDescription:
      'HMRC Section 55A and EU B2B reverse charge VAT calculator with ready-to-use invoice compliance notes.',
    ogType: 'website',
    ogImage: `${BASE_URL}/images/uk-eu-vat-calculator-2026.png`,
    keywords: [
      'uk eu vat calculator',
      'vat reverse charge calculator',
      'hmrc section 55a invoice clause',
    ],
  },

  'us-duty-nexus-estimator': {
    title: 'US Customs Duty & Section 321 | Evonix',
    description:
      'Check US CBP import tariff rates, verify Section 321 $800 de minimis eligibility, and estimate US landed shipping costs.',
    canonicalUrl: `${BASE_URL}/tools/us-duty-nexus-estimator`,
    ogTitle: 'US Customs Duty & Section 321 | Evonix',
    ogDescription:
      'Estimate US customs tariffs, verify Section 321 $800 duty-free clearance, and compute landed order costs.',
    ogType: 'website',
    ogImage: `${BASE_URL}/images/us-duty-nexus-estimator-2026.png`,
    keywords: [
      'us duty nexus calculator',
      'section 321 de minimis calculator',
      'us cbp import tariff calculator',
    ],
  },

  'ce-ukca-compliance-generator': {
    title: 'UKCA & CE DoC Generator | Evonix',
    description:
      'Build formatted Declaration of Conformity (DoC) sheets for EU MDR Class I surgical goods and UKCA export tender compliance.',
    canonicalUrl: `${BASE_URL}/tools/ce-ukca-compliance-generator`,
    ogTitle: 'UKCA & CE DoC Generator | Evonix',
    ogDescription:
      'Create compliant CE and UKCA Declaration of Conformity files for European and UK export shipments.',
    ogType: 'website',
    ogImage: `${BASE_URL}/images/ce-ukca-compliance-generator-2026.png`,
    keywords: [
      'ce ukca compliance generator',
      'declaration of conformity generator',
      'eu mdr class 1 doc',
    ],
  },

  'tiktok-shop-fee-calculator': {
    title: 'TikTok Shop Fee Calculator | Evonix',
    description:
      'Calculate TikTok Shop UK 9% VAT-inclusive commission, US 6%–8% referral fees, affiliate creator payouts, and net profit margins.',
    canonicalUrl: `${BASE_URL}/tools/tiktok-shop-fee-calculator`,
    ogTitle: 'TikTok Shop Fee Calculator | Evonix',
    ogDescription:
      'Calculate TikTok Shop UK 9% and US 6%/8% seller referral fees, creator commissions, and net payouts.',
    ogType: 'website',
    ogImage: `${BASE_URL}/images/tiktok-shop-fee-calculator-2026.png`,
    keywords: [
      'tiktok shop fee calculator',
      'tiktok shop commission calculator',
      'tiktok shop profit calculator',
    ],
  },

  'amazon-fba-calculator': {
    title: 'Amazon FBA Profit Calculator | Evonix',
    description:
      'Estimate 2026/2027 Amazon FBA pick-and-pack fees, category referral cuts, monthly storage costs, break-even ACoS, and net ROI.',
    canonicalUrl: `${BASE_URL}/tools/amazon-fba-calculator`,
    ogTitle: 'Amazon FBA Profit Calculator | Evonix',
    ogDescription:
      'Calculate Amazon FBA fulfillment fees, referral percentages, storage charges, and net margin.',
    ogType: 'website',
    ogImage: `${BASE_URL}/images/amazon-fba-fee-calculator-2026.png`,
    keywords: [
      'Amazon FBA Calculator',
      'FBA profit calculator',
      'Amazon referral fee',
      'amazon break-even acos calculator',
    ],
  },

  'shopify-fee-calculator': {
    title: 'Shopify Fee & Profit Calculator | Evonix',
    description:
      'Compare Shopify Basic, Grow, and Advanced plan billing, Shopify Payments card fees, and third-party gateway surcharges per order.',
    canonicalUrl: `${BASE_URL}/tools/shopify-fee-calculator`,
    ogTitle: 'Shopify Fee & Profit Calculator | Evonix',
    ogDescription:
      'Calculate Shopify plan transaction fees, payment gateway deductions, and per-order net margins.',
    ogType: 'website',
    ogImage: `${BASE_URL}/images/shopify-fee-calculator-2026.png`,
    keywords: [
      'shopify fee calculator',
      'shopify profit calculator',
      'shopify transaction fee calculator',
    ],
  },

  'stripe-fee-calculator': {
    title: 'Stripe Fee Calculator 2026 | Evonix',
    description:
      'Compute domestic 2.9% + $0.30 Stripe fees, international card and FX surcharges, plus reverse invoice billing amounts cleanly.',
    canonicalUrl: `${BASE_URL}/tools/stripe-fee-calculator`,
    ogTitle: 'Stripe Fee Calculator 2026 | Evonix',
    ogDescription:
      'Calculate exact Stripe processing deductions and reverse invoice totals for domestic and global cards.',
    ogType: 'website',
    ogImage: `${BASE_URL}/images/stripe-fee-calculator-2026.png`,
    keywords: [
      'stripe fee calculator',
      'stripe transaction fee calculator',
      'stripe processing fee calculator',
    ],
  },

  'temu-seller-calculator': {
    title: 'Temu Seller Fee Calculator | Evonix',
    description:
      'Simulate Temu seller margins, wholesale supply cost, local warehouse fulfillment charges, and net marketplace payouts instantly.',
    canonicalUrl: `${BASE_URL}/tools/temu-seller-calculator`,
    ogTitle: 'Temu Seller Fee Calculator | Evonix',
    ogDescription:
      'Calculate Temu seller unit margins, warehouse fulfillment deductions, and net order profits.',
    ogType: 'website',
    ogImage: `${BASE_URL}/images/temu-seller-calculator-2026.png`,
    keywords: [
      'temu seller calculator',
      'temu fee calculator',
      'temu profit calculator',
    ],
  },

  'etsy-fee-calculator': {
    title: 'Etsy Fee & Payoneer Calculator | Evonix',
    description:
      'Calculate $0.20 Etsy listing fees, 6.5% transaction fees, 15% offsite ads with $100 cap, and Payoneer bank withdrawal rates.',
    canonicalUrl: `${BASE_URL}/tools/etsy-fee-calculator`,
    ogTitle: 'Etsy Fee & Payoneer Calculator | Evonix',
    ogDescription:
      'Compute Etsy seller fees, offsite ad deductions, and Payoneer PKR/USD net bank deposits.',
    ogType: 'website',
    ogImage: `${BASE_URL}/images/etsy-fee-calculator-2026.png`,
    keywords: [
      'etsy fee calculator',
      'etsy profit calculator',
      'etsy payoneer fee calculator',
    ],
  },

  'amazon-fbm-calculator': {
    title: 'Amazon FBM Fee Calculator 2026 | Evonix',
    description:
      'Calculate Amazon FBM category referral fees (8–15%), merchant self-shipping rates, packaging costs, and net unit profit margins.',
    canonicalUrl: `${BASE_URL}/tools/amazon-fbm-calculator`,
    ogTitle: 'Amazon FBM Fee Calculator 2026 | Evonix',
    ogDescription:
      'Compute Amazon Fulfilled by Merchant referral cuts, carrier shipping expenses, and profit per order.',
    ogType: 'website',
    ogImage: `${BASE_URL}/images/amazon-fbm-calculator-2026.png`,
    keywords: [
      'amazon fbm calculator',
      'amazon fbm fee calculator',
      'amazon fulfilled by merchant calculator',
    ],
  },

  'installation-guide': {
    title: 'Desktop Software Setup Guide | Evonix',
    description:
      'Windows 10/11 and macOS setup instructions for Evonix desktop calculators, license key activation, and offline workstation prep.',
    canonicalUrl: `${BASE_URL}/installation-guide`,
    ogTitle: 'Desktop Software Setup Guide | Evonix',
    ogDescription:
      'Step-by-step installation and license activation instructions for Windows and macOS desktop tools.',
    ogType: 'website',
    ogImage: DEFAULT_OG_IMAGE,
    keywords: [
      'software installation guide',
      'evonix license activation',
      'offline fee calculator windows mac',
    ],
  },

  'trend-intelligence-suite': {
    title: 'Trend Intelligence Suite V15 | Evonix',
    description:
      'Score multi-platform product keyword trends across Google, Amazon, eBay, Bing, and YouTube with bulk CSV import and export.',
    canonicalUrl: `${BASE_URL}/tools/trend-intelligence-suite`,
    ogTitle: 'Trend Intelligence Suite V15 | Evonix',
    ogDescription:
      'Multi-platform keyword trend scoring engine across Google, Bing, eBay, YouTube, and Amazon.',
    ogType: 'website',
    ogImage: DEFAULT_OG_IMAGE,
    keywords: [
      'trend intelligence suite',
      'keyword trend analyzer',
      'ebay trend score',
    ],
  },

  'schema-generator': {
    title: 'JSON-LD Schema Generator | Evonix',
    description:
      'Generate valid Schema.org JSON-LD markup for LocalBusiness, FAQPage, Product, and SoftwareApplication rich snippets.',
    canonicalUrl: `${BASE_URL}/tools/schema-generator`,
    ogTitle: 'JSON-LD Schema Generator | Evonix',
    ogDescription:
      'Build search-ready JSON-LD structured data markup for Google rich results and knowledge graphs.',
    ogType: 'website',
    ogImage: DEFAULT_OG_IMAGE,
    keywords: [
      'json ld schema markup generator',
      'schema generator tool',
      'google rich results schema',
    ],
  },

  'hs-code-lookup': {
    title: 'HS Code & Customs Duty Lookup | Evonix',
    description:
      'Search 6 to 8-digit WCO HS tariff codes for leather, surgical, and sports exports and estimate USA, EU, UK, and UAE customs duties.',
    canonicalUrl: `${BASE_URL}/tools/hs-code-lookup`,
    ogTitle: 'HS Code & Customs Duty Lookup | Evonix',
    ogDescription:
      'Find export HS tariff codes and estimate import duties across USA, EU, UK, and UAE.',
    ogType: 'website',
    ogImage: DEFAULT_OG_IMAGE,
    keywords: [
      'hs code lookup engine',
      'custom duty lookup',
      'export hs codes sialkot',
    ],
  },

  starter: {
    title: 'Business Web Starter Pack | Evonix',
    description: 'Starter website engineering package for Pakistani exporters, manufacturers, and growing retail businesses.',
    canonicalUrl: `${BASE_URL}/starter`,
    ogTitle: 'Business Web Starter Pack | Evonix',
    ogDescription: 'Starter website engineering package for exporters and retail businesses.',
    ogType: 'website',
    ogImage: DEFAULT_OG_IMAGE,
    keywords: ['web design offer', 'starter pack', 'evonix promo'],
  },

  'sialkot-pos-hardware': {
    title: 'POS Hardware & Printers Sialkot | Evonix',
    description:
      'Order 80mm and 58mm thermal receipt printers, 2D barcode scanners, and touch POS terminals in Sialkot with 1-year local warranty.',
    canonicalUrl: `${BASE_URL}/locations/sialkot/pos-hardware`,
    ogTitle: 'POS Hardware & Printers Sialkot | Evonix',
    ogDescription:
      'Thermal receipt printers, barcode scanners, and touch POS terminals with same-day Sialkot dispatch.',
    ogType: 'website',
    ogImage: DEFAULT_OG_IMAGE,
    keywords: [
      'thermal printer sialkot',
      'pos hardware sialkot',
      'barcode scanner sialkot',
    ],
  },

  'not-found': {
    title: 'Page Not Found | Evonix',
    description: 'The requested page could not be found on Evonix Technologies. Return to our software services, POS pricing, export ERP, or free business tools.',
    canonicalUrl: `${BASE_URL}/`,
    ogTitle: 'Page Not Found | Evonix',
    ogDescription: 'Page not found on Evonix Technologies.',
    ogType: 'website',
    ogImage: DEFAULT_OG_IMAGE,
    keywords: ['evonix technologies', 'page not found'],
  },
};

/**
 * Creates or updates a DOM <meta> tag
 */
function updateMetaTag(attributeName: 'name' | 'property', attributeValue: string, content: string) {
  if (typeof document === 'undefined') return;
  let element = document.querySelector(`meta[${attributeName}="${attributeValue}"]`);
  if (!element) {
    element = document.createElement('meta');
    element.setAttribute(attributeName, attributeValue);
    document.head.appendChild(element);
  }
  element.setAttribute('content', content);
}

/**
 * Creates or updates the canonical link tag
 */
export function updateCanonicalLink(url: string) {
  if (typeof document === 'undefined') return;
  let link = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
  if (!link) {
    link = document.createElement('link');
    link.setAttribute('rel', 'canonical');
    document.head.appendChild(link);
  }
  link.setAttribute('href', url);
}

/**
 * Injects or replaces sub-page Schema.org JSON-LD structured data with clean @graph array
 */
function updateSubpageStructuredData(data?: object) {
  if (typeof document === 'undefined') return;
  const scriptId = 'evonix-subpage-schema';
  let script = document.getElementById(scriptId) as HTMLScriptElement | null;

  if (!data) {
    if (script) script.remove();
    return;
  }

  if (!script) {
    script = document.createElement('script');
    script.id = scriptId;
    script.type = 'application/ld+json';
    document.head.appendChild(script);
  }
  script.textContent = JSON.stringify(data);
}

/**
 * Constructs the route-specific structured data @graph with:
 * - BreadcrumbList
 * - Specific entity (WebPage, Service, Store/Product, AboutPage, ContactPage, CollectionPage)
 * - Individual Service or Product schemas where appropriate
 */
function generateRouteStructuredData(pageId: NavPageId): object {
  if (pageId === 'admin') {
    return { '@context': 'https://schema.org', '@graph': [] };
  }
  const meta = SIALKOT_PAGE_SEO[pageId];
  const graph: object[] = [];

  const isToolsHost =
    typeof window !== 'undefined' &&
    (window.location.hostname.toLowerCase() === 'tools.evonixtec.com' ||
      window.location.hostname.toLowerCase().startsWith('tools.'));
  const isStoreHost =
    typeof window !== 'undefined' &&
    (window.location.hostname.toLowerCase() === 'store.evonixtec.com' ||
      window.location.hostname.toLowerCase().startsWith('store.'));

  const activeOrigin = isToolsHost ? TOOLS_BASE_URL : isStoreHost ? STORE_BASE_URL : BASE_URL;
  const toolUrl = (slug: string) =>
    isToolsHost ? `${TOOLS_BASE_URL}/${slug}` : `${BASE_URL}/tools/${slug}`;

  const TOOL_BREADCRUMB_MAP: Partial<Record<NavPageId, { name: string; slug: string }>> = {
    invoice: { name: 'Global Micro-Invoice Generator', slug: 'invoice-generator' },
    'ecommerce-calculator': { name: 'E-Commerce Margin Calculator', slug: 'ecommerce-margin-calculator' },
    'cbm-calculator': { name: 'Export CBM Freight Calculator', slug: 'export-cbm-calculator' },
    'developer-cost-calculator': { name: 'Developer Cost Calculator', slug: 'developer-cost-calculator' },
    'ai-visibility-checker': { name: 'AI Visibility Checker', slug: 'ai-visibility-checker' },
    'export-barcode-studio': { name: 'Barcode Label Studio', slug: 'barcode-label-studio' },
    'live-repair-tracker': { name: 'Live RMA Repair Tracker', slug: 'live-repair-tracker' },
    'printer-diagnostics': { name: 'Thermal Printer Diagnostics', slug: 'printer-diagnostics' },
    'factory-network-tester': { name: 'Factory Network Latency Tester', slug: 'factory-network-tester' },
    'uk-eu-vat-calculator': { name: 'UK & EU VAT Calculator', slug: 'uk-eu-vat-calculator' },
    'us-duty-nexus-estimator': { name: 'US Customs Duty Estimator', slug: 'us-duty-nexus-estimator' },
    'ce-ukca-compliance-generator': { name: 'CE & UKCA Compliance Generator', slug: 'ce-ukca-compliance-generator' },
    'ebay-fee-calculator': { name: 'eBay Fee Calculator', slug: 'ebay-fee-calculator' },
    'tiktok-shop-fee-calculator': { name: 'TikTok Shop Fee Calculator', slug: 'tiktok-shop-fee-calculator' },
    'amazon-fba-calculator': { name: 'Amazon FBA Calculator', slug: 'amazon-fba-calculator' },
    'amazon-fbm-calculator': { name: 'Amazon FBM Calculator', slug: 'amazon-fbm-calculator' },
    'shopify-fee-calculator': { name: 'Shopify Fee Calculator', slug: 'shopify-fee-calculator' },
    'stripe-fee-calculator': { name: 'Stripe Fee Calculator', slug: 'stripe-fee-calculator' },
    'temu-seller-calculator': { name: 'Temu Seller Calculator', slug: 'temu-seller-calculator' },
    'etsy-fee-calculator': { name: 'Etsy Fee Calculator', slug: 'etsy-fee-calculator' },
    'trend-intelligence-suite': { name: 'Trend Intelligence Suite', slug: 'trend-intelligence-suite' },
    'schema-generator': { name: 'JSON-LD Schema Generator', slug: 'schema-generator' },
    'hs-code-lookup': { name: 'Global HS Code & Duty Lookup', slug: 'hs-code-lookup' },
    'ai-trip-planner': { name: 'AI Trip Planner', slug: 'ai-trip-planner' },
  };

  // 1. BreadcrumbList for every route (guaranteed non-empty valid full URLs on every ListItem)
  const breadcrumbItems = [{ name: 'Home', url: `${activeOrigin}/` }];

  if (pageId === 'services') {
    breadcrumbItems.push({ name: 'IT & Software Services', url: `${BASE_URL}/services` });
  } else if (pageId === 'portfolio') {
    breadcrumbItems.push({ name: 'Enterprise Portfolio', url: `${BASE_URL}/portfolio` });
  } else if (pageId === 'shop') {
    breadcrumbItems.push({ name: 'IT Hardware & POS Shop', url: `${activeOrigin}/shop` });
  } else if (pageId === 'about') {
    breadcrumbItems.push({ name: 'About evonix & Dubai Heritage', url: `${BASE_URL}/about` });
  } else if (pageId === 'guides') {
    breadcrumbItems.push({ name: 'Tech Blogs & Guides', url: `${BASE_URL}/guides` });
  } else if (pageId === 'contact') {
    breadcrumbItems.push({ name: 'Contact & On-Site Support', url: `${BASE_URL}/contact` });
  } else if (pageId === 'tools') {
    breadcrumbItems.push({ name: 'Web Tools', url: isToolsHost ? `${TOOLS_BASE_URL}/` : `${BASE_URL}/tools` });
  } else if (pageId === 'locations') {
    breadcrumbItems.push({ name: 'Sialkot Regional Hubs', url: `${BASE_URL}/locations` });
  } else if (pageId === 'sialkot-pos-hardware') {
    breadcrumbItems.push({ name: 'Locations', url: `${BASE_URL}/locations` });
    breadcrumbItems.push({ name: 'Sialkot POS Hardware', url: `${BASE_URL}/locations/sialkot/pos-hardware` });
  } else if (pageId === 'sialkot-export-erp') {
    breadcrumbItems.push({ name: 'Services', url: `${BASE_URL}/services` });
    breadcrumbItems.push({ name: 'Sialkot Export ERP', url: `${BASE_URL}/sialkot-export-erp` });
  } else if (pageId === 'guidelines') {
    breadcrumbItems.push({ name: 'Guides', url: `${BASE_URL}/guides` });
    breadcrumbItems.push({ name: 'IT Guidelines', url: `${BASE_URL}/guidelines` });
  } else if (pageId === 'installation-guide') {
    breadcrumbItems.push({ name: 'Guides', url: `${BASE_URL}/guides` });
    breadcrumbItems.push({ name: 'Installation Guide', url: `${BASE_URL}/installation-guide` });
  } else if (pageId === 'ai-travel-tools') {
    breadcrumbItems.push({ name: 'Guides', url: `${BASE_URL}/guides` });
    breadcrumbItems.push({ name: 'AI Tools for Travel Itinerary', url: `${BASE_URL}/ai-tools-name-for-travel-itinerary` });
  } else if (pageId === 'doorstep-support') {
    breadcrumbItems.push({ name: 'Hardware & Shop', url: `${activeOrigin}/shop` });
    breadcrumbItems.push({ name: 'Doorstep Support', url: `${activeOrigin}/services/doorstep-support` });
  } else if (TOOL_BREADCRUMB_MAP[pageId]) {
    const toolMeta = TOOL_BREADCRUMB_MAP[pageId]!;
    breadcrumbItems.push({ name: 'Web Tools', url: `${BASE_URL}/tools` });
    breadcrumbItems.push({ name: toolMeta.name, url: toolUrl(toolMeta.slug) });
  }

  graph.push(buildBreadcrumbSchema(breadcrumbItems));

  // 2. Core Organization, LocalBusiness & SiteNavigationElement
  graph.push(ORGANIZATION_SCHEMA);
  graph.push(LOCAL_BUSINESS_SCHEMA);
  graph.push(SITE_NAVIGATION_SCHEMA);

  // 3. Route-Specific Entities
  if (pageId === 'home') {
    graph.push({
      '@type': 'WebSite',
      '@id': `${BASE_URL}/#website`,
      url: `${BASE_URL}/`,
      name: 'Evonix Technologies',
      alternateName: 'evonixtec.com',
      description: meta.description,
      publisher: { '@id': `${BASE_URL}/#organization` },
      potentialAction: {
        '@type': 'SearchAction',
        target: `${BASE_URL}/guides?search={search_term_string}`,
        'query-input': 'required name=search_term_string',
      },
    });
    // Add top featured service references to home
    graph.push(INDIVIDUAL_SERVICES_SCHEMAS[0]);
    graph.push(INDIVIDUAL_SERVICES_SCHEMAS[2]);
    const itConsultancy = INDIVIDUAL_SERVICES_SCHEMAS.find((s) => s['@id'].includes('it-consultancy'));
    const hwMaintenance = INDIVIDUAL_SERVICES_SCHEMAS.find((s) => s['@id'].includes('hardware-maintenance'));
    if (itConsultancy) graph.push(itConsultancy);
    if (hwMaintenance) graph.push(hwMaintenance);
    // Add Google Rich Result FAQ schema to home
    graph.push(FAQ_PAGE_SCHEMA);
  } else if (pageId === 'services') {
    // WebPage descriptor
    graph.push({
      '@type': 'WebPage',
      '@id': `${BASE_URL}/services#webpage`,
      url: `${BASE_URL}/services`,
      name: meta.title,
      description: meta.description,
      breadcrumb: { '@id': `${BASE_URL}/services#breadcrumb` },
      mainEntity: { '@id': `${BASE_URL}/services#catalog` },
    });

    // Master Service Catalog
    graph.push({
      '@type': 'ServiceCatalog',
      '@id': `${BASE_URL}/services#catalog`,
      name: 'evonix Sialkot IT & Engineering Services Catalog',
      itemListElement: INDIVIDUAL_SERVICES_SCHEMAS.map((svc) => ({
        '@type': 'Service',
        name: svc.name,
        url: `${BASE_URL}/services`,
        description: svc.description,
      })),
    });

    // Inject all individual Service schemas
    INDIVIDUAL_SERVICES_SCHEMAS.forEach((svc) => graph.push(svc));

    // Inject Evonix Hisaab Pro POS FAQPage Rich Result schema
    graph.push(HISAAB_PRO_FAQ_SCHEMA);
  } else if (pageId === 'shop') {
    // Store entity
    graph.push({
      '@type': 'Store',
      '@id': `${BASE_URL}/shop#store`,
      name: 'evonix IT Hardware & POS Equipment Shop',
      url: `${BASE_URL}/shop`,
      description: meta.description,
      telephone: '+92 326 3244002',
      address: LOCAL_BUSINESS_SCHEMA.address,
      priceRange: 'PKR',
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: 'Sialkot IT Equipment & POS Hardware',
        itemListElement: INDIVIDUAL_PRODUCTS_SCHEMAS.map((prod) => ({
          '@type': 'Offer',
          itemOffered: { '@id': prod['@id'] },
        })),
      },
    });

    // Inject individual Product schemas (POS, Thermal Printer, Barcode Scanner, Laptop)
    INDIVIDUAL_PRODUCTS_SCHEMAS.forEach((prod) => graph.push(prod));
  } else if (pageId === 'portfolio') {
    graph.push({
      '@type': 'CollectionPage',
      '@id': `${BASE_URL}/portfolio#webpage`,
      url: `${BASE_URL}/portfolio`,
      name: meta.title,
      description: meta.description,
      breadcrumb: { '@id': `${BASE_URL}/portfolio#breadcrumb` },
      publisher: { '@id': `${BASE_URL}/#business` },
    });
  } else if (pageId === 'about') {
    graph.push({
      '@type': 'AboutPage',
      '@id': `${BASE_URL}/about#webpage`,
      url: `${BASE_URL}/about`,
      name: meta.title,
      description: meta.description,
      breadcrumb: { '@id': `${BASE_URL}/about#breadcrumb` },
      mainEntity: {
        '@type': 'Organization',
        name: 'evonix technologies',
        url: `${BASE_URL}/`,
        foundingLocation: 'Dubai, United Arab Emirates',
        knowsAbout: [
          'High-Availability Cloud Architecture',
          'Chip-Level Motherboard Micro-Soldering',
          'Retail Point of Sale Systems',
          'Sialkot Export Manufacturing ERPs',
        ],
      },
    });
  } else if (pageId === 'guides') {
    graph.push({
      '@type': 'CollectionPage',
      '@id': `${BASE_URL}/guides#webpage`,
      url: `${BASE_URL}/guides`,
      name: meta.title,
      description: meta.description,
      breadcrumb: { '@id': `${BASE_URL}/guides#breadcrumb` },
      publisher: { '@id': `${BASE_URL}/#business` },
    });
    // Add Google Rich Result FAQ schema to guides
    graph.push(FAQ_PAGE_SCHEMA);
  } else if (pageId === 'contact') {
    graph.push({
      '@type': 'ContactPage',
      '@id': `${BASE_URL}/contact#webpage`,
      url: `${BASE_URL}/contact`,
      name: meta.title,
      description: meta.description,
      breadcrumb: { '@id': `${BASE_URL}/contact#breadcrumb` },
      mainEntity: { '@id': `${BASE_URL}/#business` },
    });
  } else if (pageId === 'locations') {
    graph.push({
      '@type': 'CollectionPage',
      '@id': `${BASE_URL}/locations#webpage`,
      url: `${BASE_URL}/locations`,
      name: meta.title,
      description: meta.description,
      breadcrumb: { '@id': `${BASE_URL}/locations#breadcrumb` },
      publisher: { '@id': `${BASE_URL}/#business` },
    });
  } else if (pageId === 'invoice') {
    graph.push({
      '@type': 'WebApplication',
      '@id': `${BASE_URL}/invoice#app`,
      name: 'Free Online Invoice Generator',
      applicationCategory: 'BusinessApplication',
      operatingSystem: 'All',
      browserRequirements: 'Requires JavaScript. Requires HTML5.',
      description: meta.description,
      url: `${BASE_URL}/invoice`,
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'USD',
      },
      featureList: [
        '100% Free online invoice generator',
        'Zero database client-side privacy',
        'Multi-currency and global tax calculation',
        'Instant Code128 barcode generation',
        'Dynamic amount in words converter',
        'Print ready A4 commercial invoice sheet',
        'Local storage invoice history and cloning',
      ],
      breadcrumb: { '@id': `${BASE_URL}/invoice#breadcrumb` },
      publisher: { '@id': `${BASE_URL}/#business` },
    });

    graph.push({
      '@type': 'FAQPage',
      '@id': `${BASE_URL}/invoice#faq`,
      mainEntity: [
        {
          '@type': 'Question',
          name: 'Is it free?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes, the Evonix Global Micro-Invoice Generator is 100% free with no hidden charges, watermarks, monthly fees, or signup requirements. Generate unlimited commercial invoices and download instant A4 PDFs.',
          },
        },
        {
          '@type': 'Question',
          name: 'Does it support PKR to USD?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes! It supports over 150+ international currencies including USD ($), PKR (Rs), AED (Dirhams), GBP (£), EUR (€), SAR (Riyals), CAD, AUD, and INR, with automatic localized number-to-words currency translation and IBAN/SWIFT banking routing.',
          },
        },
        {
          '@type': 'Question',
          name: 'Can I use offline?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes. The generator is built using an offline-first, zero-database client-side architecture. All calculations, layout rendering, and PDF exports execute directly in your browser memory without an active internet connection. Data never leaves your device.',
          },
        },
      ],
    });
  } else if (pageId === 'developer-cost-calculator') {
    graph.push({
      '@type': 'SoftwareApplication',
      '@id': `${BASE_URL}/hire-dedicated-developer-cost-calculator-pune-india#app`,
      name: 'Dedicated Developer Cost Calculator - evonix Technologies',
      applicationCategory: 'BusinessApplication',
      operatingSystem: 'All',
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'USD',
      },
      provider: {
        '@type': 'Organization',
        name: 'evonix Technologies',
        address: {
          '@type': 'PostalAddress',
          addressLocality: 'Sialkot',
          addressCountry: 'PK',
        },
      },
      breadcrumb: { '@id': `${BASE_URL}/hire-dedicated-developer-cost-calculator-pune-india#breadcrumb` },
    });
  } else if (pageId === 'ai-visibility-checker') {
    graph.push({
      '@type': 'SoftwareApplication',
      '@id': `${BASE_URL}/ai-visibility-checker#app`,
      name: 'Website E-E-A-T & AI Visibility Checker - evonix Technologies',
      applicationCategory: 'BusinessApplication',
      operatingSystem: 'All',
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'USD',
      },
      provider: {
        '@type': 'Organization',
        name: 'evonix Technologies',
        address: {
          '@type': 'PostalAddress',
          addressLocality: 'Sialkot',
          addressCountry: 'PK',
        },
      },
      breadcrumb: { '@id': `${BASE_URL}/ai-visibility-checker#breadcrumb` },
    });
  } else if (pageId === 'ai-travel-tools') {
    graph.push({
      '@type': 'Article',
      '@id': `${BASE_URL}/ai-tools-name-for-travel-itinerary#article`,
      headline: 'Tools Required for Artificial Intelligence: 10 Best AI Tools Name for Travel',
      description:
        'What are the best AI tools for travel planning in 2026? See the top 10 AI tools name, tools required for AI trip planning, flights & vacation planning.',
      author: {
        '@type': 'Organization',
        name: 'evonix technologies',
      },
      publisher: { '@id': `${BASE_URL}/#business` },
      mainEntityOfPage: `${BASE_URL}/ai-tools-name-for-travel-itinerary`,
    });
    graph.push({
      '@type': 'FAQPage',
      '@id': `${BASE_URL}/ai-tools-name-for-travel-itinerary#faq`,
      mainEntity: [
        {
          '@type': 'Question',
          name: 'What are the best AI tools for travel planning in 2026?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'The best AI tools for travel planning in 2026 are Evonixtec AI Trip Planner, Kayak AI for flights, Roam Around for vacation planning, and Hopper for price prediction.',
          },
        },
        {
          '@type': 'Question',
          name: 'What tools are required for artificial intelligence in travel?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Tools required for artificial intelligence in travel include natural language processing (NLP) models, flight data APIs, hotel booking APIs, and itinerary generation algorithms like ChatGPT-4o and Gemini 2.5.',
          },
        },
        {
          '@type': 'Question',
          name: 'What is the best AI tools name for flights?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'The best AI tools name for flights are Kayak AI, Hopper, and Google Flights AI. They help you find the cheapest ai tools for flights tickets.',
          },
        },
        {
          '@type': 'Question',
          name: 'How to use AI tools for vacation planning?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'To use AI tools for vacation planning, enter your destination, travel dates, budget, and interests into a tool like Evonixtec AI Planner. It will generate a complete day-wise vacation plan.',
          },
        },
      ],
    });
  } else if (pageId === 'ai-trip-planner') {
    graph.push({
      '@type': 'SoftwareApplication',
      '@id': `${BASE_URL}/tools/ai-trip-planner#app`,
      name: 'Evonixtec AI Trip Planner - Free Day-by-Day Vacation Itinerary Generator',
      applicationCategory: 'TravelApplication',
      operatingSystem: 'All',
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'USD',
      },
      provider: {
        '@type': 'Organization',
        name: 'evonix Technologies',
      },
    });
  }

  return {
    '@context': 'https://schema.org',
    '@graph': graph,
  };
}

/**
 * Synchronizes document title, meta descriptions, Open Graph, Twitter cards,
 * canonical URL, and Schema.org for a given sub-page route.
 */
export function applyPageSEO(
  pageId: NavPageId,
  overrideCanonicalUrl?: string,
  customMeta?: Partial<PageMetadata>
) {
  const base = SIALKOT_PAGE_SEO[pageId] || SIALKOT_PAGE_SEO.home;
  const meta: PageMetadata = {
    ...base,
    ...customMeta,
  };

  // Determine exact self-referential canonical URL
  let canonicalUrl = overrideCanonicalUrl || meta.canonicalUrl;
  if (typeof window !== 'undefined') {
    const rawSubPath = window.location.pathname.replace(/\/index\.html$/i, '').replace(/\/+$/, '').toLowerCase();
    if (rawSubPath === '/services/software-pos') {
      meta.title = 'POS Software Price in Pakistan | Evonix';
      meta.description =
        'Offline Windows POS billing, multi-unit stock, digital khata with WhatsApp reminders & daily net profit software for retail shops in Pakistan.';
      meta.ogTitle = meta.title;
      meta.ogDescription = meta.description;
      meta.keywords = [
        'POS Software Price in Pakistan',
        'Evonix Hisaab Pro',
        'offline POS software Pakistan',
        'Kiryana store ka software',
        'Pharmacy medical store software Pakistan',
        'Digital khata WhatsApp reminders',
        'Garments boutique POS software',
        'Mobile shop IMEI PTA status software',
      ];
    }
  }
  if (!overrideCanonicalUrl && typeof window !== 'undefined') {
    const hostname = window.location.hostname.toLowerCase();
    const rawPath = window.location.pathname.replace(/\/index\.html$/i, '').replace(/\/+$/, '') || '/';
    const isStore = hostname === 'store.evonixtec.com' || hostname.startsWith('store.') || window.location.search.includes('subdomain=store');
    const isTools = hostname === 'tools.evonixtec.com' || hostname.startsWith('tools.') || window.location.search.includes('subdomain=tools');

    if (isStore) {
      // Strict self-referencing absolute canonicals for store.evonixtec.com
      canonicalUrl = `${STORE_BASE_URL}${rawPath === '/' ? '' : rawPath}`;
    } else if (isTools) {
      // Strict self-referencing absolute canonicals for tools.evonixtec.com
      canonicalUrl = `${TOOLS_BASE_URL}${rawPath === '/' ? '' : rawPath}`;
    } else {
      // Strict self-referencing absolute canonicals for evonixtec.com (main enterprise domain)
      if (rawPath === '/locations/wazirabad' || rawPath === '/location/wazirabad') {
        canonicalUrl = `${BASE_URL}/locations/wazirabad`;
      } else if (rawPath === '/locations/sambrial' || rawPath === '/location/sambrial') {
        canonicalUrl = `${BASE_URL}/locations/sambrial`;
      } else if (rawPath === '/sialkot-export-erp') {
        canonicalUrl = `${BASE_URL}/sialkot-export-erp`;
      } else if (rawPath === '/guidelines') {
        canonicalUrl = `${BASE_URL}/guidelines`;
      } else if (rawPath === '/factory-network-tester') {
        canonicalUrl = `${BASE_URL}/tools/factory-network-tester`;
      } else if (rawPath === '/schema-generator') {
        canonicalUrl = `${BASE_URL}/tools/schema-generator`;
      } else if (rawPath === '/hs-code-lookup' || rawPath === '/hex-code-lookup' || rawPath === '/tools/hex-code-lookup') {
        canonicalUrl = `${BASE_URL}/tools/hs-code-lookup`;
      } else if (pageId === 'not-found') {
        canonicalUrl = `${BASE_URL}/`;
      } else {
        canonicalUrl = `${BASE_URL}${rawPath === '/' ? '/' : rawPath}`;
      }
    }
  }

  // Title
  document.title = meta.title;

  // Primary Meta & Robots Directives
  updateMetaTag('name', 'description', meta.description);
  updateMetaTag('name', 'keywords', meta.keywords.join(', '));
  if (pageId === 'starter' || pageId === 'not-found') {
    updateMetaTag('name', 'robots', 'noindex, nofollow');
    updateMetaTag('name', 'googlebot', 'noindex, nofollow');
    updateMetaTag('name', 'bingbot', 'noindex, nofollow');
  } else {
    // Universal Indexation Directives: No noindex tags allowed anywhere on public pages
    updateMetaTag('name', 'robots', 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1');
    updateMetaTag('name', 'googlebot', 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1');
    updateMetaTag('name', 'bingbot', 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1');
    updateMetaTag('name', 'google-extended', 'index, follow');
    updateMetaTag('name', 'gptbot', 'index, follow');
  }

  // Open Graph
  updateMetaTag('property', 'og:title', meta.ogTitle);
  updateMetaTag('property', 'og:description', meta.ogDescription);
  updateMetaTag('property', 'og:url', canonicalUrl);
  updateMetaTag('property', 'og:type', meta.ogType);
  updateMetaTag('property', 'og:site_name', 'evonix technologies');
  updateMetaTag('property', 'og:locale', 'en_PK');
  if (meta.ogImage) {
    updateMetaTag('property', 'og:image', meta.ogImage);
    updateMetaTag('property', 'og:image:width', '1200');
    updateMetaTag('property', 'og:image:height', '630');
    updateMetaTag('property', 'og:image:type', meta.ogImage.endsWith('.png') ? 'image/png' : 'image/jpeg');
  }

  // Twitter / X
  updateMetaTag('name', 'twitter:card', 'summary_large_image');
  updateMetaTag('name', 'twitter:title', meta.ogTitle);
  updateMetaTag('name', 'twitter:description', meta.ogDescription);
  if (meta.ogImage) {
    updateMetaTag('name', 'twitter:image', meta.ogImage);
  }

  // Canonical URL
  updateCanonicalLink(canonicalUrl);

  // Geo / Local Sialkot meta tags
  updateMetaTag('name', 'geo.region', 'PK-PB');
  updateMetaTag('name', 'geo.placename', 'Sialkot');
  updateMetaTag('name', 'geo.position', '32.4945;74.5229');
  updateMetaTag('name', 'ICBM', '32.4945, 74.5229');

  // Brand Tagline & Micro-kicker meta
  updateMetaTag('name', 'tagline', 'Dubai Precision Engineering • Sialkot Tech Hub');
  updateMetaTag('name', 'author', 'evonix technologies');

  // Dynamically inject Schema.org JSON-LD @graph for the route
  const structuredData = generateRouteStructuredData(pageId);
  updateSubpageStructuredData(structuredData);

  // Ping IndexNow search engine protocol for public pages and tools
  if (pageId !== 'admin' && pageId !== 'not-found') {
    pingIndexNow(canonicalUrl).catch(() => {});
  }
}

/**
 * Sets dynamic SEO for an active blog / technical guide post reader view
 */
export function applyBlogPostSEO(blog: BlogPost) {
  const maxSlugTitleLen = 42;
  const trimmedTitle =
    blog.title.length > maxSlugTitleLen
      ? blog.title.slice(0, maxSlugTitleLen).replace(/\s+\S*$/, '').trim()
      : blog.title.trim();
  const pageTitle = `${trimmedTitle} | Evonix`;
  const uniqueContext = blog.targetKeywords[0] ? `${blog.targetKeywords[0]} — ` : `${blog.categoryLabel} — `;
  const rawDesc = blog.excerpt.trim().startsWith(uniqueContext)
    ? blog.excerpt.trim()
    : `${uniqueContext}${blog.excerpt.trim()}`;
  const pageDesc = rawDesc.length > 158 ? `${rawDesc.slice(0, 155)}...` : rawDesc;
  const canonicalUrl = `${BASE_URL}/blog/${blog.slug}`;

  document.title = pageTitle;

  updateMetaTag('name', 'description', pageDesc);
  updateMetaTag(
    'name',
    'keywords',
    [
      ...blog.targetKeywords,
      ...blog.tags,
      'Sialkot IT guide',
      'computer repair Sialkot',
      'evonix Technologies',
    ].join(', ')
  );

  updateMetaTag('property', 'og:title', pageTitle);
  updateMetaTag('property', 'og:description', pageDesc);
  updateMetaTag('property', 'og:url', canonicalUrl);
  updateMetaTag('property', 'og:type', 'article');
  updateMetaTag('property', 'og:site_name', 'evonix technologies');
  updateMetaTag('property', 'og:locale', 'en_PK');
  updateMetaTag('property', 'og:image', DEFAULT_OG_IMAGE);

  updateMetaTag('name', 'twitter:card', 'summary_large_image');
  updateMetaTag('name', 'twitter:title', pageTitle);
  updateMetaTag('name', 'twitter:description', pageDesc);
  updateMetaTag('name', 'twitter:image', DEFAULT_OG_IMAGE);

  updateCanonicalLink(canonicalUrl);

  // Dynamic Breadcrumb for Blog Post: Home -> Guides -> Article
  const breadcrumb = buildBreadcrumbSchema([
    { name: 'Home', url: `${BASE_URL}/` },
    { name: 'Technical Guides', url: `${BASE_URL}/guides` },
    { name: blog.title, url: canonicalUrl },
  ]);

  // Article Schema
  const articleSchema = {
    '@type': 'TechArticle',
    '@id': `${canonicalUrl}#article`,
    headline: blog.title,
    description: blog.excerpt,
    datePublished: blog.publishedDate || '2025-01-15',
    dateModified: '2026-03-01',
    author: {
      '@type': 'Person',
      name: blog.author?.name || 'evonix Engineering Lead',
      jobTitle: blog.author?.role || 'Senior Diagnostic Engineer',
    },
    publisher: { '@id': `${BASE_URL}/#business` },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': canonicalUrl,
    },
    about: {
      '@type': 'Thing',
      name: blog.categoryLabel,
    },
    keywords: blog.targetKeywords.join(', '),
  };

  const graphElements: any[] = [breadcrumb, LOCAL_BUSINESS_SCHEMA, articleSchema];

  // Nested FAQ Schema when blog includes FAQs
  if (blog.faqs && blog.faqs.length > 0) {
    const faqSchema = {
      '@type': 'FAQPage',
      '@id': `${canonicalUrl}#faq`,
      mainEntity: blog.faqs.map((faq) => ({
        '@type': 'Question',
        name: faq.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: faq.answer,
        },
      })),
    };
    graphElements.push(faqSchema);
  }

  updateSubpageStructuredData({
    '@context': 'https://schema.org',
    '@graph': graphElements,
  });

  // Automatically ping search engines via IndexNow protocol for instant indexing
  pingIndexNow(canonicalUrl).catch(() => {});
}

/**
 * ============================================================================
 * INDEXNOW PROTOCOL IMPLEMENTATION
 * Direct search engine notification protocol (Microsoft Bing, Yandex, Seznam, Naver)
 * Key verification file: /7b3e1a8f9c0245d6812e947158ca92e4.txt
 * ============================================================================
 */
export const INDEXNOW_KEY = '7b3e1a8f9c0245d6812e947158ca92e4';
export const INDEXNOW_HOST = 'www.evonixtec.com';
export const INDEXNOW_KEY_LOCATION = `${BASE_URL}/${INDEXNOW_KEY}.txt`;
const INDEXNOW_CACHE_KEY = 'evonix_indexnow_cache_v1';

interface IndexNowCacheMap {
  [url: string]: number; // timestamp of last ping
}

/**
 * Decides whether a URL should be submitted (throttled to max 1 ping per 24 hours per URL)
 */
function shouldPingUrl(url: string): boolean {
  if (typeof window === 'undefined') return false;
  try {
    const raw = localStorage.getItem(INDEXNOW_CACHE_KEY);
    if (!raw) return true;
    const cache: IndexNowCacheMap = JSON.parse(raw);
    const lastPing = cache[url];
    if (!lastPing) return true;
    const oneDayMs = 24 * 60 * 60 * 1000;
    return Date.now() - lastPing > oneDayMs;
  } catch {
    return true;
  }
}

/**
 * Persists ping timestamp to localStorage
 */
function markUrlsAsPinged(urls: string[]) {
  if (typeof window === 'undefined') return;
  try {
    const raw = localStorage.getItem(INDEXNOW_CACHE_KEY);
    const cache: IndexNowCacheMap = raw ? JSON.parse(raw) : {};
    const now = Date.now();
    for (const u of urls) {
      cache[u] = now;
    }
    localStorage.setItem(INDEXNOW_CACHE_KEY, JSON.stringify(cache));
  } catch {
    // Ignore storage errors in private browsing
  }
}

/**
 * Pings IndexNow endpoints for one or more published URLs.
 * Works seamlessly in client-side environments without blocking user execution.
 */
export async function pingIndexNow(urls: string | string[]): Promise<boolean> {
  const urlList = (Array.isArray(urls) ? urls : [urls])
    .map((u) => (u.startsWith('http') ? u : `${BASE_URL}${u.startsWith('/') ? u : `/${u}`}`))
    .filter(shouldPingUrl);

  if (urlList.length === 0) {
    return false;
  }

  const payload = {
    host: INDEXNOW_HOST,
    key: INDEXNOW_KEY,
    keyLocation: INDEXNOW_KEY_LOCATION,
    urlList,
  };

  let submitted = false;

  // 1. Primary IndexNow Central API (broadcasts to Bing, Yandex, etc.)
  try {
    await fetch('https://api.indexnow.org/indexnow', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
      body: JSON.stringify(payload),
      mode: 'no-cors',
    });
    submitted = true;
  } catch {
    // Continue to fallback
  }

  // 2. Secondary Bing Direct Endpoint
  try {
    await fetch('https://www.bing.com/indexnow', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
      body: JSON.stringify(payload),
      mode: 'no-cors',
    });
    submitted = true;
  } catch {
    // Continue to fallback
  }

  // 3. Image Beacon Fallback for single URLs in restricted network modes
  if (urlList.length === 1 && typeof Image !== 'undefined') {
    try {
      const getEndpoint = `https://api.indexnow.org/indexnow?url=${encodeURIComponent(
        urlList[0]
      )}&key=${INDEXNOW_KEY}&keyLocation=${encodeURIComponent(INDEXNOW_KEY_LOCATION)}`;
      const beacon = new Image();
      beacon.src = getEndpoint;
      submitted = true;
    } catch {
      // Ignore
    }
  }

  if (submitted) {
    markUrlsAsPinged(urlList);
  }

  return submitted;
}

/**
 * Submits all blog posts to IndexNow protocol in a batch
 */
export async function submitAllBlogPostsToIndexNow(posts: BlogPost[]): Promise<boolean> {
  const urls = posts.map((p) => `${BASE_URL}/blog/${p.slug}`);
  return pingIndexNow(urls);
}

