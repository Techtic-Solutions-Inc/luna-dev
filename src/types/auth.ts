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

export interface LoginResponse {
  success: boolean;
  message: string;
  data: LoginUserData;
}

export interface ErrorResponse {
  message: string;
  errors: Record<string, string[]>;
}
