import {
  forwardRef,
  useId,
  type InputHTMLAttributes,
  type ReactNode,
} from 'react';
import './InputField.css';

export interface InputFieldProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'id'> {
  label: string;
  error?: string;
  hint?: ReactNode;
  id?: string;
}

export const InputField = forwardRef<HTMLInputElement, InputFieldProps>(
  function InputField(
    { label, error, hint, id, className, required, disabled, ...rest },
    ref,
  ) {
    const generatedId = useId();
    const inputId = id ?? generatedId;
    const errorId = `${inputId}-error`;
    const hintId = `${inputId}-hint`;
    const describedBy = [
      error ? errorId : null,
      hint && !error ? hintId : null,
    ]
      .filter(Boolean)
      .join(' ') || undefined;

    return (
      <div
        className={[
          'input-field',
          error ? 'input-field--error' : '',
          disabled ? 'input-field--disabled' : '',
          className ?? '',
        ]
          .filter(Boolean)
          .join(' ')}
      >
        <label className="input-field__label" htmlFor={inputId}>
          {label}
          {required ? (
            <span className="input-field__required" aria-hidden="true">
              *
            </span>
          ) : null}
        </label>
        <input
          ref={ref}
          id={inputId}
          className="input-field__control"
          aria-invalid={error ? true : undefined}
          aria-describedby={describedBy}
          required={required}
          disabled={disabled}
          {...rest}
        />
        {error ? (
          <p id={errorId} className="input-field__error" role="alert">
            {error}
          </p>
        ) : hint ? (
          <p id={hintId} className="input-field__hint">
            {hint}
          </p>
        ) : null}
      </div>
    );
  },
);

export default InputField;
