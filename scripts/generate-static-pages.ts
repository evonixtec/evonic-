import fs from 'fs';
import path from 'path';
import { ALL_BLOGS } from '../src/data/blogs';
import { LOCAL_CITIES, CLUSTER_SERVICES } from '../src/data/localClusters';
import { COMPANY_INFO, SERVICES, PORTFOLIO_DATA, SHOP_PRODUCTS, FAQ_ITEMS } from '../src/data/content';

const DIST_DIR = path.resolve(process.cwd(), 'dist');
const DOMAIN = 'https://www.evonixtec.com';

interface StaticPageDef {
  route: string;
  title: string;
  description: string;
  canonical: string;
  schemaType?: string;
  schemaJson?: object;
  heading: string;
  subheading?: string;
  breadcrumb: { name: string; url: string }[];
  bodyHtml: string;
  isRedirect?: boolean;
  redirectTo?: string;
}

// Convert markdown-like content to clean semantic HTML
function formatMarkdownToHtml(content: string): string {
  if (!content) return '';

  const lines = content.split('\n');
  const htmlParts: string[] = [];
  let inList = false;

  for (const rawLine of lines) {
    const line = rawLine.trim();
    if (!line) {
      if (inList) {
        htmlParts.push('</ul>');
        inList = false;
      }
      continue;
    }

    if (line.startsWith('### ')) {
      if (inList) { htmlParts.push('</ul>'); inList = false; }
      htmlParts.push(`<h3 class="text-xl font-bold text-slate-100 mt-6 mb-3">${escapeHtml(line.slice(4))}</h3>`);
    } else if (line.startsWith('## ')) {
      if (inList) { htmlParts.push('</ul>'); inList = false; }
      htmlParts.push(`<h2 class="text-2xl font-bold text-slate-100 mt-8 mb-4">${escapeHtml(line.slice(3))}</h2>`);
    } else if (line.startsWith('# ')) {
      if (inList) { htmlParts.push('</ul>'); inList = false; }
      htmlParts.push(`<h1 class="text-3xl font-extrabold text-slate-100 mt-8 mb-4">${escapeHtml(line.slice(2))}</h1>`);
    } else if (line.startsWith('- ') || line.startsWith('* ')) {
      if (!inList) {
        htmlParts.push('<ul class="list-disc list-inside space-y-2 my-4 text-slate-300">');
        inList = true;
      }
      const itemText = formatInlineStyles(line.slice(2));
      htmlParts.push(`<li class="leading-relaxed">${itemText}</li>`);
    } else {
      if (inList) { htmlParts.push('</ul>'); inList = false; }
      const pText = formatInlineStyles(line);
      htmlParts.push(`<p class="text-slate-300 leading-relaxed my-3">${pText}</p>`);
    }
  }

  if (inList) {
    htmlParts.push('</ul>');
  }

  return htmlParts.join('\n');
}

