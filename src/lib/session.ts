export interface StoredUser {
  id?: string;
  name?: string;
  first_name?: string;
  last_name?: string;
  email?: string;
}

const TOKEN_KEY = 'token';
const ACCESS_TOKEN_KEY = 'accessToken';
const USER_KEY = 'user';

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function asString(value: unknown): string | undefined {
  return typeof value === 'string' && value.trim() !== '' ? value : undefined;
}

function readTokenFromStorage(storage: Storage): string | null {
  return storage.getItem(TOKEN_KEY) ?? storage.getItem(ACCESS_TOKEN_KEY);
}

export function getToken(): string | null {
  return readTokenFromStorage(localStorage) ?? readTokenFromStorage(sessionStorage);
}

export function formatBearerToken(raw: string | null | undefined): string | null {
  if (!raw) return null;
  const trimmed = raw.trim();
  if (!trimmed) return null;
  const token = trimmed.startsWith('Bearer ') ? trimmed.slice(7).trim() : trimmed;
  return token ? `Bearer ${token}` : null;
}

export function persistSession(token: string, user: StoredUser, remember: boolean): void {
  clearSession();
  const normalized = token.startsWith('Bearer ') ? token.slice(7).trim() : token.trim();
  const store = remember ? localStorage : sessionStorage;
  store.setItem(TOKEN_KEY, normalized);
  store.setItem(ACCESS_TOKEN_KEY, normalized);
  store.setItem(USER_KEY, JSON.stringify(user));
}

export function clearSession(): void {
  for (const storage of [localStorage, sessionStorage]) {
    storage.removeItem(TOKEN_KEY);
    storage.removeItem(ACCESS_TOKEN_KEY);
    storage.removeItem(USER_KEY);
  }
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
  if (localStorage.getItem(TOKEN_KEY) || localStorage.getItem(ACCESS_TOKEN_KEY)) {
    localStorage.setItem(USER_KEY, serialized);
    return;
  }
  if (sessionStorage.getItem(TOKEN_KEY) || sessionStorage.getItem(ACCESS_TOKEN_KEY)) {
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
