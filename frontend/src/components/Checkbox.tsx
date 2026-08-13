import {
  forwardRef,
  useId,
  type InputHTMLAttributes,
  type ReactNode,
} from 'react';
import './Checkbox.css';

export interface CheckboxProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'id'> {
  label: ReactNode;
  error?: string;
  id?: string;
  variant?: 'default' | 'auth';
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  function Checkbox(
    { label, error, id, className, required, disabled, variant = 'default', ...rest },
    ref,
  ) {
    const generatedId = useId();
    const inputId = id ?? generatedId;
    const errorId = `${inputId}-error`;

    return (
      <div
        className={[
          'checkbox',
          variant === 'auth' ? 'checkbox--auth' : '',
          error ? 'checkbox--error' : '',
          disabled ? 'checkbox--disabled' : '',
          className ?? '',
        ]
          .filter(Boolean)
          .join(' ')}
      >
        <div className="checkbox__row">
          <input
            ref={ref}
            id={inputId}
            type="checkbox"
            className="checkbox__control"
            aria-invalid={error ? true : undefined}
            aria-describedby={error ? errorId : undefined}
            required={required}
            disabled={disabled}
            {...rest}
          />
          <label className="checkbox__label" htmlFor={inputId}>
            {label}
          </label>
        </div>
        {error ? (
          <p id={errorId} className="checkbox__error" role="alert">
            {error}
          </p>
        ) : null}
      </div>
    );
  },
);

export default Checkbox;
