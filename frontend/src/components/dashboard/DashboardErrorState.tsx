import { ErrorBanner } from '@/components/shared/ErrorBanner';

interface DashboardErrorStateProps {
  message: string;
  onRetry?: () => void;
}

export function DashboardErrorState({ message, onRetry }: DashboardErrorStateProps) {
  return <ErrorBanner message={message} onRetry={onRetry} />;
}
