/**
 * Blog Image Mapping & Visual Asset Engine
 * Provides deterministic, topic-relevant, high-resolution visuals for all 85+ evonix technical blogs.
 * All brand references strictly use lowercase "evonix" or "evonix technologies".
 * Uses web-accessible paths from /public/images/ so Node.js scripts (sitemap/SSG) and Vite work seamlessly.
 */

import { BlogPost, BlogInternalLink } from '../data/blogs/types';

export interface BlogVisualInfo {
  imageUrl: string;
  imageAlt: string;
}

// Universal Barcode Studio link to be embedded into blog internal links
export const BARCODE_STUDIO_INTERNAL_LINK: BlogInternalLink = {
  label: 'Export Barcode Label Generator Studio',
  targetSection: 'export-barcode-studio',
  anchorText: 'Open Barcode Label Generator Studio',
  toolPage: 'export-barcode-studio',
  description: 'Generate GS1-128, Code128, and ISO shipping carton labels for Sialkot surgical, leather & sports exports.',
};

export const INVOICE_HUB_INTERNAL_LINK: BlogInternalLink = {
  label: 'Zero-Database Online Invoice Maker',
  targetSection: 'invoice',
  anchorText: 'Create Free Online Invoice with Code128 Barcode',
  toolPage: 'invoice',
  description: '100% free client-side invoice editor with automated barcode generation and PDF print export.',
};

export const CBM_CALCULATOR_INTERNAL_LINK: BlogInternalLink = {
  label: 'Export CBM & Freight Calculator',
  targetSection: 'cbm-calculator',
  anchorText: 'Calculate CBM & Air Volumetric Weight',
  toolPage: 'cbm-calculator',
  description: 'Compute carton volume in CBM and container packing capacity instantly for Sialkot exports.',
};

export const DEV_CALCULATOR_INTERNAL_LINK: BlogInternalLink = {
  label: 'Dedicated Developer Cost Calculator',
  targetSection: 'developer-cost-calculator',
  anchorText: 'Calculate Offshore Developer Savings',
  toolPage: 'developer-cost-calculator',
  description: 'Compare USA vs evonix rates and save 72% on dedicated remote software engineers.',
};

// Available static visual assets in /public/images/
const VISUAL_ASSETS = {
  // Barcode & Shipping Labels
  barcodeStudioShipping: '/images/blogs/barcode_studio_shipping.svg',
  barcodeScannerPhoto: '/images/shop_barcode_scanner_1791023955798.jpg',
  barcodeScannerSvg: '/images/shop/shop_barcode_scanner.svg',
  thermalPaperRolls: '/images/shop/shop_thermal_paper.jpg',

  // Motherboard & Micro-Soldering
  motherboardRepairHuman: '/images/motherboard_repair_human_1791024094445.jpg',
  motherboardMicroSolderingSvg: '/images/blogs/motherboard_micro_soldering.svg',
  motherboardWorkbench: '/images/services/laptop-motherboard-repair.jpg',

  // Laser Printers & Fusers
  laserPrinterFuserSvg: '/images/blogs/laser_printer_fuser.svg',
  hpPaperJamHuman: '/images/hp_paper_jam_1791024057573.jpg',
  hpPaperJamWorkbench: '/images/services/hp-paper-jam.jpg',
  shopLaserPrinter: '/images/shop_laser_printer_1791023842135.jpg',

  // Inkjet & Printheads
  canonInkRepairHuman: '/images/canon_ink_repair_1791024077688.jpg',
  canonInkWorkbench: '/images/services/canon-ink-leakage.jpg',

  // Thermal Receipt Printers & POS
  posThermalSetupHuman: '/images/pos_thermal_setup_1791024110070.jpg',
  posThermalWorkbench: '/images/services/pos-thermal-printer-setup.jpg',
  shopThermalPrinter: '/images/shop_thermal_printer_1791023864164.jpg',
  shopPosTouchscreen: '/images/shop_pos_touchscreen_1791023884127.jpg',
  retailPosOfflineDbSvg: '/images/blogs/retail_pos_offline_db.svg',
  portfolioPosRetail: '/images/portfolio/portfolio_pos_retail.jpg',

  // WeBOC Customs & Network
  webocCustomsServerSvg: '/images/blogs/weboc_customs_server.svg',
  onsiteTechnicianHuman: '/images/onsite_technician_human_1791024124026.jpg',
  onsiteItSupport: '/images/services/onsite-it-support.jpg',

  // Web & UI/UX Development
  reactViteExportWebSvg: '/images/blogs/react_vite_export_web.svg',
  serviceWebDev: '/images/service_web_dev_1790044711551.jpg',
  serviceSoftwarePos: '/images/service_software_pos_1790044733191.jpg',
  heroDubaiTech: '/images/hero_dubai_tech_1790044690065.jpg',

  // Hardware Upgrades: SSD, RAM, Laptops
  shopNvmeSsd: '/images/shop/shop_nvme_ssd.jpg',
  shopBusinessLaptop: '/images/shop_business_laptop_1791023903828.jpg',
  shopDesktopPc: '/images/shop/shop_desktop_pc.jpg',

  // Portfolios
  portfolioEcommerce: '/images/portfolio/portfolio_ecommerce.jpg',
  portfolioRestaurant: '/images/portfolio/portfolio_restaurant.jpg',
  portfolioRestaurantKds: '/images/portfolio/portfolio_restaurant_kds.jpg',
  portfolioRealestate: '/images/portfolio/portfolio_realestate.jpg',
  portfolioCorporate: '/images/portfolio/portfolio_corporate.jpg',
  portfolioMobileRepair: '/images/portfolio/portfolio_mobile_repair.jpg',
};

