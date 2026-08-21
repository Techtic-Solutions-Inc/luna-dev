import type { HTMLAttributes, ReactNode } from 'react';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  variant?: 'default' | 'elevated' | 'gradient';
}

const variantClasses: Record<NonNullable<CardProps['variant']>, string> = {
  default: 'bg-color-37 border border-color-20',
  elevated: 'bg-color-37 shadow-drop-shadow-39',
  gradient:
    'bg-gradient-to-br from-color-45 via-color-37 to-color-22 border border-color-20',
};

const Card = ({
  children,
  variant = 'default',
  className = '',
  ...props
}: CardProps) => (
  <div
    className={[
      'rounded-radius-16 overflow-hidden',
      variantClasses[variant],
      className,
    ]
      .filter(Boolean)
      .join(' ')}
    {...props}
  >
    {children}
  </div>
);

export default Card;
