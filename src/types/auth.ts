import type { ApiSuccessResponse } from './api';

/** `POST /auth/login` request body. */
export interface LoginRequest {
  email: string;
  password: string;
}

/** The signed-in user, as returned by `POST /auth/login`. */
export interface AuthenticatedUser {
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

export type LoginResponse = ApiSuccessResponse<AuthenticatedUser>;
