import type { LoginUserData } from "@/lib/api/types";
import { asRecord, asString } from "@/lib/bind";

const SESSION_KEY = "agentwise.session";

function storage(remember: boolean): Storage {
  return remember ? window.localStorage : window.sessionStorage;
}

function parseLoginUserData(value: unknown): LoginUserData | null {
  const record = asRecord(value);
  if (!record) {
    return null;
  }
  const email = asString(record.email);
  const accessToken = asString(record.accessToken) ?? asString(record.token);
  if (!email || !accessToken) {
    return null;
  }
  return {
    id: asString(record.id) ?? "",
    name: asString(record.name) ?? "",
    full_name: asString(record.full_name) ?? "",
    first_name: asString(record.first_name) ?? "",
    last_name: asString(record.last_name) ?? "",
    email,
    phone: asString(record.phone) ?? null,
    token: asString(record.token) ?? accessToken,
    accessToken,
    refreshToken: asString(record.refreshToken) ?? "",
    tokenType: asString(record.tokenType) ?? "",
  };
}

export function readSession(): LoginUserData | null {
  const raw =
    window.sessionStorage.getItem(SESSION_KEY) ?? window.localStorage.getItem(SESSION_KEY);
  if (!raw) {
    return null;
  }
  try {
    const parsed: unknown = JSON.parse(raw);
    return parseLoginUserData(parsed);
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
