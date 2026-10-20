import React from 'react';
import { Home, ChevronRight } from 'lucide-react';
import { NavPageId } from '../../types';

export interface BreadcrumbSegment {
  label: string;
  page?: NavPageId | 'home';
  path?: string;
  onClick?: () => void;
  isCurrent?: boolean;
  icon?: React.ReactNode;
}

export interface DynamicBreadcrumbProps {
  currentPage?: NavPageId | string;
  currentToolId?: string;
  category?: string;
  currentTitle?: string;
  segments?: BreadcrumbSegment[];
  onNavigatePage?: (page: NavPageId | 'home') => void;
  variant?: 'light' | 'dark' | 'glass';
  className?: string;
  showHomeIcon?: boolean;
  includeSchema?: boolean;
}

// Map known pages to user-friendly names
const PAGE_TITLES: Record<string, string> = {
  home: 'Home',
  services: 'Services',
  portfolio: 'Portfolio',
  shop: 'Hardware & Shop',
  about: 'About Us',
  guides: 'Tech Guides & Blogs',
  contact: 'Contact & Support',
  locations: 'Sialkot Regional Hubs',
  tools: 'Online Tools Hub',
  invoice: 'Micro-Invoice Generator',
  'ecommerce-calculator': 'E-Commerce Margin Calc',
  'cbm-calculator': 'CBM Cargo Engine',
  'developer-cost-calculator': 'Developer Cost Calc',
  'ai-visibility-checker': 'AI Visibility Checker',
  'export-barcode-studio': 'Barcode Studio',
  'live-repair-tracker': 'Live RMA Tracker',
  'printer-diagnostics': 'Printer Diagnostics',
  'factory-network-tester': 'Network Latency Test',
  'uk-eu-vat-calculator': 'UK/EU VAT Calc',
  'us-duty-nexus-estimator': 'US Duty Estimator',
  'ce-ukca-compliance-generator': 'Compliance Generator',
  'ai-trip-planner': 'AI Trip Planner',
  'ai-travel-tools': 'Travel Tech Directory',
  'ebay-fee-calculator': 'eBay Fee Calculator',
  'tiktok-shop-fee-calculator': 'TikTok Shop Calc',
  'amazon-fba-calculator': 'Amazon FBA Calc',
  'shopify-fee-calculator': 'Shopify Fee Calc',
  'stripe-fee-calculator': 'Stripe Fee Calc',
  'temu-seller-calculator': 'Temu Seller Calc',
  'installation-guide': 'Installation Manual',
  admin: 'Admin Portal',
  'doorstep-support': 'Doorstep IT Support',
  'sialkot-export-erp': 'Sialkot Export ERP',
  guidelines: 'IT Guidelines',
  'trend-intelligence-suite': 'Trend Intelligence',
};

// Map tool IDs to categories
const TOOL_CATEGORIES: Record<string, string> = {
  invoice: 'Business & Export',
  'cbm-calculator': 'Business & Export',
  'developer-cost-calculator': 'Business & Export',
  'export-barcode-studio': 'Business & Export',
  'uk-eu-vat-calculator': 'Global Trade',
  'us-duty-nexus-estimator': 'Global Trade',
  'ce-ukca-compliance-generator': 'Global Trade',
  'sialkot-export-erp': 'Enterprise ERP',
  'ecommerce-calculator': 'E-Commerce & Ads',
  'ebay-fee-calculator': 'E-Commerce & Export',
  'tiktok-shop-fee-calculator': 'E-Commerce & Ads',
  'amazon-fba-calculator': 'E-Commerce & Export',
  'shopify-fee-calculator': 'E-Commerce Platforms',
  'stripe-fee-calculator': 'Finance & Gateways',
  'temu-seller-calculator': 'E-Commerce & Export',
  'ai-visibility-checker': 'Growth & Search',
  'trend-intelligence-suite': 'Market Intelligence',
  'live-repair-tracker': 'Diagnostics Lab',
  'printer-diagnostics': 'Diagnostics Lab',
  'factory-network-tester': 'Diagnostics Lab',
  'ai-trip-planner': 'Travel Tech',
  'ai-travel-tools': 'Travel Tech',
  'doorstep-support': 'Hardware Care',
  'installation-guide': 'Documentation',
};