function formatInlineStyles(text: string): string {
  let res = escapeHtml(text);
  // Bold **text**
  res = res.replace(/\*\*(.*?)\*\*/g, '<strong class="font-bold text-slate-100">$1</strong>');
  // Inline code `code`
  res = res.replace(/`([^`]+)`/g, '<code class="px-1.5 py-0.5 rounded bg-slate-800 text-teal-300 text-sm font-mono">$1</code>');
  return res;
}

function escapeHtml(str: string | undefined | null): string {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

// Generate shared header for pre-rendered pages
function buildSeoHeader(currentRoute: string): string {
  return `
    <header class="border-b border-slate-800 bg-slate-950/90 text-white px-4 py-4 sm:px-8">
      <div class="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4">
        <a href="/" class="flex items-center gap-3 text-white font-extrabold text-lg tracking-wider">
          <span class="text-teal-400">EVONIX</span> TECHNOLOGIES
        </a>
        <nav class="flex flex-wrap items-center gap-4 sm:gap-6 text-sm text-slate-300 font-medium">
          <a href="/services" class="hover:text-teal-400">Services</a>
          <a href="/guides" class="hover:text-teal-400">Guides</a>
          <a href="/portfolio" class="hover:text-teal-400">Portfolio</a>
          <a href="/shop" class="hover:text-teal-400">Shop</a>
          <a href="/locations" class="hover:text-teal-400">Locations</a>
          <a href="/about" class="hover:text-teal-400">About</a>
          <a href="/contact" class="hover:text-teal-400">Contact</a>
        </nav>
      </div>
    </header>
  `;
}

// Generate shared footer with rich crawlable internal links
function buildSeoFooter(): string {
  const topBlogs = ALL_BLOGS.slice(0, 8);
  const citySlugs = Object.keys(LOCAL_CITIES) as (keyof typeof LOCAL_CITIES)[];

  return `
    <footer class="border-t border-slate-800 bg-slate-950 text-slate-300 mt-20 pt-12 pb-16 px-4 sm:px-8">
      <div class="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
        <div>
          <h3 class="text-white font-bold text-base mb-3">EVONIX TECHNOLOGIES</h3>
          <p class="text-xs text-slate-400 leading-relaxed mb-4">
            ${COMPANY_INFO.about.story}
          </p>
          <p class="text-xs text-teal-400 font-bold">
            Got a question? Call us. We reply in 2 hours.
          </p>
          <p class="text-xs text-slate-400 mt-1">
            Phone: ${COMPANY_INFO.contact.phoneDisplay}
          </p>
          <p class="text-xs text-slate-400">
            Address: ${COMPANY_INFO.contact.address}
          </p>
        </div>

        <div>
          <h3 class="text-white font-bold text-base mb-3">Core Services</h3>
          <ul class="space-y-2 text-xs text-slate-400">
            <li><a href="/services/web-development" class="hover:text-teal-400">Custom Website Development</a></li>
            <li><a href="/services/software-pos" class="hover:text-teal-400">Retail &amp; Export POS Systems</a></li>
            <li><a href="/services/hardware-repair" class="hover:text-teal-400">Chip-Level Motherboard Repair</a></li>
            <li><a href="/services/doorstep-support" class="hover:text-teal-400">Doorstep IT Dispatch</a></li>
            <li><a href="/sialkot-export-erp" class="hover:text-teal-400">Sialkot Export Factory ERP</a></li>
            <li><a href="/laptop-repairing-sialkot" class="hover:text-teal-400">Laptop Repairing Sialkot</a></li>
          </ul>
        </div>

        <div>
          <h3 class="text-white font-bold text-base mb-3">Industrial Areas</h3>
          <ul class="space-y-2 text-xs text-slate-400">
            ${citySlugs.map((city) => `
              <li><a href="/locations/${city}" class="hover:text-teal-400">${LOCAL_CITIES[city].name} IT Services</a></li>
            `).join('')}
            <li><a href="/locations" class="hover:text-teal-400">All Coverage Zones</a></li>
            <li><a href="/export-barcode-studio" class="hover:text-teal-400">Export Barcode Studio</a></li>
            <li><a href="/printer-troubleshooter" class="hover:text-teal-400">Printer Troubleshooter</a></li>
            <li><a href="/factory-network-tester" class="hover:text-teal-400">Factory Network Tester</a></li>
          </ul>
        </div>

        <div>
          <h3 class="text-white font-bold text-base mb-3">Technical Guides</h3>
          <ul class="space-y-2 text-xs text-slate-400">
            ${topBlogs.map((b) => `
              <li><a href="/blog/${b.slug}" class="hover:text-teal-400 line-clamp-1">${escapeHtml(b.title)}</a></li>
            `).join('')}
            <li class="pt-2"><a href="/guides" class="text-teal-400 font-bold hover:underline">View All 90+ Guides &rarr;</a></li>
          </ul>
        </div>
      </div>

      <div class="max-w-7xl mx-auto pt-8 border-t border-slate-800/80 flex flex-wrap items-center justify-between text-xs text-slate-500 gap-4">
        <div>
          &copy; ${new Date().getFullYear()} EVONIX TECHNOLOGIES. All rights reserved. Sialkot, Pakistan.
        </div>
        <div class="flex items-center gap-4">
          <a href="/privacy-policy" class="hover:text-slate-300">Privacy Policy</a>
          <a href="/terms-and-conditions" class="hover:text-slate-300">Terms of Service</a>
          <a href="/warranty-policy" class="hover:text-slate-300">Warranty Policy</a>
          <a href="/contact" class="hover:text-slate-300">Contact Us</a>
        </div>
      </div>
    </footer>
  `;
}

// Build standard breadcrumb HTML
function buildBreadcrumbsHtml(crumbs: { name: string; url: string }[]): string {
  return `
    <nav aria-label="Breadcrumb" class="mb-6">
      <ol class="flex flex-wrap items-center gap-2 text-xs text-slate-400">
        ${crumbs.map((c, idx) => {
          const isLast = idx === crumbs.length - 1;
          if (isLast) {
            return `<li class="text-teal-400 font-semibold" aria-current="page">${escapeHtml(c.name)}</li>`;
          }
          return `<li><a href="${c.url}" class="hover:text-slate-200">${escapeHtml(c.name)}</a> <span class="mx-1 text-slate-600">/</span></li>`;
        }).join('')}
      </ol>
    </nav>
  `;
}

// Collect pages to render
const pages: StaticPageDef[] = [];

// ==========================================
// 1. Core Primary Pages
// ==========================================
pages.push({
  route: 'about',
  title: 'About EVONIX Technologies – 20+ Years Dubai Heritage in Sialkot',
  description: 'EVONIX brings 20+ years of Dubai corporate IT infrastructure experience to Sialkot. Enterprise website engineering, POS systems, and chip-level repairs.',
  canonical: `${DOMAIN}/about`,
  heading: 'About EVONIX Technologies',
  subheading: '20+ Years Dubai Corporate IT Experience, Now Serving Sialkot & Punjab',
  breadcrumb: [{ name: 'Home', url: '/' }, { name: 'About Us', url: '/about' }],
  bodyHtml: `
    <div class="space-y-6 text-slate-300">
      <p class="text-base sm:text-lg leading-relaxed text-slate-200">
        ${COMPANY_INFO.about.story}
      </p>

      <h2 class="text-2xl font-bold text-white mt-8 mb-4">Our Heritage &amp; Technical Standards</h2>
      <p class="leading-relaxed">
        ${COMPANY_INFO.about.mission}
      </p>
      <p class="leading-relaxed">
        ${COMPANY_INFO.about.vision}
      </p>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
        <div class="p-6 rounded-2xl bg-slate-900 border border-slate-800">
          <h3 class="text-lg font-bold text-teal-400 mb-2">Dubai Enterprise Proven</h3>
          <p class="text-sm text-slate-400">
            Two decades managing enterprise data centers, corporate point of sale setups, and industrial hardware maintenance in Dubai.
          </p>
        </div>
        <div class="p-6 rounded-2xl bg-slate-900 border border-slate-800">
          <h3 class="text-lg font-bold text-teal-400 mb-2">Sialkot Physical Lab</h3>
          <p class="text-sm text-slate-400">
            Dedicated chip-level motherboard testing bench, micro-soldering station, and quick on-site field dispatch across Sialkot.
          </p>
        </div>
      </div>

      <div class="p-6 rounded-2xl bg-slate-900/80 border border-teal-500/30">
        <h3 class="text-xl font-bold text-white mb-2">Got a question? Call us.</h3>
        <p class="text-sm text-slate-300 mb-4">We reply in 2 hours with direct technician support.</p>
        <a href="tel:${COMPANY_INFO.contact.phoneRaw}" class="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-sm">
          Call ${COMPANY_INFO.contact.phoneDisplay}
        </a>
      </div>
    </div>
  `
});

pages.push({
  route: 'contact',
  title: 'Contact EVONIX & Sialkot Service Lab | Fast 2-Hour Response',
  description: 'Got a question? Call us. We reply in 2 hours with direct technician dispatch across Sialkot. Paris Road & Kotli Behram lab.',
  canonical: `${DOMAIN}/contact`,
  heading: 'Contact EVONIX Technologies',
  subheading: 'Got a question? Call us. We reply in 2 hours.',
  breadcrumb: [{ name: 'Home', url: '/' }, { name: 'Contact', url: '/contact' }],
  bodyHtml: `
    <div class="space-y-6 text-slate-300">
      <div class="p-6 sm:p-8 rounded-3xl bg-slate-900 border border-teal-500/40 text-center max-w-xl mx-auto my-6">
        <h2 class="text-2xl sm:text-3xl font-extrabold text-white mb-2">Got a question? Call us.</h2>
        <p class="text-teal-400 font-bold text-lg mb-6">We reply in 2 hours.</p>
        <div class="space-y-3 text-left">
          <div class="p-4 rounded-xl bg-slate-950 border border-slate-800">
            <span class="text-xs text-slate-400 block font-semibold uppercase">Direct Phone</span>
            <a href="tel:${COMPANY_INFO.contact.phoneRaw}" class="text-lg font-bold text-white hover:text-teal-400">${COMPANY_INFO.contact.phoneDisplay}</a>
          </div>
          <div class="p-4 rounded-xl bg-slate-950 border border-slate-800">
            <span class="text-xs text-slate-400 block font-semibold uppercase">Email</span>
            <a href="mailto:${COMPANY_INFO.contact.email}" class="text-lg font-bold text-white hover:text-teal-400">${COMPANY_INFO.contact.email}</a>
          </div>
          <div class="p-4 rounded-xl bg-slate-950 border border-slate-800">
            <span class="text-xs text-slate-400 block font-semibold uppercase">Diagnostic Lab Address</span>
            <span class="text-sm font-medium text-slate-200">${COMPANY_INFO.contact.address}</span>
          </div>
        </div>
      </div>
    </div>
  `
});

pages.push({
  route: 'services',
  title: 'IT Services, Website Development & POS Software | EVONIX Sialkot',
  description: 'Premier IT services in Sialkot. Custom website development, retail & export POS systems, chip-level laptop repairs, and doorstep IT support.',
  canonical: `${DOMAIN}/services`,
  heading: 'Engineering & IT Services in Sialkot',
  subheading: 'Precision Software, Retail POS, and Hardware Engineering',
  breadcrumb: [{ name: 'Home', url: '/' }, { name: 'Services', url: '/services' }],
  bodyHtml: `
    <div class="space-y-8 text-slate-300">
      <p class="text-base sm:text-lg leading-relaxed">
        EVONIX provides complete IT support for retailers, export manufacturers, and businesses in Sialkot and Punjab.
      </p>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        ${SERVICES.map((s) => `
          <div class="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
            <h2 class="text-xl font-bold text-white">${escapeHtml(s.title)}</h2>
            <p class="text-sm text-slate-400 leading-relaxed">${escapeHtml(s.description)}</p>
            <ul class="space-y-1 text-xs text-teal-300 pt-2">
              ${(s.features || []).map((f: string) => `<li>&bull; ${escapeHtml(f)}</li>`).join('')}
            </ul>
          </div>
        `).join('')}
      </div>

      <div class="p-6 rounded-2xl bg-slate-900 border border-slate-800 my-8">
        <h2 class="text-xl font-bold text-white mb-4">Direct Sub-Service Landings</h2>
        <div class="flex flex-wrap gap-3">
          <a href="/services/web-development" class="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-teal-400 text-sm font-semibold">Web Development</a>
          <a href="/services/software-pos" class="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-teal-400 text-sm font-semibold">Software &amp; POS Systems</a>
          <a href="/services/hardware-repair" class="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-teal-400 text-sm font-semibold">Hardware Repair</a>
          <a href="/services/doorstep-support" class="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-teal-400 text-sm font-semibold">Doorstep Field Support</a>
        </div>
      </div>
    </div>
  `
});

// Sub Services
const subServices = [
  {
    route: 'services/web-development',
    title: 'Custom Website & Web Application Engineering | EVONIX Sialkot',
    description: 'High-speed B2B export websites, React web applications, and multi-currency portals for Sialkot businesses.',
    heading: 'Custom Website & Web Application Engineering',
    features: ['Modern React & TypeScript SPAs', 'Clean Mobile Responsive Grids', 'Fast Core Web Vitals (95+ score)', 'Direct WhatsApp Lead Capture']
  },
  {
    route: 'services/software-pos',
    title: 'Retail & Export POS Software Solutions | EVONIX Sialkot',
    description: 'Offline-first POS billing systems, barcode inventory tracking, and custom manufacturing ERP software for Sialkot.',
    heading: 'Retail & Export POS Software Solutions',
    features: ['Offline-First Local SQLite/Cloud Sync', '80mm Thermal Receipt Printing', 'Barcode Scanning & Stock Deductions', 'Cashier Rights & Daily Z-Reports']
  },
  {
    route: 'services/hardware-repair',
    title: 'Chip-Level Motherboard & Hardware Repair Lab | EVONIX Sialkot',
    description: 'BGA rework, micro-soldering, blown MOSFET repair, and thermal servicing for business laptops and industrial PCs.',
    heading: 'Chip-Level Motherboard & Hardware Repair Lab',
    features: ['Component-Level Bench Testing', 'Short Circuit Detection with FLIR Thermal Imaging', 'Genuine Replacement ICs & MOSFETs', 'Zero-Fee Diagnostic Policy']
  },
  {
    route: 'services/doorstep-support',
    title: 'Doorstep IT Support & Emergency Field Dispatch | EVONIX Sialkot',
    description: '15-to-60 minute on-site corporate technician dispatch across Sialkot City, Cantt, Paris Road, and factory zones.',
    heading: 'Doorstep IT Support & Emergency Field Dispatch',
    features: ['Rapid Dispatch to Paris Road & Cantt', 'Emergency Network Cable & Router Fixes', 'Thermal Receipt Printer Setup', 'Workstation Virus Removal & SSD Upgrades']
  }
];

subServices.forEach((ss) => {
  pages.push({
    route: ss.route,
    title: ss.title,
    description: ss.description,
    canonical: `${DOMAIN}/${ss.route}`,
    heading: ss.heading,
    breadcrumb: [{ name: 'Home', url: '/' }, { name: 'Services', url: '/services' }, { name: ss.heading, url: `/${ss.route}` }],
    bodyHtml: `
      <div class="space-y-6 text-slate-300">
        <p class="text-base sm:text-lg leading-relaxed text-slate-200">
          ${ss.description}
        </p>

        <h2 class="text-2xl font-bold text-white mt-8 mb-4">Key Deliverables</h2>
        <ul class="space-y-3">
          ${ss.features.map(f => `
            <li class="flex items-start gap-3 p-4 rounded-xl bg-slate-900 border border-slate-800">
              <span class="text-teal-400 font-bold">&check;</span>
              <span class="text-sm font-medium text-slate-200">${escapeHtml(f)}</span>
            </li>
          `).join('')}
        </ul>

        <div class="p-6 rounded-2xl bg-slate-900/80 border border-teal-500/30 mt-8">
          <h3 class="text-xl font-bold text-white mb-2">Got a question? Call us.</h3>
          <p class="text-sm text-slate-300 mb-4">We reply in 2 hours with direct technician support.</p>
          <a href="/contact" class="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-sm">
            Contact Engineering Desk
          </a>
        </div>
      </div>
    `
  });
});

// Portfolio
pages.push({
  route: 'portfolio',
  title: 'Client Deployments & Case Studies (Dubai & Pakistan) | EVONIX',
  description: 'Review our proven track record of e-commerce platforms, corporate portals, and retail software deployed for clients across Dubai and Sialkot.',
  canonical: `${DOMAIN}/portfolio`,
  heading: 'Enterprise Portfolio & Deployments',
  subheading: 'Proven Deployments in Dubai & Sialkot',
  breadcrumb: [{ name: 'Home', url: '/' }, { name: 'Portfolio', url: '/portfolio' }],
  bodyHtml: `
    <div class="space-y-8 text-slate-300">
      <p class="text-base sm:text-lg leading-relaxed">
        Real software and web projects engineered with modern web standards and reliable data flows.
      </p>

      <h2 class="text-2xl font-bold text-white mt-8 mb-4">Web Platforms &amp; Export Portals</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        ${(PORTFOLIO_DATA.websiteClients || []).map(p => `
          <div class="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
            <span class="text-xs font-bold text-teal-400 uppercase">${escapeHtml(p.industry)}</span>
            <h3 class="text-xl font-bold text-white">${escapeHtml(p.title)}</h3>
            <p class="text-sm text-slate-400">${escapeHtml(p.description)}</p>
            <div class="flex flex-wrap gap-1.5 pt-2">
              ${(p.tags || []).map((t: string) => `<span class="px-2 py-0.5 rounded bg-slate-800 text-[10px] text-slate-300">${escapeHtml(t)}</span>`).join('')}
            </div>
          </div>
        `).join('')}
      </div>

      <h2 class="text-2xl font-bold text-white mt-8 mb-4">Custom Software &amp; ERP Systems</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        ${(PORTFOLIO_DATA.softwareClients || []).map(p => `
          <div class="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
            <span class="text-xs font-bold text-teal-400 uppercase">${escapeHtml(p.industry)}</span>
            <h3 class="text-xl font-bold text-white">${escapeHtml(p.title)}</h3>
            <p class="text-sm text-slate-400">${escapeHtml(p.description)}</p>
            <div class="flex flex-wrap gap-1.5 pt-2">
              ${(p.tags || []).map((t: string) => `<span class="px-2 py-0.5 rounded bg-slate-800 text-[10px] text-slate-300">${escapeHtml(t)}</span>`).join('')}
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  `
});

