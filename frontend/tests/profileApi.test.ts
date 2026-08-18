import {
  changePassword,
  getProfile,
  normalizeUserProfile,
  updateProfile,
} from '../src/lib/api/profile';
import { apiClient } from '../src/lib/api/client';
import { getApiFieldErrors } from '../src/lib/api/errors';
import {
  validateChangePasswordForm,
  validateProfileForm,
} from '../src/lib/profileValidation';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import type { UserProfile } from '../src/types/api';

vi.mock('../src/lib/api/client', () => ({
  apiClient: {
    get: vi.fn(),
    put: vi.fn(),
    post: vi.fn(),
  },
}));

const profile: UserProfile = {
  id: 'user-1',
  first_name: 'Joseph',
  last_name: 'Stanley',
  email: 'joseph.stanley@example.com',
  mobile_number: '2025550147',
  bio: 'Luxury listing specialist in the DMV.',
  street: '1200 Pennsylvania Avenue',
  city: 'Washington',
  state: 'District of Columbia',
  zip: '20004',
  country: 'United States',
  time_zone: 'America/New_York',
  name: 'Joseph Stanley',
  avatar: '',
  created_at: '2024-03-12T12:00:00.000Z',
};

describe('profile API', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('gets the current profile from /api/profile', async () => {
    vi.mocked(apiClient.get).mockResolvedValueOnce({
      data: { success: true, message: 'ok', data: profile },
    });

    const result = await getProfile();

    expect(apiClient.get).toHaveBeenCalledWith('/api/profile');
    expect(result?.first_name).toBe('Joseph');
    expect(result?.time_zone).toBe('America/New_York');
  });

  it('updates the profile with PUT /api/profile', async () => {
    vi.mocked(apiClient.put).mockResolvedValueOnce({
      data: { success: true, message: 'ok', data: profile },
    });

    const payload = {
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

    const result = await updateProfile(payload);

    expect(apiClient.put).toHaveBeenCalledWith('/api/profile', payload);
    expect(result?.email).toBe(profile.email);
  });

  it('posts a password change to /api/profile/change-password', async () => {
    vi.mocked(apiClient.post).mockResolvedValueOnce({
      data: { success: true, message: 'updated' },
    });

    const body = {
      current_password: 'old-password',
      new_password: 'new-password',
      confirm_password: 'new-password',
    };

    const result = await changePassword(body);

    expect(apiClient.post).toHaveBeenCalledWith(
      '/api/profile/change-password',
      body,
    );
    expect(result.success).toBe(true);
  });

  it('normalizes alternate profile field names', () => {
    const normalized = normalizeUserProfile({
      id: '9',
      firstName: 'Ava',
      lastName: 'Cole',
      email: 'ava.cole@example.com',
      phone: '4155550100',
      address: '88 Market Street',
      zipCode: '94105',
      timeZone: 'America/Los_Angeles',
      country: 'United States',
      city: 'San Francisco',
      state: 'California',
    });

    expect(normalized).toMatchObject({
      first_name: 'Ava',
      last_name: 'Cole',
      mobile_number: '4155550100',
      street: '88 Market Street',
      zip: '94105',
      time_zone: 'America/Los_Angeles',
    });
  });
});

describe('profile validation', () => {
  it('requires core profile fields and validates email and zip', () => {
    const errors = validateProfileForm({
      first_name: '',
      last_name: '',
      email: 'not-an-email',
      mobile_number: '123',
      bio: '',
      street: '',
      city: '',
      state: '',
      zip: 'abc',
      country: '',
      time_zone: '',
    });

    expect(errors.first_name).toBe('First name is required.');
    expect(errors.email).toBe('Enter a valid email address.');
    expect(errors.mobile_number).toBe('Enter a valid mobile number.');
    expect(errors.zip).toBe('Enter a valid ZIP code.');
    expect(errors.country).toBe('Country is required.');
  });

  it('validates password confirmation and minimum length', () => {
    const errors = validateChangePasswordForm({
      current_password: 'current-pass',
      new_password: 'short',
      confirm_password: 'mismatch',
    });

    expect(errors.new_password).toBe(
      'New password must be at least 8 characters.',
    );
    expect(errors.confirm_password).toBe('Passwords do not match.');
  });
});

describe('API field errors', () => {
  it('extracts field errors from the error envelope', () => {
    const error = {
      isAxiosError: true,
      response: {
        data: {
          message: 'Validation failed',
          errors: {
            email: ['Email is already in use.'],
            zip: 'Enter a valid ZIP code.',
          },
        },
      },
    };

    expect(getApiFieldErrors(error)).toEqual({
      email: 'Email is already in use.',
      zip: 'Enter a valid ZIP code.',
    });
  });
});
