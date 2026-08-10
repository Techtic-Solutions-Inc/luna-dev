import { apiRequest } from './client';
import type {
  VisitorSubscribeRequest,
  VisitorSubscribeResponse,
} from '../types/api';

export async function visitorSubscribe(
  payload: VisitorSubscribeRequest,
): Promise<VisitorSubscribeResponse> {
  return apiRequest<VisitorSubscribeResponse>('/api/visitor/subscribe', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}
