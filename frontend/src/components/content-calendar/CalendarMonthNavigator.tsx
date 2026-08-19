import { ChevronLeftIcon, ChevronRightIcon } from '@/components/icons';
import { formatMonthYear } from '@/utils/calendar';

interface CalendarMonthNavigatorProps {
  anchorDate: Date;
  onPrevious: () => void;
  onNext: () => void;
}

export function CalendarMonthNavigator({
  anchorDate,
  onPrevious,
  onNext,
}: CalendarMonthNavigatorProps) {
  return (
    <div className="flex items-center justify-between gap-4">
      <h2 className="font-display text-[22px] font-medium text-[#322722] sm:text-[26px]">
        {formatMonthYear(anchorDate)}
      </h2>
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={onPrevious}
          aria-label="Previous week"
          className="focus-ring flex h-9 w-9 items-center justify-center rounded-full text-[#76675B] transition-colors hover:bg-[#E4DACE]"
        >
          <ChevronLeftIcon className="h-4 w-4" />
        </button>
        <button
          type="button"
          onClick={onNext}
          aria-label="Next week"
          className="focus-ring flex h-9 w-9 items-center justify-center rounded-full text-[#76675B] transition-colors hover:bg-[#E4DACE]"
        >
          <ChevronRightIcon className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
