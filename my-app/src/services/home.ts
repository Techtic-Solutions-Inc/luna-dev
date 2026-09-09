import { apiClient } from '@/lib/api/client';
import { HOME_API_PATH, type HomeQueryParams, type HomeResponse } from '@/types/home';

export async function fetchHome(params: HomeQueryParams = {}): Promise<HomeResponse> {
  const response = await apiClient.get<HomeResponse>(HOME_API_PATH, { params });
  return response.data;
}
