import * as React from 'react'
import { cn } from '@/lib/utils'

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(({ className, type, ...props }, ref) => {
  return (
    <input
      type={type}
      className={cn(
        'flex h-10 w-full rounded-[8px] border border-[#3a3541] bg-[#1c1916] px-3 py-2 text-[16px] text-[#ffffff] placeholder:text-[#828282] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c8a47e] disabled:cursor-not-allowed disabled:opacity-50',
        className,
      )}
      ref={ref}
      {...props}
    />
  )
})
Input.displayName = 'Input'

export { Input }
