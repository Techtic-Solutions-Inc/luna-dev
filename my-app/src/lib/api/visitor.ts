import apiClient from './client';
import type {
  AcceptTermsRequest,
  AcceptTermsResponse,
  SearchResponse,
  SubmitEmailRequest,
  SubmitEmailResponse,
} from '../../types/visitor';

export const submitEmail = async (payload: SubmitEmailRequest): Promise<SubmitEmailResponse> => {
  const response = await apiClient.post<SubmitEmailResponse>(
    '/api/visitor/home/submit-email',
    payload,
  );
  return response.data;
};

export const acceptTerms = async (payload: AcceptTermsRequest): Promise<AcceptTermsResponse> => {
  const response = await apiClient.post<AcceptTermsResponse>(
    '/api/visitor/home/accept-terms',
    payload,
  );
  return response.data;
};

export const searchContent = async (query: string): Promise<SearchResponse> => {
  const response = await apiClient.get<SearchResponse>('/api/visitor/home/search', {
    params: { q: query },
  });
  return response.data;
};
