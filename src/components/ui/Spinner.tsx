import LoadingSpinner from '@/components/ui/LoadingSpinner';

interface SpinnerProps {
  label?: string;
  size?: number;
  className?: string;
}

export default function Spinner({ label, size, className }: SpinnerProps) {
  return <LoadingSpinner label={label} size={size} className={className} />;
}
