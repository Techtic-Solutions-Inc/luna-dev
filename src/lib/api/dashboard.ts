import apiClient from './client';
import type { ContentCalendarEntry, DashboardOverview } from '../../types/api';

interface ApiResponse<T> {
  message: string;
  data: T;
}

export const getDashboard = async (): Promise<DashboardOverview> => {
  const response = await apiClient.get<ApiResponse<DashboardOverview>>('/dashboard');
  return response.data.data;
};

export const getContentCalendar = async (): Promise<ContentCalendarEntry[]> => {
  const response =
    await apiClient.get<ApiResponse<{ items: ContentCalendarEntry[] }>>('/content-calendar');
  return response.data.data.items;
};
