import { Alert } from "@/components/ui/Alert";

export function ErrorState({ message, onRetry }: { message: string; onRetry?: () => void }) {
  return <Alert message={message} onRetry={onRetry} />;
}
