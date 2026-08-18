import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useContentCalendar } from '../hooks/useContentCalendar';
import { mapItemsToScheduledPosts } from '../lib/contentCalendarDisplay';
import type { ContentCalendarItem } from '../types/api';
import ContentList from './ContentList';

export default function ContentCalendarSection() {
  const navigate = useNavigate();
  const { data, loading } = useContentCalendar();
  const posts = useMemo(
    () => mapItemsToScheduledPosts(data).slice(0, 5),
    [data],
  );

  const onOpenItem = (item: ContentCalendarItem) => {
    navigate(`/content-calendar/details?id=${encodeURIComponent(item.id)}`);
  };

  return (
    <section aria-labelledby="dashboard-calendar-heading">
      <div className="mb-4 flex items-end justify-between gap-4">
        <div>
          <h2
            id="dashboard-calendar-heading"
            className="font-display text-[24px] leading-none text-[#F8F2EB] sm:text-[28px]"
          >
            Your Content Calendar
          </h2>
          <p className="mt-2 text-[14px] text-[#9A8F84]">
            A gentle rhythm to keep your brand consistent.
          </p>
        </div>
        <button
          type="button"
          onClick={() => navigate('/content-calendar')}
          className="focus-ring shrink-0 rounded-sm text-[13px] text-[#F8F2EB] transition-colors duration-200 hover:text-primary"
          aria-label="Browse all content calendar posts"
        >
          Browse all
        </button>
      </div>

      <ContentList
        items={posts}
        variant="week"
        dateStyle="weekday"
        loading={loading}
        emptyMessage="No scheduled posts yet."
        onItemClick={onOpenItem}
      />
    </section>
  );
}
