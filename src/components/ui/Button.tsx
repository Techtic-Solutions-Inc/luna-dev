import { forwardRef, type ReactNode } from 'react';
import { Link } from 'react-router-dom';

type Variant = 'primary' | 'secondary' | 'ghost' | 'waitlist';

const goldCta =
  'bg-accent text-color-101 border border-accent hover:brightness-90 active:brightness-75';

const variants: Record<Variant, string> = {
  primary: goldCta,
  secondary: 'bg-transparent text-ink border border-ink hover:bg-ink/10 active:bg-ink/15',
  ghost: 'bg-transparent text-ink border border-transparent hover:text-accent',
  waitlist: goldCta,
};

const base =
  'inline-flex items-center justify-center rounded-[100px] px-[20px] py-[12px] type-body-115 no-underline transition-all duration-150 disabled:cursor-not-allowed disabled:opacity-50';

interface SharedProps {
  variant?: Variant;
  className?: string;
  children: ReactNode;
}

interface ButtonAsButton extends SharedProps {
  to?: undefined;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  onClick?: () => void;
}

interface ButtonAsLink extends SharedProps {
  to: string;
  onClick?: () => void;
  disabled?: boolean;
}

export type ButtonProps = ButtonAsButton | ButtonAsLink;

function classes(variant: Variant, className: string): string {
  return `${base} ${variants[variant]} ${className}`.trim();
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(props, ref) {
  const variant = props.variant ?? 'primary';
  const className = classes(variant, props.className ?? '');

  if (props.to !== undefined) {
    const { to, onClick, children, disabled } = props;
    const linkClass = disabled ? `${className} pointer-events-none opacity-50` : className;
    if (to.startsWith('#')) {
      return (
        <a href={to} className={linkClass} onClick={onClick} aria-disabled={disabled}>
          {children}
        </a>
      );
    }
    return (
      <Link to={to} className={linkClass} onClick={onClick} aria-disabled={disabled}>
        {children}
      </Link>
    );
  }

  const { children, type, disabled, onClick } = props;
  return (
    <button ref={ref} type={type ?? 'button'} className={className} disabled={disabled} onClick={onClick}>
      {children}
    </button>
  );
});

Button.displayName = 'Button';
