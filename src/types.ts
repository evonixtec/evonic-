export type NavPageId =
  | 'home'
  | 'services'
  | 'portfolio'
  | 'shop'
  | 'about'
  | 'contact'
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
  | 'ce-ukca-compliance-generator';

export interface ServiceItem {
  id: string;
  title: string;
  urduTitle: string;
  description: string;
  features: string[];
  icon: string;
  category: 'software' | 'hardware' | 'consultancy';
}
