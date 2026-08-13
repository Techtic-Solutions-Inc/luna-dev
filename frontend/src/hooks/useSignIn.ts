import { useCallback, useRef, useState } from 'react';
import { apiPost } from '../api/client';
import type {
  ErrorEnvelope,
  LoginRequest,
  LoginResponse,
  LoginResponseData,
} from '../types/api';

export type SignInStatus = 'idle' | 'loading' | 'success' | 'error';

export interface UseSignInResult {
  status: SignInStatus;
  loading: boolean;
  error: ErrorEnvelope | null;
  data: LoginResponseData | null;
  signIn: (payload: LoginRequest) => Promise<LoginResponseData | null>;
  reset: () => void;
}

export function useSignIn(): UseSignInResult {
  const [status, setStatus] = useState<SignInStatus>('idle');
  const [error, setError] = useState<ErrorEnvelope | null>(null);
  const [data, setData] = useState<LoginResponseData | null>(null);
  const inFlight = useRef(false);

  const reset = useCallback(() => {
    setStatus('idle');
    setError(null);
    setData(null);
    inFlight.current = false;
  }, []);

  const signIn = useCallback(async (payload: LoginRequest) => {
    if (inFlight.current) {
      return null;
    }

    inFlight.current = true;
    setStatus('loading');
    setError(null);

    const result = await apiPost<LoginResponse, LoginRequest>(
      '/api/auth/login',
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
    signIn,
    reset,
  };
}

export default useSignIn;
