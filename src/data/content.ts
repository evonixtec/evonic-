import { ServiceItem, PortfolioCategory, ShopProduct, FaqItem } from '../types';
import heroDubaiImg from '../assets/images/hero_dubai_tech_1790044690065.jpg';
import heroDubaiWebp from '../assets/images/hero_dubai_tech_1790044690065.webp';
import serviceWebDevImg from '../assets/images/service_web_dev_1790044711551.jpg';
import serviceWebDevWebp from '../assets/images/service_web_dev_1790044711551.webp';
import serviceSoftwarePosImg from '../assets/images/service_software_pos_1790044733191.jpg';
import serviceSoftwarePosWebp from '../assets/images/service_software_pos_1790044733191.webp';
import serviceHardwareRepairImg from '../assets/images/service_hardware_repair_1790044752878.jpg';
import serviceHardwareRepairWebp from '../assets/images/service_hardware_repair_1790044752878.webp';
import serviceOnsiteTechImg from '../assets/images/service_onsite_tech_1790044770537.jpg';
import serviceOnsiteTechWebp from '../assets/images/service_onsite_tech_1790044770537.webp';

// Portfolio WebP & Fallbacks
import portfolioEcommerceWebp from '../assets/images/portfolio/portfolio_ecommerce.webp';
import portfolioEcommerceJpg from '../assets/images/portfolio/portfolio_ecommerce.jpg';
import portfolioRealestateWebp from '../assets/images/portfolio/portfolio_realestate.webp';
import portfolioRealestateJpg from '../assets/images/portfolio/portfolio_realestate.jpg';
import portfolioCorporateWebp from '../assets/images/portfolio/portfolio_corporate.webp';
import portfolioCorporateJpg from '../assets/images/portfolio/portfolio_corporate.jpg';
import portfolioRestaurantWebp from '../assets/images/portfolio/portfolio_restaurant.webp';
import portfolioRestaurantJpg from '../assets/images/portfolio/portfolio_restaurant.jpg';
import portfolioPosRetailWebp from '../assets/images/portfolio/portfolio_pos_retail.webp';
import portfolioPosRetailJpg from '../assets/images/portfolio/portfolio_pos_retail.jpg';
import portfolioRestaurantKdsWebp from '../assets/images/portfolio/portfolio_restaurant_kds.webp';
import portfolioRestaurantKdsJpg from '../assets/images/portfolio/portfolio_restaurant_kds.jpg';
import portfolioMobileRepairWebp from '../assets/images/portfolio/portfolio_mobile_repair.webp';
import portfolioMobileRepairJpg from '../assets/images/portfolio/portfolio_mobile_repair.jpg';

// Shop WebP & Fallbacks
import shopPosTouchscreenWebp from '../assets/images/shop/shop_pos_touchscreen.webp';
import shopPosTouchscreenJpg from '../assets/images/shop/shop_pos_touchscreen.jpg';
import shopThermalPrinterWebp from '../assets/images/shop/shop_thermal_printer.webp';
import shopThermalPrinterJpg from '../assets/images/shop/shop_thermal_printer.jpg';
import shopBarcodeScannerWebp from '../assets/images/shop/shop_barcode_scanner.webp';
import shopBarcodeScannerJpg from '../assets/images/shop/shop_barcode_scanner.jpg';
import shopBusinessLaptopWebp from '../assets/images/shop/shop_business_laptop.webp';
import shopBusinessLaptopJpg from '../assets/images/shop/shop_business_laptop.jpg';
import shopDesktopPcWebp from '../assets/images/shop/shop_desktop_pc.webp';
import shopDesktopPcJpg from '../assets/images/shop/shop_desktop_pc.jpg';
import shopLaserPrinterWebp from '../assets/images/shop/shop_laser_printer.webp';
import shopLaserPrinterJpg from '../assets/images/shop/shop_laser_printer.jpg';
import shopNvmeSsdWebp from '../assets/images/shop/shop_nvme_ssd.webp';
import shopNvmeSsdJpg from '../assets/images/shop/shop_nvme_ssd.jpg';
import shopThermalPaperWebp from '../assets/images/shop/shop_thermal_paper.webp';
import shopThermalPaperJpg from '../assets/images/shop/shop_thermal_paper.jpg';

export interface HeroSlide {
  id: string;
  badge: string;
  headingPrefix: string;
  headingGradient: string;
  subHeading: string;
  paragraph: string;
  primaryCta: string;
  primaryAction: 'quote' | 'services' | 'portfolio' | 'shop';
  secondaryCta: string;
  secondaryAction: 'services' | 'portfolio' | 'shop' | 'whatsapp' | 'call';
  servicePrefill?: string;
  bgImage: string;
  bgImageWebp?: string;
  floatingBadge: string;
  floatingText: string;
  pills: string[];
}

