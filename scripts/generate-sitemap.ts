import fs from 'fs';
import path from 'path';
import { ALL_BLOGS } from '../src/data/blogs';
import { LOCAL_CITIES, CLUSTER_SERVICES } from '../src/data/localClusters';

const DOMAIN = 'https://www.evonixtec.com';
const TODAY = new Date().toISOString().split('T')[0];

// 1. Primary Core Canonical Landing Pages & Hubs
const coreRoutes = [
  { loc: `${DOMAIN}/`, changefreq: 'daily', priority: '1.0' },
  { loc: `${DOMAIN}/services`, changefreq: 'daily', priority: '0.95' },
  { loc: `${DOMAIN}/guides`, changefreq: 'daily', priority: '0.95' },
  { loc: `${DOMAIN}/portfolio`, changefreq: 'weekly', priority: '0.85' },
  { loc: `${DOMAIN}/shop`, changefreq: 'daily', priority: '0.90' },
  { loc: `${DOMAIN}/about`, changefreq: 'weekly', priority: '0.85' },
  { loc: `${DOMAIN}/contact`, changefreq: 'daily', priority: '0.90' },
  { loc: `${DOMAIN}/locations`, changefreq: 'daily', priority: '0.95' },
  { loc: `${DOMAIN}/invoice`, changefreq: 'daily', priority: '0.95' },
  { loc: `${DOMAIN}/tools/micro-invoice-generator`, changefreq: 'daily', priority: '0.95' },
  { loc: `${DOMAIN}/ecommerce-calculator`, changefreq: 'daily', priority: '0.95' },
  { loc: `${DOMAIN}/cbm-calculator`, changefreq: 'daily', priority: '0.95' },
  { loc: `${DOMAIN}/ebay-fee-calculator`, changefreq: 'daily', priority: '0.95' },
  { loc: `${DOMAIN}/tiktok-shop-fee-calculator`, changefreq: 'daily', priority: '0.95' },
  { loc: `${DOMAIN}/amazon-fba-fee-calculator`, changefreq: 'daily', priority: '0.95' },
  { loc: `${DOMAIN}/shopify-fee-calculator`, changefreq: 'daily', priority: '0.95' },
  { loc: `${DOMAIN}/etsy-fee-calculator`, changefreq: 'daily', priority: '0.95' },
  { loc: `${DOMAIN}/amazon-fbm-calculator`, changefreq: 'daily', priority: '0.95' },
  { loc: `${DOMAIN}/stripe-fee-calculator`, changefreq: 'daily', priority: '0.95' },
  { loc: `${DOMAIN}/temu-seller-calculator`, changefreq: 'daily', priority: '0.95' },
  { loc: `${DOMAIN}/trend-intelligence-suite`, changefreq: 'daily', priority: '0.95' },
  { loc: `${DOMAIN}/installation-guide`, changefreq: 'weekly', priority: '0.90' },
  { loc: `${DOMAIN}/ai-tools-name-for-travel-itinerary`, changefreq: 'daily', priority: '0.95' },
  { loc: `${DOMAIN}/tools/ai-trip-planner`, changefreq: 'daily', priority: '0.90' },
];

// 2. Sub-Category & Direct Landing Pages
const subCategoryRoutes = [
  { loc: `${DOMAIN}/services/web-development`, changefreq: 'weekly', priority: '0.9' },
  { loc: `${DOMAIN}/services/software-pos`, changefreq: 'weekly', priority: '0.9' },
  { loc: `${DOMAIN}/services/hardware-repair`, changefreq: 'weekly', priority: '0.9' },
  { loc: `${DOMAIN}/services/doorstep-support`, changefreq: 'weekly', priority: '0.9' },
  { loc: `${DOMAIN}/shop/pos-terminals`, changefreq: 'weekly', priority: '0.85' },
  { loc: `${DOMAIN}/shop/printers`, changefreq: 'weekly', priority: '0.85' },
  { loc: `${DOMAIN}/shop/laptops`, changefreq: 'weekly', priority: '0.85' },
  { loc: `${DOMAIN}/portfolio/websites`, changefreq: 'monthly', priority: '0.8' },
  { loc: `${DOMAIN}/portfolio/software`, changefreq: 'monthly', priority: '0.8' },
];

