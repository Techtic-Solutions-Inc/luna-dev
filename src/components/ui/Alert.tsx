import type { ReactNode } from 'react';
import { Button } from './Button';

interface AlertProps {
  title?: string;
  children: ReactNode;
  onRetry?: () => void;
}

export function Alert({ title = 'Something went wrong', children, onRetry }: AlertProps) {
  return (
    <div
      role="alert"
      className="mx-auto flex w-full max-w-[1440px] flex-col gap-[12px] border border-border bg-color-107 px-[20px] py-[16px] md:flex-row md:items-center md:justify-between"
    >
      <div>
        <p className="type-body-115 text-ink">{title}</p>
        <p className="type-body-15 mt-[6px] text-muted">{children}</p>
      </div>
      {onRetry ? (
        <Button type="button" variant="primary" onClick={onRetry} className="shrink-0">
          Retry
        </Button>
      ) : null}
    </div>
  );
}
