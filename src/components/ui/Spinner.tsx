import { cn } from '@/lib/utils/cn';

interface SpinnerProps {
  label?: string;
  size?: 'sm' | 'md' | 'lg';
}

const sizeClassName: Record<NonNullable<SpinnerProps['size']>, string> = {
  sm: 'h-20 w-20',
  md: 'h-32 w-32',
  lg: 'h-48 w-48',
};

export function Spinner({ label = 'Loading', size = 'md' }: SpinnerProps) {
  return (
    <div className="flex items-center justify-center p-24" role="status" aria-live="polite">
      <svg
        className={cn('animate-spin text-accent', sizeClassName[size])}
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <circle
          className="opacity-25"
          cx="16"
          cy="16"
          r="13"
          stroke="currentColor"
          strokeWidth="3"
        />
        <path
          className="opacity-100"
          fill="currentColor"
          d="M16 3a13 13 0 0 1 13 13h-3.5A9.5 9.5 0 0 0 16 6.5V3z"
        />
      </svg>
      <span className="sr-only">{label}</span>
    </div>
  );
}

export default Spinner;
