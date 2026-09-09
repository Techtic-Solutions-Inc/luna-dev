import apiClient from './client';
import type { LoginRequest, LoginResponse } from '@/types';

export async function loginUser(payload: LoginRequest): Promise<LoginResponse> {
  const response = await apiClient.post<LoginResponse>('/auth/login', payload);
  return response.data;
}
