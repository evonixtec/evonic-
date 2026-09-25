import { NavPageId } from '../components/Navbar';
import { BlogPost } from '../data/blogs';

export interface PageMetadata {
  title: string;
  description: string;
  ogTitle: string;
  ogDescription: string;
  ogType: 'website' | 'article';
  ogImage?: string;
  canonicalUrl: string;
  keywords: string[];
  structuredData?: object;
}

const BASE_URL = 'https://evonixtec.com';
const DEFAULT_OG_IMAGE = `${BASE_URL}/og-image.jpg`;

export const SIALKOT_PAGE_SEO: Record<NavPageId, PageMetadata> = {
  home: {
    title: 'EVONIX TECHNOLOGIES – Best IT Company & Software House in Sialkot',
    description: 'Leading IT company in Sialkot. Get custom website development, retail POS software, and doorstep laptop repair backed by 20+ years Dubai expertise. Call now.',
    ogTitle: 'EVONIX TECHNOLOGIES – Best IT Company & Software House in Sialkot',
    ogDescription: 'Custom website development, retail POS software, and computer repair in Sialkot with 20+ years Dubai engineering expertise now in Pakistan.',
    ogType: 'website',
    ogImage: DEFAULT_OG_IMAGE,
    canonicalUrl: `${BASE_URL}/`,
    keywords: [
      'IT company in Sialkot',
      'best software house in Sialkot',
      'website development Sialkot',
      'custom software development Sialkot',
      'retail POS system Sialkot',
      'computer repair in Sialkot',
      'laptop repairing Sialkot Cantt',
      'IT solutions Paris Road Sialkot',
      'Dubai IT experience in Pakistan',
    ],
    structuredData: {
      '@context': 'https://schema.org',
      '@type': 'LocalBusiness',
      name: 'EVONIX TECHNOLOGIES',
      image: DEFAULT_OG_IMAGE,
      url: `${BASE_URL}/`,
      telephone: '+92 326 3244002',
      email: 'evonixtec@gmail.com',
      priceRange: '$$',
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Paris Road & Cantt Hub',
        addressLocality: 'Sialkot',
        addressRegion: 'Punjab',
        postalCode: '51310',
        addressCountry: 'PK',
      },
      geo: {
        '@type': 'GeoCoordinates',
        latitude: 32.4945,
        longitude: 74.5229,
      },
      areaServed: [
        'Sialkot',
        'Sialkot Cantt',
        'Paris Road',
        'Small Industrial Estate Sialkot',
        'Sambrial',
        'Daska',
      ],
      description:
        'Professional Website Development, Custom Software, POS Systems, and Laptop & Printer Repair in Sialkot with 20+ years Dubai international experience.',
    },
  },

  services: {
    title: 'IT Services in Sialkot – Web, POS & Computer Repair | EVONIX',
    description: 'Professional IT services in Sialkot: custom website development, retail POS systems, and chip-level laptop & printer repair. Book certified tech support today.',
    ogTitle: 'IT Services in Sialkot – Web Development, POS & Laptop Repair',
    ogDescription: 'Full-suite Sialkot IT services: responsive web development, inventory POS software, and motherboard repair with 20+ years Dubai technical excellence.',
    ogType: 'website',
    ogImage: DEFAULT_OG_IMAGE,
    canonicalUrl: `${BASE_URL}/services`,
    keywords: [
      'IT services in Sialkot',
      'web development Sialkot',
      'website design company Sialkot',
      'custom POS software Sialkot',
      'point of sale retail Sialkot',
      'laptop repairing Sialkot',
      'printer repairing Sialkot',
      'motherboard chip level repair Sialkot',
      'CCTV camera installation Sialkot',
      'doorstep IT support Sialkot',
    ],
    structuredData: {
      '@context': 'https://schema.org',
      '@type': 'Service',
      serviceType: 'IT & Software Development Services',
      provider: {
        '@type': 'LocalBusiness',
        name: 'EVONIX TECHNOLOGIES',
        telephone: '+92 326 3244002',
        address: {
          '@type': 'PostalAddress',
          addressLocality: 'Sialkot',
          addressRegion: 'Punjab',
          addressCountry: 'PK',
        },
      },
      areaServed: {
        '@type': 'City',
        name: 'Sialkot',
      },
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: 'Sialkot IT & Computer Repair Services',
        itemListElement: [
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'Website & Web Application Development Sialkot',
            },
          },
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'Retail Point of Sale (POS) & ERP Software Sialkot',
            },
          },
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'Laptop & Desktop Motherboard Chip-Level Repair Sialkot',
            },
          },
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'Thermal Receipt & Laser Printer Repairing Sialkot',
            },
          },
        ],
      },
    },
  },

  portfolio: {
    title: 'IT Portfolio Sialkot – Web & Enterprise Deployments | EVONIX',
    description: 'Explore proven software and web development case studies for exporters and retail brands in Sialkot and Dubai. View our high-volume ERP and e-commerce work.',
    ogTitle: 'IT Portfolio Sialkot – Software & Web Projects by EVONIX',
    ogDescription: 'High-volume e-commerce systems, custom export ERP portals, and POS deployments delivered for UAE and Sialkot enterprise clients.',
    ogType: 'website',
    ogImage: DEFAULT_OG_IMAGE,
    canonicalUrl: `${BASE_URL}/portfolio`,
    keywords: [
      'IT portfolio Sialkot',
      'software projects Sialkot',
      'Sialkot export software case studies',
      'web development portfolio Sialkot',
      'sports goods ERP software Sialkot',
      'surgical instruments ERP Sialkot',
      'enterprise retail POS portfolio',
    ],
    structuredData: {
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      name: 'EVONIX Client Deployments & Software Portfolio Sialkot',
      description:
        'Showcase of enterprise software, e-commerce platforms, and retail POS installations across Dubai and Sialkot export sectors.',
      publisher: {
        '@type': 'LocalBusiness',
        name: 'EVONIX TECHNOLOGIES',
        url: `${BASE_URL}/`,
      },
    },
  },

  shop: {
    title: 'IT Hardware & POS Shop Sialkot – Laptops & Printers | EVONIX',
    description: 'Buy business laptops, touch POS terminals, 80mm thermal receipt printers, and barcode scanners in Sialkot with local warranty and doorstep setup. Order today.',
    ogTitle: 'IT Hardware & POS Shop Sialkot – Laptops, Printers & Scanners',
    ogDescription: 'Imported commercial laptops, touch POS machines, thermal receipt printers, and barcode scanners available in Sialkot with local technical warranty.',
    ogType: 'website',
    ogImage: DEFAULT_OG_IMAGE,
    canonicalUrl: `${BASE_URL}/shop`,
    keywords: [
      'buy laptop in Sialkot',
      'business laptop Sialkot',
      'refurbished laptops Sialkot Paris Road',
      'POS machine price in Sialkot',
      'thermal receipt printer Sialkot',
      'barcode scanner Sialkot',
      'touch screen POS terminal Sialkot',
      'computer hardware shop Sialkot',
    ],
    structuredData: {
      '@context': 'https://schema.org',
      '@type': 'Store',
      name: 'EVONIX IT Hardware & POS Equipment Shop Sialkot',
      description:
        'Certified business laptops, retail POS terminals, thermal receipt printers, and barcode scanners with localized Sialkot warranty and setup.',
      telephone: '+92 326 3244002',
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Paris Road & Cantt Hub',
        addressLocality: 'Sialkot',
        addressRegion: 'Punjab',
        addressCountry: 'PK',
      },
      priceRange: 'PKR',
    },
  },

  about: {
    title: 'About EVONIX – Dubai IT Engineering Heritage in Sialkot',
    description: 'Discover how EVONIX brings 20+ years of high-availability Dubai IT infrastructure engineering to Sialkot, powering local exporters, retailers, and businesses.',
    ogTitle: 'About EVONIX – Dubai IT Engineering Heritage in Sialkot',
    ogDescription: '20+ years of Dubai enterprise IT engineering now operating in Sialkot. Learn about our leadership, diagnostic lab, and commitment to international standards.',
    ogType: 'website',
    ogImage: DEFAULT_OG_IMAGE,
    canonicalUrl: `${BASE_URL}/about`,
    keywords: [
      'about EVONIX Technologies',
      'IT company in Sialkot profile',
      'Dubai IT experience in Pakistan',
      'IT leadership Sialkot',
      'computer diagnostic lab Sialkot',
      'IT consultants Sialkot Cantt',
      'top tech company Sialkot Punjab',
    ],
    structuredData: {
      '@context': 'https://schema.org',
      '@type': 'AboutPage',
      name: 'About EVONIX TECHNOLOGIES – Dubai Heritage in Sialkot',
      description:
        'Two decades of international engineering experience in Dubai, UAE, now operating as a premier IT services provider and computer diagnostic center in Sialkot, Pakistan.',
      mainEntity: {
        '@type': 'Organization',
        name: 'EVONIX TECHNOLOGIES',
        url: `${BASE_URL}/`,
        foundingLocation: 'Dubai, United Arab Emirates',
        address: {
          '@type': 'PostalAddress',
          addressLocality: 'Sialkot',
          addressRegion: 'Punjab',
          addressCountry: 'PK',
        },
      },
    },
  },

  guides: {
    title: '80+ Sialkot IT Guides & Field Case Studies – Web, POS & Laptop Repair | EVONIX',
    description: 'Free technical knowledge base for Sialkot businesses: 80+ step-by-step guides on web development, Daska Road & Rangpura field case studies, retail POS, and chip-level laptop care.',
    ogTitle: '80+ Technical IT Guides & Field Case Studies in Sialkot – EVONIX Hub',
    ogDescription: 'Free engineering tutorials, Daska Road & Rangpura on-site field reports, laptop motherboard repair, and POS solutions written for Sialkot business owners.',
    ogType: 'website',
    ogImage: DEFAULT_OG_IMAGE,
    canonicalUrl: `${BASE_URL}/guides`,
    keywords: [
      'IT troubleshooting guides Sialkot',
      'computer repair guide Sialkot',
      'laptop repairing Daska Road Sialkot',
      'doorstep laptop repair Rangpura',
      'POS printer error fix Pakistan',
      'laptop motherboard repair guide Sialkot',
      'web development guide Sialkot',
      'Sialkot IT knowledge hub',
      'Daska Road IT solutions Sialkot',
      'Rangpura IT support Sialkot',
    ],
    structuredData: {
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      name: '80+ Sialkot Technical IT Guides & Field Case Studies Hub',
      description:
        'Comprehensive technical knowledge base, Daska Road & Rangpura field case studies, and FAQs covering web development, point of sale troubleshooting, motherboard restoration, and printer maintenance in Sialkot.',
      publisher: {
        '@type': 'LocalBusiness',
        name: 'EVONIX TECHNOLOGIES',
        url: `${BASE_URL}/`,
      },
    },
  },

  contact: {
    title: 'Contact IT Company Sialkot – On-Site Tech Support | EVONIX',
    description: 'Need urgent IT support or on-site laptop repair in Sialkot? Contact our Paris Road lab or book certified doorstep field technicians across Sialkot Cantt.',
    ogTitle: 'Contact EVONIX – On-Site IT Support & Computer Repair Sialkot',
    ogDescription: 'Get in touch with our certified engineers on Paris Road, Sialkot. Rapid on-site technician dispatch across Cantt, Sambrial, Daska Road, and Industrial Estates.',
    ogType: 'website',
    ogImage: DEFAULT_OG_IMAGE,
    canonicalUrl: `${BASE_URL}/contact`,
    keywords: [
      'contact IT company Sialkot',
      'computer technician home service Sialkot',
      'on-site IT support Sialkot',
      'laptop repair contact Paris Road Sialkot',
      'IT support WhatsApp Sialkot',
      'urgent computer repair Sialkot Cantt',
      'IT engineer visit Sialkot',
    ],
    structuredData: {
      '@context': 'https://schema.org',
      '@type': 'ContactPage',
      name: 'Contact EVONIX TECHNOLOGIES Sialkot',
      description:
        'Book certified doorstep computer repair technicians and consult software engineers at our Paris Road & Cantt lab in Sialkot, Punjab.',
      mainEntity: {
        '@type': 'LocalBusiness',
        name: 'EVONIX TECHNOLOGIES',
        telephone: '+92 326 3244002',
        email: 'evonixtec@gmail.com',
        address: {
          '@type': 'PostalAddress',
          streetAddress: 'Paris Road & Cantt Hub',
          addressLocality: 'Sialkot',
          addressRegion: 'Punjab',
          postalCode: '51310',
          addressCountry: 'PK',
        },
        geo: {
          '@type': 'GeoCoordinates',
          latitude: 32.4945,
          longitude: 74.5229,
        },
        openingHoursSpecification: [
          {
            '@type': 'OpeningHoursSpecification',
            dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
            opens: '09:00',
            closes: '20:00',
          },
        ],
      },
    },
  },
};

