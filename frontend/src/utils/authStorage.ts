const ACCESS_TOKEN_KEY = 'agentwise_access_token';
const TOKEN_TYPE_KEY = 'agentwise_token_type';
const REMEMBERED_EMAIL_KEY = 'agentwise_remembered_email';

export function persistAuthSession(options: {
  accessToken: string;
  tokenType: string;
  rememberMe: boolean;
  email: string;
}): void {
  const storage = options.rememberMe ? window.localStorage : window.sessionStorage;
  const other = options.rememberMe ? window.sessionStorage : window.localStorage;

  other.removeItem(ACCESS_TOKEN_KEY);
  other.removeItem(TOKEN_TYPE_KEY);

  storage.setItem(ACCESS_TOKEN_KEY, options.accessToken);
  storage.setItem(TOKEN_TYPE_KEY, options.tokenType);

  if (options.rememberMe) {
    window.localStorage.setItem(REMEMBERED_EMAIL_KEY, options.email);
  } else {
    window.localStorage.removeItem(REMEMBERED_EMAIL_KEY);
  }
}

export function getRememberedEmail(): string {
  try {
    return window.localStorage.getItem(REMEMBERED_EMAIL_KEY) ?? '';
  } catch {
    return '';
  }
}

export function wasRememberMeEnabled(): boolean {
  return getRememberedEmail().length > 0;
}
