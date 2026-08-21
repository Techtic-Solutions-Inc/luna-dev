import { useQuery } from '@tanstack/react-query';
import { fetchContentCalendar } from '../lib/api/contentCalendar';
import type { ContentLibraryItem } from '../types/api';

const STATIC_LIBRARY_ITEMS: ContentLibraryItem[] = [
  {
    id: 'static-1',
    title: 'Modern Luxury Listing',
    description: 'Editorial layout for high-end residential properties.',
    imageUrl:
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=400&h=560&fit=crop',
  },
  {
    id: 'static-2',
    title: 'Morning Coffee & Home',
    description: 'Lifestyle content that connects with buyers emotionally.',
    imageUrl:
      'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400&h=560&fit=crop',
  },
  {
    id: 'static-3',
    title: 'Architectural Showcase',
    description: 'Bold angles and clean lines for modern listings.',
    imageUrl:
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=400&h=560&fit=crop',
  },
  {
    id: 'static-4',
    title: 'Urban Skyline Views',
    description: 'City living content for downtown agents.',
    imageUrl:
      'https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=400&h=560&fit=crop',
  },
  {
    id: 'static-5',
    title: 'Cozy Interior Staging',
    description: 'Warm, inviting spaces that sell the lifestyle.',
    imageUrl:
      'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=400&h=560&fit=crop',
  },
];

const mapCalendarToLibrary = (
  items: Awaited<ReturnType<typeof fetchContentCalendar>>['data']['items'],
): ContentLibraryItem[] =>
  items
    .filter((item) => item.is_active)
    .map((item) => ({
      id: item.id,
      title: item.title,
      description: item.description || item.content,
      imageUrl:
        item.link ??
        'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=400&h=560&fit=crop',
      date: item.date,
    }));

const hasAuthToken = (): boolean => Boolean(localStorage.getItem('token'));

export const useContentLibrary = () => {
  const isAuthenticated = hasAuthToken();

  return useQuery({
    queryKey: ['content', 'library'],
    queryFn: async (): Promise<ContentLibraryItem[]> => {
      if (!isAuthenticated) {
        return STATIC_LIBRARY_ITEMS;
      }
      const response = await fetchContentCalendar();
      return mapCalendarToLibrary(response.data.items);
    },
    enabled: true,
    staleTime: 5 * 60 * 1000,
    retry: isAuthenticated ? 2 : 0,
  });
};

export default useContentLibrary;
