import { apiClient } from '@/lib/api/client';
import type { ContentCalendarResponse } from '@/types/api';

export async function getContentCalendar(): Promise<ContentCalendarResponse> {
  const response = await apiClient.get<ContentCalendarResponse>('/content-calendar');
  return response.data;
}
