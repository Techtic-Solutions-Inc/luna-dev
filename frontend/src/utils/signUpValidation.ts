export interface SignUpFormValues {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  termsAccepted: boolean;
}

export type SignUpFieldName = keyof SignUpFormValues;

export type SignUpFieldErrors = Partial<Record<SignUpFieldName, string>>;

const EMAIL_PATTERN =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;

const PASSWORD_MIN_LENGTH = 8;

export function isValidEmail(value: string): boolean {
  return EMAIL_PATTERN.test(value.trim());
}

export function isStrongPassword(value: string): boolean {
  if (value.length < PASSWORD_MIN_LENGTH) {
    return false;
  }
  const hasLower = /[a-z]/.test(value);
  const hasUpper = /[A-Z]/.test(value);
  const hasNumber = /\d/.test(value);
  return hasLower && hasUpper && hasNumber;
}

export function validateSignUpForm(values: SignUpFormValues): SignUpFieldErrors {
  const errors: SignUpFieldErrors = {};

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

  if (!values.password) {
    errors.password = 'Password is required.';
  } else if (!isStrongPassword(values.password)) {
    errors.password =
      'Password must be at least 8 characters and include uppercase, lowercase, and a number.';
  }

  if (!values.termsAccepted) {
    errors.termsAccepted =
      'You must agree to the Terms of Use and Privacy Policy.';
  }

  return errors;
}

export const FIELD_FOCUS_ORDER: SignUpFieldName[] = [
  'firstName',
  'lastName',
  'email',
  'password',
  'termsAccepted',
];

export function getFirstInvalidField(
  errors: SignUpFieldErrors,
): SignUpFieldName | null {
  for (const field of FIELD_FOCUS_ORDER) {
    if (errors[field]) {
      return field;
    }
  }
  return null;
}
