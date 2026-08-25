export interface NavLinkItem {
  label: string;
  href: string;
}

export interface MarketingStep {
  label: string;
  title: string;
  highlight: string;
  description: string;
  image: string;
}

export interface GalleryImage {
  src: string;
  alt: string;
  caption?: string;
}

export interface HomeContent {
  headings: string[];
  links: NavLinkItem[];
  marketing: MarketingStep[];
  images: GalleryImage[];
}

export interface ErrorResponse {
  message: string;
  errors: Record<string, string[] | string>;
}

export const HOME_QUERY_KEY = ['visitor', 'home'] as const;
