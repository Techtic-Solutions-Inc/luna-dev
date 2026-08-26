import { useCallback, useEffect, useState } from 'react';
import { readSession } from '@/lib/auth/session';
import type { Session } from '@/types/auth';

export function useSession() {
  const [session, setSession] = useState<Session | null>(() => readSession());

  useEffect(() => {
    const handleStorage = () => setSession(readSession());
    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, []);

  const refresh = useCallback(() => {
    setSession(readSession());
  }, []);

  return {
    session,
    isAuthenticated: Boolean(session?.token),
    refresh,
  };
}
