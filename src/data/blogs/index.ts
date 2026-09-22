import { BlogPost, BlogCategory } from './types';
import { WEB_GRAPHICS_BLOGS } from './webGraphicsBlogs';
import { SOFTWARE_DEV_BLOGS } from './softwareDevBlogs';
import { HARDWARE_REPAIR_BLOGS } from './hardwareRepairBlogs';

export * from './types';
export { WEB_GRAPHICS_BLOGS } from './webGraphicsBlogs';
export { SOFTWARE_DEV_BLOGS } from './softwareDevBlogs';
export { HARDWARE_REPAIR_BLOGS } from './hardwareRepairBlogs';

export const ALL_BLOGS: BlogPost[] = [
  ...WEB_GRAPHICS_BLOGS,
  ...SOFTWARE_DEV_BLOGS,
  ...HARDWARE_REPAIR_BLOGS,
];

export interface BlogCategoryMeta {
  id: BlogCategory | 'all';
  label: string;
  count: number;
  description: string;
}

export const BLOG_CATEGORIES: BlogCategoryMeta[] = [
  {
    id: 'all',
    label: 'All Articles',
    count: ALL_BLOGS.length,
    description: 'Explore our complete library of 60 technical guides, architectural blueprints, and diagnostic insights.',
  },
  {
    id: 'web-graphics',
    label: 'Web & Graphic Design',
    count: WEB_GRAPHICS_BLOGS.length,
    description: 'Modern UI/UX design, responsive layouts, typography, brand identities, and high-conversion frontend engineering.',
  },
  {
    id: 'software-dev',
    label: 'Software & POS Development',
    count: SOFTWARE_DEV_BLOGS.length,
    description: 'Custom ERPs, retail POS architectures, cloud databases, offline-first sync, and enterprise business automation.',
  },
  {
    id: 'hardware-repair',
    label: 'Laptop & Printer Repair',
    count: HARDWARE_REPAIR_BLOGS.length,
    description: 'Motherboard chip-level diagnostics, thermal printer maintenance, laser fusers, SSD speedups, and hardware lab practices.',
  },
];

export function getBlogsByCategory(category: BlogCategory | 'all'): BlogPost[] {
  if (category === 'all') return ALL_BLOGS;
  return ALL_BLOGS.filter((b) => b.category === category);
}

export function getBlogBySlug(slug: string): BlogPost | undefined {
  return ALL_BLOGS.find((b) => b.slug === slug);
}

export function searchBlogs(query: string, category: BlogCategory | 'all' = 'all'): BlogPost[] {
  const normalizedQuery = query.toLowerCase().trim();
  const pool = getBlogsByCategory(category);

  if (!normalizedQuery) return pool;

  return pool.filter((blog) => {
    return (
      blog.title.toLowerCase().includes(normalizedQuery) ||
      blog.excerpt.toLowerCase().includes(normalizedQuery) ||
      blog.tags.some((t) => t.toLowerCase().includes(normalizedQuery)) ||
      blog.targetKeywords.some((k) => k.toLowerCase().includes(normalizedQuery)) ||
      blog.content.toLowerCase().includes(normalizedQuery)
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
