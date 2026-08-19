import type { HTMLAttributes, ReactNode } from 'react';

interface SubheadingProps extends HTMLAttributes<HTMLParagraphElement> {
  children: ReactNode;
}

export default function Subheading({ children, className = '', ...props }: SubheadingProps) {
  return (
    <p className={`font-almarai text-lg text-color-18 ${className}`} {...props}>
      {children}
    </p>
  );
}
