export function EmptyState({ title, detail }: { title: string; detail?: string }) {
  return (
    <div className="rounded-16 border border-color-129 bg-color-106 px-20 py-24 text-center">
      <p className="text-hero-serif text-secondary" style={{ fontFamily: "'EB Garamond', serif" }}>
        {title}
      </p>
      {detail ? (
        <p className="mt-8 text-body-16 text-color-131" style={{ fontFamily: "'Almarai', sans-serif" }}>
          {detail}
        </p>
      ) : null}
    </div>
  );
}
