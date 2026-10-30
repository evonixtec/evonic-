import fs from 'fs';
import path from 'path';
import { B2B_BLOGS, HARDWARE_STORE_BLOGS } from '../src/data/blogs';
import { LOCAL_CITIES } from '../src/data/localClusters';

const DOMAIN_MAIN = 'https://www.evonixtec.com';
const DOMAIN_TOOLS = 'https://tools.evonixtec.com';
const DOMAIN_STORE = 'https://store.evonixtec.com';

// Current standardized UTC ISO timestamp for search engines
const CURRENT_TIMESTAMP = '2026-10-30T09:20:00+00:00';
const TODAY = '2026-10-30';

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
    <lastmod>${r.lastmod || CURRENT_TIMESTAMP}</lastmod>
    <changefreq>${r.changefreq}</changefreq>
    <priority>${r.priority}</priority>
  </url>`
  )
  .join('\n')}
</urlset>
`.trim() + '\n';
}

// ==========================================
// 1. SITEMAP 1: www.evonixtec.com (Main Enterprise B2B Agency)
// Strictly NO hardware, repair, shop, or doorstep support URLs.
// ==========================================
const mainCoreRoutes = [
  { loc: `${DOMAIN_MAIN}/`, changefreq: 'daily', priority: '1.0', lastmod: CURRENT_TIMESTAMP },
  { loc: `${DOMAIN_MAIN}/installation-guide`, changefreq: 'weekly', priority: '0.85', lastmod: CURRENT_TIMESTAMP },
  { loc: `${DOMAIN_MAIN}/schema-generator`, changefreq: 'weekly', priority: '0.95', lastmod: CURRENT_TIMESTAMP },
  { loc: `${DOMAIN_MAIN}/hs-code-lookup`, changefreq: 'weekly', priority: '0.95', lastmod: CURRENT_TIMESTAMP },
  { loc: `${DOMAIN_MAIN}/services`, changefreq: 'daily', priority: '0.95', lastmod: CURRENT_TIMESTAMP },
  { loc: `${DOMAIN_MAIN}/services/web-development`, changefreq: 'weekly', priority: '0.90', lastmod: CURRENT_TIMESTAMP },
  { loc: `${DOMAIN_MAIN}/services/software-pos`, changefreq: 'weekly', priority: '0.90', lastmod: CURRENT_TIMESTAMP },
  { loc: `${DOMAIN_MAIN}/portfolio`, changefreq: 'weekly', priority: '0.85', lastmod: CURRENT_TIMESTAMP },
  { loc: `${DOMAIN_MAIN}/portfolio/websites`, changefreq: 'monthly', priority: '0.80', lastmod: CURRENT_TIMESTAMP },
  { loc: `${DOMAIN_MAIN}/portfolio/software`, changefreq: 'monthly', priority: '0.80', lastmod: CURRENT_TIMESTAMP },
  { loc: `${DOMAIN_MAIN}/sialkot-export-erp`, changefreq: 'weekly', priority: '0.90', lastmod: CURRENT_TIMESTAMP },
  { loc: `${DOMAIN_MAIN}/guidelines`, changefreq: 'weekly', priority: '0.85', lastmod: CURRENT_TIMESTAMP },
  { loc: `${DOMAIN_MAIN}/guides`, changefreq: 'daily', priority: '0.90', lastmod: CURRENT_TIMESTAMP },
  { loc: `${DOMAIN_MAIN}/about`, changefreq: 'weekly', priority: '0.85', lastmod: CURRENT_TIMESTAMP },
  { loc: `${DOMAIN_MAIN}/contact`, changefreq: 'daily', priority: '0.90', lastmod: CURRENT_TIMESTAMP },
  { loc: `${DOMAIN_MAIN}/locations`, changefreq: 'daily', priority: '0.95', lastmod: CURRENT_TIMESTAMP },
];

const citySlugs = Object.keys(LOCAL_CITIES) as (keyof typeof LOCAL_CITIES)[];
// Restrict location services strictly to enterprise software, web engineering, and POS
const enterpriseLocationServices = ['it-consultancy', 'web-development', 'pos-systems'];

const mainLocationRoutes: { loc: string; changefreq: string; priority: string; lastmod: string }[] = [];

citySlugs.forEach((city) => {
  mainLocationRoutes.push({
    loc: `${DOMAIN_MAIN}/locations/${city}`,
    changefreq: 'weekly',
    priority: '0.85',
    lastmod: CURRENT_TIMESTAMP,
  });
});

