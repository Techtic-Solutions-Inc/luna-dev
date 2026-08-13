export interface SignInFormValues {
  email: string;
  password: string;
  rememberMe: boolean;
}

export type SignInFieldName = keyof SignInFormValues;

export type SignInFieldErrors = Partial<
  Record<Exclude<SignInFieldName, 'rememberMe'>, string>
>;

const EMAIL_PATTERN =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;

export function isValidEmail(value: string): boolean {
  return EMAIL_PATTERN.test(value.trim());
}

export function validateSignInForm(values: SignInFormValues): SignInFieldErrors {
  const errors: SignInFieldErrors = {};

  if (!values.email.trim()) {
    errors.email = 'Email is required.';
  } else if (!isValidEmail(values.email)) {
    errors.email = 'Enter a valid email address.';
  }

  if (!values.password) {
    errors.password = 'Password is required.';
  }

  return errors;
}

export const FIELD_FOCUS_ORDER: Array<Exclude<SignInFieldName, 'rememberMe'>> =
  ['email', 'password'];

export function getFirstInvalidField(
  errors: SignInFieldErrors,
): Exclude<SignInFieldName, 'rememberMe'> | null {
  for (const field of FIELD_FOCUS_ORDER) {
    if (errors[field]) {
      return field;
    }
  }
  return null;
}
