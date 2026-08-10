import { type InputHTMLAttributes } from 'react';
import styled from 'styled-components';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  hint?: string;
}

const Field = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--gap-6);
  width: 100%;
`;

const Label = styled.label`
  font-family: var(--font-caption-5-family);
  font-size: var(--font-caption-5-size);
  font-weight: var(--font-caption-5-weight);
  line-height: var(--font-caption-5-line-height);
  color: var(--text-primary);
`;

const StyledInput = styled.input<{ $hasError: boolean }>`
  width: 100%;
  padding: var(--padding-10) var(--padding-12);
  border: 1px solid
    ${({ $hasError }) => ($hasError ? 'var(--border)' : 'var(--color-18)')};
  border-radius: var(--radius-6);
  background: var(--secondary);
  color: var(--text-primary);

  &::placeholder {
    color: var(--text-secondary);
  }

  &:focus-visible {
    outline: 2px solid var(--accent);
    outline-offset: 2px;
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const HelperText = styled.span<{ $isError?: boolean }>`
  font-family: var(--font-caption-4-family);
  font-size: var(--font-caption-4-size);
  font-weight: var(--font-caption-4-weight);
  line-height: var(--font-caption-4-line-height);
  color: ${({ $isError }) =>
    $isError ? 'var(--color-53)' : 'var(--text-secondary)'};
`;

const Input = ({ label, error, hint, id, ...rest }: InputProps) => {
  const inputId = id ?? rest.name ?? label.toLowerCase().replace(/\s+/g, '-');
  const describedBy = error
    ? `${inputId}-error`
    : hint
      ? `${inputId}-hint`
      : undefined;

  return (
    <Field>
      <Label htmlFor={inputId}>{label}</Label>
      <StyledInput
        id={inputId}
        $hasError={Boolean(error)}
        aria-invalid={Boolean(error)}
        aria-describedby={describedBy}
        {...rest}
      />
      {error ? (
        <HelperText id={`${inputId}-error`} $isError role="alert">
          {error}
        </HelperText>
      ) : null}
      {!error && hint ? (
        <HelperText id={`${inputId}-hint`}>{hint}</HelperText>
      ) : null}
    </Field>
  );
};

export default Input;
