import { FiCheck } from '@/lib/icons';

interface SuccessMessageProps {
  message: string;
}

export default function SuccessMessage({ message }: SuccessMessageProps) {
  return (
    <div
      className="flex w-full max-w-md flex-col items-center text-center"
      role="status"
      aria-live="polite"
    >
      <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-accent">
        <FiCheck size={28} className="text-secondary" aria-hidden="true" focusable="false" />
      </div>
      <p className="font-almarai text-base leading-7 text-color-18">{message}</p>
    </div>
  );
}
