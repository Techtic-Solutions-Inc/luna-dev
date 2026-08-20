export interface ApiSuccessResponse<T> {
  success: true;
  message: string;
  data: T;
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

export type LoginResponse = ApiSuccessResponse<LoginUser & LoginTokens>;

export interface ValidationErrorBody {
  message: 'Validation failed';
  errors: Record<string, string[]>;
}

export interface ApiErrorResponse {
  statusCode: number;
  message: string | ValidationErrorBody;
}

export interface SignupRequest {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  terms_accepted: boolean;
  phone?: string;
}

export interface ForgotPasswordRequest {
  email: string;
  privacy_accepted?: boolean;
  terms_accepted?: boolean;
}

export interface EmailVerificationRequest {
  email: string;
  privacy_accepted?: boolean;
  terms_accepted: boolean;
}

export function extractAccessToken(data: LoginUser & LoginTokens): string {
  return data.accessToken ?? data.token;
}
