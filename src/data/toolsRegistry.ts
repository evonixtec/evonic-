// ============================================================================
// CENTRAL DATA REGISTRY: TOOLS METADATA & RE-ARCHITECTURE
// Single Source of Truth for /tools/[slug] dynamic routing, SEO & Store CTA
// ============================================================================

export interface ToolMetadata {
  slug: string;
  name: string;
  h1: string;
  metaTitle: string;
  metaDescription: string;
  category: 'Export & B2B' | 'Retail POS' | 'Finance & Tax' | 'Logistics' | 'Hardware & Tech';
  targetAudience: string;
  hardwareCta?: {
    headline: string;
    subtext: string;
    buttonText: string;
    targetUrl: string;
  };
  howToSteps: string[];
  faqs: { q: string; a: string }[];
}

export const toolsRegistry: Record<string, ToolMetadata> = {
  // 1. INVOICE GENERATOR
  'invoice-generator': {
    slug: 'invoice-generator',
    name: 'Free POS Thermal Receipt & Invoice Generator',
    h1: 'Online Thermal Receipt & POS Billing Generator',
    metaTitle: 'Free Retail POS Invoice Generator | 80mm Slip Maker',
    metaDescription: 'Generate instant retail billing invoices and thermal receipts online. Optimized for standard 80mm ESC/POS thermal printers with barcode output.',
    category: 'Retail POS',
    targetAudience: 'Pakistani retailers, supermarkets, pharmacies, and distributors.',
    hardwareCta: {
      headline: 'Upgrade to Complete Hardware Automation',
      subtext: 'Stop manual bill generation. Deploy high-speed 80mm ESC/POS Thermal Printers and Touch POS terminals with 1-year local warranty.',
      buttonText: 'View POS Hardware Catalog',
      targetUrl: 'https://store.evonixtec.com',
    },
    howToSteps: [
      'Enter your business name, STRN/NTN, and shop address.',
      'Add items, quantities, unit prices, and applicable sales tax.',
      'Select thermal slip format (80mm standard or 58mm compact).',
      'Click Print to send directly to your local thermal printer or save as PDF.',
    ],
    faqs: [
      {
        q: 'Can I print directly to an 80mm ESC/POS receipt printer?',
        a: 'Yes. The layout automatically strips unnecessary browser margins and compiles into standard 80mm receipt width.',
      },
      {
        q: 'Does it support multi-currency calculations?',
        a: 'Yes, it supports USD, EUR, GBP, AED, and PKR with automatic number-to-words currency translation.',
      },
    ],
  },

  // 2. EXPORT CBM CALCULATOR
  'export-cbm-calculator': {
    slug: 'export-cbm-calculator',
    name: 'B2B Industrial CBM & Freight Container Allocator',
    h1: 'Industrial CBM Calculator & Container Loading Optimizer',
    metaTitle: 'Industrial CBM Calculator | 20ft & 40ft Container Engine',
    metaDescription: 'Calculate volumetric weight and container space utilization for 20ft, 40ft, and 40ft High Cube containers. Built for Sialkot export consignments.',
    category: 'Logistics',
    targetAudience: 'Surgical, sports, and leather goods exporters.',
    hardwareCta: {
      headline: 'Need Industrial Thermal Shipping Label Printers?',
      subtext: 'Print standard 4x6 inch (100x150mm) outer carton barcode labels compliant with international freight forwarders.',
      buttonText: 'Explore Shipping Label Printers',
      targetUrl: 'https://store.evonixtec.com',
    },
    howToSteps: [
      'Enter individual carton dimensions (Length, Width, Height) in centimeters or inches.',
      'Input total carton quantity and gross weight per box.',
      'Select container target: 20ft Standard, 40ft Standard, or 40ft High Cube.',
      'Review total CBM, volumetric weight comparison, and remaining container capacity.',
    ],
    faqs: [
      {
        q: 'Does this calculate air courier volumetric divisor?',
        a: 'Yes, it provides side-by-side comparisons between Air Express (divisor 5000) and Air Cargo (divisor 6000).',
      },
      {
        q: 'What is the maximum CBM capacity of a 40ft High Cube container?',
        a: 'A 40ft High Cube container typically holds between 68 to 72 CBM of usable packed cartons.',
      },
    ],
  },

  // 3. BARCODE LABEL STUDIO
  'barcode-label-studio': {
    slug: 'barcode-label-studio',
    name: 'Export Barcode Label Studio',
    h1: 'GS1-128 & Code-128 Shipping Carton Barcode Generator',
    metaTitle: 'Export Barcode Label Studio | Outer Carton 4x6 Labels',
    metaDescription: 'Generate compliant Code-128 and GS1 shipping carton labels for export shipments. Direct print compatibility with Zebra, TSC, and Xprinter.',
    category: 'Export & B2B',
    targetAudience: 'Export manufacturing compliance officers and packaging units.',
    hardwareCta: {
      headline: 'Equip Your Packing Line with Barcode Scanners',
      subtext: 'High-speed wireless 1D/2D QR-code handheld scanners with instant USB plug-and-play capability.',
      buttonText: 'Shop Handheld Scanners',
      targetUrl: 'https://store.evonixtec.com',
    },
    howToSteps: [
      'Choose barcode symbology (Code-128, GS1-128, or EAN-13).',
      'Enter consignment batch number, PO reference, and gross weight.',
      'Select label output size (Standard 4" x 6" / 100mm x 150mm).',
      'Send direct print job to your desktop label printer.',
    ],
    faqs: [
      {
        q: 'Which printers are supported?',
        a: 'Supports all standard ESC/POS and TSPL/ZPL label printers including Zebra, TSC, Xprinter, and Rongta.',
      },
      {
        q: 'Can I print multiple carton sequences in one batch?',
        a: 'Yes, specify carton range (e.g. 1 to 50) and the studio generates sequential carton serials automatically.',
      },
    ],
  },

  // 4. E-COMMERCE MARGIN CALCULATOR
  'ecommerce-margin-calculator': {
    slug: 'ecommerce-margin-calculator',
    name: 'E-Commerce Margin & COD Tariff Calculator',
    h1: 'E-Commerce Profit Margin & Courier COD Tariff Calculator',
    metaTitle: 'E-Commerce Margin & COD Simulator | Courier Rates',
    metaDescription: 'Model unit economics, multi-courier COD remittance fees, return to origin (RTO) penalty cushions, and breakeven ROAS targets.',
    category: 'Finance & Tax',
    targetAudience: 'DTC e-commerce founders, Shopify Pakistan merchants, and online brands.',
    hardwareCta: {
      headline: 'Speed Up E-Commerce Dispatch Lines',
      subtext: 'Equip your dispatch desk with high-speed direct thermal shipping label printers and wireless barcode scanners.',
      buttonText: 'View Dispatch Hardware',
      targetUrl: 'https://store.evonixtec.com',
    },
    howToSteps: [
      'Enter product retail price and manufacturing/sourcing cost.',
      'Select courier partner (Leopards, TCS, Trax, PostEx, Call Courier).',
      'Specify estimated customer return (RTO) percentage.',
      'Calculate net profit margin and target advertising breakeven ROAS.',
    ],
    faqs: [
      {
        q: 'How does RTO percentage affect net profit?',
        a: 'Returns require paying both outward shipping and return penalty charges without collecting revenue.',
      },
    ],
  },

  // 5. DEVELOPER COST CALCULATOR
  'developer-cost-calculator': {
    slug: 'developer-cost-calculator',
    name: 'Dedicated Developer Cost Calculator',
    h1: 'Dedicated Developer Cost & Offshore Savings Calculator',
    metaTitle: 'Dedicated Developer Cost Calculator | Save 70%',
    metaDescription: 'Compare USA, UK, and UAE in-house software engineer salaries against dedicated offshore squads in Sialkot with instant capital savings.',
    category: 'Export & B2B',
    targetAudience: 'CTOs, startup founders, and software agency directors.',
    hardwareCta: {
      headline: 'Equip Your Development Squad',
      subtext: 'Imported commercial Grade-A Dell Latitude and HP EliteBook Core i7 business laptops tested for dev environments.',
      buttonText: 'View Developer Laptops',
      targetUrl: 'https://store.evonixtec.com',
    },
    howToSteps: [
      'Select developer seniority level and primary technology stack.',
      'Choose benchmark comparison region (USA, UK, or UAE).',
      'Input number of required engineers.',
      'Review monthly cost breakdown and net annual capital savings.',
    ],
    faqs: [
      {
        q: 'What is included in the dedicated developer retainer?',
        a: 'Full 160 hours monthly, high-speed fiber internet, workstation hardware, and local management oversight.',
      },
    ],
  },

  // 6. AI VISIBILITY CHECKER
  'ai-visibility-checker': {
    slug: 'ai-visibility-checker',
    name: 'AI Visibility & GEO Readiness Auditor',
    h1: 'Website E-E-A-T & Generative Engine Optimization Checker',
    metaTitle: 'Website E-E-A-T & AI Visibility Checker | evonix',
    metaDescription: 'Client-side audit for ChatGPT Search, Claude, and Google AI Overviews readiness. Evaluate Schema.org brand entity graphs and citations.',
    category: 'Export & B2B',
    targetAudience: 'SEO directors, B2B marketing leads, and export brand managers.',
    hardwareCta: {
      headline: 'Fast High-Performance Web Architecture',
      subtext: 'Deploy high-speed Next.js and React enterprise websites that load in under 1 second with 95+ Core Web Vitals.',
      buttonText: 'Explore Web Engineering',
      targetUrl: 'https://www.evonixtec.com/services',
    },
    howToSteps: [
      'Enter target website domain or landing page URL.',
      'Audit entity graphs, JSON-LD schemas, and author credentials.',
      'Review Generative Engine Optimization (GEO) scoring breakdown.',
      'Implement recommended citation improvements.',
    ],
    faqs: [
      {
        q: 'What is Generative Engine Optimization (GEO)?',
        a: 'Structuring digital content and entity schemas so AI answer engines cite your brand as an authoritative source.',
      },
    ],
  },

  // 7. ETSY FEE CALCULATOR
  'etsy-fee-calculator': {
    slug: 'etsy-fee-calculator',
    name: 'Etsy Fee & Payoneer Profit Calculator',
    h1: 'Etsy Seller Fee & Payoneer Payout Calculator',
    metaTitle: 'Etsy Fee & Payoneer Profit Calculator | EtsyFeePro',
    metaDescription: 'Calculate Etsy $0.20 listing renewals, 6.5% transaction cut, payment processing, 15% offsite ads with $100 cap, and Payoneer deductions.',
    category: 'Finance & Tax',
    targetAudience: 'Global Etsy sellers, Pakistani exporters, and craft makers.',
    hardwareCta: {
      headline: 'Print Etsy Shipping Labels Instantly',
      subtext: 'Deploy 4x6 inch direct thermal label printers compatible with Etsy, DHL, FedEx, and Pakistan Post dispatches.',
      buttonText: 'Explore Shipping Printers',
      targetUrl: 'https://store.evonixtec.com',
    },
    howToSteps: [
      'Enter item sale price and shipping fee charged to customer.',
      'Input actual production cost and courier shipping expenditure.',
      'Toggle country presets and Offsite Ads rate (15% with $100 cap).',
      'View gross Etsy payout, Payoneer FX spread, and net take-home bank deposit.',
    ],
    faqs: [
      {
        q: 'How does Payoneer deduct fees on Etsy payouts?',
        a: 'Payoneer applies a 0.5% receiving fee, approx 2.0% wholesale FX spread below interbank rate, and $1.50 local wire transfer.',
      },
    ],
  },

  // 8. EBAY FEE CALCULATOR
  'ebay-fee-calculator': {
    slug: 'ebay-fee-calculator',
    name: 'eBay Fee & Profit Calculator',
    h1: 'eBay Seller Fee & Final Value Profit Calculator',
    metaTitle: 'eBay Fee & Profit Calculator 2026 | evonix',
    metaDescription: 'Calculate eBay final value fees, promoted listings, international surcharges, and real-time profit margins across 10 global marketplaces.',
    category: 'Finance & Tax',
    targetAudience: 'Cross-border eBay sellers and commercial exporters.',
    hardwareCta: {
      headline: 'Speed Up eBay Order Packing',
      subtext: 'Thermal receipt and carton shipping barcode printers for high-volume eBay dispatch desks.',
      buttonText: 'View Thermal Hardware',
      targetUrl: 'https://store.evonixtec.com',
    },
    howToSteps: [
      'Select eBay marketplace (US, UK, Germany, Australia, etc.).',
      'Choose product category to apply specific final value fee rates.',
      'Enter selling price, shipping fee, item cost, and promoted ads rate.',
      'Review total marketplace cut and net seller profit.',
    ],
    faqs: [
      {
        q: 'Does this calculate eBay Promoted Listings?',
        a: 'Yes, select Promoted Listings Standard percentage to see exact ad fees deducted upon sale.',
      },
    ],
  },

  // 9. TIKTOK SHOP FEE CALCULATOR
  'tiktok-shop-fee-calculator': {
    slug: 'tiktok-shop-fee-calculator',
    name: 'TikTok Shop Fee Calculator',
    h1: 'TikTok Shop UK & US Fee & Commission Calculator',
    metaTitle: 'TikTok Shop Fee & Commission Calculator 2026 | evonix',
    metaDescription: 'Updated for UK 9% commission (VAT inclusive), US 6% and 8% rates, affiliate creator cuts, and cross-border seller payouts.',
    category: 'Finance & Tax',
    targetAudience: 'TikTok Shop sellers, e-commerce brands, and live-stream merchants.',
    hardwareCta: {
      headline: 'Barcode Scanners for TikTok Shop Orders',
      subtext: 'Fast wireless 2D barcode scanners for lightning-fast order packing and dispatch tracking.',
      buttonText: 'Shop Handheld Scanners',
      targetUrl: 'https://store.evonixtec.com',
    },
    howToSteps: [
      'Select region (UK, US, or Pakistan Cross-Border).',
      'Enter item sale price, customer shipping, and product cost.',
      'Set creator affiliate commission percentage if using TikTok affiliates.',
      'Review platform commission, tax fees, and net bank payout.',
    ],
    faqs: [
      {
        q: 'What is the TikTok Shop UK commission rate in 2026?',
        a: 'Standard UK marketplace commission is 9% (VAT inclusive) on eligible product categories.',
      },
    ],
  },

  // 10. AMAZON FBA CALCULATOR
  'amazon-fba-calculator': {
    slug: 'amazon-fba-calculator',
    name: 'Amazon FBA Fee & Profit Calculator',
    h1: 'Amazon FBA Fulfillment & Referral Fee Calculator',
    metaTitle: 'Amazon FBA Fee & Profit Calculator 2026 | evonix',
    metaDescription: 'Calculate category referral fees, FBA fulfillment tiers, fuel surcharges, peak storage fees, and net profit margins.',
    category: 'Finance & Tax',
    targetAudience: 'Amazon FBA sellers, wholesale brand owners, and exporters.',
    hardwareCta: {
      headline: 'FBA Compliant Barcode Label Printers',
      subtext: 'Direct thermal 203 DPI printers for FNSKU barcodes and outer carton FBA shipment labels.',
      buttonText: 'View Label Printers',
      targetUrl: 'https://store.evonixtec.com',
    },
    howToSteps: [
      'Select Amazon product category and dimensions.',
      'Enter unit sale price, manufacturing cost, and inbound freight.',
      'Toggle peak season storage and fuel surcharges.',
      'Review Amazon referral fees, FBA pick and pack costs, and net margin.',
    ],
    faqs: [
      {
        q: 'Does this include the Amazon fuel surcharge?',
        a: 'Yes, includes updated fulfillment and fuel surcharges applied to Amazon logistics.',
      },
    ],
  },

  // 11. AMAZON FBM CALCULATOR
  'amazon-fbm-calculator': {
    slug: 'amazon-fbm-calculator',
    name: 'Amazon FBM Fee & Margin Calculator',
    h1: 'Amazon FBM Merchant-Fulfilled Fee Calculator',
    metaTitle: 'Amazon FBM Fee & Profit Calculator 2026 | evonix',
    metaDescription: 'Fulfilled by Merchant: calculate category referral fees (8-15%), self-shipping carrier rates, packaging costs, and break-even ACoS.',
    category: 'Finance & Tax',
    targetAudience: 'Sellers self-shipping orders via DHL, FedEx, or Pakistan Post.',
    hardwareCta: {
      headline: 'Courier Shipping Hardware',
      subtext: 'Industrial digital weighing scales, thermal printers, and barcode scanners for Amazon FBM dispatch desks.',
      buttonText: 'Explore Hardware Store',
      targetUrl: 'https://store.evonixtec.com',
    },
    howToSteps: [
      'Select Amazon category and selling price.',
      'Input merchant carrier shipping cost and packaging materials.',
      'Calculate category referral cut with $0.30 floor.',
      'Review net seller payout and advertising break-even ACoS.',
    ],
    faqs: [
      {
        q: 'How does FBM differ from FBA fees?',
        a: 'FBM avoids Amazon fulfillment and storage fees; you pay only referral fees plus your own courier costs.',
      },
    ],
  },

  // 12. SHOPIFY FEE CALCULATOR
  'shopify-fee-calculator': {
    slug: 'shopify-fee-calculator',
    name: 'Shopify Fee & Transaction Calculator',
    h1: 'Shopify Plan & Third-Party Payment Fee Calculator',
    metaTitle: 'Shopify Fee Calculator | Payment & Profit Tool',
    metaDescription: 'Calculate platform plan expenses, payment processing fees, third-party payment gateway surcharges (2.0%, 1.0%, 0.5%), and net margins.',
    category: 'Finance & Tax',
    targetAudience: 'Shopify store owners, drop-shippers, and digital brands.',
    hardwareCta: {
      headline: 'Deploy Shopify POS Hardware',
      subtext: 'All-in-one touch POS terminals and thermal receipt printers compatible with Shopify retail setups.',
      buttonText: 'Explore POS Terminals',
      targetUrl: 'https://store.evonixtec.com',
    },
    howToSteps: [
      'Select your active Shopify plan (Basic, Shopify, Advanced).',
      'Specify whether using Shopify Payments or external 3rd-party gateway.',
      'Input monthly store revenue and average order value.',
      'Compare annual platform costs and breakeven tier upgrades.',
    ],
    faqs: [
      {
        q: 'What is the third-party gateway surcharge on Shopify?',
        a: 'Basic charges 2.0%, standard Shopify charges 1.0%, and Advanced charges 0.5% for non-Shopify payment gateways.',
      },
    ],
  },

  // 13. STRIPE FEE CALCULATOR
  'stripe-fee-calculator': {
    slug: 'stripe-fee-calculator',
    name: 'Stripe Fee & Payout Calculator',
    h1: 'Stripe Credit Card Processing & Payout Calculator',
    metaTitle: 'Stripe Fee Calculator | Transaction & Payout Tool',
    metaDescription: 'Model domestic and international Stripe credit card processing fees with forward and reverse payout calculation logic.',
    category: 'Finance & Tax',
    targetAudience: 'SaaS founders, freelancers, and global e-commerce merchants.',
    hardwareCta: {
      headline: 'Need Card Terminals for Retail?',
      subtext: 'Discover integrated point-of-sale card readers and thermal receipt printers with local Sialkot warranty.',
      buttonText: 'View POS Equipment',
      targetUrl: 'https://store.evonixtec.com',
    },
    howToSteps: [
      'Enter transaction amount or net payout target.',
      'Select card type (domestic 2.9% + $0.30 or international +1.5%).',
      'Use reverse calculator mode to determine exact billable charge.',
      'Review processing fee deductions and net merchant payout.',
    ],
    faqs: [
      {
        q: 'How does the reverse calculator work?',
        a: 'It calculates exactly what you must bill a client so you receive your target sum after Stripe takes its fee.',
      },
    ],
  },

  // 14. TEMU SELLER CALCULATOR
  'temu-seller-calculator': {
    slug: 'temu-seller-calculator',
    name: 'Temu Seller Fee & Margin Calculator',
    h1: 'Temu Marketplace Commission & Fulfillment Calculator',
    metaTitle: 'Temu Seller Calculator | Fee & Margin Calculator',
    metaDescription: 'Calculate Temu platform commissions, semi-managed and fully-managed fulfillment expenses, and net profit yields for cross-border merchants.',
    category: 'Finance & Tax',
    targetAudience: 'Wholesale suppliers and cross-border e-commerce exporters.',
    hardwareCta: {
      headline: 'Wholesale Packaging Equipment',
      subtext: 'Direct thermal carton barcode printers and hands-free desktop scanners for fast warehouse dispatch.',
      buttonText: 'View Warehouse Hardware',
      targetUrl: 'https://store.evonixtec.com',
    },
    howToSteps: [
      'Select Temu management model (Fully-Managed or Semi-Managed).',
      'Input product manufacturing cost, packaging, and logistics freight.',
      'Enter expected retail selling price and platform commission tier.',
      'Review net profit margin and minimum break-even price.',
    ],
    faqs: [
      {
        q: 'What is the difference between Temu fully-managed and semi-managed?',
        a: 'Fully-managed handles local shipping from domestic warehouses; semi-managed requires sellers to ship overseas orders directly.',
      },
    ],
  },

  // 15. UK & EU VAT CALCULATOR
  'uk-eu-vat-calculator': {
    slug: 'uk-eu-vat-calculator',
    name: 'UK & EU VAT Reverse Charge Engine',
    h1: 'UK & EU Cross-Border VAT Reverse Charge Calculator',
    metaTitle: 'UK & EU VAT Reverse Charge & VAT MOSS Engine | evonix',
    metaDescription: 'Automate HMRC Section 55A and EU Directive 2006/112/EC 0% reverse charge VAT exemptions and statutory invoice clauses for B2B exporters.',
    category: 'Finance & Tax',
    targetAudience: 'Pakistani exporters, international traders, and compliance accountants.',
    hardwareCta: {
      headline: 'Export Invoicing & Commercial Printers',
      subtext: 'Heavy-duty laser and thermal printers for printing statutory export commercial invoices with VAT declarations.',
      buttonText: 'Shop Commercial Printers',
      targetUrl: 'https://store.evonixtec.com',
    },
    howToSteps: [
      'Select destination country (UK or EU Member State).',
      'Enter invoice taxable value in GBP or EUR.',
      'Verify buyer VAT number and business status.',
      'Generate statutory reverse-charge compliance clause for your invoice.',
    ],
    faqs: [
      {
        q: 'What is the HMRC Section 55A reverse charge?',
        a: 'It shifts liability to account for VAT from the seller to the buyer on qualifying B2B services and goods.',
      },
    ],
  },

  // 16. US DUTY NEXUS ESTIMATOR
  'us-duty-nexus-estimator': {
    slug: 'us-duty-nexus-estimator',
    name: 'US Customs Tariff & Section 321 Estimator',
    h1: 'US CBP Duty & Section 321 De Minimis Calculator',
    metaTitle: 'US Customs Tariff & Section 321 De Minimis Calculator',
    metaDescription: 'Calculate US CBP tariffs, verify the $800 duty-free Section 321 entry eligibility, and estimate landed costs for US buyers.',
    category: 'Logistics',
    targetAudience: 'Surgical and leather exporters shipping consignments to USA buyers.',
    hardwareCta: {
      headline: 'Export Shipping Carton Labels',
      subtext: 'GS1-128 compliant 4x6 direct thermal printers required for US customs port clearances.',
      buttonText: 'View 4x6 Label Printers',
      targetUrl: 'https://store.evonixtec.com',
    },
    howToSteps: [
      'Enter declared shipment value and HTS commodity code.',
      'Check eligibility under Section 321 ($800 de minimis threshold).',
      'Calculate ad valorem customs duty if value exceeds $800.',
      'Estimate landed cost for US commercial consignee.',
    ],
    faqs: [
      {
        q: 'What is Section 321 entry?',
        a: 'It permits duty-free entry into the United States for shipments valued at $800 or less imported by one person on one day.',
      },
    ],
  },

  // 17. CE & UKCA COMPLIANCE GENERATOR
  'ce-ukca-compliance-generator': {
    slug: 'ce-ukca-compliance-generator',
    name: 'UKCA & CE Declaration of Conformity Generator',
    h1: 'UKCA & CE Technical Declaration of Conformity Generator',
    metaTitle: 'UKCA & CE Declaration of Conformity (DoC) Generator',
    metaDescription: 'Generate audited technical Declaration of Conformity documents for CE Marking (EU MDR Class I) and UKCA tenders for surgical exporters.',
    category: 'Export & B2B',
    targetAudience: 'Surgical instrument manufacturers, quality assurance teams, and exporters.',
    hardwareCta: {
      headline: 'Sterile Packaging & Barcoding Equipment',
      subtext: 'Laser and thermal barcode printers for medical device UDI (Unique Device Identifier) labels.',
      buttonText: 'Explore Lab Hardware',
      targetUrl: 'https://store.evonixtec.com',
    },
    howToSteps: [
      'Select regulatory framework (EU CE MDR Class I or UKCA).',
      'Input legal manufacturer corporate details and EU/UK Authorized Representative.',
      'Specify applicable harmonized standards (ISO 13485, EN ISO 14971).',
      'Generate and print formal Declaration of Conformity certificate.',
    ],
    faqs: [
      {
        q: 'Is this valid for surgical export consignments?',
        a: 'Yes, formats follow official EU MDR 2017/745 Annex IV specifications for Class I medical devices.',
      },
    ],
  },

  // 18. HS CODE LOOKUP
  'hs-code-lookup': {
    slug: 'hs-code-lookup',
    name: 'Global HS Code & Customs Duty Lookup',
    h1: 'Export HS Code Finder & Customs Duty Lookup',
    metaTitle: 'Global HS Code & Custom Duty Lookup Engine | evonix',
    metaDescription: 'Harmonized System (HS) commodity code finder and estimated import duty calculator for Sialkot exporters across USA, EU, UK, and UAE.',
    category: 'Export & B2B',
    targetAudience: 'Surgical, sports goods, and leather export documentation teams.',
    hardwareCta: {
      headline: 'Carton Barcode Label Studios',
      subtext: 'Pair your HS-coded consignments with compliant outer carton thermal shipping labels.',
      buttonText: 'View Label Printers',
      targetUrl: 'https://store.evonixtec.com',
    },
    howToSteps: [
      'Select your export manufacturing product sector.',
      'Search by product keyword or standard 6-digit HS code.',
      'Inspect destination tariff rates across US, EU, UK, and UAE.',
      'Copy verified HS code directly onto commercial packing lists.',
    ],
    faqs: [
      {
        q: 'What is a 6-digit Harmonized System code?',
        a: 'A standardized numerical method used worldwide to classify traded products for customs duties.',
      },
    ],
  },

  // 19. SCHEMA GENERATOR
  'schema-generator': {
    slug: 'schema-generator',
    name: 'Advanced JSON-LD Schema Markup Generator',
    h1: 'JSON-LD Structured Data Schema Markup Generator',
    metaTitle: 'Advanced JSON-LD Schema Markup Generator | evonix',
    metaDescription: 'Generate valid JSON-LD structured data for Local Business, FAQs, Products, and Software. Optimized for Google AI Overviews and Rich Results.',
    category: 'Export & B2B',
    targetAudience: 'Web developers, SEO professionals, and e-commerce webmasters.',
    hardwareCta: {
      headline: 'Enterprise Web Development in Sialkot',
      subtext: 'Custom React and Next.js business web applications built to Dubai engineering standards.',
      buttonText: 'Consult Web Engineering',
      targetUrl: 'https://www.evonixtec.com/services',
    },
    howToSteps: [
      'Select Schema.org entity type (LocalBusiness, FAQPage, Product, SoftwareApplication).',
      'Fill in entity name, description, address, and pricing details.',
      'Review formatted JSON-LD code in real-time.',
      'Copy script tag and paste into your website HTML head.',
    ],
    faqs: [
      {
        q: 'Why is JSON-LD important for AI Overviews?',
        a: 'Search engines and AI answer bots use JSON-LD entities to understand and cite your business attributes.',
      },
    ],
  },

  // 20. SIALKOT EXPORT ERP
  'sialkot-export-erp': {
    slug: 'sialkot-export-erp',
    name: 'Sialkot Export Manufacturing ERP',
    h1: 'Sialkot Export Manufacturing ERP & Customs Suite',
    metaTitle: 'Export Manufacturing ERP & WeBOC Cloud Suite | evonix',
    metaDescription: 'Industrial ERP software for Sialkot surgical, leather, and sports exporters. Complete batch traceability, multi-currency invoicing, and WeBOC sync.',
    category: 'Export & B2B',
    targetAudience: 'Factory managing directors, export managers, and production supervisors.',
    hardwareCta: {
      headline: 'Factory Network Infrastructure & Servers',
      subtext: 'Synology immutable NAS backup servers, managed Gigabit switches, and accounts workstations.',
      buttonText: 'Explore Factory IT AMC',
      targetUrl: 'https://store.evonixtec.com',
    },
    howToSteps: [
      'Select factory industry (Surgical, Leather, Sports Goods).',
      'Configure production stages (Cutting, Stitching, QC, Packing).',
      'Generate automated commercial invoices and WeBOC customs packing lists.',
      'Track real-time consignment order progress from raw material to port.',
    ],
    faqs: [
      {
        q: 'Does this ERP run offline inside the factory?',
        a: 'Yes, supports local offline LAN database synchronization that never stops when internet drops.',
      },
    ],
  },

  // 21. FACTORY NETWORK TESTER
  'factory-network-tester': {
    slug: 'factory-network-tester',
    name: 'Factory ERP & Customs Latency Benchmark',
    h1: 'Factory Network Latency & WeBOC Ping Benchmark',
    metaTitle: 'Factory Network Latency & WeBOC Benchmark | evonix',
    metaDescription: 'Benchmark factory floor network latency, SQL database sync responsiveness, and WeBOC customs gateway ping stability in Sialkot industrial zones.',
    category: 'Hardware & Tech',
    targetAudience: 'Factory IT administrators and network operations engineers.',
    hardwareCta: {
      headline: 'Dual-WAN Enterprise Routers & Cabling',
      subtext: 'Deploy Mikrotik failover firewalls and Cat6A 10Gbps factory network backbone cabling in Sialkot.',
      buttonText: 'Consult Network Engineers',
      targetUrl: 'https://store.evonixtec.com',
    },
    howToSteps: [
      'Click Start Latency Benchmark on your factory workstation.',
      'Measure packet jitter, millisecond ping, and packet loss.',
      'Test latency to local SQL server and cloud customs gateways.',
      'Review diagnostic advice for dual-WAN failover optimization.',
    ],
    faqs: [
      {
        q: 'What is acceptable latency for WeBOC customs filings?',
        a: 'Ping should remain under 40ms with 0% packet loss to prevent session timeouts during declaration submission.',
      },
    ],
  },

  // 22. LIVE REPAIR TRACKER
  'live-repair-tracker': {
    slug: 'live-repair-tracker',
    name: 'Live RMA Bench Repair Status Tracker',
    h1: 'Live RMA Diagnostic Bench Repair Tracker',
    metaTitle: 'Live RMA Bench Repair Status Tracker | evonix',
    metaDescription: 'Track your diagnostic bench repair ticket in real-time. Check motherboard micro-soldering progress, standby current logs, and 90-day warranty certificates.',
    category: 'Hardware & Tech',
    targetAudience: 'Retail shops, factory IT managers, and laptop owners in Sialkot.',
    hardwareCta: {
      headline: 'Visit Our Kotli Behram Diagnostic Lab',
      subtext: 'Free diagnostic bench check. Component-level motherboard micro-soldering with 90-day written warranty.',
      buttonText: 'Book Doorstep Support',
      targetUrl: 'https://store.evonixtec.com',
    },
    howToSteps: [
      'Enter your Sialkot RMA repair ticket number or phone.',
      'Inspect technician bench notes and voltage rail readings.',
      'Review replaced original components and test pass logs.',
      'Download formal service completion voucher and warranty certificate.',
    ],
    faqs: [
      {
        q: 'How long does motherboard repair take?',
        a: 'Standard diagnostic turnaround is same-day, with complex micro-soldering completed within 24 to 48 hours.',
      },
    ],
  },

  // 23. PRINTER DIAGNOSTICS
  'printer-diagnostics': {
    slug: 'printer-diagnostics',
    name: 'Thermal Receipt Printer Diagnostic Engine',
    h1: 'ESC/POS Thermal Receipt Printer Diagnostics',
    metaTitle: 'Thermal Receipt & POS Printer Diagnostics | evonix',
    metaDescription: 'Interactive troubleshooter for 80mm ESC/POS thermal printers, paper cutter jams, blurred barcodes, and Windows POS driver conflicts.',
    category: 'Hardware & Tech',
    targetAudience: 'Cashiers, shop managers, and supermarket billing supervisors.',
    hardwareCta: {
      headline: 'Buy New High-Speed Thermal Printers',
      subtext: 'Heavy-duty 80mm thermal receipt printers with Japanese auto-cutters and USB+LAN interfaces.',
      buttonText: 'Shop Thermal Printers',
      targetUrl: 'https://store.evonixtec.com',
    },
    howToSteps: [
      'Select your receipt printer symptom (Cutter Jam, Faint Barcode, Offline).',
      'Follow interactive diagnostic step-by-step decision tree.',
      'Test ESC/POS hex commands and verify baud rate settings.',
      'Apply corrective cleaning or gear unjamming procedure.',
    ],
    faqs: [
      {
        q: 'How do I unjam an auto-cutter?',
        a: 'Locate the manual thumbwheel under the front cover and rotate until the blade fully retracts.',
      },
    ],
  },

  // 24. TREND INTELLIGENCE SUITE
  'trend-intelligence-suite': {
    slug: 'trend-intelligence-suite',
    name: 'Trend Intelligence Suite V15',
    h1: 'Multi-Platform Keyword Trend Intelligence Suite',
    metaTitle: 'Trend Intelligence Suite V15 | Trend Scoring | evonix',
    metaDescription: 'Real-time multi-platform trend scoring engine across Google, Bing, eBay, YouTube, and Amazon with sub-second edge analysis.',
    category: 'Export & B2B',
    targetAudience: 'E-commerce product researchers, exporters, and media buyers.',
    hardwareCta: {
      headline: 'High-Performance Business Workstations',
      subtext: 'Intel Core i7 business laptops with 16GB RAM and NVMe SSDs configured for heavy data analysis.',
      buttonText: 'View Business Laptops',
      targetUrl: 'https://store.evonixtec.com',
    },
    howToSteps: [
      'Enter your target product or search keyword.',
      'Analyze multi-platform volume and velocity score.',
      'Compare eBay sold count and Google search trend in parallel.',
      'Export formatted trend report to spreadsheet.',
    ],
    faqs: [
      {
        q: 'What data sources are analyzed?',
        a: 'Calculates real-time trend weights across Google, Bing, eBay, YouTube, and Amazon.',
      },
    ],
  },

  // 25. AI TRIP PLANNER (SECONDARY UTILITY)
  'ai-trip-planner': {
    slug: 'ai-trip-planner',
    name: 'AI Trip Planner & Itinerary Generator',
    h1: 'AI Trip Planner: Day-Wise Vacation Itinerary Generator',
    metaTitle: 'AI Trip Planner: Day-Wise Vacation Generator | evonix',
    metaDescription: 'Free AI trip planner generating day-wise travel itineraries, attraction timing, food spots, transit advice, and daily budget breakdowns.',
    category: 'Export & B2B',
    targetAudience: 'Business travelers, vacation planners, and international travelers.',
    hardwareCta: {
      headline: 'Portable Business Workstations',
      subtext: 'Ultra-light Dell and HP business laptops with 10-hour battery life for business travel and remote work.',
      buttonText: 'View Travel Laptops',
      targetUrl: 'https://store.evonixtec.com',
    },
    howToSteps: [
      'Enter destination city, trip duration, and budget level.',
      'Generate day-wise optimized itinerary with travel times.',
      'Inspect local food recommendations and transit costs.',
      'Save plan directly to browser or export schedule.',
    ],
    faqs: [
      {
        q: 'Does it calculate travel budgets?',
        a: 'Yes, it provides itemized estimates for lodging, local transport, dining, and attraction tickets.',
      },
    ],
  },
};

