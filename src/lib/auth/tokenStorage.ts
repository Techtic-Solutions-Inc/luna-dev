const TOKEN_KEY = 'token';
const REMEMBER_KEY = 'remember_me';

export function getToken(): string | null {
  return localStorage.getItem(TOKEN_KEY) ?? sessionStorage.getItem(TOKEN_KEY);
}

export function setToken(token: string, rememberMe: boolean): void {
  if (rememberMe) {
    localStorage.setItem(TOKEN_KEY, token);
    sessionStorage.removeItem(TOKEN_KEY);
    localStorage.setItem(REMEMBER_KEY, 'true');
  } else {
    sessionStorage.setItem(TOKEN_KEY, token);
    localStorage.removeItem(TOKEN_KEY);
    localStorage.setItem(REMEMBER_KEY, 'false');
  }
}

export function clearToken(): void {
  localStorage.removeItem(TOKEN_KEY);
  sessionStorage.removeItem(TOKEN_KEY);
}

export function getRememberMePreference(): boolean {
  return localStorage.getItem(REMEMBER_KEY) === 'true';
}

export function setRememberMePreference(value: boolean): void {
  localStorage.setItem(REMEMBER_KEY, value ? 'true' : 'false');
}
