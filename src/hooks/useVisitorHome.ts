import { useCallback, useEffect, useState } from 'react';
import { getVisitorHome, hasUsableHomeStrings, unwrapHomePayload } from '../lib/api/home';
import { toApiError } from '../lib/api/client';
import type { ApiErrorResponse } from '../types/api';

export type VisitorHomeStatus = 'loading' | 'success' | 'empty' | 'error';

export interface UseVisitorHomeResult {
  status: VisitorHomeStatus;
  data: unknown;
  error: ApiErrorResponse | null;
  retry: () => void;
}

export function useVisitorHome(): UseVisitorHomeResult {
  const [status, setStatus] = useState<VisitorHomeStatus>('loading');
  const [data, setData] = useState<unknown>(null);
  const [error, setError] = useState<ApiErrorResponse | null>(null);
  const [requestId, setRequestId] = useState(0);

  const retry = useCallback(() => {
    setRequestId((current) => current + 1);
  }, []);

  useEffect(() => {
    let cancelled = false;
    setStatus('loading');
    setError(null);

    getVisitorHome()
      .then((payload) => {
        if (cancelled) {
          return;
        }
        const unwrapped = unwrapHomePayload(payload);
        setData(unwrapped);
        setStatus(hasUsableHomeStrings(unwrapped) ? 'success' : 'empty');
      })
      .catch((caught: unknown) => {
        if (cancelled) {
          return;
        }
        setData(null);
        setError(toApiError(caught));
        setStatus('error');
      });

    return () => {
      cancelled = true;
    };
  }, [requestId]);

  return { status, data, error, retry };
}
