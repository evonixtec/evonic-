import { BlogPost, BlogCategory } from './types';
import { FRESH_HUMAN_BLOGS } from './freshHumanBlogs';
import { WEB_GRAPHICS_BLOGS } from './webGraphicsBlogs';
import { SOFTWARE_DEV_BLOGS } from './softwareDevBlogs';
import { HARDWARE_REPAIR_BLOGS } from './hardwareRepairBlogs';
import { SIALKOT_FIELD_BLOGS } from './sialkotFieldBlogs';
import { NICHE_AND_AI_BLOGS } from './nicheAiBlogs';

import { enrichBlogPost } from '../../lib/blogImages';

export * from './types';
export { FRESH_HUMAN_BLOGS } from './freshHumanBlogs';
export { WEB_GRAPHICS_BLOGS } from './webGraphicsBlogs';
export { SOFTWARE_DEV_BLOGS } from './softwareDevBlogs';
export { HARDWARE_REPAIR_BLOGS } from './hardwareRepairBlogs';
export { SIALKOT_FIELD_BLOGS } from './sialkotFieldBlogs';
export { NICHE_AND_AI_BLOGS } from './nicheAiBlogs';

const RAW_BLOGS: BlogPost[] = [
  ...NICHE_AND_AI_BLOGS,
  ...FRESH_HUMAN_BLOGS,
  ...SIALKOT_FIELD_BLOGS,
  ...WEB_GRAPHICS_BLOGS,
  ...SOFTWARE_DEV_BLOGS,
  ...HARDWARE_REPAIR_BLOGS,
];

export const ALL_BLOGS: BlogPost[] = RAW_BLOGS.map(enrichBlogPost);

// B2B Software blogs for the main website (evonixtec.com)
export const B2B_BLOGS: BlogPost[] = ALL_BLOGS.filter((b) => b.category !== 'hardware-repair');

// Hardware & repair blogs shifted to the store subdomain (store.evonixtec.com)
export const HARDWARE_STORE_BLOGS: BlogPost[] = ALL_BLOGS.filter((b) => b.category === 'hardware-repair');

export interface BlogCategoryMeta {
  id: BlogCategory | 'all';
  label: string;
  count: number;
  description: string;
}

// B2B Software categories for main agency site
export const B2B_BLOG_CATEGORIES: BlogCategoryMeta[] = [
  {
    id: 'all',
    label: 'All B2B Articles',
    count: B2B_BLOGS.length,
    description: 'Technical guides on custom enterprise software, export portals, POS systems, and cloud architecture.',
  },
  {
    id: 'software-dev',
    label: 'Software & POS Systems',
    count: B2B_BLOGS.filter((b) => b.category === 'software-dev').length,
    description: 'Custom ERP systems, retail POS setups, cloud databases, and offline business workflows.',
  },
  {
    id: 'web-graphics',
    label: 'Web & Mobile Engineering',
    count: B2B_BLOGS.filter((b) => b.category === 'web-graphics').length,
    description: 'Modern web platforms, responsive user interfaces, export catalogs, and fast frontend engineering.',
  },
];

// Hardware & diagnostic categories for store site
export const STORE_BLOG_CATEGORIES: BlogCategoryMeta[] = [
  {
    id: 'all',
    label: 'All Hardware Guides',
    count: HARDWARE_STORE_BLOGS.length,
    description: 'Motherboard diagnostics, thermal printer fixes, billing counter setups, and hardware lab guides.',
  },
  {
    id: 'hardware-repair',
    label: 'Laptop & Printer Hardware',
    count: HARDWARE_STORE_BLOGS.length,
    description: 'Chip-level repairs, thermal paste servicing, laser fusers, SSD upgrades, and workshop walk-throughs.',
  },
];

// Default categories pool for backward compatibility
export const BLOG_CATEGORIES: BlogCategoryMeta[] = B2B_BLOG_CATEGORIES;

export function getBlogsByCategory(category: BlogCategory | 'all', onlyB2B = true): BlogPost[] {
  const pool = onlyB2B ? B2B_BLOGS : ALL_BLOGS;
  if (category === 'all') return pool;
  return pool.filter((b) => b.category === category);
}

export function getBlogBySlug(slug: string): BlogPost | undefined {
  return ALL_BLOGS.find((b) => b.slug === slug);
}

export function searchBlogs(query: string, category: BlogCategory | 'all' = 'all'): BlogPost[] {
  const normalizedQuery = (query || '').toLowerCase().trim();
  const pool = getBlogsByCategory(category);

  if (!normalizedQuery) return pool;

  return pool.filter((blog) => {
    return (
      (blog.title || '').toLowerCase().includes(normalizedQuery) ||
      (blog.excerpt || '').toLowerCase().includes(normalizedQuery) ||
      (Array.isArray(blog.tags) && blog.tags.some((t) => (t || '').toLowerCase().includes(normalizedQuery))) ||
      (Array.isArray(blog.targetKeywords) && blog.targetKeywords.some((k) => (k || '').toLowerCase().includes(normalizedQuery))) ||
      (blog.content || '').toLowerCase().includes(normalizedQuery)
    );
  });
}

export function getRelatedBlogs(currentSlug: string, limit = 3): BlogPost[] {
  const current = getBlogBySlug(currentSlug);
  if (!current) return ALL_BLOGS.slice(0, limit);

  // Same category first, then tag overlap
  const sameCategory = ALL_BLOGS.filter(
    (b) => b.category === current.category && b.slug !== currentSlug
  );

  return sameCategory.slice(0, limit);
}
