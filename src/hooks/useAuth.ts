import { useCallback, useSyncExternalStore } from "react";
import {
  clearSession,
  clearSessionRejectedFlag,
  getStoredToken,
  persistSessionToken,
  subscribeUnauthorized,
} from "@/lib/auth/session";

function subscribe(callback: () => void): () => void {
  const onStorage = () => callback();
  globalThis.addEventListener("storage", onStorage);
  const unsubAuth = subscribeUnauthorized(callback);
  return () => {
    globalThis.removeEventListener("storage", onStorage);
    unsubAuth();
  };
}

function getSnapshot(): string | null {
  return getStoredToken();
}

export function useAuth() {
  const token = useSyncExternalStore(subscribe, getSnapshot, () => null);

  const setToken = useCallback((value: string) => {
    persistSessionToken(value);
    globalThis.dispatchEvent(new Event("storage"));
  }, []);

  const clearToken = useCallback(() => {
    clearSession();
    globalThis.dispatchEvent(new Event("storage"));
  }, []);

  const isAuthenticated = token !== null && token.length > 0;

  return {
    token,
    isAuthenticated,
    getToken: getStoredToken,
    setToken,
    clearToken,
    clearSessionRejectedFlag,
  };
}
