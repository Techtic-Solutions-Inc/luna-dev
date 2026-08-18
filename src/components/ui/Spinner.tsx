interface SpinnerProps {
  label?: string;
  size?: 'sm' | 'md';
}

export default function Spinner({
  label = 'Loading',
  size = 'md',
}: SpinnerProps) {
  return (
    <span className="inline-flex items-center justify-center" role="status">
      <span
        className={`${size === 'sm' ? 'h-4 w-4' : 'h-6 w-6'} animate-spin rounded-full border-2 border-white/30 border-t-white`}
        aria-hidden="true"
      />
      <span className="sr-only">{label}</span>
    </span>
  );
}
