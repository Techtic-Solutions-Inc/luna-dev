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

export interface ErrorEnvelope {
  message: string;
  errors?: Record<string, string[] | string>;
}

export interface ContentCalendarItem {
  id: string;
  title: string;
  date: string;
  content: string;
  description: string;
  full_name: string;
  phone: string;
  link: string;
  error: string | null;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface ContentCalendarListResponse {
  success: boolean;
  message: string;
  data: {
    items: ContentCalendarItem[];
  };
}

export interface ContentCalendarMutationResponse {
  success: boolean;
  message: string;
  data: ContentCalendarItem;
}

export interface ContentCalendarPayload {
  title: string;
  date: string;
  content: string;
  description: string;
  full_name: string;
  phone: string;
  link: string;
  is_active: boolean;
}

export interface ProfileContentItem {
  id: string;
  title: string;
  description: string;
  content: string;
  link: string;
  created_at: string;
  updated_at: string;
}

export interface ProfileContentListResponse {
  success: boolean;
  message: string;
  data: {
    items: ProfileContentItem[];
    total?: number;
  };
}

export interface ProfileContentMutationResponse {
  success: boolean;
  message: string;
  data: ProfileContentItem;
}

export interface ProfileContentPayload {
  title: string;
  description: string;
  content: string;
  link?: string;
}

export interface ProfileDownloadItem {
  id: string;
  title: string;
  file_type: string;
  size: string;
  downloaded_at: string;
  download_url?: string;
}

export interface ProfileDownloadsListResponse {
  success: boolean;
  message: string;
  data: {
    items: ProfileDownloadItem[];
    total?: number;
  };
}

export interface ProfileReDownloadResponse {
  success: boolean;
  message: string;
  data: {
    download_url?: string;
    url?: string;
  };
}

export interface ProfileReDownloadPayload {
  id: string;
}

export interface ProfileData {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  mobile_number: string;
  bio: string;
  street: string;
  city: string;
  state: string;
  zip: string;
  country: string;
  time_zone: string;
  avatar_url?: string;
  created_at?: string;
}

export interface ProfileResponse {
  success: boolean;
  message: string;
  data: ProfileData;
}

export interface ProfileUpdatePayload {
  first_name: string;
  last_name: string;
  email: string;
  mobile_number: string;
  bio: string;
  street: string;
  city: string;
  state: string;
  zip: string;
  country: string;
  time_zone: string;
}

export interface ChangePasswordPayload {
  current_password: string;
  new_password: string;
  new_password_confirmation: string;
}

export interface ChangePasswordResponse {
  success: boolean;
  message: string;
}

export interface DashboardAnnouncement {
  id: string;
  title: string;
  body: string;
  created_at: string;
  updated_at: string;
}

export interface DashboardAnnouncementsListResponse {
  success: boolean;
  message: string;
  data: {
    items: DashboardAnnouncement[];
  };
}

export interface DashboardAnnouncementPayload {
  title: string;
  body: string;
}

export interface DashboardAnnouncementMutationResponse {
  success: boolean;
  message: string;
  data: DashboardAnnouncement;
}

export interface DashboardActivityItem {
  id: string;
  title: string;
  description: string;
  created_at: string;
}

export interface DashboardPromptItem {
  id: string;
  label: string;
  text: string;
}

export interface DashboardAnalytics {
  downloads: number;
  content_generated: number;
  credits_used: number;
  credits_limit: number;
  recent_activities: DashboardActivityItem[];
  prompts: DashboardPromptItem[];
}

export interface DashboardAnalyticsResponse {
  success: boolean;
  message: string;
  data: DashboardAnalytics;
}
