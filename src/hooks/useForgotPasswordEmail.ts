import { useCallback, useState } from 'react';
import { forgotPassword } from '../lib/api/auth';
import { ContractGapError, parseApiError } from '../lib/api/errors';

export interface ForgotPasswordEmailPayload {
  email: string;
  privacy_accepted: boolean;
  terms_accepted: boolean;
}

export function useForgotPasswordEmail() {
  const [isLoading, setIsLoading] = useState(false);
  const [showGapBanner, setShowGapBanner] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  const submit = useCallback(async (payload: ForgotPasswordEmailPayload) => {
    setShowGapBanner(false);
    setFieldErrors({});
    setIsLoading(true);

    try {
      await forgotPassword({
        email: payload.email,
        privacy_accepted: payload.privacy_accepted,
        terms_accepted: payload.terms_accepted,
      });
    } catch (error) {
      if (error instanceof ContractGapError) {
        setShowGapBanner(true);
        return;
      }
      const parsed = parseApiError(error);
      setFieldErrors(parsed.fieldErrors);
      setShowGapBanner(true);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { submit, isLoading, showGapBanner, fieldErrors };
}
