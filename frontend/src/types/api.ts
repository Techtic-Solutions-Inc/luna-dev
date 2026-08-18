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
  date: string;
  content: string;
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
  date: string;
  content: string;
}

export interface ProfileDownloadItem {
  id: string;
  title: string;
  file_type: string;
  size: string;
  date: string;
  created_at: string;
  updated_at: string;
  url: string;
}

export interface ProfileDownloadListResponse {
  success: boolean;
  message: string;
  data: {
    items: ProfileDownloadItem[];
    total?: number;
  };
}

export interface ReDownloadPayload {
  id: string;
  url?: string;
  title?: string;
}

export interface ReDownloadResponse {
  success: boolean;
  message: string;
  data: {
    id?: string;
    url?: string;
    link?: string;
    download_url?: string;
  };
}

export interface UserProfile {
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
  name: string;
  avatar: string;
  created_at: string;
}

export interface UserProfilePayload {
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

export interface UserProfileResponse {
  success: boolean;
  message: string;
  data: UserProfile;
}

export interface ChangePasswordPayload {
  current_password: string;
  new_password: string;
  confirm_password: string;
}

export interface ChangePasswordResponse {
  success: boolean;
  message: string;
}

export interface DashboardAnnouncement {
  id: string;
  title: string;
  description: string;
  date: string;
  created_at: string;
  updated_at: string;
}

export interface DashboardAnnouncementPayload {
  title: string;
  description: string;
}

export interface DashboardAnnouncementListResponse {
  success: boolean;
  message: string;
  data: {
    items: DashboardAnnouncement[];
  };
}

export interface DashboardAnnouncementMutationResponse {
  success: boolean;
  message: string;
  data: DashboardAnnouncement;
}

export interface DashboardActivity {
  id: string;
  title: string;
  description: string;
  date: string;
}

export interface DashboardAnalytics {
  downloads: number;
  content_generated: number;
  ai_credits_used: number;
  ai_credits_limit: number;
  activities: DashboardActivity[];
}

export interface DashboardAnalyticsResponse {
  success: boolean;
  message: string;
  data: DashboardAnalytics;
}
