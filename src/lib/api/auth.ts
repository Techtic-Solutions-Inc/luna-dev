import axios from 'axios';
import type {
  ForgotPasswordRequest,
  ForgotPasswordResponse,
  LoginRequest,
  LoginResponse,
} from '../../types/auth';
import apiClient from './client';

export async function login(body: LoginRequest): Promise<LoginResponse> {
  const response = await apiClient.post<LoginResponse>('/auth/login', body);
  return response.data;
}

export async function forgotPassword(body: ForgotPasswordRequest): Promise<ForgotPasswordResponse> {
  try {
    const response = await apiClient.post<ForgotPasswordResponse>('/auth/forgot-password', body);
    return response.data;
  } catch (err) {
    // Backend baseURL / path prefix varies between environments.
    if (axios.isAxiosError(err) && err.response?.status === 404) {
      const response = await apiClient.post<ForgotPasswordResponse>(
        '/api/auth/forgot-password',
        body
      );
      return response.data;
    }
    throw err;
  }
}
