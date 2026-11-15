import React, { useState } from 'react';
import {
  ArrowRight,
  Barcode,
  WifiOff,
  PackageCheck,
  BookOpenCheck,
  Wallet,
  TrendingUp,
  Database,
  HardDrive,
  RefreshCw,
  Check,
  ChevronDown,
  ShieldCheck,
  Printer,
  Layers,
  MessageSquare,
  Store,
  Pill,
  Shirt,
  Smartphone,
  Package,
  FileSpreadsheet,
  Lock,
  Monitor,
  Receipt,
} from 'lucide-react';
import { COMPANY_INFO } from '../data/content';

export interface EvonixHisaabProSectionProps {
  id?: string;
  asMainPage?: boolean;
  onOpenQuote: (serviceType?: string) => void;
  onNavigatePage?: (page: any) => void;
}

interface CoreCapability {
  num: string;
  title: string;
  description: string;
  icon: React.ReactNode;
}

const CORE_CAPABILITIES: CoreCapability[] = [
  {
    num: '01',
    title: 'Fast Barcode Counter',
    description:
      'Scan barcodes or tap quick keys, sell by piece, strip, dozen, or carton, accept split payments (Cash, Card, JazzCash, Easypaisa, Khata), and process returns in seconds.',
    icon: <Barcode className="w-5 h-5 text-[#C81E1E]" />,
  },
  {
    num: '02',
    title: '100% Offline Windows Engine',
    description:
      'Built natively for Windows desktops and local networks. Load-shedding or weak internet never stops your counter—all bills, stock updates, and silent daily backups stay safely on your own machine.',
    icon: <WifiOff className="w-5 h-5 text-[#C81E1E]" />,
  },
  {
    num: '03',
    title: 'Multi-Unit Stock (Cartons In, Pieces Out)',
    description:
      'Purchase in cartons or boxes and sell in loose pieces or strips with automatic unit conversion, low-stock alerts, batch expiry tracking, and damage logs.',
    icon: <PackageCheck className="w-5 h-5 text-[#C81E1E]" />,
  },
  {
    num: '04',
    title: 'Digital Khata & WhatsApp Udhaar Reminders',
    description:
      'Every credit (udhaar) sale updates the customer’s ledger right from the billing counter, complete with credit limit blocks, aging breakdowns, and one-click WhatsApp udhaar reminders.',
    icon: <BookOpenCheck className="w-5 h-5 text-[#C81E1E]" />,
  },
  {
    num: '05',
    title: 'Cash Drawer (Galla) & Expenses',
    description:
      'Open and close your daily Galla with exact denomination counts, record shop expenses on the spot, and lock refunds or discounts behind a Manager PIN.',
    icon: <Wallet className="w-5 h-5 text-[#C81E1E]" />,
  },
  {
    num: '06',
    title: 'Daily Net Profit Report',
    description:
      'Go beyond gross sales—see exact daily and item-wise net profit after subtracting purchase cost (COGS) and daily shop expenses.',
    icon: <TrendingUp className="w-5 h-5 text-[#C81E1E]" />,
  },
];

const ARCHITECTURE_STEPS = [
  {
    step: '01',
    title: 'POS Counter',
    subtitle: 'Instant Barcode Scan',
    detail:
      'Sub-second item lookup, multi-unit selection, thermal print & automatic cash-drawer kick.',
    icon: <Barcode className="w-4 h-4 text-[#C81E1E]" />,
  },
  {
    step: '02',
    title: 'Local High-Speed Database',
    subtitle: 'Zero Lag',
    detail:
      'Catalog, pricing tiers, stock counts, and Khata ledgers execute directly on your Windows PC or LAN.',
    icon: <Database className="w-4 h-4 text-[#C81E1E]" />,
  },
  {
    step: '03',
    title: 'Silent Automated Daily Backup',
    subtitle: 'USB / Local Drive',
    detail:
      'Automatic scheduled snapshots saved to a secondary local partition or external USB flash drive.',
    icon: <HardDrive className="w-4 h-4 text-[#C81E1E]" />,
  },
  {
    step: '04',
    title: 'Optional Local Branch Sync',
    subtitle: 'Controlled Replication',
    detail:
      'Sync multi-counter or branch reports whenever connected, without ever blocking live counter billing.',
    icon: <RefreshCw className="w-4 h-4 text-[#C81E1E]" />,
  },
];

type AgingFilter = 'all' | '7' | '15' | '30';

interface KhataSampleAccount {
  id: string;
  customer: string;
  area: string;
  balancePkr: number;
  limitPkr: number;
  overdueDays: number;
  bucket: '7' | '15' | '30';
  status: string;
}

const KHATA_LEDGER_SAMPLE: KhataSampleAccount[] = [
  {
    id: 'KH-104',
    customer: 'Al-Rehman Traders',
    area: 'Paris Road',
    balancePkr: 48500,
    limitPkr: 50000,
    overdueDays: 34,
    bucket: '30',
    status: 'Near Limit Alert',
  },
  {
    id: 'KH-118',
    customer: 'Madina General Store',
    area: 'Kotli Behram',
    balancePkr: 19200,
    limitPkr: 40000,
    overdueDays: 18,
    bucket: '15',
    status: 'Due in 15+ Days',
  },
  {
    id: 'KH-129',
    customer: 'Haji Brothers Hardware',
    area: 'Rangpura',
    balancePkr: 12750,
    limitPkr: 60000,
    overdueDays: 9,
    bucket: '7',
    status: '7+ Days Overdue',
  },
  {
    id: 'KH-142',
    customer: 'Sadaf Garment Mart',
    area: 'Sialkot Cantt',
    balancePkr: 62000,
    limitPkr: 60000,
    overdueDays: 41,
    bucket: '30',
    status: 'Credit Limit Locked',
  },
];

type RoleId = 'all' | 'cashier' | 'helper' | 'manager' | 'owner';

interface StaffRoleRow {
  id: Exclude<RoleId, 'all'>;
  num: string;
  role: string;
  primaryScreen: string;
  allowedActions: string;
  controls: string[];
  pinPolicy: string;
}

