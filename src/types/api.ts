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

export interface ErrorEnvelope {
  success: boolean;
  message: string;
  error: {
    code: string;
    details: Record<string, unknown> | null;
  };
}

export type ApiResult<T> =
  | { ok: true; data: T }
  | { ok: false; error: ErrorEnvelope; status: number };
