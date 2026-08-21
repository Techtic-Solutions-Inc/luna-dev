import { useId, type InputHTMLAttributes, type ReactNode } from 'react';
import styled from 'styled-components';

const Field = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing['gap-8']};
`;

const CheckboxRow = styled.label`
  display: flex;
  align-items: flex-start;
  gap: ${({ theme }) => theme.spacing['gap-12']};
  cursor: pointer;
`;

const HiddenInput = styled.input`
  position: absolute;
  opacity: 0;
  width: 1px;
  height: 1px;
  overflow: hidden;
`;

const Box = styled.span<{ $checked: boolean; $hasError: boolean }>`
  flex-shrink: 0;
  width: 20px;
  height: 20px;
  margin-top: 2px;
  border-radius: ${({ theme }) => theme.borderRadius['radius-4']};
  border: 1px solid
    ${({ theme, $hasError }) => ($hasError ? theme.colors['color-98'] : theme.colors.accent)};
  background-color: ${({ theme, $checked }) =>
    $checked ? theme.colors.accent : theme.colors['color-16']};
  display: inline-flex;
  align-items: center;
  justify-content: center;

  &::after {
    content: '';
    display: ${({ $checked }) => ($checked ? 'block' : 'none')};
    width: 6px;
    height: 10px;
    border: solid ${({ theme }) => theme.colors['color-16']};
    border-width: 0 2px 2px 0;
    transform: rotate(45deg);
    margin-bottom: 2px;
  }
`;

const Text = styled.span`
  font-family: ${({ theme }) => theme.typography.body.fontFamily};
  font-size: 14px;
  line-height: 22px;
  color: ${({ theme }) => theme.colors['color-96']};
`;

const ErrorText = styled.p`
  font-size: 14px;
  line-height: 20px;
  color: ${({ theme }) => theme.colors['color-98']};
`;

interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label: ReactNode;
  error?: string;
}

const Checkbox = ({ label, error, checked = false, id, ...props }: CheckboxProps) => {
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const errorId = `${inputId}-error`;

  return (
    <Field>
      <CheckboxRow htmlFor={inputId}>
        <HiddenInput
          id={inputId}
          type="checkbox"
          checked={checked}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? errorId : undefined}
          {...props}
        />
        <Box $checked={Boolean(checked)} $hasError={Boolean(error)} aria-hidden="true" />
        <Text>{label}</Text>
      </CheckboxRow>
      {error ? (
        <ErrorText id={errorId} role="alert">
          {error}
        </ErrorText>
      ) : null}
    </Field>
  );
};

export default Checkbox;