pages.push({
  route: 'portfolio/websites',
  title: 'Corporate & Export Website Case Studies | EVONIX Sialkot',
  description: 'Review our completed web development deployments for export manufacturers and multinational clients.',
  canonical: `${DOMAIN}/portfolio/websites`,
  heading: 'Corporate & Export Website Deployments',
  breadcrumb: [{ name: 'Home', url: '/' }, { name: 'Portfolio', url: '/portfolio' }, { name: 'Websites', url: '/portfolio/websites' }],
  bodyHtml: `
    <div class="space-y-6 text-slate-300">
      <p class="text-base sm:text-lg text-slate-200">
        Engineered for rapid loading, international search visibility, and mobile conversions.
      </p>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        ${(PORTFOLIO_DATA.websiteClients || []).map(p => `
          <div class="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
            <h3 class="text-lg font-bold text-white">${escapeHtml(p.title)}</h3>
            <p class="text-sm text-slate-400">${escapeHtml(p.description)}</p>
          </div>
        `).join('')}
      </div>
    </div>
  `
});

pages.push({
  route: 'portfolio/software',
  title: 'Custom POS & ERP Software Case Studies | EVONIX Sialkot',
  description: 'View live enterprise retail and factory ERP deployments engineered with offline-first synchronization.',
  canonical: `${DOMAIN}/portfolio/software`,
  heading: 'Custom POS & ERP Deployments',
  breadcrumb: [{ name: 'Home', url: '/' }, { name: 'Portfolio', url: '/portfolio' }, { name: 'Software', url: '/portfolio/software' }],
  bodyHtml: `
    <div class="space-y-6 text-slate-300">
      <p class="text-base sm:text-lg text-slate-200">
        Mission-critical retail point of sale and manufacturing software case studies.
      </p>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        ${(PORTFOLIO_DATA.softwareClients || []).map(p => `
          <div class="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
            <h3 class="text-lg font-bold text-white">${escapeHtml(p.title)}</h3>
            <p class="text-sm text-slate-400">${escapeHtml(p.description)}</p>
          </div>
        `).join('')}
      </div>
    </div>
  `
});

