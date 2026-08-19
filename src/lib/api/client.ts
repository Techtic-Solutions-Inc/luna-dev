import axios, { type InternalAxiosRequestConfig } from 'axios';

import { getToken, setToken } from '@/lib/auth/storage';
import type {
  ForgotPasswordRequest,
  ForgotPasswordResponse,
  HomeSearchResponse,
  HomeSubscribeRequest,
  HomeSubscribeResponse,
  LoginRequest,
  LoginResponse,
  SignUpRequest,
  SignUpResponse,
  TermsAcceptanceRequest,
  TermsAcceptanceResponse,
  VerifyEmailRequest,
  VerifyEmailResponse,
} from '@/types/api';

function getApiBaseUrl(): string {
  return (
    process.env.API_BASE_URL ||
    import.meta.env.VITE_API_BASE_URL ||
    import.meta.env.VITE_API_URL ||
    ''
  );
}

function getEnvAuthToken(): string {
  return process.env.API_TOKEN || import.meta.env.VITE_API_TOKEN || '';
}

function extractAccessToken(payload: unknown, depth = 0): string | null {
  if (depth > 4 || typeof payload !== 'object' || payload === null) {
    return null;
  }

  const record = payload as Record<string, unknown>;
  const candidates = [record.token, record.accessToken, record.access_token, record.jwt];

  for (const candidate of candidates) {
    if (typeof candidate === 'string' && candidate.trim()) {
      return candidate.trim();
    }
  }

  if ('data' in record) {
    return extractAccessToken(record.data, depth + 1);
  }

  return null;
}

function resolveAuthToken(): string {
  return getToken() || getEnvAuthToken();
}

function applyAuthorizationHeader(config: InternalAxiosRequestConfig): InternalAxiosRequestConfig {
  const token = resolveAuthToken();
  const headerValue = `Bearer ${token || 'token'}`;

  if (!config.headers) {
    config.headers = {} as InternalAxiosRequestConfig['headers'];
  }

  if (typeof config.headers.set === 'function') {
    config.headers.set('Authorization', headerValue);
  } else {
    config.headers.Authorization = headerValue;
  }

  return config;
}

const apiClient = axios.create({
  baseURL: getApiBaseUrl(),
  headers: {
    Authorization: `Bearer ${resolveAuthToken() || 'token'}`,
  },
});

apiClient.interceptors.request.use((config) => applyAuthorizationHeader(config));

function persistAccessToken(payload: unknown): void {
  const accessToken = extractAccessToken(payload);
  if (accessToken) {
    setToken(accessToken);
    apiClient.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
  }
}

export async function login(payload: LoginRequest): Promise<LoginResponse> {
  const response = await apiClient.post<LoginResponse>('/auth/login', payload);
  persistAccessToken(response.data);
  return response.data;
}

export async function requestPasswordReset(
  payload: ForgotPasswordRequest,
): Promise<ForgotPasswordResponse> {
  const response = await apiClient.post<ForgotPasswordResponse>(
    '/api/auth/forgot-password',
    payload,
  );
  return response.data;
}

export async function signUp(payload: SignUpRequest): Promise<SignUpResponse> {
  const response = await apiClient.post<SignUpResponse>('/api/auth/signup', payload);
  persistAccessToken(response.data);
  return response.data;
}

export async function verifyEmail(payload: VerifyEmailRequest): Promise<VerifyEmailResponse> {
  const response = await apiClient.post<VerifyEmailResponse>('/api/email/verify', payload);
  return response.data;
}

export async function searchHomeContent(): Promise<HomeSearchResponse> {
  const response = await apiClient.get<HomeSearchResponse>('/api/visitor/home/search');
  return response.data;
}

export async function subscribeHome(payload: HomeSubscribeRequest): Promise<HomeSubscribeResponse> {
  const response = await apiClient.post<HomeSubscribeResponse>(
    '/api/visitor/home/subscribe',
    payload,
  );
  return response.data;
}

export async function acceptHomeTerms(
  payload: TermsAcceptanceRequest,
): Promise<TermsAcceptanceResponse> {
  const response = await apiClient.post<TermsAcceptanceResponse>(
    '/api/visitor/home/terms-acceptance',
    payload,
  );
  return response.data;
}

export default apiClient;
