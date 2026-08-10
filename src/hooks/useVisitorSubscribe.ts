import { useCallback, useState } from 'react';
import { visitorSubscribe } from '../api/visitor';
import {
  ApiError,
  getApiErrorMessage,
  mapFieldErrors,
} from '../api/client';
import type { VisitorSubscribeRequest } from '../types/api';
import {
  hasValidationErrors,
  type HomeSubscribeFieldErrors,
  type HomeSubscribeFieldName,
  type HomeSubscribeFormValues,
  validateHomeSubscribeForm,
} from '../utils/validation';

interface UseVisitorSubscribeResult {
  values: HomeSubscribeFormValues;
  fieldErrors: HomeSubscribeFieldErrors;
  formError: string | null;
  successMessage: string | null;
  isLoading: boolean;
  isPageLoading: boolean;
  setFieldValue: <K extends HomeSubscribeFieldName>(
    field: K,
    value: HomeSubscribeFormValues[K],
  ) => void;
  submit: () => Promise<void>;
}

const initialValues: HomeSubscribeFormValues = {
  firstName: '',
  lastName: '',
  email: '',
  phoneNumber: '',
  privacyPolicyAccepted: false,
  termsAccepted: false,
};

const apiFieldMap: Partial<Record<string, HomeSubscribeFieldName>> = {
  first_name: 'firstName',
  last_name: 'lastName',
  email: 'email',
  phone_number: 'phoneNumber',
  privacy_policy_accepted: 'privacyPolicyAccepted',
  terms_accepted: 'termsAccepted',
};

export function useVisitorSubscribe(): UseVisitorSubscribeResult {
  const [values, setValues] = useState<HomeSubscribeFormValues>(initialValues);
  const [fieldErrors, setFieldErrors] = useState<HomeSubscribeFieldErrors>({});
  const [formError, setFormError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isPageLoading] = useState(false);

  const setFieldValue = useCallback(
    <K extends HomeSubscribeFieldName>(
      field: K,
      value: HomeSubscribeFormValues[K],
    ) => {
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
      setSuccessMessage(null);
    },
    [],
  );

  const submit = useCallback(async () => {
    const validationErrors = validateHomeSubscribeForm(values);
    setFieldErrors(validationErrors);

    if (hasValidationErrors(validationErrors)) {
      return;
    }

    setIsLoading(true);
    setFormError(null);
    setSuccessMessage(null);

    const payload: VisitorSubscribeRequest = {
      first_name: values.firstName.trim(),
      last_name: values.lastName.trim(),
      email: values.email.trim(),
      phone_number: values.phoneNumber.trim(),
      privacy_policy_accepted: values.privacyPolicyAccepted,
      terms_accepted: values.termsAccepted,
    };

    try {
      const response = await visitorSubscribe(payload);
      setSuccessMessage(
        response.data.message ||
          response.message ||
          'Thank you for subscribing!',
      );
      setValues(initialValues);
    } catch (error) {
      if (error instanceof ApiError && error.details) {
        const apiFieldErrors = mapFieldErrors(error.details);
        const mappedErrors: HomeSubscribeFieldErrors = {};

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

      setFormError(
        getApiErrorMessage(error, 'Unable to complete your subscription.'),
      );
    } finally {
      setIsLoading(false);
    }
  }, [values]);

  return {
    values,
    fieldErrors,
    formError,
    successMessage,
    isLoading,
    isPageLoading,
    setFieldValue,
    submit,
  };
}
