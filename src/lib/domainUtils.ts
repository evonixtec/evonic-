/**
 * Domain & Subdomain Routing Utilities for Evonix
 * Manages separation between:
 * - evonixtec.com (B2B Software Development & AI Solutions Agency)
 * - tools.evonixtec.com (Free Tools Workstation & Calculators Suite)
 */

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
