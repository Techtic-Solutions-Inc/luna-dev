import axios from 'axios';
import type {
  ChangePasswordPayload,
  ChangePasswordResponse,
  ErrorEnvelope,
  ProfileData,
  ProfileResponse,
  ProfileUpdatePayload,
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
  }

  return '';
}

export function normalizeProfileData(value: unknown): ProfileData | null {
  if (!isRecord(value)) {
    return null;
  }

  const id = readString(value, ['id']);
  const email = readString(value, ['email']);

  if (!id && !email) {
    return null;
  }

  return {
    id: id || email,
    first_name: readString(value, ['first_name', 'firstName']),
    last_name: readString(value, ['last_name', 'lastName']),
    email,
    mobile_number: readString(value, [
      'mobile_number',
      'mobileNumber',
      'mobile',
      'phone',
    ]),
    bio: readString(value, ['bio', 'about', 'description']),
    street: readString(value, ['street', 'address', 'address_line_1']),
    city: readString(value, ['city']),
    state: readString(value, ['state', 'region']),
    zip: readString(value, ['zip', 'zip_code', 'zipCode', 'postal_code']),
    country: readString(value, ['country']),
    time_zone: readString(value, ['time_zone', 'timeZone', 'timezone']),
    avatar_url: readString(value, ['avatar_url', 'avatarUrl', 'avatar']),
    created_at: readString(value, ['created_at', 'createdAt', 'member_since']),
  };
}

function unwrapProfile(payload: ProfileResponse | ProfileData): ProfileData | null {
  if (isRecord(payload) && 'data' in payload) {
    return normalizeProfileData(payload.data);
  }

  return normalizeProfileData(payload);
}

export function syncProfileStorage(profile: ProfileData): void {
  if (profile.first_name) {
    localStorage.setItem('first_name', profile.first_name);
  }

  if (profile.last_name) {
    localStorage.setItem('last_name', profile.last_name);
  }

  const displayName = [profile.first_name, profile.last_name]
    .filter(Boolean)
    .join(' ')
    .trim();

  if (displayName) {
    localStorage.setItem('name', displayName);
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
  if (axios.isAxiosError<ErrorEnvelope>(error)) {
    const message = error.response?.data.message;
    if (message) {
      return message;
    }
  }

  if (error instanceof Error && error.message) {
    return error.message;
  }

  return 'Something went wrong while loading your profile.';
}

export function getProfileUpdateErrorMessage(error: unknown): string {
  if (axios.isAxiosError<ErrorEnvelope>(error)) {
    const message = error.response?.data.message;
    if (message) {
      return message;
    }
  }

  if (error instanceof Error && error.message) {
    return error.message;
  }

  return 'Something went wrong while saving your profile.';
}

export function getChangePasswordErrorMessage(error: unknown): string {
  if (axios.isAxiosError<ErrorEnvelope>(error)) {
    const message = error.response?.data.message;
    if (message) {
      return message;
    }
  }

  if (error instanceof Error && error.message) {
    return error.message;
  }

  return 'Something went wrong while changing your password.';
}

export function extractApiFieldErrors(
  error: unknown,
): Record<string, string[] | string> | undefined {
  if (axios.isAxiosError<ErrorEnvelope>(error)) {
    return error.response?.data.errors;
  }

  return undefined;
}

export async function getProfile(): Promise<ProfileData | null> {
  const response = await apiClient.get<ProfileResponse | ProfileData>(
    '/api/profile',
  );

  return unwrapProfile(response.data);
}

export async function updateProfile(
  body: ProfileUpdatePayload,
): Promise<ProfileData | null> {
  const response = await apiClient.put<ProfileResponse | ProfileData>(
    '/api/profile',
    body,
  );

  const profile = unwrapProfile(response.data);
  if (profile) {
    syncProfileStorage(profile);
  }

  return profile;
}

export async function changePassword(
  body: ChangePasswordPayload,
): Promise<ChangePasswordResponse> {
  const response = await apiClient.post<ChangePasswordResponse>(
    '/api/profile/change-password',
    body,
  );

  return response.data;
}
