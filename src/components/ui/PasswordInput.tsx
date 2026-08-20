import { useState } from 'react';
import styled from 'styled-components';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import { Field, Label, StyledInput, ErrorText } from './Input';

const PasswordWrap = styled.div`
  position: relative;
  width: 100%;
`;

const ToggleButton = styled.button`
  position: absolute;
  right: var(--padding-16);
  top: 50%;
  transform: translateY(-50%);
  background: transparent;
  border: none;
  color: var(--color-57);
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: var(--padding-4);

  &:focus-visible {
    outline: 2px solid var(--accent);
    outline-offset: 2px;
    border-radius: var(--radius-4);
  }
`;

type PasswordInputProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> & {
  label: string;
  error?: string;
  hideLabel?: boolean;
};

export default function PasswordInput({ label, error, hideLabel = false, id, ...rest }: PasswordInputProps) {
  const [visible, setVisible] = useState(false);
  const inputId = id ?? rest.name ?? 'password';

  return (
    <Field>
      {!hideLabel && <Label htmlFor={inputId}>{label}</Label>}
      <PasswordWrap>
        <StyledInput
          id={inputId}
          type={visible ? 'text' : 'password'}
          aria-label={hideLabel ? label : undefined}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? `${inputId}-error` : undefined}
          $hasError={Boolean(error)}
          {...rest}
        />
        <ToggleButton
          type="button"
          aria-label={visible ? 'Hide password' : 'Show password'}
          aria-pressed={visible}
          onClick={() => setVisible((prev) => !prev)}
        >
          {visible ? <FiEyeOff aria-hidden /> : <FiEye aria-hidden />}
        </ToggleButton>
      </PasswordWrap>
      {error ? (
        <ErrorText id={`${inputId}-error`} role="alert">
          {error}
        </ErrorText>
      ) : null}
    </Field>
  );
}
