import { useMemo, useState } from 'react';
import ContentGeneratedDetails from '../components/ContentGeneratedDetails';
import ContentHistoryGrid from '../components/ContentHistoryGrid';
import ProfileLayout from '../components/ProfileLayout';
import { useProfileContent } from '../hooks/useProfileContent';
import type { ProfileContentItem } from '../types/api';

export default function ProfileContentGeneratedRoute() {
  const {
    data,
    total,
    loading,
    error,
    refetch,
    createEntry,
    updateEntry,
    removeEntry,
    isSaving,
    isDeleting,
    mutationError,
    mutationCause,
  } = useProfileContent();
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [isCreating, setIsCreating] = useState(false);

  const selectedItem = useMemo(
    () => data.find((item) => item.id === selectedId) ?? null,
    [data, selectedId],
  );

  const closeDetails = () => {
    setSelectedId(null);
    setIsCreating(false);
  };

  const alertMessage = error ?? (isCreating || selectedItem ? null : mutationError);

  return (
    <ProfileLayout creditLoading={loading}>
      {alertMessage ? (
        <div
          role="alert"
          className="mb-6 rounded-[12px] border border-[#ff5630]/40 bg-[#ff5630]/10 px-4 py-3 text-[14px] text-[#fdfdfd]"
        >
          <p>{alertMessage}</p>
          {error ? (
            <button
              type="button"
              onClick={() => void refetch()}
              className="focus-ring mt-2 rounded-sm text-[14px] text-primary underline-offset-2 hover:underline"
            >
              Try again
            </button>
          ) : null}
        </div>
      ) : null}

      <ContentHistoryGrid
        items={error ? [] : data}
        total={error ? 0 : total}
        loading={loading}
        suppressEmpty={Boolean(error)}
        onView={(item: ProfileContentItem) => {
          setIsCreating(false);
          setSelectedId(item.id);
        }}
        onCreate={() => {
          setSelectedId(null);
          setIsCreating(true);
        }}
      />

      {isCreating || selectedItem ? (
        <ContentGeneratedDetails
          item={selectedItem}
          creating={isCreating}
          error={mutationError}
          mutationError={mutationCause}
          isBusy={isSaving || isDeleting}
          isDeleting={isDeleting}
          isSaving={isSaving}
          onClose={closeDetails}
          onCreate={createEntry}
          onDelete={async () => {
            if (!selectedItem) {
              return false;
            }

            const removed = await removeEntry(selectedItem.id);
            if (removed) {
              closeDetails();
            }
            return removed;
          }}
          onSave={updateEntry}
        />
      ) : null}
    </ProfileLayout>
  );
}
