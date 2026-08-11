const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const PASSWORD_PATTERN =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/;

export interface SignUpFormValues {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  termsAccepted: boolean;
}

export type SignUpFieldName = keyof SignUpFormValues;

export type SignUpFieldErrors = Partial<Record<SignUpFieldName, string>>;

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
  } else if (!EMAIL_PATTERN.test(values.email.trim())) {
    errors.email = 'Enter a valid email address.';
  }

  if (!values.password) {
    errors.password = 'Password is required.';
  } else if (!PASSWORD_PATTERN.test(values.password)) {
    errors.password =
      'Password must be at least 8 characters and include uppercase, lowercase, number, and special character.';
  }

  if (!values.termsAccepted) {
    errors.termsAccepted = 'You must agree to the Terms of Use and Privacy Policy.';
  }

  return errors;
}

export function hasValidationErrors(errors: SignUpFieldErrors): boolean {
  return Object.keys(errors).length > 0;
}

export interface SignInFormValues {
  email: string;
  password: string;
  rememberMe: boolean;
}

export type SignInFieldName = keyof SignInFormValues;

export type SignInFieldErrors = Partial<Record<SignInFieldName, string>>;

export function validateSignInForm(values: SignInFormValues): SignInFieldErrors {
  const errors: SignInFieldErrors = {};

  if (!values.email.trim()) {
    errors.email = 'Email is required.';
  } else if (!EMAIL_PATTERN.test(values.email.trim())) {
    errors.email = 'Enter a valid email address.';
  }

  if (!values.password) {
    errors.password = 'Password is required.';
  }

  return errors;
}

const PHONE_PATTERN = /^\+?[\d\s\-().]{7,20}$/;

export interface HomeSubscribeFormValues {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  privacyPolicyAccepted: boolean;
  termsAccepted: boolean;
}

export type HomeSubscribeFieldName = keyof HomeSubscribeFormValues;

export type HomeSubscribeFieldErrors = Partial<
  Record<HomeSubscribeFieldName, string>
>;

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
  } else if (!EMAIL_PATTERN.test(values.email.trim())) {
    errors.email = 'Enter a valid email address.';
  }

  if (!values.phoneNumber.trim()) {
    errors.phoneNumber = 'Phone number is required.';
  } else if (!PHONE_PATTERN.test(values.phoneNumber.trim())) {
    errors.phoneNumber = 'Enter a valid phone number.';
  }

  if (!values.privacyPolicyAccepted) {
    errors.privacyPolicyAccepted = 'You must accept the Privacy Policy.';
  }

  if (!values.termsAccepted) {
    errors.termsAccepted = 'You must accept the Terms of Service.';
  }

  return errors;
}
