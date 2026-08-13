export interface HomeSubscribeFormValues {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  experience: string;
  marketing: string;
  message: string;
  privacyAccepted: boolean;
  termsAccepted: boolean;
}

export type HomeSubscribeFieldName = keyof HomeSubscribeFormValues;

export type HomeSubscribeFieldErrors = Partial<
  Record<HomeSubscribeFieldName, string>
>;

const EMAIL_PATTERN =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;

const PHONE_PATTERN = /^[+]?[\d\s().-]{7,20}$/;

export function isValidEmail(value: string): boolean {
  return EMAIL_PATTERN.test(value.trim());
}

export function isValidPhone(value: string): boolean {
  const trimmed = value.trim();
  if (!PHONE_PATTERN.test(trimmed)) {
    return false;
  }
  const digits = trimmed.replace(/\D/g, '');
  return digits.length >= 7 && digits.length <= 15;
}

export function validateHomeSubscribeForm(
  values: HomeSubscribeFormValues,
): HomeSubscribeFieldErrors {
  const errors: HomeSubscribeFieldErrors = {};

  if (!values.firstName.trim()) {
    errors.firstName = 'First name is required.';
  }

  if (!values.lastName.trim()) {
    errors.lastName = 'Last name is required.';
  }

  if (!values.email.trim()) {
    errors.email = 'Email is required.';
  } else if (!isValidEmail(values.email)) {
    errors.email = 'Enter a valid email address.';
  }

  if (!values.phone.trim()) {
    errors.phone = 'Phone number is required.';
  } else if (!isValidPhone(values.phone)) {
    errors.phone = 'Enter a valid phone number.';
  }

  if (!values.experience.trim()) {
    errors.experience = 'Please tell us how long you have been in real estate.';
  }

  if (!values.marketing.trim()) {
    errors.marketing = 'Please describe your current marketing approach.';
  }

  if (!values.privacyAccepted) {
    errors.privacyAccepted = 'You must agree to the Privacy Policy.';
  }

  if (!values.termsAccepted) {
    errors.termsAccepted = 'You must agree to the Terms of Service.';
  }

  return errors;
}

export const HOME_SUBSCRIBE_FOCUS_ORDER: HomeSubscribeFieldName[] = [
  'firstName',
  'lastName',
  'email',
  'phone',
  'experience',
  'marketing',
  'message',
  'privacyAccepted',
  'termsAccepted',
];

export function getFirstInvalidHomeSubscribeField(
  errors: HomeSubscribeFieldErrors,
): HomeSubscribeFieldName | null {
  for (const field of HOME_SUBSCRIBE_FOCUS_ORDER) {
    if (errors[field]) {
      return field;
    }
  }
  return null;
}
