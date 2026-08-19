import type { HTMLAttributes, ReactNode } from 'react';

type HeadingLevel = 'h1' | 'h2' | 'h3';
type HeadingSize = 'default' | 'large';

interface HeadingProps extends HTMLAttributes<HTMLHeadingElement> {
  as?: HeadingLevel;
  size?: HeadingSize;
  children: ReactNode;
}

const sizeClassName: Record<HeadingSize, string> = {
  large: 'text-4xl font-semibold',
  default: 'text-2xl font-semibold',
};

export default function Heading({
  as: Tag = 'h1',
  size = 'large',
  className = '',
  children,
  ...props
}: HeadingProps) {
  return (
    <Tag className={`font-garamond text-secondary ${sizeClassName[size]} ${className}`} {...props}>
      {children}
    </Tag>
  );
}
