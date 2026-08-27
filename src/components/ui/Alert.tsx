interface AlertProps {
  message: string;
  onRetry?: () => void;
}

export function Alert({ message, onRetry }: AlertProps) {
  return (
    <div
      role="alert"
      className="flex flex-wrap items-center justify-between gap-12 rounded-16 border border-border/40 bg-color-106 px-16 py-14 text-body-16 text-secondary"
      style={{ fontFamily: "'Almarai', sans-serif" }}
    >
      <p>{message}</p>
      {onRetry ? (
        <button
          type="button"
          onClick={onRetry}
          className="rounded-24 bg-accent px-16 py-10 text-body-115 text-secondary hover:bg-color-102 focus-visible:ring-2 focus-visible:ring-accent"
          style={{ fontFamily: "'Public Sans', sans-serif" }}
        >
          Retry
        </button>
      ) : null}
    </div>
  );
}
