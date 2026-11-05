export const AUTH_STORAGE_KEY = "accessToken";
export const AUTH_CHANGED_EVENT = "auth-changed";

function notifyAuthChange(): void {
  window.dispatchEvent(new Event(AUTH_CHANGED_EVENT));
  window.dispatchEvent(new Event("storage"));
}

export function getAccessToken(): string | null {
  if (typeof localStorage === "undefined") {
    return null;
  }
  return localStorage.getItem(AUTH_STORAGE_KEY);
}

export function setSession(token: string): void {
  localStorage.setItem(AUTH_STORAGE_KEY, token);
  notifyAuthChange();
}

export function clearSession(): void {
  localStorage.removeItem(AUTH_STORAGE_KEY);
  notifyAuthChange();
}