/**
 * Deterministically assigns a unique, topic-relevant image for every blog
 */
export function getBlogVisual(blog: Pick<BlogPost, 'id' | 'slug' | 'category' | 'tags' | 'title'>): BlogVisualInfo {
  const slug = (blog.slug || '').toLowerCase();
  const title = (blog.title || '').toLowerCase();
  const tagsStr = (Array.isArray(blog.tags) ? blog.tags.join(' ') : '').toLowerCase();
  const combined = `${slug} ${title} ${tagsStr}`;

  // 1. Barcode, Shipping Labels, QR code & Packing
  if (combined.includes('barcode') || combined.includes('shipping label') || combined.includes('carton') || combined.includes('labeling') || combined.includes('thermal roll') || combined.includes('gs1')) {
    if (combined.includes('carton') || combined.includes('shipping label') || combined.includes('export')) {
      return {
        imageUrl: VISUAL_ASSETS.barcodeStudioShipping,
        imageAlt: `evonix technologies - Export shipping carton barcode label studio with GS1-128 compliance for ${blog.title}`,
      };
    }
    if (combined.includes('scanner') || combined.includes('pos')) {
      return {
        imageUrl: VISUAL_ASSETS.barcodeScannerPhoto,
        imageAlt: `evonix technologies - High-speed omnidirectional 2D barcode scanner and inventory tracking for ${blog.title}`,
      };
    }
    return {
      imageUrl: VISUAL_ASSETS.thermalPaperRolls,
      imageAlt: `evonix technologies - High-grade thermal barcode paper rolls and label printing for ${blog.title}`,
    };
  }

  // 2. Motherboard, Short Circuit, Micro-Soldering, Capacitors & Power Rails
  if (combined.includes('motherboard') || combined.includes('short circuit') || combined.includes('micro-soldering') || combined.includes('19v') || combined.includes('vcore') || combined.includes('chip-level') || combined.includes('bga') || combined.includes('multimeter') || combined.includes('pcb')) {
    if (combined.includes('bench') || combined.includes('injection') || combined.includes('camera')) {
      return {
        imageUrl: VISUAL_ASSETS.motherboardRepairHuman,
        imageAlt: `evonix technologies - Chip-level technician performing motherboard micro-soldering for ${blog.title}`,
      };
    }
    if (combined.includes('schematic') || combined.includes('circuit')) {
      return {
        imageUrl: VISUAL_ASSETS.motherboardMicroSolderingSvg,
        imageAlt: `evonix technologies - Precision PCB schematic and voltage rail diagnosis diagram for ${blog.title}`,
      };
    }
    return {
      imageUrl: VISUAL_ASSETS.motherboardWorkbench,
      imageAlt: `evonix technologies - Hardware clean bench for laptop motherboard repair for ${blog.title}`,
    };
  }

  // 3. Laser Printers, Paper Jam, Fuser Film, Pickup Roller
  if (combined.includes('fuser') || combined.includes('paper jam') || combined.includes('roller') || combined.includes('laserjet') || combined.includes('hp 05a') || combined.includes('toner')) {
    if (combined.includes('film') || combined.includes('fuser') || combined.includes('assembly')) {
      return {
        imageUrl: VISUAL_ASSETS.laserPrinterFuserSvg,
        imageAlt: `evonix technologies - Laser printer fuser sleeve and heating element schematic for ${blog.title}`,
      };
    }
    if (combined.includes('jam') || combined.includes('roller')) {
      return {
        imageUrl: VISUAL_ASSETS.hpPaperJamHuman,
        imageAlt: `evonix technologies - Printer technician clearing paper jam and replacing pickup roller for ${blog.title}`,
      };
    }
    return {
      imageUrl: VISUAL_ASSETS.shopLaserPrinter,
      imageAlt: `evonix technologies - Heavy-duty enterprise laser printer maintenance for ${blog.title}`,
    };
  }

  // 4. Canon Inkjet, Printhead, CISS, Waste Ink Tank
  if (combined.includes('canon') || combined.includes('ink') || combined.includes('printhead') || combined.includes('ciss') || combined.includes('waste ink') || combined.includes('pixma')) {
    if (combined.includes('printhead') || combined.includes('clog')) {
      return {
        imageUrl: VISUAL_ASSETS.canonInkRepairHuman,
        imageAlt: `evonix technologies - Ultrasonic printhead cleaning and micro-nozzle de-clogging for ${blog.title}`,
      };
    }
    return {
      imageUrl: VISUAL_ASSETS.canonInkWorkbench,
      imageAlt: `evonix technologies - Continuous Ink Supply System (CISS) tube de-aeration for ${blog.title}`,
    };
  }

  // 5. Thermal Receipt Printers, POS Receipt, Roll Jam
  if (combined.includes('thermal printer') || combined.includes('receipt') || combined.includes('80mm') || combined.includes('cutter')) {
    if (combined.includes('setup') || combined.includes('counter')) {
      return {
        imageUrl: VISUAL_ASSETS.posThermalSetupHuman,
        imageAlt: `evonix technologies - Thermal receipt printer installation and auto-cutter calibration for ${blog.title}`,
      };
    }
    return {
      imageUrl: VISUAL_ASSETS.shopThermalPrinter,
      imageAlt: `evonix technologies - High-speed 80mm ESC/POS thermal receipt printer hardware for ${blog.title}`,
    };
  }

  // 6. Retail POS Software, Billing, Offline Sync, Supermarket Checkout
  if (combined.includes('pos') || combined.includes('retail billing') || combined.includes('cashier') || combined.includes('supermarket') || combined.includes('counter') || combined.includes('offline-first')) {
    if (combined.includes('offline') || combined.includes('sync') || combined.includes('sqlite') || combined.includes('indexdb')) {
      return {
        imageUrl: VISUAL_ASSETS.retailPosOfflineDbSvg,
        imageAlt: `evonix technologies - Offline-first retail POS database architecture with auto cloud sync for ${blog.title}`,
      };
    }
    if (combined.includes('terminal') || combined.includes('touch')) {
      return {
        imageUrl: VISUAL_ASSETS.shopPosTouchscreen,
        imageAlt: `evonix technologies - All-in-one capacitive touch POS billing station for ${blog.title}`,
      };
    }
    return {
      imageUrl: VISUAL_ASSETS.portfolioPosRetail,
      imageAlt: `evonix technologies - Multi-counter retail supermarket inventory and billing screen for ${blog.title}`,
    };
  }

  // 7. WeBOC, Customs, Dry Port, Server Rack, Generator, UPS
  if (combined.includes('weboc') || combined.includes('customs') || combined.includes('sambrial') || combined.includes('server') || combined.includes('generator') || combined.includes('ups') || combined.includes('corridor') || combined.includes('fiber') || combined.includes('lan')) {
    if (combined.includes('weboc') || combined.includes('server') || combined.includes('ups')) {
      return {
        imageUrl: VISUAL_ASSETS.webocCustomsServerSvg,
        imageAlt: `evonix technologies - WeBOC customs server rack, dual-WAN firewall and online UPS setup for ${blog.title}`,
      };
    }
    return {
      imageUrl: VISUAL_ASSETS.portfolioCorporate,
      imageAlt: `evonix technologies - Corporate IT infrastructure and enterprise data networking for ${blog.title}`,
    };
  }

  // 8. B2B Export Website, React, Vite, Web Design, UI/UX, Catalog
  if (combined.includes('react') || combined.includes('vite') || combined.includes('website') || combined.includes('ui/ux') || combined.includes('catalog') || combined.includes('web design') || combined.includes('frontend') || combined.includes('typography')) {
    if (combined.includes('b2b') || combined.includes('export') || combined.includes('catalog')) {
      return {
        imageUrl: VISUAL_ASSETS.reactViteExportWebSvg,
        imageAlt: `evonix technologies - High-speed React and Vite B2B exporter product catalog website for ${blog.title}`,
      };
    }
    return {
      imageUrl: VISUAL_ASSETS.serviceWebDev,
      imageAlt: `evonix technologies - Clean responsive frontend design and web engineering for ${blog.title}`,
    };
  }

  // 9. Laptop Overheating, Thermal Paste, Fan Cleaning, CPU Throttling
  if (combined.includes('thermal paste') || combined.includes('overheating') || combined.includes('fan') || combined.includes('cooling') || combined.includes('throttle') || combined.includes('heat pipe')) {
    return {
      imageUrl: VISUAL_ASSETS.motherboardWorkbench,
      imageAlt: `evonix technologies - Laptop CPU thermal paste replacement and copper heat sink servicing for ${blog.title}`,
    };
  }

  // 10. SSD, NVMe, RAM, Speedup, Windows Clone
  if (combined.includes('ssd') || combined.includes('nvme') || combined.includes('ram') || combined.includes('clone') || combined.includes('speed') || combined.includes('boot')) {
    if (combined.includes('nvme') || combined.includes('ssd') || combined.includes('m.2')) {
      return {
        imageUrl: VISUAL_ASSETS.shopNvmeSsd,
        imageAlt: `evonix technologies - Ultra-fast PCIe NVMe M.2 SSD installation and system clone for ${blog.title}`,
      };
    }
    return {
      imageUrl: VISUAL_ASSETS.shopDesktopPc,
      imageAlt: `evonix technologies - Business workstation performance tuning and RAM expansion for ${blog.title}`,
    };
  }

  // 11. E-Commerce, Multi-Currency, Stripe, Shopify, Daraz
  if (combined.includes('ecommerce') || combined.includes('e-commerce') || combined.includes('store') || combined.includes('cart') || combined.includes('stripe') || combined.includes('daraz') || combined.includes('shopify')) {
    return {
      imageUrl: VISUAL_ASSETS.portfolioEcommerce,
      imageAlt: `evonix technologies - Global multi-currency B2B export e-commerce portal engineering for ${blog.title}`,
    };
  }

  // 12. Restaurant & Food POS
  if (combined.includes('restaurant') || combined.includes('cafe') || combined.includes('food') || combined.includes('kitchen') || combined.includes('kds')) {
    if (combined.includes('kitchen') || combined.includes('kds')) {
      return {
        imageUrl: VISUAL_ASSETS.portfolioRestaurantKds,
        imageAlt: `evonix technologies - Restaurant Kitchen Display System (KDS) order sync for ${blog.title}`,
      };
    }
    return {
      imageUrl: VISUAL_ASSETS.portfolioRestaurant,
      imageAlt: `evonix technologies - Modern restaurant table order and POS billing layout for ${blog.title}`,
    };
  }

  // 13. Doorstep Technician, Paris Road, Daska Road, Factory Visit
  if (combined.includes('doorstep') || combined.includes('onsite') || combined.includes('on-site') || combined.includes('technician') || combined.includes('paris road') || combined.includes('daska road') || combined.includes('cantt') || combined.includes('kashmir road')) {
    return {
      imageUrl: VISUAL_ASSETS.onsiteTechnicianHuman,
      imageAlt: `evonix technologies - Certified doorstep field engineer visiting Sialkot factory for ${blog.title}`,
    };
  }

  // 14. Mobile Repair
  if (combined.includes('mobile') || combined.includes('phone') || combined.includes('screen') || combined.includes('charging port')) {
    return {
      imageUrl: VISUAL_ASSETS.portfolioMobileRepair,
      imageAlt: `evonix technologies - Precision mobile device chip repair and diagnostic station for ${blog.title}`,
    };
  }

  // 15. Real Estate / Property
  if (combined.includes('real estate') || combined.includes('property') || combined.includes('housing') || combined.includes('society')) {
    return {
      imageUrl: VISUAL_ASSETS.portfolioRealestate,
      imageAlt: `evonix technologies - Real estate directory and property portal development for ${blog.title}`,
    };
  }

  // 16. Business Laptops
  if (combined.includes('laptop') || combined.includes('dell') || combined.includes('thinkpad') || combined.includes('elitebook')) {
    return {
      imageUrl: VISUAL_ASSETS.shopBusinessLaptop,
      imageAlt: `evonix technologies - Imported business laptops tested with local Sialkot warranty for ${blog.title}`,
    };
  }

  // Fallback defaults per category
  if (blog.category === 'hardware-repair') {
    return {
      imageUrl: VISUAL_ASSETS.motherboardRepairHuman,
      imageAlt: `evonix technologies - Hardware diagnostic workbench and precision repair for ${blog.title}`,
    };
  }

  if (blog.category === 'software-dev') {
    return {
      imageUrl: VISUAL_ASSETS.serviceSoftwarePos,
      imageAlt: `evonix technologies - Enterprise custom software development and retail POS for ${blog.title}`,
    };
  }

  return {
    imageUrl: VISUAL_ASSETS.serviceWebDev,
    imageAlt: `evonix technologies - Professional digital engineering and web development for ${blog.title}`,
  };
}

