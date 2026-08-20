import { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../lib/api/auth';
import { parseApiError } from '../lib/api/errors';
import {
  clearRememberedEmail,
  setRememberedEmail,
  setToken,
} from '../lib/auth/storage';
import { extractAccessToken } from '../types/api';
import { PATHS } from '../routes/paths';

type LoginStatus = 'idle' | 'loading' | 'error';

export function useLogin() {
  const navigate = useNavigate();
  const [status, setStatus] = useState<LoginStatus>('idle');
  const [bannerError, setBannerError] = useState('');
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  const mutate = useCallback(
    async (email: string, password: string, rememberMe: boolean) => {
      setStatus('loading');
      setBannerError('');
      setFieldErrors({});

      try {
        const response = await login({ email, password });
        const token = extractAccessToken(response.data);
        setToken(token);

        if (rememberMe) {
          setRememberedEmail(email);
        } else {
          clearRememberedEmail();
        }

        navigate(PATHS.DASHBOARD, { replace: true });
      } catch (error) {
        const parsed = parseApiError(error);
        setStatus('error');
        setFieldErrors(parsed.fieldErrors);
        setBannerError(parsed.bannerMessage);
      }
    },
    [navigate],
  );

  const resetErrors = useCallback(() => {
    setBannerError('');
    setFieldErrors({});
    setStatus('idle');
  }, []);

  return {
    mutate,
    isLoading: status === 'loading',
    bannerError,
    fieldErrors,
    resetErrors,
  };
}
