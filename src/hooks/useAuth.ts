import { clearSessionRejected, isSessionRejected } from "../lib/session";

export const AUTH_TOKEN_KEY = "token";

export function getToken(): string | null {
  if (isSessionRejected()) {
    return null;
  }
  try {
    const legacy = localStorage.getItem("luna_auth_token");
    const current = localStorage.getItem(AUTH_TOKEN_KEY);
    return current ?? legacy;
  } catch {
    return null;
  }
}

export function setToken(token: string): void {
  clearSessionRejected();
  try {
    localStorage.setItem(AUTH_TOKEN_KEY, token);
    localStorage.removeItem("luna_auth_token");
  } catch {
    /* ignore */
  }
}

export function clearToken(): void {
  try {
    localStorage.removeItem(AUTH_TOKEN_KEY);
    localStorage.removeItem("luna_auth_token");
  } catch {
    /* ignore */
  }
}

export function isAuthenticated(): boolean {
  return Boolean(getToken());
}

export function useAuth() {
  return {
    getToken,
    setToken,
    clearToken,
    isAuthenticated,
  };
}
