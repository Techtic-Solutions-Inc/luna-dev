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
  phone?: string | null;
  token: string;
  accessToken: string;
  refreshToken?: string;
  tokenType: string;
}

export interface LoginResponse {
  success: boolean;
  message: string;
  data: LoginResponseData;
}

export interface ApiErrorBody {
  code: string;
  details?: Record<string, string[]> | null;
}

export interface ApiErrorResponse {
  success: false;
  message: string;
  error: ApiErrorBody;
  path: string;
  timestamp: string;
}

export interface VisitorHomeContent {
  marketing_message: string;
  sub_heading: string;
  contact_email: string;
  privacy_policy_link: string;
  terms_of_service_link: string;
  phone: string;
  terms_accepted: boolean;
}
