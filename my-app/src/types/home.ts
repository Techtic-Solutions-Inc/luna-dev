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

export const HOME_API_PATH = '/api/visitor/home' as const;
export const HOME_QUERY_KEY = ['home'] as const;
