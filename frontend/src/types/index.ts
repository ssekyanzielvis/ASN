// Type definitions for the application

export interface Category {
  id: number;
  name: string;
  slug: string;
  description: string;
  project_count: number;
}

export interface Project {
  id: number;
  title: string;
  slug: string;
  description: string;
  full_content?: string;
  project_type: 'architecture' | 'design' | 'game' | 'art' | 'speculative';
  category?: Category;
  category_id?: number;
  category_name?: string;
  featured_image?: string;
  image_1?: string;
  image_2?: string;
  image_3?: string;
  image_4?: string;
  gallery_images?: string[];
  video_url?: string;
  featured: boolean;
  display_order: number;
  created_at: string;
  updated_at?: string;
}

export interface NewsArticle {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  content?: string;
  featured_image?: string;
  author?: string;
  author_name?: string;
  published?: boolean;
  publish_date?: string;
  created_at: string;
  updated_at?: string;
}

export interface Collaboration {
  id?: number;
  name: string;
  email: string;
  project_type: 'architecture' | 'design' | 'game' | 'research' | 'exhibition' | 'other';
  message: string;
  status?: string;
  admin_notes?: string;
  submitted_at?: string;
  reviewed?: boolean;
}

export interface SiteSettings {
  site_title: string;
  tagline: string;
  founder_quote: string;
  contact_email: string;
  phone?: string;
  address?: string;
  instagram_url?: string;
  twitter_url?: string;
  linkedin_url?: string;
  facebook_url?: string;
  meta_description?: string;
  meta_keywords?: string;
  social_links: {
    instagram?: string;
    twitter?: string;
    linkedin?: string;
    facebook?: string;
  };
  updated_at: string;
}

export interface AuthTokens {
  access: string;
  refresh: string;
}

export interface User {
  id: number;
  username: string;
  email: string;
  first_name: string;
  last_name: string;
  is_staff: boolean;
}
