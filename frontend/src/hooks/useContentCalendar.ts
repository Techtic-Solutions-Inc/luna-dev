import {
  useMutation,
  useQuery,
  useQueryClient,
  type UseQueryResult,
} from '@tanstack/react-query';
import {
  createContentEntry,
  deleteContentEntry,
  getContentCalendar,
  getContentCalendarErrorMessage,
  updateContentEntry,
} from '../lib/api/contentCalendar';
import type {
  ContentCalendarItem,
  ContentCalendarPayload,
} from '../types/api';

export const contentCalendarQueryKey = ['content-calendar'] as const;

export interface UseContentCalendarResult {
  data: ContentCalendarItem[];
  loading: boolean;
  error: string | null;
  query: UseQueryResult<ContentCalendarItem[], Error>;
  createEntry: (
    body: ContentCalendarPayload,
  ) => Promise<ContentCalendarItem | null>;
  updateEntry: (
    id: string,
    body: ContentCalendarPayload,
  ) => Promise<ContentCalendarItem | null>;
  removeEntry: (id: string) => Promise<boolean>;
  isSaving: boolean;
  isDeleting: boolean;
  mutationError: string | null;
  refetch: () => Promise<void>;
}

export function useContentCalendar(): UseContentCalendarResult {
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: contentCalendarQueryKey,
    queryFn: getContentCalendar,
  });

  const invalidateCalendar = async () => {
    await queryClient.invalidateQueries({ queryKey: contentCalendarQueryKey });
  };

  const createMutation = useMutation({
    mutationFn: (body: ContentCalendarPayload) => createContentEntry(body),
    onSuccess: async () => {
      await invalidateCalendar();
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({
      id,
      body,
    }: {
      id: string;
      body: ContentCalendarPayload;
    }) => updateContentEntry(id, body),
    onSuccess: async () => {
      await invalidateCalendar();
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => deleteContentEntry(id),
    onSuccess: async () => {
      await invalidateCalendar();
    },
  });

  const rawMutationError =
    createMutation.error ?? updateMutation.error ?? deleteMutation.error;

  return {
    data: query.data ?? [],
    loading: query.isPending,
    error: query.error ? getContentCalendarErrorMessage(query.error) : null,
    query,
    createEntry: async (body) => {
      try {
        return await createMutation.mutateAsync(body);
      } catch {
        return null;
      }
    },
    updateEntry: async (id, body) => {
      try {
        return await updateMutation.mutateAsync({ id, body });
      } catch {
        return null;
      }
    },
    removeEntry: async (id) => {
      try {
        await deleteMutation.mutateAsync(id);
        return true;
      } catch {
        return false;
      }
    },
    isSaving: createMutation.isPending || updateMutation.isPending,
    isDeleting: deleteMutation.isPending,
    mutationError: rawMutationError
      ? getContentCalendarErrorMessage(rawMutationError)
      : null,
    refetch: async () => {
      await query.refetch();
    },
  };
}
