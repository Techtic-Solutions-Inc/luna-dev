const TOKEN_KEY = 'token';
const REFRESH_TOKEN_KEY = 'refreshToken';

function storageFor(rememberMe: boolean): Storage {
  return rememberMe ? localStorage : sessionStorage;
}

export function getAccessToken(): string | null {
  return localStorage.getItem(TOKEN_KEY) ?? sessionStorage.getItem(TOKEN_KEY);
}

export function getRefreshToken(): string | null {
  return localStorage.getItem(REFRESH_TOKEN_KEY) ?? sessionStorage.getItem(REFRESH_TOKEN_KEY);
}

export function setAccessToken(token: string, rememberMe = true): void {
  clearAccessToken();
  storageFor(rememberMe).setItem(TOKEN_KEY, token);
}

export function setRefreshToken(token: string, rememberMe = true): void {
  storageFor(rememberMe).setItem(REFRESH_TOKEN_KEY, token);
}

export function clearAccessToken(): void {
  localStorage.removeItem(TOKEN_KEY);
  sessionStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(REFRESH_TOKEN_KEY);
  sessionStorage.removeItem(REFRESH_TOKEN_KEY);
}

export function isAuthenticated(): boolean {
  return Boolean(getAccessToken());
}
