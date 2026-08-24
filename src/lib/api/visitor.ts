import type { HomeContent } from '../../types/home';

/**
 * GET /api/visitor/home
 *
 * Expected contract (pending backend implementation):
 * {
 *   headings: string[];
 *   links: { label: string; href: string }[];
 *   marketing: { title: string; description: string; image?: string }[];
 * }
 *
 * Until the backend endpoint ships, the same payload is served from
 * public/api/visitor/home and the Vite dev/preview middleware.
 */
export const VISITOR_HOME_PATH = '/api/visitor/home';

export async function fetchVisitorHome(signal?: AbortSignal): Promise<HomeContent> {
  const response = await fetch(VISITOR_HOME_PATH, {
    method: 'GET',
    signal,
    headers: { Accept: 'application/json' },
  });

  if (!response.ok) {
    throw new Error('Request failed');
  }

  const contentType = response.headers.get('content-type') ?? '';
  if (!contentType.includes('application/json')) {
    throw new Error('Unexpected response format');
  }

  const json: unknown = await response.json();

  if (
    typeof json === 'object' &&
    json !== null &&
    'data' in json &&
    typeof (json as { data: unknown }).data === 'object'
  ) {
    return (json as { data: HomeContent }).data;
  }

  return json as HomeContent;
}
