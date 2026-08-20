import Spinner from './Spinner';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'ghost';
  isLoading?: boolean;
}

const Button = ({
  variant = 'primary',
  isLoading = false,
  children,
  className = '',
  disabled,
  ...props
}: ButtonProps) => {
  const base =
    'inline-flex w-full items-center justify-center gap-2 rounded-[8px] px-6 py-3 text-sm font-almarai transition focus:outline-none focus-visible:ring-2 focus-visible:ring-color-37 disabled:cursor-not-allowed disabled:opacity-60';
  const variants = {
    primary: 'bg-accent text-white hover:brightness-110',
    ghost: 'bg-transparent text-color-93 hover:text-color-20',
  };

  return (
    <button
      className={`${base} ${variants[variant]} ${className}`}
      disabled={disabled || isLoading}
      aria-busy={isLoading}
      {...props}
    >
      {isLoading ? <Spinner className="h-4 w-4" label="Loading" /> : null}
      {children}
    </button>
  );
};

export default Button;
