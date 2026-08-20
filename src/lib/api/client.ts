import axios, { AxiosHeaders, isAxiosError } from 'axios';
import type {
  ApiErrorResponse,
  ContentCalendarResponse,
  DashboardOverview,
  HomeSearchResponse,
  HomeSubscribeRequest,
  HomeSubscribeResponse,
  HomeTermsAcceptanceRequest,
  HomeTermsAcceptanceResponse,
} from '../../types/api';
import type { LoginRequest, LoginResponse, LoginResponseData } from '../../types/auth';
import { formatBearerToken, getToken } from '../session';

function resolveApiBaseUrl(): string {
  const configured =
    import.meta.env.VITE_API_URL?.trim() || import.meta.env.VITE_API_BASE_URL?.trim() || '';
  return configured.replace(/\/$/, '');
}

const apiClient = axios.create({
  baseURL: resolveApiBaseUrl(),
});

function applyAuthHeader(config: { headers: unknown }): void {
  const authorization = formatBearerToken(getToken());
  if (!authorization) return;

  if (config.headers instanceof AxiosHeaders) {
    config.headers.set('Authorization', authorization);
    return;
  }

  config.headers = {
    ...(config.headers as Record<string, string> | undefined),
    Authorization: authorization,
  };
}

apiClient.interceptors.request.use((config) => {
  applyAuthHeader(config);
  return config;
});

export function getApiErrorMessage(error: unknown): string {
  if (isAxiosError<ApiErrorResponse>(error)) {
    const payload = error.response?.data;
    if (payload?.message) {
      return payload.message;
    }
  }
  if (error instanceof Error && error.message) {
    return error.message;
  }
  return 'Something went wrong. Please try again.';
}

function extractLoginData(payload: LoginResponse): LoginResponseData {
  if (payload.data && typeof payload.data === 'object') {
    return payload.data;
  }
  return payload as unknown as LoginResponseData;
}

export function extractAccessToken(payload: LoginResponse): string {
  const data = extractLoginData(payload);
  const token = data.token || data.accessToken;
  if (!token?.trim()) {
    throw new Error('No access token returned.');
  }
  return token.trim();
}

export const login = async (payload: LoginRequest): Promise<LoginResponse> => {
  const response = await apiClient.post<LoginResponse>('/auth/login', payload);
  return response.data;
};

export const fetchDashboard = async (): Promise<DashboardOverview> => {
  const response = await apiClient.get<DashboardOverview>('/dashboard');
  return response.data;
};

export const fetchContentCalendar = async (): Promise<ContentCalendarResponse> => {
  const response = await apiClient.get<ContentCalendarResponse>('/content-calendar');
  return response.data;
};

export const searchHomeContent = async (q?: string): Promise<HomeSearchResponse> => {
  const response = await apiClient.get<HomeSearchResponse>('/api/visitor/home/search', {
    params: q ? { q } : undefined,
  });
  return response.data;
};

export const subscribeHome = async (
  payload: HomeSubscribeRequest,
): Promise<HomeSubscribeResponse> => {
  const response = await apiClient.post<HomeSubscribeResponse>(
    '/api/visitor/home/subscribe',
    payload,
  );
  return response.data;
};

export const acceptHomeTerms = async (
  payload: HomeTermsAcceptanceRequest,
): Promise<HomeTermsAcceptanceResponse> => {
  const response = await apiClient.post<HomeTermsAcceptanceResponse>(
    '/api/visitor/home/terms-acceptance',
    payload,
  );
  return response.data;
};

export default apiClient;
