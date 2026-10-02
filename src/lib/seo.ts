import { NavPageId } from '../components/Navbar';
import { BlogPost } from '../data/blogs';

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
const DEFAULT_OG_IMAGE = `${BASE_URL}/og-image.jpg`;

/**
 * Common LocalBusiness schema for EVONIX TECHNOLOGIES in Sialkot
 */
export const LOCAL_BUSINESS_SCHEMA = {
  '@type': 'LocalBusiness',
  '@id': `${BASE_URL}/#business`,
  name: 'EVONIX TECHNOLOGIES',
  alternateName: 'Evonix IT & Laptop Diagnostics Lab',
  image: DEFAULT_OG_IMAGE,
  url: `${BASE_URL}/`,
  telephone: '+92 326 324 4002',
  email: 'evonixtec@gmail.com',
  priceRange: 'PKR 1500 - PKR 85000',
  currenciesAccepted: 'PKR, USD, AED, EUR',
  paymentAccepted: 'Cash, Bank Transfer, EasyPaisa, JazzCash, Raast',
  hasMap: 'https://maps.google.com/?q=Kotli+Behram+Paris+Road+Sialkot',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Kotli Behram, Paris Road & Cantt Hub',
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
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.9',
    reviewCount: '128',
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
    'IT Consultancy',
    'Hardware Maintenance Services',
    'Industrial Factory IT Systems',
    'Chip-Level Motherboard Repair',
    'Retail POS Systems',
    'Custom Web Development',
    'Industrial Network Engineering',
  ],
  description:
    'Premier IT consultancy and industrial hardware maintenance services in Sialkot, delivering enterprise website engineering, custom retail POS systems, and chip-level motherboard & printer repair backed by 20+ years Dubai international experience.',
};

/**
 * Builds a valid Schema.org BreadcrumbList object
 */
export function buildBreadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    '@type': 'BreadcrumbList',
    '@id': `${items[items.length - 1].url}#breadcrumb`,
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
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
    '@id': `${BASE_URL}/services#laptop-repair`,
    name: 'Laptop & Desktop Motherboard Chip-Level Micro-Soldering Repair',
    serviceType: 'Computer Hardware Diagnostic & Repair',
    category: 'Hardware Repair',
    description:
      'Precision chip-level motherboard troubleshooting, 19V rail short-circuit injection, BGA chip rework, liquid damage ultrasonic cleaning, and cracked display replacement in Sialkot.',
    provider: { '@id': `${BASE_URL}/#business` },
    areaServed: [
      { '@type': 'AdministrativeArea', name: 'Paris Road Sialkot' },
      { '@type': 'AdministrativeArea', name: 'Sialkot Cantt' },
      { '@type': 'AdministrativeArea', name: 'Daska Road' },
    ],
    termsOfService: `${BASE_URL}/warranty-policy`,
    offers: {
      '@type': 'Offer',
      price: '2500',
      priceCurrency: 'PKR',
      priceValidUntil: '2026-12-31',
      availability: 'https://schema.org/InStock',
    },
  },
  {
    '@type': 'Service',
    '@id': `${BASE_URL}/services#printer-repair`,
    name: 'LaserJet & Thermal Receipt Printer Repair Sialkot',
    serviceType: 'Office Equipment & Printer Maintenance',
    category: 'Printer Servicing',
    description:
      'HP LaserJet 50.1/50.4 fuser error restoration, repeating defect distance roller replacement (OPC drum, PCR, fuser sleeve), and retail 80mm POS auto-cutter jam repairs.',
    provider: { '@id': `${BASE_URL}/#business` },
    areaServed: { '@type': 'City', name: 'Sialkot' },
    offers: {
      '@type': 'Offer',
      price: '1500',
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
      name: 'What IT consultancy and hardware maintenance services does EVONIX provide in Sialkot?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'EVONIX provides enterprise web engineering, custom retail POS software, factory IT infrastructure AMC contracts, WeBOC customs networking, and chip-level motherboard, laptop, and thermal printer repair backed by 20+ years of Dubai international experience.',
      },
    },
    {
      '@type': 'Question',
      name: 'Where is EVONIX located in Sialkot, and do you offer doorstep on-site visits?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Our diagnostic lab desk is located at Kotli Behram, Paris Road and Cantt Hub, Sialkot. We offer 15-minute to 60-minute doorstep dispatch across Sialkot City, Daska Road, Small Industrial Estate, Sambrial Dry Port, and Wazirabad.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can EVONIX repair laptop motherboards and thermal receipt printers at the chip level?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes, our certified hardware laboratory features stereo microscopes, DC bench power supplies, thermal infrared cameras, and precision SMD micro-soldering stations for component-level repair of blown MOSFETs, shorted capacitors, charging ICs, thermal printheads, and auto-cutters.',
      },
    },
    {
      '@type': 'Question',
      name: 'Does EVONIX develop custom export ERP and retail POS software?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes, EVONIX engineers custom offline-first POS systems, multilingual export trade portals, barcode inventory engines, and automated billing software tailored for Sialkot surgical, sportswear, leather, and retail businesses.',
      },
    },
    {
      '@type': 'Question',
      name: 'How can I request a free quote or book a technical consultation with EVONIX?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'You can request a free consultation directly through our website with GPS area detection, generate a tracking reference number, or message our engineering desk via WhatsApp at +92 326 324 4002.',
      },
    },
  ],
};