/**
 * Creates or updates a DOM <meta> tag
 */
function updateMetaTag(attributeName: 'name' | 'property', attributeValue: string, content: string) {
  if (typeof document === 'undefined') return;
  let element = document.querySelector(`meta[${attributeName}="${attributeValue}"]`);
  if (!element) {
    element = document.createElement('meta');
    element.setAttribute(attributeName, attributeValue);
    document.head.appendChild(element);
  }
  element.setAttribute('content', content);
}

/**
 * Creates or updates the canonical link tag
 */
function updateCanonicalLink(url: string) {
  if (typeof document === 'undefined') return;
  let link = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
  if (!link) {
    link = document.createElement('link');
    link.setAttribute('rel', 'canonical');
    document.head.appendChild(link);
  }
  link.setAttribute('href', url);
}

/**
 * Injects or replaces sub-page Schema.org JSON-LD structured data
 */
function updateSubpageStructuredData(data?: object) {
  if (typeof document === 'undefined') return;
  const scriptId = 'evonix-subpage-schema';
  let script = document.getElementById(scriptId) as HTMLScriptElement | null;

  if (!data) {
    if (script) script.remove();
    return;
  }

  if (!script) {
    script = document.createElement('script');
    script.id = scriptId;
    script.type = 'application/ld+json';
    document.head.appendChild(script);
  }
  script.textContent = JSON.stringify(data);
}

