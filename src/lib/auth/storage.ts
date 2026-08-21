const TOKEN_KEY = 'authToken';
const REFRESH_TOKEN_KEY = 'refreshToken';

export const AUTH_CHANGED_EVENT = 'auth-changed';

const notifyAuthChanged = (): void => {
  window.dispatchEvent(new Event(AUTH_CHANGED_EVENT));
};

export const setToken = (token: string): void => {
  localStorage.setItem(TOKEN_KEY, token);
  notifyAuthChanged();
};

export const getToken = (): string | null => {
  return localStorage.getItem(TOKEN_KEY);
};

export const removeToken = (): void => {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(REFRESH_TOKEN_KEY);
  notifyAuthChanged();
};

export const setRefreshToken = (token: string): void => {
  localStorage.setItem(REFRESH_TOKEN_KEY, token);
};

export const getRefreshToken = (): string | null => {
  return localStorage.getItem(REFRESH_TOKEN_KEY);
};
