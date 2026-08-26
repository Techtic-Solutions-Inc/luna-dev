import { Button } from '@/components/ui/Button';

interface HomeErrorStateProps {
  message: string;
  onRetry: () => void;
}

export function HomeErrorState({ message, onRetry }: HomeErrorStateProps) {
  return (
    <div
      role="alert"
      aria-live="assertive"
      className="mx-auto flex w-full max-w-[1760px] flex-col gap-[12px] rounded-[16px] border border-[#ff5630] bg-[#11161c] px-[20px] py-[16px] md:flex-row md:items-center md:justify-between"
    >
      <p className="type-body-55 text-ink">{message}</p>
      <Button type="button" variant="primary" className="h-[44px] min-w-[110px] shrink-0" onClick={onRetry}>
        Retry
      </Button>
    </div>
  );
}
