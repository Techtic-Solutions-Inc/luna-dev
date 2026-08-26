import { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signup } from '@/lib/api/auth';
import { ApiClientError } from '@/types/api';
import type { SignupRequest } from '@/types/auth';

interface SignUpState {
  submit: (body: SignupRequest) => Promise<void>;
  isSubmitting: boolean;
  error: string | null;
  fieldErrors: Record<string, string[]>;
  success: boolean;
}

export function useSignUp(): SignUpState {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string[]>>({});
  const [success, setSuccess] = useState(false);

  const submit = useCallback(
    async (body: SignupRequest) => {
      setIsSubmitting(true);
      setError(null);
      setFieldErrors({});
      setSuccess(false);
      try {
        await signup(body);
        setSuccess(true);
        navigate('/signin', { replace: true });
      } catch (caught) {
        if (caught instanceof ApiClientError) {
          setFieldErrors(caught.fieldErrors);
          if (caught.status === 409) {
            setError(caught.message || 'This email is already in use.');
          } else {
            setError(caught.message);
          }
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
