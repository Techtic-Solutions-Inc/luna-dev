import type { ButtonHTMLAttributes, ReactNode } from 'react';
import { Link } from 'react-router-dom';

type ButtonVariant = 'primary' | 'secondary' | 'ghost';

interface SharedProps {
  variant?: ButtonVariant;
  children: ReactNode;
  className?: string;
  disabled?: boolean;
}

type ButtonAsButton = SharedProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children'> & {
    to?: undefined;
  };

type ButtonAsLink = SharedProps & {
  to: string;
  type?: never;
  onClick?: () => void;
};

export type ButtonProps = ButtonAsButton | ButtonAsLink;

const VARIANT_CLASS: Record<ButtonVariant, string> = {
  primary:
    'bg-accent text-color-101 border border-accent hover:brightness-90 active:brightness-75',
  secondary:
    'bg-transparent text-ink border border-ink hover:bg-ink/10 active:bg-ink/10',
  ghost: 'bg-transparent text-ink border border-transparent hover:text-accent',
};

export function Button(props: ButtonProps) {
  const { variant = 'primary', children, className = '', disabled } = props;
  const classes = [
    'inline-flex items-center justify-center rounded-pill px-[20px] py-[12px]',
    'type-body-115 no-underline',
    'transition-all duration-150 disabled:cursor-not-allowed disabled:opacity-50',
    VARIANT_CLASS[variant],
    className,
  ].join(' ');

  if (props.to) {
    const linkClass = disabled ? `${classes} pointer-events-none opacity-50` : classes;
    if (props.to.startsWith('#')) {
      return (
        <a href={props.to} className={linkClass} onClick={props.onClick} aria-disabled={disabled}>
          {children}
        </a>
      );
    }
    return (
      <Link to={props.to} className={linkClass} onClick={props.onClick} aria-disabled={disabled}>
        {children}
      </Link>
    );
  }

  return (
    <button type={props.type ?? 'button'} className={classes} disabled={disabled} onClick={props.onClick}>
      {children}
    </button>
  );
}
