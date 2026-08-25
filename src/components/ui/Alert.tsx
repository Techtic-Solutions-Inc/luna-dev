interface AlertProps {
  message: string;
  onRetry?: () => void;
}

export function Alert({ message, onRetry }: AlertProps) {
  return (
    <div role="alert" className="flex flex-wrap items-center justify-between gap-12 rounded-16 border border-border/40 bg-color-106 px-16 py-14 text-almarai-16-24 text-secondary">
      <p>{message}</p>
      {onRetry ? (
        <button
          type="button"
          onClick={onRetry}
          className="rounded-1000 bg-accent px-16 py-10 text-almarai-16-bold text-color-101 hover:bg-color-102 focus-visible:ring-2 focus-visible:ring-accent"
        >
          Retry
        </button>
      ) : null}
    </div>
  );
}
