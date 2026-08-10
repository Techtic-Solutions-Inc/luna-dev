export interface SignupRequest {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  terms_accepted: boolean;
}

export interface SignupResponseData {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  name: string;
  title: string;
  message: string;
  description: string;
  link: string | null;
  redirect: string;
}

export interface SignupResponse {
  success: boolean;
  message: string;
  data: SignupResponseData;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponseData {
  id: string;
  email: string;
  access_token: string;
  token_type: string;
  expires_in: number;
  title: string;
  message: string;
  description: string;
  link: string;
  redirect: string;
}

export interface LoginResponse {
  success: boolean;
  message: string;
  data: LoginResponseData;
}

export interface ApiErrorEnvelope {
  success: boolean;
  message: string;
  error?: {
    code: string;
    details: Record<string, unknown> | null;
  };
}

export interface VisitorSubscribeRequest {
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string;
  privacy_policy_accepted: boolean;
  terms_accepted: boolean;
}

export interface VisitorSubscribeResponseData {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  message: string;
  title: string;
  description: string;
  redirect: string;
}

export interface VisitorSubscribeResponse {
  success: boolean;
  message: string;
  data: VisitorSubscribeResponseData;
}
