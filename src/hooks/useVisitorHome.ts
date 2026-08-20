import { useCallback, useState } from 'react';
import {
  searchVisitorHome,
  subscribeVisitorHome,
  type VisitorSubscribePayload,
} from '../lib/api/visitor';
import { ContractGapError, parseApiError } from '../lib/api/errors';

type VisitorHomeStatus = 'idle' | 'loading' | 'error';

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phonePattern = /^[\d\s\-+().]{7,}$/;

export function useVisitorHome() {
  const [status, setStatus] = useState<VisitorHomeStatus>('idle');
  const [showGapBanner, setShowGapBanner] = useState(false);
  const [showSearchGapBanner, setShowSearchGapBanner] = useState(false);
  const [bannerError, setBannerError] = useState('');
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  const submitLead = useCallback(async (payload: VisitorSubscribePayload) => {
    setStatus('loading');
    setShowGapBanner(false);
    setBannerError('');
    setFieldErrors({});

    const errors: Record<string, string> = {};
    if (!payload.first_name.trim())
      errors.first_name = 'First name is required';
    if (!payload.last_name.trim()) errors.last_name = 'Last name is required';
    if (!payload.email.trim()) errors.email = 'Email is required';
    else if (!emailPattern.test(payload.email.trim())) {
      errors.email = 'Enter a valid email address';
    }
    if (!payload.phone.trim()) errors.phone = 'Phone number is required';
    else if (!phonePattern.test(payload.phone.trim())) {
      errors.phone = 'Enter a valid phone number';
    }
    if (!payload.privacy_accepted) {
      errors.privacy_accepted = 'You must accept the Privacy Policy';
    }
    if (!payload.terms_accepted) {
      errors.terms_accepted = 'You must accept the Terms of Service';
    }

    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      setStatus('idle');
      return;
    }

    try {
      await subscribeVisitorHome({
        first_name: payload.first_name.trim(),
        last_name: payload.last_name.trim(),
        email: payload.email.trim(),
        phone: payload.phone.trim(),
        privacy_accepted: payload.privacy_accepted,
        terms_accepted: payload.terms_accepted,
      });
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

  const attemptSearch = useCallback(async (query: string) => {
    setShowSearchGapBanner(false);
    try {
      await searchVisitorHome(query);
    } catch (error) {
      if (error instanceof ContractGapError) {
        setShowSearchGapBanner(true);
      }
    }
  }, []);

  const resetErrors = useCallback(() => {
    setBannerError('');
    setFieldErrors({});
    setShowGapBanner(false);
    setStatus('idle');
  }, []);

  return {
    submitLead,
    attemptSearch,
    isLoading: status === 'loading',
    showGapBanner,
    showSearchGapBanner,
    bannerError,
    fieldErrors,
    resetErrors,
  };
}
