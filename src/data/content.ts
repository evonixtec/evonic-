import { ServiceItem, ShopProduct, PortfolioCategory, FaqItem } from '../types';

export const COMPANY_INFO = {
  name: 'EVONIX TECHNOLOGIES',
  legalName: 'evonix technologies Sialkot',
  tagline: 'Precision IT Consultancy & Hardware Engineering Excellence',
  tagline1: 'Precision IT Consultancy & Hardware Engineering Excellence',
  urduTagline: 'سیالکوٹ کا قابل اعتماد آئی ٹی و ہارڈویئر انجینئرنگ پارٹنر',
  about: {
    title: 'Pioneering Global IT Engineering in Sialkot',
    story: 'Founded with 20+ years of enterprise experience in Dubai, UAE, evonix brings international engineering standards, proven POS software, and precision hardware servicing to businesses across Sialkot.',
    mission: 'To provide Sialkot exporters, retailers, and corporate enterprises with international-grade IT infrastructure, rapid on-site troubleshooting, and clean software solutions.',
    vision: 'To establish Sialkot as a premier hub for digital export commerce backed by reliable technology partnerships and authentic technician support.',
  },
  contact: {
    email: 'evonixtec@gmail.com',
    phoneDisplay: '+92 326 324 4002',
    phoneRaw: '+923263244002',
    whatsapp: '923263244002',
    whatsappDisplay: '+92 326 324 4002',
    address: 'Kolti Behram, Sialkot, Pakistan',
    city: 'Sialkot',
    region: 'Punjab, Pakistan',
    postalCode: '51310',
    hours: 'Monday – Saturday: 9:00 AM – 8:00 PM | Emergency On-Call Support 24/7',
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
    { value: '12+', label: 'Cross-Border Web Workstations' },
    { value: '500+', label: 'Sialkot & Global Enterprises Served' },
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
    id: 'hero-dubai-sialkot',
    bgImage: '/images/hero_dubai_tech_1790044690065.webp',
    headingPrefix: 'Dubai-Trained Engineering',
    headingGradient: 'Delivered in Sialkot',
    subHeading: 'Over 20 Years of Commercial Tech Practice',
    paragraph:
      'We bring two decades of international IT expertise straight to Sialkot businesses. From high-speed web apps to retail billing terminals, we fix problems fast.',
    primaryCta: 'Request a Free Quote',
    primaryAction: 'quote',
    servicePrefill: 'Full IT Consultancy & POS Setup',
    secondaryCta: 'Chat on WhatsApp',
    secondaryAction: 'whatsapp',
    pills: ['20+ Years UAE Experience', 'Doorstep Sialkot Support', 'Direct Engineer Call'],
    floatingBadge: 'Dubai ⟶ Sialkot',
    floatingText: 'Live Lab Operations',
  },
  {
    id: 'hero-pos-retail',
    bgImage: '/images/service_software_pos_1790044733191.webp',
    headingPrefix: 'Point of Sale & Billing',
    headingGradient: 'Fast & Reliable Systems',
    subHeading: 'Retail, Restaurant & Wholesale POS',
    paragraph:
      'Keep your sales counter running even when the internet drops. Our systems handle multi-branch inventory, receipt printing, and daily accounts without slowdowns.',
    primaryCta: 'See POS Software',
    primaryAction: 'services',
    servicePrefill: 'POS Software & Barcode System',
    secondaryCta: 'View Equipment',
    secondaryAction: 'shop',
    pills: ['Works Offline & Online', 'Thermal Printer Ready', 'FBR Integration Support'],
    floatingBadge: 'Retail Software',
    floatingText: 'Counter-Ready POS',
  },
  {
    id: 'hero-hardware-repair',
    bgImage: '/images/service_hardware_repair_1790044752878.webp',
    headingPrefix: 'Precision Bench Repair',
    headingGradient: 'Laptops, Printers & Boards',
    subHeading: 'Chip-Level Electronics Testing',
    paragraph:
      'We fix motherboards, power rails, thermal paper jams, and network switches in our Sialkot lab. Genuine parts with clear testing before delivery.',
    primaryCta: 'Book Hardware Fix',
    primaryAction: 'quote',
    servicePrefill: 'Hardware Diagnostics & Repair',
    secondaryCta: 'Check Services',
    secondaryAction: 'services',
    pills: ['Micro-Soldering Bench', 'Original Parts', '30-Day Work Guarantee'],
    floatingBadge: 'Hardware Lab',
    floatingText: 'Kolti Behram Bench',
  },
  {
    id: 'hero-web-development',
    bgImage: '/images/service_web_dev_1790044711551.webp',
    headingPrefix: 'Custom Web Platforms',
    headingGradient: 'Built for Global Exports',
    subHeading: 'Fast Websites for Sialkot Manufacturers',
    paragraph:
      'Showcase your sports goods, surgical instruments, and leather apparel to buyers in Europe, the UK, and North America with fast-loading web catalogs.',
    primaryCta: 'Start Web Project',
    primaryAction: 'quote',
    servicePrefill: 'Custom Website Development',
    secondaryCta: 'View Case Studies',
    secondaryAction: 'portfolio',
    pills: ['Mobile-Friendly Layout', 'Fast Global Hosting', 'SEO Optimization'],
    floatingBadge: 'Web Platforms',
    floatingText: 'Export Web Portals',
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
    tags: ['Canon Pixma', 'Printhead Clean', 'Ink System', 'Kolti Behram'],
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
    id: 'hardware-repair',
    number: '03',
    title: 'Chip-Level Laptop, PC & Printer Diagnostic Lab',
    category: 'hardware',
    summary:
      'Bench repairs for business laptops, desktop computers, laser printers, and thermal receipt machines in our Sialkot diagnostic lab.',
    description:
      'Our technicians repair power rails, fix black screen faults, clean printer rollers, and upgrade slow office computers with genuine fast SSD drives.',
    deliverables: [
      'Motherboard Short-Circuit Tracing',
      'Laser & Thermal Printer Servicing',
      'High-Speed NVMe SSD Upgrades',
      '30-Day Verified Repair Guarantee',
    ],
    features: [
      'Micro-Soldering Stereo Microscope',
      'Thermal Camera Diagnostic Scan',
      'Original Replacement Components',
      'Same-Day Bench Intake',
    ],
    imageUrl: '/images/service_hardware_repair_1790044752878.jpg',
    imageWebp: '/images/service_hardware_repair_1790044752878.webp',
    imageAlt: 'Chip level laptop repair and printer servicing bench at evonix lab in Sialkot',
  },
  {
    id: 'onsite-service',
    number: '04',
    title: 'Doorstep IT Visits, Network Cabling & Maintenance',
    category: 'consultancy',
    summary:
      'Direct on-site technician visits to your factory, warehouse, hospital, or office across Sialkot, Daska, Sambrial, and Paris Road.',
    description:
      'When your office network drops or a billing printer halts during work hours, our mobile tech van comes directly to your location with tools ready.',
    deliverables: [
      'Factory Wi-Fi & LAN Network Setup',
      'Annual Maintenance Contract (AMC)',
      'Quick Response Emergency Visits',
      'Preventive Hardware Dust Cleaning',
    ],
    features: [
      'Direct WhatsApp Dispatch',
      'CAT6 Cable Pulling & Patch Panels',
      'Router & Firewall Configuration',
      'Backup Power UPS Inspection',
    ],
    imageUrl: '/images/service_onsite_tech_1790044770537.jpg',
    imageWebp: '/images/service_onsite_tech_1790044770537.webp',
    imageAlt: 'On site IT technician visiting factory office in Sialkot for network setup',
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

export const SHOP_PRODUCTS: ShopProduct[] = [
  {
    id: 'prod-pos-terminal-touch',
    name: 'All-in-One 15.6" Capacitive Touch POS Terminal',
    category: 'POS Hardware',
    condition: 'Brand New',
    priceEstimate: 'PKR 65,000 - 85,000',
    description: 'Commercial-grade touch terminal with aluminum base, Intel Quad-Core processor, 8GB RAM, and 128GB SSD for retail billing counters.',
    specs: ['15.6" HD Capacitive Touch', 'Intel Quad-Core 2.0GHz', '8GB DDR4 RAM', '128GB Fast SSD', 'Multiple USB & Serial Ports'],
    warranty: '1-Year Local Replacement Warranty',
    availability: 'In Stock (Sialkot Lab)',
    imageUrl: '/images/shop_pos_touchscreen_1791023884127.jpg',
    imageWebp: '/images/shop_pos_touchscreen_1791023884127.webp',
    imageAlt: 'All in one touch screen POS terminal available in Sialkot',
  },
  {
    id: 'prod-thermal-printer-80mm',
    name: 'High-Speed 80mm Thermal Receipt Printer (USB + LAN)',
    category: 'Printers & Scanners',
    condition: 'Brand New',
    priceEstimate: 'PKR 16,500 - 22,000',
    description: 'Fast 260mm/s thermal billing printer with auto-cutter, paper jam sensor, and dual USB and Ethernet LAN network connectivity.',
    specs: ['260mm/sec Print Speed', 'Heavy Duty Auto-Cutter', 'Direct Thermal (No Ink Needed)', 'Cash Drawer Port RJ11'],
    warranty: '1-Year Sialkot Replacement Warranty',
    availability: 'In Stock (Immediate Delivery)',
    imageUrl: '/images/shop_thermal_printer_1791023864164.jpg',
    imageWebp: '/images/shop_thermal_printer_1791023864164.webp',
    imageAlt: '80mm thermal receipt printer with auto cutter in Sialkot',
  },
  {
    id: 'prod-laser-printer-duplex',
    name: 'Heavy-Duty Workgroup Monochrome Laser Printer',
    category: 'Printers & Scanners',
    condition: 'Brand New',
    priceEstimate: 'PKR 45,000 - 58,000',
    description: 'High-yield office laser printer with automatic two-sided duplex printing, gigabit network port, and low per-page toner cost.',
    specs: ['38 Pages Per Minute', 'Automatic Duplex (2-Sided)', 'Gigabit LAN & Wi-Fi', 'High-Yield 3,000 Page Toner'],
    warranty: '1-Year Official Warranty',
    availability: 'In Stock',
    imageUrl: '/images/shop_laser_printer_1791023842135.jpg',
    imageWebp: '/images/shop_laser_printer_1791023842135.webp',
    imageAlt: 'Workgroup laser printer for office and factory paperwork in Sialkot',
  },
  {
    id: 'prod-business-laptop-thinkpad',
    name: 'Imported Enterprise Business Laptop (Core i5 / i7)',
    category: 'Laptops & PCs',
    condition: 'Certified Refurbished (UAE Import)',
    priceEstimate: 'PKR 55,000 - 88,000',
    description: 'Carefully tested imported business laptop with magnesium chassis, backlit keyboard, 16GB RAM, and 512GB NVMe SSD.',
    specs: ['Intel Core i5 / i7 Processor', '16GB DDR4 RAM', '512GB Fast NVMe SSD', 'FHD IPS Anti-Glare Screen', 'Battery Health 85%+'],
    warranty: '3-Month Bench Warranty + 10-Day Checking',
    availability: 'In Stock (Ready to Collect)',
    imageUrl: '/images/shop_business_laptop_1791023903828.jpg',
    imageWebp: '/images/shop_business_laptop_1791023903828.webp',
    imageAlt: 'Imported enterprise business laptop tested in Sialkot lab',
  },
  {
    id: 'prod-barcode-scanner-2d',
    name: 'Omni-Directional 1D & 2D QR Barcode Scanner',
    category: 'POS Hardware',
    condition: 'Brand New',
    priceEstimate: 'PKR 6,500 - 12,000',
    description: 'Rugged handheld and hands-free desktop scanner reading smudged carton barcodes, mobile phone screens, and high-density labels.',
    specs: ['Reads 1D Barcodes & 2D QR Codes', 'Fast CMOS Sensor', 'Drop Tested from 1.5m', 'Plug & Play USB Interface'],
    warranty: '6-Month Replacement Warranty',
    availability: 'In Stock',
    imageUrl: '/images/shop_barcode_scanner_1791023955798.jpg',
    imageWebp: '/images/shop_barcode_scanner_1791023955798.webp',
    imageAlt: 'Handheld 2D QR barcode scanner for retail store and warehouse',
  },
];

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
];
