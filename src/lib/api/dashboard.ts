import apiClient from './client';
import type {
  CreateDashboardNotificationRequest,
  DashboardNotificationResponse,
  DashboardOverviewData,
  UpdateSubscriptionRequest,
} from '@/types/dashboard';

export async function getDashboard(): Promise<DashboardOverviewData> {
  const response = await apiClient.get<DashboardOverviewData>('/api/dashboard');
  return response.data;
}

export async function postDashboardNotification(
  body: CreateDashboardNotificationRequest,
): Promise<DashboardNotificationResponse> {
  const response = await apiClient.post<DashboardNotificationResponse>(
    '/api/dashboard/notifications',
    body,
  );
  return response.data;
}

export async function putDashboardSubscription(
  body: UpdateSubscriptionRequest,
): Promise<void> {
  await apiClient.put<void>('/api/dashboard/subscription', body);
}

export async function deleteDashboardNotification(id: string): Promise<void> {
  await apiClient.delete<void>(`/api/dashboard/notifications/${id}`);
}
