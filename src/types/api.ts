export interface ApiErrorResponse {
  message: string;
  errors?: Record<string, string[] | string>;
}

export interface ApiSuccessResponse<T> {
  success?: boolean;
  message: string;
  data: T;
}

export interface ContentCalendarEntry {
  id: string;
  title: string;
  date: string;
  content: string;
  description: string;
  full_name: string;
  phone: string;
  link: string | null;
  error: string | null;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface ContentCalendarResponse {
  message: string;
  data: {
    items: ContentCalendarEntry[];
  };
}

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
  is_active?: boolean;
  created_at?: string;
  updated_at?: string;
}

export interface DashboardProfile {
  id?: string;
  name?: string;
  first_name?: string;
  last_name?: string;
  email?: string;
}

export interface DashboardActivity {
  id: string;
  title: string;
  description: string;
  created_at: string;
}

export interface CreditUsage {
  current: number;
  total: number;
}

export interface DashboardData {
  profile: DashboardProfile | null;
  announcements: DashboardAnnouncement[];
  calendarEntries: ContentCalendarEntry[];
  activities: DashboardActivity[];
  downloads: number | null;
  contentGenerated: number | null;
  credits: CreditUsage | null;
}

export interface DashboardOverview {
  message: string;
  data: object;
}

export interface HomeSearchItem {
  id: string;
  title: string;
  description: string;
  image: string;
  caption: string;
  link: string | null;
}

export interface HomeSearchResponse {
  message: string;
  data: object;
}

export interface HomeSubscribeRequest {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
}

export interface HomeSubscribeResponse {
  success?: boolean;
  message: string;
  data?: object;
}

export interface HomeTermsAcceptanceRequest {
  privacy_policy: boolean;
  terms_of_service: boolean;
  email: string;
}

export interface HomeTermsAcceptanceResponse {
  success?: boolean;
  message: string;
  data?: object;
}
