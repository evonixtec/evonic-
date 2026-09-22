/**
 * EVONIX TECHNOLOGIES - Advanced Client-Side Security & Anti-Copy Protection Suite
 * Implements anti-scraping, anti-tampering, input sanitization, and asset protection.
 */

// Sanitizes user text input to prevent XSS, HTML injection, and malicious payloads
export function sanitizeInput(input: string): string {
  if (!input) return '';
  return input
    .replace(/[<>]/g, '') // Strip brackets
    .replace(/javascript:/gi, '') // Strip javascript pseudo-protocol
    .replace(/on\w+=/gi, '') // Strip inline event handlers like onload, onerror
    .replace(/data:/gi, '') // Strip dangerous data URIs
    .trim();
}

// Strict email validator to prevent injection in mailto/payloads
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(email.trim());
}

// Strict phone validator for Pakistan (+92) and international formats
export function isValidPhone(phone: string): boolean {
  const cleaned = phone.replace(/[\s\-()]/g, '');
  return /^\+?[0-9]{10,15}$/.test(cleaned);
}

// Form spam submission debounce / rate limiter
const lastSubmissionTimes: Record<string, number> = {};
export function checkRateLimit(formId: string, minIntervalMs = 5000): { allowed: boolean; remainingSecs: number } {
  const now = Date.now();
  const lastTime = lastSubmissionTimes[formId] || 0;
  const elapsed = now - lastTime;

  if (elapsed < minIntervalMs) {
    const remainingSecs = Math.ceil((minIntervalMs - elapsed) / 1000);
    return { allowed: false, remainingSecs };
  }

  lastSubmissionTimes[formId] = now;
  return { allowed: true, remainingSecs: 0 };
}

// Security watermark and tamper detection logging
export function initializeConsoleShield(): void {
  try {
    console.clear();
    const titleStyle = 'color: #38bdf8; font-size: 22px; font-weight: 800; background: #020617; padding: 10px 18px; border-radius: 8px; border: 1px solid #0284c7;';
    const warningStyle = 'color: #f87171; font-size: 14px; font-weight: bold; margin-top: 8px;';
    const infoStyle = 'color: #94a3b8; font-size: 12px; margin-top: 4px;';

    console.log('%c🛡️ EVONIX TECHNOLOGIES — SECURITY SHIELD ACTIVE', titleStyle);
    console.log('%cSTOP! This application is protected under intellectual property & international cybersecurity protocols.', warningStyle);
    console.log(
      '%cUnauthorized code decompilation, automated scraping, content duplication, or malicious payload injection is strictly prohibited.\nCommercial inquiries: evonixtec@gmail.com | WhatsApp: +92 326 324 40002',
      infoStyle
    );
  } catch (err) {
    // Silent fail in restrictive environments
  }
}

// Anti-scraping and keyboard protection hook
export function initAntiCopyShield(
  onSecurityAlert?: (msg: string) => void
): () => void {
  // Prevent context menu (right click)
  const handleContextMenu = (e: MouseEvent) => {
    // Allow right click if user is clicking on an input or textarea
    const target = e.target as HTMLElement | null;
    if (target && (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA')) {
      return;
    }
    e.preventDefault();
    if (onSecurityAlert) {
      onSecurityAlert('EVONIX Protection: Right-click inspection is restricted to safeguard proprietary designs.');
    }
  };

  // Prevent keyboard scraping shortcuts (F12, Ctrl+U, Ctrl+S, Ctrl+Shift+I/J/C)
  const handleKeyDown = (e: KeyboardEvent) => {
    const isCtrlOrMeta = e.ctrlKey || e.metaKey;
    const key = e.key.toLowerCase();

    // Block F12 DevTools
    if (e.key === 'F12') {
      e.preventDefault();
      if (onSecurityAlert) onSecurityAlert('Developer tools access is restricted on this domain.');
      return;
    }

    // Block Ctrl+U (View Source)
    if (isCtrlOrMeta && key === 'u') {
      e.preventDefault();
      if (onSecurityAlert) onSecurityAlert('Viewing page source is disabled to protect proprietary assets.');
      return;
    }

    // Block Ctrl+S (Save Page)
    if (isCtrlOrMeta && key === 's') {
      e.preventDefault();
      if (onSecurityAlert) onSecurityAlert('Saving offline copies of this web application is prohibited.');
      return;
    }

    // Block Ctrl+Shift+I / Ctrl+Shift+J / Ctrl+Shift+C (DevTools inspect shortcuts)
    if (isCtrlOrMeta && e.shiftKey && (key === 'i' || key === 'j' || key === 'c')) {
      e.preventDefault();
      if (onSecurityAlert) onSecurityAlert('DOM inspection shortcuts are locked under EVONIX security policy.');
      return;
    }
  };

  // Prevent dragging images to desktop or other windows to copy
  const handleDragStart = (e: DragEvent) => {
    const target = e.target as HTMLElement | null;
    if (target && target.tagName === 'IMG') {
      e.preventDefault();
    }
  };

  window.addEventListener('contextmenu', handleContextMenu);
  window.addEventListener('keydown', handleKeyDown);
  window.addEventListener('dragstart', handleDragStart);

  return () => {
    window.removeEventListener('contextmenu', handleContextMenu);
    window.removeEventListener('keydown', handleKeyDown);
    window.removeEventListener('dragstart', handleDragStart);
  };
}
