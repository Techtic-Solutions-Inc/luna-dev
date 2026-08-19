import { Link } from 'react-router-dom';
import { FacebookIcon, InstagramIcon, ImagePlaceholderIcon } from '@/components/icons';
import type { ScheduledPostView } from '@/types/api';
import { getImageUrl } from '@/utils/calendar';

interface ScheduledPostCardProps {
  post: ScheduledPostView;
}

export function ScheduledPostCard({ post }: ScheduledPostCardProps) {
  const { item, platform, postType, timeLabel } = post;
  const thumbnail = getImageUrl(item.link);
  const PlatformIcon = platform === 'instagram' ? InstagramIcon : FacebookIcon;

  return (
    <Link
      to={`/content-calendar/details/${item.id}`}
      className="focus-ring block min-w-[140px] flex-1 rounded-[16px] border border-[#E5DACE] bg-white p-2 shadow-[0_8px_24px_rgba(74,53,35,0.06)] transition-colors hover:bg-[#FFF9F2]"
    >
      <div className="flex items-center gap-1.5">
        <PlatformIcon className="h-3.5 w-3.5 shrink-0 text-[#76675B]" />
        <span className="truncate text-[11px] font-medium text-[#76675B]">{postType}</span>
        <span className="ml-auto shrink-0 text-[10px] text-[#858585]">{timeLabel}</span>
      </div>
      <div className="mt-2 flex items-center gap-2">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-[8px] bg-[#EFE4D9]">
          {thumbnail ? (
            <img src={thumbnail} alt="" className="h-full w-full object-cover" />
          ) : (
            <ImagePlaceholderIcon className="h-5 w-5 text-[#A88B6C]" />
          )}
        </div>
        <p className="line-clamp-2 text-[12px] font-medium leading-4 text-[#322722]">
          {item.title}
        </p>
      </div>
    </Link>
  );
}
