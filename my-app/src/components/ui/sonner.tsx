import { Toaster as Sonner } from 'sonner'

type ToasterProps = React.ComponentProps<typeof Sonner>

const Toaster = ({ ...props }: ToasterProps) => {
  return (
    <Sonner
      theme="dark"
      className="toaster group"
      toastOptions={{
        classNames: {
          toast:
            'group toast group-[.toaster]:bg-[#1c1916] group-[.toaster]:text-[#ffffff] group-[.toaster]:border-[#3a3541] group-[.toaster]:shadow-lg',
          description: 'group-[.toast]:text-[#828282]',
          actionButton: 'group-[.toast]:bg-[#c8a47e] group-[.toast]:text-[#0b0b0b]',
          cancelButton: 'group-[.toast]:bg-[#3a3541] group-[.toast]:text-[#ffffff]',
        },
      }}
      {...props}
    />
  )
}

export { Toaster }
