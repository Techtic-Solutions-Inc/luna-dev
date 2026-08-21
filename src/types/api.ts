export interface ApiSuccessResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

export interface ApiErrorResponse {
  message: string;
  errors?: Record<string, string[] | string>;
}

export interface SubmitEmailRequest {
  email: string;
  first_name: string;
  last_name: string;
  phone: string;
  years_in_real_estate: string;
  current_marketing: string;
  message: string;
}

export interface SubmitEmailData {
  email: string;
}
