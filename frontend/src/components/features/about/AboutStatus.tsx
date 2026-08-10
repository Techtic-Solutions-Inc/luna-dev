import Button from '../../ui/Button';
import { StatusCard, StatusText } from './styles';

interface AboutStatusProps {
  variant: 'error' | 'empty';
  message: string;
  actionLabel: string;
  onAction: () => void;
  actionVariant?: 'primary' | 'secondary';
  ariaLabel?: string;
}

const AboutStatus = ({
  variant,
  message,
  actionLabel,
  onAction,
  actionVariant = 'primary',
  ariaLabel,
}: AboutStatusProps) => (
  <StatusCard $variant={variant} role={variant === 'error' ? 'alert' : 'status'}>
    <StatusText>{message}</StatusText>
    <Button
      type="button"
      variant={actionVariant}
      onClick={onAction}
      aria-label={ariaLabel ?? actionLabel}
    >
      {actionLabel}
    </Button>
  </StatusCard>
);

export default AboutStatus;
