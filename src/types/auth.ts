export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponseData {
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

export interface SignupRequest {
  first_name: string;
  last_name: string;
  email: string;
  phone?: string;
  password: string;
  terms_accepted: boolean;
}

export interface SignupResponseData {
  id: string;
  name: string;
  full_name: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string | null;
  email_verified: boolean;
}
