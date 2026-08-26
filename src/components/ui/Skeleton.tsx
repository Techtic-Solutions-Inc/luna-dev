interface SkeletonProps {
  className?: string;
}

export function Skeleton({ className = '' }: SkeletonProps) {
  return <div className={`skeleton-pulse rounded-[10px] ${className}`} aria-hidden="true" />;
}
