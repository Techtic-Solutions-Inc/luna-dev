import { useCallback, useState } from 'react';
import { forgotPassword } from '../lib/api/auth';
import { ContractGapError, parseApiError } from '../lib/api/errors';

export function useForgotPassword() {
  const [showGapBanner, setShowGapBanner] = useState(false);
  const [bannerError, setBannerError] = useState('');
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  const submit = useCallback(async (email: string) => {
    setShowGapBanner(false);
    setBannerError('');
    setFieldErrors({});

    try {
      await forgotPassword({ email });
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
