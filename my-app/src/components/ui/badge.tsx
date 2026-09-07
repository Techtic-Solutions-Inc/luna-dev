import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const badgeVariants = cva(
  'inline-flex items-center rounded-[6px] border px-2 py-0.5 text-[12px] font-[600] transition-colors focus:outline-none focus:ring-2 focus:ring-[#c8a47e]',
  {
    variants: {
      variant: {
        default: 'border-transparent bg-[#c8a47e] text-[#0b0b0b]',
        secondary: 'border-transparent bg-[#3a3541] text-[#ffffff]',
        destructive: 'border-transparent bg-[#ff2f2f] text-[#ffffff]',
        outline: 'border-[#3a3541] text-[#ffffff]',
        success: 'border-transparent bg-[#22c55e33] text-[#22c55e]',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />
}

export { Badge, badgeVariants }
