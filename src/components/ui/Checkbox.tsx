import type { InputHTMLAttributes, ReactNode } from 'react';
import styled from 'styled-components';
import { FiCheck } from 'react-icons/fi';

interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label: ReactNode;
  error?: string;
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing['gap-4']};
`;

const LabelRow = styled.label`
  display: flex;
  align-items: flex-start;
  gap: ${({ theme }) => theme.spacing['gap-12']};
  cursor: pointer;
`;

const HiddenInput = styled.input`
  position: absolute;
  opacity: 0;
  width: 0;
  height: 0;
  pointer-events: none;
`;

const Box = styled.span<{ $checked: boolean; $hasError: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  width: 20px;
  height: 20px;
  margin-top: 2px;
  border-radius: ${({ theme }) => theme.radius['radius-4']};
  border: 1px solid
    ${({ theme, $hasError, $checked }) =>
      $hasError ? theme.colors['color-45'] : $checked ? theme.colors.accent : theme.colors['color-57']};
  background-color: ${({ theme, $checked }) =>
    $checked ? theme.colors.accent : theme.colors['color-33']};
  color: ${({ theme }) => theme.colors['color-20']};
  transition: background-color 0.15s ease, border-color 0.15s ease;
`;

const LabelText = styled.span`
  font-family: ${({ theme }) => theme.typography['body-sm-2'].fontFamily};
  font-size: ${({ theme }) => theme.typography['body-sm-2'].fontSize};
  line-height: ${({ theme }) => theme.typography['body-sm-38'].lineHeight};
  color: ${({ theme }) => theme.colors['color-61']};

  a {
    color: ${({ theme }) => theme.colors.accent};
    text-decoration: underline;

    &:hover {
      color: ${({ theme }) => theme.colors.secondary};
    }
  }
`;

const ErrorText = styled.span`
  font-family: ${({ theme }) => theme.typography['caption-4'].fontFamily};
  font-size: ${({ theme }) => theme.typography['caption-4'].fontSize};
  color: ${({ theme }) => theme.colors['color-45']};
  padding-left: 32px;
`;

const Checkbox = ({ label, error, checked, onChange, id, name, disabled }: CheckboxProps) => {
  const inputId = id ?? name ?? 'checkbox';

  return (
    <Wrapper>
      <LabelRow htmlFor={inputId}>
        <HiddenInput
          type="checkbox"
          id={inputId}
          name={name}
          checked={checked}
          onChange={onChange}
          disabled={disabled}
          aria-invalid={Boolean(error)}
        />
        <Box $checked={Boolean(checked)} $hasError={Boolean(error)} aria-hidden="true">
          {checked && <FiCheck size={14} />}
        </Box>
        <LabelText>{label}</LabelText>
      </LabelRow>
      {error && (
        <ErrorText role="alert" id={`${inputId}-error`}>
          {error}
        </ErrorText>
      )}
    </Wrapper>
  );
};

export default Checkbox;
