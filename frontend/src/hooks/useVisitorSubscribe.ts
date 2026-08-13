import { useCallback, useRef, useState } from 'react';
import { apiPost } from '../api/client';
import type {
  ErrorEnvelope,
  VisitorSubscribeRequest,
  VisitorSubscribeResponse,
  VisitorSubscribeResponseData,
} from '../types/api';

export type VisitorSubscribeStatus = 'idle' | 'loading' | 'success' | 'error';

export interface UseVisitorSubscribeResult {
  status: VisitorSubscribeStatus;
  loading: boolean;
  error: ErrorEnvelope | null;
  data: VisitorSubscribeResponseData | null;
  subscribe: (
    payload: VisitorSubscribeRequest,
  ) => Promise<VisitorSubscribeResponseData | null>;
  reset: () => void;
}

export function useVisitorSubscribe(): UseVisitorSubscribeResult {
  const [status, setStatus] = useState<VisitorSubscribeStatus>('idle');
  const [error, setError] = useState<ErrorEnvelope | null>(null);
  const [data, setData] = useState<VisitorSubscribeResponseData | null>(null);
  const inFlight = useRef(false);

  const reset = useCallback(() => {
    setStatus('idle');
    setError(null);
    setData(null);
    inFlight.current = false;
  }, []);

  const subscribe = useCallback(async (payload: VisitorSubscribeRequest) => {
    if (inFlight.current) {
      return null;
    }

    inFlight.current = true;
    setStatus('loading');
    setError(null);

    const result = await apiPost<VisitorSubscribeResponse, VisitorSubscribeRequest>(
      '/api/visitor/subscribe',
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
    subscribe,
    reset,
  };
}

export default useVisitorSubscribe;
