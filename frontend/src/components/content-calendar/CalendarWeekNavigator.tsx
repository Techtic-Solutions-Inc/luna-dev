import { ChevronLeftIcon, ChevronRightIcon } from '@/components/icons';
import { buildWeekDays, formatWeekRange, startOfWeek } from '@/utils/calendar';

interface CalendarWeekNavigatorProps {
  anchorDate: Date;
  onPrevious: () => void;
  onNext: () => void;
}

export function CalendarWeekNavigator({
  anchorDate,
  onPrevious,
  onNext,
}: CalendarWeekNavigatorProps) {
  const weekStart = startOfWeek(anchorDate);
  const weekDays = buildWeekDays(weekStart);
  const weekEnd = weekDays[weekDays.length - 1] ?? anchorDate;

  return (
    <div className="flex items-center justify-between gap-4">
      <h2 className="font-display text-[22px] font-medium text-calendar-heading sm:text-[26px]">
        {formatWeekRange(weekStart, weekEnd)}
      </h2>
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={onPrevious}
          aria-label="Previous week"
          className="focus-ring flex h-9 w-9 items-center justify-center rounded-full text-calendar-nav transition-colors hover:bg-calendar-nav-hover"
        >
          <ChevronLeftIcon className="h-4 w-4" />
        </button>
        <button
          type="button"
          onClick={onNext}
          aria-label="Next week"
          className="focus-ring flex h-9 w-9 items-center justify-center rounded-full text-calendar-nav transition-colors hover:bg-calendar-nav-hover"
        >
          <ChevronRightIcon className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
