// Automated Local SEO Landing Page Generator Data Module
// Service-Location Cluster Matrices for Daska, Sambrial, and Wazirabad (Sialkot Industrial Triangle)

export interface LocalCity {
  slug: 'daska' | 'sambrial' | 'wazirabad';
  name: string;
  urduName: string;
  district: string;
  tagline: string;
  postalCode: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  distanceFromHQLab: string;
  dispatchEtaMinutes: string;
  focusIndustries: string[];
  keyCommercialHubs: string[];
  infraChallenge: string;
  localSolutionNote: string;
  phoneContact: string;
  verifiedClients: {
    name: string;
    industry: string;
    serviceProvided: string;
    quote: string;
  }[];
}

export interface ClusterService {
  slug: 'it-consultancy' | 'hardware-maintenance' | 'web-development' | 'pos-systems' | 'laptop-repair';
  name: string;
  shortName: string;
  badge: string;
  summary: string;
  detailedSpecs: string[];
  equipmentUsed: string[];
  turnaroundTime: string;
  startingPrice: string;
  warranty: string;
}

export interface LocationServiceCluster {
  citySlug: LocalCity['slug'];
  serviceSlug: ClusterService['slug'];
  metaTitle: string;
  metaDescription: string;
  primaryKeywords: string[];
  headline: string;
  subheadline: string;
  heroPitch: string;
  industrialBenefit: string;
  localFaqs: {
    q: string;
    a: string;
  }[];
}

