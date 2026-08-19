interface ErrorBannerProps {
  message: string;
  onRetry?: () => void;
}

export function ErrorBanner({ message, onRetry }: ErrorBannerProps) {
  return (
    <div
      role="alert"
      className="flex flex-col gap-3 rounded-[12px] border border-[#ff5630]/40 bg-[#ff5630]/10 px-4 py-4 text-[#fdfdfd] sm:flex-row sm:items-center sm:justify-between"
    >
      <p className="text-sm leading-6">{message}</p>
      {onRetry ? (
        <button
          type="button"
          onClick={onRetry}
          className="focus-ring shrink-0 rounded-full border border-[#ff5630]/40 px-4 py-2 text-sm text-white transition-colors hover:bg-[#ff5630]/20"
        >
          Try again
        </button>
      ) : null}
    </div>
  );
}
