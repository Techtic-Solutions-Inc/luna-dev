import type { ElementType, ReactNode } from 'react';

export type CardRadius = 'none' | '12' | '16' | '24';

export interface CardProps {
  children: ReactNode;
  className?: string;
  gradient?: boolean;
  rounded?: boolean;
  radius?: CardRadius;
  as?: ElementType;
}

const RADIUS_CLASSES: Record<CardRadius, string> = {
  none: 'rounded-none',
  12: 'rounded-12',
  16: 'rounded-16',
  24: 'rounded-24',
};

export function Card({
  children,
  className = '',
  gradient = false,
  rounded = true,
  radius,
  as: Tag = 'article',
}: CardProps) {
  const radiusClass = radius
    ? RADIUS_CLASSES[radius]
    : rounded
      ? RADIUS_CLASSES[16]
      : RADIUS_CLASSES.none;
  const surface = gradient
    ? 'bg-card-gradient shadow-accent'
    : 'bg-color-103 shadow-soft';

  return (
    <Tag className={`${radiusClass} ${surface} ${className}`.trim()}>{children}</Tag>
  );
}
