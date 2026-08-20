export interface ContactFormValues {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  privacyPolicy: boolean;
  termsOfService: boolean;
}

export type ContactFormField = keyof ContactFormValues;

export type ContactFormErrors = Partial<Record<ContactFormField, string>>;

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_PATTERN = /^[+]?[\d\s()-]{7,20}$/;

export function validateContactForm(values: ContactFormValues): ContactFormErrors {
  const errors: ContactFormErrors = {};

  const firstName = values.firstName.trim();
  if (firstName.length === 0) {
    errors.firstName = 'First name is required.';
  } else if (firstName.length < 2) {
    errors.firstName = 'First name must be at least 2 characters.';
  }

  const lastName = values.lastName.trim();
  if (lastName.length === 0) {
    errors.lastName = 'Last name is required.';
  } else if (lastName.length < 2) {
    errors.lastName = 'Last name must be at least 2 characters.';
  }

  const email = values.email.trim();
  if (email.length === 0) {
    errors.email = 'Email is required.';
  } else if (!EMAIL_PATTERN.test(email)) {
    errors.email = 'Enter a valid email address.';
  }

  const phone = values.phone.trim();
  if (phone.length === 0) {
    errors.phone = 'Phone number is required.';
  } else if (!PHONE_PATTERN.test(phone)) {
    errors.phone = 'Enter a valid phone number.';
  }

  if (!values.privacyPolicy) {
    errors.privacyPolicy = 'You must accept the Privacy Policy.';
  }

  if (!values.termsOfService) {
    errors.termsOfService = 'You must accept the Terms of Service.';
  }

  return errors;
}

export function hasFormErrors(errors: ContactFormErrors): boolean {
  return Object.keys(errors).length > 0;
}
