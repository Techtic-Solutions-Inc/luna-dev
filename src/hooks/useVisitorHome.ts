import { useCallback, useEffect, useState } from 'react';
import { acceptVisitorTerms, searchVisitorContent, subscribeVisitor } from '../lib/api/visitor';
import type { ApiErrorEnvelope } from '../types/api';
import type {
  ContactFormValues,
  FormFieldErrors,
  VisitorSearchResult,
  VisitorSubscribePayload,
} from '../types/visitor';
import { hasFormErrors, validateContactForm } from '../lib/validation';
import axios from 'axios';

type SubmitStatus = 'idle' | 'loading' | 'success' | 'error';

interface UseVisitorHomeReturn {
  searchResults: VisitorSearchResult[];
  searchLoading: boolean;
  searchError: string | null;
  searchEmpty: boolean;
  performSearch: (query: string) => Promise<void>;
  submitForm: (values: ContactFormValues) => Promise<boolean>;
  submitStatus: SubmitStatus;
  submitMessage: string | null;
  fieldErrors: FormFieldErrors;
  initialLoading: boolean;
}

const parseApiErrors = (error: unknown): FormFieldErrors & { general?: string } => {
  if (axios.isAxiosError<ApiErrorEnvelope>(error) && error.response?.data) {
    const { message, errors } = error.response.data;
    const fieldErrors: FormFieldErrors = {};

    if (errors) {
      Object.entries(errors).forEach(([key, messages]) => {
        if (messages.length > 0) {
          fieldErrors[key as keyof FormFieldErrors] = messages[0];
        }
      });
    }

    return { ...fieldErrors, general: message };
  }

  return { general: 'Something went wrong. Please try again.' };
};

export const useVisitorHome = (): UseVisitorHomeReturn => {
  const [searchResults, setSearchResults] = useState<VisitorSearchResult[]>([]);
  const [searchLoading, setSearchLoading] = useState(false);
  const [searchError, setSearchError] = useState<string | null>(null);
  const [initialLoading, setInitialLoading] = useState(true);
  const [submitStatus, setSubmitStatus] = useState<SubmitStatus>('idle');
  const [submitMessage, setSubmitMessage] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<FormFieldErrors>({});

  const performSearch = useCallback(async (query: string) => {
    setSearchLoading(true);
    setSearchError(null);

    try {
      const data = await searchVisitorContent(query);
      setSearchResults(data.items);
    } catch (error) {
      const parsed = parseApiErrors(error);
      setSearchError(parsed.general ?? 'Unable to load content. Please try again.');
      setSearchResults([]);
    } finally {
      setSearchLoading(false);
    }
  }, []);

  useEffect(() => {
    const loadInitial = async () => {
      await performSearch('');
      setInitialLoading(false);
    };
    void loadInitial();
  }, [performSearch]);

  const submitForm = useCallback(async (values: ContactFormValues): Promise<boolean> => {
    const validationErrors = validateContactForm(values);
    setFieldErrors(validationErrors);

    if (hasFormErrors(validationErrors)) {
      setSubmitStatus('error');
      setSubmitMessage('Please fix the errors below.');
      return false;
    }

    setSubmitStatus('loading');
    setSubmitMessage(null);
    setFieldErrors({});

    const payload: VisitorSubscribePayload = {
      first_name: values.first_name.trim(),
      last_name: values.last_name.trim(),
      email: values.email.trim(),
      phone: values.phone.trim(),
      city_state: values.city_state.trim() || undefined,
      goal: values.goal.trim() || undefined,
      message: values.message.trim() || undefined,
    };

    try {
      await acceptVisitorTerms({
        privacy_policy: values.privacy_policy,
        terms_of_service: values.terms_of_service,
        email: values.email.trim(),
      });

      const response = await subscribeVisitor(payload);
      setSubmitStatus('success');
      setSubmitMessage(response.message);
      return true;
    } catch (error) {
      const parsed = parseApiErrors(error);
      const { general, ...rest } = parsed;
      setFieldErrors(rest);
      setSubmitStatus('error');
      setSubmitMessage(general ?? 'Unable to submit. Please try again.');
      return false;
    }
  }, []);

  return {
    searchResults,
    searchLoading,
    searchError,
    searchEmpty: !searchLoading && searchResults.length === 0,
    performSearch,
    submitForm,
    submitStatus,
    submitMessage,
    fieldErrors,
    initialLoading,
  };
};
