import { useId, type InputHTMLAttributes } from 'react';
import styled from 'styled-components';

const Field = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing['gap-8']};
  width: 100%;
`;

const Label = styled.label`
  font-family: ${({ theme }) => theme.typography.body.fontFamily};
  font-size: 14px;
  font-weight: 400;
  line-height: 20px;
  color: ${({ theme }) => theme.colors.secondary};
`;

const Input = styled.input<{ $hasError: boolean }>`
  width: 100%;
  padding: ${({ theme }) => theme.spacing['padding-16']};
  border-radius: ${({ theme }) => theme.borderRadius['radius-10']};
  border: 1px solid
    ${({ theme, $hasError }) => ($hasError ? theme.colors['color-98'] : theme.colors['color-63'])};
  background-color: ${({ theme }) => theme.colors['color-16']};
  color: ${({ theme }) => theme.colors.secondary};
  font-family: ${({ theme }) => theme.typography.body.fontFamily};
  font-size: 16px;
  line-height: 24px;

  &::placeholder {
    color: ${({ theme }) => theme.colors['color-96']};
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.accent};
    outline-offset: 2px;
  }
`;

const ErrorText = styled.p`
  font-size: 14px;
  line-height: 20px;
  color: ${({ theme }) => theme.colors['color-98']};
`;

interface EmailInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label: string;
  error?: string;
}

const EmailInput = ({ label, error, id, ...props }: EmailInputProps) => {
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const errorId = `${inputId}-error`;

  return (
    <Field>
      <Label htmlFor={inputId}>{label}</Label>
      <Input
        id={inputId}
        type="email"
        autoComplete="email"
        $hasError={Boolean(error)}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? errorId : undefined}
        {...props}
      />
      {error ? (
        <ErrorText id={errorId} role="alert">
          {error}
        </ErrorText>
      ) : null}
    </Field>
  );
};

export default EmailInput;
