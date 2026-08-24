import type { ButtonHTMLAttributes, ReactNode } from 'react';
import { cn } from '@/lib/cn';

export type CardAlign = 'left' | 'center' | 'right';

export interface CardProps {
  title?: string;
  children?: ReactNode;
  gradient?: boolean;
  align?: CardAlign;
  className?: string;
  as?: 'article' | 'section' | 'div';
}

export function Card({
  title,
  children,
  gradient = false,
  align = 'left',
  className,
  as: Tag = 'article',
}: CardProps) {
  const alignClass =
    align === 'center' ? 'text-center items-center' : align === 'right' ? 'text-right items-end' : 'text-left items-start';

  return (
    <Tag
      className={cn(
        'flex flex-col rounded-24 p-32 shadow-float',
        gradient
          ? 'bg-gradient-to-br from-forest-card via-forest to-forest-deep text-white'
          : 'bg-color-106 text-white',
        alignClass,
        className,
      )}
    >
      {title ? <h3 className="font-serif text-step-title text-white">{title}</h3> : null}
      {children}
    </Tag>
  );
}

export interface CardButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'gold' | 'outline' | 'ghost';
}

export function CardButton({ variant = 'gold', className, children, ...props }: CardButtonProps) {
  const variantClass =
    variant === 'outline' ? 'btn-outline' : variant === 'ghost' ? 'btn-ghost-dark' : 'btn-gold';
  return (
    <button type="button" className={cn(variantClass, className)} {...props}>
      {children}
    </button>
  );
}
