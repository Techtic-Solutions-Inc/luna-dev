import apiClient from './client';
import type { SignupRequest, SignupResponse } from '@/types';

export async function signupUser(payload: SignupRequest): Promise<SignupResponse> {
  const response = await apiClient.post<SignupResponse>('/api/signup', payload);
  return response.data;
}
