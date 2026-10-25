import fs from 'fs';
import path from 'path';
import { ALL_BLOGS } from '../src/data/blogs';
import { LOCAL_CITIES, CLUSTER_SERVICES } from '../src/data/localClusters';

const DOMAIN_MAIN = 'https://evonixtec.com';
const DOMAIN_TOOLS = 'https://tools.evonixtec.com';
const DOMAIN_STORE = 'https://store.evonixtec.com';
const TODAY = new Date().toISOString().split('T')[0];
const DEFAULT_LASTMOD = '2026-10-25T10:00:00+00:00';

function formatLastmod(dateStr?: string): string {
  if (!dateStr) return DEFAULT_LASTMOD;
  if (/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/.test(dateStr)) {
    return dateStr.includes('+') ? dateStr : `${dateStr}+00:00`;
  }
  if (/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) {
    return `${dateStr}T10:00:00+00:00`;
  }
  const parsed = new Date(dateStr);
  if (!isNaN(parsed.getTime())) {
    const yyyy = parsed.getFullYear();
    const mm = String(parsed.getMonth() + 1).padStart(2, '0');
    const dd = String(parsed.getDate()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd}T10:00:00+00:00`;
  }
  return DEFAULT_LASTMOD;
}

function buildSitemapXml(urls: { loc: string; lastmod?: string; changefreq: string; priority: string }[]): string {
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
        http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
${urls
  .map(
    (r) => `  <url>
    <loc>${r.loc}</loc>
    <lastmod>${r.lastmod || DEFAULT_LASTMOD}</lastmod>
    <changefreq>${r.changefreq}</changefreq>
    <priority>${r.priority}</priority>
  </url>`
  )
  .join('\n')}
</urlset>
`.trim() + '\n';
}

// ==========================================
// 1. SITEMAP 1: evonixtec.com (Main Agency)
// ==========================================
const mainCoreRoutes = [
  { loc: `${DOMAIN_MAIN}/`, changefreq: 'daily', priority: '1.0' },
  { loc: `${DOMAIN_MAIN}/services`, changefreq: 'daily', priority: '0.95' },
  { loc: `${DOMAIN_MAIN}/services/web-development`, changefreq: 'weekly', priority: '0.90' },
  { loc: `${DOMAIN_MAIN}/services/software-pos`, changefreq: 'weekly', priority: '0.90' },
  { loc: `${DOMAIN_MAIN}/services/doorstep-support`, changefreq: 'weekly', priority: '0.85' },
  { loc: `${DOMAIN_MAIN}/portfolio`, changefreq: 'weekly', priority: '0.85' },
  { loc: `${DOMAIN_MAIN}/portfolio/websites`, changefreq: 'monthly', priority: '0.80' },
  { loc: `${DOMAIN_MAIN}/portfolio/software`, changefreq: 'monthly', priority: '0.80' },
  { loc: `${DOMAIN_MAIN}/sialkot-export-erp`, changefreq: 'weekly', priority: '0.90' },
  { loc: `${DOMAIN_MAIN}/guidelines`, changefreq: 'weekly', priority: '0.85' },
  { loc: `${DOMAIN_MAIN}/guides`, changefreq: 'daily', priority: '0.90' },
  { loc: `${DOMAIN_MAIN}/about`, changefreq: 'weekly', priority: '0.85' },
  { loc: `${DOMAIN_MAIN}/contact`, changefreq: 'daily', priority: '0.90' },
  { loc: `${DOMAIN_MAIN}/locations`, changefreq: 'daily', priority: '0.95' },
];

const citySlugs = Object.keys(LOCAL_CITIES) as (keyof typeof LOCAL_CITIES)[];
const serviceSlugs = Object.keys(CLUSTER_SERVICES) as (keyof typeof CLUSTER_SERVICES)[];
const mainLocationRoutes: { loc: string; changefreq: string; priority: string }[] = [];

citySlugs.forEach((city) => {
  mainLocationRoutes.push({
    loc: `${DOMAIN_MAIN}/locations/${city}`,
    changefreq: 'weekly',
    priority: '0.85',
  });
});

citySlugs.forEach((city) => {
  serviceSlugs.forEach((service) => {
    mainLocationRoutes.push({
      loc: `${DOMAIN_MAIN}/locations/${city}/${service}`,
      changefreq: 'weekly',
      priority: '0.80',
    });
  });
});

const policyRoutes = [
  { loc: `${DOMAIN_MAIN}/privacy-policy`, changefreq: 'monthly', priority: '0.5' },
  { loc: `${DOMAIN_MAIN}/terms-and-conditions`, changefreq: 'monthly', priority: '0.5' },
  { loc: `${DOMAIN_MAIN}/warranty-policy`, changefreq: 'monthly', priority: '0.5' },
  { loc: `${DOMAIN_MAIN}/mobile-policy`, changefreq: 'monthly', priority: '0.5' },
  { loc: `${DOMAIN_MAIN}/data-safety`, changefreq: 'monthly', priority: '0.5' },
];

const mainBlogRoutes = ALL_BLOGS.map((blog) => ({
  loc: `${DOMAIN_MAIN}/blog/${blog.slug}`,
  lastmod: formatLastmod(blog.publishedDate),
  changefreq: 'weekly',
  priority: '0.80',
}));

const allMainRoutes = [
  ...mainCoreRoutes,
  ...mainLocationRoutes,
  ...policyRoutes,
  ...mainBlogRoutes,
];

// ==========================================
// 2. SITEMAP 2: tools.evonixtec.com (Tools)
// ==========================================
const toolsRoutes = [
  { loc: `${DOMAIN_TOOLS}/`, changefreq: 'daily', priority: '1.0' },
  { loc: `${DOMAIN_TOOLS}/ecommerce-calculator`, changefreq: 'daily', priority: '0.95' },
  { loc: `${DOMAIN_TOOLS}/cbm-calculator`, changefreq: 'daily', priority: '0.95' },
  { loc: `${DOMAIN_TOOLS}/ebay-fee-calculator`, changefreq: 'daily', priority: '0.95' },
  { loc: `${DOMAIN_TOOLS}/tiktok-shop-fee-calculator`, changefreq: 'daily', priority: '0.95' },
  { loc: `${DOMAIN_TOOLS}/amazon-fba-fee-calculator`, changefreq: 'daily', priority: '0.95' },
  { loc: `${DOMAIN_TOOLS}/shopify-fee-calculator`, changefreq: 'daily', priority: '0.95' },
  { loc: `${DOMAIN_TOOLS}/etsy-fee-calculator`, changefreq: 'daily', priority: '0.95' },
  { loc: `${DOMAIN_TOOLS}/amazon-fbm-calculator`, changefreq: 'daily', priority: '0.95' },
  { loc: `${DOMAIN_TOOLS}/stripe-fee-calculator`, changefreq: 'daily', priority: '0.95' },
  { loc: `${DOMAIN_TOOLS}/temu-seller-calculator`, changefreq: 'daily', priority: '0.95' },
  { loc: `${DOMAIN_TOOLS}/developer-cost-calculator`, changefreq: 'daily', priority: '0.95' },
  { loc: `${DOMAIN_TOOLS}/trend-intelligence-suite`, changefreq: 'daily', priority: '0.95' },
  { loc: `${DOMAIN_TOOLS}/invoice`, changefreq: 'daily', priority: '0.95' },
  { loc: `${DOMAIN_TOOLS}/tools/micro-invoice-generator`, changefreq: 'daily', priority: '0.90' },
  { loc: `${DOMAIN_TOOLS}/export-barcode-studio`, changefreq: 'daily', priority: '0.95' },
  { loc: `${DOMAIN_TOOLS}/uk-eu-vat-calculator`, changefreq: 'daily', priority: '0.90' },
  { loc: `${DOMAIN_TOOLS}/us-duty-nexus-estimator`, changefreq: 'daily', priority: '0.90' },
  { loc: `${DOMAIN_TOOLS}/ce-ukca-compliance`, changefreq: 'daily', priority: '0.90' },
  { loc: `${DOMAIN_TOOLS}/ai-visibility-checker`, changefreq: 'daily', priority: '0.90' },
  { loc: `${DOMAIN_TOOLS}/tools/ai-trip-planner`, changefreq: 'daily', priority: '0.90' },
  { loc: `${DOMAIN_TOOLS}/ai-tools-name-for-travel-itinerary`, changefreq: 'daily', priority: '0.90' },
  { loc: `${DOMAIN_TOOLS}/installation-guide`, changefreq: 'weekly', priority: '0.85' },
  { loc: `${DOMAIN_TOOLS}/factory-network-tester`, changefreq: 'weekly', priority: '0.85' },
];

// ==========================================
// 3. SITEMAP 3: store.evonixtec.com (Store)
// ==========================================
const storeRoutes = [
  { loc: `${DOMAIN_STORE}/`, changefreq: 'daily', priority: '1.0' },
  { loc: `${DOMAIN_STORE}/pos-terminals`, changefreq: 'weekly', priority: '0.90' },
  { loc: `${DOMAIN_STORE}/printers`, changefreq: 'weekly', priority: '0.90' },
  { loc: `${DOMAIN_STORE}/laptops`, changefreq: 'weekly', priority: '0.90' },
  { loc: `${DOMAIN_STORE}/hardware-repair`, changefreq: 'weekly', priority: '0.90' },
  { loc: `${DOMAIN_STORE}/laptop-repairing-sialkot`, changefreq: 'weekly', priority: '0.90' },
  { loc: `${DOMAIN_STORE}/live-repair-tracker`, changefreq: 'daily', priority: '0.85' },
  { loc: `${DOMAIN_STORE}/bench-intake-pass`, changefreq: 'weekly', priority: '0.85' },
  { loc: `${DOMAIN_STORE}/printer-troubleshooter`, changefreq: 'weekly', priority: '0.85' },
  { loc: `${DOMAIN_STORE}/thermal-hotspot-inspector`, changefreq: 'weekly', priority: '0.85' },
];

// Write sitemaps
const publicDir = path.resolve(process.cwd(), 'public');
fs.writeFileSync(path.join(publicDir, 'sitemap.xml'), buildSitemapXml(allMainRoutes));
fs.writeFileSync(path.join(publicDir, 'sitemap-tools.xml'), buildSitemapXml(toolsRoutes));
fs.writeFileSync(path.join(publicDir, 'sitemap-store.xml'), buildSitemapXml(storeRoutes));

console.log(`Generated:
  - public/sitemap.xml (${allMainRoutes.length} URLs for evonixtec.com)
  - public/sitemap-tools.xml (${toolsRoutes.length} URLs for tools.evonixtec.com)
  - public/sitemap-store.xml (${storeRoutes.length} URLs for store.evonixtec.com)
Date: ${TODAY}`);