export const LOCAL_CITIES: Record<LocalCity['slug'], LocalCity> = {
  daska: {
    slug: 'daska',
    name: 'Daska',
    urduName: 'ڈسکہ - سرجیکل و زرعی مشینری کوریڈور',
    district: 'Sialkot District, Punjab, Pakistan',
    tagline: 'Surgical Instruments Forging, Veterinary Tools & Agri-Machinery Hub',
    postalCode: '51010',
    coordinates: {
      lat: 32.3242,
      lng: 74.3508,
    },
    distanceFromHQLab: '24.5 km via Daska Road',
    dispatchEtaMinutes: '35 - 45 Minutes',
    focusIndustries: [
      'Surgical Instruments & Scissors Forging',
      'Veterinary Medical Tools Manufacturing',
      'Agricultural Implements & Harvesting Machinery',
      'Flour Mills & Food Processing Plants',
      'College Road & Nishtar Road Retail Commercial Bazars',
    ],
    keyCommercialHubs: [
      'Daska Road Industrial Belt',
      'College Road Commercial Market',
      'Nishtar Road Electronics Center',
      'Gujranwala Road Engineering Zone',
      'Sambrial-Daska Bypass',
    ],
    infraChallenge:
      'Frequent industrial feeder voltage fluctuations and generator transfer phase-shifts that disrupt factory CNC servers, blow PC power supplies, and cause CAD/CAM workstation blue-screens.',
    localSolutionNote:
      'evonix deploys industrial online double-conversion UPS line conditioners, surge-arrestor network switches, and rapid on-site motherboard technicians reachable in under 45 minutes.',
    phoneContact: '+92 316 7637844',
    verifiedClients: [
      {
        name: 'Al-Raziq Surgical Forging Daska',
        industry: 'Surgical Instruments Exporter',
        serviceProvided: 'Industrial IT Infrastructure & Server AMC',
        quote:
          'evonix installed our dual-WAN failover firewall and repaired two crucial CNC controller motherboards on-site in Daska within 2 hours. Exceptional Dubai-level precision.',
      },
      {
        name: 'Falcon Medico Instruments',
        industry: 'Veterinary Forceps Manufacturer',
        serviceProvided: 'Export B2B Web Portal & RFID Inventory POS',
        quote:
          'Our German buyers required ISO-compliant batch traceability. evonix built an automated RFQ portal that increased our international wholesale orders by 40%.',
      },
    ],
  },
  sambrial: {
    slug: 'sambrial',
    name: 'Sambrial',
    urduName: 'سمبڑیال - ڈرائی پورٹ و ایئرپورٹ لاجسٹکس زون',
    district: 'Sialkot District, Punjab, Pakistan',
    tagline: 'Sialkot International Airport & Dry Port Trust Export Logistics Center',
    postalCode: '51030',
    coordinates: {
      lat: 32.4776,
      lng: 74.3524,
    },
    distanceFromHQLab: '16.8 km via Airport Corridor',
    dispatchEtaMinutes: '25 - 35 Minutes',
    focusIndustries: [
      'Sialkot Dry Port Trust (SDPT) Customs Clearing',
      'Sialkot International Airport (SIAL) Air Cargo Hub',
      'International Freight Forwarders & Bonded Warehousing',
      'Export Processing Zone (EPZ) Light Manufacturing',
      'Wazirabad-Sambrial Road Commercial Strip',
    ],
    keyCommercialHubs: [
      'Sialkot Dry Port Terminal Complex',
      'SIAL Airport Cargo City Road',
      'Sambrial Main Bazar & Court Road',
      'Export Processing Zone Corridor',
      'Airport Highway Logistics Park',
    ],
    infraChallenge:
      'Strict zero-downtime WeBOC customs clearing deadlines. Thermal shipping barcode printers, cargo scales, and customs gateway servers cannot afford even 30 minutes of outage during flight cut-offs.',
    localSolutionNote:
      'evonix provides high-priority 25-minute field engineer response for Sambrial clearing agents, redundant thermal head spares, and automated WeBOC data mirror setups.',
    phoneContact: '+92 316 7637844',
    verifiedClients: [
      {
        name: 'Sambrial Global Freight Logistics',
        industry: 'Air & Sea Freight Forwarding',
        serviceProvided: 'WeBOC Server Redundancy & 24/7 Hardware AMC',
        quote:
          'When our primary customs clearing server power supply blew at 4 PM before SIAL cargo departure, evonix arrived in 25 minutes with a hot-swap PSU and saved our shipment.',
      },
      {
        name: 'Horizon Cargo Forwarders',
        industry: 'Dry Port Bonded Carrier',
        serviceProvided: 'High-Speed 203 DPI Barcode Labeling System',
        quote:
          'We print thousands of export carton labels daily. evonix maintains all our industrial Zebra and Xprinter thermal units with zero paper-jam delays.',
      },
    ],
  },
  wazirabad: {
    slug: 'wazirabad',
    name: 'Wazirabad',
    urduName: 'وزیرآباد - کٹلری، چاقو سازی اور میٹل کرافٹ مرکز',
    district: 'Wazirabad District (Bordering Sialkot), Punjab, Pakistan',
    tagline: 'World-Renowned Cutlery, Hunting Knife Forging & Stainless Steel Hub',
    postalCode: '52000',
    coordinates: {
      lat: 32.4419,
      lng: 74.1197,
    },
    distanceFromHQLab: '34.0 km via Sambrial-Wazirabad GT Road',
    dispatchEtaMinutes: '40 - 50 Minutes',
    focusIndustries: [
      'Handcrafted Hunting & Damascus Steel Knives',
      'Commercial Culinary & Kitchen Cutlery Forging',
      'Surgical Scissors & Pocket Tool Manufacturing',
      'Nizamabad Metal Craft & Plating Clusters',
      'GT Road Cutlery Showrooms & Wholesale Trading Centers',
    ],
    keyCommercialHubs: [
      'Nizamabad Industrial Cluster',
      'Wazirabad GT Road Cutlery Market',
      'Circular Road Commercial District',
      'Sialkot-Wazirabad Junction Road',
      'Steel Market & Tool Forging Area',
    ],
    infraChallenge:
      'Fine conductive metal grinding and polishing dust floating in workshops, settling on computer fans and motherboard heatsinks, causing sudden thermal shutdowns and motherboard short circuits.',
    localSolutionNote:
      'evonix engineers install sealed positive-pressure dust filters, chemical conformal coatings on motherboards, and robust offline POS billing for bustling GT Road showrooms.',
    phoneContact: '+92 316 7637844',
    verifiedClients: [
      {
        name: 'Imperial Cutlery Works Wazirabad',
        industry: 'Damascus Steel Knife Exporter',
        serviceProvided: '3D Blade Visualizer E-Commerce Portal',
        quote:
          'evonix built an international catalog that allows US and European collectors to inspect our Damascus steel fold patterns in real-time 3D. Truly world-class.',
      },
      {
        name: 'Pearl Kitchenware Showroom',
        industry: 'Wholesale & Retail Cutlery',
        serviceProvided: 'Multi-Counter Offline POS Billing Software',
        quote:
          'Our GT Road showroom needed billing that never freezes when broadband dips. evonix POS has been running uninterrupted for 14 months without a single glitch.',
      },
    ],
  },
};

