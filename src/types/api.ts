export interface LoginResponse {
  success: boolean;
  message: string;
  data: {
    id: string;
    name: string;
    first_name: string;
    last_name: string;
    email: string;
    token: string;
    accessToken: string;
    refreshToken: string;
    tokenType: string;
  };
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
}

export interface DashboardOverview {
  profile: {
    id: string;
    name: string;
    email: string;
    role: string;
  };
  announcements: DashboardAnnouncement[];
  content_calendar_entries: ContentCalendarEntry[];
  analytics: {
    ai_credits_total: number;
    ai_credits_used: number;
  };
}

export interface ApiErrorEnvelope {
  message: string;
  errors: Record<string, string[]>;
}
