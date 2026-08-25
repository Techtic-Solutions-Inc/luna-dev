import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getDashboard } from "@/lib/api/dashboard";
import { ApiClientError } from "@/lib/api/client";
import { useAuth } from "@/lib/auth/useAuth";
import type { DashboardOverviewData } from "@/lib/api/types";

export function useDashboard() {
  const { token, logout } = useAuth();
  const navigate = useNavigate();
  const [data, setData] = useState<DashboardOverviewData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const reload = useCallback(() => {
    if (!token) {
      return;
    }
    setLoading(true);
    setError(null);
    void getDashboard()
      .then((overview) => {
        setData(overview);
      })
      .catch((err: unknown) => {
        if (err instanceof ApiClientError && err.status === 401) {
          logout();
          navigate("/sign-in", { replace: true });
          return;
        }
        setError(err instanceof ApiClientError ? err.message : "Unable to load dashboard");
        setData(null);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [token, logout, navigate]);

  useEffect(() => {
    reload();
  }, [reload]);

  return { data, loading, error, reload };
}
