import fs from 'fs';
import path from 'path';
import { ALL_BLOGS } from '../src/data/blogs';

const DOMAIN = 'https://evonixtec.com';
const TODAY = new Date().toISOString().split('T')[0];

const coreRoutes = [
  { loc: `${DOMAIN}/`, changefreq: 'daily', priority: '1.0' },
  { loc: `${DOMAIN}/services`, changefreq: 'weekly', priority: '0.9' },
  { loc: `${DOMAIN}/guides`, changefreq: 'daily', priority: '0.9' },
  { loc: `${DOMAIN}/blogs`, changefreq: 'daily', priority: '0.9' },
  { loc: `${DOMAIN}/about`, changefreq: 'monthly', priority: '0.8' },
  { loc: `${DOMAIN}/portfolio`, changefreq: 'monthly', priority: '0.8' },
  { loc: `${DOMAIN}/shop`, changefreq: 'weekly', priority: '0.85' },
  { loc: `${DOMAIN}/contact`, changefreq: 'monthly', priority: '0.85' },
  { loc: `${DOMAIN}/sialkot-it-services`, changefreq: 'weekly', priority: '0.9' },
  { loc: `${DOMAIN}/laptop-repairing-sialkot`, changefreq: 'weekly', priority: '0.85' },
  { loc: `${DOMAIN}/pos-software-sialkot`, changefreq: 'weekly', priority: '0.85' },
  { loc: `${DOMAIN}/sialkot-export-erp`, changefreq: 'weekly', priority: '0.9' },
  { loc: `${DOMAIN}/export-barcode-studio`, changefreq: 'weekly', priority: '0.9' },
  { loc: `${DOMAIN}/printer-troubleshooter`, changefreq: 'weekly', priority: '0.9' },
];

const policyRoutes = [
  { loc: `${DOMAIN}/privacy-policy`, changefreq: 'monthly', priority: '0.5' },
  { loc: `${DOMAIN}/terms-and-conditions`, changefreq: 'monthly', priority: '0.5' },
  { loc: `${DOMAIN}/warranty-policy`, changefreq: 'monthly', priority: '0.5' },
];

const blogRoutes = ALL_BLOGS.map((blog) => ({
  loc: `${DOMAIN}/blog/${blog.slug}`,
  lastmod: blog.publishedDate || TODAY,
  changefreq: 'weekly',
  priority: '0.75',
}));

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
        http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
  <!-- Core Landing Page Sections -->
${coreRoutes
  .map(
    (r) => `  <url>
    <loc>${r.loc}</loc>
    <lastmod>${TODAY}</lastmod>
    <changefreq>${r.changefreq}</changefreq>
    <priority>${r.priority}</priority>
  </url>`
  )
  .join('\n')}

  <!-- Legal & Trust Policies -->
${policyRoutes
  .map(
    (r) => `  <url>
    <loc>${r.loc}</loc>
    <lastmod>${TODAY}</lastmod>
    <changefreq>${r.changefreq}</changefreq>
    <priority>${r.priority}</priority>
  </url>`
  )
  .join('\n')}

  <!-- 60 SEO Technical Guides & Architecture Articles -->
${blogRoutes
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
console.log(`Successfully generated ${outputPath} with ${coreRoutes.length + policyRoutes.length + blogRoutes.length} URLs.`);
