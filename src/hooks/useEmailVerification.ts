import { useCallback, useState } from 'react';
import { requestEmailVerification } from '../lib/api/auth';
import { ContractGapError, parseApiError } from '../lib/api/errors';
import type { EmailVerificationRequest } from '../types/api';

export function useEmailVerification() {
  const [showGapBanner, setShowGapBanner] = useState(false);
  const [bannerError, setBannerError] = useState('');
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  const submit = useCallback(async (payload: EmailVerificationRequest) => {
    setShowGapBanner(false);
    setBannerError('');
    setFieldErrors({});

    try {
      await requestEmailVerification(payload);
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

  const resetErrors = useCallback(() => {
    setBannerError('');
    setFieldErrors({});
    setShowGapBanner(false);
  }, []);

  return {
    submit,
    isLoading: false,
    showGapBanner,
    bannerError,
    fieldErrors,
    resetErrors,
  };
}
