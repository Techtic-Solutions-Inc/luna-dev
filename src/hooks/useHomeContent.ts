import { useCallback, useEffect, useMemo, useState } from 'react';
import { parseHomeContent } from '../data/homeContent';
import { fetchVisitorHome } from '../lib/api/visitor';
import { HOME_QUERY_KEY, type HomeContent } from '../types/home';

export type HomeStatus = 'loading' | 'success' | 'empty' | 'error';

interface UseHomeContentResult {
  queryKey: typeof HOME_QUERY_KEY;
  data: HomeContent | null;
  status: HomeStatus;
  isLoading: boolean;
  isError: boolean;
  isEmpty: boolean;
  errorMessage: string | null;
  refetch: () => void;
}

function readForcedState(): HomeStatus | null {
  const params = new URLSearchParams(window.location.search);
  const forced = params.get('state');
  if (forced === 'loading' || forced === 'success' || forced === 'empty' || forced === 'error') {
    return forced;
  }
  return null;
}

export function useHomeContent(): UseHomeContentResult {
  const [status, setStatus] = useState<HomeStatus>('loading');
  const [data, setData] = useState<HomeContent | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [requestId, setRequestId] = useState(0);

  const refetch = useCallback(() => {
    setRequestId((value) => value + 1);
  }, []);

  useEffect(() => {
    const controller = new AbortController();
    const forced = readForcedState();

    setStatus('loading');
    setErrorMessage(null);

    if (forced === 'loading') {
      return () => controller.abort();
    }

    if (forced === 'error') {
      setData(null);
      setStatus('error');
      setErrorMessage('We could not load the home content. Please try again.');
      return () => controller.abort();
    }

    if (forced === 'empty') {
      setData(null);
      setStatus('empty');
      return () => controller.abort();
    }

    const load = async () => {
      try {
        const json = await fetchVisitorHome(controller.signal);
        const parsed = parseHomeContent(json);
        if (!parsed) {
          setData(null);
          setStatus('empty');
          return;
        }
        setData(parsed);
        setStatus('success');
      } catch (error) {
        if (controller.signal.aborted) {
          return;
        }
        setData(null);
        setStatus('error');
        setErrorMessage(
          error instanceof Error
            ? error.message
            : 'We could not load the home content. Please try again.',
        );
      }
    };

    void load();
    return () => controller.abort();
  }, [requestId]);

  return useMemo(
    () => ({
      queryKey: HOME_QUERY_KEY,
      data,
      status,
      isLoading: status === 'loading',
      isError: status === 'error',
      isEmpty: status === 'empty',
      errorMessage,
      refetch,
    }),
    [data, status, errorMessage, refetch],
  );
}
