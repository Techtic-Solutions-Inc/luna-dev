import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { logout as logoutRequest } from "@/lib/api/auth";
import { useAuth } from "@/lib/auth/useAuth";

export function useLogout() {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  async function submit(): Promise<void> {
    setLoading(true);
    try {
      await logoutRequest();
    } finally {
      logout();
      setLoading(false);
      navigate("/sign-in", { replace: true });
    }
  }

  return { submit, loading };
}
