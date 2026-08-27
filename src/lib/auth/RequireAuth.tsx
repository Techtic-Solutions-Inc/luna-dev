import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "@/lib/auth/useAuth";
import type { ReactNode } from "react";

export function RequireAuth({ children }: { children: ReactNode }) {
  const { token, ready } = useAuth();
  const location = useLocation();

  if (!ready) {
    return null;
  }

  if (!token) {
    return <Navigate to="/sign-in" replace state={{ from: location.pathname }} />;
  }

  return children;
}
