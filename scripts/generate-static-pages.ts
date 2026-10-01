import fs from 'fs';
import path from 'path';
import { ALL_BLOGS } from '../src/data/blogs';
import { LOCAL_CITIES, CLUSTER_SERVICES } from '../src/data/localClusters';

const DIST_DIR = path.resolve(process.cwd(), 'dist');

interface StaticPageMeta {
  route: string;
  title: string;
  description: string;
  canonical: string;
}

const DOMAIN = 'https://evonixtec.com';

const pagesToPreRender: StaticPageMeta[] = [
  // 1. Guides & Blogs Hubs (Directly solves Google Search Console 404)
  {
    route: 'guides',
    title: 'Tech Blogs, Hardware Guides & Field Case Studies | EVONIX Sialkot',
    description: 'Read 80+ engineering blogs, hardware repair tutorials, POS setup guides, and Dubai-grade IT insights by EVONIX in Sialkot.',
    canonical: `${DOMAIN}/guides`,
  },
  {
    route: 'blogs',
    title: 'Tech Blogs & Hardware Maintenance Guides | EVONIX Technologies',
    description: 'Read 80+ engineering blogs, hardware repair tutorials, POS setup guides, and Dubai-grade IT insights by EVONIX in Sialkot.',
    canonical: `${DOMAIN}/blogs`,
  },
  {
    route: 'blog',
    title: 'Tech Blogs & Hardware Maintenance Guides | EVONIX Technologies',
    description: 'Read 80+ engineering blogs, hardware repair tutorials, POS setup guides, and Dubai-grade IT insights by EVONIX in Sialkot.',
    canonical: `${DOMAIN}/blog`,
  },
  {
    route: 'guidelines',
    title: 'Official Tech Guidelines & Engineering Standards | EVONIX Sialkot',
    description: 'Official EVONIX IT guidelines, hardware bench standards, and troubleshooting procedures for Sialkot businesses.',
    canonical: `${DOMAIN}/guidelines`,
  },
  {
    route: 'guideline',
    title: 'Official Tech Guidelines & Engineering Standards | EVONIX Sialkot',
    description: 'Official EVONIX IT guidelines, hardware bench standards, and troubleshooting procedures for Sialkot businesses.',
    canonical: `${DOMAIN}/guidelines`,
  },
  {
    route: 'guide',
    title: 'Tech Blogs & Hardware Repair Guides | EVONIX Sialkot',
    description: 'Read 80+ engineering blogs, hardware repair tutorials, POS setup guides, and Dubai-grade IT insights by EVONIX in Sialkot.',
    canonical: `${DOMAIN}/guides`,
  },

  // 2. Core Service & Product Pages
  {
    route: 'services',
    title: 'IT Services, Website Development & POS Software | EVONIX Sialkot',
    description: 'Premier IT services in Sialkot. Custom website development, retail & export POS systems, chip-level laptop repairs, and doorstep IT support.',
    canonical: `${DOMAIN}/services`,
  },
  {
    route: 'service',
    title: 'IT Services, Website Development & POS Software | EVONIX Sialkot',
    description: 'Premier IT services in Sialkot. Custom website development, retail & export POS systems, chip-level laptop repairs, and doorstep IT support.',
    canonical: `${DOMAIN}/services`,
  },
  {
    route: 'portfolio',
    title: 'Client Deployments & Case Studies (Dubai & Pakistan) | EVONIX',
    description: 'Review our proven track record of e-commerce platforms, corporate portals, and retail software deployed for clients across Dubai and Sialkot.',
    canonical: `${DOMAIN}/portfolio`,
  },
  {
    route: 'shop',
    title: 'IT Hardware, POS Systems & Equipment Catalog | EVONIX Sialkot',
    description: 'Imported Dell/HP business laptops, 80mm thermal receipt printers, 2D barcode scanners, and all-in-one capacitive touch POS terminals with warranty.',
    canonical: `${DOMAIN}/shop`,
  },
  {
    route: 'about',
    title: 'About EVONIX Technologies – 20+ Years Dubai Heritage in Sialkot',
    description: 'Learn about EVONIX Technologies, bringing 20+ years of Dubai corporate IT infrastructure experience to Sialkot and Punjab.',
    canonical: `${DOMAIN}/about`,
  },
  {
    route: 'contact',
    title: 'Contact EVONIX & Sialkot Service Lab | Rapid 2-Hour Response',
    description: 'Got a question? Call us. We reply in 2 hours with direct technician dispatch across Sialkot. Paris Road & Kotli Behram lab.',
    canonical: `${DOMAIN}/contact`,
  },
  {
    route: 'locations',
    title: 'Regional Industrial Hubs (Daska, Sambrial, Wazirabad) | EVONIX',
    description: 'Direct on-site IT dispatch and hardware repair support across Daska, Sambrial Dry Port, and Wazirabad industrial zones.',
    canonical: `${DOMAIN}/locations`,
  },

  // 3. Specialized Solutions
  {
    route: 'sialkot-it-services',
    title: 'Sialkot IT Services & Industrial Hardware Maintenance | EVONIX',
    description: 'Comprehensive IT consultancy, industrial hardware AMC, and network infrastructure maintenance for export factories in Sialkot.',
    canonical: `${DOMAIN}/sialkot-it-services`,
  },
  {
    route: 'laptop-repairing-sialkot',
    title: 'Laptop Repairing in Sialkot – Chip-Level Lab | EVONIX',
    description: 'BGA chip-level micro-soldering, motherboard repairs, screen replacement, and thermal servicing in Sialkot with genuine parts.',
    canonical: `${DOMAIN}/laptop-repairing-sialkot`,
  },
  {
    route: 'pos-software-sialkot',
    title: 'Point of Sale (POS) Software Sialkot | Retail & ERP | EVONIX',
    description: 'Fast, offline-first POS software for retail stores, supermarkets, sports manufacturers, and surgical units in Sialkot.',
    canonical: `${DOMAIN}/pos-software-sialkot`,
  },
  {
    route: 'sialkot-export-erp',
    title: 'Sialkot Export Industry ERP & Factory Systems | EVONIX',
    description: 'Export-grade ERP software for sports goods, surgical instruments, and leather apparel manufacturers in Sialkot.',
    canonical: `${DOMAIN}/sialkot-export-erp`,
  },
  {
    route: 'export-barcode-studio',
    title: 'Export Barcode & Carton Label Studio | EVONIX Sialkot',
    description: 'Free interactive GS1, Code 128, and carton shipping label generator for export manufacturers in Sialkot.',
    canonical: `${DOMAIN}/export-barcode-studio`,
  },
  {
    route: 'printer-troubleshooter',
    title: 'LaserJet & Thermal Receipt Printer Diagnostic Studio | EVONIX',
    description: 'Interactive defect ruler, error code decoder, and repair guide for HP LaserJet and 80mm thermal receipt printers.',
    canonical: `${DOMAIN}/printer-troubleshooter`,
  },

  // 4. Policy Pages
  {
    route: 'privacy-policy',
    title: 'Privacy Policy | EVONIX Technologies Sialkot',
    description: 'Official privacy policy and data governance practices of EVONIX Technologies.',
    canonical: `${DOMAIN}/privacy-policy`,
  },
  {
    route: 'terms-and-conditions',
    title: 'Terms and Conditions | EVONIX Technologies Sialkot',
    description: 'Standard terms of service, software delivery milestones, and repair agreements for EVONIX Technologies.',
    canonical: `${DOMAIN}/terms-and-conditions`,
  },
  {
    route: 'warranty-policy',
    title: 'Hardware & Service Warranty Policy | EVONIX Technologies',
    description: 'Official warranty policy covering hardware repairs, POS terminal components, and on-site servicing by EVONIX in Sialkot.',
    canonical: `${DOMAIN}/warranty-policy`,
  },
];

