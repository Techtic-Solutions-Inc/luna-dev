import { useEffect, useRef } from 'react';
import { Button } from '@/components/ui/Button';

interface HomeErrorStateProps {
  message: string;
  onRetry: () => void;
  busy?: boolean;
}

export function HomeErrorState({ message, onRetry, busy = false }: HomeErrorStateProps) {
  const retryRef = useRef<HTMLButtonElement>(null);
  const retryStarted = useRef(false);

  useEffect(() => {
    if (busy) {
      retryStarted.current = true;
      return;
    }
    if (!retryStarted.current) {
      return;
    }
    retryStarted.current = false;
    retryRef.current?.focus();
  }, [busy]);

  return (
    <div
      role="alert"
      aria-live="assertive"
      className="mx-auto flex w-full max-w-[1760px] flex-col gap-[12px] rounded-[16px] border border-border bg-color-103 px-[20px] py-[16px] md:flex-row md:items-center md:justify-between"
    >
      <p className="type-body-55 text-ink">{message}</p>
      <Button
        ref={retryRef}
        type="button"
        variant="primary"
        className="h-[44px] min-w-[110px] shrink-0"
        disabled={busy}
        onClick={onRetry}
      >
        Retry
      </Button>
    </div>
  );
}
