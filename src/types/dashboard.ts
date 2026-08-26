import type { ApiSuccessResponse } from './api';

export interface DashboardProfile {
  id: string;
  full_name: string;
  email: string;
  phone?: string | null;
}

export interface DashboardAnalyticsMetrics {
  content_generated: number;
  downloads: number;
  current_ai_credits: number;
  total_ai_credits: number;
  remaining_ai_credits: number;
}

export interface DashboardAnalytics {
  id: string;
  status: string;
  description: string;
  link?: string | null;
  error?: null;
  analytics_data: DashboardAnalyticsMetrics;
  full_name: string;
  email: string;
  phone?: string | null;
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
  link?: string | null;
  status: string;
  error?: null;
  created_at: string;
  updated_at: string;
}

export interface ContentCalendarEntry {
  id: string;
  title: string;
  date: string;
  content: string;
  description: string;
  full_name: string;
  phone: string;
  link?: string | null;
  error?: null;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface DashboardOverviewData {
  profile: DashboardProfile;
  analytics: DashboardAnalytics;
  announcements: DashboardAnnouncement[];
  content_calendar: ContentCalendarEntry[];
  status: string;
  error?: null;
  link?: string | null;
  description: string;
}

export type DashboardOverviewResponse = ApiSuccessResponse<DashboardOverviewData>;
