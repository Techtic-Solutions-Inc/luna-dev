import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  createEntry,
  deleteEntry,
  getCalendarErrorMessage,
  listEntries,
  updateEntry,
} from '@/lib/api/content-calendar';
import type {
  CreateContentCalendarEntryRequest,
  UpdateContentCalendarEntryRequest,
} from '@/types/api';

export const CONTENT_CALENDAR_QUERY_KEY = ['content-calendar'] as const;

export function useContentCalendar() {
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: CONTENT_CALENDAR_QUERY_KEY,
    queryFn: listEntries,
  });

  const invalidate = async () => {
    await queryClient.invalidateQueries({ queryKey: CONTENT_CALENDAR_QUERY_KEY });
  };

  const createMutation = useMutation({
    mutationFn: (body: CreateContentCalendarEntryRequest) => createEntry(body),
    onSuccess: invalidate,
  });

  const updateMutation = useMutation({
    mutationFn: ({
      id,
      body,
    }: {
      id: string;
      body: UpdateContentCalendarEntryRequest;
    }) => updateEntry(id, body),
    onSuccess: invalidate,
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => deleteEntry(id),
    onSuccess: invalidate,
  });

  return {
    data: query.data ?? [],
    loading: query.isPending,
    error: query.error ? getCalendarErrorMessage(query.error) : null,
    refetch: query.refetch,
    createEntry: createMutation.mutateAsync,
    updateEntry: updateMutation.mutateAsync,
    removeEntry: deleteMutation.mutateAsync,
    isSaving: createMutation.isPending || updateMutation.isPending,
    isDeleting: deleteMutation.isPending,
    mutationError:
      createMutation.error ??
      updateMutation.error ??
      deleteMutation.error
        ? getCalendarErrorMessage(
            createMutation.error ??
              updateMutation.error ??
              deleteMutation.error,
          )
        : null,
  };
}
