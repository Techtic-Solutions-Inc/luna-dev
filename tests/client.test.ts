import { AxiosError, AxiosHeaders } from 'axios';
import type { AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import { describe, expect, it } from 'vitest';
import { getErrorDetail } from '../src/lib/api/client';

describe('getErrorDetail', () => {
  it('reads the API error envelope', () => {
    const config: InternalAxiosRequestConfig = { headers: new AxiosHeaders() };
    const response: AxiosResponse<{ detail: string }> = {
      data: { detail: 'Invalid credentials' },
      status: 401,
      statusText: 'Unauthorized',
      headers: {},
      config,
    };
    const error = new AxiosError('Request failed', 'ERR_BAD_REQUEST', config, undefined, response);

    expect(getErrorDetail(error)).toBe('Invalid credentials');
  });

  it('falls back to Error.message', () => {
    expect(getErrorDetail(new Error('Network down'))).toBe('Network down');
  });

  it('uses the provided fallback', () => {
    expect(getErrorDetail(null, 'Unavailable')).toBe('Unavailable');
  });
});
