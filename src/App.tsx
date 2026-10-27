import { ErrorBoundary } from "@/components/ErrorBoundary";
import { Toaster } from "@/components/ui/sonner";
import AppRouter from "@/routes";

export default function App() {
  return (
    <ErrorBoundary>
      <AppRouter />
      <Toaster position="top-right" richColors closeButton />
    </ErrorBoundary>
  );
}
