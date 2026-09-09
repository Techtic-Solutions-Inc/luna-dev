import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

export function MockWindow({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        'overflow-hidden rounded-[16px] border border-[#ffffff]/10 bg-[#11161c] shadow-2xl',
        className,
      )}
    >
      {children}
    </div>
  );
}
