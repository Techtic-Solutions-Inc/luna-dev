import type { LoginUserData } from "@/lib/api/types";

const SESSION_KEY = "agentwise.session";

function storage(remember: boolean): Storage {
  return remember ? window.localStorage : window.sessionStorage;
}

export function readSession(): LoginUserData | null {
  const raw =
    window.sessionStorage.getItem(SESSION_KEY) ?? window.localStorage.getItem(SESSION_KEY);
  if (!raw) {
    return null;
  }
  try {
    const parsed: unknown = JSON.parse(raw);
    if (typeof parsed !== "object" || parsed === null) {
      return null;
    }
    return parsed as LoginUserData;
  } catch {
    return null;
  }
}

export function writeSession(user: LoginUserData, remember: boolean): void {
  window.sessionStorage.removeItem(SESSION_KEY);
  window.localStorage.removeItem(SESSION_KEY);
  storage(remember).setItem(SESSION_KEY, JSON.stringify(user));
}

export function clearSession(): void {
  window.sessionStorage.removeItem(SESSION_KEY);
  window.localStorage.removeItem(SESSION_KEY);
}

export function getAccessToken(): string | null {
  const session = readSession();
  if (!session) {
    return null;
  }
  return session.accessToken || session.token || null;
}