// Shop & Sub-categories
pages.push({
  route: 'shop',
  title: 'IT Hardware, POS Systems & Equipment Catalog | EVONIX Sialkot',
  description: 'Imported business laptops, 80mm thermal receipt printers, 2D barcode scanners, and all-in-one touch POS terminals with warranty.',
  canonical: `${DOMAIN}/shop`,
  heading: 'IT Hardware & POS Equipment Catalog',
  subheading: 'Verified Business Equipment with Local Warranty Support',
  breadcrumb: [{ name: 'Home', url: '/' }, { name: 'Shop', url: '/shop' }],
  bodyHtml: `
    <div class="space-y-8 text-slate-300">
      <p class="text-base sm:text-lg leading-relaxed">
        Tested and certified computer hardware, retail POS terminals, and barcode peripherals ready for dispatch in Sialkot.
      </p>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        ${SHOP_PRODUCTS.map(prod => `
          <div class="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
            <span class="text-xs font-bold text-teal-400 uppercase">${escapeHtml(prod.category)}</span>
            <h2 class="text-lg font-bold text-white">${escapeHtml(prod.name)}</h2>
            <p class="text-xs text-slate-400">${escapeHtml(prod.description)}</p>
            <div class="pt-2 text-xs text-slate-300 space-y-1">
              <div><strong>Warranty:</strong> ${escapeHtml(prod.warranty || '3 Months')}</div>
              <div><strong>Condition:</strong> ${escapeHtml(prod.condition || 'Tested Grade-A')}</div>
              <div class="text-teal-400 font-bold">${escapeHtml(prod.priceEstimate || 'Contact for price')}</div>
            </div>
          </div>
        `).join('')}
      </div>

      <div class="p-6 rounded-2xl bg-slate-900 border border-slate-800">
        <h3 class="text-lg font-bold text-white mb-3">Browse Equipment Categories</h3>
        <div class="flex flex-wrap gap-3">
          <a href="/shop/pos-terminals" class="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-teal-400 text-sm font-semibold">POS Terminals</a>
          <a href="/shop/printers" class="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-teal-400 text-sm font-semibold">Thermal &amp; Barcode Printers</a>
          <a href="/shop/laptops" class="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-teal-400 text-sm font-semibold">Business Laptops</a>
        </div>
      </div>
    </div>
  `
});

const shopSubPages = [
  {
    route: 'shop/pos-terminals',
    title: 'All-In-One Touchscreen POS Terminals | EVONIX Hardware Sialkot',
    description: 'Commercial capacitive touch POS terminals with Intel Core processors and local warranty support in Sialkot.',
    heading: 'Touchscreen POS Terminals for Retail & Hospitality'
  },
  {
    route: 'shop/printers',
    title: '80mm Thermal Receipt & Barcode Printers | EVONIX Sialkot',
    description: 'High-speed 260mm/s auto-cutter thermal receipt printers and heavy-duty industrial shipping label printers.',
    heading: '80mm Thermal Receipt & Barcode Label Printers'
  },
  {
    route: 'shop/laptops',
    title: 'Business Laptops & High-Performance Workstations | EVONIX Sialkot',
    description: 'Tested Grade-A Dell Latitude and HP EliteBook corporate laptops configured for business and export accounting.',
    heading: 'Business Laptops & Corporate Workstations'
  }
];

shopSubPages.forEach((sp) => {
  pages.push({
    route: sp.route,
    title: sp.title,
    description: sp.description,
    canonical: `${DOMAIN}/${sp.route}`,
    heading: sp.heading,
    breadcrumb: [{ name: 'Home', url: '/' }, { name: 'Shop', url: '/shop' }, { name: sp.heading, url: `/${sp.route}` }],
    bodyHtml: `
      <div class="space-y-6 text-slate-300">
        <p class="text-base sm:text-lg text-slate-200">
          ${sp.description}
        </p>
        <div class="p-6 rounded-2xl bg-slate-900 border border-slate-800">
          <h2 class="text-xl font-bold text-white mb-2">Got a question? Call us.</h2>
          <p class="text-sm text-slate-400 mb-4">We reply in 2 hours with available stock and pricing.</p>
          <a href="/contact" class="px-6 py-3 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-sm inline-block">
            Contact Sales Desk
          </a>
        </div>
      </div>
    `
  });
});

