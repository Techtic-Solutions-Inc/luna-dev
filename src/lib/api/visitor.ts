import { apiClient } from '@/lib/api/client';
import type {
  HomeSearchResponse,
  SubscribeRequest,
  SubscribeResponse,
  TermsAcceptanceRequest,
  TermsAcceptanceResponse,
} from '@/types/visitor';

export async function searchHomeContent(query?: string): Promise<HomeSearchResponse> {
  const response = await apiClient.get<HomeSearchResponse>('/api/visitor/home/search', {
    params: query !== undefined && query.length > 0 ? { query } : undefined,
  });
  return response.data;
}

export async function subscribeToWaitlist(payload: SubscribeRequest): Promise<SubscribeResponse> {
  const response = await apiClient.post<SubscribeResponse>('/api/visitor/home/subscribe', payload);
  return response.data;
}

export async function acceptTerms(
  payload: TermsAcceptanceRequest,
): Promise<TermsAcceptanceResponse> {
  const response = await apiClient.post<TermsAcceptanceResponse>(
    '/api/visitor/home/terms-acceptance',
    payload,
  );
  return response.data;
}
