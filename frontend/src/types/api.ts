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

export interface PasswordRecoveryRequest {
  email: string;
}

export interface PasswordRecoveryResponseData {
  id: string;
  email: string;
  title: string;
  message: string;
  description: string;
  link: null;
}

export interface PasswordRecoveryResponse {
  success: boolean;
  message: string;
  data: PasswordRecoveryResponseData;
}

export interface VisitorSubscribeRequest {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  experience: string;
  marketing: string;
  message: string;
  privacy_accepted: boolean;
  terms_accepted: boolean;
}

export interface VisitorSubscribeResponseData {
  id: string;
  email: string;
  title: string;
  message: string;
  description: string;
  link: null;
}

export interface VisitorSubscribeResponse {
  success: boolean;
  message: string;
  data: VisitorSubscribeResponseData;
}

export interface ErrorEnvelope {
  detail?: string;
  success?: boolean;
  message?: string;
  error?: {
    code: string;
    details: Record<string, unknown> | null;
  };
}

export type ApiResult<T> =
  | { ok: true; data: T }
  | { ok: false; error: ErrorEnvelope; status: number };

export function getErrorMessage(error: ErrorEnvelope): string {
  if (typeof error.detail === 'string' && error.detail.length > 0) {
    return error.detail;
  }
  if (typeof error.message === 'string' && error.message.length > 0) {
    return error.message;
  }
  return 'Something went wrong. Please try again.';
}

export interface UserProfile {
  first_name: string;
  last_name: string;
  email: string;
  mobile: string;
  bio: string;
  timezone: string;
  street: string;
  country: string;
  state: string;
  city: string;
  zip: string;
  avatar_url: string;
  member_since: string;
}

export interface ProfileResponse {
  email: string;
  profile: UserProfile;
}

export interface UpdateProfileRequest {
  first_name: string;
  last_name: string;
  email: string;
  mobile: string;
  bio: string;
  timezone: string;
  street: string;
  country: string;
  state: string;
  city: string;
  zip: string;
}

export interface DownloadHistoryItem {
  id: string;
  title: string;
  category: string;
  size: string;
  date: string;
}

export interface ContentHistoryItem {
  id: string;
  title: string;
  preview: string;
  date: string;
  time: string;
}
