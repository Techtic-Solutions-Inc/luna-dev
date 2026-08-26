import apiClient from './client';
import type { DashboardOverviewData } from '@/types/dashboard';

export async function getDashboard(): Promise<DashboardOverviewData> {
  const response = await apiClient.get<DashboardOverviewData>('/api/dashboard');
  return response.data;
}
