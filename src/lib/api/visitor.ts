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

export async function getHomeContent(): Promise<HomeContent> {
  const response = await apiClient.get<unknown>('/api/visitor/home', { baseURL: '' });
  if (!isHomeContent(response.data)) {
    throw new Error('Home content was empty or malformed');
  }
  return normalize(response.data);
}
