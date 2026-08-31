export const AUTH_TOKEN_KEY = 'token';
export const AUTH_USER_KEY = 'auth_user';

export const endpoints = {
  login: '/auth/login',
  currentUser: '/api/v1/users/me',
} as const;

export interface LoginRequestBody {
  email: string;
  password: string;
}

export interface AuthUser {
  id: string;
  name: string;
  first_name: string;
  last_name: string;
  email: string;
}

export interface LoginResponseData extends AuthUser {
  token: string;
  accessToken: string;
  refreshToken: string;
  tokenType: string;
}

export interface LoginResponse {
  success: boolean;
  message: string;
  data: LoginResponseData;
}

export interface ErrorResponse {
  message: string;
  errors: Record<string, string[]>;
}

export interface CurrentUserEnvelope {
  success?: boolean;
  message?: string;
  data?: AuthUser;
}
