import React from 'react';
import { GLOBAL_BLOGS_DATA } from '../config/blogsList';

export default function FooterLinks() {
  // Sialkot Localized Sells & Service Branches Area Clusters Array
  const locationLinks = [
    { name: "Daska IT Support Node", path: "/locations/daska" },
    { name: "Daska Industrial Hardware", path: "/locations/daska/hardware-maintenance" },
    { name: "Daska POS & Inventory", path: "/locations/daska/pos-systems" },
    { name: "Sambrial Laptop Repair", path: "/locations/sambrial/laptop-repair" },
    { name: "Sambrial Export Zone", path: "/locations/sambrial" },
    { name: "Sambrial IT Consultancy", path: "/locations/sambrial/it-consultancy" },
    { name: "Wazirabad Tech Hub", path: "/locations/wazirabad" },
    { name: "Wazirabad Web Portals", path: "/locations/wazirabad/web-development" },
    { name: "Wazirabad Hardware Care", path: "/locations/wazirabad/hardware-maintenance" },
    { name: "Wazirabad POS Solutions", path: "/locations/wazirabad/pos-systems" },
  ];

  // International Premium High-CPC Finance Calculators Web Tools
  const toolLinks = [
    { name: "eBay Fee & Profit Builder", path: "/ebay-fee-calculator" },
    { name: "TikTok Shop Fee Calculator", path: "/tiktok-shop-fee-calculator" },
    { name: "Amazon FBA Fee Calculator", path: "/amazon-fba-calculator" },
    { name: "Shopify Fee Calculator", path: "/shopify-fee-calculator" },
    { name: "Stripe Processing Fee Calculator", path: "/stripe-fee-calculator" },
    { name: "Temu Seller Fee Calculator", path: "/temu-seller-calculator" },
    { name: "Sialkot Export ERP Suite", path: "/sialkot-export-erp" },
    { name: "Trend Intelligence Suite", path: "/trend-intelligence-suite" },
    { name: "Global Invoice Generator", path: "/invoice" },
    { name: "E-Commerce Margin Calculator", path: "/ecommerce-calculator" },
    { name: "B2B Packing CBM Engine", path: "/cbm-calculator" },
    { name: "Developer Sourcing Calculator", path: "/hire-dedicated-developer-cost-calculator" },
    { name: "Website AI Visibility Checker", path: "/ai-visibility-checker" },
    { name: "Desktop Software Setup Guide", path: "/installation-guide" },
  ];

  const handleNav = (e: React.MouseEvent<HTMLAnchorElement>, path: string) => {
    if (!e.ctrlKey && !e.metaKey && !e.shiftKey && !e.altKey && path.startsWith('/')) {
      e.preventDefault();
      window.history.pushState({}, '', path);
      window.dispatchEvent(new PopStateEvent('popstate'));
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="w-full bg-slate-900 text-slate-400 py-12 border-t border-slate-800 print:hidden font-sans">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        
        {/* COLUMN 1: CORPORATE FOOTPRINT SUMMARY */}
        <div className="space-y-3">
          <h4 className="text-white font-black text-sm uppercase tracking-wider">Evonix Technologies</h4>
          <p className="text-xs leading-relaxed text-slate-400 max-w-sm">
            Premium international software utilities and IT consultancy based in Sialkot, Pakistan. Built for fast local support and global zero-database tools.
          </p>
          <div className="text-[10px] text-slate-500 font-mono">
            System Synchronization Check: October 2026
          </div>
          <div className="pt-2 text-xs">
            <span className="text-slate-300 font-semibold block mb-1">Direct Help Desk:</span>
            <p className="text-slate-400 text-[11px]">Got a question? Call us. We reply in 2 hours.</p>
          </div>
        </div>

        {/* COLUMN 2: REGIONAL SIALKOT LOCATIONS SERVICE PATHS */}
        <div className="space-y-3">
          <h4 className="text-white font-black text-sm uppercase tracking-wider">Sialkot Service Clusters</h4>
          <div className="grid grid-cols-2 gap-2 text-xs">
            {locationLinks.map((link, idx) => (
              <a
                key={idx}
                href={link.path}
                onClick={(e) => handleNav(e, link.path)}
                className="hover:text-blue-400 transition-colors duration-150 block text-[11px]"
              >
                • {link.name}
              </a>
            ))}
          </div>
        </div>

        {/* COLUMN 3: PREMIUM MULTI-CURRENCY WEB TOOLS MATRIX */}
        <div className="space-y-3">
          <h4 className="text-white font-black text-sm uppercase tracking-wider">International Utilities</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
            {toolLinks.map((link, idx) => (
              <a
                key={idx}
                href={link.path}
                onClick={(e) => handleNav(e, link.path)}
                className="hover:text-green-400 transition-colors duration-150 block text-[11px] font-medium text-slate-300"
              >
                🚀 {link.name}
              </a>
            ))}
          </div>
        </div>

        {/* COLUMN 4: FIELD GUIDES & TECHNICAL CASE STUDIES */}
        <div className="space-y-3">
          <h4 className="text-white font-black text-sm uppercase tracking-wider">Field Case Studies</h4>
          <div className="space-y-2 text-xs">
            {GLOBAL_BLOGS_DATA.map((blog, idx) => (
              <a
                key={idx}
                href={blog.path}
                onClick={(e) => handleNav(e, blog.path)}
                className="hover:text-blue-400 transition-colors duration-150 block text-[11px]"
              >
                • {blog.name}
              </a>
            ))}
          </div>
        </div>

      </div>

      {/* COPYRIGHT COMPLIANCE EXTRA BOTTOM SECTION */}
      <div className="max-w-7xl mx-auto px-4 mt-8 pt-6 border-t border-slate-800/60 text-center text-[10px] text-slate-500 font-mono">
        © 2026 Evonix Technologies. All regional internal site paths are dynamically cached via browser locale vectors.
      </div>
    </div>
  );
}
