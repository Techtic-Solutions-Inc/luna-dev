import apiClient from './client';
import type {
  ContentCalendarListResponse,
  ContentCalendarEntry,
  CreateContentCalendarEntryRequest,
  UpdateContentCalendarEntryRequest,
} from '../../types/contentCalendar';

export async function fetchContentCalendarEntries(): Promise<ContentCalendarListResponse> {
  const response = await apiClient.get<ContentCalendarListResponse>('/content-calendar');
  return response.data;
}

export async function createContentCalendarEntry(
  data: CreateContentCalendarEntryRequest
): Promise<{ success: boolean; message: string; data: ContentCalendarEntry }> {
  const response = await apiClient.post('/content-calendar', data);
  return response.data;
}

export async function updateContentCalendarEntry(
  id: string,
  data: UpdateContentCalendarEntryRequest
): Promise<{ success: boolean; message: string; data: ContentCalendarEntry }> {
  const response = await apiClient.put(`/content-calendar/${id}`, data);
  return response.data;
}

export async function deleteContentCalendarEntry(id: string): Promise<void> {
  await apiClient.delete(`/content-calendar/${id}`);
}