/**
 * Synchronizes document title, meta descriptions, Open Graph, Twitter cards,
 * canonical URL, and Schema.org for a given sub-page.
 */
export function applyPageSEO(pageId: NavPageId) {
  const meta = SIALKOT_PAGE_SEO[pageId] || SIALKOT_PAGE_SEO.home;

  // Title
  document.title = meta.title;

  // Primary Meta
  updateMetaTag('name', 'description', meta.description);
  updateMetaTag('name', 'keywords', meta.keywords.join(', '));

  // Open Graph
  updateMetaTag('property', 'og:title', meta.ogTitle);
  updateMetaTag('property', 'og:description', meta.ogDescription);
  updateMetaTag('property', 'og:url', meta.canonicalUrl);
  updateMetaTag('property', 'og:type', meta.ogType);
  updateMetaTag('property', 'og:site_name', 'EVONIX TECHNOLOGIES');
  updateMetaTag('property', 'og:locale', 'en_PK');
  if (meta.ogImage) {
    updateMetaTag('property', 'og:image', meta.ogImage);
  }

  // Twitter / X
  updateMetaTag('name', 'twitter:card', 'summary_large_image');
  updateMetaTag('name', 'twitter:title', meta.ogTitle);
  updateMetaTag('name', 'twitter:description', meta.ogDescription);
  if (meta.ogImage) {
    updateMetaTag('name', 'twitter:image', meta.ogImage);
  }

  // Canonical
  updateCanonicalLink(meta.canonicalUrl);

  // Geo / Local Sialkot meta tags
  updateMetaTag('name', 'geo.region', 'PK-PB');
  updateMetaTag('name', 'geo.placename', 'Sialkot');
  updateMetaTag('name', 'geo.position', '32.4945;74.5229');
  updateMetaTag('name', 'ICBM', '32.4945, 74.5229');

  // Structured Data
  updateSubpageStructuredData(meta.structuredData);
}

