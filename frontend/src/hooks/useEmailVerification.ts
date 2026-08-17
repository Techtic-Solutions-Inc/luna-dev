import axios from 'axios';
import { useCallback, useState } from 'react';
import apiClient from '../lib/api/client';
import { emailVerifyEndpoint } from '../lib/api/contract';
import type { EmailVerificationResponse, ErrorResponse } from '../types/api';

interface EmailVerificationState {
  error: string;
  loading: boolean;
  success: boolean;
  verifyEmail: (email: string) => Promise<boolean>;
}

export default function useEmailVerification(): EmailVerificationState {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const verifyEmail = useCallback(async (email: string) => {
    setLoading(true);
    setSuccess(false);
    setError('');

    try {
      await apiClient.post<EmailVerificationResponse>(
        emailVerifyEndpoint.path,
        { email },
      );
      setSuccess(true);
      return true;
    } catch (requestError: unknown) {
      if (axios.isAxiosError<ErrorResponse>(requestError)) {
        setError(
          requestError.response?.data.message ??
            'We could not verify your email address. Please try again.',
        );
      } else {
        setError('We could not verify your email address. Please try again.');
      }
      return false;
    } finally {
      setLoading(false);
    }
  }, []);

  return { error, loading, success, verifyEmail };
}
