import type { AboutResponse } from '../../types/api';

export interface PendingBackendEndpoint {
  method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
  path: string;
  purpose: string;
  authRequired: boolean;
  responseShape: string;
  jiraKey: string;
}

export const PENDING_BACKEND_ENDPOINTS = {
  about: {
    method: 'GET',
    path: '/api/about',
    purpose:
      'Retrieve content for the About Us page, including team members and marketing information.',
    authRequired: false,
    responseShape: 'AboutResponse',
    statusCodes: [200],
    jiraKey: 'JAW-8919',
  },
} satisfies Record<
  string,
  PendingBackendEndpoint & { statusCodes: number[] }
>;

export type PendingAboutResponse = AboutResponse;

export const getAboutContractGapMessage = (): string => {
  const endpoint = PENDING_BACKEND_ENDPOINTS.about;
  return `${endpoint.method} ${endpoint.path} is not yet available in the API contract. Backend implementation is required before About Us content can load.`;
};
