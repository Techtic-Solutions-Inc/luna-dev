export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginUser {
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
  data: LoginUser;
}

export interface ErrorResponse {
  message: string;
  errors: Record<string, string[]>;
}

export interface ForgotPasswordRequest {
  email: string;
}

export interface ForgotPasswordResponse {
  success: boolean;
  message: string;
}

export interface ParsedApiError {
  message: string;
  errors: Record<string, string[]>;
}

export interface SignUpRequest {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  terms_accepted: boolean;
}

export interface SignUpResponse {
  success: boolean;
  message: string;
}

export interface VerifyEmailRequest {
  email: string;
}

export interface VerifyEmailResponse {
  success: boolean;
  message: string;
}

export interface HomeSearchItem {
  id: string;
  title: string;
  image: string;
  caption: string;
}

export interface HomeSearchResponse {
  success: boolean;
  message: string;
  data: HomeSearchItem[];
}

export interface HomeSubscribeRequest {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
}

export interface HomeSubscribeResponse {
  success: boolean;
  message: string;
}

export interface TermsAcceptanceRequest {
  privacy_accepted: boolean;
  terms_accepted: boolean;
}

export interface TermsAcceptanceResponse {
  success: boolean;
  message: string;
}
