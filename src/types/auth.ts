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
  phone: string | null;
  token: string;
  accessToken: string;
  refreshToken: string;
  tokenType: 'Bearer';
}

export interface SignupRequest {
  first_name: string;
  last_name: string;
  email: string;
  phone?: string;
  password: string;
  terms_accepted: true;
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
