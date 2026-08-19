import { useMemo } from 'react';
import type { ContentCalendarEntry } from '@/types/api';
import {
  buildWeekDays,
  CARD_HEIGHT,
  DEFAULT_END_HOUR,
  DEFAULT_START_HOUR,
  formatHourLabel,
  getHourOffsetPx,
  getHourSlots,
  positionPostsInColumn,
  ROW_HEIGHT,
  startOfWeek,
  toScheduledPosts,
} from '@/utils/calendar';
import { CalendarWeekNavigator } from '@/components/content-calendar/CalendarWeekNavigator';
import { CalendarEmptyState } from '@/components/content-calendar/CalendarEmptyState';
import { ScheduledPostCard } from '@/components/content-calendar/ScheduledPostCard';

interface WeeklyCalendarGridProps {
  entries: ContentCalendarEntry[];
  anchorDate: Date;
  onAnchorDateChange: (date: Date) => void;
}

const dayLabels = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'];

export function WeeklyCalendarGrid({
  entries,
  anchorDate,
  onAnchorDateChange,
}: WeeklyCalendarGridProps) {
  const weekStart = useMemo(() => startOfWeek(anchorDate), [anchorDate]);
  const weekDays = useMemo(() => buildWeekDays(weekStart), [weekStart]);
  const scheduledPosts = useMemo(() => toScheduledPosts(entries), [entries]);

  const hourRange = useMemo(() => {
    if (scheduledPosts.length === 0) {
      return { startHour: DEFAULT_START_HOUR, endHour: DEFAULT_END_HOUR };
    }

    const hours = scheduledPosts.map(
      (post) => post.scheduledAt.getHours() + post.scheduledAt.getMinutes() / 60,
    );
    return {
      startHour: Math.min(DEFAULT_START_HOUR, ...hours),
      endHour: Math.max(DEFAULT_END_HOUR, ...hours),
    };
  }, [scheduledPosts]);

  const hourSlots = useMemo(
    () => getHourSlots(hourRange.startHour, hourRange.endHour),
    [hourRange.endHour, hourRange.startHour],
  );

  const gridHeight = Math.max(
    (hourRange.endHour - hourRange.startHour) * ROW_HEIGHT + CARD_HEIGHT,
    hourSlots.length > 0
      ? getHourOffsetPx(hourSlots[hourSlots.length - 1]!, hourRange.startHour) +
          ROW_HEIGHT
      : 0,
  );

  const handlePreviousWeek = () => {
    const next = new Date(weekStart);
    next.setDate(next.getDate() - 7);
    onAnchorDateChange(next);
  };

  const handleNextWeek = () => {
    const next = new Date(weekStart);
    next.setDate(next.getDate() + 7);
    onAnchorDateChange(next);
  };

  if (entries.length === 0) {
    return (
      <div className="rounded-[16px] bg-[#FFF7ED] p-5 md:rounded-[20px] md:p-6">
        <CalendarWeekNavigator
          anchorDate={weekDays[3] ?? anchorDate}
          onPrevious={handlePreviousWeek}
          onNext={handleNextWeek}
        />
        <div className="mt-6">
          <CalendarEmptyState />
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-[16px] bg-[#FFF7ED] p-5 md:rounded-[20px] md:p-6">
      <CalendarWeekNavigator
        anchorDate={weekDays[3] ?? anchorDate}
        onPrevious={handlePreviousWeek}
        onNext={handleNextWeek}
      />

      <div className="mt-6 overflow-x-auto [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <div className="min-w-[1100px]">
          <div className="grid grid-cols-[96px_repeat(7,minmax(0,1fr))] gap-0 lg:grid-cols-[160px_repeat(7,minmax(0,1fr))]">
            <div />
            {weekDays.map((day, index) => (
              <div
                key={day.toISOString()}
                className="border-b border-[#E5DACE] px-2 pb-3 text-center last:border-r-0"
              >
                <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-[#A88B6C]">
                  {dayLabels[index]}
                </p>
                <p className="mt-1 font-display text-[22px] font-medium text-[#322722]">
                  {String(day.getDate()).padStart(2, '0')}
                </p>
              </div>
            ))}
          </div>

          <div
            className="relative grid grid-cols-[96px_repeat(7,minmax(0,1fr))] lg:grid-cols-[160px_repeat(7,minmax(0,1fr))]"
            style={{ minHeight: gridHeight }}
          >
            <div className="relative">
              {hourSlots.map((hour) => (
                <div
                  key={hour}
                  className="absolute left-0 right-0 border-t border-[#E5DACE] pr-3 pt-1 text-right text-[13px] text-[#858585]"
                  style={{ top: getHourOffsetPx(hour, hourRange.startHour) }}
                >
                  {formatHourLabel(hour)}
                </div>
              ))}
            </div>

            {weekDays.map((day) => {
              const dayPosts = scheduledPosts.filter(
                (post) =>
                  post.scheduledAt.getFullYear() === day.getFullYear() &&
                  post.scheduledAt.getMonth() === day.getMonth() &&
                  post.scheduledAt.getDate() === day.getDate(),
              );
              const positioned = positionPostsInColumn(dayPosts, hourRange.startHour);

              return (
                <div
                  key={day.toISOString()}
                  className="relative border-l border-[#E5DACE]"
                >
                  {hourSlots.map((hour) => {
                    const top = getHourOffsetPx(hour, hourRange.startHour);

                    return (
                      <div
                        key={`${day.toISOString()}-${hour}`}
                        className="absolute inset-x-0 border-t border-[#E5DACE]"
                        style={{ top, height: ROW_HEIGHT }}
                      />
                    );
                  })}

                  {positioned.map(({ post, top }) => (
                    <div
                      key={post.item.id}
                      className="absolute inset-x-1"
                      style={{ top, height: CARD_HEIGHT }}
                    >
                      <ScheduledPostCard post={post} />
                    </div>
                  ))}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
