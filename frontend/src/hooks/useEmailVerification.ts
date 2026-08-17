import axios from 'axios';
import { useCallback, useState } from 'react';
import apiClient from '../lib/api/client';
import type { ErrorResponse } from '../types/api';

interface EmailVerificationState {
  error: string;
  isLoading: boolean;
  isSuccess: boolean;
  verifyEmail: (email: string) => Promise<void>;
}

export default function useEmailVerification(): EmailVerificationState {
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');

  const verifyEmail = useCallback(async (email: string) => {
    setIsLoading(true);
    setIsSuccess(false);
    setError('');

    try {
      await apiClient.post('/api/email/verify', { email });
      setIsSuccess(true);
    } catch (requestError: unknown) {
      if (axios.isAxiosError<ErrorResponse>(requestError)) {
        setError(
          requestError.response?.data.message ??
            'We could not verify your email address. Please try again.',
        );
      } else {
        setError('We could not verify your email address. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { error, isLoading, isSuccess, verifyEmail };
}
