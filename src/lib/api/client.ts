import axios, { AxiosError, type AxiosInstance, type InternalAxiosRequestConfig } from 'axios';

import { clearStoredToken, getStoredToken } from '@/lib/auth/token';
import type {
  AnnouncementListResponse,
  ApiErrorResponse,
  CreateAnnouncementRequest,
  CreateAnnouncementResponse,
  DashboardAnalyticsResponse,
  LoginRequest,
  LoginResponse,
} from '@/types/api';

const DEFAULT_TIMEOUT_MS = 20_000;

const resolveBaseUrl = (): string => {
  const { VITE_API_BASE_URL, VITE_API_URL } = import.meta.env;
  return VITE_API_BASE_URL ?? VITE_API_URL ?? '';
};

/**
 * Shared axios instance. The base URL comes from the environment so the same
 * build can point at local, staging or production APIs.
 */
export const apiClient: AxiosInstance = axios.create({
  baseURL: resolveBaseUrl(),
  timeout: DEFAULT_TIMEOUT_MS,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

/** Every rejected request surfaces as this shape, whatever went wrong. */
export class ApiError extends Error {
  readonly status: number | undefined;
  readonly fieldErrors: Record<string, string[]>;

  constructor(message: string, status?: number, fieldErrors: Record<string, string[]> = {}) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.fieldErrors = fieldErrors;
  }
}

const FALLBACK_ERROR_MESSAGE = 'Something went wrong. Please try again.';
const NETWORK_ERROR_MESSAGE = 'We could not reach the server. Check your connection and retry.';

const normalizeFieldErrors = (
  errors: Record<string, string | string[]> | undefined,
): Record<string, string[]> => {
  if (errors === undefined) {
    return {};
  }

  return Object.fromEntries(
    Object.entries(errors).map(([field, value]) => [field, Array.isArray(value) ? value : [value]]),
  );
};

/** Normalises anything thrown by axios into an `ApiError` the UI can render. */
export const toApiError = (error: unknown): ApiError => {
  if (error instanceof ApiError) {
    return error;
  }

  if (error instanceof AxiosError) {
    const response: { status: number; data?: ApiErrorResponse } | undefined = error.response;

    if (response === undefined) {
      return new ApiError(NETWORK_ERROR_MESSAGE);
    }

    return new ApiError(
      response.data?.message ?? error.message,
      response.status,
      normalizeFieldErrors(response.data?.errors),
    );
  }

  return new ApiError(error instanceof Error ? error.message : FALLBACK_ERROR_MESSAGE);
};

apiClient.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const token = getStoredToken();

  if (token !== null) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

apiClient.interceptors.response.use(
  (response) => response,
  (error: unknown) => {
    const apiError = toApiError(error);

    if (apiError.status === 401) {
      clearStoredToken();
    }

    return Promise.reject(apiError);
  },
);

export async function login(payload: LoginRequest): Promise<LoginResponse> {
  const response = await apiClient.post<LoginResponse>('/auth/login', payload);
  return response.data;
}

export async function fetchAnnouncements(): Promise<AnnouncementListResponse> {
  const response = await apiClient.get<AnnouncementListResponse>('/api/dashboard/announcements');
  return response.data;
}

export async function createAnnouncement(
  payload: CreateAnnouncementRequest,
): Promise<CreateAnnouncementResponse> {
  const response = await apiClient.post<CreateAnnouncementResponse>(
    '/api/dashboard/announcements',
    payload,
  );
  return response.data;
}

export async function fetchDashboardAnalytics(): Promise<DashboardAnalyticsResponse> {
  const response = await apiClient.get<DashboardAnalyticsResponse>('/api/dashboard/analytics');
  return response.data;
}

export default apiClient;
