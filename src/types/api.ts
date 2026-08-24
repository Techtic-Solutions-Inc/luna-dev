export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  token?: string;
  accessToken?: string;
}

export interface ApiError {
  detail: string;
}

export type AsyncStatus = 'idle' | 'loading' | 'empty' | 'error' | 'success';