export const CLUSTER_SERVICES: Record<ClusterService['slug'], ClusterService> = {
  'it-consultancy': {
    slug: 'it-consultancy',
    name: 'Industrial IT Consultancy & Enterprise Systems Architecture',
    shortName: 'IT Consultancy',
    badge: 'Enterprise Architecture & Cloud',
    summary:
      'Strategic IT infrastructure planning, WeBOC customs network hardening, dual-fiber SD-WAN failover, automated Synology NAS data protection, and digital workflow transformation for manufacturing plants.',
    detailedSpecs: [
      'Dual-Fiber WAN Failover & Mikrotik Firewall Setup',
      'WeBOC Customs & FBR Digital Sales Tax Server Hardening',
      'Synology Immutable NAS On-Site & Cloud Backup Mirror',
      'Cat6A 10Gbps Factory Backbone Cabling & Managed Switches',
      'Ransomware Immunity Protocols & Endpoint Threat Isolation',
    ],
    equipmentUsed: ['Fluke DSX Cable Analyzer', 'Mikrotik Cloud Core Routers', 'Cisco Catalyst Managed Switches', 'Synology RackStation NAS'],
    turnaroundTime: 'Same-Day Assessment (Audit Report in 24 Hrs)',
    startingPrice: 'Tailored Industrial SLA',
    warranty: '100% Uptime Architecture Guarantee',
  },
  'hardware-maintenance': {
    slug: 'hardware-maintenance',
    name: 'Industrial Hardware Maintenance Services & Factory AMC',
    shortName: 'Hardware Maintenance (AMC)',
    badge: 'Comprehensive Annual Care',
    summary:
      'Preventative annual maintenance contracts (AMC) for multi-user accounts servers, CAD workstations, industrial thermal printers, 2D barcode scanners, and factory office networks with guaranteed field response.',
    detailedSpecs: [
      'Bi-Monthly Scheduled Preventative Deep Chemical Cleaning',
      'Thermal Paste Refresh (Noctua NT-H2) on Production Workstations',
      'Hot-Swap Power Supply & SMPS Emergency Replacements',
      'Thermal Receipt & Shipping Label Printer Roller Maintenance',
      'Priority 35-Minute On-Site Emergency Dispatch Guarantee',
    ],
    equipmentUsed: ['ESD Safe Vacuum & Blowers', 'Digital Multimeters', 'Thermal Imagers', 'Hot-Swap Spares Inventory'],
    turnaroundTime: 'Guaranteed 35 - 50 Min Field Dispatch',
    startingPrice: 'Monthly & Annual Custom AMC Tiers',
    warranty: '90-Day Comprehensive Warranty on Replaced Hardware',
  },
  'web-development': {
    slug: 'web-development',
    name: 'B2B Export Website Development & Custom Manufacturing Portals',
    shortName: 'Export Website Development',
    badge: 'High-Speed React / Next.js',
    summary:
      'Lightning-fast web applications, 3D interactive product configurators for surgical/cutlery goods, multi-currency wholesale RFQ catalogs, and international search engine dominance built to Dubai engineering standards.',
    detailedSpecs: [
      'Sub-Second Loading via Next.js / React Edge Architecture',
      'Bespoke Interactive 3D Product & Uniform Configurator',
      'Automated RFQ & Wholesale Tiered Invoicing Gateways',
      'Global SEO Structured Data (Schema.org) for US/EU Exporters',
      'Mobile-First Touch Optimized Responsive Architecture',
    ],
    equipmentUsed: ['Vite / React Enterprise Stack', 'Tailwind CSS High-Contrast UI', 'Cloudflare Edge CDN', 'Lighthouse 99+ Core Vitals Engine'],
    turnaroundTime: '7 - 14 Days Production Turnaround',
    startingPrice: 'Affordable Transparent Milestone Billing',
    warranty: '1-Year Maintenance & SLA Support Included',
  },
  'pos-systems': {
    slug: 'pos-systems',
    name: 'Retail & Wholesale Point of Sale (POS) Software Solutions',
    shortName: 'Retail & Wholesale POS',
    badge: 'Offline-First Billing',
    summary:
      'Ultra-reliable offline POS software with instant 80mm thermal receipt printing, dual-counter wholesale billing, FBR sales tax integration, multi-warehouse sync, and handheld barcode scanning for retail shops.',
    detailedSpecs: [
      'Zero-Latency Offline-First Architecture (Never Freezes)',
      'FBR Digital Invoicing & Fiscal Tier-1 QR Code Compliance',
      'Multi-Counter & Multi-Warehouse Cloud Sync When Online',
      'Barcode Label Generation for 1D/2D and GS1 Formats',
      'Comprehensive Accounts, Gross Profit & Dead-Stock Audits',
    ],
    equipmentUsed: ['Thermal Receipt Printers (80mm Auto-Cutter)', '2D Handheld Barcode Scanners', 'Touch Terminal Workstations', 'Heavy-Duty Cash Drawers'],
    turnaroundTime: 'Ready Deployment in 24 - 48 Hours',
    startingPrice: 'Single-Counter & Multi-Branch Licenses',
    warranty: 'Lifetime Database Integrity Guarantee',
  },
  'laptop-repair': {
    slug: 'laptop-repair',
    name: 'Doorstep Laptop Repair & Component-Level Motherboard Micro-Soldering',
    shortName: 'Laptop Motherboard Repair',
    badge: 'Chip-Level Lab & On-Site',
    summary:
      'Component-level SMD micro-soldering, 19V power rail short circuit diagnosis, factory-grade hinge structural restoration, cracked OLED/IPS display replacements, and free workshop bench diagnosis without board replacement.',
    detailedSpecs: [
      'Component-Level SMD & MOSFET Replacement under Stereo Microscope',
      '19V Charging Rail & Power IC Fault Diagnostics',
      'Damaged Laptop Hinge Reconstruction with High-Strength Chemical Epoxy',
      'Cracked LED/IPS Screen Replacement in under 45 Minutes',
      'Original Replacement Batteries & High-Speed NVMe SSD Upgrades',
    ],
    equipmentUsed: ['Quick 861DW Hot Air Rework Station', 'Stereo Zoom Microscope', 'FLIR Thermal Diagnostic Camera', 'Programmer for BIOS EEPROM'],
    turnaroundTime: 'Same-Day Fast Track (Emergency 2-Hr Turnaround)',
    startingPrice: '100% Free Diagnostics (Pay Only for Successful Fix)',
    warranty: '90-Day Written Hardware Warranty',
  },
};

