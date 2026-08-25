import { apiClient } from '@/lib/api/client';
import type { HomeContent } from '@/types/home';

function isHomeContent(value: unknown): value is HomeContent {
  if (!value || typeof value !== 'object') return false;
  const record = value as Record<string, unknown>;
  return Array.isArray(record.headings) || Array.isArray(record.links) || Array.isArray(record.marketing);
}

function normalize(payload: HomeContent): HomeContent {
  return {
    headings: payload.headings ?? [],
    links: payload.links ?? [],
    marketing: payload.marketing ?? [],
    images: payload.images ?? [],
  };
}

function unwrapPayload(payload: unknown): unknown {
  if (!payload || typeof payload !== 'object') return payload;
  const record = payload as Record<string, unknown>;
  if (isHomeContent(record.data)) return record.data;
  return payload;
}

export async function getHomeContent(): Promise<HomeContent> {
  const response = await apiClient.get<unknown>('/api/visitor/home', {
    baseURL: '',
  });
  const payload = unwrapPayload(response.data);
  if (!isHomeContent(payload)) {
    throw new Error('Home content was empty or malformed');
  }
  return normalize(payload);
}