// Specialized interactive tools and Sialkot landings
pages.push({
  route: 'sialkot-it-services',
  title: 'Sialkot IT Services & Industrial Hardware Maintenance | EVONIX',
  description: 'Comprehensive IT consultancy, industrial hardware AMC, and network infrastructure maintenance for export factories in Sialkot.',
  canonical: `${DOMAIN}/sialkot-it-services`,
  heading: 'Sialkot IT Services & Factory Infrastructure',
  breadcrumb: [{ name: 'Home', url: '/' }, { name: 'Sialkot IT Services', url: '/sialkot-it-services' }],
  bodyHtml: `
    <div class="space-y-6 text-slate-300">
      <p class="text-base sm:text-lg text-slate-200">
        Complete enterprise technology support designed for Sialkot export manufacturing factories.
      </p>
      <h2 class="text-2xl font-bold text-white">Services for Sialkot Factories</h2>
      <ul class="space-y-2 text-sm">
        <li>&bull; Dual-fiber internet failover and router configuration</li>
        <li>&bull; Secure local Synology NAS backup setup</li>
        <li>&bull; Annual IT Maintenance Contracts (AMC) with dedicated engineers</li>
        <li>&bull; Zero-delay doorstep dispatch to Sambrial, Daska Road, and Cantt</li>
      </ul>
    </div>
  `
});

pages.push({
  route: 'laptop-repairing-sialkot',
  title: 'Laptop Repairing in Sialkot – Chip-Level Lab | EVONIX',
  description: 'BGA chip-level micro-soldering, motherboard repairs, screen replacement, and thermal servicing in Sialkot with genuine parts.',
  canonical: `${DOMAIN}/laptop-repairing-sialkot`,
  heading: 'Laptop Repairing in Sialkot – Chip-Level Lab',
  breadcrumb: [{ name: 'Home', url: '/' }, { name: 'Laptop Repairing Sialkot', url: '/laptop-repairing-sialkot' }],
  bodyHtml: `
    <div class="space-y-6 text-slate-300">
      <p class="text-base sm:text-lg text-slate-200">
        Professional laptop and MacBook motherboard repair bench located at Kotli Behram, Paris Road Sialkot.
      </p>
      <h2 class="text-2xl font-bold text-white">Common Bench Repairs</h2>
      <ul class="space-y-2 text-sm">
        <li>&bull; Dead laptop power rail troubleshooting (19V, 3.3V, 5V rails)</li>
        <li>&bull; Broken hinge and structural plastic chassis reconstruction</li>
        <li>&bull; Screen replacement (30-pin and 40-pin eDP LED panels)</li>
        <li>&bull; Liquid damage ultrasonic cleaning and corrosion removal</li>
      </ul>
    </div>
  `
});

pages.push({
  route: 'pos-software-sialkot',
  title: 'Point of Sale (POS) Software Sialkot | Retail & ERP | EVONIX',
  description: 'Fast, offline-first POS software for retail stores, supermarkets, sports manufacturers, and surgical units in Sialkot.',
  canonical: `${DOMAIN}/pos-software-sialkot`,
  heading: 'Point of Sale (POS) Software Sialkot',
  breadcrumb: [{ name: 'Home', url: '/' }, { name: 'POS Software Sialkot', url: '/pos-software-sialkot' }],
  bodyHtml: `
    <div class="space-y-6 text-slate-300">
      <p class="text-base sm:text-lg text-slate-200">
        Engineered specifically for retailers and manufacturers who need 100% offline billing reliability.
      </p>
    </div>
  `
});

pages.push({
  route: 'sialkot-export-erp',
  title: 'Sialkot Export Industry ERP & Factory Systems | EVONIX',
  description: 'Export-grade ERP software for sports goods, surgical instruments, and leather apparel manufacturers in Sialkot.',
  canonical: `${DOMAIN}/sialkot-export-erp`,
  heading: 'Sialkot Export Industry ERP & Custom Software',
  breadcrumb: [{ name: 'Home', url: '/' }, { name: 'Export ERP', url: '/sialkot-export-erp' }],
  bodyHtml: `
    <div class="space-y-6 text-slate-300">
      <p class="text-base sm:text-lg text-slate-200">
        Custom ERP tracking every stage from raw material intake to carton packaging and WeBOC customs filing.
      </p>
    </div>
  `
});

pages.push({
  route: 'export-barcode-studio',
  title: 'Export Barcode & Carton Label Studio | EVONIX Sialkot',
  description: 'Free interactive GS1, Code 128, and carton shipping label generator for export manufacturers in Sialkot.',
  canonical: `${DOMAIN}/export-barcode-studio`,
  heading: 'Export Barcode & Carton Label Studio',
  breadcrumb: [{ name: 'Home', url: '/' }, { name: 'Export Barcode Studio', url: '/export-barcode-studio' }],
  bodyHtml: `
    <div class="space-y-6 text-slate-300">
      <p class="text-base sm:text-lg text-slate-200">
        Generate compliant GS1, Code 128, and master carton shipping labels directly in your browser.
      </p>
    </div>
  `
});

pages.push({
  route: 'printer-troubleshooter',
  title: 'LaserJet & Thermal Receipt Printer Diagnostic Studio | EVONIX',
  description: 'Interactive defect ruler, error code decoder, and repair guide for HP LaserJet and 80mm thermal receipt printers.',
  canonical: `${DOMAIN}/printer-troubleshooter`,
  heading: 'LaserJet & Thermal Printer Troubleshooter',
  breadcrumb: [{ name: 'Home', url: '/' }, { name: 'Printer Troubleshooter', url: '/printer-troubleshooter' }],
  bodyHtml: `
    <div class="space-y-6 text-slate-300">
      <p class="text-base sm:text-lg text-slate-200">
        Diagnose repetitive drum defects, paper feed jams, and faded thermal receipts instantly.
      </p>
    </div>
  `
});

pages.push({
  route: 'factory-network-tester',
  title: 'Export Factory Network Latency & Bandwidth Benchmark | EVONIX',
  description: 'Interactive industrial network latency tester for export factories and ERP database synchronization across Sialkot.',
  canonical: `${DOMAIN}/factory-network-tester`,
  heading: 'Export Factory Network Latency Benchmark',
  breadcrumb: [{ name: 'Home', url: '/' }, { name: 'Network Benchmark', url: '/factory-network-tester' }],
  bodyHtml: `
    <div class="space-y-6 text-slate-300">
      <p class="text-base sm:text-lg text-slate-200">
        Benchmark premise network latency, SQL server database sync times, and WeBOC customs gateway ping stability in Sialkot industrial zones.
      </p>
      <div class="p-6 rounded-2xl bg-slate-900 border border-slate-800">
        <h2 class="text-xl font-bold text-white mb-3">On-Premise Industrial Targets</h2>
        <ul class="space-y-2 text-sm text-slate-400">
          <li>&bull; Surgical Instruments Manufacturing ERP (SQL Server)</li>
          <li>&bull; Sambrial Dry Port Customs &amp; EDI Dispatch Gateway</li>
          <li>&bull; Daska Road Leather &amp; Sports Goods Hybrid Cloud Sync</li>
        </ul>
      </div>
    </div>
  `
});

