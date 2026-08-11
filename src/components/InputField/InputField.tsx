import { type InputHTMLAttributes, type ReactNode, useId, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { FontAwesomeIcon } from '../../theme/icons.js';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

interface InputFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  hint?: string;
  endAdornment?: ReactNode;
  isLoading?: boolean;
}

const shimmer = keyframes`
  0% {
    background-position: -200% 0;
  }
  100% {
    background-position: 200% 0;
  }
`;

const Field = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing[2]};
  width: 100%;
`;

const SkeletonLabel = styled.span`
  display: block;
  width: 35%;
  height: 0.875rem;
  border-radius: ${({ theme }) => theme.borders.radii.sm};
  background: linear-gradient(
    90deg,
    var(--color-neutral-200) 25%,
    var(--color-neutral-100) 50%,
    var(--color-neutral-200) 75%
  );
  background-size: 200% 100%;
  animation: ${shimmer} 1.4s ease-in-out infinite;
`;

const SkeletonInput = styled.span`
  display: block;
  width: 100%;
  min-height: 2.75rem;
  border-radius: ${({ theme }) => theme.borders.radii.lg};
  background: linear-gradient(
    90deg,
    var(--color-neutral-200) 25%,
    var(--color-neutral-100) 50%,
    var(--color-neutral-200) 75%
  );
  background-size: 200% 100%;
  animation: ${shimmer} 1.4s ease-in-out infinite;
`;

const Label = styled.label`
  font-family: ${({ theme }) => theme.typography.fontFamilies.sans};
  font-size: ${({ theme }) => theme.typography.fontSizes.sm};
  font-weight: ${({ theme }) => theme.typography.fontWeights.medium};
  line-height: ${({ theme }) => theme.typography.lineHeights.snug};
  color: var(--color-text-primary);
`;

const InputWrapper = styled.div`
  position: relative;
  width: 100%;
`;

const StyledInput = styled.input<{ $hasError: boolean; $hasEndAdornment: boolean }>`
  width: 100%;
  min-height: 2.75rem;
  padding: ${({ theme }) => `${theme.spacing[3]} ${theme.spacing[4]}`};
  padding-right: ${({ $hasEndAdornment, theme }) =>
    $hasEndAdornment ? theme.spacing[10] : theme.spacing[4]};
  border: 1px solid
    ${({ $hasError }) =>
      $hasError ? 'var(--color-error)' : 'var(--color-border)'};
  border-radius: ${({ theme }) => theme.borders.radii.lg};
  background: var(--color-surface);
  color: var(--color-text-primary);

  &::placeholder {
    color: var(--color-text-muted);
  }

  &:focus-visible {
    outline: 3px solid var(--color-focus-ring);
    outline-offset: 2px;
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const EndAdornmentButton = styled.button`
  position: absolute;
  top: 50%;
  right: ${({ theme }) => theme.spacing[3]};
  transform: translateY(-50%);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 2rem;
  height: 2rem;
  padding: 0;
  border: none;
  border-radius: ${({ theme }) => theme.borders.radii.md};
  background: transparent;
  color: var(--color-text-secondary);

  &:hover {
    color: var(--color-text-primary);
  }

  &:focus-visible {
    outline: 3px solid var(--color-focus-ring);
    outline-offset: 2px;
  }
`;

const HelperText = styled.span<{ $isError?: boolean }>`
  font-family: ${({ theme }) => theme.typography.fontFamilies.sans};
  font-size: ${({ theme }) => theme.typography.fontSizes.xs};
  font-weight: ${({ theme }) => theme.typography.fontWeights.regular};
  line-height: ${({ theme }) => theme.typography.lineHeights.normal};
  color: ${({ $isError }) =>
    $isError ? 'var(--color-error)' : 'var(--color-text-secondary)'};
`;

const InputField = ({
  label,
  error,
  hint,
  id,
  type = 'text',
  endAdornment,
  isLoading = false,
  ...rest
}: InputFieldProps) => {
  const generatedId = useId();
  const inputId = id ?? rest.name ?? generatedId;
  const describedBy = error
    ? `${inputId}-error`
    : hint
      ? `${inputId}-hint`
      : undefined;
  const [showPassword, setShowPassword] = useState(false);
  const isPasswordField = type === 'password';
  const resolvedType = isPasswordField && showPassword ? 'text' : type;
  const resolvedEndAdornment =
    endAdornment ??
    (isPasswordField ? (
      <EndAdornmentButton
        type="button"
        aria-label={showPassword ? 'Hide password' : 'Show password'}
        onClick={() => setShowPassword((current) => !current)}
      >
        <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
      </EndAdornmentButton>
    ) : null);

  if (isLoading) {
    return (
      <Field aria-busy="true" aria-label={`Loading ${label}`}>
        <SkeletonLabel aria-hidden="true" />
        <SkeletonInput aria-hidden="true" />
      </Field>
    );
  }

  return (
    <Field>
      <Label htmlFor={inputId}>{label}</Label>
      <InputWrapper>
        <StyledInput
          id={inputId}
          type={resolvedType}
          $hasError={Boolean(error)}
          $hasEndAdornment={Boolean(resolvedEndAdornment)}
          aria-invalid={Boolean(error)}
          aria-describedby={describedBy}
          {...rest}
        />
        {resolvedEndAdornment}
      </InputWrapper>
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

export default InputField;
