interface DetailErrorStateProps {
  message: string;
  onClose: () => void;
}

export function DetailErrorState({ message, onClose }: DetailErrorStateProps) {
  return (
    <div className="space-y-4" role="alert">
      <p className="text-sm leading-6 text-[#8D312A]">{message}</p>
      <button
        type="button"
        onClick={onClose}
        className="focus-ring rounded-full bg-primary px-5 py-2.5 text-sm text-white transition-colors hover:bg-[#b48a5d]"
      >
        Back to calendar
      </button>
    </div>
  );
}
