export interface AuthUser {
  email: string;
  name?: string;
}

export interface AuthState {
  token: string | null;
  isAuthenticated: boolean;
}
