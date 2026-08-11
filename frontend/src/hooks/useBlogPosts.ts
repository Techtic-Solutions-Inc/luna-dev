import { useCallback, useEffect, useState } from 'react';
import { getBlogPosts } from '../lib/api/client';
import { getApiErrorMessage } from '../lib/api/errors';
import type { BlogPost } from '../types/api';

const PAGE_SIZE = 4;

interface UseBlogPostsResult {
  posts: BlogPost[];
  visiblePosts: BlogPost[];
  isLoading: boolean;
  error: string | null;
  isEmpty: boolean;
  hasMore: boolean;
  refetch: () => Promise<void>;
  loadMore: () => void;
}

export const useBlogPosts = (): UseBlogPostsResult => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refetch = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    setVisibleCount(PAGE_SIZE);
    try {
      const data = await getBlogPosts();
      setPosts(data);
    } catch (err) {
      setError(getApiErrorMessage(err, 'Failed to load blog posts'));
      setPosts([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    void refetch();
  }, [refetch]);

  const loadMore = useCallback(() => {
    setVisibleCount((current) => Math.min(current + PAGE_SIZE, posts.length));
  }, [posts.length]);

  const visiblePosts = posts.slice(0, visibleCount);
  const isEmpty = !isLoading && !error && posts.length === 0;
  const hasMore = !isLoading && !error && visibleCount < posts.length;

  return {
    posts,
    visiblePosts,
    isLoading,
    error,
    isEmpty,
    hasMore,
    refetch,
    loadMore,
  };
};
