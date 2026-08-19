import type { HTMLAttributes, ReactNode } from 'react';

interface TextProps extends HTMLAttributes<HTMLParagraphElement> {
  children: ReactNode;
}

export default function Text({ children, className = '', ...props }: TextProps) {
  return (
    <p className={`font-almarai text-lg text-color-18 ${className}`} {...props}>
      {children}
    </p>
  );
}
