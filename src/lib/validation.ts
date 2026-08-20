import type { ContactFormValues, FormFieldErrors } from '../types/visitor';

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_PATTERN = /^[\d\s\-+().]{7,20}$/;

export const validateContactForm = (values: ContactFormValues): FormFieldErrors => {
  const errors: FormFieldErrors = {};

  if (!values.first_name.trim()) {
    errors.first_name = 'First name is required';
  } else if (values.first_name.trim().length < 2) {
    errors.first_name = 'First name must be at least 2 characters';
  }

  if (!values.last_name.trim()) {
    errors.last_name = 'Last name is required';
  } else if (values.last_name.trim().length < 2) {
    errors.last_name = 'Last name must be at least 2 characters';
  }

  if (!values.email.trim()) {
    errors.email = 'Email is required';
  } else if (!EMAIL_PATTERN.test(values.email.trim())) {
    errors.email = 'Please enter a valid email address';
  }

  if (!values.phone.trim()) {
    errors.phone = 'Phone number is required';
  } else if (!PHONE_PATTERN.test(values.phone.trim())) {
    errors.phone = 'Please enter a valid phone number';
  }

  if (!values.privacy_policy) {
    errors.privacy_policy = 'You must accept the Privacy Policy';
  }

  if (!values.terms_of_service) {
    errors.terms_of_service = 'You must accept the Terms of Service';
  }

  return errors;
};

export const hasFormErrors = (errors: FormFieldErrors): boolean => Object.keys(errors).length > 0;
