import apiClient from './client';
import type { ContentCalendarResponse } from '../../types/api';

export const fetchContentCalendar = async (): Promise<ContentCalendarResponse> => {
  const response = await apiClient.get<ContentCalendarResponse>('/content-calendar');
  return response.data;
};
