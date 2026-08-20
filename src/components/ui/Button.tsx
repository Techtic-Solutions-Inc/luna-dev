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
    'inline-flex w-full items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-almarai transition focus:outline-none focus-visible:ring-2 focus-visible:ring-color-37 disabled:cursor-not-allowed disabled:opacity-60';
  const variants = {
    primary: 'bg-accent text-white hover:brightness-110',
    ghost: 'bg-transparent text-color-93 hover:text-white',
  };

  return (
    <button
      className={`${base} ${variants[variant]} ${className}`}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
      ) : null}
      {children}
    </button>
  );
};

export default Button;