// Add Location City and Service Matrix
const citySlugs = Object.keys(LOCAL_CITIES) as (keyof typeof LOCAL_CITIES)[];
const serviceSlugs = Object.keys(CLUSTER_SERVICES) as (keyof typeof CLUSTER_SERVICES)[];

citySlugs.forEach((city) => {
  const cityData = LOCAL_CITIES[city];
  pagesToPreRender.push({
    route: `locations/${city}`,
    title: `${cityData.name} IT Services & Hardware Maintenance | EVONIX`,
    description: `Rapid 30-45 minute on-site IT support and diagnostic lab services for businesses in ${cityData.name}.`,
    canonical: `${DOMAIN}/locations/${city}`,
  });

  serviceSlugs.forEach((service) => {
    const serviceData = CLUSTER_SERVICES[service];
    pagesToPreRender.push({
      route: `locations/${city}/${service}`,
      title: `${serviceData.name} in ${cityData.name} | EVONIX`,
      description: `${serviceData.summary} Expert on-site engineering team serving ${cityData.name}.`,
      canonical: `${DOMAIN}/locations/${city}/${service}`,
    });
  });
});

// Add all 93 blog posts
ALL_BLOGS.forEach((blog) => {
  pagesToPreRender.push({
    route: `blog/${blog.slug}`,
    title: `${blog.title} | EVONIX Tech Guide`,
    description: blog.excerpt || blog.title,
    canonical: `${DOMAIN}/blog/${blog.slug}`,
  });
  // Also create blogs/slug alias for search engines
  pagesToPreRender.push({
    route: `blogs/${blog.slug}`,
    title: `${blog.title} | EVONIX Tech Guide`,
    description: blog.excerpt || blog.title,
    canonical: `${DOMAIN}/blog/${blog.slug}`,
  });
});