pages.push({
  route: 'live-repair-tracker',
  title: 'Live RMA Repair Ticket & Bench Diagnostics Tracker | EVONIX',
  description: 'Check real-time hardware repair diagnostics, component sourcing, and testing progress for your lab tickets in Sialkot.',
  canonical: `${DOMAIN}/live-repair-tracker`,
  heading: 'Live Repair Ticket & Bench Diagnostics Tracker',
  breadcrumb: [{ name: 'Home', url: '/' }, { name: 'Repair Tracker', url: '/live-repair-tracker' }],
  bodyHtml: `
    <div class="space-y-6 text-slate-300">
      <p class="text-base sm:text-lg text-slate-200">
        Track your motherboard repair ticket, parts sourcing status, and quality testing progress live.
      </p>
    </div>
  `
});

// Financial / Calculators
pages.push({
  route: 'invoice',
  title: 'Global Zero-Database Enterprise Invoice Hub | EVONIX Technologies',
  description: '100% free client-side invoice generator. Multi-country tax calculation, Code128 barcode engine, amount in words, and local privacy persistence for global freelancers.',
  canonical: `${DOMAIN}/invoice`,
  heading: 'Global Zero-Database Enterprise Invoice Hub',
  breadcrumb: [{ name: 'Home', url: '/' }, { name: 'Invoice Hub', url: '/invoice' }],
  bodyHtml: `
    <div class="space-y-6 text-slate-300">
      <p class="text-base sm:text-lg text-slate-200">
        Generate professional PDF invoices with barcodes, multi-currency calculations, and zero remote data storage.
      </p>
    </div>
  `
});

pages.push({
  route: 'ecommerce-calculator',
  title: 'E-Commerce Profit & Courier Shipping Margin Calculator | EVONIX Technologies',
  description: 'Calculate unit economics, multi-courier rates (Leopards, TCS, Trax, PostEx), COD handling fees, break-even targets, and Pakistani return rate risk cushions with zero remote database tracking.',
  canonical: `${DOMAIN}/ecommerce-calculator`,
  heading: 'E-Commerce Profit & Courier Shipping Margin Calculator',
  breadcrumb: [{ name: 'Home', url: '/' }, { name: 'E-Commerce Calculator', url: '/ecommerce-calculator' }],
  bodyHtml: `
    <div class="space-y-6 text-slate-300">
      <p class="text-base sm:text-lg text-slate-200">
        Accurately model Pakistani cash-on-delivery fees, return rate risks, and courier margins.
      </p>
    </div>
  `
});

// Policies
pages.push({
  route: 'privacy-policy',
  title: 'Privacy Policy | EVONIX Technologies Sialkot',
  description: 'Official privacy policy and data governance practices of EVONIX Technologies.',
  canonical: `${DOMAIN}/privacy-policy`,
  heading: 'Privacy Policy',
  breadcrumb: [{ name: 'Home', url: '/' }, { name: 'Privacy Policy', url: '/privacy-policy' }],
  bodyHtml: `<p class="text-slate-300">EVONIX Technologies respects your privacy. All diagnostic tools and calculators process data locally on your device.</p>`
});

pages.push({
  route: 'terms-and-conditions',
  title: 'Terms and Conditions | EVONIX Technologies Sialkot',
  description: 'Standard terms of service, software delivery milestones, and repair agreements for EVONIX Technologies.',
  canonical: `${DOMAIN}/terms-and-conditions`,
  heading: 'Terms and Conditions',
  breadcrumb: [{ name: 'Home', url: '/' }, { name: 'Terms and Conditions', url: '/terms-and-conditions' }],
  bodyHtml: `<p class="text-slate-300">Clear, fair commercial terms covering software deliverables, milestones, and bench repair diagnostics.</p>`
});

pages.push({
  route: 'warranty-policy',
  title: 'Hardware & Service Warranty Policy | EVONIX Technologies',
  description: 'Official warranty policy covering hardware repairs, POS terminal components, and on-site servicing by EVONIX in Sialkot.',
  canonical: `${DOMAIN}/warranty-policy`,
  heading: 'Hardware & Service Warranty Policy',
  breadcrumb: [{ name: 'Home', url: '/' }, { name: 'Warranty Policy', url: '/warranty-policy' }],
  bodyHtml: `<p class="text-slate-300">Comprehensive warranty coverage on motherboard repairs, thermal components, and touch POS terminals.</p>`
});

// Locations
pages.push({
  route: 'locations',
  title: 'Regional Industrial Hubs (Daska, Sambrial, Wazirabad) | EVONIX',
  description: 'Direct on-site IT dispatch and hardware repair support across Daska, Sambrial Dry Port, and Wazirabad industrial zones.',
  canonical: `${DOMAIN}/locations`,
  heading: 'Regional Industrial Hubs & On-Site Support',
  breadcrumb: [{ name: 'Home', url: '/' }, { name: 'Locations', url: '/locations' }],
  bodyHtml: `
    <div class="space-y-6 text-slate-300">
      <p class="text-base sm:text-lg text-slate-200">
        Direct on-site corporate technician dispatch and diagnostic lab support across regional manufacturing centers.
      </p>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 my-6">
        ${(Object.keys(LOCAL_CITIES) as (keyof typeof LOCAL_CITIES)[]).map(c => `
          <div class="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
            <h2 class="text-xl font-bold text-white">${escapeHtml(LOCAL_CITIES[c].name)}</h2>
            <p class="text-xs text-slate-400">${escapeHtml(LOCAL_CITIES[c].tagline)}</p>
            <a href="/locations/${c}" class="text-teal-400 text-xs font-bold hover:underline inline-block mt-2">View ${LOCAL_CITIES[c].name} Support &rarr;</a>
          </div>
        `).join('')}
      </div>
    </div>
  `
});

// Matrix of City & Services
const citySlugs = Object.keys(LOCAL_CITIES) as (keyof typeof LOCAL_CITIES)[];
const serviceSlugs = Object.keys(CLUSTER_SERVICES) as (keyof typeof CLUSTER_SERVICES)[];

