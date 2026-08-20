import { useCallback, useState } from 'react';
import { signup } from '../lib/api/auth';
import { ContractGapError, parseApiError } from '../lib/api/errors';
import type { SignupRequest } from '../types/api';

export function useSignup() {
  const [showGapBanner, setShowGapBanner] = useState(false);
  const [bannerError, setBannerError] = useState('');
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  const submit = useCallback(async (payload: SignupRequest) => {
    setShowGapBanner(false);
    setBannerError('');
    setFieldErrors({});

    try {
      await signup(payload);
    } catch (error) {
      if (error instanceof ContractGapError) {
        setShowGapBanner(true);
        return;
      }
      const parsed = parseApiError(error);
      setFieldErrors(parsed.fieldErrors);
      setBannerError(parsed.bannerMessage);
    }
  }, []);

  return {
    submit,
    isLoading: false,
    showGapBanner,
    bannerError,
    fieldErrors,
  };
}
