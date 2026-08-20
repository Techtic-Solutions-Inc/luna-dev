import { useCallback, useState } from 'react';
import { requestEmailVerification } from '../lib/api/auth';
import { ContractGapError, parseApiError } from '../lib/api/errors';
import type { EmailVerificationRequest } from '../types/api';

type EmailVerificationStatus = 'idle' | 'loading' | 'error';

export function useEmailVerification() {
  const [status, setStatus] = useState<EmailVerificationStatus>('idle');
  const [showGapBanner, setShowGapBanner] = useState(false);
  const [bannerError, setBannerError] = useState('');
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  const submit = useCallback(async (payload: EmailVerificationRequest) => {
    setStatus('loading');
    setShowGapBanner(false);
    setBannerError('');
    setFieldErrors({});

    try {
      await requestEmailVerification(payload);
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

  const resetErrors = useCallback(() => {
    setBannerError('');
    setFieldErrors({});
    setShowGapBanner(false);
    setStatus('idle');
  }, []);

  return {
    submit,
    isLoading: status === 'loading',
    showGapBanner,
    bannerError,
    fieldErrors,
    resetErrors,
  };
}
