import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-[8px] text-[16px] font-[600] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c8a47e] disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0',
  {
    variants: {
      variant: {
        default: 'bg-[#c8a47e] text-[#0b0b0b] hover:bg-[#b8936a] active:bg-[#a8845c]',
        destructive: 'bg-[#ff2f2f] text-[#ffffff] hover:bg-[#e02828] active:bg-[#c82222]',
        outline: 'border border-[#3a3541] bg-transparent text-[#ffffff] hover:bg-[#3a3541]/30',
        secondary: 'bg-[#1c1916] text-[#ffffff] hover:bg-[#2f2f2f]',
        ghost: 'text-[#ffffff] hover:bg-[#3a3541]/30',
        link: 'text-[#c8a47e] underline-offset-4 hover:underline',
      },
      size: {
        default: 'h-10 px-5 py-2',
        sm: 'h-8 px-3 text-[14px]',
        lg: 'h-11 px-8',
        icon: 'h-10 w-10',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button'
    return (
      <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />
    )
  },
)
Button.displayName = 'Button'

export { Button, buttonVariants }
