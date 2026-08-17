import type { FormHTMLAttributes, ReactNode } from 'react';

interface FormProps extends FormHTMLAttributes<HTMLFormElement> {
  children: ReactNode;
  loading?: boolean;
}

export default function Form({
  children,
  loading = false,
  className = '',
  ...formProps
}: FormProps) {
  return (
    <form
      {...formProps}
      noValidate
      aria-busy={loading || formProps['aria-busy']}
      className={className}
    >
      {children}
    </form>
  );
}
