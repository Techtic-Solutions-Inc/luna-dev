import { useCallback, useMemo, useState, type ReactNode } from "react";
import type { LoginUserData } from "@/lib/api/types";
import { AuthContext } from "@/lib/auth/auth-context";
import { clearSession, readSession, writeSession } from "@/lib/auth/session";

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<LoginUserData | null>(() => readSession());
  const [ready] = useState(true);

  const login = useCallback((next: LoginUserData, remember: boolean) => {
    writeSession(next, remember);
    setUser(next);
  }, []);

  const logout = useCallback(() => {
    clearSession();
    setUser(null);
  }, []);

  const value = useMemo(
    () => ({
      user,
      token: user ? user.accessToken || user.token : null,
      ready,
      login,
      logout,
    }),
    [user, ready, login, logout],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
