import { apiClient } from '@/lib/api/client';
import {
  endpoints,
  type ForgotPasswordRequestBody,
  type ForgotPasswordResponse,
  type LoginRequestBody,
  type LoginResponse,
  type LogoutResponse,
  type SignupRequestBody,
  type SignupResponse,
} from '@/types/api';

export async function loginRequest(body: LoginRequestBody): Promise<LoginResponse> {
  const response = await apiClient.post<LoginResponse>(endpoints.login, body);
  const payload = response.data;
  if (payload.success === false) {
    throw new Error(payload.message || 'Unable to sign in. Please try again.');
  }
  return payload;
}

export async function forgotPasswordRequest(
  body: ForgotPasswordRequestBody,
): Promise<ForgotPasswordResponse> {
  const response = await apiClient.post<ForgotPasswordResponse>(endpoints.forgotPassword, body);
  const payload = response.data;
  if (payload.success === false) {
    throw new Error(payload.message || 'Unable to send a reset link. Please try again.');
  }
  return payload;
}

export async function signupRequest(body: SignupRequestBody): Promise<SignupResponse> {
  const response = await apiClient.post<SignupResponse>(endpoints.signup, body);
  const payload = response.data;
  if (payload.success === false) {
    throw new Error(payload.message || 'Unable to create your account. Please try again.');
  }
  return payload;
}

export async function logoutRequest(): Promise<LogoutResponse> {
  const response = await apiClient.get<LogoutResponse>(endpoints.logout);
  return response.data;
}
