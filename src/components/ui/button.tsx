import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-gap-8 whitespace-nowrap rounded-lg text-body-sm-2 font-semibold transition-colors focus-visible:outline-none focus-visible:ring-padding-2 focus-visible:ring-ring focus-visible:ring-offset-padding-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 active:scale-[0.98]',
  {
    variants: {
      variant: {
        default: 'bg-accent text-accent-foreground hover:brightness-90 active:brightness-75',
        destructive:
          'bg-destructive text-destructive-foreground hover:brightness-90 active:brightness-75',
        outline:
          'border border-border bg-transparent text-foreground hover:bg-muted hover:text-foreground',
        secondary: 'bg-secondary text-secondary-foreground hover:brightness-110',
        ghost: 'hover:bg-muted hover:text-foreground',
        link: 'text-foreground underline-offset-[var(--spacing-padding-4)] hover:underline',
      },
      size: {
        default: 'h-padding-40 px-padding-16 py-padding-8',
        sm: 'h-padding-36 rounded-md px-padding-12',
        lg: 'h-gap-44 rounded-lg px-padding-24',
        icon: 'h-padding-40 w-padding-40',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, type = 'button', ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        type={asChild ? undefined : type}
        {...props}
      />
    );
  },
);
Button.displayName = 'Button';

export { Button, buttonVariants };
