import { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signup as signupApi } from '@/lib/api/auth';
import { ApiClientError } from '@/types/api';
import type { SignupRequest } from '@/types/auth';

function mapFieldErrors(
  details: Record<string, string[]> | null,
): Record<string, string> {
  if (!details) return {};
  const mapped: Record<string, string> = {};
  for (const [key, messages] of Object.entries(details)) {
    if (messages.length > 0) mapped[key] = messages[0];
  }
  return mapped;
}

export function useSignup() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  const submit = useCallback(
    async (body: SignupRequest) => {
      setLoading(true);
      setError(null);
      setFieldErrors({});
      try {
        await signupApi(body);
        navigate('/signin');
      } catch (err) {
        if (err instanceof ApiClientError) {
          setError(err.message);
          const mapped = mapFieldErrors(err.details);
          if (err.status === 409) {
            mapped.email = err.details?.email?.[0] ?? err.message;
          }
          setFieldErrors(mapped);
        } else {
          setError('Something went wrong. Please try again.');
        }
      } finally {
        setLoading(false);
      }
    },
    [navigate],
  );

  return { submit, loading, error, fieldErrors };
}
