export function EmptyState({ title, detail }: { title: string; detail?: string }) {
  return (
    <div className="rounded-16 border border-color-129 bg-color-106 px-20 py-24 text-center">
      <p className="font-garamond text-hero-serif text-secondary">{title}</p>
      {detail ? <p className="mt-8 text-almarai-16-24 text-color-131">{detail}</p> : null}
    </div>
  );
}
