import type { ApiSuccessResponse } from './api';

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponseData {
  id: string;
  name: string;
  full_name: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string | null;
  token: string;
  accessToken: string;
  refreshToken: string;
  tokenType: string;
}

export type LoginResponse = ApiSuccessResponse<LoginResponseData>;
