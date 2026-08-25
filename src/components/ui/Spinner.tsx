import { cn } from '@/lib/cn';

interface SpinnerProps {
  className?: string;
  label?: string;
}

export function Spinner({ className, label = 'Loading' }: SpinnerProps) {
  return (
    <div
      role="status"
      aria-label={label}
      className={cn(
        'h-10 w-10 animate-spin rounded-full border-2 border-accent border-t-transparent',
        className,
      )}
    />
  );
}

export default Spinner;