const STAFF_ROLES: StaffRoleRow[] = [
  {
    id: 'cashier',
    num: '01',
    role: 'Cashier',
    primaryScreen: 'POS Billing Counter',
    allowedActions:
      'Barcode scanning, Cash/Card/JazzCash/Easypaisa/udhaar bills, receipt printing, and PIN-restricted returns.',
    controls: [
      'Rapid barcode scan & quick-key billing',
      'Split payments: Cash, Card, JazzCash, Easypaisa, Khata',
      'Instant 58mm / 80mm receipt & drawer kick',
      'Refunds and above-cap discounts locked behind Manager PIN',
    ],
    pinPolicy: 'PIN Required for Refunds & Discounts',
  },
  {
    id: 'helper',
    num: '02',
    role: 'Store Helper',
    primaryScreen: 'Inventory & Purchases',
    allowedActions:
      'Receive supplier stock, log damaged/expired items, print barcode labels, and check low-stock alerts.',
    controls: [
      'Stock receiving in cartons, boxes, dozens, or strips',
      'Barcode & hang-tag thermal label printing',
      'Damage, expiry, and dead-stock write-off entries',
      'No access to shop net profit or owner cash ledgers',
    ],
    pinPolicy: 'Stock Floor Access Only',
  },
  {
    id: 'manager',
    num: '03',
    role: 'Manager',
    primaryScreen: 'Khata & Cash Register',
    allowedActions:
      'Approve PIN-locked refunds/discounts, collect udhaar payments, open/close daily Galla, and log expenses.',
    controls: [
      'Approve cashier PIN-locked refunds & price discounts',
      'Open & close daily Galla with denomination breakdown',
      'Collect partial/full Khata payments & issue WhatsApp reminders',
      'Log utility bills, petty cash, and daily shop expenses',
    ],
    pinPolicy: 'Supervisor PIN Authority (Refunds & Discounts)',
  },
  {
    id: 'owner',
    num: '04',
    role: 'Shop Owner',
    primaryScreen: 'Executive Profit Dashboard',
    allowedActions:
      'Live daily sales, net profit after expenses, staff activity audit logs, and full backup controls.',
    controls: [
      'Real-time net profit after COGS & daily expenses',
      'Staff activity audit log tracking every edit or void',
      'Configure customer Khata credit limits & price tiers',
      'Manage encrypted local & USB backup schedules',
    ],
    pinPolicy: 'Full Owner Master Control',
  },
];

const MIGRATION_HARDWARE_ITEMS = [
  {
    num: '01',
    title: 'Zero-Loss Excel & Paper Register Migration',
    description:
      'Import your existing product list, barcodes, purchase rates, and opening customer udhaar balances cleanly from Excel sheets or old paper registers before counter go-live.',
    icon: <FileSpreadsheet className="w-5 h-5 text-[#C81E1E]" />,
  },
  {
    num: '02',
    title: 'FBR Tier-1 POS Integration Ready',
    description:
      'Pre-structured NTN/STRN tax rules, digital invoice fiscalization hooks, and instant itemized tax summaries designed for FBR Tier-1 POS retail compliance.',
    icon: <Receipt className="w-5 h-5 text-[#C81E1E]" />,
  },
  {
    num: '03',
    title: 'Pre-Configured POS Hardware Bundle',
    description:
      'Tested plug-and-play setup for 58mm/80mm thermal receipt printers, USB/wireless barcode scanners, barcode/hang-tag printers, and automatic RJ11 cash drawers.',
    icon: <Printer className="w-5 h-5 text-[#C81E1E]" />,
  },
  {
    num: '04',
    title: 'Runs Natively on Your Existing PC or Laptop',
    description:
      'No heavy server or cloud dependency needed. Installs directly on Windows 10/11 PCs and local LAN counters with silent daily USB/local-drive backups.',
    icon: <HardDrive className="w-5 h-5 text-[#C81E1E]" />,
  },
  {
    num: '05',
    title: 'Khata Built Inside the Sale Screen',
    description:
      'Credit limits and udhaar balances stay visible right on the billing screen so cashiers never oversell above approved limits.',
    icon: <BookOpenCheck className="w-5 h-5 text-[#C81E1E]" />,
  },
  {
    num: '06',
    title: 'PIN-Locked Owner Security & Audit Trail',
    description:
      'Every refund, voided invoice, and discount above your set limit demands a Manager PIN and logs staff timestamps permanently.',
    icon: <Lock className="w-5 h-5 text-[#C81E1E]" />,
  },
];

const SOFTWARE_MODULES = [
  {
    num: '01',
    title: 'Evonix POS & Billing',
    description:
      'High-speed counter billing with multi-unit pricing, split payments (Cash, Card, JazzCash, Easypaisa, Khata), thermal/A4 receipts, and WhatsApp invoice sharing.',
    icon: <Printer className="w-5 h-5 text-[#C81E1E]" />,
  },
  {
    num: '02',
    title: 'Smart Inventory Engine',
    description:
      'Multi-unit stock tracking, automated barcode/hang-tag printing, low-stock alerts, damage write-offs, stock valuation, and bulk price updates.',
    icon: <Layers className="w-5 h-5 text-[#C81E1E]" />,
  },
  {
    num: '03',
    title: 'Digital Khata & Receivables',
    description:
      'Customer and supplier ledgers, aging reports, credit limit locks, partial payment receipts, and one-click WhatsApp reminders.',
    icon: <BookOpenCheck className="w-5 h-5 text-[#C81E1E]" />,
  },
  {
    num: '04',
    title: 'Owner Profit & Accounting Reports',
    description:
      'Daily sales summary, item-wise profit margins, Profit & Loss (P&L) statement, day book, and Excel/accounting exports (QuickBooks, Xero, FBR-ready).',
    icon: <FileSpreadsheet className="w-5 h-5 text-[#C81E1E]" />,
  },
  {
    num: '05',
    title: 'Offline Security & Auto-Backup',
    description:
      'Hardware-bound licensing, role-based permissions, PIN-locked overrides, and silent daily local/USB backups.',
    icon: <Lock className="w-5 h-5 text-[#C81E1E]" />,
  },
];

type IndustryId = 'kiryana' | 'pharmacy' | 'garments' | 'mobile' | 'wholesale';

interface IndustryEdition {
  id: IndustryId;
  num: string;
  shortLabel: string;
  title: string;
  screenshotSlot: string;
  screenshotSpec: string;
  description: string;
  highlights: string[];
  icon: React.ReactNode;
}

