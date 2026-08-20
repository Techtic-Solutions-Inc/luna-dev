export interface StoredUser {
  id?: string;
  name?: string;
  first_name?: string;
  last_name?: string;
  email?: string;
}

const TOKEN_KEY = 'token';
const USER_KEY = 'user';

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function asString(value: unknown): string | undefined {
  return typeof value === 'string' && value.trim() !== '' ? value : undefined;
}

export function getToken(): string | null {
  return localStorage.getItem(TOKEN_KEY) ?? sessionStorage.getItem(TOKEN_KEY);
}

export function persistSession(token: string, user: StoredUser, remember: boolean): void {
  clearSession();
  const store = remember ? localStorage : sessionStorage;
  store.setItem(TOKEN_KEY, token);
  store.setItem(USER_KEY, JSON.stringify(user));
}

export function clearSession(): void {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
  sessionStorage.removeItem(TOKEN_KEY);
  sessionStorage.removeItem(USER_KEY);
}

export function readStoredUser(): StoredUser | null {
  const raw = localStorage.getItem(USER_KEY) ?? sessionStorage.getItem(USER_KEY);
  if (!raw) return null;

  try {
    const parsed: unknown = JSON.parse(raw);
    if (!isRecord(parsed)) return null;
    return {
      id: asString(parsed.id),
      name: asString(parsed.name),
      first_name: asString(parsed.first_name),
      last_name: asString(parsed.last_name),
      email: asString(parsed.email),
    };
  } catch {
    return null;
  }
}

export function writeStoredUser(user: StoredUser): void {
  const serialized = JSON.stringify(user);
  if (localStorage.getItem(TOKEN_KEY)) {
    localStorage.setItem(USER_KEY, serialized);
    return;
  }
  if (sessionStorage.getItem(TOKEN_KEY)) {
    sessionStorage.setItem(USER_KEY, serialized);
  }
}

export function displayName(user: StoredUser | null | undefined): string {
  if (!user) return '';
  const combined = [user.first_name, user.last_name].filter(Boolean).join(' ').trim();
  return combined || user.name || user.email || '';
}

export function displayInitial(user: StoredUser | null | undefined): string {
  const name = displayName(user);
  return name ? name.charAt(0).toUpperCase() : 'A';
}
