import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login as loginRequest } from "@/lib/api/auth";
import { ApiClientError } from "@/lib/api/client";
import { useAuth } from "@/lib/auth/useAuth";
import type { LoginRequest } from "@/lib/api/types";

export function useLogin() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string[]>>({});

  async function submit(body: LoginRequest, remember: boolean): Promise<void> {
    setLoading(true);
    setError(null);
    setFieldErrors({});
    try {
      const user = await loginRequest(body);
      login(user, remember);
      navigate("/dashboard", { replace: true });
    } catch (err: unknown) {
      if (err instanceof ApiClientError) {
        if (err.envelope.errors) {
          setFieldErrors(err.envelope.errors);
        } else if (err.status === 401) {
          setFieldErrors({ password: [err.message] });
        } else if (err.status === 404) {
          setFieldErrors({ email: [err.message] });
        }
        if (err.status === 403) {
          setError(err.message || "This account is inactive.");
        } else {
          setError(err.message);
        }
      } else {
        setError("Unable to sign in");
      }
    } finally {
      setLoading(false);
    }
  }

  return { submit, loading, error, fieldErrors };
}
