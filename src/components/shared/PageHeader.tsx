import type { ReactNode } from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface PageHeaderProps {
  title: string;
  description?: string;
  action?: ReactNode;
  className?: string;
}

export function PageHeader({ title, description, action, className }: PageHeaderProps) {
  return (
    <header
      className={cn(
        'flex flex-col gap-gap-12 tablet:flex-row tablet:items-center tablet:justify-between',
        className,
      )}
    >
      <div className="flex flex-col gap-gap-6">
        <h1 className="font-garamond text-heading-lg-19 text-foreground">{title}</h1>
        {description ? (
          <p className="max-w-2xl text-body-15 text-muted-foreground">{description}</p>
        ) : null}
      </div>
      {action ? <div className="shrink-0">{action}</div> : null}
    </header>
  );
}

interface PageHeaderActionProps {
  children: ReactNode;
  onClick?: () => void;
}

export function PageHeaderAction({ children, onClick }: PageHeaderActionProps) {
  return <Button onClick={onClick}>{children}</Button>;
}
