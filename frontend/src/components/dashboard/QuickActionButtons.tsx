import { Link } from 'react-router-dom';
import { CalendarIcon, SparklesIcon } from '@/components/icons';

export function QuickActionButtons() {
  return (
    <div className="flex flex-wrap gap-3">
      <Link
        to="/content-calendar"
        className="focus-ring inline-flex h-11 items-center gap-2 rounded-full bg-primary px-5 text-sm text-white transition-colors hover:bg-primary-hover"
      >
        <SparklesIcon className="h-4 w-4" />
        Plan My Week
      </Link>
      <Link
        to="/content-calendar"
        className="focus-ring inline-flex h-11 items-center gap-2 rounded-full border border-white/10 bg-[#1f1b17] px-5 text-sm text-white transition-colors hover:bg-white/5"
      >
        <CalendarIcon className="h-4 w-4" />
        My Content Calendar
      </Link>
    </div>
  );
}
