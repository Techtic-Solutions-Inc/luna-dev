export interface SignupResponse {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
}

export interface LoginResponse {
  success: boolean;
  message: string;
  data: {
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
  };
}

export interface ErrorResponse {
  success: boolean;
  message: string;
  error: {
    code: string;
    details: unknown;
  };
}
