import type { ReactNode } from 'react';
import Button, { type ButtonVariant } from '../../ui/Button';

export interface HomeButtonProps {
  children: ReactNode;
  variant?: ButtonVariant;
  type?: 'button' | 'submit';
  onClick?: () => void;
  disabled?: boolean;
  loading?: boolean;
  className?: string;
  ariaLabel?: string;
}

const HomeButton = ({
  children,
  variant = 'primary',
  type = 'button',
  onClick,
  disabled = false,
  loading = false,
  className = '',
  ariaLabel,
}: HomeButtonProps) => (
  <Button
    variant={variant}
    type={type}
    onClick={onClick}
    disabled={disabled}
    loading={loading}
    className={className}
    ariaLabel={ariaLabel}
  >
    {children}
  </Button>
);

export default HomeButton;
