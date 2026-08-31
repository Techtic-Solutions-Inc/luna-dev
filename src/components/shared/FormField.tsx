import { cloneElement, isValidElement, type ReactNode } from 'react';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';

interface FormFieldProps {
  id: string;
  label: string;
  error?: string;
  description?: string;
  children: ReactNode;
  className?: string;
  required?: boolean;
}

interface ControlAriaProps {
  id?: string;
  'aria-describedby'?: string;
  'aria-invalid'?: boolean | 'true' | 'false';
  'aria-required'?: boolean | 'true' | 'false';
}

function joinDescribedBy(...ids: Array<string | undefined>): string | undefined {
  const joined = ids.filter((id): id is string => Boolean(id && id.length > 0)).join(' ');
  return joined.length > 0 ? joined : undefined;
}

export function FormField({
  id,
  label,
  error,
  description,
  children,
  className,
  required,
}: FormFieldProps) {
  const descriptionId = description ? `${id}-description` : undefined;
  const errorId = error ? `${id}-error` : undefined;

  const control = isValidElement<ControlAriaProps>(children)
    ? cloneElement(children, {
        id,
        'aria-describedby': joinDescribedBy(
          children.props['aria-describedby'],
          descriptionId,
          errorId,
        ),
        'aria-invalid': Boolean(error),
        'aria-required': required ? true : undefined,
      })
    : children;

  return (
    <div className={cn('flex flex-col gap-gap-8', className)}>
      <Label htmlFor={id}>
        {label}
        {required ? (
          <span className="ml-padding-4 text-destructive-foreground" aria-hidden="true">
            *
          </span>
        ) : null}
      </Label>
      {control}
      {description ? (
        <p id={descriptionId} className="text-body-sm-2 text-muted-foreground">
          {description}
        </p>
      ) : null}
      {error ? (
        <p
          id={errorId}
          className="text-body-sm-2 font-medium text-destructive-foreground"
          role="alert"
        >
          {error}
        </p>
      ) : null}
    </div>
  );
}
