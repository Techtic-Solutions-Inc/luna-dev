import { useCallback, useState } from 'react';
import { forgotPassword } from '../lib/api/auth';
import { ContractGapError, parseApiError } from '../lib/api/errors';

type ForgotPasswordStatus = 'idle' | 'loading' | 'error';

export function useForgotPassword() {
  const [status, setStatus] = useState<ForgotPasswordStatus>('idle');
  const [showGapBanner, setShowGapBanner] = useState(false);
  const [bannerError, setBannerError] = useState('');
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  const submit = useCallback(async (email: string) => {
    setStatus('loading');
    setShowGapBanner(false);
    setBannerError('');
    setFieldErrors({});

    try {
      await forgotPassword({ email });
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