export const HERO_SLIDES: HeroSlide[] = [
  {
    id: 'dubai-heritage',
    badge: 'DUBAI (UAE) ⟶ SIALKOT (PAKISTAN) | 20+ YEARS LEGACY',
    headingPrefix: 'Experience of Dubai,',
    headingGradient: 'Now in Pakistan',
    subHeading: 'Your Trusted IT Partner in Sialkot',
    paragraph: 'We provide professional Website Development, Software Development, and Computer Repairing services with 15+ years of international experience.',
    primaryCta: 'Get a Free Quote',
    primaryAction: 'quote',
    secondaryCta: 'Explore Services',
    secondaryAction: 'services',
    servicePrefill: 'Website Development',
    bgImage: heroDubaiImg,
    bgImageWebp: heroDubaiWebp,
    floatingBadge: 'Dubai Standard',
    floatingText: '20+ Yrs Gulf Tech Heritage',
    pills: ['Doorstep Home Service', 'Transparent Affordable Rates', '100% Satisfaction Guarantee'],
  },
  {
    id: 'web-software-pos',
    badge: 'ENTERPRISE WEB & POS ENGINEERING | INTERNATIONAL QUALITY',
    headingPrefix: 'Next-Gen Websites &',
    headingGradient: 'Smart POS Software',
    subHeading: 'Engineered for Sialkot Exporters & Retailers',
    paragraph: 'High-speed e-commerce stores, B2B company portfolios, barcode billing POS, and custom restaurant ERP built to Dubai corporate standards.',
    primaryCta: 'Build Your Website / POS',
    primaryAction: 'quote',
    secondaryCta: 'View Dubai Portfolio',
    secondaryAction: 'portfolio',
    servicePrefill: 'Software & Mobile App Development',
    bgImage: serviceWebDevImg,
    bgImageWebp: serviceWebDevWebp,
    floatingBadge: 'High Performance',
    floatingText: 'Custom POS & Cloud ERP',
    pills: ['Multi-currency E-Commerce', 'Barcode & Receipt Billing', 'WhatsApp Direct Checkout'],
  },
  {
    id: 'hardware-repair-onsite',
    badge: 'CERTIFIED LAB & DOORSTEP SERVICE | SIALKOT WIDE',
    headingPrefix: 'Computer, Laptop &',
    headingGradient: 'Printer Repair Services',
    subHeading: 'Expert Motherboard Diagnostics & UAE Imports',
    paragraph: 'Motherboard chip diagnostics, fast SSD speed upgrades, laser printer tuning, and certified refurbished UAE laptops delivered straight to your home or office.',
    primaryCta: 'Book Doorstep Repair',
    primaryAction: 'quote',
    secondaryCta: 'Shop UAE Laptops & POS',
    secondaryAction: 'shop',
    servicePrefill: 'Computer, Laptop & Printer Services',
    bgImage: serviceHardwareRepairImg,
    bgImageWebp: serviceHardwareRepairWebp,
    floatingBadge: 'Zero Lab Visit',
    floatingText: 'Technician Visits Your Doorstep',
    pills: ['Chip-Level Diagnostics', 'High-Speed SSD Upgrades', 'Zero Fee If Not Fixed'],
  },
];