citySlugs.forEach((city) => {
  const cityData = LOCAL_CITIES[city];
  pages.push({
    route: `locations/${city}`,
    title: `${cityData.name} IT Services & Hardware Maintenance | EVONIX`,
    description: `Rapid 30-45 minute on-site IT support and diagnostic lab services for businesses in ${cityData.name}.`,
    canonical: `${DOMAIN}/locations/${city}`,
    heading: `${cityData.name} IT Services & Industrial Support`,
    breadcrumb: [{ name: 'Home', url: '/' }, { name: 'Locations', url: '/locations' }, { name: cityData.name, url: `/locations/${city}` }],
    bodyHtml: `
      <div class="space-y-6 text-slate-300">
        <p class="text-base sm:text-lg text-slate-200">${escapeHtml(cityData.tagline)}</p>
        <h2 class="text-xl font-bold text-white mt-6 mb-3">Available Services in ${cityData.name}</h2>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          ${serviceSlugs.map(svc => `
            <a href="/locations/${city}/${svc}" class="p-4 rounded-xl bg-slate-900 hover:bg-slate-850 border border-slate-800 text-slate-200 hover:text-teal-400 text-sm font-semibold transition-colors">
              ${escapeHtml(CLUSTER_SERVICES[svc].name)}
            </a>
          `).join('')}
        </div>
      </div>
    `
  });

  serviceSlugs.forEach((svc) => {
    const serviceData = CLUSTER_SERVICES[svc];
    pages.push({
      route: `locations/${city}/${svc}`,
      title: `${serviceData.name} in ${cityData.name} | EVONIX`,
      description: `${serviceData.summary} Expert on-site engineering team serving ${cityData.name}.`,
      canonical: `${DOMAIN}/locations/${city}/${svc}`,
      heading: `${serviceData.name} in ${cityData.name}`,
      breadcrumb: [
        { name: 'Home', url: '/' },
        { name: 'Locations', url: '/locations' },
        { name: cityData.name, url: `/locations/${city}` },
        { name: serviceData.name, url: `/locations/${city}/${svc}` }
      ],
      bodyHtml: `
        <div class="space-y-6 text-slate-300">
          <p class="text-base sm:text-lg text-slate-200">${escapeHtml(serviceData.summary)}</p>
          <div class="p-6 rounded-2xl bg-slate-900 border border-teal-500/30">
            <h3 class="text-lg font-bold text-white mb-2">Got a question? Call us.</h3>
            <p class="text-sm text-slate-300 mb-4">We reply in 2 hours with direct technician support in ${cityData.name}.</p>
            <a href="tel:${cityData.phoneContact.replace(/\s+/g, '')}" class="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-sm">
              Call ${cityData.phoneContact}
            </a>
          </div>
        </div>
      `
    });
  });
});

// Guides & Blogs Hub
pages.push({
  route: 'guides',
  title: 'Tech Blogs, Hardware Guides & Field Case Studies | EVONIX Sialkot',
  description: 'Read 90+ engineering blogs, hardware repair tutorials, POS setup guides, and IT insights by EVONIX in Sialkot.',
  canonical: `${DOMAIN}/guides`,
  heading: 'Tech Blogs, Hardware Guides & Case Studies',
  subheading: '90+ Technical Articles by Dubai-Certified Engineers in Sialkot',
  breadcrumb: [{ name: 'Home', url: '/' }, { name: 'Guides & Blogs', url: '/guides' }],
  bodyHtml: `
    <div class="space-y-8 text-slate-300">
      <p class="text-base sm:text-lg text-slate-200">
        Practical diagnostics, component-level repairs, software blueprints, and local Sialkot factory case studies.
      </p>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        ${ALL_BLOGS.map(b => `
          <article class="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-3 flex flex-col justify-between">
            <div>
              <span class="text-xs font-bold text-teal-400 uppercase">${escapeHtml(b.categoryLabel || b.category)}</span>
              <h2 class="text-lg font-bold text-white mt-1 mb-2">
                <a href="/blog/${b.slug}" class="hover:text-teal-400">${escapeHtml(b.title)}</a>
              </h2>
              <p class="text-xs text-slate-400 line-clamp-3">${escapeHtml(b.excerpt || '')}</p>
            </div>
            <div class="pt-4 border-t border-slate-800 text-xs text-slate-500 flex items-center justify-between">
              <span>${escapeHtml(b.publishedDate || '2026-10')}</span>
              <a href="/blog/${b.slug}" class="text-teal-400 font-bold hover:underline">Read Guide &rarr;</a>
            </div>
          </article>
        `).join('')}
      </div>
    </div>
  `
});

// ==========================================
// 2. All 94 Technical Field Blogs
// ==========================================
ALL_BLOGS.forEach((blog) => {
  const contentHtml = formatMarkdownToHtml(blog.content);

  pages.push({
    route: `blog/${blog.slug}`,
    title: `${blog.title} | EVONIX Tech Guide`,
    description: blog.excerpt || blog.title,
    canonical: `${DOMAIN}/blog/${blog.slug}`,
    heading: blog.title,
    subheading: `${blog.categoryLabel || blog.category} &bull; ${blog.readTime || '6 min read'} &bull; Published ${blog.publishedDate || '2026-10-01'}`,
    breadcrumb: [
      { name: 'Home', url: '/' },
      { name: 'Guides', url: '/guides' },
      { name: blog.title, url: `/blog/${blog.slug}` }
    ],
    schemaType: 'BlogPosting',
    schemaJson: {
      '@context': 'https://schema.org',
      '@type': 'BlogPosting',
      headline: blog.title,
      description: blog.excerpt || blog.title,
      datePublished: blog.publishedDate || '2026-10-01',
      dateModified: blog.publishedDate || '2026-10-01',
      author: {
        '@type': 'Person',
        name: blog.author?.name || 'EVONIX Engineering Team'
      },
      publisher: {
        '@type': 'Organization',
        name: 'EVONIX TECHNOLOGIES',
        url: DOMAIN
      },
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': `${DOMAIN}/blog/${blog.slug}`
      }
    },
    bodyHtml: `
      <div class="space-y-6">
        <div class="p-6 rounded-2xl bg-slate-900 border border-slate-800 text-slate-300 text-sm leading-relaxed">
          <strong class="text-white block mb-1">Key Summary:</strong>
          ${escapeHtml(blog.excerpt || '')}
        </div>

        <div class="prose prose-invert max-w-none text-slate-300">
          ${contentHtml}
        </div>

        ${(blog.internalLinks && blog.internalLinks.length > 0) ? `
          <div class="p-6 rounded-2xl bg-slate-900 border border-slate-800 my-8">
            <h3 class="text-base font-bold text-white mb-3">Related Services &amp; Tools</h3>
            <ul class="space-y-2 text-sm text-teal-400">
              ${blog.internalLinks.map(link => `
                <li>&bull; <a href="/${link.toolPage || link.targetSection}" class="hover:underline">${escapeHtml(link.anchorText || link.label)}</a></li>
              `).join('')}
            </ul>
          </div>
        ` : ''}

        <div class="p-6 rounded-2xl bg-slate-900/80 border border-teal-500/30 my-8">
          <h3 class="text-xl font-bold text-white mb-2">Got a question? Call us.</h3>
          <p class="text-sm text-slate-300 mb-4">We reply in 2 hours with direct technician support.</p>
          <a href="/contact" class="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-sm">
            Contact evonix Engineering Desk
          </a>
        </div>
      </div>
    `
  });
});

