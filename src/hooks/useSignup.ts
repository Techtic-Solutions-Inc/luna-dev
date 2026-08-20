import { useCallback, useState } from 'react';
import { signup } from '../lib/api/auth';
import { ContractGapError, parseApiError } from '../lib/api/errors';
import type { SignupRequest } from '../types/api';

type SignupStatus = 'idle' | 'loading' | 'error';

export function useSignup() {
  const [status, setStatus] = useState<SignupStatus>('idle');
  const [showGapBanner, setShowGapBanner] = useState(false);
  const [bannerError, setBannerError] = useState('');
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  const submit = useCallback(async (payload: SignupRequest) => {
    setStatus('loading');
    setShowGapBanner(false);
    setBannerError('');
    setFieldErrors({});

    try {
      await signup(payload);
    } catch (error) {
      if (error instanceof ContractGapError) {
        setShowGapBanner(true);
        setStatus('idle');
        return;
      }
      const parsed = parseApiError(error);
      setFieldErrors(parsed.fieldErrors);
      setBannerError(parsed.bannerMessage);
      setStatus('error');
    }
  }, []);

  return {
    submit,
    isLoading: status === 'loading',
    showGapBanner,
    bannerError,
    fieldErrors,
  };
}
