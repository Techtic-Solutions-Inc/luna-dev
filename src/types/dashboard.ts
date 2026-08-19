export interface DashboardUser {
  id: string;
  name: string;
  full_name: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string | null;
  image: string | null;
  role: 'agent' | 'admin' | 'marketing_manager' | 'real_estate_professional';
  ai_credits_total: number;
  ai_credits_used: number;
  ai_generation_enabled: boolean;
}

export interface DashboardAnnouncement {
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
  error: null;
  created_at: string;
  updated_at: string;
}

export interface DashboardAnnouncementListResponse {
  success: boolean;
  message: string;
  data: { items: DashboardAnnouncement[] };
}

export interface DashboardAnalytics {
  downloads?: number;
  content_generated?: number;
  total_downloads?: number;
  total_content_generated?: number;
}

export interface DashboardOverviewResponse {
  success: boolean;
  message: string;
  data: {
    user: DashboardUser;
    announcements: DashboardAnnouncement[];
    calendar_entries: import('./contentCalendar').ContentCalendarEntry[];
    analytics: DashboardAnalytics;
  };
}
