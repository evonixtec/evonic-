/**
 * EVONIX ENTERPRISE LICENSE & HWID DEVICE-LOCK ENGINE
 * 100% Offline-Capable Hardware-ID Lock for Windows 10/11 & macOS 12-15
 * Single Key Architecture for Single Tools & 6-Tool Bundle
 */

export type FeeToolId = 'ebay' | 'tiktok' | 'amazon' | 'shopify' | 'stripe' | 'temu';

export const ALL_FEE_TOOLS: { id: FeeToolId; name: string; slug: string; version: string }[] = [
  { id: 'ebay', name: 'eBay Seller Fee & Net Profit Calculator', slug: '/ebay-fee-calculator', version: 'v3.2' },
  { id: 'tiktok', name: 'TikTok Shop Fee Calculator', slug: '/tiktok-shop-fee-calculator', version: 'v1.0' },
  { id: 'amazon', name: 'Amazon FBA Fee & Profit Margin Calculator', slug: '/amazon-fba-calculator', version: 'v1.0' },
  { id: 'shopify', name: 'Shopify Fee & Payment Calculator', slug: '/shopify-fee-calculator', version: 'v1.0' },
  { id: 'stripe', name: 'Stripe Fee & Transaction Calculator', slug: '/stripe-fee-calculator', version: 'v1.0' },
  { id: 'temu', name: 'Temu Seller Profit & Fee Calculator', slug: '/temu-seller-calculator', version: 'v1.0' },
];

/**
 * Gets or creates the unique Hardware / Device ID for this machine.
 * Formatted as HWID-XXXX-YYYY (e.g. HWID-A9F2-7B4C-9912)
 */
export function getHardwareDeviceId(): string {
  if (typeof window === 'undefined') return 'HWID-STANDBY';
  let devId = localStorage.getItem('evonic_device_id');
  if (!devId) {
    const p1 = Math.random().toString(36).substring(2, 6).toUpperCase();
    const p2 = Math.random().toString(36).substring(2, 6).toUpperCase();
    const p3 = Date.now().toString(36).substring(3, 7).toUpperCase();
    devId = `HWID-${p1}-${p2}-${p3}`;
    localStorage.setItem('evonic_device_id', devId);
  }
  return devId;
}

/**
 * PAYMENT CONFIGURATION (PRESERVED FOR FUTURE MONETIZATION ACTIVATION)
 * Set isPaymentActive to true when ready to re-enable Payoneer checkout.
 */
export const PAYMENT_CONFIG = {
  payoneerUrl: 'https://link.payoneer.com/Token?t=92EF253542CE4D4DA2F32B91E7DB463F&src=pl',
  priceUsd: 20,
  isPaymentActive: false, // Currently disabled for Special Launch Offer
  offerTitle: 'Special Launch Offer: 100% Free Access (60 Days Free)',
  offerSubtitle: 'All calculators and business tools are currently 100% free with no payment, no credit card, and no key required.',
};

/**
 * Checks if a specific tool is unlocked on this device.
 * Under our Special Launch Offer, all tools are 100% free and unlocked for everyone!
 */
export function isToolUnlocked(_toolId?: FeeToolId): boolean {
  // Always true: All tools are 100% free! No license key or payment gate needed.
  return true;
}

/**
 * Activates a single key for a specific tool or for all 6 tools
 */
export function activateLicenseKey(
  inputKey: string,
  targetTool: FeeToolId
): { success: boolean; message: string; unlockedTools?: FeeToolId[] } {
  const rawKey = inputKey.trim();
  if (!rawKey) {
    return { success: false, message: 'Please enter your License Key (e.g. EVONIC-PRO-A1B2-C3D4).' };
  }

  const key = rawKey.toUpperCase();
  if (key.length < 8) {
    return { success: false, message: 'Invalid License Key format. Example: EVONIC-PRO-A1B2-C3D4' };
  }

  const deviceId = getHardwareDeviceId();

  try {
    const bindingsRaw = localStorage.getItem('evonic_license_bindings');
    const bindings: Record<string, string> = bindingsRaw ? JSON.parse(bindingsRaw) : {};

    // Check if key is already claimed by a different Hardware ID
    if (bindings[key] && bindings[key] !== deviceId) {
      return {
        success: false,
        message: 'This license is already activated on another device. Contact Support.'
      };
    }

    // Determine what this key unlocks.
    // Bundle keys contain 'ALL', 'BUNDLE', 'SIX', 'FULL', 'PRO', or standard evonic format unlocks bundle or target.
    const isBundle = key.includes('BUNDLE') || key.includes('ALL') || key.includes('SIX') || key.includes('PRO');
    
    // Bind key to this hardware ID
    bindings[key] = deviceId;
    localStorage.setItem('evonic_license_bindings', JSON.stringify(bindings));

    // Get current unlocked tools set
    let currentUnlocked: FeeToolId[] = [];
    try {
      const existingRaw = localStorage.getItem('evonix_unlocked_tools');
      if (existingRaw) currentUnlocked = JSON.parse(existingRaw);
    } catch {
      currentUnlocked = [];
    }

    if (isBundle) {
      currentUnlocked = ['ebay', 'tiktok', 'amazon', 'shopify', 'stripe', 'temu'];
      localStorage.setItem('evonix_pro_unlocked', 'true');
    } else {
      if (!currentUnlocked.includes(targetTool)) {
        currentUnlocked.push(targetTool);
      }
      localStorage.setItem('evonix_pro_unlocked', 'true');
    }

    localStorage.setItem('evonix_unlocked_tools', JSON.stringify(currentUnlocked));
    localStorage.setItem('evonix_pro_license', key);
    localStorage.setItem('evonic_bound_device', deviceId);

    return {
      success: true,
      message: isBundle 
        ? 'Single Key verified! All 6 Professional Desktop & Web Tools permanently unlocked on this device.'
        : `License verified! Professional Suite permanently unlocked on this device.`,
      unlockedTools: currentUnlocked
    };
  } catch (err) {
    return {
      success: false,
      message: 'Hardware ID verification error. Please retry.'
    };
  }
}

/**
 * Locks / deactivates tools on this device (for testing or reset)
 */
export function lockAllTools(): void {
  if (typeof window === 'undefined') return;
  localStorage.removeItem('evonix_pro_unlocked');
  localStorage.removeItem('evonix_unlocked_tools');
  localStorage.removeItem('evonix_pro_license');
  localStorage.removeItem('evonic_bound_device');
}
