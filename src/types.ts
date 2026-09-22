export type SectionId = 'home' | 'about' | 'services' | 'technologies' | 'portfolio' | 'shop' | 'contact';

export interface ServiceItem {
  id: string;
  number: string;
  title: string;
  summary: string;
  iconName: string;
  imageUrl?: string;
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
