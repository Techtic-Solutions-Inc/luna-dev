import { useCallback, useState } from 'react';

export type FormStatus = 'idle' | 'loading' | 'error' | 'success';

export function useFormState() {
  const [status, setStatus] = useState<FormStatus>('idle');
  const [message, setMessage] = useState('');
  const [fieldError, setFieldError] = useState<string | null>(null);

  const resetErrors = useCallback(() => {
    if (status === 'error') {
      setStatus('idle');
      setMessage('');
      setFieldError(null);
    }
  }, [status]);

  return {
    status,
    setStatus,
    message,
    setMessage,
    fieldError,
    setFieldError,
    resetErrors,
    isLoading: status === 'loading',
    isError: status === 'error',
    isSuccess: status === 'success',
  };
}

export const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