// 3. Sialkot Specialized Solutions & Interactive Utilities
const specializedRoutes = [
  { loc: `${DOMAIN}/sialkot-it-services`, changefreq: 'weekly', priority: '0.9' },
  { loc: `${DOMAIN}/laptop-repairing-sialkot`, changefreq: 'weekly', priority: '0.9' },
  { loc: `${DOMAIN}/pos-software-sialkot`, changefreq: 'weekly', priority: '0.9' },
  { loc: `${DOMAIN}/pos-software-in-sialkot`, changefreq: 'weekly', priority: '0.9' },
  { loc: `${DOMAIN}/sialkot-export-erp`, changefreq: 'weekly', priority: '0.9' },
  { loc: `${DOMAIN}/export-barcode-studio`, changefreq: 'weekly', priority: '0.9' },
  { loc: `${DOMAIN}/printer-troubleshooter`, changefreq: 'weekly', priority: '0.9' },
  { loc: `${DOMAIN}/factory-network-tester`, changefreq: 'weekly', priority: '0.85' },
  { loc: `${DOMAIN}/live-repair-tracker`, changefreq: 'daily', priority: '0.85' },
  { loc: `${DOMAIN}/thermal-hotspot-inspector`, changefreq: 'weekly', priority: '0.85' },
];

// 4. Local Industrial Hub Cluster Landing Pages (Daska, Sambrial, Wazirabad)
const citySlugs = Object.keys(LOCAL_CITIES) as (keyof typeof LOCAL_CITIES)[];
const serviceSlugs = Object.keys(CLUSTER_SERVICES) as (keyof typeof CLUSTER_SERVICES)[];

const locationClusterRoutes: { loc: string; changefreq: string; priority: string }[] = [];

// City overview pages
citySlugs.forEach((city) => {
  locationClusterRoutes.push({
    loc: `${DOMAIN}/locations/${city}`,
    changefreq: 'weekly',
    priority: '0.9',
  });
});

// Matrix of City x Service combinations
citySlugs.forEach((city) => {
  serviceSlugs.forEach((service) => {
    locationClusterRoutes.push({
      loc: `${DOMAIN}/locations/${city}/${service}`,
      changefreq: 'weekly',
      priority: '0.85',
    });
  });
});

// 5. Legal, Warranty & Corporate Policies
const policyRoutes = [
  { loc: `${DOMAIN}/privacy-policy`, changefreq: 'monthly', priority: '0.5' },
  { loc: `${DOMAIN}/terms-and-conditions`, changefreq: 'monthly', priority: '0.5' },
  { loc: `${DOMAIN}/warranty-policy`, changefreq: 'monthly', priority: '0.5' },
];

// Helper to guarantee valid ISO 8601 date format for lastmod
function formatLastmod(dateStr?: string): string {
  if (!dateStr) return '2026-10-17T10:00:00+00:00';
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
  return '2026-10-17T10:00:00+00:00';
}

const DEFAULT_LASTMOD = '2026-10-17T10:00:00+00:00';

// 6. Complete Field Technical Blogs
const blogRoutes = ALL_BLOGS.map((blog) => ({
  loc: `${DOMAIN}/blog/${blog.slug}`,
  lastmod: formatLastmod(blog.publishedDate),
  changefreq: 'weekly',
  priority: '0.8',
}));

// Compile XML Sitemap (evonixtec.com internal URLs only for Search Console compliance)
const allEntries = [
  ...coreRoutes.map((r) => ({ ...r, lastmod: DEFAULT_LASTMOD })),
  ...subCategoryRoutes.map((r) => ({ ...r, lastmod: DEFAULT_LASTMOD })),
  ...specializedRoutes.map((r) => ({ ...r, lastmod: DEFAULT_LASTMOD })),
  ...locationClusterRoutes.map((r) => ({ ...r, lastmod: DEFAULT_LASTMOD })),
  ...policyRoutes.map((r) => ({ ...r, lastmod: DEFAULT_LASTMOD })),
  ...blogRoutes,
];

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
        http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
  <!-- Core Landing Pages & Hubs -->
${allEntries
  .map(
    (r) => `  <url>
    <loc>${r.loc}</loc>
    <lastmod>${r.lastmod}</lastmod>
    <changefreq>${r.changefreq}</changefreq>
    <priority>${r.priority}</priority>
  </url>`
  )
  .join('\n')}
</urlset>
`;

const outputPath = path.resolve(process.cwd(), 'public/sitemap.xml');
fs.writeFileSync(outputPath, xml.trim() + '\n', 'utf-8');
console.log(`Successfully generated ${outputPath} with ${allEntries.length} verified URLs (Dated: ${TODAY}).`);
