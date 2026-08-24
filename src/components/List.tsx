import type { ReactNode } from 'react';

export interface ListProps {
  children: ReactNode;
  className?: string;
  ariaLabel?: string;
}

export function List({ children, className = '', ariaLabel }: ListProps) {
  return (
    <ul className={className} aria-label={ariaLabel}>
      {children}
    </ul>
  );
}
