import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

interface ToolOgConfig {
  id: string;
  fileName: string;
  titleLine1: string;
  titleLine2: string;
  subTitle: string;
  laptopTag: string;
  metricProfit: string;
  metricMargin: string;
  metricFees: string;
  barColor1: string;
  barColor2: string;
  barColor3: string;
  pill1: string;
  pill2: string;
  pill3: string;
  pill4: string;
}

const TOOLS: ToolOgConfig[] = [
  {
    id: 'tiktok-shop-fee-calculator',
    fileName: 'tiktok-shop-fee-calculator-2026.png',
    titleLine1: 'TikTok Shop Fee',
    titleLine2: 'Calculator (UK 9% & US)',
    subTitle: 'UK 9% VAT-inclusive, US 6%/8% toggle, creator affiliate rates and cross-border seller margins.',
    laptopTag: 'TIKTOK SHOP ENGINE',
    metricProfit: 'Net Payout: £21.84',
    metricMargin: '+31.2% Net Margin',
    metricFees: 'UK Fee: 9.0% | US: 6% / 8% | No Trans. Fee',
    barColor1: '#00f2fe',
    barColor2: '#fe2c55',
    barColor3: '#10b981',
    pill1: 'UK 9% VAT-Inclusive',
    pill2: 'US 6% / 8% Toggle',
    pill3: 'No UK Transaction Fee',
    pill4: 'Multi-Currency (£/$ / PKR)',
  },
  {
    id: 'ebay-fee-calculator',
    fileName: 'ebay-fee-calculator-2026.png',
    titleLine1: 'eBay Fee & Profit',
    titleLine2: 'Calculator',
    subTitle: 'Calculate exact final value fees, promoted ads, shipping costs, and international seller margins.',
    laptopTag: 'EBAY SELLER ANALYTICS',
    metricProfit: 'Net Profit: $18.42',
    metricMargin: '+27.6% Margin',
    metricFees: 'Final Value: 13.25% | Ads: 2.0% | Insertion: $0',
    barColor1: '#0284c7',
    barColor2: '#10b981',
    barColor3: '#f59e0b',
    pill1: 'Final Value Fee (13.25%)',
    pill2: 'Promoted Listings Standard',
    pill3: 'Multi-Currency (USD/GBP/PKR)',
    pill4: 'Instant CSV / PDF Export',
  },
  {
    id: 'shopify-fee-calculator',
    fileName: 'shopify-fee-calculator-2026.png',
    titleLine1: 'Shopify Fee & Margin',
    titleLine2: 'Calculator',
    subTitle: 'Shopify Payments rates, 3rd-party gateway fees, monthly subscription amortization, and net profit.',
    laptopTag: 'SHOPIFY COMMERCE HUB',
    metricProfit: 'Net Profit: $32.10',
    metricMargin: '+35.4% Net Margin',
    metricFees: 'Payments: 2.9% + $0.30 | Gateway: 0.0%',
    barColor1: '#96bf48',
    barColor2: '#008060',
    barColor3: '#10b981',
    pill1: 'Shopify Payments 2.9% + 30¢',
    pill2: 'Basic, Grow & Advanced Plans',
    pill3: 'Third-Party Transaction Fees',
    pill4: 'Net Profit & CAC Simulator',
  },
  {
    id: 'etsy-fee-calculator',
    fileName: 'etsy-fee-calculator-2026.png',
    titleLine1: 'Etsy Fee & Profit',
    titleLine2: 'Calculator',
    subTitle: 'Calculate $0.20 listing renewal, 6.5% transaction fee, payment processing, and Offsite Ads profit cushion.',
    laptopTag: 'ETSY MAKER ANALYTICS',
    metricProfit: 'Net Profit: $14.28',
    metricMargin: '+38.5% Margin',
    metricFees: 'Listing: $0.20 | Trans: 6.5% | Pay: 3% + 25¢',
    barColor1: '#f97316',
    barColor2: '#ea580c',
    barColor3: '#10b981',
    pill1: '$0.20 Listing Renewal Fee',
    pill2: '6.5% Transaction Fee',
    pill3: 'Payment Processing 3% + 25¢',
    pill4: 'Offsite Ads (12% / 15%)',
  },
  {
    id: 'amazon-fbm-calculator',
    fileName: 'amazon-fbm-calculator-2026.png',
    titleLine1: 'Amazon FBM Fee &',
    titleLine2: 'Profit Calculator',
    subTitle: 'Fulfilled by Merchant calculator: category referral fees, merchant shipping tariffs, and net seller payout.',
    laptopTag: 'AMAZON FBM HUB',
    metricProfit: 'Net Profit: $19.85',
    metricMargin: '+29.2% Margin',
    metricFees: 'Referral: 15% (min $0.30) | Carrier Shipping: $4.50',
    barColor1: '#ff9900',
    barColor2: '#146eb4',
    barColor3: '#10b981',
    pill1: 'Category Referral (8% - 15%)',
    pill2: 'Self-Ship Carrier Costs',
    pill3: 'Zero FBA Storage Charges',
    pill4: 'Break-Even ACoS % Target',
  },
  {
    id: 'stripe-fee-calculator',
    fileName: 'stripe-fee-calculator-2026.png',
    titleLine1: 'Stripe Fee & Payout',
    titleLine2: 'Calculator',
    subTitle: 'Analyze standard 2.9% + $0.30 processing, international card fees, currency conversion, and reverse logic.',
    laptopTag: 'STRIPE TRANSACTION ENGINE',
    metricProfit: 'Net Payout: $96.80',
    metricMargin: 'Effective Rate: 3.20%',
    metricFees: 'Stripe Deduction: $3.20 on $100.00 Charge',
    barColor1: '#635bff',
    barColor2: '#00d4aa',
    barColor3: '#10b981',
    pill1: 'Standard 2.9% + 30¢ Domestic',
    pill2: '+1.5% International Cards',
    pill3: 'Reverse Fee Calculation',
    pill4: 'Instant Net Payout Matrix',
  },
  {
    id: 'temu-seller-calculator',
    fileName: 'temu-seller-calculator-2026.png',
    titleLine1: 'Temu Seller Profit &',
    titleLine2: 'Margin Calculator',
    subTitle: 'Cross-border manufacturing supply cost, platform take rates, return penalties, and Pakistani seller payout.',
    laptopTag: 'TEMU SELLER PLATFORM',
    metricProfit: 'Net Margin: +24.8%',
    metricMargin: 'Per-Unit Profit: $4.15',
    metricFees: 'Platform Margin + Logistics Deduction',
    barColor1: '#fb923c',
    barColor2: '#f97316',
    barColor3: '#10b981',
    pill1: 'Wholesale Unit Cost (COGS)',
    pill2: 'Cross-Border Air Freight',
    pill3: 'Platform Margin & Deductions',
    pill4: 'RTO Return Loss Buffer',
  },
  {
    id: 'ecommerce-calculator',
    fileName: 'ecommerce-calculator-2026.png',
    titleLine1: 'E-Commerce Profit &',
    titleLine2: 'Courier Margin Engine',
    subTitle: 'Pakistani courier tariffs (Leopards, TCS, Trax, PostEx), COD handling fees, ad CAC, and RTO risk cushion.',
    laptopTag: 'E-COMMERCE P&L ENGINE',
    metricProfit: 'Net Profit: Rs 680',
    metricMargin: '+28.3% Margin',
    metricFees: 'Courier COD: Rs 280 | Ad CAC: Rs 450',
    barColor1: '#dc2626',
    barColor2: '#0284c7',
    barColor3: '#10b981',
    pill1: 'TCS / Leopards / Trax / PostEx',
    pill2: 'COD Handling Charge Rules',
    pill3: 'Marketing CAC & Break-Even',
    pill4: 'RTO Return Loss Simulator',
  },
  {
    id: 'cbm-calculator',
    fileName: 'cbm-calculator-2026.png',
    titleLine1: 'Export CBM & Freight',
    titleLine2: 'Cargo Calculator',
    subTitle: 'Cubic Meters computation, DHL/FedEx volumetric dimensional weight, and 20ft/40ft ocean container planning.',
    laptopTag: 'CARGO CBM ENGINE',
    metricProfit: 'Total CBM: 18.45 m³',
    metricMargin: '20ft Container: 65% Full',
    metricFees: 'Chargeable Volumetric Weight: 3,075 kg',
    barColor1: '#0284c7',
    barColor2: '#0f766e',
    barColor3: '#f59e0b',
    pill1: 'Carton CBM Volumetric Weight',
    pill2: 'DHL / FedEx Air Divisor (5000)',
    pill3: '20ft & 40ft Container Load',
    pill4: 'Sialkot B2B Export Ready',
  },
  {
    id: 'micro-invoice-generator',
    fileName: 'micro-invoice-generator-2026.png',
    titleLine1: 'Global Micro-Invoice',
    titleLine2: 'Generator (150+ Currencies)',
    subTitle: 'Paper-style invoice editor, zero-database client-side storage, Code128 barcode, and instant A4 PDF export.',
    laptopTag: 'ZERO-DATABASE INVOICING',
    metricProfit: 'Invoice Total: $2,450.00',
    metricMargin: 'Tax & Discounts: Auto Calc',
    metricFees: '150+ Currencies (USD/PKR/AED/EUR)',
    barColor1: '#0d9488',
    barColor2: '#0284c7',
    barColor3: '#10b981',
    pill1: 'No Signup Required',
    pill2: '150+ International Currencies',
    pill3: 'Instant Vector A4 PDF Export',
    pill4: 'Code128 Barcode & Bank IBAN',
  },
  {
    id: 'developer-cost-calculator',
    fileName: 'developer-cost-calculator-2026.png',
    titleLine1: 'Dedicated Developer',
    titleLine2: 'Cost Calculator',
    subTitle: 'Compare US/UK hiring costs ($80/hr) vs offshore senior engineers ($22/hr). Save 70% with Evonix Sialkot.',
    laptopTag: 'ENGINEERING BENCHMARK',
    metricProfit: 'Annual Savings: $111,360',
    metricMargin: '72% Cost Reduction',
    metricFees: 'Dedicated Senior Dev: $22/hr',
    barColor1: '#0284c7',
    barColor2: '#10b981',
    barColor3: '#6366f1',
    pill1: 'Save 70%+ vs USA / UK Rates',
    pill2: 'Full-Stack & Mobile Engineers',
    pill3: 'Vetted Senior Profiles in 24h',
    pill4: 'Zero Overhead & Direct Slack',
  },
  {
    id: 'ai-visibility-checker',
    fileName: 'ai-visibility-checker-2026.png',
    titleLine1: 'Website E-E-A-T &',
    titleLine2: 'AI Visibility Checker',
    subTitle: 'Audit your domain for ChatGPT, Claude, and Google AI Overviews citation readiness and schema graph health.',
    laptopTag: 'GEO & E-E-A-T AUDIT',
    metricProfit: 'AI Visibility Score: 88/100',
    metricMargin: 'Brand Entity Node: Active',
    metricFees: 'Knowledge Graph Citations: High',
    barColor1: '#8b5cf6',
    barColor2: '#06b6d4',
    barColor3: '#10b981',
    pill1: 'ChatGPT & Claude Citation Check',
    pill2: 'Google AI Overview Readiness',
    pill3: 'Schema.org Graph Verification',
    pill4: 'Actionable Optimization Steps',
  },
  {
    id: 'ai-trip-planner',
    fileName: 'ai-trip-planner-2026.png',
    titleLine1: 'AI Trip Planner &',
    titleLine2: 'Vacation Generator',
    subTitle: 'Free day-by-day vacation itinerary builder with route estimates, restaurant spots, and budget planning.',
    laptopTag: 'AI VACATION ITINERARY',
    metricProfit: '5-Day Tokyo Schedule Ready',
    metricMargin: 'Estimated Cost: $1,450',
    metricFees: '12 Curated Spots & Transit Map',
    barColor1: '#ec4899',
    barColor2: '#8b5cf6',
    barColor3: '#10b981',
    pill1: 'Day-by-Day Smart Schedules',
    pill2: 'Flight & Hotel Cost Estimates',
    pill3: 'Local Dining & Transit Guides',
    pill4: '100% Free • No Sign-Up',
  },
  {
    id: 'uk-eu-vat-calculator',
    fileName: 'uk-eu-vat-calculator-2026.png',
    titleLine1: 'UK & EU VAT Reverse',
    titleLine2: 'Charge Calculator',
    subTitle: 'HMRC Section 55A and EU Directive 2006/112/EC zero-rating calculator with automated statutory invoice notes.',
    laptopTag: 'HMRC & EU VAT ENGINE',
    metricProfit: 'Exempt VAT: 0% Reverse Charge',
    metricMargin: 'Statutory Clause Generated',
    metricFees: 'Standard 20% Tax Replaced by 0%',
    barColor1: '#0284c7',
    barColor2: '#1e3a8a',
    barColor3: '#10b981',
    pill1: 'HMRC Section 55A Exemption',
    pill2: 'EU Directive 2006/112/EC',
    pill3: 'B2B Cross-Border Export Invoicing',
    pill4: 'Zero Database • Instant Clause',
  },
  {
    id: 'us-duty-nexus-estimator',
    fileName: 'us-duty-nexus-estimator-2026.png',
    titleLine1: 'US Customs Tariff &',
    titleLine2: 'Section 321 Calculator',
    subTitle: 'US CBP tariffs, verify $800 duty-free Section 321 entry eligibility, and compute landed costs for US buyers.',
    laptopTag: 'US CBP TARIFF ENGINE',
    metricProfit: 'Section 321: Eligible ($0 Duty)',
    metricMargin: 'Order Value Under $800 De Minimis',
    metricFees: 'CBP Clearance Saved: $124.50',
    barColor1: '#b91c1c',
    barColor2: '#1d4ed8',
    barColor3: '#10b981',
    pill1: '$800 Duty-Free De Minimis',
    pill2: 'HTS Code Duty Tariff Lookup',
    pill3: 'Merchandise Processing Fee (MPF)',
    pill4: 'Accurate US Landed Cost',
  },
  {
    id: 'ce-ukca-compliance-generator',
    fileName: 'ce-ukca-compliance-generator-2026.png',
    titleLine1: 'UKCA & CE Declaration',
    titleLine2: 'of Conformity Generator',
    subTitle: 'Generate audited technical Declaration of Conformity documents for CE Marking and UKCA tenders.',
    laptopTag: 'REGULATORY COMPLIANCE',
    metricProfit: 'DoC Certificate Generated',
    metricMargin: 'EU MDR 2017/745 Class I Pass',
    metricFees: 'ISO 13485:2016 Compliant Template',
    barColor1: '#047857',
    barColor2: '#0284c7',
    barColor3: '#10b981',
    pill1: 'CE Marking Technical Dossier',
    pill2: 'UKCA Conformity Declaration',
    pill3: 'EU MDR Class I Sialkot Exporters',
    pill4: 'Printable Audit-Ready PDF',
  },
  {
    id: 'export-barcode-studio',
    fileName: 'export-barcode-studio-2026.png',
    titleLine1: 'Export Barcode Label',
    titleLine2: 'Studio (GS1 & Code 128)',
    subTitle: 'Generate compliant outer shipping carton thermal barcode labels. 4x6 direct thermal vector rendering.',
    laptopTag: 'THERMAL BARCODE STUDIO',
    metricProfit: 'Code 128 / GS1-128 Generated',
    metricMargin: 'Resolution: 203 & 300 DPI',
    metricFees: 'Label Dimensions: 4x6 Inch Standard',
    barColor1: '#334155',
    barColor2: '#0284c7',
    barColor3: '#10b981',
    pill1: 'GS1-128 Outer Carton Barcodes',
    pill2: '4x6 Direct Thermal Printable',
    pill3: 'Surgical & Sports Goods Export',
    pill4: 'Zero Database • Instant Print',
  },
  {
    id: 'printer-diagnostics',
    fileName: 'printer-diagnostics-2026.png',
    titleLine1: 'Thermal Receipt & POS',
    titleLine2: 'Printer Diagnostics',
    subTitle: 'Step-by-step troubleshooter for 80mm ESC/POS thermal printers, paper jams, blurred print, and cutter jams.',
    laptopTag: 'HARDWARE DIAGNOSTIC LAB',
    metricProfit: 'Auto-Cutter Jam Solution Found',
    metricMargin: 'Stepper Motor Pulse: Verified',
    metricFees: 'Doorstep Tech Dispatch: 45 Min',
    barColor1: '#dc2626',
    barColor2: '#d97706',
    barColor3: '#10b981',
    pill1: '80mm ESC/POS Decision Trees',
    pill2: 'Cutter Lock & Jam Solutions',
    pill3: 'Thermal Head Voltage Test',
    pill4: 'Sialkot Doorstep Lab Support',
  },
  {
    id: 'factory-network-tester',
    fileName: 'factory-network-tester-2026.png',
    titleLine1: 'Factory ERP & Customs',
    titleLine2: 'Network Latency Tester',
    subTitle: 'Benchmark factory network latency, SQL server database sync times, and WeBOC customs gateway ping stability.',
    laptopTag: 'INDUSTRIAL LATENCY BENCH',
    metricProfit: 'WeBOC Gateway Ping: 18ms',
    metricMargin: 'Jitter: 1.2ms (Optimal)',
    metricFees: 'Dual-Fiber Failover: Online',
    barColor1: '#0284c7',
    barColor2: '#059669',
    barColor3: '#10b981',
    pill1: 'WeBOC Customs Ping Stability',
    pill2: 'ERP Database Latency Benchmark',
    pill3: 'Dual-WAN Failover Analysis',
    pill4: 'Factory SD-WAN Hardening',
  },
  {
    id: 'live-repair-tracker',
    fileName: 'live-repair-tracker-2026.png',
    titleLine1: 'Live RMA Bench Repair',
    titleLine2: 'Status Tracker',
    subTitle: 'Track motherboard micro-soldering progress, 19V rail injection logs, and warranty certificates in Sialkot.',
    laptopTag: 'BENCH RMA LIVE TRACKER',
    metricProfit: 'Status: Micro-Soldering Complete',
    metricMargin: 'Standby Current: 12mA (Pass)',
    metricFees: 'Warranty: 90-Day Lab Guarantee',
    barColor1: '#0284c7',
    barColor2: '#10b981',
    barColor3: '#d97706',
    pill1: 'Real-Time Bench Status Tracking',
    pill2: '19V Power Rail Voltage Logs',
    pill3: 'Stereo Microscope Inspection',
    pill4: '90-Day Evonix Warranty Card',
  },
];

