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
  phone?: string | null;
  token: string;
  accessToken: string;
  refreshToken?: string;
  tokenType: string;
}

export type LoginResponse = ApiSuccessResponse<LoginResponseData>;

export interface SignupRequest {
  first_name: string;
  last_name: string;
  email: string;
  phone?: string;
  password: string;
  terms_accepted: boolean;
}

export interface RegisteredUser {
  id: string;
  name: string;
  full_name: string;
  first_name: string;
  last_name: string;
  email: string;
  phone?: string | null;
  email_verified: boolean;
}

export type SignupResponse = ApiSuccessResponse<RegisteredUser>;

export interface SessionUser {
  id: string;
  full_name: string;
  first_name: string;
  last_name: string;
  email: string;
}

export interface Session {
  token: string;
  accessToken: string;
  refreshToken?: string;
  tokenType: string;
  user: SessionUser;
}
