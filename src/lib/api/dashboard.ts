import apiClient from './client';
import type { DashboardOverviewResponse, DashboardAnnouncementListResponse } from '../../types/dashboard';

export async function fetchDashboardOverview(): Promise<DashboardOverviewResponse> {
  const response = await apiClient.get<DashboardOverviewResponse>('/dashboard');
  return response.data;
}

export async function fetchDashboardAnnouncements(): Promise<DashboardAnnouncementListResponse> {
  const response = await apiClient.get<DashboardAnnouncementListResponse>('/dashboard/announcements');
  return response.data;
}
