import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const portfolioDir = path.resolve(process.cwd(), 'src/assets/images/portfolio');
const shopDir = path.resolve(process.cwd(), 'src/assets/images/shop');

if (!fs.existsSync(portfolioDir)) fs.mkdirSync(portfolioDir, { recursive: true });
if (!fs.existsSync(shopDir)) fs.mkdirSync(shopDir, { recursive: true });

interface AssetDef {
  name: string;
  title: string;
  subtitle: string;
  badge: string;
  accentColor: string;
  bgGradient: [string, string];
  iconSvg: string;
  type: 'portfolio' | 'shop';
}

const assets: AssetDef[] = [
  // Portfolio
  {
    name: 'portfolio_ecommerce',
    type: 'portfolio',
    title: 'Luxury Retail & E-Commerce',
    subtitle: 'Multi-Currency Shopping Portal with Instant WhatsApp Checkout',
    badge: 'UAE Retail Standard',
    accentColor: '#dc2626',
    bgGradient: ['#0f172a', '#1e293b'],
    iconSvg: `<rect x="180" y="140" width="440" height="260" rx="16" fill="#1e293b" stroke="#334155" stroke-width="3"/>
      <rect x="200" y="160" width="400" height="40" rx="8" fill="#334155"/>
      <circle cx="225" cy="180" r="6" fill="#ef4444"/>
      <circle cx="245" cy="180" r="6" fill="#f59e0b"/>
      <circle cx="265" cy="180" r="6" fill="#10b981"/>
      <rect x="200" y="220" width="120" height="150" rx="8" fill="#0f172a" stroke="#475569"/>
      <rect x="340" y="220" width="120" height="150" rx="8" fill="#0f172a" stroke="#475569"/>
      <rect x="480" y="220" width="120" height="150" rx="8" fill="#0f172a" stroke="#475569"/>
      <text x="215" y="340" fill="#94a3b8" font-family="sans-serif" font-size="14" font-weight="bold">AED 450</text>
      <text x="355" y="340" fill="#94a3b8" font-family="sans-serif" font-size="14" font-weight="bold">AED 890</text>
      <text x="495" y="340" fill="#94a3b8" font-family="sans-serif" font-size="14" font-weight="bold">AED 1,200</text>`
  },
  {
    name: 'portfolio_realestate',
    type: 'portfolio',
    title: 'Dubai Prime Real Estate Portal',
    subtitle: 'Off-Plan Towers, Interactive Floor Plans & Direct CRM Sync',
    badge: 'Luxury Property Suite',
    accentColor: '#2563eb',
    bgGradient: ['#090d16', '#172554'],
    iconSvg: `<rect x="180" y="130" width="440" height="280" rx="16" fill="#0f172a" stroke="#1d4ed8" stroke-width="2"/>
      <path d="M 220 370 L 220 220 L 300 170 L 380 220 L 380 370 Z" fill="#1e293b" stroke="#3b82f6" stroke-width="2"/>
      <path d="M 400 370 L 400 190 L 520 190 L 520 370 Z" fill="#1e293b" stroke="#60a5fa" stroke-width="2"/>
      <rect x="250" y="240" width="20" height="25" fill="#93c5fd" opacity="0.8"/>
      <rect x="290" y="240" width="20" height="25" fill="#93c5fd" opacity="0.8"/>
      <rect x="250" y="280" width="20" height="25" fill="#93c5fd" opacity="0.8"/>
      <rect x="290" y="280" width="20" height="25" fill="#93c5fd" opacity="0.8"/>
      <rect x="430" y="220" width="25" height="25" fill="#bfdbfe" opacity="0.9"/>
      <rect x="475" y="220" width="25" height="25" fill="#bfdbfe" opacity="0.9"/>
      <rect x="430" y="260" width="25" height="25" fill="#bfdbfe" opacity="0.9"/>
      <rect x="475" y="260" width="25" height="25" fill="#bfdbfe" opacity="0.9"/>`
  },
  {
    name: 'portfolio_corporate',
    type: 'portfolio',
    title: 'International B2B Trading Portal',
    subtitle: 'Global Supply Chain Architecture, RFQ Engines & Portals',
    badge: 'Enterprise Trade',
    accentColor: '#059669',
    bgGradient: ['#062017', '#064e3b'],
    iconSvg: `<rect x="180" y="140" width="440" height="260" rx="16" fill="#042f2e" stroke="#10b981" stroke-width="2"/>
      <circle cx="400" cy="270" r="80" fill="none" stroke="#34d399" stroke-width="2" stroke-dasharray="6 6"/>
      <ellipse cx="400" cy="270" rx="80" ry="35" fill="none" stroke="#6ee7b7" stroke-width="1.5"/>
      <line x1="320" y1="270" x2="480" y2="270" stroke="#34d399" stroke-width="2"/>
      <line x1="400" y1="190" x2="400" y2="350" stroke="#34d399" stroke-width="2"/>
      <circle cx="360" cy="250" r="5" fill="#ef4444"/>
      <circle cx="440" cy="290" r="5" fill="#10b981"/>
      <path d="M 360 250 Q 400 220 440 290" fill="none" stroke="#f59e0b" stroke-width="3" stroke-dasharray="4 4"/>`
  },
  {
    name: 'portfolio_restaurant',
    type: 'portfolio',
    title: 'Smart Restaurant & QR Ordering',
    subtitle: 'Direct Kitchen KDS Dispatch & Table Reservation Flow',
    badge: 'Hospitality Tech',
    accentColor: '#d97706',
    bgGradient: ['#1c1917', '#451a03'],
    iconSvg: `<rect x="220" y="140" width="360" height="260" rx="20" fill="#292524" stroke="#f59e0b" stroke-width="2"/>
      <circle cx="400" cy="230" r="45" fill="#44403c" stroke="#fbbf24" stroke-width="2"/>
      <path d="M 385 220 L 385 245 M 400 215 L 400 245 M 415 220 L 415 245" stroke="#fef3c7" stroke-width="3" stroke-linecap="round"/>
      <path d="M 380 245 C 380 255 420 255 420 245" fill="none" stroke="#fef3c7" stroke-width="3"/>
      <rect x="270" y="300" width="260" height="24" rx="6" fill="#f59e0b"/>
      <text x="295" y="316" fill="#1c1917" font-family="sans-serif" font-size="12" font-weight="bold">ORDER ONLINE • TABLE 07</text>`
  },
  {
    name: 'portfolio_pos_retail',
    type: 'portfolio',
    title: 'Supermarket POS & Multi-Store ERP',
    subtitle: 'Lightning-Fast Barcode Scanning & Real-Time Stock Analytics',
    badge: 'Dubai Proven POS',
    accentColor: '#e11d48',
    bgGradient: ['#18181b', '#27272a'],
    iconSvg: `<rect x="180" y="140" width="440" height="260" rx="14" fill="#09090b" stroke="#f43f5e" stroke-width="2"/>
      <rect x="200" y="160" width="260" height="220" rx="8" fill="#18181b" stroke="#3f3f46"/>
      <rect x="215" y="180" width="230" height="28" rx="4" fill="#27272a"/>
      <rect x="215" y="220" width="230" height="20" rx="4" fill="#27272a"/>
      <rect x="215" y="250" width="230" height="20" rx="4" fill="#27272a"/>
      <rect x="215" y="280" width="230" height="20" rx="4" fill="#27272a"/>
      <rect x="475" y="160" width="130" height="220" rx="8" fill="#18181b" stroke="#3f3f46"/>
      <text x="490" y="200" fill="#f43f5e" font-family="sans-serif" font-size="11" font-weight="bold">TOTAL</text>
      <text x="490" y="230" fill="#ffffff" font-family="sans-serif" font-size="18" font-weight="800">PKR 4,850</text>
      <rect x="490" y="320" width="100" height="35" rx="6" fill="#10b981"/>
      <text x="510" y="342" fill="#ffffff" font-family="sans-serif" font-size="12" font-weight="bold">PAID [F12]</text>`
  },
  {
    name: 'portfolio_restaurant_kds',
    type: 'portfolio',
    title: 'Kitchen Display System & Order Flow',
    subtitle: 'Synchronized Chef Display, Order Queue & Waiter Tablets',
    badge: 'Real-Time KDS',
    accentColor: '#0284c7',
    bgGradient: ['#0f172a', '#1e293b'],
    iconSvg: `<rect x="180" y="140" width="440" height="260" rx="14" fill="#0f172a" stroke="#0ea5e9" stroke-width="2"/>
      <rect x="200" y="160" width="125" height="220" rx="8" fill="#1e293b" stroke="#38bdf8"/>
      <rect x="338" y="160" width="125" height="220" rx="8" fill="#1e293b" stroke="#f59e0b"/>
      <rect x="475" y="160" width="125" height="220" rx="8" fill="#1e293b" stroke="#10b981"/>
      <text x="215" y="185" fill="#38bdf8" font-family="sans-serif" font-size="11" font-weight="bold">T-04 PREP</text>
      <text x="353" y="185" fill="#f59e0b" font-family="sans-serif" font-size="11" font-weight="bold">T-12 COOK</text>
      <text x="490" y="185" fill="#10b981" font-family="sans-serif" font-size="11" font-weight="bold">T-02 READY</text>`
  },
  {
    name: 'portfolio_mobile_repair',
    type: 'portfolio',
    title: 'Electronics & Repair Ticketing ERP',
    subtitle: 'IMEI Barcode Logging, Job Cards & SMS Status Updates',
    badge: 'Service ERP',
    accentColor: '#7c3aed',
    bgGradient: ['#1e1b4b', '#312e81'],
    iconSvg: `<rect x="200" y="140" width="400" height="260" rx="14" fill="#1e1b4b" stroke="#8b5cf6" stroke-width="2"/>
      <rect x="220" y="165" width="360" height="40" rx="8" fill="#312e81"/>
      <text x="240" y="190" fill="#a78bfa" font-family="sans-serif" font-size="12" font-weight="bold">JOB #EVX-8941 • MOTHERBOARD CHIP FIX</text>
      <rect x="220" y="220" width="170" height="155" rx="8" fill="#2e1065"/>
      <rect x="410" y="220" width="170" height="155" rx="8" fill="#2e1065"/>
      <text x="235" y="250" fill="#ddd6fe" font-family="sans-serif" font-size="11">IMEI: 3589410928</text>
      <text x="235" y="280" fill="#34d399" font-family="sans-serif" font-size="12" font-weight="bold">STATUS: DIAGNOSED</text>
      <text x="425" y="250" fill="#ddd6fe" font-family="sans-serif" font-size="11">PARTS: POWER IC</text>
      <text x="425" y="280" fill="#fbbf24" font-family="sans-serif" font-size="12" font-weight="bold">EST: READY TODAY</text>`
  },

  // Shop
  {
    name: 'shop_pos_touchscreen',
    type: 'shop',
    title: 'All-in-One POS Terminal System',
    subtitle: '15.6" Capacitive Touch with Dual Display & Fast SSD',
    badge: 'Commercial Grade POS',
    accentColor: '#dc2626',
    bgGradient: ['#0f172a', '#1e293b'],
    iconSvg: `<rect x="240" y="140" width="320" height="200" rx="12" fill="#020617" stroke="#dc2626" stroke-width="3"/>
      <rect x="260" y="160" width="280" height="160" rx="6" fill="#1e293b"/>
      <path d="M 370 340 L 370 380 L 430 380 L 430 340 Z" fill="#334155"/>
      <rect x="330" y="380" width="140" height="16" rx="4" fill="#1e293b" stroke="#475569"/>
      <circle cx="400" cy="240" r="30" fill="#dc2626" opacity="0.2"/>
      <path d="M 385 240 L 395 250 L 415 230" fill="none" stroke="#ef4444" stroke-width="4" stroke-linecap="round"/>`
  },
  {
    name: 'shop_thermal_printer',
    type: 'shop',
    title: '80mm High-Speed Receipt Printer',
    subtitle: 'Heavy-Duty Auto-Cutter with USB & LAN Networking',
    badge: '1.5M Cuts Lifespan',
    accentColor: '#2563eb',
    bgGradient: ['#0b1329', '#1e293b'],
    iconSvg: `<rect x="260" y="180" width="280" height="190" rx="16" fill="#0f172a" stroke="#3b82f6" stroke-width="3"/>
      <rect x="290" y="210" width="220" height="30" rx="6" fill="#1e293b" stroke="#60a5fa"/>
      <path d="M 320 210 L 320 150 L 460 150 L 460 210 Z" fill="#f8fafc" stroke="#cbd5e1" stroke-width="2"/>
      <line x1="340" y1="170" x2="440" y2="170" stroke="#94a3b8" stroke-width="2"/>
      <line x1="340" y1="185" x2="420" y2="185" stroke="#94a3b8" stroke-width="2"/>
      <circle cx="300" cy="320" r="10" fill="#10b981"/>
      <circle cx="330" cy="320" r="10" fill="#ef4444"/>`
  },
  {
    name: 'shop_barcode_scanner',
    type: 'shop',
    title: '2D & 1D Hands-Free Barcode Scanner',
    subtitle: 'High-Speed Omnidirectional Desktop Presentation Scanner',
    badge: 'QR & Digital Barcode Ready',
    accentColor: '#059669',
    bgGradient: ['#062017', '#064e3b'],
    iconSvg: `<path d="M 350 380 L 450 380 L 430 260 L 370 260 Z" fill="#064e3b" stroke="#10b981" stroke-width="2"/>
      <rect x="340" y="160" width="120" height="110" rx="20" fill="#042f2e" stroke="#34d399" stroke-width="3"/>
      <rect x="360" y="180" width="80" height="70" rx="10" fill="#022c22"/>
      <line x1="340" y1="215" x2="460" y2="215" stroke="#ef4444" stroke-width="4"/>
      <circle cx="400" cy="215" r="15" fill="#ef4444" opacity="0.3"/>`
  },
  {
    name: 'shop_business_laptop',
    type: 'shop',
    title: 'Dell / HP Business Series Laptop',
    subtitle: 'Intel Core i5/i7, 16GB RAM, Fast NVMe SSD & Grade-A Body',
    badge: 'UAE Corporate Import',
    accentColor: '#4f46e5',
    bgGradient: ['#1e1b4b', '#312e81'],
    iconSvg: `<rect x="250" y="150" width="300" height="190" rx="12" fill="#0f172a" stroke="#6366f1" stroke-width="3"/>
      <rect x="270" y="170" width="260" height="150" rx="6" fill="#1e1b4b"/>
      <path d="M 210 340 L 590 340 L 570 370 L 230 370 Z" fill="#312e81" stroke="#6366f1" stroke-width="2"/>
      <rect x="370" y="348" width="60" height="12" rx="3" fill="#4338ca"/>`
  },
  {
    name: 'shop_desktop_pc',
    type: 'shop',
    title: 'Custom POS & Office Desktop PC',
    subtitle: 'Reliable 24/7 Multi-Core Workstation for Accounting & Billing',
    badge: '24/7 Durability',
    accentColor: '#0891b2',
    bgGradient: ['#083344', '#155e75'],
    iconSvg: `<rect x="320" y="140" width="160" height="250" rx="14" fill="#082f49" stroke="#06b6d4" stroke-width="3"/>
      <circle cx="400" cy="180" r="16" fill="#0284c7"/>
      <rect x="350" y="220" width="100" height="10" rx="3" fill="#155e75"/>
      <rect x="350" y="245" width="100" height="10" rx="3" fill="#155e75"/>
      <circle cx="360" cy="350" r="6" fill="#10b981"/>
      <line x1="390" y1="350" x2="440" y2="350" stroke="#06b6d4" stroke-width="3"/>`
  },
  {
    name: 'shop_laser_printer',
    type: 'shop',
    title: 'HP / Canon Office Laser Printer',
    subtitle: 'Crisp Double-Sided Duplex Printing with Network Sharing',
    badge: 'High-Yield Paper Engine',
    accentColor: '#d97706',
    bgGradient: ['#1c1917', '#451a03'],
    iconSvg: `<rect x="250" y="190" width="300" height="170" rx="14" fill="#292524" stroke="#f59e0b" stroke-width="3"/>
      <path d="M 300 190 L 300 140 L 500 140 L 500 190 Z" fill="#f8fafc" stroke="#cbd5e1" stroke-width="2"/>
      <rect x="290" y="320" width="220" height="30" rx="6" fill="#1c1917" stroke="#78716c"/>
      <circle cx="280" cy="240" r="8" fill="#10b981"/>
      <circle cx="310" cy="240" r="8" fill="#3b82f6"/>`
  },
  {
    name: 'shop_nvme_ssd',
    type: 'shop',
    title: 'NVMe / SATA Solid State Drive (SSD)',
    subtitle: 'Up to 3,500 MB/s Read Speed with Free Data Migration',
    badge: '10x Speed Upgrade',
    accentColor: '#10b981',
    bgGradient: ['#022c22', '#064e3b'],
    iconSvg: `<rect x="260" y="190" width="280" height="100" rx="10" fill="#042f2e" stroke="#10b981" stroke-width="3"/>
      <rect x="490" y="210" width="40" height="60" rx="4" fill="#f59e0b"/>
      <rect x="300" y="215" width="70" height="50" rx="6" fill="#115e59"/>
      <rect x="390" y="215" width="70" height="50" rx="6" fill="#115e59"/>
      <text x="310" y="245" fill="#a7f3d0" font-family="sans-serif" font-size="12" font-weight="bold">NVMe</text>
      <text x="395" y="245" fill="#a7f3d0" font-family="sans-serif" font-size="12" font-weight="bold">3500MB/s</text>`
  },
  {
    name: 'shop_thermal_paper',
    type: 'shop',
    title: 'Premium Thermal Paper Rolls (80mm & 57mm)',
    subtitle: 'BPA-Free Pure White Rolls with High Black Contrast',
    badge: 'Wholesale Box Pack',
    accentColor: '#6366f1',
    bgGradient: ['#1e1b4b', '#312e81'],
    iconSvg: `<ellipse cx="330" cy="240" rx="50" ry="80" fill="#f8fafc" stroke="#cbd5e1" stroke-width="3"/>
      <ellipse cx="450" cy="240" rx="50" ry="80" fill="#f8fafc" stroke="#cbd5e1" stroke-width="3"/>
      <ellipse cx="330" cy="240" rx="16" ry="25" fill="#0f172a"/>
      <ellipse cx="450" cy="240" rx="16" ry="25" fill="#0f172a"/>
      <text x="315" y="370" fill="#c7d2fe" font-family="sans-serif" font-size="14" font-weight="bold">80x70mm &amp; 80x80mm</text>`
  }
];

