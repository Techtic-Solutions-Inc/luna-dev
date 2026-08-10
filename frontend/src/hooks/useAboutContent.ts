import { useCallback, useEffect, useRef, useSyncExternalStore } from 'react';
import { getAbout } from '../lib/api/client';
import { getApiErrorMessage } from '../lib/api/errors';
import type { AboutResponse } from '../types/api';

export const ABOUT_QUERY_KEY = ['about'] as const;

interface AboutContentState {
  data: AboutResponse | null;
  isLoading: boolean;
  error: string | null;
}

interface UseAboutContentResult extends AboutContentState {
  isEmpty: boolean;
  refetch: () => Promise<void>;
  queryKey: typeof ABOUT_QUERY_KEY;
}

let aboutState: AboutContentState = {
  data: null,
  isLoading: true,
  error: null,
};

let hasLoadedOnce = false;
let inFlight: Promise<void> | null = null;

const listeners = new Set<() => void>();

const emitChange = (): void => {
  listeners.forEach((listener) => {
    listener();
  });
};

const subscribe = (listener: () => void): (() => void) => {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
};

const getSnapshot = (): AboutContentState => aboutState;

const setAboutState = (next: AboutContentState): void => {
  aboutState = next;
  emitChange();
};

const loadAboutContent = async (): Promise<void> => {
  if (inFlight) {
    return inFlight;
  }

  inFlight = (async () => {
    setAboutState({
      data: null,
      isLoading: true,
      error: null,
    });

    try {
      const data = await getAbout();
      setAboutState({
        data,
        isLoading: false,
        error: null,
      });
    } catch (err) {
      setAboutState({
        data: null,
        isLoading: false,
        error: getApiErrorMessage(err, 'Failed to load About Us content'),
      });
    } finally {
      hasLoadedOnce = true;
      inFlight = null;
    }
  })();

  return inFlight;
};

export const invalidateAboutQuery = (): void => {
  hasLoadedOnce = false;
  setAboutState({
    data: null,
    isLoading: true,
    error: null,
  });
};

export const useAboutContent = (): UseAboutContentResult => {
  const state = useSyncExternalStore(subscribe, getSnapshot, getSnapshot);
  const didRequest = useRef(false);

  const refetch = useCallback(async () => {
    hasLoadedOnce = false;
    await loadAboutContent();
  }, []);

  useEffect(() => {
    if (didRequest.current && hasLoadedOnce) {
      return;
    }
    didRequest.current = true;
    void loadAboutContent();
  }, []);

  const isEmpty =
    !state.isLoading &&
    !state.error &&
    (state.data === null ||
      (!state.data.title &&
        !state.data.description &&
        (state.data.sections?.length ?? 0) === 0 &&
        (state.data.team_members?.length ?? 0) === 0));

  return {
    data: state.data,
    isLoading: state.isLoading,
    error: state.error,
    isEmpty,
    refetch,
    queryKey: ABOUT_QUERY_KEY,
  };
};
