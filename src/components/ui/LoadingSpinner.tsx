import Spinner from '@/components/ui/Spinner';

interface LoadingSpinnerProps {
  label?: string;
  size?: number;
  className?: string;
}

export default function LoadingSpinner({
  label = 'Loading',
  size = 24,
  className,
}: LoadingSpinnerProps) {
  return <Spinner label={label} size={size} className={className} />;
}