function generateOgImage(config: ToolOgConfig) {
  const fontBold = '/usr/share/fonts/truetype/liberation/LiberationSans-Bold.ttf';
  const fontRegular = '/usr/share/fonts/truetype/liberation/LiberationSans-Regular.ttf';

  const publicPath = path.resolve(process.cwd(), 'public/images', config.fileName);
  const distPath = path.resolve(process.cwd(), 'dist/images', config.fileName);

  // Skip Amazon FBA because user provided a custom image for it
  if (config.fileName === 'amazon-fba-fee-calculator-2026.png' && fs.existsSync(publicPath)) {
    console.log(`[SKIPPED] ${config.fileName} (Preserving custom user image)`);
    return;
  }

  // Ensure directories exist
  fs.mkdirSync(path.dirname(publicPath), { recursive: true });
  fs.mkdirSync(path.dirname(distPath), { recursive: true });

  // Escape special chars for ImageMagick
  const escapeText = (t: string) => t.replace(/"/g, '\\"').replace(/\$/g, '\\$');

  const cmd = `convert -size 1200x630 xc:#f8fafc \\
    -fill "#ffffff" -stroke "#e2e8f0" -strokewidth 2 -draw "roundrectangle 50,70 540,540 16,16" \\
    -fill "#0f172a" -stroke none -draw "roundrectangle 65,85 525,480 12,12" \\
    -fill "#ef4444" -draw "circle 85,105 85,109" \\
    -fill "#f59e0b" -draw "circle 105,105 105,109" \\
    -fill "#10b981" -draw "circle 125,105 125,109" \\
    -fill "#334155" -draw "roundrectangle 65,490 525,525 8,8" \\
    -fill "#64748b" -draw "roundrectangle 260,490 330,498 3,3" \\
    -font "${fontBold}" \\
    -fill "#38bdf8" -pointsize 13 -gravity northwest -annotate +150+98 "${escapeText(config.laptopTag)}" \\
    -fill "#ffffff" -pointsize 24 -annotate +90+150 "${escapeText(config.metricProfit)}" \\
    -fill "#10b981" -pointsize 17 -annotate +90+190 "${escapeText(config.metricMargin)}" \\
    -font "${fontRegular}" \\
    -fill "#94a3b8" -pointsize 13 -annotate +90+240 "${escapeText(config.metricFees)}" \\
    -fill "${config.barColor1}" -draw "rectangle 90,280 430,295" \\
    -fill "${config.barColor2}" -draw "rectangle 90,310 350,325" \\
    -fill "${config.barColor3}" -draw "rectangle 90,340 280,355" \\
    -font "${fontBold}" \\
    -fill "#0d9488" -pointsize 16 -annotate +590+90 "EVONIX TECHNOLOGIES" \\
    -fill "#0284c7" -stroke "#38bdf8" -strokewidth 1 -draw "roundrectangle 590,120 725,146 13,13" \\
    -fill "#ffffff" -stroke none -pointsize 12 -annotate +605+126 "2026 UPDATED" \\
    -fill "#0f172a" -pointsize 36 -annotate +590+170 "${escapeText(config.titleLine1)}\\n${escapeText(config.titleLine2)}" \\
    -font "${fontRegular}" \\
    -fill "#475569" -pointsize 16 -annotate +590+270 "${escapeText(config.subTitle)}" \\
    -fill "#f1f5f9" -stroke "#cbd5e1" -strokewidth 1 -draw "roundrectangle 590,340 835,380 8,8" \\
    -font "${fontBold}" \\
    -fill "#0f172a" -stroke none -pointsize 13 -annotate +605+353 "${escapeText(config.pill1)}" \\
    -fill "#f1f5f9" -stroke "#cbd5e1" -strokewidth 1 -draw "roundrectangle 855,340 1120,380 8,8" \\
    -fill "#0f172a" -stroke none -pointsize 13 -annotate +870+353 "${escapeText(config.pill2)}" \\
    -fill "#f1f5f9" -stroke "#cbd5e1" -strokewidth 1 -draw "roundrectangle 590,400 835,440 8,8" \\
    -fill "#0f172a" -stroke none -pointsize 13 -annotate +605+413 "${escapeText(config.pill3)}" \\
    -fill "#f1f5f9" -stroke "#cbd5e1" -strokewidth 1 -draw "roundrectangle 855,400 1120,440 8,8" \\
    -fill "#0f172a" -stroke none -pointsize 13 -annotate +870+413 "${escapeText(config.pill4)}" \\
    -font "${fontBold}" \\
    -fill "#64748b" -pointsize 15 -annotate +590+570 "www.evonixtec.com" \\
    -font "${fontRegular}" \\
    -fill "#94a3b8" -pointsize 13 -annotate +920+570 "Zero Database • 100% Free" \\
    "${publicPath}"`;

  try {
    execSync(cmd, { stdio: 'pipe' });
    fs.copyFileSync(publicPath, distPath);
    const stat = fs.statSync(publicPath);
    console.log(`[GENERATED] ${config.fileName} (${Math.round(stat.size / 1024)} KB)`);
  } catch (err: any) {
    console.error(`[ERROR] Failed to generate ${config.fileName}:`, err?.message || err);
  }
}

console.log('--- Generating All 1200x630 OG Images for Evonix Tools ---');
for (const tool of TOOLS) {
  generateOgImage(tool);
}
console.log('--- Done Generating All OG Images ---');
