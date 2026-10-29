const SESSION_REJECTED_KEY = "luna_session_rejected";

export function markSessionRejected(): void {
  try {
    sessionStorage.setItem(SESSION_REJECTED_KEY, "1");
  } catch {
    /* ignore */
  }
}

export function clearSessionRejected(): void {
  try {
    sessionStorage.removeItem(SESSION_REJECTED_KEY);
  } catch {
    /* ignore */
  }
}

export function isSessionRejected(): boolean {
  try {
    return sessionStorage.getItem(SESSION_REJECTED_KEY) === "1";
  } catch {
    return false;
  }
}
