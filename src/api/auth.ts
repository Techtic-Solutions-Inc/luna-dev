import { apiRequest } from './client';
import type { LoginRequest, LoginResponse } from '../types/api';

export async function login(payload: LoginRequest): Promise<LoginResponse> {
  return apiRequest<LoginResponse>('/api/auth/login', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}
