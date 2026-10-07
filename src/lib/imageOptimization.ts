/**
 * Image Optimization Utilities for EVONIX TECHNOLOGIES
 * 
 * Provides automated WebP source resolution, CDN transformation,
 * responsive srcset generation, and Core Web Vitals (LCP/CLS) optimization helpers.
 */

export interface ImageOptimizationOptions {
  width?: number;
  height?: number;
  quality?: number;
  format?: 'webp' | 'avif' | 'jpeg' | 'png';
  fit?: 'cover' | 'contain' | 'crop';
}

/**
 * Checks if an image URL is already in WebP format
 */
export function isWebPFormat(url: string | undefined): boolean {
  if (!url) return false;
  return url.endsWith('.webp') || url.includes('.webp?') || url.includes('fm=webp') || url.includes('format=webp');
}

/**
 * Checks if an image is a vector SVG
 */
export function isSvgFormat(url: string | undefined): boolean {
  if (!url) return false;
  return url.endsWith('.svg') || url.includes('.svg?');
}

/**
 * Automatically resolves a WebP source for a given image source URL or local path.
 * - For CDN URLs (e.g. Unsplash), appends/replaces `fm=webp&auto=format`.
 * - For local bundled assets ending in .jpg/.jpeg/.png, points to .webp.
 * - For SVG or existing WebP, returns unchanged.
 */
export function getWebpSource(src: string | undefined): string {
  if (!src) return '';

  // SVGs are already scalable vectors
  if (isSvgFormat(src)) {
    return src;
  }

  // Already WebP
  if (isWebPFormat(src)) {
    return src;
  }

  // Handle external CDN URLs (e.g., Unsplash)
  if (src.includes('images.unsplash.com')) {
    try {
      const url = new URL(src, typeof window !== 'undefined' ? window.location.origin : 'https://evonixtec.com');
      url.searchParams.set('fm', 'webp');
      url.searchParams.set('auto', 'format');
      url.searchParams.set('q', '80');
      return url.toString();
    } catch {
      return `${src}${src.includes('?') ? '&' : '?'}fm=webp&auto=format&q=80`;
    }
  }

  // Handle local Vite imports or public assets
  // Matches .jpg, .jpeg, .png before any query string or hash
  if (/\.(jpe?g|png)(\?.*)?$/i.test(src)) {
    return src.replace(/\.(jpe?g|png)(\?.*)?$/i, '.webp$2');
  }

  return src;
}

/**
 * Returns an optimized image URL with customized dimensions and WebP format
 */
export function getOptimizedImageUrl(src: string | undefined, options: ImageOptimizationOptions = {}): string {
  if (!src) return '';

  const { width, height, quality = 80, format = 'webp', fit = 'crop' } = options;

  if (isSvgFormat(src)) return src;

  if (src.includes('images.unsplash.com')) {
    try {
      const url = new URL(src, typeof window !== 'undefined' ? window.location.origin : 'https://evonixtec.com');
      if (width) url.searchParams.set('w', width.toString());
      if (height) url.searchParams.set('h', height.toString());
      url.searchParams.set('q', quality.toString());
      url.searchParams.set('fm', format);
      url.searchParams.set('fit', fit);
      url.searchParams.set('auto', 'format');
      return url.toString();
    } catch {
      return src;
    }
  }

  if (format === 'webp') {
    return getWebpSource(src);
  }

  return src;
}

/**
 * Generates an SEO-compliant and performance-friendly responsive srcSet string
 */
export function generateResponsiveSrcSet(src: string, widths: number[] = [400, 800, 1200]): string {
  if (!src || isSvgFormat(src)) return '';

  return widths
    .map((w) => `${getOptimizedImageUrl(src, { width: w, format: 'webp' })} ${w}w`)
    .join(', ');
}