const INDUSTRY_EDITIONS: IndustryEdition[] = [
  {
    id: 'kiryana',
    num: '01',
    shortLabel: 'Kiryana & Grocery',
    title: 'Kiryana store ka software — Grocery & Mart Edition',
    screenshotSlot: 'Kiryana Counter & Loose-Unit Billing UI',
    screenshotSpec: '1280 × 720 · Loose Weight, Carton Conversion & Excel Import',
    description:
      'Dedicated Kiryana store ka software with fast barcode scanning, loose/dozen/carton unit conversions, weight-scale support, customer udhaar limits, and bulk Excel catalog import.',
    highlights: [
      'Loose, dozen & carton auto conversion',
      'Digital weight-scale barcode billing',
      'Customer udhaar credit limit blocks',
      'Fast bulk Excel catalog import',
    ],
    icon: <Store className="w-4 h-4 text-[#C81E1E]" />,
  },
  {
    id: 'pharmacy',
    num: '02',
    shortLabel: 'Pharmacy & Medical',
    title: 'Pharmacy & medical store software Pakistan',
    screenshotSlot: 'Pharmacy Salt Search & 35,500+ SKU UI',
    screenshotSpec: '1280 × 720 · Salt/Formula Search, FEFO Expiry & Narcotic Register',
    description:
      'Purpose-built Pharmacy & medical store software Pakistan featuring search by salt/generic formula, a pre-loaded 35,500+ SKU medicine catalog, FEFO batch expiry alerts, and a controlled narcotic register.',
    highlights: [
      'Search by salt/generic formula & substitutes',
      '35,500+ SKU pre-mapped medicine catalog',
      'FEFO batch & strip-vs-box expiry alerts',
      'Controlled narcotic register & cold-chain logs',
    ],
    icon: <Pill className="w-4 h-4 text-[#C81E1E]" />,
  },
  {
    id: 'garments',
    num: '03',
    shortLabel: 'Garments & Footwear',
    title: 'Garments & boutique POS software — Apparel & Footwear',
    screenshotSlot: 'Garments & Footwear Matrix + Hang-Tag UI',
    screenshotSpec: '1280 × 720 · Size & Color Matrix, Hang-Tags & Qist Plans',
    description:
      'Flexible Garments & boutique POS software for clothing boutiques and footwear shops: complete size & color variant matrix, barcode hang-tag printing, silai/tailoring tracking, exchanges, and qist (installment) plans.',
    highlights: [
      'Complete size & color variant matrix (Apparel & Shoes)',
      'Thermal barcode hang-tag & box-label printing',
      'Silai/tailoring & alteration job cards',
      'Hold/exchange handling & qist (installment) plans',
    ],
    icon: <Shirt className="w-4 h-4 text-[#C81E1E]" />,
  },
  {
    id: 'mobile',
    num: '04',
    shortLabel: 'Mobile & IMEI',
    title: 'Mobile shop IMEI & PTA status software',
    screenshotSlot: 'Mobile IMEI Serial & Repair Job Card UI',
    screenshotSpec: '1280 × 720 · IMEI Ledger, PTA Status & Qist Tracking',
    description:
      'Specialized Mobile shop IMEI & PTA status software for phone and electronics dealers: serial/IMEI tracking per unit, PTA approval status logs, used-phone trade-in records, repair job cards, and installment tracking.',
    highlights: [
      'Per-handset IMEI & serial number tracking',
      'PTA approval status & trade-in records',
      'Technician repair job cards & parts log',
      'Monthly installment (Qist) schedule & alerts',
    ],
    icon: <Smartphone className="w-4 h-4 text-[#C81E1E]" />,
  },
  {
    id: 'wholesale',
    num: '05',
    shortLabel: 'Cosmetics & Wholesale',
    title: 'Wholesale & distribution software Pakistan — Cosmetics & Traders',
    screenshotSlot: 'Wholesale Tiered Pricing & A4 Invoice UI',
    screenshotSpec: '1280 × 720 · Carton/Piece Rates, Credit Limits & A4 Bills',
    description:
      'High-speed Wholesale & distribution software Pakistan for cosmetics showrooms and wholesale traders: carton/piece tiered rate lists, buyer credit limits, shade/batch expiry logs, and itemized A4 invoices.',
    highlights: [
      'Carton vs. piece tiered wholesale rate lists',
      'Strict buyer credit limits & aging blocks',
      'Cosmetics shade/batch expiry & tester logs',
      'Print-ready A4 commercial & tax invoices',
    ],
    icon: <Package className="w-4 h-4 text-[#C81E1E]" />,
  },
];

interface PricingPlan {
  id: string;
  tier: string;
  subtitle: string;
  priceLabel: string;
  priceNote: string;
  description: string;
  features: string[];
  featured?: boolean;
  ctaLabel: string;
}

const PRICING_PLANS: PricingPlan[] = [
  {
    id: 'trial',
    tier: 'Free Trial / Starter Evaluation',
    subtitle: '14-Day Full Evaluation',
    priceLabel: 'Rs 0',
    priceNote: '14-Day Local Trial',
    description:
      'Test full offline POS, barcode billing, inventory, and Khata on your own shop PC before committing.',
    features: [
      'Full offline POS & barcode billing',
      'Multi-unit inventory & stock alerts',
      'Digital Khata & daily net profit view',
      'Install directly on Windows 10/11 PC',
    ],
    ctaLabel: 'Start 14-Day Evaluation',
  },
  {
    id: 'single-shop',
    tier: 'Single Shop Pro',
    subtitle: '1 Counter / Local PC',
    priceLabel: 'Custom / Affordable Plan',
    priceNote: 'One-Time / Offline License',
    description:
      'Unlimited products, unlimited offline sales, Digital Khata + WhatsApp reminders, daily net profit reports, and silent auto-backups.',
    features: [
      'Unlimited products & offline sales',
      'Digital Khata + WhatsApp reminders',
      'Daily Galla & net profit reports',
      'Silent daily USB & local backups',
    ],
    featured: true,
    ctaLabel: 'Get Single Shop Quote',
  },
  {
    id: 'multi-branch',
    tier: 'Multi-Counter / Multi-Branch Edition',
    subtitle: '3–10 Counters / Branches',
    priceLabel: 'Custom Plan',
    priceNote: 'LAN + Multi-Branch Sync',
    description:
      'Up to 3–10 counters/branches, inter-branch stock transfers, centralized profit reporting, and priority setup support.',
    features: [
      'Up to 3–10 counters or branches',
      'Inter-branch stock transfer ledgers',
      'Centralized consolidated profit report',
      'Priority onboarding & staff setup',
    ],
    ctaLabel: 'Request Multi-Branch Plan',
  },
  {
    id: 'enterprise',
    tier: 'Enterprise & Custom ERP',
    subtitle: 'Unlimited Counters & APIs',
    priceLabel: 'Custom Quote',
    priceNote: 'Dedicated Onboarding',
    description:
      'Unlimited counters, custom workflows, FBR Tier-1 integration, API exports, and dedicated on-site/remote onboarding.',
    features: [
      'Unlimited counters & custom workflows',
      'FBR Tier-1 POS digital invoicing',
      'Accounting & ERP API exports',
      'Dedicated on-site or remote onboarding',
    ],
    ctaLabel: 'Book Enterprise Consultation',
  },
];

export const HISAAB_PRO_FAQS = [
  {
    question: 'Does Evonix Hisaab Pro work as offline POS software without internet?',
    answer:
      'Yes. Evonix Hisaab Pro is native Windows offline POS software without internet dependency. Barcode scanning, multi-unit billing, stock updates, and Digital Khata ledgers execute locally on your PC or counter LAN without freezing during Wi-Fi outages.',
  },
  {
    question:
      'Can I use it as Kiryana store ka software with loose weights, dozens, and cartons?',
    answer:
      'Yes. As dedicated Kiryana store ka software, you can purchase stock in cartons or sacks and sell in loose weight, pieces, or dozens with automatic unit conversion, customer udhaar limits, and bulk Excel product import.',
  },
  {
    question: 'How do Digital khata WhatsApp reminders work from a Windows PC?',
    answer:
      'Every udhaar invoice updates the customer account automatically. Whenever you check your overdue receivables (7, 15, or 30+ days), Digital khata WhatsApp reminders let you send itemized balance messages and receipts via WhatsApp Desktop or Web in one click.',
  },
  {
    question:
      'How does Evonix Hisaab Pro help on how to run a retail shop in Pakistan with less leakage?',
    answer:
      'Shop owners learning how to run a retail shop in Pakistan profitably need two things: PIN-locked staff controls and real net profit tracking. Cashiers cannot approve refunds or extra discounts without a Manager PIN, daily Galla counts verify cash at closing, and COGS + expenses reveal true daily profit.',
  },
  {
    question: 'What happens to my data if my Windows PC has an issue or power outage?',
    answer:
      'Your sales, inventory, and Khata database stay saved safely on your machine with silent automated daily backups to a secondary local drive or USB flash drive—allowing full restoration within minutes.',
  },
  {
    question:
      'Does it support FBR Tier-1 POS, Excel migration, and 58mm/80mm thermal hardware?',
    answer:
      'Yes. Our onboarding team performs zero-loss data migration from Excel sheets or paper registers, configures FBR Tier-1 POS digital invoicing if required, and connects all standard 58mm/80mm thermal printers, barcode scanners, and automatic cash drawers.',
  },
];

