import { login as loginRequest } from '../lib/api/client';
import type { LoginRequest, LoginSuccessResponse } from '../types/auth';

export async function loginUser(body: LoginRequest): Promise<LoginSuccessResponse> {
  return loginRequest(body);
}
