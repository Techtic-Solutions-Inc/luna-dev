interface EmptyStateProps {
  title?: string;
  description?: string;
}

export function EmptyState({
  title = 'No Content Available',
  description = 'Home content links are not available yet.',
}: EmptyStateProps) {
  return (
    <div className="mx-auto w-full max-w-[1440px] border border-line bg-panel px-[20px] py-[16px]">
      <p className="type-body-115 text-ink">{title}</p>
      <p className="type-body-15 mt-[6px] text-muted">{description}</p>
    </div>
  );
}
