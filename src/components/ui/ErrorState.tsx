interface ErrorStateProps {
  title?: string;
  message?: string;
  onRetry?: () => void;
}

export default function ErrorState({
  title = 'Something went wrong',
  message = 'Please try again.',
  onRetry,
}: ErrorStateProps) {
  return (
    <div
      className="flex flex-col items-center justify-center gap-gap-16 rounded-radius-16 border border-color-51 bg-color-89 px-padding-24 py-padding-40 text-center"
      role="alert"
    >
      <h2 className="typo-heading-lg-26 text-secondary">{title}</h2>
      <p className="typo-body-15 text-color-15">{message}</p>
      {onRetry ? (
        <button
          type="button"
          onClick={onRetry}
          className="rounded-radius-12 bg-accent px-padding-20 py-padding-10 typo-body-55 text-color-16 hover:bg-color-102 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent active:brightness-95 disabled:cursor-not-allowed disabled:opacity-50"
        >
          Try again
        </button>
      ) : null}
    </div>
  );
}
