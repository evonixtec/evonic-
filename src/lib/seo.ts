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
 * Common LocalBusiness schema for evonix technologies in Sialkot
 */
export const LOCAL_BUSINESS_SCHEMA = {
  '@type': 'LocalBusiness',
  '@id': `${BASE_URL}/#business`,
  name: 'evonix technologies',
  alternateName: 'evonix IT & Laptop Diagnostics Lab',
  image: DEFAULT_OG_IMAGE,
  url: `${BASE_URL}/`,
  telephone: '+92 326 324 4002',
  email: 'evonixtec@gmail.com',
  priceRange: 'PKR 1500 - PKR 85000',
  currenciesAccepted: 'PKR, USD, AED, EUR',
  paymentAccepted: 'Cash, Bank Transfer, EasyPaisa, JazzCash, Raast',
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
    brand: {
      '@type': 'Brand',
      name: 'evonix',
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
    brand: {
      '@type': 'Brand',
      name: 'evonix',
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
    brand: {
      '@type': 'Brand',
      name: 'evonix',
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
  },
];

/**
 * Route-Specific SEO Metadata & Initial Schema Definitions
 */
export const SIALKOT_PAGE_SEO: Record<NavPageId, PageMetadata> = {
  home: {
    title: 'evonix technologies – IT Consultancy & Hardware Maintenance Services in Sialkot',
    description:
      'Leading IT consultancy and industrial hardware maintenance services in Sialkot. Enterprise website engineering, retail POS systems, and factory IT support backed by 20+ years Dubai expertise.',
    ogTitle: 'evonix technologies – IT Consultancy & Hardware Maintenance Services in Sialkot',
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
    title: 'IT Consultancy & Hardware Maintenance Services Sialkot | evonix',
    description:
      'Premier IT consultancy & industrial hardware maintenance services in Sialkot: enterprise factory networks, AMC server support, custom POS, and motherboard repair.',
    ogTitle: 'IT Consultancy & Hardware Maintenance Services in Sialkot – evonix',
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
    title: 'IT Portfolio Sialkot – Web & Enterprise Deployments | evonix',
    description:
      'Proven software and web development case studies for exporters and retail brands in Sialkot and Dubai. View our high-volume ERP and e-commerce work.',
    ogTitle: 'IT Portfolio Sialkot – Software & Web Projects by evonix',
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
    title: 'IT Hardware & POS Shop Sialkot – Laptops & Printers | evonix',
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
    title: 'About evonix – IT Consultancy & Engineering Heritage in Sialkot',
    description:
      'evonix brings 20+ years of high-availability Dubai IT consultancy and industrial hardware maintenance to Sialkot manufacturers and businesses.',
    ogTitle: 'About evonix – IT Consultancy & Engineering Heritage in Sialkot',
    ogDescription:
      '20+ years of Dubai enterprise IT engineering now operating in Sialkot. Learn about our leadership, diagnostic lab, and commitment to international standards.',
    ogType: 'website',
    ogImage: DEFAULT_OG_IMAGE,
    canonicalUrl: `${BASE_URL}/about`,
    keywords: [
      'about evonix Technologies',
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
    title: 'Tech Blogs, IT Guides & Field Case Studies Sialkot | evonix',
    description:
      'Official evonix engineering blog & technical knowledge base for Sialkot: 85+ practical guides on printer repair, laptop overheating, retail POS, and chip-level restoration.',
    ogTitle: 'Tech Blogs, IT Guides & Field Case Studies in Sialkot – evonix',
    ogDescription:
      'Official engineering blogs, practical troubleshooting tutorials, and Daska Road & Rangpura on-site field case studies by evonix technicians.',
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
    title: 'Contact IT Consultants Sialkot – Kotli Behram & Paris Road | evonix',
    description:
      'Got a question? Call us. We reply in 2 hours. Doorstep IT support in Kotli Behram, Paris Road, and Sialkot Cantt. Free bench diagnosis.',
    ogTitle: 'Contact evonix – IT Support in Kotli Behram & Paris Road Sialkot',
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
    title: 'Local IT Services Hub – Daska, Sambrial & Wazirabad | evonix technologies',
    description:
      'Doorstep industrial IT consultancy, hardware maintenance, retail POS systems, and chip-level motherboard repair across Daska, Sambrial, and Wazirabad with 25-45 min field dispatch.',
    ogTitle: 'evonix Local Hubs – Daska, Sambrial & Wazirabad On-Site IT Support',
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

  invoice: {
    title: 'Free Global Micro-Invoice Generator - No Signup, 150+ Currencies, Instant PDF | evonix',
    description:
      'Free online invoice generator for freelance billing and small business invoicing. Create multi-currency commercial invoices in browser with paper-style editor, automatic tax calculation, and instant A4 PDF download. No signup required.',
    ogTitle: 'Free Global Micro-Invoice Generator - No Signup, 150+ Currencies, Instant PDF',
    ogDescription:
      'Create invoice in browser, data never leaves your device. Free multi-currency commercial invoices for freelancers and exporters with automatic tax calculations and instant A4 PDF.',
    ogType: 'website',
    ogImage: `${BASE_URL}/images/micro-invoice-generator-2026.png`,
    canonicalUrl: `${BASE_URL}/invoice`,
    keywords: [
      'invoice generator',
      'free invoice generator',
      'online invoice generator',
      'micro invoice',
      'freelance invoice maker',
      'freelance billing',
      'small business invoicing',
      'multi-currency invoice',
      'paper-style editor',
      'automatic tax calculation',
      'free commercial invoice generator',
      'zero database invoice generator',
      'instant pdf invoice',
      'online invoice maker free',
      'free invoice generator pakistan',
      'code128 barcode invoice generator',
      'multi currency invoice maker',
    ],
  },

  'ecommerce-calculator': {
    title: 'E-Commerce Profit & Courier Shipping Margin Calculator | evonix Technologies',
    description:
      'Free zero-database e-commerce margin calculator. Real-time Leopards, TCS, Trax, PostEx courier tariffs, COD handling charges, marketing CAC, and RTO return loss simulator.',
    ogTitle: 'E-Commerce Margin & Courier Tariff Calculator | evonix Technologies',
    ogDescription:
      'Calculate unit economics, multi-courier rates, COD handling fees, break-even targets, and Pakistani return rate risk cushions with zero remote database tracking.',
    ogType: 'website',
    ogImage: `${BASE_URL}/images/ecommerce-calculator-2026.png`,
    canonicalUrl: `${BASE_URL}/ecommerce-calculator`,
    keywords: [
      'E-Commerce_Profit_and_Loss',
      'ecommerce profit calculator pakistan',
      'courier shipping margin calculator',
      'leopards courier rates calculator',
      'tcs cod tariff calculator',
      'trax shipping cost calculator',
      'postex cod fee calculator',
      'ecommerce unit economics calculator',
      'cash on delivery margin calculator',
      'shopify pakistan profit calculator',
      'daraz margin calculator',
      'rto return rate loss calculator',
    ],
  },

  'cbm-calculator': {
    title: 'Export CBM & Volumetric Shipping Cargo Calculator | evonix Technologies',
    description:
      'Free B2B export CBM calculator. Instant Cubic Meters computations, DHL/FedEx and air cargo volumetric weights, and 20ft/40ft ocean container space utilization.',
    ogTitle: 'Export CBM & Freight Volumetric Weight Engine | evonix Technologies',
    ogDescription:
      'Compute carton volume in CBM, air cargo dimensional weights, and container packing capacity instantly with zero remote database tracking.',
    ogType: 'website',
    ogImage: `${BASE_URL}/images/cbm-calculator-2026.png`,
    canonicalUrl: `${BASE_URL}/cbm-calculator`,
    keywords: [
      'Compute_industrial_cargo',
      'cbm calculator',
      'export cbm calculator',
      'cubic meter calculator shipping',
      'air freight volumetric weight calculator',
      'dhl dimensional weight calculator',
      '20ft container cbm capacity',
      '40ft container cbm calculator',
      'sialkot export shipping calculator',
      'freight forwarder cbm tool',
      'chargeable weight calculator',
    ],
  },

  'developer-cost-calculator': {
    title: 'Dedicated Developer Cost Calculator - Save 70% | evonix',
    description:
      'Calculate cost to hire dedicated developers via evonix Technologies Sialkot. Senior dev at $22/hr vs $80/hr in USA. Save $111k/year. Get CVs in 24h.',
    ogTitle: 'Dedicated Developer Cost Calculator - Save 70% | evonix',
    ogDescription:
      'Calculate cost to hire dedicated developers via evonix Technologies Sialkot. Senior dev at $22/hr vs $80/hr in USA. Save $111k/year. Get CVs in 24h.',
    ogType: 'website',
    ogImage: `${BASE_URL}/images/developer-cost-calculator-2026.png`,
    canonicalUrl: `${BASE_URL}/hire-dedicated-developer-cost-calculator-pune-india`,
    keywords: [
      'Developer_cost_calculator',
      'hire dedicated developer cost calculator pakistan',
      'hire dedicated developer cost calculator',
      'cost to hire developer in india',
      'hire dedicated developer cost',
      'hire developer in pune cost',
      'cost to hire dedicated developer from pakistan',
      'cost to hire software engineer',
      'offshore developer hourly rate',
      'evonix technologies developer rates',
    ],
  },

  'ai-visibility-checker': {
    title: 'Website E-E-A-T & AI Visibility Checker | evonix Technologies',
    description:
      'Free client-side Google E-E-A-T & Generative Engine Optimization (GEO) checker. Audit your domain readiness for ChatGPT, Claude, and Google AI Overviews.',
    ogTitle: 'Website E-E-A-T & AI Visibility Checker | evonix Technologies',
    ogDescription:
      'Free client-side Google E-E-A-T & Generative Engine Optimization (GEO) checker. Audit your domain readiness for ChatGPT, Claude, and Google AI Overviews.',
    ogType: 'website',
    ogImage: `${BASE_URL}/images/ai-visibility-checker-2026.png`,
    canonicalUrl: `${BASE_URL}/ai-visibility-checker`,
    keywords: [
      'ai visibility checker',
      'website eeat checker',
      'generative engine optimization tool',
      'geo audit tool',
      'chatgpt website visibility',
      'google ai overview audit',
      'claude citation readiness',
      'llm citation probability',
      'brand entity node optimization',
      'evonix technologies seo tools',
    ],
  },

  tools: {
    title: 'Online Web Tools Portfolio & Engineering Calculators | evonix',
    description:
      'Suite of zero-database client-side web tools by evonix: Free Invoice Generator, Export Barcode Studio, CBM Freight Engine, E-Com Margin Simulator, and Diagnostic Lab bench utilities.',
    ogTitle: 'Online Web Tools Portfolio | evonix Technologies',
    ogDescription:
      'Zero-database, 100% client-side web tools and calculators for international exporters, freelancers, e-commerce stores, and electronics technicians.',
    ogType: 'website',
    ogImage: DEFAULT_OG_IMAGE,
    canonicalUrl: `${BASE_URL}/tools`,
    keywords: [
      'online tools portfolio',
      'web tools hub',
      'free business calculators',
      'zero database tools',
      'client side engineering tools',
      'sialkot export utilities',
      'evonix online tools',
    ],
  },

  'export-barcode-studio': {
    title: 'Export Barcode Label Studio – GS1-128 & Carton Labels | evonix',
    description:
      'Generate compliant thermal shipping carton barcode labels for surgical instruments, sports goods, and leather exports. 4x6 direct thermal, GS1-128, and Code 128 vector rendering.',
    ogTitle: 'Export Barcode Label Studio | evonix Technologies',
    ogDescription:
      'Compliant outer carton thermal barcode generator for Sialkot exporters. GS1-128, Code 128, and instant 203 DPI thermal printing.',
    ogType: 'website',
    ogImage: `${BASE_URL}/images/export-barcode-studio-2026.png`,
    canonicalUrl: `${BASE_URL}/export-barcode-studio`,
    keywords: [
      'export barcode label studio',
      'gs1 128 carton barcode generator',
      'shipping label maker 4x6',
      'surgical instrument barcode label',
      'thermal printer barcode generator',
      'code 128 barcode generator pakistan',
    ],
  },

  'live-repair-tracker': {
    title: 'Live RMA Bench Repair Status Tracker | evonix Technologies',
    description:
      'Track your diagnostic bench repair ticket in real-time. Check motherboard micro-soldering progress, standby current logs, and 90-day warranty certificates in Sialkot.',
    ogTitle: 'Live RMA Bench Repair Tracker | evonix Technologies',
    ogDescription:
      'Live RMA tracking for motherboard, laptop, and printer repairs in Sialkot. Real-time technician bench notes and voltage readings.',
    ogType: 'website',
    ogImage: `${BASE_URL}/images/live-repair-tracker-2026.png`,
    canonicalUrl: `${BASE_URL}/live-repair-tracker`,
    keywords: [
      'live repair tracker',
      'rma status tracking sialkot',
      'laptop repair tracking online',
      'micro soldering ticket status',
      'evonix repair desk',
    ],
  },

  'printer-diagnostics': {
    title: 'Thermal Receipt & POS Printer Diagnostic Engine | evonix',
    description:
      'Interactive step-by-step troubleshooter for 80mm ESC/POS thermal printers, paper jams, blurred barcodes, cutter lockups, and Windows POS driver issues.',
    ogTitle: 'Printer Diagnostic Troubleshooter | evonix Technologies',
    ogDescription:
      'Diagnose and fix thermal receipt printer defects, cutter jams, and ESC/POS communication errors with interactive decision trees.',
    ogType: 'website',
    ogImage: `${BASE_URL}/images/printer-diagnostics-2026.png`,
    canonicalUrl: `${BASE_URL}/printer-diagnostics`,
    keywords: [
      'thermal printer diagnostic tool',
      'esc pos printer troubleshooter',
      'receipt printer repair sialkot',
      '80mm printer paper jam fix',
      'barcode printer troubleshooting',
    ],
  },

  'factory-network-tester': {
    title: 'Factory ERP & Customs Network Latency Benchmark | evonix',
    description:
      'Benchmark factory premise network latency, SQL server database sync times, and WeBOC customs gateway ping stability in Sialkot export industrial zones.',
    ogTitle: 'Factory Network Latency Benchmark | evonix Technologies',
    ogDescription:
      'Real-time network latency, jitter, and packet loss tester for Sialkot export manufacturing factories and customs portals.',
    ogType: 'website',
    ogImage: `${BASE_URL}/images/factory-network-tester-2026.png`,
    canonicalUrl: `${BASE_URL}/factory-network-tester`,
    keywords: [
      'factory network latency test',
      'weboc customs ping stability',
      'erp database latency benchmark',
      'dual wan failover tester',
      'sialkot industrial network diagnostics',
    ],
  },

  'ai-travel-tools': {
    title: 'Tools Required for Artificial Intelligence: 10 Best AI Tools Name for Travel Itinerary [2026 Tested]',
    description:
      'What are the best AI tools for travel planning in 2026? Find top 10 AI tools name, tools required for AI trip planning, flights & vacation planning + FREE tool.',
    ogTitle: 'Tools Required for Artificial Intelligence: 10 Best AI Tools Name for Travel Itinerary [2026 Tested]',
    ogDescription:
      'What are the best AI tools for travel planning in 2026? Find top 10 AI tools name, tools required for AI trip planning, flights & vacation planning + FREE tool.',
    ogType: 'article',
    ogImage: DEFAULT_OG_IMAGE,
    canonicalUrl: `${BASE_URL}/ai-tools-name-for-travel-itinerary`,
    keywords: [
      'ai tools name',
      'tools required for artificial intelligence',
      'ai tools for travel itinerary',
      'best ai tools for travel planning',
      'ai tools for flights',
      'ai tools for vacation planning',
      'ai travel tools',
      'trip planner ai',
      'itinerary generator',
    ],
  },

  'ai-trip-planner': {
    title: 'AI Trip Planner: Free Day-by-Day Vacation Itinerary Generator | EVONIX',
    description:
      'Free AI travel itinerary generator. Enter your destination, budget, and days to generate an instant day-wise vacation schedule with food spots, costs & transit advice.',
    ogTitle: 'AI Trip Planner: Free Day-by-Day Vacation Itinerary Generator',
    ogDescription:
      'Free AI travel itinerary generator. Enter your destination, budget, and days to generate an instant day-wise vacation schedule with food spots, costs & transit advice.',
    ogType: 'website',
    ogImage: `${BASE_URL}/images/ai-trip-planner-2026.png`,
    canonicalUrl: `${BASE_URL}/tools/ai-trip-planner`,
    keywords: [
      'Ai Trip Planner',
      'ai trip planner',
      'free itinerary generator',
      'travel itinerary ai',
      'vacation planning ai',
      'trip planner free',
    ],
  },
  admin: {
    title: 'Admin Security Hub | evonix technologies',
    description: 'Internal protected security management console for evonix engineering staff in Kotli Behram, Sialkot.',
    canonicalUrl: `${BASE_URL}/admin`,
    ogTitle: 'Admin Security Hub | evonix technologies',
    ogDescription: 'Internal protected management console.',
    ogType: 'website',
    ogImage: `${BASE_URL}/og-image.jpg`,
    keywords: ['admin security', 'internal portal'],
  },
  'doorstep-support': {
    title: 'Doorstep IT Support & On-Site Hardware Repair Sialkot | evonix',
    description:
      'Emergency doorstep IT engineer dispatch in Sialkot, Sambrial, Daska & Wazirabad. 45-min arrival for factory POS, server crashes, and network failure.',
    canonicalUrl: `${BASE_URL}/services/doorstep-support`,
    ogTitle: 'Doorstep IT Support & On-Site Hardware Repair in Sialkot',
    ogDescription:
      'Fast on-site tech support in Sialkot. Certified engineers reach your shop or factory within 45 minutes.',
    ogType: 'website',
    ogImage: DEFAULT_OG_IMAGE,
    keywords: [
      'doorstep IT support Sialkot',
      'on-site computer repair Sialkot',
      'factory network repair Sialkot',
      'POS emergency support Sialkot',
      'IT engineer visit Sialkot',
    ],
  },
  'sialkot-export-erp': {
    title: 'Sialkot Export Manufacturing ERP & WeBOC Cloud Billing Suite | evonix',
    description:
      'Industrial ERP software for Sialkot surgical, leather, and sports exporters. Complete batch traceability, multi-currency invoicing, and WeBOC customs sync.',
    canonicalUrl: `${BASE_URL}/sialkot-export-erp`,
    ogTitle: 'Sialkot Export Manufacturing ERP & Customs Suite',
    ogDescription:
      'Industrial ERP software built for Sialkot export factories. Track batches, orders, and customs declarations.',
    ogType: 'website',
    ogImage: DEFAULT_OG_IMAGE,
    keywords: [
      'sialkot export erp',
      'surgical manufacturing erp sialkot',
      'leather factory erp sialkot',
      'weboc billing software',
      'customs erp sialkot',
    ],
  },
  guidelines: {
    title: 'IT Infrastructure & Hardware Engineering Guidelines | evonix',
    description:
      'Technical guidelines for industrial factory networks, server data backup, and motherboard diagnostics in Sialkot export manufacturing.',
    canonicalUrl: `${BASE_URL}/guidelines`,
    ogTitle: 'IT Infrastructure & Hardware Engineering Guidelines',
    ogDescription:
      'Clear tech guidelines for factory networks, server backups, and hardware repair.',
    ogType: 'article',
    ogImage: DEFAULT_OG_IMAGE,
    keywords: [
      'it guidelines sialkot',
      'hardware repair guidelines',
      'factory network best practices',
      'server backup guidelines',
      'tech guidelines',
    ],
  },
  'ebay-fee-calculator': {
    title: 'eBay Fee & Profit Calculator 2026 | Accurate Seller Margins | evonix',
    description:
      'Free eBay fee and profit calculator. Calculate final value fees, promoted ads, shipping costs, and net margins across US, UK, Germany, UAE, and Pakistan.',
    canonicalUrl: `${BASE_URL}/ebay-fee-calculator`,
    ogTitle: 'eBay Fee & Profit Calculator 2026',
    ogDescription:
      'Calculate eBay seller fees, promoted listings, and net profits accurately with live currency conversions.',
    ogType: 'website',
    ogImage: `${BASE_URL}/images/ebay-fee-calculator-2026.png`,
    keywords: [
      'ebay fee calculator',
      'ebay profit calculator',
      'ebay seller fee calculator',
      'ebay final value fee calculator',
      'ebay margin calculator',
      'ebay calculator pakistan',
    ],
  },
  'uk-eu-vat-calculator': {
    title: 'UK & EU VAT Reverse Charge & VAT MOSS Engine | evonix',
    description:
      'Automate HMRC Section 55A and EU Directive 2006/112/EC 0% reverse charge VAT exemptions and statutory invoice clauses for international B2B exporters.',
    canonicalUrl: `${BASE_URL}/uk-eu-vat-calculator`,
    ogTitle: 'UK & EU VAT Reverse Charge & VAT MOSS Engine',
    ogDescription:
      'HMRC Section 55A and EU Directive 2006/112/EC reverse charge calculator with automated compliance notes.',
    ogType: 'website',
    ogImage: `${BASE_URL}/images/uk-eu-vat-calculator-2026.png`,
    keywords: [
      'uk eu vat calculator',
      'vat reverse charge calculator',
      'hmrc section 55a invoice clause',
      'eu directive 2006 112 ec vat exemption',
      'cross border vat b2b calculator',
    ],
  },
  'us-duty-nexus-estimator': {
    title: 'US Customs Tariff & Section 321 De Minimis Calculator | evonix',
    description:
      'Calculate US CBP tariffs, verify the $800 duty-free Section 321 entry eligibility, and estimate landed costs for US buyers.',
    canonicalUrl: `${BASE_URL}/us-duty-nexus-estimator`,
    ogTitle: 'US Customs Tariff & Section 321 De Minimis Calculator',
    ogDescription:
      'US CBP customs tariffs, Section 321 $800 de minimis qualification, and landed cost calculator.',
    ogType: 'website',
    ogImage: `${BASE_URL}/images/us-duty-nexus-estimator-2026.png`,
    keywords: [
      'us duty nexus calculator',
      'section 321 de minimis calculator',
      'us cbp import tariff calculator',
      'hts duty calculator',
      'landed cost us customs',
    ],
  },
  'ce-ukca-compliance-generator': {
    title: 'UKCA & CE Declaration of Conformity (DoC) Generator | evonix',
    description:
      'Generate audited technical Declaration of Conformity documents for CE Marking (EU MDR Class I) and UKCA tenders.',
    canonicalUrl: `${BASE_URL}/ce-ukca-compliance-generator`,
    ogTitle: 'UKCA & CE Declaration of Conformity Generator',
    ogDescription:
      'Create compliant CE and UKCA declarations of conformity for international tenders.',
    ogType: 'website',
    ogImage: `${BASE_URL}/images/ce-ukca-compliance-generator-2026.png`,
    keywords: [
      'ce ukca compliance generator',
      'declaration of conformity generator',
      'eu mdr class 1 doc',
      'ukca tender declaration template',
      'ce marking technical file exporter',
    ],
  },
  'tiktok-shop-fee-calculator': {
    title: 'TikTok Shop Fee Calculator UK 9% & US 6%/8% - 2026 Commission Calculator | evonix',
    description:
      'Calculate TikTok Shop UK 9% commission (VAT inclusive), US 6% official & 8% reported fees, EU 9% rates, and Pakistan cross-border seller margins. Complete 2026 payout breakdown.',
    canonicalUrl: `${BASE_URL}/tiktok-shop-fee-calculator`,
    ogTitle: 'TikTok Shop Fee Calculator UK 9% & Pakistan 2026',
    ogDescription:
      'Updated for UK 9% commission, US 6%/8% toggle, and Pakistan seller accounts. Calculate exact TikTok Shop referral fees, VAT, creator commissions, and net profit margins.',
    ogType: 'website',
    ogImage: `${BASE_URL}/images/tiktok-shop-fee-calculator-2026.png`,
    keywords: [
      'TikTok Shop Fee Calculator UK 9% & US 6%/8% - 2026 Commission Calculator',
      'tiktok shop fee calculator uk 9%',
      'tiktok shop fee calculator us 6% 8%',
      'tiktok shop fee in uk 2026',
      'tiktok shop fee in us 2026',
      'tiktok shop commission calculator pakistan',
      'tiktok shop 9% commission fee uk',
      'tiktok shop uk seller fees vat',
      'tiktok shop commission calculator',
      'tiktok seller calculator uk',
      'tiktok shop fees explained',
      'tiktok shop profit calculator',
      'tiktok shop margin calculator',
      'tiktok shop creator affiliate commission',
      'tiktok shop pakistan seller payout',
    ],
  },
  'amazon-fba-calculator': {
    title: 'Amazon FBA Fee Calculator 2026 - Profit, Referral, Fulfillment + Fuel Surcharge',
    description:
      '2026 updated Amazon FBA Fee Calculator. Calculate referral fee (8-45%), FBA fulfillment fee, 3.5% fuel surcharge, Oct 15 - Jan 14 peak fee $0.32, storage, inbound placement & net profit.',
    canonicalUrl: `${BASE_URL}/amazon-fba-fee-calculator`,
    ogTitle: 'Amazon FBA Fee Calculator 2026 - Profit, Referral, Fulfillment + Fuel Surcharge',
    ogDescription:
      'Calculate Amazon FBA fees with 2026 rates: Referral, Fulfillment, Fuel 3.5%, Peak Season & Net Profit.',
    ogType: 'website',
    ogImage: `${BASE_URL}/images/amazon-fba-fee-calculator-2026.png`,
    keywords: [
      'Amazon FBA Calculator',
      'FBA profit calculator',
      'Amazon referral fee',
      'FBA fulfillment fee',
      'Amazon storage fee',
      'peak fee calculator 2026',
      'amazon fuel surcharge calculator',
      'amazon break-even acos calculator',
      'fba fee calculator 2026',
      'amazon seller calculator',
    ],
  },
  'shopify-fee-calculator': {
    title: 'Shopify Fee Calculator | Shopify Payment & Profit Utility',
    description:
      'Calculate platform billing costs via our Shopify fee calculator. Track shopify profit calculator projections, transaction fees, and payment channels.',
    canonicalUrl: `${BASE_URL}/shopify-fee-calculator`,
    ogTitle: 'Shopify Fee Calculator | Shopify Payment & Profit Utility',
    ogDescription:
      'Calculate platform billing costs via our Shopify fee calculator. Track shopify profit calculator projections, transaction fees, and payment channels.',
    ogType: 'website',
    ogImage: `${BASE_URL}/images/shopify-fee-calculator-2026.png`,
    keywords: [
      'shopify fee calculator',
      'shopify profit calculator',
      'shopify transaction fee calculator',
      'shopify profit margin calculator',
      'shopify payment calculator',
      'shopify fees calculator',
    ],
  },
  'stripe-fee-calculator': {
    title: 'Stripe Fee Calculator | Stripe Transaction & Payout Tool',
    description:
      'Run our advanced Stripe fee calculator to analyze stripe transaction fee calculator tiers, processing margins, and reverse payment logic instantly.',
    canonicalUrl: `${BASE_URL}/stripe-fee-calculator`,
    ogTitle: 'Stripe Fee Calculator | Stripe Transaction & Payout Tool',
    ogDescription:
      'Analyze stripe transaction fee calculator tiers, processing margins, and reverse payment logic instantly.',
    ogType: 'website',
    ogImage: `${BASE_URL}/images/stripe-fee-calculator-2026.png`,
    keywords: [
      'stripe fee calculator',
      'stripe fees calculator',
      'stripe transaction fee calculator',
      'stripe payment fee calculator',
      'stripe processing fee calculator',
      'stripe commission calculator',
    ],
  },
  'temu-seller-calculator': {
    title: 'Temu Seller Calculator | Temu Fee & Profit Margin Calculator',
    description:
      'Use the real Temu seller calculator to process temu fee calculator rows, commission profiles, supply chain costs, and net margins instantly.',
    canonicalUrl: `${BASE_URL}/temu-seller-calculator`,
    ogTitle: 'Temu Seller Calculator | Temu Fee & Profit Margin Calculator',
    ogDescription:
      'Process temu fee calculator rows, commission profiles, supply chain costs, and net margins instantly.',
    ogType: 'website',
    ogImage: `${BASE_URL}/images/temu-seller-calculator-2026.png`,
    keywords: [
      'temu seller calculator',
      'temu fee calculator',
      'temu seller fee calculator',
      'temu profit calculator',
      'temu commission calculator',
      'temu seller margin calculator',
    ],
  },
  'etsy-fee-calculator': {
    title: 'Etsy Fee & Profit Calculator 2026 - Listing, Transaction & Offsite Ads',
    description:
      '2026 updated Etsy fee and profit calculator. Calculate $0.20 listing renewal, 6.5% transaction cut, payment processing, Offsite Ads, and net profit margins.',
    canonicalUrl: `${BASE_URL}/etsy-fee-calculator`,
    ogTitle: 'Etsy Fee & Profit Calculator 2026 - Listing, Transaction & Offsite Ads',
    ogDescription:
      'Calculate exact Etsy seller fees with 2026 rates: $0.20 listing, 6.5% transaction, payment processing, and net profit margin.',
    ogType: 'website',
    ogImage: `${BASE_URL}/images/etsy-fee-calculator-2026.png`,
    keywords: [
      'etsy fee calculator',
      'etsy profit calculator',
      'etsy fees 2026',
      'etsy transaction fee',
      'etsy payment processing fee',
      'etsy offsite ads fee calculator',
      'etsy seller calculator pakistan',
      'etsy profit margin calculator',
    ],
  },
  'amazon-fbm-calculator': {
    title: 'Amazon FBM Fee & Profit Calculator 2026 - Merchant Shipping & Referral Fees',
    description:
      '2026 Amazon FBM (Fulfilled by Merchant) fee calculator. Calculate category referral fees (8-15%), merchant self-shipping, packaging, PPC CAC, and net profit margins.',
    canonicalUrl: `${BASE_URL}/amazon-fbm-calculator`,
    ogTitle: 'Amazon FBM Fee & Profit Calculator 2026 - Merchant Shipping & Referral Fees',
    ogDescription:
      'Calculate Amazon FBM fees with 2026 rates: category referral cut, self-ship carrier rates, packaging, and net profit payout.',
    ogType: 'website',
    ogImage: `${BASE_URL}/images/amazon-fbm-calculator-2026.png`,
    keywords: [
      'amazon fbm calculator',
      'amazon fbm fee calculator',
      'amazon fulfilled by merchant calculator',
      'amazon fbm profit calculator',
      'amazon referral fee calculator',
      'fbm vs fba calculator',
      'amazon seller calculator 2026',
    ],
  },
  'installation-guide': {
    title: 'Desktop Software Installation & License Activation Guide | evonix',
    description:
      'Step-by-step installation guide for Windows 10/11 and macOS for Evonix fee calculators. Single key activation and hardware ID locking instructions.',
    canonicalUrl: `${BASE_URL}/installation-guide`,
    ogTitle: 'Desktop Software Installation & License Activation Guide | evonix',
    ogDescription:
      'Step-by-step installation guide for Windows 10/11 and macOS for Evonix fee calculators.',
    ogType: 'website',
    ogImage: DEFAULT_OG_IMAGE,
    keywords: [
      'software installation guide',
      'evonix license activation',
      'hardware id finding',
      'offline fee calculator windows mac',
    ],
  },
  'trend-intelligence-suite': {
    title: 'Trend Intelligence Suite V15 | Multi-Platform Trend Scoring | EVONIXTEC',
    description:
      'Real-time multi-platform trend scoring engine across Google, Bing, eBay, YouTube, and Amazon with automated edge failover.',
    canonicalUrl: `${BASE_URL}/trend-intelligence-suite`,
    ogTitle: 'Trend Intelligence Suite V15 | Evonix Technologies',
    ogDescription:
      'Multi-platform keyword trend intelligence engine across Google, Bing, eBay, YouTube, and Amazon.',
    ogType: 'website',
    ogImage: DEFAULT_OG_IMAGE,
    keywords: [
      'trend intelligence suite',
      'keyword trend analyzer',
      'ebay trend score',
      'google trend volume',
      'amazon sales score',
      'evonix technologies v15',
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

  // 1. BreadcrumbList for every route
  const breadcrumbItems = [{ name: 'Home', url: `${BASE_URL}/` }];

  if (pageId === 'services') {
    breadcrumbItems.push({ name: 'IT & Software Services', url: `${BASE_URL}/services` });
  } else if (pageId === 'portfolio') {
    breadcrumbItems.push({ name: 'Enterprise Portfolio', url: `${BASE_URL}/portfolio` });
  } else if (pageId === 'shop') {
    breadcrumbItems.push({ name: 'IT Hardware & POS Shop', url: `${BASE_URL}/shop` });
  } else if (pageId === 'about') {
    breadcrumbItems.push({ name: 'About evonix & Dubai Heritage', url: `${BASE_URL}/about` });
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
      name: 'evonix technologies',
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
  if (!overrideCanonicalUrl && typeof window !== 'undefined') {
    const rawPath = window.location.pathname.replace(/\/+$/, '') || '/';
    if (rawPath === '/locations/wazirabad' || rawPath === '/location/wazirabad') {
      canonicalUrl = `${BASE_URL}/locations/wazirabad`;
    } else if (rawPath === '/locations/sambrial' || rawPath === '/location/sambrial') {
      canonicalUrl = `${BASE_URL}/locations/sambrial`;
    } else if (rawPath === '/services/doorstep-support' || rawPath === '/doorstep-support') {
      canonicalUrl = `${BASE_URL}/services/doorstep-support`;
    } else if (rawPath === '/sialkot-export-erp') {
      canonicalUrl = `${BASE_URL}/sialkot-export-erp`;
    } else if (rawPath === '/guidelines') {
      canonicalUrl = `${BASE_URL}/guidelines`;
    } else if (rawPath === '/factory-network-tester') {
      canonicalUrl = `${BASE_URL}/factory-network-tester`;
    } else if (rawPath === '/amazon-fba-fee-calculator' || rawPath === '/amazon-fba-calculator') {
      canonicalUrl = `${BASE_URL}/amazon-fba-fee-calculator`;
    } else if (rawPath === '/etsy-fee-calculator' || rawPath === '/etsy-calculator') {
      canonicalUrl = `${BASE_URL}/etsy-fee-calculator`;
    } else if (rawPath === '/amazon-fbm-calculator' || rawPath === '/amazon-fbm-fee-calculator' || rawPath === '/fbm-calculator') {
      canonicalUrl = `${BASE_URL}/amazon-fbm-calculator`;
    } else if (rawPath === '/ebay-fee-calculator' || rawPath === '/ebay-calculator') {
      canonicalUrl = `${BASE_URL}/ebay-fee-calculator`;
    } else if (rawPath === '/shopify-fee-calculator' || rawPath === '/shopify-calculator') {
      canonicalUrl = `${BASE_URL}/shopify-fee-calculator`;
    } else if (rawPath === '/tiktok-shop-fee-calculator' || rawPath === '/tiktok-shop') {
      canonicalUrl = `${BASE_URL}/tiktok-shop-fee-calculator`;
    }
  }

  // Title
  document.title = meta.title;

  // Primary Meta & Robots Directives
  updateMetaTag('name', 'description', meta.description);
  updateMetaTag('name', 'keywords', meta.keywords.join(', '));
  if (pageId === 'admin') {
    updateMetaTag('name', 'robots', 'noindex, nofollow, noarchive');
    updateMetaTag('name', 'googlebot', 'noindex, nofollow');
  } else {
    updateMetaTag('name', 'robots', 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1');
    updateMetaTag('name', 'googlebot', 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1');
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
  if (pageId !== 'admin') {
    pingIndexNow(canonicalUrl).catch(() => {});
  }
}

/**
 * Sets dynamic SEO for an active blog / technical guide post reader view
 */
export function applyBlogPostSEO(blog: BlogPost) {
  const pageTitle = `${blog.title.slice(0, 48)} | evonix Sialkot`;
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
      'evonix Technologies',
    ].join(', ')
  );

  updateMetaTag('property', 'og:title', `${blog.title} – evonix Sialkot`);
  updateMetaTag('property', 'og:description', pageDesc);
  updateMetaTag('property', 'og:url', canonicalUrl);
  updateMetaTag('property', 'og:type', 'article');
  updateMetaTag('property', 'og:site_name', 'evonix technologies');
  updateMetaTag('property', 'og:locale', 'en_PK');
  updateMetaTag('property', 'og:image', DEFAULT_OG_IMAGE);

  updateMetaTag('name', 'twitter:card', 'summary_large_image');
  updateMetaTag('name', 'twitter:title', `${blog.title} – evonix Sialkot`);
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

