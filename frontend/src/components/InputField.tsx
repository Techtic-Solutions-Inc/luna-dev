import {
  forwardRef,
  useId,
  useState,
  type InputHTMLAttributes,
  type ReactNode,
} from 'react';
import { FontAwesomeIcon } from '../theme/icons';
import { faEye, faEyeSlash } from '../theme/icons';
import './InputField.css';

export interface InputFieldProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'id'> {
  label: string;
  error?: string;
  hint?: ReactNode;
  id?: string;
  variant?: 'default' | 'auth';
  showPasswordToggle?: boolean;
}

export const InputField = forwardRef<HTMLInputElement, InputFieldProps>(
  function InputField(
    {
      label,
      error,
      hint,
      id,
      className,
      required,
      disabled,
      variant = 'default',
      showPasswordToggle = false,
      type = 'text',
      placeholder,
      ...rest
    },
    ref,
  ) {
    const generatedId = useId();
    const inputId = id ?? generatedId;
    const errorId = `${inputId}-error`;
    const hintId = `${inputId}-hint`;
    const [passwordVisible, setPasswordVisible] = useState(false);
    const isPasswordField = type === 'password';
    const resolvedType =
      isPasswordField && showPasswordToggle && passwordVisible ? 'text' : type;
    const describedBy =
      [error ? errorId : null, hint && !error ? hintId : null]
        .filter(Boolean)
        .join(' ') || undefined;

    return (
      <div
        className={[
          'input-field',
          variant === 'auth' ? 'input-field--auth' : '',
          error ? 'input-field--error' : '',
          disabled ? 'input-field--disabled' : '',
          showPasswordToggle && isPasswordField ? 'input-field--password' : '',
          className ?? '',
        ]
          .filter(Boolean)
          .join(' ')}
      >
        <label
          className={
            variant === 'auth'
              ? 'input-field__label input-field__label--sr-only'
              : 'input-field__label'
          }
          htmlFor={inputId}
        >
          {label}
          {required ? (
            <span className="input-field__required" aria-hidden="true">
              *
            </span>
          ) : null}
        </label>

        <div className="input-field__control-wrap">
          <input
            ref={ref}
            id={inputId}
            className="input-field__control"
            type={resolvedType}
            placeholder={placeholder ?? (variant === 'auth' ? label : undefined)}
            aria-invalid={error ? true : undefined}
            aria-describedby={describedBy}
            required={required}
            disabled={disabled}
            {...rest}
          />

          {showPasswordToggle && isPasswordField ? (
            <button
              type="button"
              className="input-field__toggle"
              onClick={() => {
                setPasswordVisible((current) => !current);
              }}
              aria-label={passwordVisible ? 'Hide password' : 'Show password'}
              disabled={disabled}
            >
              <FontAwesomeIcon icon={passwordVisible ? faEyeSlash : faEye} />
            </button>
          ) : null}
        </div>

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
