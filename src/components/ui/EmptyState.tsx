import type { ReactNode } from 'react';

interface EmptyStateProps {
  title?: string;
  message?: string;
  action?: ReactNode;
}

export default function EmptyState({
  title = 'Nothing here yet',
  message = 'There is no content to show.',
  action,
}: EmptyStateProps) {
  return (
    <div
      className="flex flex-col items-center justify-center gap-gap-12 rounded-radius-16 border border-color-26 bg-color-89 px-padding-24 py-padding-40 text-center"
      role="status"
    >
      <h2 className="typo-heading-lg-26 text-secondary">{title}</h2>
      <p className="typo-body-15 text-color-15">{message}</p>
      {action}
    </div>
  );
}
