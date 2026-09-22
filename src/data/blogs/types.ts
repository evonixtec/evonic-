import { SectionId } from '../../types';

export type BlogCategory = 'web-graphics' | 'software-dev' | 'hardware-repair';

export interface BlogInternalLink {
  label: string;
  targetSection: SectionId;
  anchorText: string;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  category: BlogCategory;
  categoryLabel: string;
  excerpt: string;
  readTime: string;
  publishedDate: string;
  author: {
    name: string;
    role: string;
  };
  tags: string[];
  metaTitle: string;
  metaDescription: string;
  targetKeywords: string[];
  internalLinks: BlogInternalLink[];
  content: string;
}
