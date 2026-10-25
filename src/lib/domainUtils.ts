/**
 * Domain & Subdomain Routing Utilities for Evonix Ecosystem
 * Manages clean separation between:
 * - evonixtec.com (Main Domain: B2B Software Development & AI Solutions Agency)
 * - tools.evonixtec.com (Tools Subdomain: Free Utility Tools & Calculators Workstation)
 * - store.evonixtec.com (Store Subdomain: Hardware, POS Systems, Printers & Laptops)
 */

export type EvonixDomainType = 'main' | 'tools' | 'store';

export const isToolsSubdomain = (): boolean => {
  if (typeof window === 'undefined') return false;
  const hostname = window.location.hostname.toLowerCase();
  const searchParams = new URLSearchParams(window.location.search);

  // 1. Production / Staging direct subdomain match
  if (hostname === 'tools.evonixtec.com' || hostname.startsWith('tools.')) {
    return true;
  }

  // 2. Development / Testing override via query param (?subdomain=tools or ?domain=tools)
  if (searchParams.get('subdomain') === 'tools' || searchParams.get('domain') === 'tools') {
    return true;
  }

  return false;
};

export const isStoreSubdomain = (): boolean => {
  if (typeof window === 'undefined') return false;
  const hostname = window.location.hostname.toLowerCase();
  const searchParams = new URLSearchParams(window.location.search);

  // 1. Production / Staging direct subdomain match
  if (hostname === 'store.evonixtec.com' || hostname.startsWith('store.')) {
    return true;
  }

  // 2. Development / Testing override via query param (?subdomain=store or ?domain=store)
  if (searchParams.get('subdomain') === 'store' || searchParams.get('domain') === 'store') {
    return true;
  }

  return false;
};

export const getActiveSubdomain = (): EvonixDomainType => {
  if (isToolsSubdomain()) return 'tools';
  if (isStoreSubdomain()) return 'store';
  return 'main';
};

export const getToolsDomainUrl = (path: string = ''): string => {
  const cleanPath = path ? (path.startsWith('/') ? path : `/${path}`) : '';
  if (typeof window !== 'undefined') {
    const host = window.location.hostname;
    // If testing on localhost or cloud run preview, link gracefully
    if (host === 'localhost' || host === '127.0.0.1' || host.includes('run.app')) {
      const target = cleanPath || '/tools';
      return `${window.location.origin}${target}${target.includes('?') ? '&' : '?'}subdomain=tools`;
    }
  }
  return `https://tools.evonixtec.com${cleanPath}`;
};

export const getStoreDomainUrl = (path: string = ''): string => {
  const cleanPath = path ? (path.startsWith('/') ? path : `/${path}`) : '';
  if (typeof window !== 'undefined') {
    const host = window.location.hostname;
    // If testing on localhost or cloud run preview, link gracefully
    if (host === 'localhost' || host === '127.0.0.1' || host.includes('run.app')) {
      const target = cleanPath || '/shop';
      return `${window.location.origin}${target}${target.includes('?') ? '&' : '?'}subdomain=store`;
    }
  }
  return `https://store.evonixtec.com${cleanPath}`;
};

export const getMainAgencyDomainUrl = (path: string = ''): string => {
  const cleanPath = path ? (path.startsWith('/') ? path : `/${path}`) : '';
  if (typeof window !== 'undefined') {
    const host = window.location.hostname;
    // If testing on localhost or cloud run preview, return clean root
    if (host === 'localhost' || host === '127.0.0.1' || host.includes('run.app')) {
      return `${window.location.origin}${cleanPath || '/'}`;
    }
  }
  return `https://evonixtec.com${cleanPath}`;
};