/**
 * Enriches any blog post with:
 * 1. Deterministic, unique, topic-relevant image (imageUrl & imageAlt)
 * 2. Barcode Label Generator Studio internal linking
 * 3. Lowercase evonix branding in metaTitle, tags, and content
 */
export function enrichBlogPost(rawBlog: BlogPost): BlogPost {
  const visual = getBlogVisual(rawBlog);

  // Clean brand name strictly to lowercase evonix / evonix technologies
  const cleanBrand = (text: string) =>
    (text || '')
      .replace(/\bEVONIX TECHNOLOGIES\b/gi, 'evonix technologies')
      .replace(/\bEVONIX\b/gi, 'evonix');

  const cleanedMetaTitle = cleanBrand(rawBlog.metaTitle || rawBlog.title);
  const cleanedMetaDescription = cleanBrand(rawBlog.metaDescription || rawBlog.excerpt);
  const cleanedTags = (rawBlog.tags || []).map((t) => cleanBrand(t));

  // Build internal links: ALWAYS ensure Barcode Label Studio is present
  const existingLinks = Array.isArray(rawBlog.internalLinks) ? [...rawBlog.internalLinks] : [];
  const hasBarcodeLink = existingLinks.some(
    (l) => l.targetSection === 'export-barcode-studio' || (l.label || '').toLowerCase().includes('barcode')
  );

  if (!hasBarcodeLink) {
    existingLinks.unshift(BARCODE_STUDIO_INTERNAL_LINK);
  }

  // Also ensure Invoice Hub or CBM or Developer Cost link is available for contextual depth
  const hasInvoiceLink = existingLinks.some(
    (l) => l.targetSection === 'invoice' || (l.label || '').toLowerCase().includes('invoice')
  );
  if (!hasInvoiceLink && (rawBlog.category === 'software-dev' || rawBlog.category === 'web-graphics')) {
    existingLinks.push(INVOICE_HUB_INTERNAL_LINK);
  }

  const hasCbmLink = existingLinks.some(
    (l) => l.targetSection === 'cbm-calculator' || (l.label || '').toLowerCase().includes('cbm')
  );
  if (!hasCbmLink && rawBlog.category === 'software-dev') {
    existingLinks.push(CBM_CALCULATOR_INTERNAL_LINK);
  }

  return {
    ...rawBlog,
    imageUrl: rawBlog.imageUrl || visual.imageUrl,
    imageAlt: rawBlog.imageAlt || visual.imageAlt,
    metaTitle: cleanedMetaTitle,
    metaDescription: cleanedMetaDescription,
    tags: cleanedTags,
    internalLinks: existingLinks,
  };
}