export const COMPANY_INFO = {
  name: 'EVONIX TECHNOLOGIES',
  nanoTagline: 'Dubai Precision Engineering • Sialkot Tech Hub',
  nanoTaglineUrdu: 'دبئی معیار کی ٹیکنالوجی اب سیالکوٹ میں',
  tagline1: 'EVONIX TECHNOLOGIES - Your Trusted IT Partner.',
  tagline2: 'Experience of Dubai, Now in Pakistan. Crafting digital excellence across global borders.',
  hero: {
    heading: 'Experience of Dubai, Now in Pakistan',
    subHeading: 'Your Trusted IT Partner in Sialkot',
    paragraph: 'We provide professional Website Development, Software Development, and Computer Repairing services with 15+ years of international experience.',
    ctaButton: 'Get a Free Quote',
    secondaryCta: 'Explore Services',
  },
  about: {
    title: 'About Us - EVONIX TECHNOLOGIES',
    storyHeading: 'Our Story',
    storyText: 'EVONIX TECHNOLOGIES is not just a new company, it is a name of 20 years of experience. We started our career in Dubai (UAE) and served in the IT field for many years. After working in a big market like Dubai, we have gained extensive international experience.\n\nNow with the same international standard and experience, we are going to launch our company in Pakistan, to provide professional and reliable service like Dubai to the people of Pakistan.',
    story: 'EVONIX TECHNOLOGIES is not just a new company, it is a name of 20 years of experience. We started our career in Dubai (UAE) and served in the IT field for many years. After working in a big market like Dubai, we have gained extensive international experience. Now with the same international standard and experience, we provide professional and reliable service like Dubai to the people of Pakistan.',
    missionHeading: 'Our Mission',
    missionText: 'Our mission is to bring modern, affordable, and reliable technology solutions to every business and home.',
    mission: 'Our mission is to bring modern, affordable, and reliable technology solutions to every business and home.',
    vision: 'To empower Sialkot’s industries, commercial establishments, and households with world-class digital craftsmanship and uncompromising IT reliability.',
    heritageYearsDubai: '20+',
    internationalExperience: '15+',
    founder: 'Raza Muhammad',
    secpRegistration: {
      corporateName: 'EVONIX TECHNOLOGIES',
      entityType: 'Single Member Company (SMC)',
      regulatoryBody: 'Securities and Exchange Commission of Pakistan (SECP)',
      sector: 'Information Technology',
      nameMeaning: 'EVONIX is an invented word combining EVO (Evolution) and NIX (Technology), representing innovative and evolutionary technology solutions.',
    },
  },
  whyChooseUs: [
    {
      id: 'dubai-exp',
      title: '20+ Years of International Experience (Dubai)',
      description: 'Tested and proven in one of the most technologically competitive hubs in the world—bringing Gulf-grade standards straight to Sialkot.',
      icon: 'Globe',
      stat: '20+ Yrs',
      highlight: 'Dubai Heritage',
    },
    {
      id: 'affordable-pricing',
      title: 'Affordable Prices',
      description: 'Transparent, budget-friendly pricing tailored for Pakistani businesses, shop owners, startups, and families without quality compromise.',
      icon: 'DollarSign',
      stat: '100%',
      highlight: 'Honest Rates',
    },
    {
      id: 'quick-service',
      title: 'Quick & Reliable Service',
      description: 'Fast turnaround times with rapid diagnostics, clear communication, zero hidden delays, and dependable technical backup.',
      icon: 'Zap',
      stat: 'Same-Day',
      highlight: 'Fast Response',
    },
    {
      id: 'home-service',
      title: 'Home Service Available',
      description: 'No need to disconnect your PC or drive to a shop. Our mobile IT engineer visits your doorstep in Sialkot with full toolkits.',
      icon: 'Home',
      stat: 'Doorstep',
      highlight: 'Sialkot Wide',
    },
    {
      id: 'satisfaction',
      title: '100% Customer Satisfaction',
      description: 'Dedicated post-delivery support, warranty on repairs, and ongoing software assistance that puts your peace of mind first.',
      icon: 'ShieldCheck',
      stat: '100%',
      highlight: 'Guaranteed',
    },
  ],
  contact: {
    email: 'evonixtec@gmail.com',
    phoneDisplay: '+92 326 324 40002',
    phoneRaw: '+9232632440002',
    whatsapp: '9232632440002',
    whatsappDisplay: '+92 326 324 40002',
    address: 'Paris Road & Cantt Commercial Hub, Sialkot, Punjab, Pakistan',
    city: 'Sialkot',
    region: 'Punjab, Pakistan',
    homeServiceAreas: [
      'Sialkot Cantt',
      'Paris Road',
      'Defense Road',
      'Kashmir Road',
      'Daska Road',
      'Ugoki',
      'Sambrial',
      'Model Town',
      'Rangpura',
      'All Surrounding Localities',
    ],
    hours: 'Monday – Saturday: 9:00 AM – 8:00 PM | Sunday: Emergency On-Call Support',
    socials: {
      linkedin: 'https://www.linkedin.com/company/evonix-technologies',
      facebook: 'https://www.facebook.com/evonixtechnologies',
      instagram: 'https://www.instagram.com/evonixtechnologies',
      whatsapp: 'https://wa.me/9232632440002',
    },
  },
};

