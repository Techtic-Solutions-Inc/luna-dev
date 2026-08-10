import { apiRequest } from './client';
import type { SignupRequest, SignupResponse } from '../types/api';

export async function signup(payload: SignupRequest): Promise<SignupResponse> {
  return apiRequest<SignupResponse>('/api/signup', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}
