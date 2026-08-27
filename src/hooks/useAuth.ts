import { TOKEN_KEY } from '../lib/api/client';

export function useAuth() {
  const getToken = (): string | null => {
    if (typeof window === 'undefined') {
      return null;
    }
    return window.localStorage.getItem(TOKEN_KEY);
  };

  const setToken = (token: string): void => {
    window.localStorage.setItem(TOKEN_KEY, token);
  };

  const clearToken = (): void => {
    window.localStorage.removeItem(TOKEN_KEY);
  };

  const isAuthenticated = (): boolean => !!getToken();

  return { getToken, setToken, clearToken, isAuthenticated };
}
