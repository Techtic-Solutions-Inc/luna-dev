import { type InputHTMLAttributes, type ReactNode, useId } from 'react';
import styled from 'styled-components';

interface CheckboxProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label: ReactNode;
  error?: string;
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing[2]};
`;

const Control = styled.label`
  display: flex;
  align-items: flex-start;
  gap: ${({ theme }) => theme.spacing[3]};
  cursor: pointer;
`;

const HiddenInput = styled.input`
  position: absolute;
  opacity: 0;
  width: 1px;
  height: 1px;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;

  &:focus-visible + span {
    outline: 3px solid var(--color-focus-ring);
    outline-offset: 2px;
  }

  &:checked + span {
    background: var(--color-brand-primary);
    border-color: var(--color-brand-primary);
    color: var(--color-text-inverse);
  }

  &:disabled + span {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const Indicator = styled.span<{ $hasError: boolean }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  width: 1.125rem;
  height: 1.125rem;
  margin-top: 0.125rem;
  border: 1px solid
    ${({ $hasError }) =>
      $hasError ? 'var(--color-error)' : 'var(--color-border-strong)'};
  border-radius: ${({ theme }) => theme.borders.radii.sm};
  background: var(--color-surface);
  color: transparent;
  font-size: 0.625rem;
  line-height: 1;
  transition:
    background-color 0.15s ease,
    border-color 0.15s ease,
    color 0.15s ease;
`;

const LabelText = styled.span`
  font-family: ${({ theme }) => theme.typography.fontFamilies.sans};
  font-size: ${({ theme }) => theme.typography.fontSizes.xs};
  font-weight: ${({ theme }) => theme.typography.fontWeights.regular};
  line-height: ${({ theme }) => theme.typography.lineHeights.relaxed};
  color: var(--color-text-secondary);

  a {
    color: var(--color-text-link);
    text-decoration: underline;
  }
`;

const ErrorText = styled.span`
  font-family: ${({ theme }) => theme.typography.fontFamilies.sans};
  font-size: ${({ theme }) => theme.typography.fontSizes.xs};
  color: var(--color-error);
`;

const Checkbox = ({ label, error, id, ...rest }: CheckboxProps) => {
  const generatedId = useId();
  const inputId = id ?? rest.name ?? generatedId;

  return (
    <Wrapper>
      <Control htmlFor={inputId}>
        <HiddenInput
          id={inputId}
          type="checkbox"
          aria-invalid={Boolean(error)}
          aria-describedby={error ? `${inputId}-error` : undefined}
          {...rest}
        />
        <Indicator $hasError={Boolean(error)} aria-hidden="true">
          ✓
        </Indicator>
        <LabelText>{label}</LabelText>
      </Control>
      {error ? (
        <ErrorText id={`${inputId}-error`} role="alert">
          {error}
        </ErrorText>
      ) : null}
    </Wrapper>
  );
};

export default Checkbox;
