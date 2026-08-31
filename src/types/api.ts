export const AUTH_TOKEN_KEY = 'token';
export const AUTH_USER_KEY = 'auth_user';

export const endpoints = {
  login: '/auth/login',
  currentUser: '/api/v1/users/me',
  visitorHome: '/api/visitor/home',
} as const;

export interface LoginRequestBody {
  email: string;
  password: string;
}

export interface AuthUser {
  id: string;
  name: string;
  first_name: string;
  last_name: string;
  email: string;
}

export interface LoginResponseData extends AuthUser {
  token: string;
  accessToken: string;
  refreshToken: string;
  tokenType: string;
}

export interface LoginResponse {
  success: boolean;
  message: string;
  data: LoginResponseData;
}

export interface ErrorResponse {
  message: string;
  errors: Record<string, string[]>;
}

export interface CurrentUserEnvelope {
  success?: boolean;
  message?: string;
  data?: AuthUser;
}

export interface VisitorHomeItem {
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
  error: null;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface VisitorHomePagination {
  page: number;
  limit: number;
}

export interface VisitorHomeData {
  items: VisitorHomeItem[];
  pagination: VisitorHomePagination;
}

export interface VisitorHomeSearchResponse {
  success: boolean;
  message: string;
  data: VisitorHomeData;
}
