export type UserRole =
  | 'agent'
  | 'admin'
  | 'marketing_manager'
  | 'real_estate_professional';

export interface ApiSuccessResponse<T> {
  success: true;
  message: string;
  data: T;
}

export interface ApiErrorResponse {
  success?: false;
  message: string;
  errors?: Record<string, string[] | string>;
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
  tokenType: 'Bearer' | string;
}

export type LoginResponse = ApiSuccessResponse<LoginUserData>;

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

export interface ContentCalendarListData {
  items: ContentCalendarEntry[];
}

export type ContentCalendarListResponse = ApiSuccessResponse<ContentCalendarListData>;

export interface CreateContentCalendarEntryRequest {
  title: string;
  date: string;
  content: string;
  full_name: string;
  phone: string;
  link?: string;
}

export interface UpdateContentCalendarEntryRequest {
  title?: string;
  date?: string;
  content?: string;
  description?: string;
  full_name?: string;
  phone?: string;
  link?: string;
}

export type ContentCalendarMutationResponse = ApiSuccessResponse<ContentCalendarEntry>;

export interface DashboardAnalyticsData {
  content_generated: number;
  downloads: number;
  credits_used: number;
  credits_limit: number;
}

export interface DashboardAnnouncement {
  id: string;
  title: string;
  content: string;
  link: string | null;
  created_at: string;
}

export interface DashboardQuestionRequest {
  message: string;
}

export interface DashboardQuestionResponse {
  answer: string;
  credits_used: number | null;
}

export interface PromptLibraryItem {
  id: string;
  category: string;
  prompt: string;
}

export interface Profile {
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
  avatar_url: string;
  created_at: string;
}

export interface UpdateProfileRequest {
  first_name?: string;
  last_name?: string;
  email?: string;
  mobile_number?: string;
  bio?: string;
  street?: string;
  city?: string;
  state?: string;
  zip?: string;
  country?: string;
  time_zone?: string;
}

export interface ChangePasswordRequest {
  current_password: string;
  new_password: string;
  confirm_password: string;
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

export interface ProfileDownloadItem {
  id: string;
  title: string;
  file_type: string;
  size: string;
  downloaded_at: string;
  download_url: string;
}

export interface CreateProfileContentRequest {
  title: string;
  description?: string;
  content?: string;
  link?: string;
}

export interface UpdateProfileContentRequest {
  title?: string;
  description?: string;
  content?: string;
  link?: string;
}

export type Platform = 'instagram' | 'facebook';
export type PostType = 'Post' | 'Story' | 'Reel';

export interface ScheduledPostView {
  item: ContentCalendarEntry;
  platform: Platform;
  postType: PostType;
  scheduledAt: Date;
  timeLabel: string;
}

export interface PositionedPost {
  post: ScheduledPostView;
  top: number;
}
