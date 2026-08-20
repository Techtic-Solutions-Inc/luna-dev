interface SpinnerProps {
  label?: string;
  size?: 'sm' | 'md' | 'lg';
}

const sizeClassName: Record<NonNullable<SpinnerProps['size']>, string> = {
  sm: 'h-4 w-4 border-2',
  md: 'h-8 w-8 border-2',
  lg: 'h-12 w-12 border-[3px]',
};

export default function Spinner({ label = 'Loading', size = 'md' }: SpinnerProps) {
  return (
    <div className="flex items-center justify-center" role="status" aria-label={label}>
      <span
        className={`inline-block animate-spin rounded-full border-accent border-t-transparent ${sizeClassName[size]}`}
        aria-hidden="true"
      />
      <span className="sr-only">{label}</span>
    </div>
  );
}
