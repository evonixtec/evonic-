export type NavPageId =
  | 'home'
  | 'services'
  | 'portfolio'
  | 'shop'
  | 'about'
  | 'guides'
  | 'contact'
  | 'locations'
  | 'tools'
  | 'invoice'
  | 'ecommerce-calculator'
  | 'cbm-calculator'
  | 'developer-cost-calculator'
  | 'ai-visibility-checker'
  | 'export-barcode-studio'
  | 'live-repair-tracker'
  | 'printer-diagnostics'
  | 'factory-network-tester'
  | 'uk-eu-vat-calculator'
  | 'us-duty-nexus-estimator'
  | 'ce-ukca-compliance-generator'
  | 'ai-trip-planner'
  | 'ai-travel-tools';

export type PageId = NavPageId;

export type SectionId =
  | 'home'
  | 'hero-slider-section'
  | 'services'
  | 'portfolio'
  | 'shop'
  | 'about'
  | 'contact'
  | 'tools'
  | 'faq'
  | 'technologies'
  | 'reach'
  | 'guides'
  | 'blogs'
  | 'testimonials'
  | 'why-us';

export interface ServiceItem {
  id: string;
  number?: string;
  title: string;
  urduTitle?: string;
  summary?: string;
  description?: string;
  deliverables?: string[];
  features?: string[];
  icon?: string;
  category?: 'software' | 'hardware' | 'consultancy' | string;
  imageUrl?: string;
  imageWebp?: string;
  imageAlt?: string;
}

export interface ShopProduct {
  id: string;
  name: string;
  category: string;
  condition: string;
  priceEstimate: string;
  description: string;
  specs: string[];
  warranty: string;
  availability: string;
  imageUrl?: string;
  imageWebp?: string;
  imageAlt?: string;
}

export interface PortfolioCategory {
  id: string;
  title: string;
  categoryName?: string;
  description: string;
  industry: string;
  tags: string[];
  deliverables: string[];
  imageUrl?: string;
  imageWebp?: string;
  imageAlt?: string;
  url?: string;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  category: string;
  highlightBadge?: string;
}

export interface TestimonialItem {
  id: string;
  clientName: string;
  role: string;
  company: string;
  location: string;
  region: 'dubai' | 'sialkot';
  flag: string;
  industry: string;
  projectContext: {
    serviceType: string;
    timeline: string;
    keyOutcome: string;
  };
  quote: string;
  rating: number;
  verifiedBadge: string;
  avatarBg: string;
}
