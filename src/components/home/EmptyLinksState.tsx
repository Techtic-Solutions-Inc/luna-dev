interface EmptyLinksStateProps {
  title?: string;
  description?: string;
}

export function EmptyLinksState({
  title = 'No Content Available',
  description = 'Home content links are not available yet.',
}: EmptyLinksStateProps) {
  return (
    <div className="mx-auto w-full max-w-[800px] rounded-[16px] border border-line bg-color-103 px-[20px] py-[24px] text-center">
      <h2 className="font-garamond text-[28px] font-medium text-ink">{title}</h2>
      <p className="type-body-33 mt-[10px] text-muted">{description}</p>
    </div>
  );
}
