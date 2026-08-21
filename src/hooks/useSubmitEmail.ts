import { useCallback, useState } from 'react';
import { apiClient, getApiErrorMessage } from '../lib/api/client';
import type { ApiSuccessResponse, SubmitEmailData, SubmitEmailRequest } from '../types/api';

export type SubmitEmailStatus = 'idle' | 'loading' | 'empty' | 'error' | 'success';

interface UseSubmitEmailResult {
  status: SubmitEmailStatus;
  error: string | null;
  message: string | null;
  submitEmail: (payload: SubmitEmailRequest) => Promise<boolean>;
  reset: () => void;
}

export function useSubmitEmail(): UseSubmitEmailResult {
  const [status, setStatus] = useState<SubmitEmailStatus>('idle');
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  const reset = useCallback(() => {
    setStatus('idle');
    setError(null);
    setMessage(null);
  }, []);

  const submitEmail = useCallback(async (payload: SubmitEmailRequest): Promise<boolean> => {
    const trimmedEmail = payload.email.trim();
    if (!trimmedEmail) {
      setStatus('empty');
      setError('Please enter your email address.');
      setMessage(null);
      return false;
    }

    setStatus('loading');
    setError(null);
    setMessage(null);

    try {
      const response = await apiClient.post<ApiSuccessResponse<SubmitEmailData>>(
        '/api/visitor/home/submit-email',
        { ...payload, email: trimmedEmail },
      );
      setStatus('success');
      setMessage(response.data.message || 'You are on the waitlist. We will be in touch shortly.');
      return true;
    } catch (err) {
      setStatus('error');
      setError(getApiErrorMessage(err, 'Unable to submit your email. Please try again.'));
      return false;
    }
  }, []);

  return { status, error, message, submitEmail, reset };
}
