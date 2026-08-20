import apiClient from './client';
import type {
  VisitorSearchResponse,
  VisitorSubscribePayload,
  VisitorSubscribeResponse,
  VisitorTermsPayload,
  VisitorTermsResponse,
} from '../../types/visitor';

export const searchVisitorContent = async (
  query: string,
): Promise<VisitorSearchResponse['data']> => {
  const response = await apiClient.get<VisitorSearchResponse>('/api/visitor/home/search', {
    params: { q: query },
  });
  return response.data.data;
};

export const subscribeVisitor = async (
  payload: VisitorSubscribePayload,
): Promise<VisitorSubscribeResponse> => {
  const response = await apiClient.post<VisitorSubscribeResponse>(
    '/api/visitor/home/subscribe',
    payload,
  );
  return response.data;
};

export const acceptVisitorTerms = async (
  payload: VisitorTermsPayload,
): Promise<VisitorTermsResponse> => {
  const response = await apiClient.post<VisitorTermsResponse>(
    '/api/visitor/home/terms-acceptance',
    payload,
  );
  return response.data;
};
