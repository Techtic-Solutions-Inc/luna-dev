interface SpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  label?: string;
}

const sizeClasses = {
  sm: 'h-4 w-4 border-2',
  md: 'h-8 w-8 border-2',
  lg: 'h-12 w-12 border-3',
};

const Spinner = ({ size = 'md', label = 'Loading' }: SpinnerProps) => (
  <div
    role="status"
    aria-label={label}
    className="flex items-center justify-center"
  >
    <div
      className={[
        'animate-spin rounded-full border-accent border-t-transparent',
        sizeClasses[size],
      ].join(' ')}
    />
    <span className="sr-only">{label}</span>
  </div>
);

export default Spinner;