export const DynamicBreadcrumb: React.FC<DynamicBreadcrumbProps> = ({
  currentPage,
  currentToolId,
  category,
  currentTitle,
  segments: customSegments,
  onNavigatePage,
  variant = 'light',
  className = '',
  showHomeIcon = true,
  includeSchema = true,
}) => {
  // Resolve navigation items automatically if not provided custom
  const items: BreadcrumbSegment[] = React.useMemo(() => {
    if (customSegments && customSegments.length > 0) {
      return customSegments;
    }

    const list: BreadcrumbSegment[] = [
      {
        label: 'Home',
        page: 'home',
        icon: showHomeIcon ? <Home className="w-3.5 h-3.5" /> : undefined,
      },
    ];

    const activePage = currentToolId || currentPage;

    if (!activePage || activePage === 'home') {
      return list;
    }

    // Is it a tool page?
    const isTool =
      activePage === 'tools' ||
      TOOL_CATEGORIES[activePage] !== undefined ||
      activePage.includes('calculator') ||
      activePage.includes('generator') ||
      activePage.includes('tracker') ||
      activePage.includes('diagnostics') ||
      activePage.includes('tester') ||
      activePage === 'invoice';

    if (isTool && activePage !== 'tools') {
      list.push({
        label: 'Web Tools',
        page: 'tools',
      });

      const catLabel = category || TOOL_CATEGORIES[activePage];
      if (catLabel) {
        list.push({
          label: catLabel,
          page: 'tools',
        });
      }

      const toolLabel = currentTitle || PAGE_TITLES[activePage] || activePage;
      list.push({
        label: toolLabel,
        isCurrent: true,
      });
      return list;
    }

    // Sub-service pages (e.g. doorstep support, sialkot ERP)
    if (activePage === 'doorstep-support' || activePage === 'sialkot-export-erp') {
      list.push({
        label: 'Services',
        page: 'services',
      });
      list.push({
        label: currentTitle || PAGE_TITLES[activePage] || activePage,
        isCurrent: true,
      });
      return list;
    }

    // Location hub pages
    if (activePage === 'locations') {
      list.push({
        label: 'Sialkot Coverage',
        page: 'locations',
        isCurrent: !currentTitle,
      });
      if (currentTitle) {
        list.push({
          label: currentTitle,
          isCurrent: true,
        });
      }
      return list;
    }

    // Regular section pages
    const pageLabel = currentTitle || PAGE_TITLES[activePage] || activePage;
    list.push({
      label: pageLabel,
      isCurrent: true,
    });

    return list;
  }, [customSegments, currentToolId, currentPage, category, currentTitle, showHomeIcon]);

  // Color variants
  const isDark = variant === 'dark';
  const isGlass = variant === 'glass';

  const linkColor = isDark
    ? 'text-slate-400 hover:text-white'
    : isGlass
    ? 'text-slate-200 hover:text-white'
    : 'text-slate-500 hover:text-red-600';

  const currentColor = isDark
    ? 'text-white font-bold'
    : isGlass
    ? 'text-white font-bold'
    : 'text-slate-900 font-bold';

  const separatorColor = isDark
    ? 'text-slate-600'
    : isGlass
    ? 'text-white/40'
    : 'text-slate-400';

  const handleItemClick = (item: BreadcrumbSegment) => {
    if (item.isCurrent) return;
    if (item.onClick) {
      item.onClick();
      return;
    }
    if (item.page && onNavigatePage) {
      onNavigatePage(item.page);
    }
  };

  // Schema.org BreadcrumbList JSON-LD
  const schemaBreadcrumbs = React.useMemo(() => {
    if (!includeSchema || items.length === 0) return null;
    const baseUrl = typeof window !== 'undefined' ? window.location.origin : 'https://www.evonixtec.com';
    return {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: items.map((item, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: item.label,
        item: item.page === 'home' ? baseUrl : `${baseUrl}/${item.page || ''}`,
      })),
    };
  }, [items, includeSchema]);

  return (
    <>
      {schemaBreadcrumbs && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaBreadcrumbs) }}
        />
      )}
      <nav
        aria-label="Breadcrumb"
        className={`flex items-center overflow-x-auto no-scrollbar py-1 max-w-full text-xs ${className}`}
      >
        <ol
          itemScope
          itemType="https://schema.org/BreadcrumbList"
          className="flex items-center gap-1.5 sm:gap-2 flex-nowrap"
        >
          {items.map((item, index) => {
            const isLast = index === items.length - 1 || item.isCurrent;
            return (
              <li
                key={`${item.label}-${index}`}
                itemProp="itemListElement"
                itemScope
                itemType="https://schema.org/ListItem"
                className="flex items-center gap-1.5 sm:gap-2 shrink-0"
              >
                {index > 0 && (
                  <ChevronRight
                    aria-hidden="true"
                    className={`w-3.5 h-3.5 shrink-0 ${separatorColor}`}
                  />
                )}
                {isLast ? (
                  <span
                    aria-current="page"
                    itemProp="name"
                    title={item.label}
                    className={`max-w-[150px] sm:max-w-[240px] md:max-w-none truncate ${currentColor}`}
                  >
                    {item.label}
                  </span>
                ) : (
                  <button
                    type="button"
                    onClick={() => handleItemClick(item)}
                    title={item.label}
                    className={`inline-flex items-center gap-1 transition-colors cursor-pointer max-w-[120px] sm:max-w-[180px] md:max-w-none truncate ${linkColor}`}
                  >
                    {item.icon}
                    <span itemProp="name">{item.label}</span>
                  </button>
                )}
                <meta itemProp="position" content={String(index + 1)} />
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
};
