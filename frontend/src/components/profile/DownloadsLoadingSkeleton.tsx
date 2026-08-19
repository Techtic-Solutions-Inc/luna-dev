export function DownloadsLoadingSkeleton() {
  return (
    <div className="space-y-4">
      {Array.from({ length: 5 }).map((_, index) => (
        <div
          key={index}
          className="h-[88px] animate-pulse rounded-[12px] bg-white/10"
        />
      ))}
    </div>
  );
}