// ==========================================
// 3. Non-Canonical Aliases (with Instant Meta Redirect)
// ==========================================
const aliasRedirects = [
  { route: 'guidelines', redirectTo: 'guides', canonical: `${DOMAIN}/guides`, title: 'Official Tech Guidelines | EVONIX Sialkot' },
  { route: 'guideline', redirectTo: 'guides', canonical: `${DOMAIN}/guides`, title: 'Tech Guidelines | EVONIX Sialkot' },
  { route: 'blogs', redirectTo: 'guides', canonical: `${DOMAIN}/guides`, title: 'Tech Blogs | EVONIX Sialkot' },
  { route: 'blog', redirectTo: 'guides', canonical: `${DOMAIN}/guides`, title: 'Tech Blog Archive | EVONIX Sialkot' },
  { route: 'guide', redirectTo: 'guides', canonical: `${DOMAIN}/guides`, title: 'Technical Guides | EVONIX Sialkot' },
  { route: 'invoice-generator', redirectTo: 'invoice', canonical: `${DOMAIN}/invoice`, title: 'Invoice Generator | EVONIX Sialkot' },
  { route: 'margin-calculator', redirectTo: 'ecommerce-calculator', canonical: `${DOMAIN}/ecommerce-calculator`, title: 'Margin Calculator | EVONIX Sialkot' },
];

aliasRedirects.forEach((ar) => {
  pages.push({
    route: ar.route,
    title: ar.title,
    description: 'This page has moved. You are being redirected to the primary canonical URL.',
    canonical: ar.canonical,
    heading: 'Redirecting to Official Page...',
    breadcrumb: [{ name: 'Home', url: '/' }, { name: 'Redirect', url: `/${ar.route}` }],
    isRedirect: true,
    redirectTo: ar.redirectTo,
    bodyHtml: `
      <div class="text-center py-12 space-y-4">
        <h2 class="text-xl font-bold text-white">This page has moved.</h2>
        <p class="text-slate-400">If you are not redirected automatically, please click below:</p>
        <a href="/${ar.redirectTo}" class="inline-block px-6 py-3 rounded-xl bg-teal-500 text-slate-950 font-bold text-sm hover:bg-teal-400">
          Continue to ${ar.redirectTo} &rarr;
        </a>
      </div>
    `
  });
});

// Also create aliases for all blogs (blogs/slug, guides/slug, guidelines/slug) with canonical to blog/slug
ALL_BLOGS.forEach((b) => {
  ['blogs', 'guides', 'guidelines'].forEach((prefix) => {
    pages.push({
      route: `${prefix}/${b.slug}`,
      title: `${b.title} | EVONIX Tech Guide`,
      description: b.excerpt || b.title,
      canonical: `${DOMAIN}/blog/${b.slug}`,
      heading: b.title,
      breadcrumb: [{ name: 'Home', url: '/' }, { name: 'Guides', url: '/guides' }, { name: b.title, url: `/blog/${b.slug}` }],
      isRedirect: true,
      redirectTo: `blog/${b.slug}`,
      bodyHtml: `
        <div class="text-center py-12 space-y-4">
          <p class="text-slate-400">Redirecting to primary canonical article...</p>
          <a href="/blog/${b.slug}" class="text-teal-400 font-bold hover:underline">Click here if not redirected &rarr;</a>
        </div>
      `
    });
  });
});

// Main execution function
function generateStaticPages() {
  const templatePath = path.join(DIST_DIR, 'index.html');
  if (!fs.existsSync(templatePath)) {
    console.error(`Dist index.html not found at ${templatePath}. Run vite build first.`);
    process.exit(1);
  }

  const baseHtml = fs.readFileSync(templatePath, 'utf-8');
  let createdCount = 0;

  for (const page of pages) {
    const targetDir = path.join(DIST_DIR, page.route);
    fs.mkdirSync(targetDir, { recursive: true });

    let modifiedHtml = baseHtml;

    // Title
    modifiedHtml = modifiedHtml.replace(
      /<title>.*?<\/title>/i,
      `<title>${escapeHtml(page.title)}</title>`
    );

    // Meta Description
    modifiedHtml = modifiedHtml.replace(
      /<meta\s+name="description"\s+content=".*?"\s*\/?>/i,
      `<meta name="description" content="${page.description.replace(/"/g, '&quot;')}" />`
    );

    // Canonical
    modifiedHtml = modifiedHtml.replace(
      /<link\s+rel="canonical"\s+href=".*?"\s*\/?>/i,
      `<link rel="canonical" href="${page.canonical}" />`
    );

    // OpenGraph
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

    // Meta refresh for redirects
    if (page.isRedirect && page.redirectTo) {
      modifiedHtml = modifiedHtml.replace(
        '</head>',
        `  <meta http-equiv="refresh" content="0; url=/${page.redirectTo}" />\n</head>`
      );
    }

    // Schema.org JSON-LD injection
    if (page.schemaJson) {
      const schemaScript = `\n  <script type="application/ld+json">\n${JSON.stringify(page.schemaJson, null, 2)}\n  </script>\n</head>`;
      modifiedHtml = modifiedHtml.replace('</head>', schemaScript);
    }

    // Build rich pre-rendered body inside <div id="root">
    const headerHtml = buildSeoHeader(page.route);
    const breadcrumbHtml = buildBreadcrumbsHtml(page.breadcrumb);
    const footerHtml = buildSeoFooter();

    const prerenderHtml = `
      <div id="root">
        <div class="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
          ${headerHtml}
          <main class="flex-1 max-w-5xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-10">
            ${breadcrumbHtml}
            <header class="mb-8 border-b border-slate-800 pb-6">
              <h1 class="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
                ${escapeHtml(page.heading)}
              </h1>
              ${page.subheading ? `
                <p class="text-sm sm:text-base text-teal-400 font-semibold mt-2">
                  ${escapeHtml(page.subheading)}
                </p>
              ` : ''}
            </header>
            <div class="seo-article-body">
              ${page.bodyHtml}
            </div>
          </main>
          ${footerHtml}
        </div>
      </div>
      <noscript>
        <div class="p-6 bg-slate-900 text-slate-200 border-b border-slate-700">
          <p class="font-bold text-white">JavaScript is disabled.</p>
          <p class="text-sm">This page was pre-rendered for search engines and accessibility. For interactive tools and live repair tracking, please enable JavaScript.</p>
        </div>
      </noscript>
    `.trim();

    modifiedHtml = modifiedHtml.replace('<div id="root"></div>', prerenderHtml);

    // Write file
    const targetFile = path.join(targetDir, 'index.html');
    fs.writeFileSync(targetFile, modifiedHtml, 'utf-8');
    createdCount++;
  }

  console.log(`Successfully generated ${createdCount} semantic pre-rendered static HTML routes in dist/!`);
}

generateStaticPages();
