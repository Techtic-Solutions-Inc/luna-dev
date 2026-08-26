import apiClient from './client';
import type { LoginRequest, LoginResponseData } from '@/types/auth';
import type { SignupRequest, RegisteredUser } from '@/types/auth';

export async function login(body: LoginRequest): Promise<LoginResponseData> {
  const response = await apiClient.post<LoginResponseData>('/api/auth/login', body);
  return response.data;
}

export async function signup(body: SignupRequest): Promise<RegisteredUser> {
  const response = await apiClient.post<RegisteredUser>('/api/auth/signup', body);
  return response.data;
}