export const SERVICES: ServiceItem[] = [
  {
    id: 'web-dev',
    number: '01',
    title: 'Website Development',
    summary: 'We design modern, fast, responsive, and SEO-friendly websites for businesses, shops, and companies.',
    iconName: 'Layout',
    imageUrl: serviceWebDevImg,
    imageWebp: serviceWebDevWebp,
    imageAlt: 'Modern Responsive Website Development and E-Commerce Architecture in Sialkot - EVONIX TECHNOLOGIES',
    features: [
      'Modern, clean, mobile-first responsive architecture',
      'Lightning-fast page load speeds and SEO optimization',
      'E-commerce & retail product catalogs with WhatsApp checkout',
      'Corporate portfolios for exporters, manufacturers & traders',
      'Free SSL security, custom domain setup & hosting assistance',
    ],
    dubaiExperienceNote: 'Developed high-conversion websites for UAE retail, luxury real estate, and international trading houses.',
    deliverables: ['Custom Web Design', 'E-Commerce Stores', 'Corporate Portals', 'SEO & Speed Tuning'],
  },
  {
    id: 'software-dev',
    number: '02',
    title: 'Software & Mobile App Development',
    summary: 'We develop custom management software, POS systems, and mobile applications tailored to your business needs.',
    iconName: 'Cpu',
    imageUrl: serviceSoftwarePosImg,
    imageWebp: serviceSoftwarePosWebp,
    imageAlt: 'Custom Point of Sale POS Billing Software & Cloud ERP Development in Sialkot - EVONIX TECHNOLOGIES',
    features: [
      'Tailor-made Point of Sale (POS) for retail, grocery & boutiques',
      'Inventory, barcode printing & warehouse stock management',
      'Restaurant POS with Kitchen Display System (KDS) & table billing',
      'Cross-platform iOS & Android mobile apps for your customers or staff',
      'Offline-capable systems with secure cloud backup & sales reports',
    ],
    dubaiExperienceNote: 'Delivered robust enterprise software architectures across UAE supermarkets, chains, and service centers.',
    deliverables: ['Custom POS Systems', 'Inventory Software', 'Billing & ERP', 'Mobile Applications'],
  },
  {
    id: 'hardware-services',
    number: '03',
    title: 'Computer, Laptop & Printer Services',
    summary: 'We provide professional repairing, servicing, and sales of all computers, laptops, and printers.',
    iconName: 'Monitor',
    imageUrl: serviceHardwareRepairImg,
    imageWebp: serviceHardwareRepairWebp,
    imageAlt: 'Computer Motherboard Chip-Level Repair, SSD Upgrades & Printer Services - EVONIX TECHNOLOGIES',
    features: [
      'Motherboard chip-level repair, liquid spill diagnosis & display fix',
      'High-speed SSD upgrade & RAM enhancement (makes slow PCs 10x faster)',
      'Laser & Thermal receipt printer servicing, toner refilling & head cleaning',
      'Virus removal, clean Windows installation & critical data backup',
      'Sales of verified laptops, desktops, POS printers & genuine accessories',
    ],
    dubaiExperienceNote: 'Managed large corporate hardware infrastructure, lab diagnostics, and enterprise thermal printer networks in Dubai.',
    deliverables: ['Laptop Chip Repair', 'Printer Maintenance', 'SSD / RAM Upgrades', 'Hardware & PC Sales'],
  },
  {
    id: 'onsite-service',
    number: '04',
    title: 'On-Site Home & Office Service',
    summary: 'No need to visit our lab. Our expert technician will come to your home or office for repair and service in Sialkot.',
    iconName: 'Wrench',
    imageUrl: serviceOnsiteTechImg,
    imageWebp: serviceOnsiteTechWebp,
    imageAlt: 'On-Site Doorstep IT Support and Network Cabling Service in Sialkot - EVONIX TECHNOLOGIES',
    features: [
      'Doorstep technician visit anywhere across Sialkot city',
      'Direct on-site diagnosis and transparent estimation before repair',
      'Office networking, Wi-Fi router setup, LAN cabling & printer sharing',
      'POS installation and staff training directly at your counter',
      'Safe pickup and return for advanced lab motherboard repairs',
    ],
    dubaiExperienceNote: 'Modeled after Dubai rapid on-demand corporate IT dispatch standards.',
    deliverables: ['Doorstep PC Repair', 'Office Network Setup', 'Printer On-Site Fix', 'POS Counter Setup'],
  },
];