// Aliases mapping older short paths to canonical toolsRegistry keys
export const TOOL_SLUG_ALIASES: Record<string, string> = {
  invoice: 'invoice-generator',
  'invoice-maker': 'invoice-generator',
  'global-invoice': 'invoice-generator',
  'micro-invoice-generator': 'invoice-generator',
  'cbm-calculator': 'export-cbm-calculator',
  'export-cbm': 'export-cbm-calculator',
  'cbm': 'export-cbm-calculator',
  'export-barcode-studio': 'barcode-label-studio',
  'barcode-studio': 'barcode-label-studio',
  'barcode-generator': 'barcode-label-studio',
  'ecommerce-calculator': 'ecommerce-margin-calculator',
  'ecom-calculator': 'ecommerce-margin-calculator',
  'ecommerce-margin': 'ecommerce-margin-calculator',
  'etsy-calculator': 'etsy-fee-calculator',
  'etsyfeepro': 'etsy-fee-calculator',
  'etsy-fee-pro': 'etsy-fee-calculator',
  'etsy-fee': 'etsy-fee-calculator',
  'etsy': 'etsy-fee-calculator',
  'ebay-calculator': 'ebay-fee-calculator',
  'ebay': 'ebay-fee-calculator',
  'ebay-fee': 'ebay-fee-calculator',
  'tiktok-calculator': 'tiktok-shop-fee-calculator',
  'tiktok-shop': 'tiktok-shop-fee-calculator',
  'tiktok': 'tiktok-shop-fee-calculator',
  'amazon-fba': 'amazon-fba-calculator',
  'fba-calculator': 'amazon-fba-calculator',
  'fba': 'amazon-fba-calculator',
  'amazon-fbm': 'amazon-fbm-calculator',
  'fbm-calculator': 'amazon-fbm-calculator',
  'fbm': 'amazon-fbm-calculator',
  'shopify-calculator': 'shopify-fee-calculator',
  'shopify': 'shopify-fee-calculator',
  'stripe-calculator': 'stripe-fee-calculator',
  'stripe': 'stripe-fee-calculator',
  'temu-calculator': 'temu-seller-calculator',
  'temu': 'temu-seller-calculator',
  'uk-vat': 'uk-vat-calculator',
  'uk-eu-vat-calculator': 'uk-vat-calculator',
  'vat': 'uk-vat-calculator',
  'us-duty-nexus-estimator': 'us-customs-duty-estimator',
  'custom-duty': 'us-customs-duty-estimator',
  'ce-ukca': 'ce-ukca-compliance-generator',
  'hs-code': 'hs-code-lookup',
  'schema': 'schema-generator',
  'developer-cost': 'developer-cost-calculator',
  'latency-tester': 'network-latency-tester',
  'factory-network-tester': 'network-latency-tester',
  'printer-diagnostics': 'printer-diagnostic-troubleshooter',
  'live-repair-tracker': 'live-repair-tracker',
  'repair-tracker': 'live-repair-tracker',
  'ai-visibility': 'ai-visibility-checker',
  'trend-intelligence': 'trend-intelligence-suite',
  'trip-planner': 'ai-trip-planner',
  'ai-travel-planner': 'ai-trip-planner',
};

export function resolveToolSlug(slugOrAlias: string): ToolMetadata | undefined {
  if (!slugOrAlias) return undefined;
  const clean = slugOrAlias.toLowerCase().replace(/^\/+|\/+$/g, '').trim();
  if (toolsRegistry[clean]) {
    return toolsRegistry[clean];
  }
  const canonical = TOOL_SLUG_ALIASES[clean];
  if (canonical && toolsRegistry[canonical]) {
    return toolsRegistry[canonical];
  }
  return undefined;
}
