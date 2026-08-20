import type { ReactNode } from 'react';

interface SectionStatusProps {
  children: ReactNode;
  tone?: 'empty' | 'error';
}

export default function SectionStatus({ children, tone = 'empty' }: SectionStatusProps) {
  return (
    <p
      role={tone === 'error' ? 'alert' : 'status'}
      className="rounded-2xl border border-[var(--color-41)] bg-[var(--color-36)] px-5 py-8 text-center font-almarai text-sm text-[var(--color-57)]"
    >
      {children}
    </p>
  );
}
