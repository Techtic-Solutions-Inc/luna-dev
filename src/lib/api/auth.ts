import { apiClient } from '@/lib/api/client';
import { isRecord } from '@/types/api';
import type { LoginRequest, LoginResponse, LoginUserData, LogoutResponse, SignupRequest, SignupResponse } from '@/types/auth';

function asLoginUserData(value: unknown): LoginUserData {
  if (!isRecord(value)) {
    throw new Error('Login response is missing user data');
  }
  const token = typeof value.token === 'string' ? value.token : typeof value.accessToken === 'string' ? value.accessToken : '';
  const accessToken = typeof value.accessToken === 'string' ? value.accessToken : token;
  return {
    id: typeof value.id === 'string' ? value.id : '',
    name: typeof value.name === 'string' ? value.name : '',
    first_name: typeof value.first_name === 'string' ? value.first_name : '',
    last_name: typeof value.last_name === 'string' ? value.last_name : '',
    email: typeof value.email === 'string' ? value.email : '',
    token,
    accessToken,
    refreshToken: typeof value.refreshToken === 'string' ? value.refreshToken : '',
    tokenType: 'Bearer',
  };
}

export async function signup(body: SignupRequest): Promise<SignupResponse> {
  const response = await apiClient.post<SignupResponse>('/api/signup', body);
  return isRecord(response.data) ? response.data : {};
}

export async function login(body: LoginRequest): Promise<LoginResponse> {
  const response = await apiClient.post<unknown>('/api/auth/login', body);
  const payload = response.data;
  if (isRecord(payload) && isRecord(payload.data)) {
    return {
      success: true,
      message: typeof payload.message === 'string' ? payload.message : 'Signed in successfully',
      data: asLoginUserData(payload.data),
    };
  }
  return {
    success: true,
    message: 'Signed in successfully',
    data: asLoginUserData(payload),
  };
}

export async function logout(): Promise<LogoutResponse> {
  const response = await apiClient.get<unknown>('/api/auth/logout');
  return isRecord(response.data) ? response.data : {};
}
