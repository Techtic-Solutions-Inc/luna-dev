import type { ReactNode } from "react";
import { useSyncExternalStore } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { subscribeAuth } from "../../lib/authEvents";
import { isAuthenticated } from "../../hooks/useAuth";
import { isSessionRejected } from "../../lib/session";

function authSnapshot(): string {
  return `${isAuthenticated()}:${isSessionRejected()}`;
}

export default function ProtectedRoute({ children }: { children: ReactNode }) {
  const location = useLocation();
  useSyncExternalStore(subscribeAuth, authSnapshot, authSnapshot);
  if (!isAuthenticated()) {
    return <Navigate to="/login" replace state={{ from: location.pathname }} />;
  }
  return children;
}