export const PORTFOLIO_DATA: {
  intro: string;
  websiteClients: PortfolioCategory[];
  softwareClients: PortfolioCategory[];
  ndaNote: string;
} = {
  intro: 'EVONIX TECHNOLOGIES has been proudly serving clients in Dubai, UAE for over 15 years.',
  websiteClients: [
    {
      id: 'web-1',
      type: 'website',
      title: 'E-Commerce & Retail Business Websites',
      categoryName: 'A. Website Development Clients (Dubai)',
      industry: 'UAE Retail & Consumer Goods',
      imageUrl: portfolioEcommerceJpg,
      imageWebp: portfolioEcommerceWebp,
      imageAlt: 'UAE Retail E-Commerce Shopping Portal with WhatsApp Checkout',
      description: 'High-speed online shopping platforms with multi-currency payment gateways, automated inventory sync, and mobile-first shopping flows.',
      deliverables: ['Multi-currency UAE checkout', 'Real-time stock sync', 'Arabic & English bilingual layout', 'Instant WhatsApp order link'],
      tags: ['E-Commerce', 'Bilingual', 'Payment Gateways', 'SEO Optimized'],
      dubaiHighlight: 'Engineered for high-volume shopping festivals and seamless delivery coordination across UAE Emirates.',
    },
    {
      id: 'web-2',
      type: 'website',
      title: 'Real Estate & Property Dealer Websites',
      categoryName: 'A. Website Development Clients (Dubai)',
      industry: 'Dubai Real Estate & Brokerages',
      imageUrl: portfolioRealestateJpg,
      imageWebp: portfolioRealestateWebp,
      imageAlt: 'Dubai Luxury Real Estate and Property Management Portal',
      description: 'Luxury property listing platforms with interactive floor plans, virtual walk-through integration, WhatsApp lead captures, and CRM synchronization.',
      deliverables: ['Interactive Property Map', 'Instant Agent WhatsApp Routing', 'Off-Plan Launch Showcase', 'Lead Scoring CRM'],
      tags: ['Real Estate', 'Lead Capture', 'High Visuals', 'CRM Hookup'],
      dubaiHighlight: 'Tailored for Downtown Dubai, Dubai Marina & Palm Jumeirah property marketing campaigns.',
    },
    {
      id: 'web-3',
      type: 'website',
      title: 'Corporate Business & Trading Company Websites',
      categoryName: 'A. Website Development Clients (Dubai)',
      industry: 'International Trading & Freezone Corporates',
      imageUrl: portfolioCorporateJpg,
      imageWebp: portfolioCorporateWebp,
      imageAlt: 'International B2B Corporate Trading & Supply Chain Portal',
      description: 'Authoritative, pristine corporate web presence designed for B2B exporters, logistics providers, and multinational trading firms.',
      deliverables: ['RFQs & Catalog Downloads', 'Multilingual Company Profile', 'Compliance & Certification Display', 'Client Portal'],
      tags: ['Corporate B2B', 'Export/Import', 'High Security', 'Freezone Ready'],
      dubaiHighlight: 'Positioned trading firms for international banking credibility and government procurement.',
    },
    {
      id: 'web-4',
      type: 'website',
      title: 'Restaurant & Cafe Websites with Online Ordering',
      categoryName: 'A. Website Development Clients (Dubai)',
      industry: 'Hospitality & Dining',
      imageUrl: portfolioRestaurantJpg,
      imageWebp: portfolioRestaurantWebp,
      imageAlt: 'Smart Restaurant & Cafe Website with Direct QR Online Ordering',
      description: 'Mouth-watering digital menus, direct zero-commission online food ordering, table reservation systems, and loyalty program integration.',
      deliverables: ['Direct Table & Food Ordering', 'Automated WhatsApp Kitchen Ping', 'Digital QR Menu', 'Google Maps Business Sync'],
      tags: ['Food & Dine', 'Online Ordering', 'QR Menus', 'Reservation Flow'],
      dubaiHighlight: 'Empowered Dubai cafes to accept direct customer delivery orders saving steep delivery app commissions.',
    },
  ],
  softwareClients: [
    {
      id: 'soft-1',
      type: 'software',
      title: 'Retail Sector: Complete POS & Inventory Management Software',
      categoryName: 'B. Software Development Clients',
      industry: 'Supermarkets & Garment Shops',
      imageUrl: portfolioPosRetailJpg,
      imageWebp: portfolioPosRetailWebp,
      imageAlt: 'Supermarket POS & Multi-Store Inventory Management Software',
      description: 'Comprehensive Point of Sale system featuring multi-counter rapid barcode scanning, purchase orders, expiry alerts, GST/VAT invoicing, and profit analysis.',
      deliverables: ['High-speed Barcode Checkout', 'Automated Low-Stock Alerts', 'Multi-Store Inventory Sync', 'End-of-day Z-Report & Profit Margin'],
      tags: ['Retail POS', 'Barcode Scanner', 'Inventory Control', 'Supermarkets'],
      dubaiHighlight: 'Deployed across busy UAE convenience stores and garment boutiques with zero checkout downtime.',
    },
    {
      id: 'soft-2',
      type: 'software',
      title: 'Restaurant Sector: Restaurant Management System',
      categoryName: 'B. Software Development Clients',
      industry: 'Restaurants, Cafes & Fast Food',
      imageUrl: portfolioRestaurantKdsJpg,
      imageWebp: portfolioRestaurantKdsWebp,
      imageAlt: 'Restaurant Management System with Kitchen Display System KDS',
      description: 'End-to-end food service management with Kitchen Display System (KDS), waiter tablets, split-bill processing, thermal order printers, and recipe cost tracking.',
      deliverables: ['Kitchen Display System (KDS)', 'Thermal Kitchen Token Printing', 'Table & Takeaway Billing', 'Recipe & Raw Ingredient Tracking'],
      tags: ['Restaurant ERP', 'Kitchen Display', 'Receipt Printers', 'Table Billing'],
      dubaiHighlight: 'Streamlined order-to-table serving times from 18 minutes down to 8 minutes in high-capacity venues.',
    },
    {
      id: 'soft-3',
      type: 'software',
      title: 'Shops & Services: Management Software',
      categoryName: 'B. Software Development Clients',
      industry: 'Mobile Shops, Electronics Stores & Salons',
      imageUrl: portfolioMobileRepairJpg,
      imageWebp: portfolioMobileRepairWebp,
      imageAlt: 'Mobile Shops & Electronics Repair Ticketing and IMEI Tracking ERP',
      description: 'Specialized workflow software tailored for IMEI tracking in mobile shops, warranty ticketing in electronics stores, and appointment booking in salons.',
      deliverables: ['IMEI / Serial Number Tracking', 'Repair Job-Card & Customer SMS', 'Staff Commission Tracking', 'Appointment Booking Calendar'],
      tags: ['Mobile Shops', 'Electronics Repair', 'Job Cards', 'Service Salons'],
      dubaiHighlight: 'Handled thousands of daily repair job-cards and IMEI authentications with full customer transparency.',
    },
  ],
  ndaNote: 'Due to NDA (Non-Disclosure Agreement) with our international clients, we cannot disclose their brand names publicly. We can share detailed case studies on private meeting.',
};

