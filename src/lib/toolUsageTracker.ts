/**
 * Lightweight localStorage Tool Usage Tracker
 * Logs tool executions, parameter simulations, and launches.
 * Automatically displays 'Most Popular' badge for tools used more than 5 times.
 */

const STORAGE_KEY = 'evonix_tools_usage_v1';

// Initial realistic baseline counts so high-demand export tools showcase the feature immediately
const DEFAULT_BASELINE_COUNTS: Record<string, number> = {
  invoice: 18,
  'ecommerce-calculator': 14,
  'cbm-calculator': 11,
  'developer-cost-calculator': 9,
  'ai-visibility-checker': 7,
  'uk-eu-vat-calculator': 8,
  'us-duty-nexus-estimator': 6,
  'ce-ukca-compliance-generator': 7,
  'export-barcode-studio': 5,
};

export function getAllToolUsage(): Record<string, number> {
  if (typeof window === 'undefined') return DEFAULT_BASELINE_COUNTS;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_BASELINE_COUNTS));
      return { ...DEFAULT_BASELINE_COUNTS };
    }
    const parsed = JSON.parse(raw);
    return { ...DEFAULT_BASELINE_COUNTS, ...parsed };
  } catch {
    return { ...DEFAULT_BASELINE_COUNTS };
  }
}

export function getToolUsageCount(toolId: string): number {
  const counts = getAllToolUsage();
  return counts[toolId] || 0;
}

export function incrementToolUsage(toolId: string): number {
  if (typeof window === 'undefined') return 1;
  try {
    const counts = getAllToolUsage();
    const newCount = (counts[toolId] || 0) + 1;
    counts[toolId] = newCount;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(counts));
    // Dispatch custom event for real-time reactivity across components
    window.dispatchEvent(new CustomEvent('evonix_tool_usage_updated', { detail: { toolId, count: newCount } }));
    return newCount;
  } catch {
    return 1;
  }
}

export function isToolMostPopular(toolId: string, threshold = 5): boolean {
  return getToolUsageCount(toolId) > threshold;
}
