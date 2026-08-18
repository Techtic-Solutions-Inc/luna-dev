import type { ChangePasswordPayload, UserProfilePayload } from '../types/api';

export type ProfileFieldKey = keyof UserProfilePayload;
export type PasswordFieldKey = keyof ChangePasswordPayload;

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const NAME_PATTERN = /^[\p{L}][\p{L}\s.'-]*$/u;
const ZIP_PATTERN = /^\d{5}(?:-\d{4})?$/;
const BIO_MAX_LENGTH = 500;
const PASSWORD_MIN_LENGTH = 8;

function required(value: string, label: string): string | null {
  if (!value.trim()) {
    return `${label} is required.`;
  }

  return null;
}

export function validateProfileField(
  field: ProfileFieldKey,
  value: string,
): string | null {
  const trimmed = value.trim();

  switch (field) {
    case 'first_name': {
      const missing = required(trimmed, 'First name');
      if (missing) return missing;
      if (!NAME_PATTERN.test(trimmed)) {
        return 'First name can only include letters, spaces, hyphens, and apostrophes.';
      }
      return null;
    }
    case 'last_name': {
      const missing = required(trimmed, 'Last name');
      if (missing) return missing;
      if (!NAME_PATTERN.test(trimmed)) {
        return 'Last name can only include letters, spaces, hyphens, and apostrophes.';
      }
      return null;
    }
    case 'email': {
      const missing = required(trimmed, 'Email');
      if (missing) return missing;
      if (!EMAIL_PATTERN.test(trimmed)) {
        return 'Enter a valid email address.';
      }
      return null;
    }
    case 'mobile_number': {
      const missing = required(trimmed, 'Mobile number');
      if (missing) return missing;
      const digits = trimmed.replace(/\D/g, '');
      if (digits.length < 10 || digits.length > 15) {
        return 'Enter a valid mobile number.';
      }
      return null;
    }
    case 'bio': {
      if (value.length > BIO_MAX_LENGTH) {
        return `Bio must be ${BIO_MAX_LENGTH} characters or fewer.`;
      }
      return null;
    }
    case 'street':
      return required(trimmed, 'Street');
    case 'city': {
      const missing = required(trimmed, 'City');
      if (missing) return missing;
      if (!NAME_PATTERN.test(trimmed)) {
        return 'Enter a valid city name.';
      }
      return null;
    }
    case 'state':
      return required(trimmed, 'State');
    case 'zip': {
      const missing = required(trimmed, 'ZIP');
      if (missing) return missing;
      if (!ZIP_PATTERN.test(trimmed)) {
        return 'Enter a valid ZIP code.';
      }
      return null;
    }
    case 'country':
      return required(trimmed, 'Country');
    case 'time_zone':
      return required(trimmed, 'Time zone');
    default:
      return null;
  }
}

export function validateProfileForm(
  values: UserProfilePayload,
): Partial<Record<ProfileFieldKey, string>> {
  const errors: Partial<Record<ProfileFieldKey, string>> = {};

  (Object.keys(values) as ProfileFieldKey[]).forEach((field) => {
    const message = validateProfileField(field, values[field]);
    if (message) {
      errors[field] = message;
    }
  });

  return errors;
}

export function validatePasswordField(
  field: PasswordFieldKey,
  values: ChangePasswordPayload,
): string | null {
  const current = values.current_password;
  const next = values.new_password;
  const confirm = values.confirm_password;

  switch (field) {
    case 'current_password':
      return required(current, 'Current password');
    case 'new_password': {
      const missing = required(next, 'New password');
      if (missing) return missing;
      if (next.length < PASSWORD_MIN_LENGTH) {
        return `New password must be at least ${PASSWORD_MIN_LENGTH} characters.`;
      }
      if (current && next === current) {
        return 'New password must be different from your current password.';
      }
      return null;
    }
    case 'confirm_password': {
      const missing = required(confirm, 'Confirm password');
      if (missing) return missing;
      if (next && confirm !== next) {
        return 'Passwords do not match.';
      }
      return null;
    }
    default:
      return null;
  }
}

export function validateChangePasswordForm(
  values: ChangePasswordPayload,
): Partial<Record<PasswordFieldKey, string>> {
  const errors: Partial<Record<PasswordFieldKey, string>> = {};
  const fields: PasswordFieldKey[] = [
    'current_password',
    'new_password',
    'confirm_password',
  ];

  fields.forEach((field) => {
    const message = validatePasswordField(field, values);
    if (message) {
      errors[field] = message;
    }
  });

  return errors;
}

export function mapApiFieldErrors(
  raw: Record<string, string>,
): Record<string, string> {
  const aliases: Record<string, string> = {
    firstName: 'first_name',
    lastName: 'last_name',
    mobileNumber: 'mobile_number',
    phone: 'mobile_number',
    phone_number: 'mobile_number',
    address: 'street',
    zip_code: 'zip',
    zipCode: 'zip',
    postal_code: 'zip',
    postalCode: 'zip',
    timeZone: 'time_zone',
    timezone: 'time_zone',
    currentPassword: 'current_password',
    newPassword: 'new_password',
    confirmPassword: 'confirm_password',
    password: 'new_password',
  };

  const mapped: Record<string, string> = {};

  for (const [key, message] of Object.entries(raw)) {
    mapped[aliases[key] ?? key] = message;
  }

  return mapped;
}
