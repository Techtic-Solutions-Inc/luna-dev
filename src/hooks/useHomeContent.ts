import { useCallback, useEffect, useState } from "react";
import { getVisitorHome } from "@/lib/api/home";
import { ApiClientError } from "@/lib/api/client";

export function useHomeContent() {
  const [data, setData] = useState<Record<string, unknown> | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const reload = useCallback(() => {
    setLoading(true);
    setError(null);
    void getVisitorHome()
      .then((payload) => {
        setData(payload);
      })
      .catch((err: unknown) => {
        const message = err instanceof ApiClientError ? err.message : "Unable to load home content";
        setError(message);
        setData(null);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    reload();
  }, [reload]);

  return { data, loading, error, reload };
}
