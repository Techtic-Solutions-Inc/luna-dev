import type { LoginRequest, LoginResponse } from '../../types/api';
import apiClient from './client';

function isLoginResponse(value: unknown): value is LoginResponse {
  if (!value || typeof value !== 'object') return false;
  const candidate = value as LoginResponse;
  if (candidate.success !== true || typeof candidate.message !== 'string') return false;
  const data = candidate.data;
  if (!data || typeof data !== 'object') return false;
  return typeof data.token === 'string' || typeof data.accessToken === 'string';
}

export async function login(payload: LoginRequest): Promise<LoginResponse> {
  const response = await apiClient.post<LoginResponse>('/auth/login', payload);
  if (!isLoginResponse(response.data)) {
    throw new Error('Sign in response was not recognized.');
  }
  return response.data;
}
