export interface ApiSuccessEnvelope<T> {
  success: boolean;
  message: string;
  data: T;
}

export interface ApiErrorEnvelope {
  success?: boolean;
  message: string;
  errors?: Record<string, string[]>;
}

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
  tokenType: string;
}

export type LoginResponse = ApiSuccessEnvelope<LoginUserData>;

export interface SignupRequest {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  terms_accepted: boolean;
}

export type SignupUserData = Record<string, unknown>;

export type SignupResponse = ApiSuccessEnvelope<SignupUserData>;
