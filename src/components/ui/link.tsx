import { Link as RouterLink, type LinkProps } from 'react-router-dom';

interface TextLinkProps extends LinkProps {
  underlined?: boolean;
}

export default function TextLink({
  className = '',
  children,
  underlined = true,
  ...props
}: TextLinkProps) {
  return (
    <RouterLink
      className={`${underlined ? 'underline underline-offset-2' : ''} ${className}`}
      {...props}
    >
      {children}
    </RouterLink>
  );
}
