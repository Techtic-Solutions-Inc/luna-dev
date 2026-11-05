import { useCallback, useMemo, useSyncExternalStore } from "react";

const AUTH_STORAGE_KEY = "accessToken";

function subscribe(onStoreChange: () => void): () => void {
  const handler = () => onStoreChange();
  window.addEventListener("storage", handler);
  return () => window.removeEventListener("storage", handler);
}

function getTokenSnapshot(): string | null {
  return localStorage.getItem(AUTH_STORAGE_KEY);
}

export function useAuth() {
  const token = useSyncExternalStore(subscribe, getTokenSnapshot, () => null);
  const isAuthenticated = Boolean(token);

  const signOut = useCallback(() => {
    localStorage.removeItem(AUTH_STORAGE_KEY);
    window.dispatchEvent(new Event("storage"));
  }, []);

  return useMemo(
    () => ({
      token,
      isAuthenticated,
      signOut,
    }),
    [token, isAuthenticated, signOut],
  );
}
