import apiClient from './client';
import type { ContentCalendarListResponse } from '../../types/api';

export const fetchExampleData = async (): Promise<ContentCalendarListResponse> => {
  const response = await apiClient.get<ContentCalendarListResponse>(
    '/content-calendar',
  );
  return response.data;
};
