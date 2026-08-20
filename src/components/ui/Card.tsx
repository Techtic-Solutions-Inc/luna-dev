import { type HTMLAttributes, type ReactNode } from 'react';

interface CardProps extends HTMLAttributes<HTMLElement> {
  children: ReactNode;
  as?: 'article' | 'div' | 'section';
}

export default function Card({
  children,
  as: Component = 'article',
  className = '',
  ...props
}: CardProps) {
  return (
    <Component
      className={`rounded-2xl border border-[var(--color-41)] bg-[var(--color-36)] ${className}`}
      {...props}
    >
      {children}
    </Component>
  );
}
