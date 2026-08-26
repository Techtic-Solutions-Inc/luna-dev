import type { Session, SessionUser } from '@/types/auth';

const SESSION_KEY = 'agentwise.session';

function isSessionUser(value: unknown): value is SessionUser {
  if (typeof value !== 'object' || value === null) return false;
  const user = value as Record<string, unknown>;
  return (
    typeof user.id === 'string' &&
    typeof user.full_name === 'string' &&
    typeof user.first_name === 'string' &&
    typeof user.last_name === 'string' &&
    typeof user.email === 'string'
  );
}

function isSession(value: unknown): value is Session {
  if (typeof value !== 'object' || value === null) return false;
  const session = value as Record<string, unknown>;
  return (
    typeof session.token === 'string' &&
    typeof session.accessToken === 'string' &&
    typeof session.tokenType === 'string' &&
    isSessionUser(session.user) &&
    (session.refreshToken === undefined || typeof session.refreshToken === 'string')
  );
}

export function readSession(): Session | null {
  const raw =
    localStorage.getItem(SESSION_KEY) ?? sessionStorage.getItem(SESSION_KEY);
  if (!raw) return null;
  try {
    const parsed: unknown = JSON.parse(raw);
    return isSession(parsed) ? parsed : null;
  } catch {
    return null;
  }
}

export function writeSession(session: Session, remember = false): void {
  clearSession();
  const storage = remember ? localStorage : sessionStorage;
  storage.setItem(SESSION_KEY, JSON.stringify(session));
}

export function clearSession(): void {
  localStorage.removeItem(SESSION_KEY);
  sessionStorage.removeItem(SESSION_KEY);
}
