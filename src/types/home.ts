export interface HomeLink {
  label: string;
  href: string;
}

export interface MarketingItem {
  title: string;
  description: string;
  image?: string;
}

export interface HomeContent {
  headings: string[];
  links: HomeLink[];
  marketing: MarketingItem[];
}

export const HOME_QUERY_KEY = ['visitor', 'home'] as const;
