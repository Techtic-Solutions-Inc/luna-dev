import { apiClient } from '@/lib/api/client';
import {
  getApiErrorMessage,
  pickString,
  unwrapData,
} from '@/lib/api/errors';
import {
  isProfileApiReady,
  ProfileApiUnavailableError,
} from '@/lib/feature-flags';

function normalizeProfile(raw: unknown) {
  if (typeof raw !== 'object' || raw === null) return null;

  const source = raw as Record<string, unknown>;
  const id = pickString(source, ['id']);
  const email = pickString(source, ['email']);

  if (!id && !email) return null;

  return {
    id: id || email,
    first_name: pickString(source, ['first_name', 'firstName']),
    last_name: pickString(source, ['last_name', 'lastName']),
    email,
    mobile_number: pickString(source, [
      'mobile_number',
      'mobileNumber',
      'mobile',
      'phone',
    ]),
    bio: pickString(source, ['bio', 'about', 'description']),
    street: pickString(source, ['street', 'address', 'address_line_1']),
    city: pickString(source, ['city']),
    state: pickString(source, ['state', 'region']),
    zip: pickString(source, ['zip', 'zip_code', 'zipCode', 'postal_code']),
    country: pickString(source, ['country']),
    time_zone: pickString(source, ['time_zone', 'timeZone', 'timezone']),
    avatar_url: pickString(source, ['avatar_url', 'avatarUrl', 'avatar']),
    created_at: pickString(source, ['created_at', 'createdAt', 'member_since']),
  };
}

export type NormalizedProfile = NonNullable<ReturnType<typeof normalizeProfile>>;

function assertProfileApiReady(): void {
  if (!isProfileApiReady) {
    throw new ProfileApiUnavailableError();
  }
}

export async function fetchProfile(): Promise<NormalizedProfile | null> {
  assertProfileApiReady();
  const response = await apiClient.get('/api/profile');
  const data = unwrapData<unknown>(response.data);
  const profile = normalizeProfile(data ?? response.data);
  if (profile) syncProfileToStorage(profile);
  return profile;
}

import type { UpdateProfileRequest } from '@/types/api';

export async function updateProfile(
  body: UpdateProfileRequest,
): Promise<NormalizedProfile | null> {
  assertProfileApiReady();
  const response = await apiClient.put('/api/profile', body);
  const data = unwrapData<unknown>(response.data);
  const profile = normalizeProfile(data ?? response.data);
  if (profile) syncProfileToStorage(profile);
  return profile;
}

export async function changePassword(body: {
  current_password: string;
  new_password: string;
  confirm_password: string;
}): Promise<void> {
  assertProfileApiReady();
  await apiClient.post('/api/profile/change-password', body);
}

export function syncProfileToStorage(profile: NormalizedProfile): void {
  if (profile.first_name) {
    localStorage.setItem('first_name', profile.first_name);
  }
  if (profile.last_name) {
    localStorage.setItem('last_name', profile.last_name);
  }

  const fullName = [profile.first_name, profile.last_name]
    .filter(Boolean)
    .join(' ')
    .trim();

  if (fullName) {
    localStorage.setItem('name', fullName);
  }
  if (profile.email) {
    localStorage.setItem('email', profile.email);
  }
  if (profile.mobile_number) {
    localStorage.setItem('phone', profile.mobile_number);
  }
  if (profile.avatar_url) {
    localStorage.setItem('avatar', profile.avatar_url);
  }
  if (profile.created_at) {
    localStorage.setItem('member_since', profile.created_at);
  }
}

export function getProfileErrorMessage(error: unknown): string {
  if (error instanceof ProfileApiUnavailableError) {
    return error.message;
  }
  return getApiErrorMessage(
    error,
    'Something went wrong while loading your profile.',
  );
}

export function getChangePasswordErrorMessage(error: unknown): string {
  return getApiErrorMessage(
    error,
    'Something went wrong while changing your password.',
  );
}

export function mapProfileFieldErrors(
  errors: Record<string, string[]>,
): Partial<Record<keyof NormalizedProfile | 'mobile_number', string>> {
  const mapped: Partial<Record<string, string>> = {};

  for (const [key, messages] of Object.entries(errors)) {
    const message = messages[0];
    if (!message) continue;

    switch (key) {
      case 'firstName':
        mapped.first_name = message;
        break;
      case 'lastName':
        mapped.last_name = message;
        break;
      case 'mobile':
      case 'phone':
        mapped.mobile_number = message;
        break;
      case 'timeZone':
      case 'timezone':
        mapped.time_zone = message;
        break;
      case 'zip_code':
      case 'zipCode':
      case 'postal_code':
        mapped.zip = message;
        break;
      default:
        mapped[key] = message;
        break;
    }
  }

  return mapped;
}
