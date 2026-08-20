import type { ReactNode } from 'react';

import { Spinner } from '@/components/ui/Spinner';
import { cn } from '@/lib/utils/cn';

interface SectionStateProps {
  isLoading?: boolean;
  error?: string | null;
  isEmpty?: boolean;
  emptyTitle: string;
  emptyDescription?: string;
  onRetry?: () => void;
  children: ReactNode;
  className?: string;
}

export function SectionState({
  isLoading = false,
  error = null,
  isEmpty = false,
  emptyTitle,
  emptyDescription,
  onRetry,
  children,
  className,
}: SectionStateProps) {
  if (isLoading) {
    return (
      <div className={cn('flex min-h-[120px] items-center justify-center', className)}>
        <Spinner label="Loading section" />
      </div>
    );
  }

  if (error !== null && error.length > 0) {
    return (
      <div
        className={cn(
          'rounded-12 border border-color-45/40 bg-color-36 px-16 py-20 text-center',
          className,
        )}
        role="alert"
      >
        <p className="type-body-sm-2 text-white">{error}</p>
        {onRetry ? (
          <button
            type="button"
            onClick={onRetry}
            className="type-body-sm-2 mt-12 inline-flex h-32 items-center justify-center rounded-full border border-color-41 px-16 text-white transition-colors duration-200 hover:bg-color-41"
          >
            Try again
          </button>
        ) : null}
      </div>
    );
  }

  if (isEmpty) {
    return (
      <div
        className={cn(
          'rounded-12 border border-dashed border-color-41 bg-color-36/60 px-16 py-24 text-center',
          className,
        )}
      >
        <p className="type-body-sm-2 text-white">{emptyTitle}</p>
        {emptyDescription ? (
          <p className="type-caption-12 mt-8 text-color-14">{emptyDescription}</p>
        ) : null}
      </div>
    );
  }

  return <>{children}</>;
}

interface SectionHeaderProps {
  title: string;
  description?: string;
  actionLabel?: string;
  actionHref?: string;
}

export function SectionHeader({ title, description, actionLabel, actionHref }: SectionHeaderProps) {
  return (
    <div className="mb-16 flex flex-wrap items-end justify-between gap-12">
      <div>
        <h2 className="type-heading-lg-31 text-white">{title}</h2>
        {description ? <p className="type-body-sm-2 mt-4 text-color-14">{description}</p> : null}
      </div>
      {actionLabel && actionHref ? (
        <a
          href={actionHref}
          className="type-body-sm-2 text-accent transition-colors duration-200 hover:text-white"
        >
          {actionLabel}
        </a>
      ) : null}
    </div>
  );
}
