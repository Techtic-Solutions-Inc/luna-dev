import { apiClient } from '@/lib/api/client';
import type { HomeContent } from '@/types/home';

/**
 * GET /api/visitor/home
 *
 * Visitor home screen content contract. Expected JSON shape:
 * {
 *   headings: string[];
 *   links: { label: string; href: string }[];
 *   marketing: { label: string; title: string; highlight: string; description: string; image: string }[];
 *   images: { src: string; alt: string; caption?: string }[];
 * }
 *
 * Served from the backend at `VITE_API_BASE_URL` when available. Until then,
 * the same payload is provided by `public/api/visitor/home` and the Vite
 * dev/preview middleware.
 */
export const VISITOR_HOME_PATH = '/api/visitor/home';

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
  const response = await apiClient.get<unknown>(VISITOR_HOME_PATH, {
    baseURL: '',
  });
  const payload = unwrapPayload(response.data);
  if (!isHomeContent(payload)) {
    throw new Error('Home content was empty or malformed');
  }
  return normalize(payload);
}