/**
 * Individual Schema.org Product objects for /shop and Google Merchant / Product snippets
 */
export const INDIVIDUAL_PRODUCTS_SCHEMAS = [
  {
    '@type': 'Product',
    '@id': `${BASE_URL}/shop#pos-dual-screen-15`,
    name: 'EVONIX All-in-One Dual-Screen Capacitive Touch POS Terminal (15.6" + 11.6")',
    image: DEFAULT_OG_IMAGE,
    description:
      'Heavy-duty industrial capacitive touch POS terminal for Sialkot supermarkets, pharmacies, and restaurants. Intel Core i5 processor, 8GB DDR4 RAM, 128GB High-Speed SSD with customer-facing display.',
    sku: 'EVO-POS-DS15',
    mpn: 'POS-DS-156-I5',
    brand: {
      '@type': 'Brand',
      name: 'EVONIX',
    },
    offers: {
      '@type': 'Offer',
      url: `${BASE_URL}/shop`,
      price: '68500',
      priceCurrency: 'PKR',
      priceValidUntil: '2026-12-31',
      itemCondition: 'https://schema.org/NewCondition',
      availability: 'https://schema.org/InStock',
      seller: { '@id': `${BASE_URL}/#business` },
      warranty: '1 Year Sialkot On-Site Warranty',
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      reviewCount: '48',
    },
  },
  {
    '@type': 'Product',
    '@id': `${BASE_URL}/shop#thermal-printer-80mm`,
    name: 'EVONIX Commercial 80mm High-Speed Thermal Receipt Printer with Auto-Cutter',
    image: DEFAULT_OG_IMAGE,
    description:
      'High-speed 260mm/s commercial 80mm thermal receipt printer with Japanese auto-cutter mechanism. USB + LAN + Cash Drawer interface, fully compatible with all retail POS software in Sialkot.',
    sku: 'EVO-PRN-80C',
    mpn: 'PRN-80-CUT-LAN',
    brand: {
      '@type': 'Brand',
      name: 'EVONIX',
    },
    offers: {
      '@type': 'Offer',
      url: `${BASE_URL}/shop`,
      price: '16500',
      priceCurrency: 'PKR',
      priceValidUntil: '2026-12-31',
      itemCondition: 'https://schema.org/NewCondition',
      availability: 'https://schema.org/InStock',
      seller: { '@id': `${BASE_URL}/#business` },
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.8',
      reviewCount: '62',
    },
  },
  {
    '@type': 'Product',
    '@id': `${BASE_URL}/shop#barcode-scanner-2d`,
    name: 'EVONIX Omnidirectional 2D & 1D Desktop Hands-Free Barcode Scanner',
    image: DEFAULT_OG_IMAGE,
    description:
      'High-precision optical CMOS desktop barcode scanner. Instant recognition of crumpled, damaged, or phone-screen QR codes and 1D retail barcodes. Plug-and-play USB for Sialkot shops.',
    sku: 'EVO-SCN-2D',
    mpn: 'SCN-OMNI-2D-USB',
    brand: {
      '@type': 'Brand',
      name: 'EVONIX',
    },
    offers: {
      '@type': 'Offer',
      url: `${BASE_URL}/shop`,
      price: '12800',
      priceCurrency: 'PKR',
      priceValidUntil: '2026-12-31',
      itemCondition: 'https://schema.org/NewCondition',
      availability: 'https://schema.org/InStock',
      seller: { '@id': `${BASE_URL}/#business` },
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      reviewCount: '39',
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
    brand: {
      '@type': 'Brand',
      name: 'Dell / HP',
    },
    offers: {
      '@type': 'Offer',
      url: `${BASE_URL}/shop`,
      price: '78000',
      priceCurrency: 'PKR',
      priceValidUntil: '2026-12-31',
      itemCondition: 'https://schema.org/RefurbishedCondition',
      availability: 'https://schema.org/InStock',
      seller: { '@id': `${BASE_URL}/#business` },
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.95',
      reviewCount: '74',
    },
  },
];

/**
 * Route-Specific SEO Metadata & Initial Schema Definitions
 */
export const SIALKOT_PAGE_SEO: Record<NavPageId, PageMetadata> = {
  home: {
    title: 'EVONIX TECHNOLOGIES – IT Consultancy & Hardware Maintenance Services in Sialkot',
    description:
      'Leading IT consultancy and industrial hardware maintenance services in Sialkot. Enterprise website engineering, retail POS systems, and factory IT support backed by 20+ years Dubai expertise.',
    ogTitle: 'EVONIX TECHNOLOGIES – IT Consultancy & Hardware Maintenance Services in Sialkot',
    ogDescription:
      'Industrial IT consultancy, hardware maintenance services, custom software, and chip-level computer repairs in Sialkot backed by 20+ years Dubai engineering excellence.',
    ogType: 'website',
    ogImage: DEFAULT_OG_IMAGE,
    canonicalUrl: `${BASE_URL}/`,
    keywords: [
      'IT consultancy Sialkot',
      'hardware maintenance services Sialkot',
      'industrial hardware maintenance Sialkot',
      'IT company in Sialkot',
      'factory IT infrastructure Sialkot',
      'IT maintenance contract Sialkot',
      'best software house in Sialkot',
      'website development Sialkot',
      'custom software development Sialkot',
      'retail POS system Sialkot',
      'computer repair in Sialkot',
      'laptop repairing Sialkot Cantt',
      'IT solutions Paris Road Sialkot',
      'Dubai IT experience in Pakistan',
    ],
  },

  services: {
    title: 'IT Consultancy & Hardware Maintenance Services Sialkot | EVONIX',
    description:
      'Premier IT consultancy & industrial hardware maintenance services in Sialkot: enterprise factory networks, AMC server support, custom POS, and motherboard repair.',
    ogTitle: 'IT Consultancy & Hardware Maintenance Services in Sialkot – EVONIX',
    ogDescription:
      'Full-suite industrial IT consultancy, hardware maintenance contracts, POS software, and motherboard repair with 20+ years Dubai technical excellence.',
    ogType: 'website',
    ogImage: DEFAULT_OG_IMAGE,
    canonicalUrl: `${BASE_URL}/services`,
    keywords: [
      'IT consultancy Sialkot',
      'hardware maintenance services Sialkot',
      'industrial hardware maintenance Sialkot',
      'IT maintenance contract AMC Sialkot',
      'factory IT support Sialkot',
      'IT services in Sialkot',
      'web development Sialkot',
      'website design company Sialkot',
      'custom POS software Sialkot',
      'point of sale retail Sialkot',
      'laptop repairing Sialkot',
      'printer repairing Sialkot',
      'motherboard chip level repair Sialkot',
      'CCTV camera installation Sialkot',
      'doorstep IT support Sialkot',
    ],
  },

  portfolio: {
    title: 'IT Portfolio Sialkot – Web & Enterprise Deployments | EVONIX',
    description:
      'Explore proven software and web development case studies for exporters and retail brands in Sialkot and Dubai. View our high-volume ERP and e-commerce work.',
    ogTitle: 'IT Portfolio Sialkot – Software & Web Projects by EVONIX',
    ogDescription:
      'High-volume e-commerce systems, custom export ERP portals, and POS deployments delivered for UAE and Sialkot enterprise clients.',
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
    title: 'IT Hardware & POS Shop Sialkot – Laptops & Printers | EVONIX',
    description:
      'Buy business laptops, touch POS terminals, 80mm thermal receipt printers, and barcode scanners in Sialkot with local warranty and doorstep setup. Order today.',
    ogTitle: 'IT Hardware & POS Shop Sialkot – Laptops, Printers & Scanners',
    ogDescription:
      'Imported commercial laptops, touch POS machines, thermal receipt printers, and barcode scanners available in Sialkot with local technical warranty.',
    ogType: 'website',
    ogImage: DEFAULT_OG_IMAGE,
    canonicalUrl: `${BASE_URL}/shop`,
    keywords: [
      'buy laptop in Sialkot',
      'business laptop Sialkot',
      'refurbished laptops Sialkot Paris Road',
      'POS machine price in Sialkot',
      'thermal receipt printer Sialkot',
      'barcode scanner Sialkot',
      'touch screen POS terminal Sialkot',
      'computer hardware shop Sialkot',
    ],
  },

  about: {
    title: 'About EVONIX – IT Consultancy & Engineering Heritage in Sialkot',
    description:
      'Discover how EVONIX brings 20+ years of high-availability Dubai IT consultancy and industrial hardware maintenance to Sialkot manufacturers and businesses.',
    ogTitle: 'About EVONIX – IT Consultancy & Engineering Heritage in Sialkot',
    ogDescription:
      '20+ years of Dubai enterprise IT engineering now operating in Sialkot. Learn about our leadership, diagnostic lab, and commitment to international standards.',
    ogType: 'website',
    ogImage: DEFAULT_OG_IMAGE,
    canonicalUrl: `${BASE_URL}/about`,
    keywords: [
      'about EVONIX Technologies',
      'IT consultancy Sialkot',
      'industrial hardware maintenance Sialkot',
      'IT company in Sialkot profile',
      'Dubai IT experience in Pakistan',
      'IT leadership Sialkot',
      'computer diagnostic lab Sialkot',
      'IT consultants Sialkot Cantt',
      'top tech company Sialkot Punjab',
    ],
  },

  guides: {
    title: 'Tech Blogs, IT Guides & Field Case Studies Sialkot | EVONIX',
    description:
      'Official EVONIX engineering blog & technical knowledge base for Sialkot: 85+ practical guides on printer repair, laptop overheating, retail POS, and chip-level restoration.',
    ogTitle: 'Tech Blogs, IT Guides & Field Case Studies in Sialkot – EVONIX',
    ogDescription:
      'Official engineering blogs, practical troubleshooting tutorials, and Daska Road & Rangpura on-site field case studies by EVONIX technicians.',
    ogType: 'website',
    ogImage: DEFAULT_OG_IMAGE,
    canonicalUrl: `${BASE_URL}/guides`,
    keywords: [
      'IT blogs Sialkot',
      'tech blog Sialkot',
      'laptop repair blog',
      'thermal printer troubleshooting Sialkot',
      'IT troubleshooting guides Sialkot',
      'computer repair guide Sialkot',
      'laptop repairing Daska Road Sialkot',
      'doorstep laptop repair Rangpura',
      'POS printer error fix Pakistan',
      'laptop motherboard repair guide Sialkot',
      'web development guide Sialkot',
      'Sialkot IT knowledge hub',
      'Daska Road IT solutions Sialkot',
      'Rangpura IT support Sialkot',
    ],
  },

  contact: {
    title: 'Contact IT Consultants Sialkot – Kotli Behram & Paris Road | EVONIX',
    description:
      'Got a question? Call us. We reply in 2 hours. Doorstep IT support in Kotli Behram, Paris Road, and Sialkot Cantt. Free bench diagnosis.',
    ogTitle: 'Contact EVONIX – IT Support in Kotli Behram & Paris Road Sialkot',
    ogDescription:
      'Got a question? Call us. We reply in 2 hours. Rapid doorstep dispatch across Kotli Behram, Cantt, Sambrial, and Daska Road.',
    ogType: 'website',
    ogImage: DEFAULT_OG_IMAGE,
    canonicalUrl: `${BASE_URL}/contact`,
    keywords: [
      'contact IT consultant Sialkot',
      'computer repair Kotli Behram Sialkot',
      'laptop repairing Kotli Behram Sialkot',
      'doorstep IT technician Kotli Behram Sialkot',
      'hardware maintenance services contact Sialkot',
      'industrial IT support Sialkot',
      'contact IT company Sialkot',
      'computer technician home service Sialkot',
      'on-site IT support Sialkot',
      'laptop repair contact Paris Road Sialkot',
      'IT support WhatsApp Sialkot',
      'urgent computer repair Sialkot Cantt',
      'IT engineer visit Sialkot',
    ],
  },

  locations: {
    title: 'Local IT Services Hub – Daska, Sambrial & Wazirabad | EVONIX TECHNOLOGIES',
    description:
      'Doorstep industrial IT consultancy, hardware maintenance, retail POS systems, and chip-level motherboard repair across Daska, Sambrial, and Wazirabad with 25-45 min field dispatch.',
    ogTitle: 'EVONIX Local Hubs – Daska, Sambrial & Wazirabad On-Site IT Support',
    ogDescription:
      'High-priority industrial IT engineering, WeBOC server maintenance, and laptop repair across the Sialkot-Daska-Sambrial-Wazirabad industrial corridor.',
    ogType: 'website',
    ogImage: DEFAULT_OG_IMAGE,
    canonicalUrl: `${BASE_URL}/locations`,
    keywords: [
      'IT company Daska',
      'laptop repairing Daska Road Sialkot',
      'hardware maintenance Sambrial',
      'IT support Sambrial Dry Port',
      'computer repair Wazirabad',
      'cutlery website developer Wazirabad',
      'POS software Daska',
      'retail billing software Wazirabad',
      'on-site IT support Sambrial',
      'Sialkot industrial IT triangle',
    ],
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
function updateCanonicalLink(url: string) {
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
  const meta = SIALKOT_PAGE_SEO[pageId];
  const graph: object[] = [];

  // 1. BreadcrumbList for every route
  const breadcrumbItems = [{ name: 'Home', url: `${BASE_URL}/` }];

  if (pageId === 'services') {
    breadcrumbItems.push({ name: 'IT & Software Services', url: `${BASE_URL}/services` });
  } else if (pageId === 'portfolio') {
    breadcrumbItems.push({ name: 'Enterprise Portfolio', url: `${BASE_URL}/portfolio` });
  } else if (pageId === 'shop') {
    breadcrumbItems.push({ name: 'IT Hardware & POS Shop', url: `${BASE_URL}/shop` });
  } else if (pageId === 'about') {
    breadcrumbItems.push({ name: 'About EVONIX & Dubai Heritage', url: `${BASE_URL}/about` });
  } else if (pageId === 'guides') {
    breadcrumbItems.push({ name: 'Tech Blogs & Guides', url: `${BASE_URL}/guides` });
  } else if (pageId === 'contact') {
    breadcrumbItems.push({ name: 'Contact & On-Site Support', url: `${BASE_URL}/contact` });
  }

  graph.push(buildBreadcrumbSchema(breadcrumbItems));

  // 2. Core LocalBusiness Provider
  graph.push(LOCAL_BUSINESS_SCHEMA);

  // 3. Route-Specific Entities
  if (pageId === 'home') {
    graph.push({
      '@type': 'WebSite',
      '@id': `${BASE_URL}/#website`,
      url: `${BASE_URL}/`,
      name: 'EVONIX TECHNOLOGIES',
      description: meta.description,
      publisher: { '@id': `${BASE_URL}/#business` },
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
      name: 'EVONIX Sialkot IT & Engineering Services Catalog',
      itemListElement: INDIVIDUAL_SERVICES_SCHEMAS.map((svc) => ({
        '@type': 'Service',
        name: svc.name,
        url: `${BASE_URL}/services`,
        description: svc.description,
      })),
    });

    // Inject all individual Service schemas
    INDIVIDUAL_SERVICES_SCHEMAS.forEach((svc) => graph.push(svc));
  } else if (pageId === 'shop') {
    // Store entity
    graph.push({
      '@type': 'Store',
      '@id': `${BASE_URL}/shop#store`,
      name: 'EVONIX IT Hardware & POS Equipment Shop',
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
        name: 'EVONIX TECHNOLOGIES',
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
export function applyPageSEO(pageId: NavPageId) {
  const meta = SIALKOT_PAGE_SEO[pageId] || SIALKOT_PAGE_SEO.home;

  // Title
  document.title = meta.title;

  // Primary Meta
  updateMetaTag('name', 'description', meta.description);
  updateMetaTag('name', 'keywords', meta.keywords.join(', '));

  // Open Graph
  updateMetaTag('property', 'og:title', meta.ogTitle);
  updateMetaTag('property', 'og:description', meta.ogDescription);
  updateMetaTag('property', 'og:url', meta.canonicalUrl);
  updateMetaTag('property', 'og:type', meta.ogType);
  updateMetaTag('property', 'og:site_name', 'EVONIX TECHNOLOGIES');
  updateMetaTag('property', 'og:locale', 'en_PK');
  if (meta.ogImage) {
    updateMetaTag('property', 'og:image', meta.ogImage);
  }

  // Twitter / X
  updateMetaTag('name', 'twitter:card', 'summary_large_image');
  updateMetaTag('name', 'twitter:title', meta.ogTitle);
  updateMetaTag('name', 'twitter:description', meta.ogDescription);
  if (meta.ogImage) {
    updateMetaTag('name', 'twitter:image', meta.ogImage);
  }

  // Canonical URL
  updateCanonicalLink(meta.canonicalUrl);

  // Geo / Local Sialkot meta tags
  updateMetaTag('name', 'geo.region', 'PK-PB');
  updateMetaTag('name', 'geo.placename', 'Sialkot');
  updateMetaTag('name', 'geo.position', '32.4945;74.5229');
  updateMetaTag('name', 'ICBM', '32.4945, 74.5229');

  // Brand Tagline & Micro-kicker meta
  updateMetaTag('name', 'tagline', 'Dubai Precision Engineering • Sialkot Tech Hub');
  updateMetaTag('name', 'author', 'EVONIX TECHNOLOGIES');

  // Dynamically inject Schema.org JSON-LD @graph for the route
  const structuredData = generateRouteStructuredData(pageId);
  updateSubpageStructuredData(structuredData);
}

/**
 * Sets dynamic SEO for an active blog / technical guide post reader view
 */
export function applyBlogPostSEO(blog: BlogPost) {
  const pageTitle = `${blog.title.slice(0, 48)} | EVONIX Sialkot`;
  const pageDesc = blog.excerpt.length > 155 ? `${blog.excerpt.slice(0, 152)}...` : blog.excerpt;
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
      'EVONIX Technologies',
    ].join(', ')
  );

  updateMetaTag('property', 'og:title', `${blog.title} – EVONIX Sialkot`);
  updateMetaTag('property', 'og:description', pageDesc);
  updateMetaTag('property', 'og:url', canonicalUrl);
  updateMetaTag('property', 'og:type', 'article');
  updateMetaTag('property', 'og:site_name', 'EVONIX TECHNOLOGIES');
  updateMetaTag('property', 'og:locale', 'en_PK');
  updateMetaTag('property', 'og:image', DEFAULT_OG_IMAGE);

  updateMetaTag('name', 'twitter:card', 'summary_large_image');
  updateMetaTag('name', 'twitter:title', `${blog.title} – EVONIX Sialkot`);
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
      name: blog.author?.name || 'EVONIX Engineering Lead',
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

  updateSubpageStructuredData({
    '@context': 'https://schema.org',
    '@graph': [breadcrumb, LOCAL_BUSINESS_SCHEMA, articleSchema],
  });
}
