import apiClient from './client';
import type { VisitorHomeParams, VisitorHomeResponse } from '@/types';

export async function fetchVisitorHome(
  params: VisitorHomeParams = {},
): Promise<VisitorHomeResponse> {
  const response = await apiClient.get<VisitorHomeResponse>('/api/visitor/home', {
    params,
  });
  return response.data;
}
