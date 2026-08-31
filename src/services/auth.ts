import { apiClient } from '@/lib/api/client';
import { endpoints, type LoginRequestBody, type LoginResponse } from '@/types/api';

export async function loginRequest(body: LoginRequestBody): Promise<LoginResponse> {
  const response = await apiClient.post<LoginResponse>(endpoints.login, body);
  return response.data;
}
