import { useCallback, useSyncExternalStore } from 'react';

import { clearToken, getToken, subscribeAuth } from '@/lib/auth/storage';

export function useAuth() {
  const token = useSyncExternalStore(subscribeAuth, getToken, () => null);

  const logout = useCallback(() => {
    clearToken();
  }, []);

  return {
    token,
    isAuthenticated: Boolean(token),
    logout,
  };
}
