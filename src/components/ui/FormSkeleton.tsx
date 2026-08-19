interface FormSkeletonProps {
  label?: string;
  lines?: number;
  shape?: 'pill' | 'soft';
}

export default function FormSkeleton({
  label = 'Loading',
  lines = 2,
  shape = 'pill',
}: FormSkeletonProps) {
  const roundedClassName = shape === 'soft' ? 'rounded-token-16' : 'rounded-full';

  return (
    <div
      className="flex w-full max-w-md flex-col items-center gap-4"
      role="status"
      aria-live="polite"
      aria-label={label}
    >
      {Array.from({ length: lines }, (_, index) => (
        <div key={index} className={`h-12 w-full animate-pulse bg-color-41 ${roundedClassName}`} />
      ))}
      <span className="sr-only">{label}</span>
    </div>
  );
}
