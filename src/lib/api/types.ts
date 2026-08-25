export interface ApiSuccessEnvelope<T> {
  success: boolean;
  message: string;
  data: T;
}

export interface ApiErrorEnvelope {
  success?: boolean;
  message: string;
  errors?: Record<string, string[]>;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginUserData {
  id: string;
  name: string;
  full_name: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string | null;
  token: string;
  accessToken: string;
  refreshToken: string;
  tokenType: string;
}

export type LoginResponse = ApiSuccessEnvelope<LoginUserData>;

export interface SignupRequest {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  terms_accepted: boolean;
}

export interface RegisteredUserData {
  name: string;
  full_name: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string | null;
  email_verified: boolean;
}

export type SignupResponse = ApiSuccessEnvelope<RegisteredUserData>;

export interface DashboardAnnouncement {
  id: string;
  announcement_title?: string;
  announcement_content?: string;
  title?: string;
  message?: string;
  description?: string;
  full_name?: string;
  email?: string;
  phone?: string;
  link?: string | null;
  status?: string;
  error?: string | null;
  date?: string;
}

export interface ContentCalendarEntry {
  id: string;
  title: string;
  date: string;
  content?: string;
  description?: string;
  full_name?: string;
  phone?: string;
  link?: string | null;
  error?: string | null;
  is_active?: boolean;
  created_at?: string;
  updated_at?: string;
}

export type DashboardOverviewData = Record<string, unknown>;

export type DashboardOverviewResponse = ApiSuccessEnvelope<DashboardOverviewData>;

export interface NewFeatureItem {
  id: string;
  title: string;
  description?: string;
}
