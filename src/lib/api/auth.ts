import apiClient from './client';
import type { LoginResponse } from '../../types/api';

export const loginRequest = async (
  email: string,
  password: string,
): Promise<LoginResponse> => {
  const response = await apiClient.post<LoginResponse>('/auth/login', {
    email,
    password,
  });
  return response.data;
};
