import type { ProfileUpdatePayload } from '../types/api';

export interface ProfileFieldErrors {
  first_name?: string;
  last_name?: string;
  email?: string;
  mobile_number?: string;
  bio?: string;
  street?: string;
  city?: string;
  state?: string;
  zip?: string;
  country?: string;
  time_zone?: string;
  form?: string;
}

export interface ChangePasswordValues {
  current_password: string;
  new_password: string;
  new_password_confirmation: string;
}

export interface ChangePasswordFieldErrors {
  current_password?: string;
  new_password?: string;
  new_password_confirmation?: string;
  form?: string;
}

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_PATTERN = /^[+]?[\d\s().-]{7,20}$/;
const ZIP_PATTERN = /^[\dA-Za-z\s-]{3,12}$/;

function required(value: string, label: string): string | undefined {
  if (!value.trim()) {
    return `${label} is required.`;
  }

  return undefined;
}

export function validateProfileForm(
  values: ProfileUpdatePayload,
): ProfileFieldErrors {
  const errors: ProfileFieldErrors = {};

  const firstNameError = required(values.first_name, 'First name');
  if (firstNameError) {
    errors.first_name = firstNameError;
  } else if (values.first_name.trim().length > 80) {
    errors.first_name = 'First name must be 80 characters or fewer.';
  }

  const lastNameError = required(values.last_name, 'Last name');
  if (lastNameError) {
    errors.last_name = lastNameError;
  } else if (values.last_name.trim().length > 80) {
    errors.last_name = 'Last name must be 80 characters or fewer.';
  }

  const emailError = required(values.email, 'Email');
  if (emailError) {
    errors.email = emailError;
  } else if (!EMAIL_PATTERN.test(values.email.trim())) {
    errors.email = 'Enter a valid email address.';
  }

  if (values.mobile_number.trim()) {
    if (!PHONE_PATTERN.test(values.mobile_number.trim())) {
      errors.mobile_number = 'Enter a valid mobile number.';
    }
  }

  if (values.bio.trim().length > 500) {
    errors.bio = 'Bio must be 500 characters or fewer.';
  }

  const streetError = required(values.street, 'Street');
  if (streetError) {
    errors.street = streetError;
  }

  const cityError = required(values.city, 'City');
  if (cityError) {
    errors.city = cityError;
  }

  const stateError = required(values.state, 'State');
  if (stateError) {
    errors.state = stateError;
  }

  const zipError = required(values.zip, 'ZIP');
  if (zipError) {
    errors.zip = zipError;
  } else if (!ZIP_PATTERN.test(values.zip.trim())) {
    errors.zip = 'Enter a valid ZIP code.';
  }

  const countryError = required(values.country, 'Country');
  if (countryError) {
    errors.country = countryError;
  }

  const timeZoneError = required(values.time_zone, 'Time zone');
  if (timeZoneError) {
    errors.time_zone = timeZoneError;
  }

  return errors;
}

export function hasProfileFieldErrors(errors: ProfileFieldErrors): boolean {
  return Object.keys(errors).length > 0;
}

export function validateChangePasswordForm(
  values: ChangePasswordValues,
): ChangePasswordFieldErrors {
  const errors: ChangePasswordFieldErrors = {};

  const currentPasswordError = required(values.current_password, 'Current password');
  if (currentPasswordError) {
    errors.current_password = currentPasswordError;
  }

  const newPasswordError = required(values.new_password, 'New password');
  if (newPasswordError) {
    errors.new_password = newPasswordError;
  } else if (values.new_password.length < 8) {
    errors.new_password = 'New password must be at least 8 characters.';
  } else if (!/[A-Za-z]/.test(values.new_password) || !/\d/.test(values.new_password)) {
    errors.new_password = 'New password must include letters and numbers.';
  }

  const confirmError = required(
    values.new_password_confirmation,
    'Password confirmation',
  );
  if (confirmError) {
    errors.new_password_confirmation = confirmError;
  } else if (values.new_password !== values.new_password_confirmation) {
    errors.new_password_confirmation = 'Passwords do not match.';
  }

  return errors;
}

export function hasChangePasswordFieldErrors(
  errors: ChangePasswordFieldErrors,
): boolean {
  return Object.keys(errors).length > 0;
}

export function mapApiFieldErrors(
  errors: Record<string, string[] | string> | undefined,
): ProfileFieldErrors {
  if (!errors) {
    return {};
  }

  const mapped: ProfileFieldErrors = {};

  for (const [key, value] of Object.entries(errors)) {
    const normalizedKey = key.replace(/([A-Z])/g, '_$1').toLowerCase();
    const message = Array.isArray(value) ? value[0] : value;

    if (!message) {
      continue;
    }

    switch (normalizedKey) {
      case 'first_name':
      case 'firstname':
        mapped.first_name = message;
        break;
      case 'last_name':
      case 'lastname':
        mapped.last_name = message;
        break;
      case 'email':
        mapped.email = message;
        break;
      case 'mobile_number':
      case 'mobile':
      case 'phone':
        mapped.mobile_number = message;
        break;
      case 'bio':
        mapped.bio = message;
        break;
      case 'street':
        mapped.street = message;
        break;
      case 'city':
        mapped.city = message;
        break;
      case 'state':
        mapped.state = message;
        break;
      case 'zip':
      case 'zip_code':
        mapped.zip = message;
        break;
      case 'country':
        mapped.country = message;
        break;
      case 'time_zone':
      case 'timezone':
        mapped.time_zone = message;
        break;
      default:
        mapped.form = message;
        break;
    }
  }

  return mapped;
}

export function mapChangePasswordApiFieldErrors(
  errors: Record<string, string[] | string> | undefined,
): ChangePasswordFieldErrors {
  if (!errors) {
    return {};
  }

  const mapped: ChangePasswordFieldErrors = {};

  for (const [key, value] of Object.entries(errors)) {
    const normalizedKey = key.replace(/([A-Z])/g, '_$1').toLowerCase();
    const message = Array.isArray(value) ? value[0] : value;

    if (!message) {
      continue;
    }

    switch (normalizedKey) {
      case 'current_password':
        mapped.current_password = message;
        break;
      case 'new_password':
        mapped.new_password = message;
        break;
      case 'new_password_confirmation':
      case 'confirm_password':
      case 'password_confirmation':
        mapped.new_password_confirmation = message;
        break;
      default:
        mapped.form = message;
        break;
    }
  }

  return mapped;
}
