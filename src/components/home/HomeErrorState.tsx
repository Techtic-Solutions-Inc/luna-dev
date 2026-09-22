import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { getApiErrorMessage } from "@/lib/api-client";

interface HomeErrorStateProps {
  error: unknown;
  onRetry: () => void;
  isRetrying?: boolean;
}

export function HomeErrorState({
  error,
  onRetry,
  isRetrying = false,
}: HomeErrorStateProps) {
  const message = getApiErrorMessage(error);

  return (
    <div
      className="fixed bottom-4 left-4 right-4 z-[100] mx-auto max-w-lg sm:left-auto sm:right-6"
      role="status"
      aria-live="polite"
    >
      <Alert variant="destructive" className="shadow-lg">
        <AlertCircle className="h-4 w-4" aria-hidden />
        <AlertTitle>Unable to load home content</AlertTitle>
        <AlertDescription className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <span>{message}</span>
          <Button
            type="button"
            variant="pillOutline"
            size="sm"
            onClick={onRetry}
            disabled={isRetrying}
            aria-busy={isRetrying}
            className="shrink-0 border-white/40"
          >
            {isRetrying ? "Retrying…" : "Retry"}
          </Button>
        </AlertDescription>
      </Alert>
    </div>
  );
}