function generateStaticPages() {
  const templatePath = path.join(DIST_DIR, 'index.html');
  if (!fs.existsSync(templatePath)) {
    console.error(`Dist index.html not found at ${templatePath}. Run vite build first.`);
    process.exit(1);
  }

  const baseHtml = fs.readFileSync(templatePath, 'utf-8');
  let createdCount = 0;

  for (const page of pagesToPreRender) {
    const targetDir = path.join(DIST_DIR, page.route);
    fs.mkdirSync(targetDir, { recursive: true });

    // Inject custom meta tags into the HTML
    let modifiedHtml = baseHtml;

    // Replace Title
    modifiedHtml = modifiedHtml.replace(
      /<title>.*?<\/title>/i,
      `<title>${page.title}</title>`
    );

    // Replace Meta Description
    modifiedHtml = modifiedHtml.replace(
      /<meta\s+name="description"\s+content=".*?"\s*\/?>/i,
      `<meta name="description" content="${page.description.replace(/"/g, '&quot;')}" />`
    );

    // Replace Canonical Link
    modifiedHtml = modifiedHtml.replace(
      /<link\s+rel="canonical"\s+href=".*?"\s*\/?>/i,
      `<link rel="canonical" href="${page.canonical}" />`
    );

    // Replace OpenGraph Title & Description
    modifiedHtml = modifiedHtml.replace(
      /<meta\s+property="og:title"\s+content=".*?"\s*\/?>/i,
      `<meta property="og:title" content="${page.title.replace(/"/g, '&quot;')}" />`
    );
    modifiedHtml = modifiedHtml.replace(
      /<meta\s+property="og:description"\s+content=".*?"\s*\/?>/i,
      `<meta property="og:description" content="${page.description.replace(/"/g, '&quot;')}" />`
    );
    modifiedHtml = modifiedHtml.replace(
      /<meta\s+property="og:url"\s+content=".*?"\s*\/?>/i,
      `<meta property="og:url" content="${page.canonical}" />`
    );

    // Write physical index.html
    const targetFile = path.join(targetDir, 'index.html');
    fs.writeFileSync(targetFile, modifiedHtml, 'utf-8');
    createdCount++;
  }

  console.log(`Successfully pre-rendered ${createdCount} static route HTML files inside dist/ to prevent 404 errors.`);
}

generateStaticPages();
