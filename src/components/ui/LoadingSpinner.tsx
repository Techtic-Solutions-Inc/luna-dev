import { FiLoader } from '@/lib/icons';

interface LoadingSpinnerProps {
  label?: string;
  size?: number;
  className?: string;
}

export default function LoadingSpinner({
  label = 'Loading',
  size = 24,
  className = 'text-accent',
}: LoadingSpinnerProps) {
  return (
    <div
      className="flex items-center justify-center"
      role="status"
      aria-live="polite"
      aria-label={label}
    >
      <FiLoader
        className={`animate-spin ${className}`}
        size={size}
        aria-hidden="true"
        focusable="false"
      />
      <span className="sr-only">{label}</span>
    </div>
  );
}
