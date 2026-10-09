/**
 * Utility to identify dedicated tool, calculator, and generator workspaces.
 * 
 * CORE POLICY / REMINDER FOR ALL TOOL PAGES:
 * All dedicated tool and calculator pages (such as E-Commerce Margin Calculator,
 * Invoice Generator, and any future calculators/tools) must remain clean, focused,
 * and completely free of floating distraction widgets.
 * 
 * The following floating elements must NEVER be rendered on tool pages:
 * 1. Engineer Hamza / Duty Engineer Live Support Chat widget
 * 2. Floating "Free Bench Pass" button
 * 3. Floating Quick Search trigger button
 * 4. Floating WhatsApp Fast Support button
 * 5. Mobile sticky bottom navigation dock
 */

export const isToolPage = (page?: string | null): boolean => {
  if (!page) return false;
  const normalized = page.toLowerCase().trim();

  // Known tool pages and future-proof keywords
  const toolIdentifiers = [
    'invoice',
    'ecommerce-calculator',
    'margin-calculator',
    'cbm-calculator',
    'cbm',
    'developer-cost-calculator',
    'developer-cost',
    'ai-visibility-checker',
    'ai-visibility',
    'eeat',
    'checker',
    'calculator',
    'generator',
    'barcode',
    'tool',
    'tools',
    'converter',
    'simulator',
    'tracker',
    'diagnostics',
    'troubleshooter',
    'latency',
    'trip-planner',
    'planner',
  ];

  return toolIdentifiers.some((identifier) => normalized.includes(identifier));
};
