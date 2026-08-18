import axios from 'axios';
import type {
  ChangePasswordPayload,
  ChangePasswordResponse,
  ErrorEnvelope,
  UserProfile,
  UserProfilePayload,
  UserProfileResponse,
} from '../../types/api';
import { apiClient } from './client';

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null;
}

function readString(
  record: Record<string, unknown>,
  keys: readonly string[],
): string {
  for (const key of keys) {
    const value = record[key];
    if (typeof value === 'string') {
      return value;
    }

    if (typeof value === 'number' && Number.isFinite(value)) {
      return String(value);
    }
  }

  return '';
}

function unwrapProfilePayload(
  payload: UserProfileResponse | UserProfile | Record<string, unknown>,
): unknown {
  if (isRecord(payload) && isRecord(payload.data)) {
    return payload.data;
  }

  return payload;
}

export function emptyUserProfile(): UserProfile {
  return {
    id: '',
    first_name: '',
    last_name: '',
    email: '',
    mobile_number: '',
    bio: '',
    street: '',
    city: '',
    state: '',
    zip: '',
    country: '',
    time_zone: '',
    name: '',
    avatar: '',
    created_at: '',
  };
}

export function normalizeUserProfile(value: unknown): UserProfile | null {
  if (!isRecord(value)) {
    return null;
  }

  const nested = isRecord(value.data) ? value.data : value;
  const firstName = readString(nested, ['first_name', 'firstName']);
  const lastName = readString(nested, ['last_name', 'lastName']);
  const email = readString(nested, ['email']);
  const name = readString(nested, ['name', 'full_name', 'fullName']);

  const profile: UserProfile = {
    id: readString(nested, ['id']),
    first_name: firstName,
    last_name: lastName,
    email,
    mobile_number: readString(nested, [
      'mobile_number',
      'mobileNumber',
      'phone',
      'phone_number',
    ]),
    bio: readString(nested, ['bio', 'about']),
    street: readString(nested, ['street', 'address', 'address_line_1', 'address1']),
    city: readString(nested, ['city']),
    state: readString(nested, ['state', 'region', 'province']),
    zip: readString(nested, ['zip', 'zip_code', 'zipCode', 'postal_code', 'postalCode']),
    country: readString(nested, ['country']),
    time_zone: readString(nested, ['time_zone', 'timeZone', 'timezone']),
    name: name || `${firstName} ${lastName}`.trim(),
    avatar: readString(nested, ['avatar', 'avatarUrl', 'avatar_url', 'photo', 'image']),
    created_at: readString(nested, ['created_at', 'createdAt', 'member_since', 'memberSince']),
  };

  const hasContent = [
    profile.id,
    profile.first_name,
    profile.last_name,
    profile.email,
    profile.mobile_number,
    profile.bio,
    profile.street,
    profile.city,
    profile.state,
    profile.zip,
    profile.country,
    profile.time_zone,
    profile.name,
  ].some((field) => field.trim().length > 0);

  return hasContent ? profile : null;
}

export function isProfileEmpty(profile: UserProfile | null): boolean {
  return profile === null;
}

export function toUserProfilePayload(profile: UserProfile): UserProfilePayload {
  return {
    first_name: profile.first_name,
    last_name: profile.last_name,
    email: profile.email,
    mobile_number: profile.mobile_number,
    bio: profile.bio,
    street: profile.street,
    city: profile.city,
    state: profile.state,
    zip: profile.zip,
    country: profile.country,
    time_zone: profile.time_zone,
  };
}

export function persistProfileLocally(profile: UserProfile): void {
  localStorage.setItem('first_name', profile.first_name);
  localStorage.setItem('last_name', profile.last_name);
  localStorage.setItem('email', profile.email);

  if (profile.name) {
    localStorage.setItem('name', profile.name);
  } else {
    const combined = `${profile.first_name} ${profile.last_name}`.trim();
    if (combined) {
      localStorage.setItem('name', combined);
    }
  }

  if (profile.avatar) {
    localStorage.setItem('avatar', profile.avatar);
  }

  if (profile.created_at) {
    localStorage.setItem('created_at', profile.created_at);
  }
}

export function getProfileErrorMessage(
  error: unknown,
  fallback = 'Something went wrong while loading your profile.',
): string {
  if (axios.isAxiosError<ErrorEnvelope>(error)) {
    const message = error.response?.data.message;
    if (message) {
      return message;
    }
  }

  if (error instanceof Error && error.message) {
    return error.message;
  }

  return fallback;
}

export async function getProfile(): Promise<UserProfile | null> {
  const response = await apiClient.get<UserProfileResponse | UserProfile>(
    '/api/profile',
  );

  return normalizeUserProfile(unwrapProfilePayload(response.data));
}

export async function updateProfile(
  body: UserProfilePayload,
): Promise<UserProfile | null> {
  const response = await apiClient.put<UserProfileResponse | UserProfile>(
    '/api/profile',
    body,
  );

  return normalizeUserProfile(unwrapProfilePayload(response.data));
}

export async function changePassword(
  body: ChangePasswordPayload,
): Promise<ChangePasswordResponse> {
  const response = await apiClient.post<ChangePasswordResponse>(
    '/api/profile/change-password',
    body,
  );

  if (isRecord(response.data) && typeof response.data.success === 'boolean') {
    return {
      success: response.data.success,
      message:
        typeof response.data.message === 'string' ? response.data.message : '',
    };
  }

  return { success: true, message: '' };
}
