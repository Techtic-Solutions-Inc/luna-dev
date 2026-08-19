import { SettingsIcon } from '@/components/icons';

interface CustomizeButtonProps {
  onClick: () => void;
}

export function CustomizeButton({ onClick }: CustomizeButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="focus-ring inline-flex h-11 items-center gap-2 rounded-full bg-[#0b0b0b] px-5 text-sm text-white transition-colors hover:bg-[#2A2A2A]"
    >
      <SettingsIcon className="h-4 w-4" />
      Customize
    </button>
  );
}
