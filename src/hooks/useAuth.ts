import { useCallback, useMemo, useSyncExternalStore } from "react";

export const AUTH_STORAGE_KEY = "accessToken";
export const AUTH_CHANGED_EVENT = "auth-changed";

function subscribe(onStoreChange: () => void): () => void {
  const handler = () => onStoreChange();
  window.addEventListener("storage", handler);
  window.addEventListener(AUTH_CHANGED_EVENT, handler);
  return () => {
    window.removeEventListener("storage", handler);
    window.removeEventListener(AUTH_CHANGED_EVENT, handler);
  };
}

function getTokenSnapshot(): string | null {
  return localStorage.getItem(AUTH_STORAGE_KEY);
}

function notifyAuthChange(): void {
  window.dispatchEvent(new Event(AUTH_CHANGED_EVENT));
  window.dispatchEvent(new Event("storage"));
}

export function setSession(token: string): void {
  localStorage.setItem(AUTH_STORAGE_KEY, token);
  notifyAuthChange();
}

export function clearSession(): void {
  localStorage.removeItem(AUTH_STORAGE_KEY);
  notifyAuthChange();
}

export function useAuth() {
  const token = useSyncExternalStore(subscribe, getTokenSnapshot, () => null);
  const isAuthenticated = Boolean(token);

  const signOut = useCallback(() => {
    clearSession();
  }, []);

  return useMemo(
    () => ({
      token,
      isAuthenticated,
      signOut,
      setSession,
      clearSession,
    }),
    [token, isAuthenticated, signOut],
  );
}