function escapeXml(str: string): string {
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

function generateSvg(item: AssetDef): string {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 480" width="800" height="480">
  <defs>
    <linearGradient id="bg_${item.name}" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="${item.bgGradient[0]}" />
      <stop offset="100%" stop-color="${item.bgGradient[1]}" />
    </linearGradient>
  </defs>

  <!-- Background -->
  <rect width="800" height="480" fill="url(#bg_${item.name})" />

  <!-- Ambient Glow -->
  <circle cx="400" cy="240" r="220" fill="${item.accentColor}" opacity="0.12" />

  <!-- Center Graphic -->
  ${item.iconSvg}

  <!-- Header Badge -->
  <rect x="40" y="35" width="220" height="32" rx="16" fill="rgba(255,255,255,0.08)" stroke="${item.accentColor}" stroke-width="1.5" />
  <circle cx="56" cy="51" r="5" fill="${item.accentColor}" />
  <text x="70" y="56" fill="#f8fafc" font-family="sans-serif" font-size="12" font-weight="700">${escapeXml(item.badge.toUpperCase())}</text>

  <!-- Watermark Logo -->
  <text x="760" y="56" fill="rgba(255,255,255,0.4)" font-family="sans-serif" font-size="14" font-weight="800" text-anchor="end">EVONIX TECHNOLOGIES</text>

  <!-- Footer Information Strip -->
  <rect x="0" y="405" width="800" height="75" fill="rgba(15, 23, 42, 0.85)" />
  <line x1="0" y1="405" x2="800" y2="405" stroke="${item.accentColor}" stroke-width="2" opacity="0.8"/>
  <text x="40" y="435" fill="#ffffff" font-family="sans-serif" font-size="16" font-weight="700">${escapeXml(item.title)}</text>
  <text x="40" y="458" fill="#94a3b8" font-family="sans-serif" font-size="12">${escapeXml(item.subtitle)}</text>
  <text x="760" y="445" fill="${item.accentColor}" font-family="sans-serif" font-size="12" font-weight="700" text-anchor="end">DUBAI HERITAGE • SIALKOT</text>
</svg>`;
}

async function run() {
  console.log(`Generating ${assets.length} WebP and JPG assets via Sharp...`);

  for (const asset of assets) {
    const targetDir = asset.type === 'portfolio' ? portfolioDir : shopDir;
    const svgPath = path.join(targetDir, `${asset.name}.svg`);
    const webpPath = path.join(targetDir, `${asset.name}.webp`);
    const jpgPath = path.join(targetDir, `${asset.name}.jpg`);

    const svgContent = generateSvg(asset);
    fs.writeFileSync(svgPath, svgContent, 'utf-8');

    const svgBuffer = Buffer.from(svgContent);

    // Generate WebP
    await sharp(svgBuffer)
      .resize(800, 480)
      .webp({ quality: 85, effort: 6 })
      .toFile(webpPath);

    // Generate JPG fallback
    await sharp(svgBuffer)
      .resize(800, 480)
      .jpeg({ quality: 85 })
      .toFile(jpgPath);

    console.log(`✓ Generated WebP & JPG: ${asset.name}`);
  }

  console.log('All image assets successfully built and ready for lazy-loaded WebP delivery!');
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
