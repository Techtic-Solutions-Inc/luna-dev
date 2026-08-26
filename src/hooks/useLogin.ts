import { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login as loginApi } from '@/lib/api/auth';
import { writeSession } from '@/lib/auth/session';
import { ApiClientError } from '@/types/api';
import type { LoginRequest } from '@/types/auth';

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

export function useLogin() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  const submit = useCallback(
    async (body: LoginRequest, remember = false) => {
      setLoading(true);
      setError(null);
      setFieldErrors({});
      try {
        const data = await loginApi(body);
        writeSession(
          {
            token: data.token,
            accessToken: data.accessToken,
            refreshToken: data.refreshToken,
            tokenType: data.tokenType,
            user: {
              id: data.id,
              full_name: data.full_name,
              first_name: data.first_name,
              last_name: data.last_name,
              email: data.email,
            },
          },
          remember,
        );
        navigate('/dashboard');
      } catch (err) {
        if (err instanceof ApiClientError) {
          setError(err.message);
          setFieldErrors(mapFieldErrors(err.details));
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