// Generates dynamic cluster landing page data
export function getClusterData(citySlug: LocalCity['slug'], serviceSlug: ClusterService['slug']): LocationServiceCluster {
  const city = LOCAL_CITIES[citySlug];
  const service = CLUSTER_SERVICES[serviceSlug];

  const metaTitle = `${service.shortName} in ${city.name} – evonix technologies`;
  const metaDescription = `Looking for ${service.shortName.toLowerCase()} in ${city.name}? evonix provides doorstep field support in ${city.dispatchEtaMinutes}. 20+ years Dubai engineering expertise for ${city.name} businesses.`;

  const primaryKeywords = [
    `${service.shortName.toLowerCase()} ${city.name.toLowerCase()}`,
    `${service.name.toLowerCase()} in ${city.name.toLowerCase()}`,
    `best ${service.shortName.toLowerCase()} ${city.name.toLowerCase()}`,
    `${city.name.toLowerCase()} ${service.shortName.toLowerCase()} services`,
    `emergency ${service.shortName.toLowerCase()} ${city.name.toLowerCase()}`,
    `doorstep IT support ${city.name.toLowerCase()}`,
  ];

  return {
    citySlug,
    serviceSlug,
    metaTitle,
    metaDescription,
    primaryKeywords,
    headline: `${service.shortName} in ${city.name}`,
    subheadline: `On-Site Engineering Dispatch in ${city.dispatchEtaMinutes} across ${city.name}`,
    heroPitch: `Engineered specifically for ${city.name}'s manufacturing, wholesale, and commercial exporters. Backed by 20+ years of Dubai infrastructure expertise, now delivering rapid local on-site support right to your factory doorstep.`,
    industrialBenefit: `In ${city.name}, where ${city.infraChallenge.toLowerCase()} evonix provides specialized solutions including ${city.localSolutionNote.toLowerCase()}`,
    localFaqs: [
      {
        q: `How quickly can an evonix engineer arrive at my location in ${city.name}?`,
        a: `Our certified field engineers maintain an active mobile patrol across the Sialkot-${city.name} corridor. For ${city.name}, our guaranteed dispatch arrival window is ${city.dispatchEtaMinutes} from your call or WhatsApp booking.`,
      },
      {
        q: `Do you provide on-site services or must we visit your central lab?`,
        a: `We provide full on-site doorstep service directly at your factory, warehouse, office, or showroom in ${city.name}. If micro-soldering or thermal chamber testing is required, our courier securely transports your equipment under digital chain-of-custody tracking.`,
      },
      {
        q: `What warranty do you offer on ${service.shortName} in ${city.name}?`,
        a: `All hardware repairs and maintenance components carry our 90-day written warranty. Software and IT consulting come with guaranteed SLA response times and dedicated priority phone/WhatsApp technical support.`,
      },
      {
        q: `Can you integrate with existing factory systems in ${city.name}?`,
        a: `Yes. Whether you are running legacy CNC machines, multi-user accounts networks, WeBOC customs portals, or retail barcode systems in ${city.name}, our engineers ensure 100% interoperability without interrupting your daily operations.`,
      },
    ],
  };
}

// Helper to get all 15 location-service combinations
export function getAllLocationServiceCombinations(): { citySlug: LocalCity['slug']; serviceSlug: ClusterService['slug'] }[] {
  const cities: LocalCity['slug'][] = ['daska', 'sambrial', 'wazirabad'];
  const services: ClusterService['slug'][] = ['it-consultancy', 'hardware-maintenance', 'web-development', 'pos-systems', 'laptop-repair'];

  const combos: { citySlug: LocalCity['slug']; serviceSlug: ClusterService['slug'] }[] = [];
  for (const city of cities) {
    for (const service of services) {
      combos.push({ citySlug: city, serviceSlug: service });
    }
  }
  return combos;
}