/**
 * Sets dynamic SEO for an active blog / technical guide post reader view
 */
export function applyBlogPostSEO(blog: BlogPost) {
  const pageTitle = `${blog.title.slice(0, 48)} | EVONIX Sialkot`;
  const pageDesc = blog.excerpt.length > 155 ? `${blog.excerpt.slice(0, 152)}...` : blog.excerpt;
  const canonicalUrl = `${BASE_URL}/#blog-${blog.id}`;

  document.title = pageTitle;

  updateMetaTag('name', 'description', pageDesc);
  updateMetaTag(
    'name',
    'keywords',
    [
      ...blog.targetKeywords,
      ...blog.tags,
      'Sialkot IT guide',
      'computer repair Sialkot',
      'EVONIX Technologies',
    ].join(', ')
  );

  updateMetaTag('property', 'og:title', `${blog.title} – EVONIX Sialkot`);
  updateMetaTag('property', 'og:description', pageDesc);
  updateMetaTag('property', 'og:url', canonicalUrl);
  updateMetaTag('property', 'og:type', 'article');
  updateMetaTag('property', 'og:site_name', 'EVONIX TECHNOLOGIES');
  updateMetaTag('property', 'og:locale', 'en_PK');
  updateMetaTag('property', 'og:image', DEFAULT_OG_IMAGE);

  updateMetaTag('name', 'twitter:card', 'summary_large_image');
  updateMetaTag('name', 'twitter:title', `${blog.title} – EVONIX Sialkot`);
  updateMetaTag('name', 'twitter:description', pageDesc);
  updateMetaTag('name', 'twitter:image', DEFAULT_OG_IMAGE);

  updateCanonicalLink(canonicalUrl);

  // Article Schema
  updateSubpageStructuredData({
    '@context': 'https://schema.org',
    '@type': 'TechArticle',
    headline: blog.title,
    description: blog.excerpt,
    datePublished: '2025-01-15',
    dateModified: '2026-03-01',
    author: {
      '@type': 'Organization',
      name: 'EVONIX TECHNOLOGIES Diagnostic Team',
      url: BASE_URL,
    },
    publisher: {
      '@type': 'LocalBusiness',
      name: 'EVONIX TECHNOLOGIES',
      url: BASE_URL,
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Sialkot',
        addressRegion: 'Punjab',
        addressCountry: 'PK',
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': canonicalUrl,
    },
    about: {
      '@type': 'Thing',
      name: blog.categoryLabel,
    },
    keywords: blog.targetKeywords.join(', '),
  });
}
