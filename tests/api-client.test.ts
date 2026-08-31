import { afterEach, describe, expect, it, vi } from 'vitest';
import { API_BASE_URL, apiClient, fetchData, getApiError } from '@/lib/api/client';
import { endpoints } from '@/types/api';
import axios from 'axios';

describe('API client', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('points at the backend origin from env', () => {
    expect(API_BASE_URL).toBeTruthy();
    expect(API_BASE_URL.includes(':5173')).toBe(false);
  });

  it('keeps locked contract paths', () => {
    expect(endpoints.login).toBe('/api/auth/login');
    expect(endpoints.forgotPassword).toBe('/api/auth/forgot-password');
    expect(endpoints.signup).toBe('/api/signup');
    expect(endpoints.logout).toBe('/api/auth/logout');
    expect(endpoints.currentUser).toBe('/api/v1/users/me');
    expect(endpoints.visitorHome).toBe('/api/visitor/home');
  });

  it('unwraps ErrorResponse.message from Axios errors', () => {
    const error = new axios.AxiosError('Request failed');
    error.response = {
      data: { message: 'Invalid credentials', errors: { email: ['Unknown account'] } },
      status: 401,
      statusText: 'Unauthorized',
      headers: {},
      config: { headers: new axios.AxiosHeaders() },
    };
    const parsed = getApiError(error);
    expect(parsed.message).toBe('Invalid credentials');
    expect(parsed.errors.email).toEqual(['Unknown account']);
  });

  it('fetchData returns the GET response body', async () => {
    const spy = vi.spyOn(apiClient, 'get').mockResolvedValue({ data: { ping: true } });
    const result = await fetchData<{ ping: boolean }>('/health');
    expect(result).toEqual({ ping: true });
    expect(spy).toHaveBeenCalledWith('/health');
  });
});
