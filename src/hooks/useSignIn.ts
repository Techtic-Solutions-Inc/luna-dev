import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../api/auth';
import {
  ApiError,
  getApiErrorMessage,
  mapFieldErrors,
} from '../api/client';
import {
  hasValidationErrors,
  type SignInFieldErrors,
  type SignInFieldName,
  type SignInFormValues,
  validateSignInForm,
} from '../utils/validation';

interface UseSignInResult {
  values: SignInFormValues;
  fieldErrors: SignInFieldErrors;
  formError: string | null;
  isLoading: boolean;
  setFieldValue: <K extends SignInFieldName>(
    field: K,
    value: SignInFormValues[K],
  ) => void;
  submit: () => Promise<void>;
}

const REMEMBERED_EMAIL_KEY = 'remembered_email';

const getInitialValues = (): SignInFormValues => {
  const rememberedEmail = localStorage.getItem(REMEMBERED_EMAIL_KEY);

  return {
    email: rememberedEmail ?? '',
    password: '',
    rememberMe: Boolean(rememberedEmail),
  };
};

const apiFieldMap: Partial<Record<string, SignInFieldName>> = {
  email: 'email',
  password: 'password',
};

export function useSignIn(): UseSignInResult {
  const navigate = useNavigate();
  const [values, setValues] = useState<SignInFormValues>(getInitialValues);
  const [fieldErrors, setFieldErrors] = useState<SignInFieldErrors>({});
  const [formError, setFormError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (values.rememberMe && values.email.trim()) {
      localStorage.setItem(REMEMBERED_EMAIL_KEY, values.email.trim());
      return;
    }

    if (!values.rememberMe) {
      localStorage.removeItem(REMEMBERED_EMAIL_KEY);
    }
  }, [values.email, values.rememberMe]);

  const setFieldValue = useCallback(
    <K extends SignInFieldName>(field: K, value: SignInFormValues[K]) => {
      setValues((current) => ({ ...current, [field]: value }));
      setFieldErrors((current) => {
        if (!current[field]) {
          return current;
        }

        const next = { ...current };
        delete next[field];
        return next;
      });
      setFormError(null);
    },
    [],
  );

  const submit = useCallback(async () => {
    const validationErrors = validateSignInForm(values);
    setFieldErrors(validationErrors);

    if (hasValidationErrors(validationErrors)) {
      return;
    }

    setIsLoading(true);
    setFormError(null);

    try {
      const response = await login({
        email: values.email.trim(),
        password: values.password,
      });

      localStorage.setItem('access_token', response.data.access_token);

      const redirectPath =
        response.data.redirect && response.data.redirect.length > 0
          ? response.data.redirect
          : '/welcome';

      navigate(redirectPath, {
        replace: true,
        state: {
          title: response.data.title,
          message: response.data.message,
          description: response.data.description,
        },
      });
    } catch (error) {
      if (error instanceof ApiError && error.details) {
        const apiFieldErrors = mapFieldErrors(error.details);
        const mappedErrors: SignInFieldErrors = {};

        for (const [apiField, message] of Object.entries(apiFieldErrors)) {
          const formField = apiFieldMap[apiField];
          if (formField) {
            mappedErrors[formField] = message;
          }
        }

        if (Object.keys(mappedErrors).length > 0) {
          setFieldErrors((current) => ({ ...current, ...mappedErrors }));
        }
      }

      setFormError(getApiErrorMessage(error, 'Unable to sign in. Please try again.'));
    } finally {
      setIsLoading(false);
    }
  }, [navigate, values]);

  return {
    values,
    fieldErrors,
    formError,
    isLoading,
    setFieldValue,
    submit,
  };
}
