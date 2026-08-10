import { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signup } from '../api/signup';
import {
  ApiError,
  getApiErrorMessage,
  mapFieldErrors,
} from '../api/client';
import type { SignupRequest } from '../types/api';
import {
  hasValidationErrors,
  type SignUpFieldErrors,
  type SignUpFieldName,
  type SignUpFormValues,
  validateSignUpForm,
} from '../utils/validation';

interface UseSignUpResult {
  values: SignUpFormValues;
  fieldErrors: SignUpFieldErrors;
  formError: string | null;
  isLoading: boolean;
  setFieldValue: <K extends SignUpFieldName>(field: K, value: SignUpFormValues[K]) => void;
  submit: () => Promise<void>;
}

const initialValues: SignUpFormValues = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  termsAccepted: false,
};

const apiFieldMap: Partial<Record<string, SignUpFieldName>> = {
  first_name: 'firstName',
  last_name: 'lastName',
  email: 'email',
  password: 'password',
  terms_accepted: 'termsAccepted',
};

export function useSignUp(): UseSignUpResult {
  const navigate = useNavigate();
  const [values, setValues] = useState<SignUpFormValues>(initialValues);
  const [fieldErrors, setFieldErrors] = useState<SignUpFieldErrors>({});
  const [formError, setFormError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const setFieldValue = useCallback(
    <K extends SignUpFieldName>(field: K, value: SignUpFormValues[K]) => {
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
    const validationErrors = validateSignUpForm(values);
    setFieldErrors(validationErrors);

    if (hasValidationErrors(validationErrors)) {
      return;
    }

    setIsLoading(true);
    setFormError(null);

    const payload: SignupRequest = {
      first_name: values.firstName.trim(),
      last_name: values.lastName.trim(),
      email: values.email.trim(),
      password: values.password,
      terms_accepted: values.termsAccepted,
    };

    try {
      const response = await signup(payload);
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
          name: response.data.name,
        },
      });
    } catch (error) {
      if (error instanceof ApiError && error.details) {
        const apiFieldErrors = mapFieldErrors(error.details);
        const mappedErrors: SignUpFieldErrors = {};

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

      setFormError(getApiErrorMessage(error, 'Unable to create your account.'));
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
