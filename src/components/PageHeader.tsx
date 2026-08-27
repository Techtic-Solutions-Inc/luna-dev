import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { typography } from '@/theme/tokens';

interface PageHeaderProps {
  title: string;
  description?: string;
  action?: ReactNode;
  className?: string;
}

const heading = typography['heading-lg-19'];

export function PageHeader({ title, description, action, className }: PageHeaderProps) {
  return (
    <header
      className={cn('flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between', className)}
    >
      <div>
        <h1
          className="text-foreground"
          style={{
            fontFamily: heading.fontFamily,
            fontSize: heading.fontSize,
            fontWeight: heading.fontWeight,
            lineHeight: heading.lineHeight,
          }}
        >
          {title}
        </h1>
        {description ? <p className="mt-1 text-sm text-muted-foreground">{description}</p> : null}
      </div>
      {action}
    </header>
  );
}
