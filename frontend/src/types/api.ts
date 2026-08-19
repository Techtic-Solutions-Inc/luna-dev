export interface LoginResponse {
  success: boolean;
  message: string;
  data: {
    id: string;
    name: string;
    first_name: string;
    last_name: string;
    email: string;
    token: string;
    accessToken: string;
    refreshToken: string;
    tokenType: string;
  };
}

export interface ErrorResponse {
  message: string;
  errors?: Record<string, string[]>;
}

export interface ForgotPasswordResponse {
  success: boolean;
  message: string;
}

export interface SignUpResponse {
  success: boolean;
  message: string;
}

export interface EmailVerifyResponse {
  success: boolean;
  message: string;
}
