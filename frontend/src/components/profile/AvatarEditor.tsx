import { PencilIcon } from '@/components/icons';
import { getInitials } from '@/utils/calendar';

interface AvatarEditorProps {
  avatarUrl?: string;
  name: string;
  loading?: boolean;
}

export function AvatarEditor({
  avatarUrl,
  name,
  loading = false,
}: AvatarEditorProps) {
  if (loading) {
    return <div className="h-20 w-20 animate-pulse rounded-full bg-white/10" />;
  }

  return (
    <div className="relative">
      <div className="flex h-20 w-20 items-center justify-center overflow-hidden rounded-full bg-[#DAB89A] text-[18px] font-semibold text-[#201816] sm:h-24 sm:w-24">
        {avatarUrl ? (
          <img src={avatarUrl} alt={name} className="h-full w-full object-cover" />
        ) : (
          getInitials(name)
        )}
      </div>
      <button
        type="button"
        disabled
        title="Avatar upload is not available yet"
        aria-label="Edit avatar (unavailable)"
        className="focus-ring absolute -bottom-1 -right-1 flex h-8 w-8 items-center justify-center rounded-full bg-primary text-white opacity-70"
      >
        <PencilIcon className="h-3.5 w-3.5" />
      </button>
    </div>
  );
}
