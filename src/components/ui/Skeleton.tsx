export function Skeleton({ className = "" }: { className?: string }) {
  return <div className={`animate-pulse rounded-12 bg-color-129 ${className}`} />;
}
