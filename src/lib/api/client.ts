import axios, { isAxiosError } from 'axios';
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
import type { LoginRequest, LoginResponse } from '../../types/auth';
import { getToken } from '../session';

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

apiClient.interceptors.request.use((config) => {
  const token = getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
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
