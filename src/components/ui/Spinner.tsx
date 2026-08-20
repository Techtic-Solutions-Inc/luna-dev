interface SpinnerProps {
  label?: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const sizeClasses = {
  sm: 'h-4 w-4 border-2',
  md: 'h-8 w-8 border-2',
  lg: 'h-12 w-12 border-[3px]',
};

const Spinner = ({ label = 'Loading', size = 'md', className = '' }: SpinnerProps) => (
  <div
    className={`flex flex-col items-center justify-center gap-3 ${className}`}
    role="status"
    aria-live="polite"
    aria-busy="true"
  >
    <div
      className={`animate-spin rounded-full border-accent border-t-transparent ${sizeClasses[size]}`}
      aria-hidden="true"
    />
    <span className="font-almarai text-sm text-[var(--text-secondary)]">{label}</span>
  </div>
);

export default Spinner;
