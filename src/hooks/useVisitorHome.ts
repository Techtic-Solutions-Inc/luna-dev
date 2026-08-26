import { useCallback, useEffect, useState } from 'react';
import { getVisitorHome } from '@/lib/api/visitorHome';
import {
  parseApiError,
  payloadHasLinkFields,
  unwrapHomePayload,
  type ApiErrorResponse,
} from '@/types/api';

export type HomeStatus = 'loading' | 'empty' | 'error' | 'success';

export interface UseVisitorHomeResult {
  status: HomeStatus;
  data: unknown;
  error: ApiErrorResponse | null;
  retry: () => void;
}

export function useVisitorHome(): UseVisitorHomeResult {
  const [status, setStatus] = useState<HomeStatus>('loading');
  const [data, setData] = useState<unknown>(null);
  const [error, setError] = useState<ApiErrorResponse | null>(null);
  const [requestId, setRequestId] = useState(0);

  const retry = useCallback(() => {
    setStatus('loading');
    setError(null);
    setRequestId((current) => current + 1);
  }, []);

  useEffect(() => {
    let cancelled = false;

    void (async () => {
      try {
        const body = await getVisitorHome();
        if (cancelled) {
          return;
        }
        const unwrapped = unwrapHomePayload(body);
        setData(unwrapped);
        setError(null);
        setStatus(payloadHasLinkFields(unwrapped) ? 'success' : 'empty');
      } catch (caught: unknown) {
        if (cancelled) {
          return;
        }
        setError(parseApiError(caught));
        setData(null);
        setStatus('error');
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [requestId]);

  return { status, data, error, retry };
}
