import { FiEye, FiEyeOff } from '@/lib/icons';

interface PasswordToggleProps {
  visible: boolean;
  onToggle: () => void;
}

export default function PasswordToggle({ visible, onToggle }: PasswordToggleProps) {
  return (
    <button
      type="button"
      onClick={onToggle}
      className="text-color-14 outline-none hover:text-secondary focus:outline-none focus-visible:outline-none"
      aria-label={visible ? 'Hide password' : 'Show password'}
      aria-pressed={visible}
    >
      {visible ? (
        <FiEyeOff size={20} aria-hidden="true" focusable="false" />
      ) : (
        <FiEye size={20} aria-hidden="true" focusable="false" />
      )}
    </button>
  );
}
