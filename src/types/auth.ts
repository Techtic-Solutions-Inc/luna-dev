import type { ApiSuccessEnvelope } from './api';

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginUserData {
  id: string;
  name: string;
  first_name: string;
  last_name: string;
  email: string;
  token: string;
  accessToken: string;
  refreshToken: string;
  tokenType: 'Bearer';
}

export type LoginResponse = ApiSuccessEnvelope<LoginUserData>;

export interface SignupRequest {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  terms_accepted: true;
}

export interface SignupResponse {
  success?: boolean;
  message?: string;
  data?: Record<string, unknown>;
}

export type LogoutResponse = Record<string, unknown>;
