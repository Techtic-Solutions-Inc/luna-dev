import apiClient from './client';
import type { ContentCalendarListResponse } from '../../types/contentCalendar';

export async function fetchContentCalendar(): Promise<ContentCalendarListResponse> {
  const response = await apiClient.get<ContentCalendarListResponse>('/content-calendar');
  return response.data;
}
