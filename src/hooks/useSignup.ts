import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signup as signupRequest } from "@/lib/api/auth";
import { ApiClientError } from "@/lib/api/client";
import type { SignupRequest } from "@/lib/api/types";

export function useSignup() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string[]>>({});

  async function submit(body: SignupRequest): Promise<void> {
    setLoading(true);
    setError(null);
    setFieldErrors({});
    try {
      await signupRequest(body);
      navigate("/sign-in", { replace: true });
    } catch (err: unknown) {
      if (err instanceof ApiClientError) {
        const mapped = mapSignupFieldErrors(err.envelope.errors);
        if (err.status === 409) {
          setFieldErrors({
            ...mapped,
            email: mapped.email ?? [err.message],
          });
          setError(null);
        } else if (Object.keys(mapped).length > 0) {
          setFieldErrors(mapped);
          setError(err.message);
        } else {
          setError(err.message);
        }
      } else {
        setError("Unable to create account");
      }
    } finally {
      setLoading(false);
    }
  }

  return { submit, loading, error, fieldErrors };
}

function mapSignupFieldErrors(errors: Record<string, string[]> | undefined): Record<string, string[]> {
  if (!errors) {
    return {};
  }
  const mapped: Record<string, string[]> = { ...errors };
  for (const [key, messages] of Object.entries(errors)) {
    if (/terms|privacy|agree/i.test(key) && key !== "terms_accepted") {
      mapped.terms_accepted = messages;
    }
  }
  return mapped;
}
