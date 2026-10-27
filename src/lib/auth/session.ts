export const TOKEN_STORAGE_KEY = "token";
export const SESSION_REJECTED_KEY = "session_rejected";

export function getStoredToken(): string | null {
  if (typeof globalThis.localStorage === "undefined") {
    return null;
  }
  if (globalThis.localStorage.getItem(SESSION_REJECTED_KEY) === "1") {
    return null;
  }
  return globalThis.localStorage.getItem(TOKEN_STORAGE_KEY);
}

export function persistSessionToken(token: string): void {
  globalThis.localStorage.removeItem(SESSION_REJECTED_KEY);
  globalThis.localStorage.setItem(TOKEN_STORAGE_KEY, token);
}

export function clearSession(): void {
  globalThis.localStorage.removeItem(TOKEN_STORAGE_KEY);
  globalThis.localStorage.setItem(SESSION_REJECTED_KEY, "1");
}

export function clearSessionRejectedFlag(): void {
  globalThis.localStorage.removeItem(SESSION_REJECTED_KEY);
}

const unauthorizedListeners = new Set<() => void>();

export function subscribeUnauthorized(listener: () => void): () => void {
  unauthorizedListeners.add(listener);
  return () => unauthorizedListeners.delete(listener);
}

export function notifyUnauthorized(): void {
  unauthorizedListeners.forEach((listener) => listener());
}
