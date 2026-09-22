export type SectionId = 'home' | 'about' | 'services' | 'blogs' | 'reach' | 'technologies' | 'portfolio' | 'testimonials' | 'shop' | 'faq' | 'contact';

export interface TestimonialItem {
  id: string;
  clientName: string;
  role: string;
  company: string;
  location: string;
  region: 'dubai' | 'sialkot';
  flag: string;
  projectContext: {
    serviceType: string;
    timeline: string;
    keyOutcome: string;
  };
  quote: string;
  rating: number;
  verifiedBadge: string;
  avatarBg: string;
  industry: string;
}

export interface FaqItem {
  id: string;
  category: 'dubai-transition' | 'pricing' | 'onsite-support' | 'software-hardware';
  question: string;
  answer: string;
  highlightBadge?: string;
  actionText?: string;
  actionPrefill?: string;
}

export interface ServiceItem {
  id: string;
  number: string;
  title: string;
  summary: string;
  iconName: string;
  imageUrl?: string;
  imageWebp?: string;
  imageAlt?: string;
  features: string[];
  dubaiExperienceNote?: string;
  deliverables: string[];
}

export interface PortfolioCategory {
  id: string;
  type: 'website' | 'software';
  title: string;
  categoryName: string;
  industry: string;
  deliverables: string[];
  description: string;
  tags: string[];
  dubaiHighlight: string;
  imageUrl?: string;
  imageWebp?: string;
  imageAlt?: string;
}

export interface ShopProduct {
  id: string;
  name: string;
  category: 'Laptops & PCs' | 'POS Hardware' | 'Printers & Scanners' | 'Upgrades & Accessories';
  condition: 'Brand New' | 'Certified Refurbished (UAE Import)' | 'Original Genuine';
  priceEstimate: string;
  description: string;
  specs: string[];
  availability: 'In Stock (Sialkot)' | 'Available on Order';
  warranty: string;
  imageUrl?: string;
  imageWebp?: string;
  imageAlt?: string;
}

export interface QuoteFormState {
  fullName: string;
  phone: string;
  email: string;
  serviceType: string;
  locationArea: string;
  isHomeService: boolean;
  budgetRange: string;
  details: string;
}
