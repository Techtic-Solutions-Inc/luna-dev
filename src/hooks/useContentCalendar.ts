import { useQuery } from '@tanstack/react-query';
import { fetchContentCalendar } from '../lib/api/contentCalendar';
import { isAuthenticated } from './useAuth';
import type { GalleryImage } from '../types/contentCalendar';

export const CONTENT_CALENDAR_QUERY_KEY = ['content-calendar'] as const;

export const FALLBACK_GALLERY: GalleryImage[] = [
  {
    id: 'static-1',
    title: 'Exclusive Listing',
    description: 'Editorial layout for high-end residential properties.',
    imageUrl: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=400&h=560&fit=crop',
  },
  {
    id: 'static-2',
    title: 'Morning routine',
    description: 'Lifestyle content that connects with buyers emotionally.',
    imageUrl: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400&h=560&fit=crop',
  },
  {
    id: 'static-3',
    title: 'Outdoor Living',
    description: 'Bold angles and clean lines for modern listings.',
    imageUrl: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=400&h=560&fit=crop',
  },
  {
    id: 'static-4',
    title: 'Local Vibe',
    description: 'City living content for downtown agents.',
    imageUrl: 'https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=400&h=560&fit=crop',
  },
  {
    id: 'static-5',
    title: 'Productivity',
    description: 'Warm, inviting spaces that sell the lifestyle.',
    imageUrl: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=400&h=560&fit=crop',
  },
  {
    id: 'static-6',
    title: "What's New",
    description: 'Fresh templates added every week.',
    imageUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=400&h=560&fit=crop',
  },
];

function mapItems(
  items: Array<{
    id: string;
    title: string;
    description: string;
    content: string;
    link: string | null;
    date: string;
    is_active: boolean;
  }>,
): GalleryImage[] {
  return items
    .filter((item) => item.is_active)
    .map((item) => ({
      id: item.id,
      title: item.title,
      description: item.description || item.content,
      imageUrl: item.link ?? FALLBACK_GALLERY[0].imageUrl,
      date: item.date,
    }));
}

export function useContentCalendar() {
  const authenticated = isAuthenticated();

  const query = useQuery({
    queryKey: CONTENT_CALENDAR_QUERY_KEY,
    queryFn: async () => {
      const response = await fetchContentCalendar();
      return mapItems(response.data.items);
    },
    enabled: authenticated,
    staleTime: 300_000,
    retry: 2,
  });

  const items = authenticated ? (query.data ?? []) : FALLBACK_GALLERY;

  return {
    ...query,
    items,
    isLoading: authenticated && query.isLoading,
    isError: authenticated && query.isError,
    isEmpty: authenticated && query.isSuccess && (query.data?.length ?? 0) === 0,
    refetch: query.refetch,
  };
}
