import { useState } from 'react';
import type { ForgotPasswordRequest, ForgotPasswordResponse } from '../types/auth';
import type { ApiErrorResponse } from '../types/api';
import { forgotPassword } from '../lib/api/auth';
import { getErrorMessage, getFieldErrors, parseApiError } from '../lib/api/errors';

type ForgotPasswordResult = {
  message: string;
};

type UseForgotPasswordReturn = {
  submit: (body: ForgotPasswordRequest) => Promise<ForgotPasswordResult | null>;
  isLoading: boolean;
  error: ApiErrorResponse | null;
  fieldErrors: Record<string, string>;
  clearError: () => void;
};

function getResponseMessage(data: ForgotPasswordResponse): string | null {
  if (data && typeof data.message === 'string') {
    return data.message;
  }
  return null;
}

export function useForgotPassword(): UseForgotPasswordReturn {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<ApiErrorResponse | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  const clearError = () => {
    setError(null);
    setFieldErrors({});
  };

  const submit = async (body: ForgotPasswordRequest): Promise<ForgotPasswordResult | null> => {
    setIsLoading(true);
    clearError();
    try {
      const response = await forgotPassword(body);
      const message = getResponseMessage(response);
      if (!message) {
        // Keep this deterministic even if backend returns a non-standard envelope.
        return { message: 'Reset link sent.' };
      }
      return { message };
    } catch (err) {
      const parsed = parseApiError(err);
      setError(parsed);
      setFieldErrors(getFieldErrors(parsed));
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    submit,
    isLoading,
    error,
    fieldErrors,
    clearError,
  };
}

export { getErrorMessage };
