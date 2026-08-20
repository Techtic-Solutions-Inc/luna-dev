const TOKEN_KEY = 'token';
const REMEMBERED_EMAIL_KEY = 'rememberedEmail';

export function getToken(): string | null {
  return localStorage.getItem(TOKEN_KEY);
}

export function setToken(token: string): void {
  localStorage.setItem(TOKEN_KEY, token);
}

export function clearToken(): void {
  localStorage.removeItem(TOKEN_KEY);
}

export function getRememberedEmail(): string | null {
  return localStorage.getItem(REMEMBERED_EMAIL_KEY);
}

export function setRememberedEmail(email: string): void {
  localStorage.setItem(REMEMBERED_EMAIL_KEY, email);
}

export function clearRememberedEmail(): void {
  localStorage.removeItem(REMEMBERED_EMAIL_KEY);
}

export function isAuthenticated(): boolean {
  return Boolean(getToken());
}
