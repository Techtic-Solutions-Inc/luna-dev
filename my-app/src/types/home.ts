/** Raw CMS/API item from GET /api/visitor/home */
export interface HomeItem {
  id: string;
  name: string;
  title: string;
  description: string;
  link: string;
  image: string;
  image_url: string;
  category: string;
  tags: string[];
  full_name: string | null;
  first_name: string | null;
  last_name: string | null;
  email: string | null;
  phone: string | null;
  phone_number: string | null;
  error: string | null;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface HomePagination {
  page: number;
  limit: number;
}

export interface HomeData {
  items: HomeItem[];
  pagination: HomePagination;
}

export interface HomeResponse {
  success: boolean;
  message: string;
  data: HomeData;
}

export interface HomeQueryParams {
  q?: string;
  category?: string;
  page?: number;
  limit?: number;
}

export type HomeSortColumn = 'items' | 'pagination';
export type HomeSortDirection = 'asc' | 'desc' | null;

/** Navigation and content models for Home screen sections */
export interface NavLink {
  label: string;
  href: string;
}

export interface GalleryImage {
  src: string;
  alt: string;
  overlay?: string;
}

export interface HomeTestimonial {
  quote: string;
  name: string;
  company: string;
  avatar: string;
}

export interface HomeSectionAvailability {
  hero: boolean;
  gallery: boolean;
  testimonials: boolean;
  navLinks: boolean;
}

export interface HomeContentProps {
  headline?: string;
  subheadline?: string;
  galleryImages: GalleryImage[];
  testimonials: HomeTestimonial[];
  navLinks: NavLink[];
  sections: HomeSectionAvailability;
}

export interface ContentPreview {
  id: string;
  imageUrl: string;
  alt: string;
  caption?: string;
  category?: string;
}

export interface FeatureStep {
  id: string;
  stepNumber: number;
  title: string;
  description: string;
  imageSrc?: string;
}

export interface WaitlistInquiry {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  city?: string;
  currentMarketing?: string;
  message?: string;
}

export interface HomeHeroContent {
  headline?: string;
  subheadline?: string;
}

export const HOME_API_PATH = '/api/visitor/home' as const;
export const HOME_QUERY_KEY = ['home'] as const;
export const VISITOR_HOME_QUERY_KEY = ['visitor', 'home'] as const;