export const SHOP_PRODUCTS: ShopProduct[] = [
  {
    id: 'pos-terminal-1',
    name: 'All-in-One Touchscreen POS Terminal System',
    category: 'POS Hardware',
    condition: 'Brand New',
    priceEstimate: 'Call / WhatsApp for Best Quote',
    imageUrl: shopPosTouchscreenJpg,
    imageWebp: shopPosTouchscreenWebp,
    imageAlt: 'All-in-One Capacitive Touchscreen POS Terminal System',
    description: 'Heavy-duty commercial grade touch terminal with dual display option, intel processor, fast SSD, and integrated cable management.',
    specs: ['15.6" Capacitive Touch Display', 'Intel Core i3 / i5 Processor', '8GB RAM + 128GB High-Speed SSD', 'Multiple USB, COM, LAN Ports'],
    availability: 'In Stock (Sialkot)',
    warranty: '1 Year Warranty + Free Software Setup',
  },
  {
    id: 'thermal-printer-1',
    name: '80mm High-Speed Thermal Receipt Printer (USB + LAN)',
    category: 'Printers & Scanners',
    condition: 'Brand New',
    priceEstimate: 'Best Market Price Guaranteed',
    imageUrl: shopThermalPrinterJpg,
    imageWebp: shopThermalPrinterWebp,
    imageAlt: '80mm High-Speed Thermal Receipt Printer with Auto-Cutter',
    description: 'Auto-cutter thermal printer for retail shops, restaurants, and supermarkets. Compatible with all POS software and Windows/Android.',
    specs: ['260mm/sec High-Speed Printing', 'Auto-Cutter (1.5M cuts lifespan)', 'USB + Ethernet LAN Interfaces', 'Works with standard 80mm paper rolls'],
    availability: 'In Stock (Sialkot)',
    warranty: '1 Year Local Warranty',
  },
  {
    id: 'barcode-scanner-1',
    name: '2D / QR & 1D Omnidirectional Hands-Free Barcode Scanner',
    category: 'POS Hardware',
    condition: 'Brand New',
    priceEstimate: 'Affordable Wholesale Rate',
    imageUrl: shopBarcodeScannerJpg,
    imageWebp: shopBarcodeScannerWebp,
    imageAlt: '2D QR & 1D Omnidirectional Hands-Free Desktop Barcode Scanner',
    description: 'Desktop presentation scanner for fast supermarket checkout counters. Reads broken, curved, and phone screen barcodes with ease.',
    specs: ['Automatic Sensor Trigger', 'Reads 1D & 2D QR Barcodes', 'Plug & Play USB Interface', 'Heavy-Duty Anti-Shock Base'],
    availability: 'In Stock (Sialkot)',
    warranty: '6 Months Replacement Warranty',
  },
  {
    id: 'laptop-import-1',
    name: 'Dell Latitude / HP EliteBook Business Series Laptop',
    category: 'Laptops & PCs',
    condition: 'Certified Refurbished (UAE Import)',
    priceEstimate: 'Special Price for Sialkot Businesses',
    imageUrl: shopBusinessLaptopJpg,
    imageWebp: shopBusinessLaptopWebp,
    imageAlt: 'Dell Latitude HP EliteBook Business Series Laptop UAE Import',
    description: 'Grade-A imported business laptops directly tested from Dubai corporate stock. Ideal for office work, accounting, design, and software.',
    specs: ['Intel Core i5 8th / 10th Gen', '8GB / 16GB DDR4 RAM', '256GB / 512GB NVMe SSD', 'FHD Display + 3+ Hours Battery Health'],
    availability: 'In Stock (Sialkot)',
    warranty: '1 Month Checking + 1 Year Service Support',
  },
  {
    id: 'desktop-workstation-1',
    name: 'Custom Office & POS Compact Desktop PC System',
    category: 'Laptops & PCs',
    condition: 'Brand New',
    priceEstimate: 'Custom Built According to Budget',
    imageUrl: shopDesktopPcJpg,
    imageWebp: shopDesktopPcWebp,
    imageAlt: 'Custom Office & POS Compact Desktop PC Workstation',
    description: 'Durable, silent micro-tower PC built for continuous 24/7 billing counter or office accounting usage.',
    specs: ['Fast Multi-Core Processor', 'Solid State Drive for 5-sec Booting', 'Original Power Supply with Surge Guard', 'Pre-installed Licensed Utility Tools'],
    availability: 'In Stock (Sialkot)',
    warranty: '1 Year Warranty',
  },
  {
    id: 'laser-printer-1',
    name: 'HP / Canon Heavy-Duty Office Laser Printer',
    category: 'Printers & Scanners',
    condition: 'Original Genuine',
    priceEstimate: 'Contact for Models & Prices',
    imageUrl: shopLaserPrinterJpg,
    imageWebp: shopLaserPrinterWebp,
    imageAlt: 'HP Canon Heavy-Duty Double-Sided Office Laser Printer',
    description: 'Low-cost per page laser printer designed for export invoices, bills of lading, and high-volume office paperwork in Sialkot.',
    specs: ['High Yield Toner Cartridge', 'Duplex Double-Sided Printing', 'Wi-Fi & Network Printing', 'Crisp 1200 DPI Text Output'],
    availability: 'In Stock (Sialkot)',
    warranty: 'Complete Service & Parts Backing',
  },
  {
    id: 'upgrade-ssd-1',
    name: 'Super-Fast NVMe / SATA SSD Upgrade Kit (256GB / 512GB / 1TB)',
    category: 'Upgrades & Accessories',
    condition: 'Brand New',
    priceEstimate: 'Includes Free On-Site Installation',
    imageUrl: shopNvmeSsdJpg,
    imageWebp: shopNvmeSsdWebp,
    imageAlt: 'Super-Fast NVMe SATA SSD Upgrade Kit with Free Windows Migration',
    description: 'Revitalize any slow laptop or desktop. We transfer your existing data and Windows with zero data loss on-site in Sialkot.',
    specs: ['Up to 3500 MB/s Read Speed', 'Original Brands (Samsung, Kingston, Crucial)', 'Free Windows Migration Included', 'Massive Speed Upgrade'],
    availability: 'In Stock (Sialkot)',
    warranty: '3 Years Warranty',
  },
  {
    id: 'pos-paper-1',
    name: 'Premium Thermal Paper Rolls (80mm & 57mm) - Box Pack',
    category: 'Upgrades & Accessories',
    condition: 'Brand New',
    priceEstimate: 'Wholesale Box Rates',
    imageUrl: shopThermalPaperJpg,
    imageWebp: shopThermalPaperWebp,
    imageAlt: 'Premium Thermal Paper Rolls 80mm & 57mm Box Pack',
    description: 'Dark, clear printing thermal paper with long print preservation. Does not damage printer heating heads.',
    specs: ['BPA Free High Quality Paper', 'Available in 80x70, 80x80 & 57mm', 'Clear Deep-Black Printout', 'Bulk Delivery Available in Sialkot'],
    availability: 'In Stock (Sialkot)',
    warranty: 'Guaranteed Quality & Meterage',
  },
];

