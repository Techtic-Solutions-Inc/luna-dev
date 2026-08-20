import type {
  ApiErrorEnvelope,
  HomeSearchResponse,
  HomeSubscribeRequest,
  HomeSubscribeResponse,
  HomeTermsAcceptanceRequest,
  HomeTermsAcceptanceResponse,
} from '../../types/visitorHome';
import apiClient from './client';
import { isAxiosError } from 'axios';

export const searchHomeContent = async (query?: string): Promise<HomeSearchResponse> => {
  const response = await apiClient.get<HomeSearchResponse>('/api/visitor/home/search', {
    params: query ? { query } : undefined,
  });
  return response.data;
};

export const subscribeToHome = async (
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

export const parseApiError = (error: unknown): string => {
  if (isAxiosError<ApiErrorEnvelope>(error)) {
    const envelope = error.response?.data;
    if (envelope?.message) {
      return envelope.message;
    }
    if (envelope?.errors) {
      const firstError = Object.values(envelope.errors)[0]?.[0];
      if (firstError) {
        return firstError;
      }
    }
  }
  if (error instanceof Error) {
    return error.message;
  }
  return 'Something went wrong. Please try again.';
};
