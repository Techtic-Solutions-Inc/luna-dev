import { Button } from './Button';

interface AlertProps {
  message: string;
  onRetry?: () => void;
}

export function Alert({ message, onRetry }: AlertProps) {
  return (
    <div
      role="alert"
      className="flex flex-col gap-3 rounded-section border border-[#ea4335] bg-[#1d1818] p-4 sm:flex-row sm:items-center sm:justify-between"
    >
      <p className="text-[16px] leading-6 text-ink">{message}</p>
      {onRetry && (
        <Button variant="secondary" onClick={onRetry} className="shrink-0">
          Retry
        </Button>
      )}
    </div>
  );
}
