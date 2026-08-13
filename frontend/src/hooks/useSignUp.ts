import { useCallback, useRef, useState } from 'react';
import { apiPost } from '../api/client';
import type {
  ErrorEnvelope,
  SignupRequest,
  SignupResponse,
  SignupResponseData,
} from '../types/api';

export type SignUpStatus = 'idle' | 'loading' | 'success' | 'error';

export interface UseSignUpResult {
  status: SignUpStatus;
  loading: boolean;
  error: ErrorEnvelope | null;
  data: SignupResponseData | null;
  signUp: (payload: SignupRequest) => Promise<SignupResponseData | null>;
  reset: () => void;
}

export function useSignUp(): UseSignUpResult {
  const [status, setStatus] = useState<SignUpStatus>('idle');
  const [error, setError] = useState<ErrorEnvelope | null>(null);
  const [data, setData] = useState<SignupResponseData | null>(null);
  const inFlight = useRef(false);

  const reset = useCallback(() => {
    setStatus('idle');
    setError(null);
    setData(null);
    inFlight.current = false;
  }, []);

  const signUp = useCallback(async (payload: SignupRequest) => {
    if (inFlight.current) {
      return null;
    }

    inFlight.current = true;
    setStatus('loading');
    setError(null);

    const result = await apiPost<SignupResponse, SignupRequest>(
      '/api/signup',
      payload,
    );

    if (!result.ok) {
      setStatus('error');
      setError(result.error);
      setData(null);
      inFlight.current = false;
      return null;
    }

    const responseData = result.data.data;
    setData(responseData);
    setStatus('success');
    inFlight.current = false;
    return responseData;
  }, []);

  return {
    status,
    loading: status === 'loading',
    error,
    data,
    signUp,
    reset,
  };
}

export default useSignUp;
