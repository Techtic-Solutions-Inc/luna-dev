import type { ContactFormErrors, ContactFormValues } from '../../../types/visitorHome';

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_PATTERN = /^[+]?[\d\s()-]{7,20}$/;

export const validateContactForm = (values: ContactFormValues): ContactFormErrors => {
  const errors: ContactFormErrors = {};

  const firstName = values.firstName.trim();
  const lastName = values.lastName.trim();
  const email = values.email.trim();
  const phone = values.phone.trim();

  if (!firstName) {
    errors.firstName = 'First name is required';
  } else if (firstName.length < 2) {
    errors.firstName = 'First name must be at least 2 characters';
  }

  if (!lastName) {
    errors.lastName = 'Last name is required';
  } else if (lastName.length < 2) {
    errors.lastName = 'Last name must be at least 2 characters';
  }

  if (!email) {
    errors.email = 'Email is required';
  } else if (!EMAIL_PATTERN.test(email)) {
    errors.email = 'Please enter a valid email address';
  }

  if (!phone) {
    errors.phone = 'Phone number is required';
  } else if (!PHONE_PATTERN.test(phone)) {
    errors.phone = 'Please enter a valid phone number';
  }

  if (!values.privacyPolicy) {
    errors.privacyPolicy = 'You must accept the Privacy Policy';
  }

  if (!values.termsOfService) {
    errors.termsOfService = 'You must accept the Terms of Service';
  }

  return errors;
};

export const hasFormErrors = (errors: ContactFormErrors): boolean =>
  Object.keys(errors).length > 0;
