import apiClient from './client';

export async function getVisitorHome(): Promise<unknown> {
  const response = await apiClient.get<unknown>('/api/visitor/home');
  return response.data;
}
