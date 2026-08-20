export interface ApiSuccessResponse<T> {
  success: true;
  message: string;
  data: T;
}

export interface ApiErrorResponse {
  statusCode: number;
  message: string | string[];
  errors?: Record<string, string[]>;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginUser {
  id: string;
  name: string;
  full_name: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string | null;
}

export interface LoginTokens {
  token: string;
  accessToken: string;
  refreshToken: string;
  tokenType: 'Bearer';
}

export type LoginResponseData = LoginUser & LoginTokens;

export type LoginResponse = ApiSuccessResponse<LoginResponseData>;