export const SIALKOT_HIGHLIGHTS = [
  'Free Initial Phone Consultation & Remote Diagnosis',
  'On-Site Technician Dispatched Across Sialkot within Hours',
  'Direct WhatsApp Connectivity for Instant Price Quotes',
  'Transparent Hardware Invoicing with Zero Hidden Lab Charges',
  'Post-Deployment Software Training for Your Cashiers & Staff',
];

export const FAQ_ITEMS: FaqItem[] = [
  // 1. Dubai-to-Pakistan Transition
  {
    id: 'faq-dubai-transition-1',
    category: 'dubai-transition',
    question: 'Why has EVONIX TECHNOLOGIES transitioned from Dubai to Pakistan?',
    answer: 'After serving 20+ years in the competitive Dubai and UAE enterprise IT sectors, our founders realized that businesses, exporters, and retail shops in Sialkot frequently struggle with unreliable service, amateur web developers, and counterfeit computer components. We established our full-scale tech hub in Sialkot to deliver the exact same corporate Gulf standards, authentic hardware parts, and certified engineering workflows directly to the people and businesses of Pakistan at accessible local rates.',
    highlightBadge: '20+ Years UAE Legacy',
    actionText: 'Read Our Story',
    actionPrefill: 'about',
  },
  {
    id: 'faq-dubai-transition-2',
    category: 'dubai-transition',
    question: 'Are your service standards, hardware warranties, and coding practices identical to Dubai?',
    answer: 'Absolutely. We apply the exact same rigorous enterprise standards used in UAE corporate banking and hospitality projects. Every website is built with clean, security-audited code, fast CDN hosting, and high SEO standards. Every laptop or PC hardware repair uses genuine ICs, original thermal pastes, and ESD-safe diagnostic instruments. Furthermore, our hardware components come backed with genuine warranty coverage.',
    highlightBadge: 'Dubai Standard Certified',
  },
  {
    id: 'faq-dubai-transition-3',
    category: 'dubai-transition',
    question: 'Do you still support and serve international or UAE-based clients from Pakistan?',
    answer: 'Yes, our international corporate desk remains actively functional. We continue to engineer cloud ERPs, web applications, and provide 24/7 remote infrastructure management for clients across Dubai, Abu Dhabi, Sharjah, the UK, and North America. Local Sialkot clients benefit from this exact same global-scale operational stability.',
    highlightBadge: 'Global Infrastructure',
  },

  // 2. Service Pricing & Quotes
  {
    id: 'faq-pricing-1',
    category: 'pricing',
    question: 'How does EVONIX calculate prices for websites, software, and repair services?',
    answer: 'We maintain a 100% transparent pricing policy with zero hidden fees. For software and web development, we provide an itemized fixed-scope proposal after a free consultation. For computer and printer repairs, we perform an initial diagnostic and communicate the exact cost before opening any hardware. You never receive unexpected technician bills or surprise lab surcharges.',
    highlightBadge: 'Upfront Fixed Pricing',
    actionText: 'Request Free Quote',
    actionPrefill: 'quote',
  },
  {
    id: 'faq-pricing-2',
    category: 'pricing',
    question: 'What is your "Zero Charge If Unresolved" policy?',
    answer: 'If our certified technicians visit your doorstep or examine your hardware in our lab and are unable to resolve the fault or provide a viable technical solution, you are charged PKR 0 for the repair. We only bill for confirmed, verified results.',
    highlightBadge: '100% Risk Free',
  },
  {
    id: 'faq-pricing-3',
    category: 'pricing',
    question: 'Do you have bundled packages for new retail shops, supermarkets, and sports exporters in Sialkot?',
    answer: 'Yes! We offer popular turnkey bundles combining Touchscreen POS terminals, thermal receipt printers, laser barcode scanners, licensed billing software, and staff cashier training at special package pricing. Exporters also enjoy comprehensive brand packages covering export e-commerce websites, corporate email setup, and product catalog design.',
    highlightBadge: 'Turnkey Retail Bundles',
    actionText: 'View POS Bundles',
    actionPrefill: 'shop',
  },

  // 3. Onsite Technical Support Process in Sialkot
  {
    id: 'faq-onsite-1',
    category: 'onsite-support',
    question: 'Which areas in Sialkot are covered by your doorstep on-site IT technicians?',
    answer: 'We provide doorstep home and office technical visits throughout Sialkot city and surrounding industrial hubs, including Sialkot Cantt, Paris Road, Defense Road, Kashmir Road, Ugoki, Sambrial, Daska Road, Hunter Pura, Commissioner Road, Model Town, Small Industrial Estate, and adjoining industrial clusters.',
    highlightBadge: 'Sialkot-Wide Coverage',
    actionText: 'Book Doorstep Visit',
    actionPrefill: 'On-Site Home & Office Service',
  },
  {
    id: 'faq-onsite-2',
    category: 'onsite-support',
    question: 'How quickly does a technician arrive after I place an on-site request?',
    answer: 'For standard on-site requests across urban Sialkot (Cantt, Paris Rd, Defense Rd), our mobile technician is typically dispatched within 2 to 4 hours of confirmation. For urgent retail checkout breakdowns or corporate server down situations, we offer expedited priority dispatch. You can also schedule an exact appointment time that suits your business hours.',
    highlightBadge: 'Same-Day Dispatch',
  },
  {
    id: 'faq-onsite-3',
    category: 'onsite-support',
    question: 'What repairs can be done at my premises versus your technical lab?',
    answer: 'Over 85% of standard technical issues are completed right at your doorstep: Windows reinstallation, virus/malware eradication, high-speed SSD upgrades with zero data loss, RAM upgrades, Wi-Fi router setup, network cable crimping, and thermal receipt printer driver configuration. For advanced chip-level micro-soldering, short-circuit diagnostics, or liquid-damaged laptop motherboards, the unit is safely booked with a formal tracking receipt into our static-safe lab and returned post-testing.',
    highlightBadge: 'Doorstep + Lab Backup',
  },
  {
    id: 'faq-onsite-4',
    category: 'onsite-support',
    question: 'How do I book an on-site visit or hardware diagnosis?',
    answer: 'Booking takes under 60 seconds: simply call or WhatsApp our official support desk at +92 326 324 40002, or submit the "Get a Free Quote" form on this website specifying your location and hardware issue. Our service desk will confirm your slot immediately.',
    highlightBadge: 'Quick WhatsApp Booking',
    actionText: 'Call +92 326 324 40002',
    actionPrefill: 'contact',
  },

  // 4. Software, POS & Hardware Engineering
  {
    id: 'faq-software-1',
    category: 'software-hardware',
    question: 'Does your retail POS billing software work offline during internet breakdowns?',
    answer: 'Yes! Our custom POS software is built with an offline-first architecture. Cashiers can continue scanning barcodes, generating customer receipts, and calculating sales totals even if your internet disconnects. Once the connection is restored, all data automatically syncs with your central cloud database.',
    highlightBadge: 'Offline-First POS',
  },
  {
    id: 'faq-software-2',
    category: 'software-hardware',
    question: 'Do you provide training for our cashiers and staff after installing software or POS?',
    answer: 'Every software and POS system deployment includes hands-on training for your managers, accountants, and retail cashiers. We also provide user manual documentation and direct WhatsApp priority support for any day-to-day operational queries.',
    highlightBadge: 'Full Staff Training',
  },
  {
    id: 'faq-software-3',
    category: 'software-hardware',
    question: 'How does EVONIX safeguard our company data during laptop or PC servicing?',
    answer: 'We adhere to strict Dubai corporate data privacy protocols. Your private files, accounting databases, emails, and sensitive documents are never accessed, copied, or altered. We offer encrypted pre-repair drive imaging upon request and perform all software repairs under transparent observation.',
    highlightBadge: 'Dubai Data Privacy',
  },
];

