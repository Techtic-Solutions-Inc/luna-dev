interface SpinnerProps {
  label?: string;
  className?: string;
}

export default function Spinner({ label = 'Loading', className = '' }: SpinnerProps) {
  return (
    <div
      className={`flex flex-col items-center justify-center gap-gap-12 text-color-15 ${className}`}
      role="status"
      aria-live="polite"
    >
      <span
        className="h-8 w-8 animate-spin rounded-radius-100 border-2 border-color-26 border-t-accent"
        aria-hidden="true"
      />
      <span className="typo-body-sm-106">{label}</span>
    </div>
  );
}
