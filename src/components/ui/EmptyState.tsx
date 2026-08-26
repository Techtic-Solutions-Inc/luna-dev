interface EmptyStateProps {
  title?: string;
  body?: string;
}

export function EmptyState({
  title = 'No content available',
  body,
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-2 rounded-section border border-line bg-panel p-8 text-center">
      <h3 className="text-[18px] font-medium leading-6 text-ink">{title}</h3>
      {body && <p className="text-[16px] leading-6 text-muted">{body}</p>}
    </div>
  );
}
