import { useCallback, useMemo, useSyncExternalStore } from "react";
import {
  AUTH_CHANGED_EVENT,
  clearSession,
  getAccessToken,
} from "../lib/session";

function subscribe(onStoreChange: () => void): () => void {
  const handler = () => onStoreChange();
  window.addEventListener("storage", handler);
  window.addEventListener(AUTH_CHANGED_EVENT, handler);
  return () => {
    window.removeEventListener("storage", handler);
    window.removeEventListener(AUTH_CHANGED_EVENT, handler);
  };
}

export function useAuth() {
  const token = useSyncExternalStore(subscribe, getAccessToken, () => null);
  const isAuthenticated = Boolean(token);

  const signOut = useCallback(() => {
    clearSession();
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

export { AUTH_STORAGE_KEY, clearSession, setSession } from "../lib/session";
