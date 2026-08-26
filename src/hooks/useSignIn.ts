import { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '@/lib/api/auth';
import { saveSession } from '@/lib/auth/token';
import { ApiClientError } from '@/types/api';
import type { LoginRequest } from '@/types/auth';

interface SignInState {
  submit: (body: LoginRequest, remember: boolean) => Promise<void>;
  isSubmitting: boolean;
  error: string | null;
  fieldErrors: Record<string, string[]>;
  success: boolean;
}

function loginBanner(status: number, message: string): string {
  if (status === 403) {
    return message || 'This account is inactive.';
  }
  if (status === 401 || status === 404) {
    return message || 'Invalid email or password.';
  }
  return message;
}

export function useSignIn(): SignInState {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string[]>>({});
  const [success, setSuccess] = useState(false);

  const submit = useCallback(
    async (body: LoginRequest, remember: boolean) => {
      setIsSubmitting(true);
      setError(null);
      setFieldErrors({});
      setSuccess(false);
      try {
        const response = await login(body);
        const token = response.data.token || response.data.accessToken;
        if (!token) {
          setError('Sign in succeeded but no session token was returned.');
          return;
        }
        saveSession(token, remember);
        setSuccess(true);
        navigate('/dashboard', { replace: true });
      } catch (caught) {
        if (caught instanceof ApiClientError) {
          setFieldErrors(caught.fieldErrors);
          setError(loginBanner(caught.status, caught.message));
        } else {
          setError('Unable to reach the server. Please try again.');
        }
      } finally {
        setIsSubmitting(false);
      }
    },
    [navigate],
  );

  return { submit, isSubmitting, error, fieldErrors, success };
}
