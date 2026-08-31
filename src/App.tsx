import AppRouter from '@/routes/index';
import { Toaster } from '@/components/ui/sonner';

export default function App() {
  return (
    <>
      <AppRouter />
      <Toaster />
    </>
  );
}
