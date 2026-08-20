export interface ApiResponse<TData> {
  message: string;
  data: TData;
}

export interface ApiSuccessResponse<TData> extends ApiResponse<TData> {
  success: boolean;
}

export interface ApiErrorEnvelope {
  message: string;
  errors?: Record<string, string | string[]>;
}

export type ApiErrorResponse = ApiErrorEnvelope;

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginUser {
  id: string;
  name: string;
  first_name: string;
  last_name: string;
  email: string;
  token: string;
  accessToken: string;
  refreshToken: string;
  tokenType: string;
}

export type LoginResponse = ApiSuccessResponse<LoginUser>;

export interface Announcement {
  id: string;
  announcement_title: string;
  announcement_content: string;
  title: string;
  message: string;
  description: string;
  full_name: string;
  email: string;
  phone: string;
  link: string | null;
  status: string;
}

export type AnnouncementListResponse = ApiSuccessResponse<{
  items: Announcement[];
}>;

export interface CreateAnnouncementRequest {
  announcement_title: string;
  announcement_content: string;
  full_name: string;
  email: string;
  phone: string;
  link: string | null;
}

export interface CreatedAnnouncement {
  id: string;
  announcement_title: string;
  announcement_content: string;
  full_name: string;
  email: string;
  phone: string;
  link: string | null;
  status: string;
}

export type CreateAnnouncementResponse = ApiSuccessResponse<CreatedAnnouncement>;

export interface DashboardAnalyticsRecord {
  ai_credit_current?: number;
  ai_credit_total?: number;
  ai_credits_used?: number;
  ai_credits_limit?: number;
  ai_credit_usage?: {
    current?: number;
    total?: number;
    used?: number;
    limit?: number;
  };
  downloads?: number;
  content_generated?: number;
  first_name?: string;
  last_name?: string;
  name?: string;
  full_name?: string;
  avatar_url?: string | null;
  hero_headline?: string;
  hero_description?: string;
  headline?: string;
  description?: string;
  recent_activities?: Array<{
    id?: string;
    title?: string;
    description?: string;
    message?: string;
    timestamp?: string;
    created_at?: string;
    date?: string;
  }>;
  weekly_content?: DashboardContentRecord[];
  content_calendar?: DashboardContentRecord[];
  calendar_items?: DashboardContentRecord[];
  prompt_library?: Array<{
    id?: string;
    label?: string;
    type?: string;
    prompt?: string;
    text?: string;
  }>;
}

export interface DashboardContentRecord {
  id?: string;
  day?: string;
  day_label?: string;
  type?: string;
  content_type?: string;
  label?: string;
  title?: string;
  subtitle?: string;
  description?: string;
  image_url?: string | null;
  image?: string | null;
  link?: string | null;
}

export type DashboardAnalyticsResponse = ApiSuccessResponse<DashboardAnalyticsRecord>;