citySlugs.forEach((city) => {
  enterpriseLocationServices.forEach((service) => {
    mainLocationRoutes.push({
      loc: `${DOMAIN_MAIN}/locations/${city}/${service}`,
      changefreq: 'weekly',
      priority: '0.80',
      lastmod: CURRENT_TIMESTAMP,
    });
  });
});

const policyRoutes = [
  { loc: `${DOMAIN_MAIN}/privacy-policy`, changefreq: 'monthly', priority: '0.5', lastmod: CURRENT_TIMESTAMP },
  { loc: `${DOMAIN_MAIN}/terms-and-conditions`, changefreq: 'monthly', priority: '0.5', lastmod: CURRENT_TIMESTAMP },
  { loc: `${DOMAIN_MAIN}/warranty-policy`, changefreq: 'monthly', priority: '0.5', lastmod: CURRENT_TIMESTAMP },
  { loc: `${DOMAIN_MAIN}/mobile-policy`, changefreq: 'monthly', priority: '0.5', lastmod: CURRENT_TIMESTAMP },
  { loc: `${DOMAIN_MAIN}/data-safety`, changefreq: 'monthly', priority: '0.5', lastmod: CURRENT_TIMESTAMP },
];

// Only B2B software, export ERP, and AI engineering blogs
const mainBlogRoutes = B2B_BLOGS.map((blog) => ({
  loc: `${DOMAIN_MAIN}/blog/${blog.slug}`,
  lastmod: CURRENT_TIMESTAMP,
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
  { loc: `${DOMAIN_TOOLS}/`, changefreq: 'daily', priority: '1.0', lastmod: CURRENT_TIMESTAMP },
  { loc: `${DOMAIN_TOOLS}/schema-generator`, changefreq: 'daily', priority: '0.95', lastmod: CURRENT_TIMESTAMP },
  { loc: `${DOMAIN_TOOLS}/hs-code-lookup`, changefreq: 'daily', priority: '0.95', lastmod: CURRENT_TIMESTAMP },
  { loc: `${DOMAIN_TOOLS}/ecommerce-calculator`, changefreq: 'daily', priority: '0.95', lastmod: CURRENT_TIMESTAMP },
  { loc: `${DOMAIN_TOOLS}/cbm-calculator`, changefreq: 'daily', priority: '0.95', lastmod: CURRENT_TIMESTAMP },
  { loc: `${DOMAIN_TOOLS}/ebay-fee-calculator`, changefreq: 'daily', priority: '0.95', lastmod: CURRENT_TIMESTAMP },
  { loc: `${DOMAIN_TOOLS}/tiktok-shop-fee-calculator`, changefreq: 'daily', priority: '0.95', lastmod: CURRENT_TIMESTAMP },
  { loc: `${DOMAIN_TOOLS}/amazon-fba-fee-calculator`, changefreq: 'daily', priority: '0.95', lastmod: CURRENT_TIMESTAMP },
  { loc: `${DOMAIN_TOOLS}/shopify-fee-calculator`, changefreq: 'daily', priority: '0.95', lastmod: CURRENT_TIMESTAMP },
  { loc: `${DOMAIN_TOOLS}/etsy-fee-calculator`, changefreq: 'daily', priority: '0.95', lastmod: CURRENT_TIMESTAMP },
  { loc: `${DOMAIN_TOOLS}/amazon-fbm-calculator`, changefreq: 'daily', priority: '0.95', lastmod: CURRENT_TIMESTAMP },
  { loc: `${DOMAIN_TOOLS}/stripe-fee-calculator`, changefreq: 'daily', priority: '0.95', lastmod: CURRENT_TIMESTAMP },
  { loc: `${DOMAIN_TOOLS}/temu-seller-calculator`, changefreq: 'daily', priority: '0.95', lastmod: CURRENT_TIMESTAMP },
  { loc: `${DOMAIN_TOOLS}/developer-cost-calculator`, changefreq: 'daily', priority: '0.95', lastmod: CURRENT_TIMESTAMP },
  { loc: `${DOMAIN_TOOLS}/trend-intelligence-suite`, changefreq: 'daily', priority: '0.95', lastmod: CURRENT_TIMESTAMP },
  { loc: `${DOMAIN_TOOLS}/invoice`, changefreq: 'daily', priority: '0.95', lastmod: CURRENT_TIMESTAMP },
  { loc: `${DOMAIN_TOOLS}/tools/micro-invoice-generator`, changefreq: 'daily', priority: '0.90', lastmod: CURRENT_TIMESTAMP },
  { loc: `${DOMAIN_TOOLS}/export-barcode-studio`, changefreq: 'daily', priority: '0.95', lastmod: CURRENT_TIMESTAMP },
  { loc: `${DOMAIN_TOOLS}/uk-eu-vat-calculator`, changefreq: 'daily', priority: '0.90', lastmod: CURRENT_TIMESTAMP },
  { loc: `${DOMAIN_TOOLS}/us-duty-nexus-estimator`, changefreq: 'daily', priority: '0.90', lastmod: CURRENT_TIMESTAMP },
  { loc: `${DOMAIN_TOOLS}/ce-ukca-compliance`, changefreq: 'daily', priority: '0.90', lastmod: CURRENT_TIMESTAMP },
  { loc: `${DOMAIN_TOOLS}/ai-visibility-checker`, changefreq: 'daily', priority: '0.90', lastmod: CURRENT_TIMESTAMP },
  { loc: `${DOMAIN_TOOLS}/tools/ai-trip-planner`, changefreq: 'daily', priority: '0.90', lastmod: CURRENT_TIMESTAMP },
  { loc: `${DOMAIN_TOOLS}/ai-tools-name-for-travel-itinerary`, changefreq: 'daily', priority: '0.90', lastmod: CURRENT_TIMESTAMP },
  { loc: `${DOMAIN_TOOLS}/installation-guide`, changefreq: 'weekly', priority: '0.85', lastmod: CURRENT_TIMESTAMP },
  { loc: `${DOMAIN_TOOLS}/factory-network-tester`, changefreq: 'weekly', priority: '0.85', lastmod: CURRENT_TIMESTAMP },
];

// ==========================================
// 3. SITEMAP 3: store.evonixtec.com (Hardware, POS Terminals, Printers, Repair)
// ==========================================
const storeRoutes = [
  { loc: `${DOMAIN_STORE}/`, changefreq: 'daily', priority: '1.0', lastmod: CURRENT_TIMESTAMP },
  { loc: `${DOMAIN_STORE}/pos-terminals`, changefreq: 'weekly', priority: '0.90', lastmod: CURRENT_TIMESTAMP },
  { loc: `${DOMAIN_STORE}/printers`, changefreq: 'weekly', priority: '0.90', lastmod: CURRENT_TIMESTAMP },
  { loc: `${DOMAIN_STORE}/laptops`, changefreq: 'weekly', priority: '0.90', lastmod: CURRENT_TIMESTAMP },
  { loc: `${DOMAIN_STORE}/hardware-repair`, changefreq: 'weekly', priority: '0.90', lastmod: CURRENT_TIMESTAMP },
  { loc: `${DOMAIN_STORE}/services/doorstep-support`, changefreq: 'weekly', priority: '0.90', lastmod: CURRENT_TIMESTAMP },
  { loc: `${DOMAIN_STORE}/laptop-repairing-sialkot`, changefreq: 'weekly', priority: '0.90', lastmod: CURRENT_TIMESTAMP },
  { loc: `${DOMAIN_STORE}/live-repair-tracker`, changefreq: 'daily', priority: '0.85', lastmod: CURRENT_TIMESTAMP },
  { loc: `${DOMAIN_STORE}/bench-intake-pass`, changefreq: 'weekly', priority: '0.85', lastmod: CURRENT_TIMESTAMP },
  { loc: `${DOMAIN_STORE}/printer-troubleshooter`, changefreq: 'weekly', priority: '0.85', lastmod: CURRENT_TIMESTAMP },
  { loc: `${DOMAIN_STORE}/thermal-hotspot-inspector`, changefreq: 'weekly', priority: '0.85', lastmod: CURRENT_TIMESTAMP },
  ...HARDWARE_STORE_BLOGS.map((blog) => ({
    loc: `${DOMAIN_STORE}/blog/${blog.slug}`,
    lastmod: CURRENT_TIMESTAMP,
    changefreq: 'weekly',
    priority: '0.80',
  })),
];

// Write sitemaps directly into public/
const publicDir = path.resolve(process.cwd(), 'public');
fs.writeFileSync(path.join(publicDir, 'sitemap.xml'), buildSitemapXml(allMainRoutes));
fs.writeFileSync(path.join(publicDir, 'sitemap-tools.xml'), buildSitemapXml(toolsRoutes));
fs.writeFileSync(path.join(publicDir, 'sitemap-store.xml'), buildSitemapXml(storeRoutes));

console.log(`Generated:
  - public/sitemap.xml (${allMainRoutes.length} URLs for ${DOMAIN_MAIN})
  - public/sitemap-tools.xml (${toolsRoutes.length} URLs for ${DOMAIN_TOOLS})
  - public/sitemap-store.xml (${storeRoutes.length} URLs for ${DOMAIN_STORE})
Date: ${TODAY} (${CURRENT_TIMESTAMP})`);
