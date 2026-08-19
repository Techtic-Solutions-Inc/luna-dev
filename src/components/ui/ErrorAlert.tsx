import Button from '@/components/ui/button';

interface ErrorAlertProps {
  message: string;
  onRetry?: () => void;
}

export default function ErrorAlert({ message, onRetry }: ErrorAlertProps) {
  return (
    <div
      className="flex w-full max-w-md flex-col items-center gap-3 rounded-token-8 border border-color-45 px-4 py-3 text-center"
      role="alert"
    >
      <p className="font-almarai text-sm text-color-45">{message}</p>
      {onRetry ? (
        <Button
          type="button"
          variant="secondary"
          className="max-w-[10rem] py-2 text-sm"
          onClick={onRetry}
        >
          Retry
        </Button>
      ) : null}
    </div>
  );
}
