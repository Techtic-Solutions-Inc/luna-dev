import { useCallback, useRef, useState } from 'react';
import { apiPost } from '../api/client';
import type {
  ErrorEnvelope,
  PasswordRecoveryRequest,
  PasswordRecoveryResponse,
  PasswordRecoveryResponseData,
} from '../types/api';

export type PasswordRecoveryStatus = 'idle' | 'loading' | 'success' | 'error';

export interface UsePasswordRecoveryResult {
  status: PasswordRecoveryStatus;
  loading: boolean;
  error: ErrorEnvelope | null;
  data: PasswordRecoveryResponseData | null;
  requestRecovery: (
    payload: PasswordRecoveryRequest,
  ) => Promise<PasswordRecoveryResponseData | null>;
  reset: () => void;
}

export function usePasswordRecovery(): UsePasswordRecoveryResult {
  const [status, setStatus] = useState<PasswordRecoveryStatus>('idle');
  const [error, setError] = useState<ErrorEnvelope | null>(null);
  const [data, setData] = useState<PasswordRecoveryResponseData | null>(null);
  const inFlight = useRef(false);

  const reset = useCallback(() => {
    setStatus('idle');
    setError(null);
    setData(null);
    inFlight.current = false;
  }, []);

  const requestRecovery = useCallback(
    async (payload: PasswordRecoveryRequest) => {
      if (inFlight.current) {
        return null;
      }

      inFlight.current = true;
      setStatus('loading');
      setError(null);

      const result = await apiPost<
        PasswordRecoveryResponse,
        PasswordRecoveryRequest
      >('/api/v1/password-recovery/request', payload);

      if (!result.ok) {
        setStatus('error');
        setError(result.error);
        setData(null);
        inFlight.current = false;
        return null;
      }

      const responseData: PasswordRecoveryResponseData = {
        ...result.data.data,
        message:
          result.data.data.message ||
          result.data.message ||
          'We sent a password reset link to your email address.',
        description:
          result.data.data.description || result.data.message || '',
      };
      setData(responseData);
      setStatus('success');
      inFlight.current = false;
      return responseData;
    },
    [],
  );

  return {
    status,
    loading: status === 'loading',
    error,
    data,
    requestRecovery,
    reset,
  };
}

export default usePasswordRecovery;