const SCREENSHOT_SLOTS = [
  { num: '01', label: 'POS Counter', spec: 'Fast Barcode Counter UI (16:9)' },
  { num: '02', label: 'Digital Khata', spec: 'Udhaar & WhatsApp Ledger (16:9)' },
  { num: '03', label: 'Pharmacy (35,500+ SKUs)', spec: 'Salt Search & FEFO Batch (16:9)' },
  { num: '04', label: 'Garments & Footwear', spec: 'Size-Color Matrix & Tags (16:9)' },
  { num: '05', label: 'Wholesale & Mobile', spec: 'IMEI & Tiered Rates (16:9)' },
];

export const EvonixHisaabProSection: React.FC<EvonixHisaabProSectionProps> = ({
  id = 'software-pos',
  asMainPage = false,
  onOpenQuote,
  onNavigatePage,
}) => {
  const [agingFilter, setAgingFilter] = useState<AgingFilter>('all');
  const [reminderPreviewAccount, setReminderPreviewAccount] = useState<KhataSampleAccount>(
    KHATA_LEDGER_SAMPLE[0]
  );
  const [selectedRole, setSelectedRole] = useState<RoleId>('all');
  const [activeIndustry, setActiveIndustry] = useState<IndustryId>('kiryana');
  const [openFaqIdx, setOpenFaqIdx] = useState<number | null>(0);

  const filteredKhata =
    agingFilter === 'all'
      ? KHATA_LEDGER_SAMPLE
      : KHATA_LEDGER_SAMPLE.filter((row) => row.bucket === agingFilter);

  const totalReceivables = KHATA_LEDGER_SAMPLE.reduce((sum, item) => sum + item.balancePkr, 0);

  const activeIndustryObj =
    INDUSTRY_EDITIONS.find((item) => item.id === activeIndustry) || INDUSTRY_EDITIONS[0];

  const activeRoleObj =
    selectedRole === 'all'
      ? null
      : STAFF_ROLES.find((item) => item.id === selectedRole) || null;

  return (
    <div id={id} className="bg-white text-slate-900">
      {/* =====================================================================
          BLOCK 1: BOXED HERO + SCREENSHOT FRAME + 6-CARD FEATURE GRID
         ===================================================================== */}
      <section className="py-16 sm:py-20 bg-white border-b border-[#E5E7EB]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="bg-[#FAFAF9] border border-[#E5E7EB] rounded-xl p-6 sm:p-8 lg:p-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
              <div className="lg:col-span-6 space-y-5 text-left">
                <p className="text-xs font-semibold text-[#C81E1E]">
                  Evonix Hisaab Pro · 100% Offline Retail &amp; Business POS
                </p>

                {asMainPage ? (
                  <h1
                    className="font-semibold tracking-tight text-slate-900 leading-[1.12] max-w-2xl"
                    style={{ fontSize: 'clamp(2rem, 3.3vw, 2.95rem)', textWrap: 'balance' }}
                  >
                    Offline POS, Digital Khata &amp; Retail Management Software Built for Pakistani Businesses
                  </h1>
                ) : (
                  <h2
                    className="text-2xl sm:text-4xl font-semibold tracking-tight text-slate-900 leading-tight max-w-2xl"
                    style={{ textWrap: 'balance' }}
                  >
                    Offline POS, Digital Khata &amp; Retail Management Software Built for Pakistani Businesses
                  </h2>
                )}

                <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-2xl">
                  Run counter billing, multi-unit stock, digital Khata, and daily net profit reports on your own PC or laptop with Evonix Hisaab Pro—zero internet dependency, zero cloud lag, and 100% data privacy.
                </p>

                <div className="flex flex-wrap items-center gap-3 pt-1">
                  <button
                    type="button"
                    onClick={() => onOpenQuote('Evonix Hisaab Pro — 14-Day Free Trial')}
                    className="inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-[#C81E1E] hover:bg-[#A6171E] text-white font-semibold text-xs sm:text-sm transition-colors cursor-pointer whitespace-nowrap"
                  >
                    <span>Start 14-Day Free Evaluation</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                  <a
                    href="#hisaab-pro-plans"
                    onClick={(e) => {
                      e.preventDefault();
                      const el = document.getElementById('hisaab-pro-plans');
                      if (el) el.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-white hover:bg-slate-50 text-slate-900 font-semibold text-xs sm:text-sm border border-[#E5E7EB] transition-colors whitespace-nowrap"
                  >
                    <span>View Plans &amp; Setup</span>
                  </a>
                </div>

                <div className="pt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-slate-500 font-mono tabular-nums">
                  <span>Windows 10 / 11 Native</span>
                  <span aria-hidden="true">·</span>
                  <span>0ms Internet Lag</span>
                  <span aria-hidden="true">·</span>
                  <span>58mm &amp; 80mm Thermal Ready</span>
                  <span aria-hidden="true">·</span>
                  <span>Silent Daily USB Backups</span>
                </div>
              </div>

              {/* Clean UI Screenshot Frame 01: POS Counter */}
              <div className="lg:col-span-6 bg-white border border-[#E5E7EB] rounded-xl p-5 space-y-4 text-left">
                <div className="flex items-center justify-between pb-3 border-b border-[#E5E7EB]">
                  <div className="flex items-center gap-2">
                    <Monitor className="w-4 h-4 text-[#C81E1E]" />
                    <span className="text-xs font-semibold text-slate-900">
                      UI Frame 01 · Fast Barcode Counter Screen
                    </span>
                  </div>
                  <span className="font-mono text-[11px] text-slate-500 tabular-nums">
                    16:9 Screenshot Slot
                  </span>
                </div>

                <div className="aspect-[16/10] w-full bg-[#FAFAF9] border border-dashed border-[#CBD5E1] rounded-lg p-4 sm:p-5 flex flex-col justify-between">
                  <div className="flex items-center justify-between text-xs border-b border-[#E5E7EB] pb-2.5">
                    <span className="font-mono font-semibold text-slate-700">
                      EVONIX HISAAB PRO · POS COUNTER
                    </span>
                    <span className="font-mono text-[11px] text-[#C81E1E] font-semibold">
                      OFFLINE · WINDOWS LAN
                    </span>
                  </div>

                  <div className="my-auto text-center space-y-2 py-4">
                    <p className="text-sm font-semibold text-slate-800">
                      Evonix Hisaab Pro Counter Screenshot Frame
                    </p>
                    <p className="text-xs text-slate-500 max-w-sm mx-auto leading-relaxed">
                      Place your real Fast Barcode Counter screenshot here (recommended 1280 × 800 PNG or WebP).
                    </p>
                    <div className="pt-2 flex flex-wrap justify-center gap-x-3 gap-y-1 font-mono text-[11px] text-slate-500 tabular-nums">
                      <span>Cash / Card</span>
                      <span aria-hidden="true">·</span>
                      <span>JazzCash / Easypaisa</span>
                      <span aria-hidden="true">·</span>
                      <span>Khata Split</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-2.5 pt-2.5 border-t border-[#E5E7EB] font-mono tabular-nums text-[11px]">
                    <div>
                      <div className="text-slate-400">Lookup</div>
                      <div className="font-semibold text-slate-900">&lt; 15 ms</div>
                    </div>
                    <div>
                      <div className="text-slate-400">Internet</div>
                      <div className="font-semibold text-slate-900">0% Required</div>
                    </div>
                    <div className="text-right">
                      <div className="text-slate-400">Backup</div>
                      <div className="font-semibold text-[#C81E1E]">Auto Daily USB</div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between gap-3 text-xs text-slate-600 pt-1">
                  <span>Includes Excel catalog &amp; paper register migration</span>
                  <a
                    href={`https://wa.me/${COMPANY_INFO.contact.whatsapp}?text=${encodeURIComponent(
                      'Hello evonix, please share the 14-day Evonix Hisaab Pro POS trial details.'
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-semibold text-[#C81E1E] hover:text-[#A6171E] whitespace-nowrap shrink-0"
                  >
                    WhatsApp Desk →
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* 5 Custom UI Screenshot Slots Directory */}
          <div className="bg-[#FAFAF9] border border-[#E5E7EB] rounded-xl p-4 sm:p-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 mb-3 border-b border-[#E5E7EB] text-left">
              <span className="text-xs font-semibold text-slate-900">
                Dedicated UI Screenshot Slots (Real Product Captures Only)
              </span>
              <span className="font-mono text-[11px] text-slate-500">
                POS Counter · Digital Khata · Pharmacy · Garments &amp; Footwear · Wholesale
              </span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 text-left">
              {SCREENSHOT_SLOTS.map((slot) => (
                <div
                  key={slot.num}
                  className="bg-white border border-[#E5E7EB] rounded-lg px-3.5 py-2.5 flex items-center justify-between gap-2"
                >
                  <div className="min-w-0">
                    <div className="text-xs font-semibold text-slate-900 truncate">
                      {slot.label}
                    </div>
                    <div className="text-[11px] text-slate-500 truncate">{slot.spec}</div>
                  </div>
                  <span className="font-mono text-[11px] text-[#C81E1E] font-semibold tabular-nums shrink-0">
                    {slot.num}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* 6-Card Feature Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {CORE_CAPABILITIES.map((cap) => (
              <article
                key={cap.num}
                className="bg-[#FAFAF9] border border-[#E5E7EB] rounded-xl p-6 space-y-3.5 text-left"
              >
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-lg bg-white border border-[#E5E7EB] flex items-center justify-center">
                    {cap.icon}
                  </div>
                  <span className="font-mono text-xs text-slate-400 tabular-nums">{cap.num}.</span>
                </div>
                <h3 className="text-base sm:text-lg font-semibold text-slate-900">{cap.title}</h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {cap.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================================
          WHY OFFLINE-FIRST WINS (VISUAL ARCHITECTURE BLOCK)
         ===================================================================== */}
      <section className="py-16 sm:py-20 bg-[#FAFAF9] border-b border-[#E5E7EB]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 text-left">
          <div className="max-w-3xl space-y-2.5">
            <p className="text-xs font-semibold text-[#C81E1E]">
              02 · Why Offline POS Software Wins
            </p>
            <h2 className="text-2xl sm:text-3xl font-semibold text-slate-900 tracking-tight">
              Billing That Never Waits for the Internet
            </h2>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              Unlike browser-based cloud apps that freeze when Wi-Fi drops, Evonix Hisaab Pro stores your catalog, prices, and customer ledgers directly on your system—delivering instant thermal printing and cash-drawer kick every single time.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 items-stretch">
            {ARCHITECTURE_STEPS.map((node, index) => (
              <div
                key={node.step}
                className="bg-white border border-[#E5E7EB] rounded-xl p-5 flex flex-col justify-between space-y-3"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-semibold text-[#C81E1E] tabular-nums">
                      Step {node.step}
                    </span>
                    <div className="flex items-center gap-1.5">
                      {node.icon}
                      {index < ARCHITECTURE_STEPS.length - 1 && (
                        <ArrowRight className="w-3.5 h-3.5 text-slate-400 hidden lg:inline" />
                      )}
                    </div>
                  </div>
                  <div>
                    <h3 className="text-base font-semibold text-slate-900">{node.title}</h3>
                    <p className="font-mono text-xs text-slate-500 mt-0.5">{node.subtitle}</p>
                  </div>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed pt-2 border-t border-[#E5E7EB]">
                  {node.detail}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================================
          DIGITAL KHATA & WHATSAPP REMINDERS (+ SCREENSHOT FRAME 02)
         ===================================================================== */}
      <section className="py-16 sm:py-20 bg-white border-b border-[#E5E7EB]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start text-left">
            <div className="lg:col-span-5 space-y-4">
              <p className="text-xs font-semibold text-[#C81E1E]">
                03 · Digital Khata &amp; Receivables
              </p>
              <h2 className="text-2xl sm:text-3xl font-semibold text-slate-900 tracking-tight">
                Digital Khata with WhatsApp Udhaar Reminders
              </h2>
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                Every udhaar bill posts automatically to the customer’s account. View total market receivables on one screen, filter overdue balances by age (7, 15, 30+ days), enforce credit limits at the counter, and send polite WhatsApp payment reminders with exact balances in one tap.
              </p>

              <ul className="space-y-2.5 pt-2 text-xs sm:text-sm text-slate-700">
                <li className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-[#C81E1E] shrink-0 mt-0.5" />
                  <span>Direct billing-to-Khata posting with zero double entry</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-[#C81E1E] shrink-0 mt-0.5" />
                  <span>Automatic counter block when a buyer hits their credit limit</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-[#C81E1E] shrink-0 mt-0.5" />
                  <span>One-tap Digital khata WhatsApp reminders with itemized bills</span>
                </li>
              </ul>

              {/* UI Screenshot Slot 02: Digital Khata */}
              <div className="bg-[#FAFAF9] border border-[#E5E7EB] rounded-xl p-4 space-y-2 mt-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-slate-900">
                    UI Frame 02 · Digital Khata Screen
                  </span>
                  <span className="font-mono text-[11px] text-slate-500">16:9 Slot</span>
                </div>
                <div className="aspect-[16/7] w-full bg-white border border-dashed border-[#CBD5E1] rounded-lg flex flex-col items-center justify-center p-4 text-center">
                  <span className="text-xs font-semibold text-slate-700">
                    Digital Khata Ledger Screenshot Placeholder
                  </span>
                  <span className="text-[11px] text-slate-500 mt-1">
                    Drop your real Customer Khata &amp; Aging Report screenshot here
                  </span>
                </div>
              </div>
            </div>

            {/* Interactive Digital Khata Ledger View */}
            <div className="lg:col-span-7 bg-[#FAFAF9] border border-[#E5E7EB] rounded-xl p-5 sm:p-6 space-y-5 text-left">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[#E5E7EB]">
                <div>
                  <div className="text-xs text-slate-500">Total Market Receivables</div>
                  <div className="font-mono text-2xl font-semibold text-slate-900 tabular-nums mt-0.5">
                    Rs {totalReceivables.toLocaleString()}
                  </div>
                </div>

                {/* Aging Filter Controls */}
                <div
                  className="flex flex-wrap items-center gap-1.5"
                  role="group"
                  aria-label="Filter overdue accounts by age"
                >
                  {(
                    [
                      { key: 'all', label: 'All Due' },
                      { key: '7', label: '7+ Days' },
                      { key: '15', label: '15+ Days' },
                      { key: '30', label: '30+ Days' },
                    ] as const
                  ).map((tab) => (
                    <button
                      key={tab.key}
                      type="button"
                      onClick={() => setAgingFilter(tab.key)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer whitespace-nowrap ${
                        agingFilter === tab.key
                          ? 'bg-[#C81E1E] text-white'
                          : 'bg-white text-slate-700 border border-[#E5E7EB] hover:bg-slate-50'
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-2.5">
                {filteredKhata.map((row) => (
                  <div
                    key={row.id}
                    className="bg-white border border-[#E5E7EB] rounded-lg p-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                  >
                    <div className="min-w-0">
                      <div className="flex items-center gap-2 text-xs text-slate-500 font-mono tabular-nums">
                        <span>{row.id}</span>
                        <span aria-hidden="true">·</span>
                        <span>{row.area}</span>
                        <span aria-hidden="true">·</span>
                        <span>{row.overdueDays}d overdue</span>
                      </div>
                      <div className="text-sm font-semibold text-slate-900 mt-0.5 truncate">
                        {row.customer}
                      </div>
                    </div>

                    <div className="flex items-center justify-between sm:justify-end gap-4 shrink-0">
                      <div className="text-left sm:text-right font-mono tabular-nums">
                        <div className="text-sm font-semibold text-slate-900">
                          Rs {row.balancePkr.toLocaleString()}
                        </div>
                        <div className="text-[11px] text-slate-500">
                          Limit Rs {row.limitPkr.toLocaleString()}
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() => setReminderPreviewAccount(row)}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#E5E7EB] bg-[#FAFAF9] hover:bg-white text-xs font-semibold text-[#C81E1E] cursor-pointer whitespace-nowrap"
                      >
                        <MessageSquare className="w-3.5 h-3.5" />
                        <span>Remind</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Polite WhatsApp Reminder Message Preview */}
              <div className="bg-white border border-[#E5E7EB] rounded-lg p-4 space-y-1.5">
                <div className="flex items-center justify-between text-xs text-slate-500">
                  <span className="font-semibold text-slate-700">
                    One-Click WhatsApp Reminder Preview
                  </span>
                  <span className="font-mono tabular-nums">{reminderPreviewAccount.status}</span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  &ldquo;Assalam-o-Alaikum {reminderPreviewAccount.customer}, gentle reminder regarding your pending balance of{' '}
                  <span className="font-mono font-semibold text-slate-900 tabular-nums">
                    Rs {reminderPreviewAccount.balancePkr.toLocaleString()}
                  </span>{' '}
                  ({reminderPreviewAccount.overdueDays} days). Kindly clear at your earliest convenience. Thank you.&rdquo;
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          BLOCK 2: ROLE-BASED ACCESS TABLE (4 ROLES)
         ===================================================================== */}
      <section className="py-16 sm:py-20 bg-[#FAFAF9] border-b border-[#E5E7EB]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 text-left">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div className="max-w-3xl space-y-2.5">
              <p className="text-xs font-semibold text-[#C81E1E]">04 · Role-Based Access</p>
              <h2 className="text-2xl sm:text-3xl font-semibold text-slate-900 tracking-tight">
                One Offline System, Dedicated Screens for Every Staff Role
              </h2>
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                Keep owners in full control while giving staff access only to the screens their job requires—including PIN-locked refunds and discounts for Managers.
              </p>
            </div>

            {/* Interactive Role Switcher */}
            <div
              className="flex flex-wrap items-center gap-1.5"
              role="tablist"
              aria-label="Staff Role Screen Switcher"
            >
              <button
                type="button"
                role="tab"
                aria-selected={selectedRole === 'all'}
                onClick={() => setSelectedRole('all')}
                className={`px-3.5 py-2 rounded-lg text-xs font-semibold transition-colors cursor-pointer whitespace-nowrap ${
                  selectedRole === 'all'
                    ? 'bg-[#C81E1E] text-white'
                    : 'bg-white text-slate-700 border border-[#E5E7EB] hover:bg-slate-50'
                }`}
              >
                All Roles
              </button>
              {STAFF_ROLES.map((r) => (
                <button
                  key={r.id}
                  type="button"
                  role="tab"
                  aria-selected={selectedRole === r.id}
                  onClick={() => setSelectedRole(r.id)}
                  className={`px-3.5 py-2 rounded-lg text-xs font-semibold transition-colors cursor-pointer whitespace-nowrap ${
                    selectedRole === r.id
                      ? 'bg-[#C81E1E] text-white'
                      : 'bg-white text-slate-700 border border-[#E5E7EB] hover:bg-slate-50'
                  }`}
                >
                  {r.role}
                </button>
              ))}
            </div>
          </div>

          {activeRoleObj ? (
            <div className="bg-white border border-[#E5E7EB] rounded-xl p-6 sm:p-8 space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-[#E5E7EB]">
                <div className="space-y-1">
                  <div className="font-mono text-xs text-[#C81E1E] font-semibold tabular-nums">
                    Role {activeRoleObj.num} · {activeRoleObj.pinPolicy}
                  </div>
                  <h3 className="text-xl sm:text-2xl font-semibold text-slate-900">
                    {activeRoleObj.role} — {activeRoleObj.primaryScreen}
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedRole('all')}
                  className="text-xs font-semibold text-slate-700 hover:text-[#C81E1E] border border-[#E5E7EB] rounded-lg px-3.5 py-2 self-start sm:self-auto cursor-pointer whitespace-nowrap"
                >
                  View Full Role Table
                </button>
              </div>

              <p className="text-sm text-slate-600 leading-relaxed">
                {activeRoleObj.allowedActions}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {activeRoleObj.controls.map((ctrl, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-2.5 p-3.5 rounded-lg bg-[#FAFAF9] border border-[#E5E7EB] text-xs sm:text-sm text-slate-700"
                  >
                    <ShieldCheck className="w-4 h-4 text-[#C81E1E] shrink-0 mt-0.5" />
                    <span>{ctrl}</span>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <>
              {/* Desktop 4-Row Boxed Table */}
              <div className="hidden md:block bg-white border border-[#E5E7EB] rounded-xl overflow-hidden">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-[#FAFAF9] border-b border-[#E5E7EB] text-xs font-semibold text-slate-600">
                      <th className="py-3.5 px-5 font-mono w-16">#</th>
                      <th className="py-3.5 px-5 w-44">Staff Role</th>
                      <th className="py-3.5 px-5 w-60">Primary Screen</th>
                      <th className="py-3.5 px-5">Allowed Actions &amp; Controls</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#E5E7EB] text-sm">
                    {STAFF_ROLES.map((row) => (
                      <tr key={row.id} className="hover:bg-[#FAFAF9]/60 transition-colors">
                        <td className="py-4 px-5 font-mono text-xs text-slate-400 tabular-nums align-top">
                          {row.num}
                        </td>
                        <td className="py-4 px-5 font-semibold text-slate-900 align-top">
                          <button
                            type="button"
                            onClick={() => setSelectedRole(row.id)}
                            className="hover:text-[#C81E1E] transition-colors cursor-pointer text-left"
                          >
                            {row.role}
                          </button>
                        </td>
                        <td className="py-4 px-5 font-mono text-xs text-[#C81E1E] font-semibold align-top">
                          {row.primaryScreen}
                        </td>
                        <td className="py-4 px-5 text-slate-600 leading-relaxed align-top">
                          {row.allowedActions}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Mobile Stacked Role Cards (Zero Horizontal Overflow) */}
              <div className="grid grid-cols-1 gap-4 md:hidden">
                {STAFF_ROLES.map((row) => (
                  <div
                    key={row.id}
                    className="bg-white border border-[#E5E7EB] rounded-xl p-5 space-y-2.5"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-base font-semibold text-slate-900">{row.role}</span>
                      <span className="font-mono text-xs text-slate-400 tabular-nums">
                        {row.num}.
                      </span>
                    </div>
                    <div className="font-mono text-xs text-[#C81E1E] font-semibold">
                      Primary Screen: {row.primaryScreen}
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">{row.allowedActions}</p>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </section>

      {/* =====================================================================
          BLOCK 3: INDUSTRY TABS & CARDS WITH HIGH-RANKING KEYWORDS
         ===================================================================== */}
      <section className="py-16 sm:py-20 bg-white border-b border-[#E5E7EB]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 text-left">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div className="max-w-3xl space-y-2.5">
              <p className="text-xs font-semibold text-[#C81E1E]">05 · Industries It Fits</p>
              <h2 className="text-2xl sm:text-3xl font-semibold text-slate-900 tracking-tight">
                Specialized Retail &amp; Wholesale POS Editions for Pakistan
              </h2>
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                Pre-configured billing workflows for Kiryana stores, Pharmacies (35,500+ SKU catalog), Garments &amp; Footwear, Mobile IMEI dealers, and Cosmetics wholesale traders.
              </p>
            </div>

            {onNavigatePage && (
              <button
                type="button"
                onClick={() => onNavigatePage('sialkot-pos-hardware')}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg border border-[#E5E7EB] bg-[#FAFAF9] hover:bg-white text-xs sm:text-sm font-semibold text-slate-800 cursor-pointer whitespace-nowrap self-start lg:self-auto"
              >
                <Printer className="w-4 h-4 text-[#C81E1E]" />
                <span>Compatible POS Hardware</span>
              </button>
            )}
          </div>

          {/* Interactive 5-Industry Tabs */}
          <div
            className="flex flex-wrap items-center gap-2 border-b border-[#E5E7EB] pb-4"
            role="tablist"
            aria-label="Specialized Industry Editions"
          >
            {INDUSTRY_EDITIONS.map((ed) => (
              <button
                key={ed.id}
                type="button"
                role="tab"
                aria-selected={activeIndustry === ed.id}
                onClick={() => setActiveIndustry(ed.id)}
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-colors cursor-pointer whitespace-nowrap ${
                  activeIndustry === ed.id
                    ? 'bg-[#C81E1E] text-white'
                    : 'bg-[#FAFAF9] text-slate-700 border border-[#E5E7EB] hover:bg-white'
                }`}
              >
                <span>{ed.shortLabel}</span>
              </button>
            ))}
          </div>

          {/* Active Edition Spotlight + Clean UI Screenshot Frame */}
          <div className="bg-[#FAFAF9] border border-[#E5E7EB] rounded-xl p-6 sm:p-8 grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            <div className="lg:col-span-7 space-y-5">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-white border border-[#E5E7EB] flex items-center justify-center shrink-0">
                  {activeIndustryObj.icon}
                </div>
                <div>
                  <div className="font-mono text-xs text-[#C81E1E] font-semibold tabular-nums">
                    Edition {activeIndustryObj.num} · Offline Windows + LAN
                  </div>
                  <h3 className="text-xl font-semibold text-slate-900">
                    {activeIndustryObj.title}
                  </h3>
                </div>
              </div>

              <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                {activeIndustryObj.description}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                {activeIndustryObj.highlights.map((feat, i) => (
                  <div
                    key={i}
                    className="bg-white border border-[#E5E7EB] rounded-lg p-3.5 flex items-start gap-2 text-xs sm:text-sm text-slate-700"
                  >
                    <Check className="w-4 h-4 text-[#C81E1E] shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>

              <button
                type="button"
                onClick={() => onOpenQuote(`Evonix Hisaab Pro — ${activeIndustryObj.title}`)}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[#C81E1E] hover:bg-[#A6171E] text-white font-semibold text-xs sm:text-sm transition-colors cursor-pointer whitespace-nowrap"
              >
                <span>Request {activeIndustryObj.shortLabel} Demo</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* Industry UI Screenshot Placeholder Frame */}
            <div className="lg:col-span-5 bg-white border border-[#E5E7EB] rounded-xl p-4 space-y-3">
              <div className="flex items-center justify-between text-xs border-b border-[#E5E7EB] pb-2.5">
                <span className="font-semibold text-slate-900">
                  {activeIndustryObj.screenshotSlot}
                </span>
                <span className="font-mono text-[11px] text-[#C81E1E]">UI Frame</span>
              </div>
              <div className="aspect-[16/10] w-full bg-[#FAFAF9] border border-dashed border-[#CBD5E1] rounded-lg flex flex-col items-center justify-center p-5 text-center space-y-1.5">
                <span className="text-xs font-semibold text-slate-800">
                  Drop Real Screenshot Here
                </span>
                <span className="font-mono text-[11px] text-slate-500">
                  {activeIndustryObj.screenshotSpec}
                </span>
              </div>
            </div>
          </div>

          {/* Complete 5-Edition Boxed Directory (All visible for scannability & SEO) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {INDUSTRY_EDITIONS.map((ed) => {
              const isSelected = activeIndustry === ed.id;
              return (
                <button
                  key={ed.id}
                  type="button"
                  onClick={() => setActiveIndustry(ed.id)}
                  className={`text-left rounded-xl p-5 border transition-colors cursor-pointer flex flex-col justify-between space-y-2.5 ${
                    isSelected
                      ? 'bg-white border-[#C81E1E]'
                      : 'bg-[#FAFAF9] border-[#E5E7EB] hover:bg-white'
                  }`}
                >
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-mono text-slate-400 tabular-nums">{ed.num}.</span>
                      {isSelected && (
                        <span className="font-mono text-[11px] font-semibold text-[#C81E1E]">
                          Active
                        </span>
                      )}
                    </div>
                    <h3 className="text-sm sm:text-base font-semibold text-slate-900">
                      {ed.title}
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed">{ed.description}</p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* =====================================================================
          BLOCK 4: MIGRATION, FBR TIER-1 POS & HARDWARE + SOFTWARE MODULES
         ===================================================================== */}
      <section className="py-16 sm:py-20 bg-[#FAFAF9] border-b border-[#E5E7EB]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 text-left">
          <div className="space-y-8">
            <div className="max-w-3xl space-y-2.5">
              <p className="text-xs font-semibold text-[#C81E1E]">
                06 · Zero-Loss Migration, FBR Tier-1 &amp; Hardware
              </p>
              <h2 className="text-2xl sm:text-3xl font-semibold text-slate-900 tracking-tight">
                Excel &amp; Register Migration, FBR Tier-1 POS &amp; Pre-Configured Hardware
              </h2>
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                Move off manual notebooks without losing a single SKU or customer udhaar balance—paired with FBR Tier-1 POS integration and ready-to-print 58mm/80mm hardware.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {MIGRATION_HARDWARE_ITEMS.map((item) => (
                <div
                  key={item.num}
                  className="bg-white border border-[#E5E7EB] rounded-xl p-6 space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 rounded-lg bg-[#FAFAF9] border border-[#E5E7EB] flex items-center justify-center">
                      {item.icon}
                    </div>
                    <span className="font-mono text-xs text-slate-400 tabular-nums">
                      {item.num}.
                    </span>
                  </div>
                  <h3 className="text-base font-semibold text-slate-900 leading-snug">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Core Software Modules */}
          <div className="pt-8 border-t border-[#E5E7EB] space-y-8">
            <div className="max-w-3xl space-y-2">
              <p className="text-xs font-semibold text-[#C81E1E]">07 · Core Software Modules</p>
              <h2 className="text-2xl sm:text-3xl font-semibold text-slate-900 tracking-tight">
                Unified Modules Inside One Offline Installation
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {SOFTWARE_MODULES.map((mod) => (
                <div
                  key={mod.num}
                  className="bg-white border border-[#E5E7EB] rounded-xl p-6 space-y-3.5"
                >
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 rounded-lg bg-[#FAFAF9] border border-[#E5E7EB] flex items-center justify-center">
                      {mod.icon}
                    </div>
                    <span className="font-mono text-xs text-slate-400 tabular-nums">
                      {mod.num}.
                    </span>
                  </div>
                  <h3 className="text-base sm:text-lg font-semibold text-slate-900">{mod.title}</h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {mod.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          TRANSPARENT PLANS
         ===================================================================== */}
      <section
        id="hisaab-pro-plans"
        className="py-16 sm:py-20 bg-white border-b border-[#E5E7EB]"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 text-left">
          <div className="max-w-3xl space-y-2.5">
            <p className="text-xs font-semibold text-[#C81E1E]">08 · Transparent Plans</p>
            <h2 className="text-2xl sm:text-3xl font-semibold text-slate-900 tracking-tight">
              Simple Offline Licensing for Every Shop Size
            </h2>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              Evaluate Evonix Hisaab Pro for 14 days on your own shop counter before choosing your single-shop, multi-branch, or custom ERP setup.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
            {PRICING_PLANS.map((plan) => (
              <div
                key={plan.id}
                className={`bg-[#FAFAF9] rounded-xl p-6 flex flex-col justify-between border ${
                  plan.featured ? 'border-[#C81E1E] bg-white' : 'border-[#E5E7EB]'
                }`}
              >
                <div className="space-y-4">
                  <div className="space-y-1">
                    <div className="font-mono text-xs text-slate-500 tabular-nums">
                      {plan.subtitle}
                    </div>
                    <h3 className="text-lg font-semibold text-slate-900 leading-snug">
                      {plan.tier}
                    </h3>
                  </div>

                  <div className="py-3 border-y border-[#E5E7EB] space-y-0.5">
                    <div className="font-mono text-2xl font-semibold text-slate-900 tabular-nums">
                      {plan.priceLabel}
                    </div>
                    <div className="font-mono text-xs text-slate-500">{plan.priceNote}</div>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {plan.description}
                  </p>

                  <ul className="space-y-2 text-xs text-slate-700 pt-1">
                    {plan.features.map((feat, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <Check className="w-3.5 h-3.5 text-[#C81E1E] shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-6 mt-6 border-t border-[#E5E7EB]">
                  <button
                    type="button"
                    onClick={() => onOpenQuote(`Evonix Hisaab Pro — ${plan.tier}`)}
                    className={`w-full py-2.5 px-4 rounded-lg font-semibold text-xs sm:text-sm transition-colors cursor-pointer ${
                      plan.featured
                        ? 'bg-[#C81E1E] hover:bg-[#A6171E] text-white'
                        : 'bg-white hover:bg-slate-50 text-slate-900 border border-[#E5E7EB]'
                    }`}
                  >
                    {plan.ctaLabel}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================================
          BLOCK 5: FAQ ACCORDION WITH FAQPAGE JSON-LD SCHEMA
         ===================================================================== */}
      <section className="py-16 sm:py-20 bg-[#FAFAF9] border-b border-[#E5E7EB]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 text-left">
          <div className="space-y-2.5">
            <p className="text-xs font-semibold text-[#C81E1E]">
              09 · Frequently Asked Questions
            </p>
            <h2 className="text-2xl sm:text-3xl font-semibold text-slate-900 tracking-tight">
              Offline POS, Digital Khata &amp; Retail Software Pakistan FAQs
            </h2>
          </div>

          <div className="divide-y divide-[#E5E7EB] border border-[#E5E7EB] rounded-xl bg-white overflow-hidden">
            {HISAAB_PRO_FAQS.map((faq, idx) => {
              const isOpen = openFaqIdx === idx;
              return (
                <div key={idx} className="bg-white">
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    onClick={() => setOpenFaqIdx(isOpen ? null : idx)}
                    className="w-full px-5 sm:px-6 py-4 flex items-center justify-between gap-4 text-left hover:bg-[#FAFAF9] transition-colors cursor-pointer"
                  >
                    <div className="flex items-start gap-3">
                      <span className="font-mono text-xs text-slate-400 tabular-nums mt-1 shrink-0">
                        0{idx + 1}.
                      </span>
                      <span className="text-sm sm:text-base font-semibold text-slate-900">
                        {faq.question}
                      </span>
                    </div>
                    <ChevronDown
                      className={`w-4 h-4 text-slate-500 shrink-0 transition-transform duration-200 ${
                        isOpen ? 'rotate-180 text-[#C81E1E]' : ''
                      }`}
                    />
                  </button>

                  {isOpen && (
                    <div className="px-5 sm:px-6 pb-5 pt-1 pl-12 sm:pl-14 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-[#E5E7EB]/60 bg-[#FAFAF9]/50">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
};

export default EvonixHisaabProSection;
