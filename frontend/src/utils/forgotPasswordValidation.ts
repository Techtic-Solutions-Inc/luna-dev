import { isValidEmail } from './signInValidation';

export interface ForgotPasswordFormValues {
  email: string;
}

export type ForgotPasswordFieldErrors = Partial<
  Record<keyof ForgotPasswordFormValues, string>
>;

export function validateForgotPasswordForm(
  values: ForgotPasswordFormValues,
): ForgotPasswordFieldErrors {
  const errors: ForgotPasswordFieldErrors = {};

  if (!values.email.trim()) {
    errors.email = 'Email is required.';
  } else if (!isValidEmail(values.email)) {
    errors.email = 'Enter a valid email address.';
  }

  return errors;
}
