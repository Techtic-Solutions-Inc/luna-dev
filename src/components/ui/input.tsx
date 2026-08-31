import * as React from 'react';
import { cn } from '@/lib/utils';

export type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type = 'text', ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          'flex h-padding-40 w-full rounded-lg border border-input bg-sofia-color-16 px-padding-12 py-padding-8 text-body-sm-2 text-foreground shadow-sm transition-colors',
          'placeholder:text-muted-foreground',
          'hover:border-primary/60',
          'focus-visible:outline-none focus-visible:ring-padding-2 focus-visible:ring-ring focus-visible:ring-offset-padding-2 focus-visible:ring-offset-background',
          'disabled:cursor-not-allowed disabled:opacity-50',
          'aria-[invalid=true]:border-destructive',
          className,
        )}
        ref={ref}
        {...props}
      />
    );
  },
);
Input.displayName = 'Input';

export { Input };
