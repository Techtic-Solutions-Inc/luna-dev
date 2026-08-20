interface SpinnerProps {
  className?: string;
  label?: string;
}

const Spinner = ({ className = '', label = 'Loading' }: SpinnerProps) => (
  <div
    role="status"
    aria-label={label}
    className={`inline-block h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white ${className}`}
  />
);

export default Spinner;
