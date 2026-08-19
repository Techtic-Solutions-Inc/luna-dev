import { Link } from 'react-router-dom';
import { ExternalLinkIcon } from '@/components/icons';
import type { ReactNode } from 'react';

interface StatsMetricCardProps {
  title: string;
  value: number;
  to: string;
  ariaLabel: string;
  icon?: ReactNode;
}

export function StatsMetricCard({
  title,
  value,
  to,
  ariaLabel,
  icon,
}: StatsMetricCardProps) {
  return (
    <Link
      to={to}
      aria-label={ariaLabel}
      className="focus-ring group flex flex-col rounded-[16px] border border-white/5 bg-[#1f1b17]/80 p-5 transition-colors hover:border-white/10 md:rounded-[20px] md:p-6"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-2">
          {icon ? (
            <span className="text-[#858585] transition-colors group-hover:text-primary">
              {icon}
            </span>
          ) : null}
          <p className="text-[13px] text-[#A6A4A2]">{title}</p>
        </div>
        <ExternalLinkIcon className="h-4 w-4 shrink-0 text-[#858585] transition-colors group-hover:text-primary" />
      </div>
      <p className="mt-3 font-display text-[36px] leading-none text-primary sm:text-[42px]">
        {value.toLocaleString('en-US')}
      </p>
    </Link>
  );
}
