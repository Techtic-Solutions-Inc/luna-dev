import type { TextareaHTMLAttributes } from 'react';
import styled from 'styled-components';
import LoadingSkeleton from './LoadingSkeleton';

interface TextareaFieldProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  error?: string;
  isLoading?: boolean;
}

const FieldWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing['gap-8']};
  width: 100%;
`;

const Label = styled.label`
  font-family: ${({ theme }) => theme.typography['body-sm-2'].fontFamily};
  font-size: ${({ theme }) => theme.typography['body-sm-2'].fontSize};
  font-weight: ${({ theme }) => theme.typography['body-sm-2'].fontWeight};
  line-height: ${({ theme }) => theme.typography['body-sm-2'].lineHeight};
  color: ${({ theme }) => theme.colors['color-61']};
`;

const Textarea = styled.textarea<{ $hasError: boolean }>`
  width: 100%;
  min-height: 120px;
  padding: ${({ theme }) => `${theme.spacing['padding-14']} ${theme.spacing['padding-16']}`};
  border-radius: ${({ theme }) => theme.radius['radius-8']};
  border: 1px solid
    ${({ theme, $hasError }) => ($hasError ? theme.colors['color-45'] : theme.colors['color-49'])};
  background-color: ${({ theme }) => theme.colors['color-33']};
  color: ${({ theme }) => theme.colors.secondary};
  font-family: ${({ theme }) => theme.typography['body-21'].fontFamily};
  font-size: ${({ theme }) => theme.typography['body-21'].fontSize};
  line-height: ${({ theme }) => theme.typography['body-21'].lineHeight};
  resize: vertical;
  transition: border-color 0.15s ease;

  &::placeholder {
    color: ${({ theme }) => theme.colors['color-57']};
  }

  &:focus {
    border-color: ${({ theme }) => theme.colors.accent};
    outline: none;
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const ErrorText = styled.span`
  font-family: ${({ theme }) => theme.typography['caption-4'].fontFamily};
  font-size: ${({ theme }) => theme.typography['caption-4'].fontSize};
  line-height: ${({ theme }) => theme.typography['caption-4'].lineHeight};
  color: ${({ theme }) => theme.colors['color-45']};
`;

const TextareaField = ({
  label,
  error,
  isLoading = false,
  id,
  ...rest
}: TextareaFieldProps) => {
  const inputId = id ?? rest.name;

  if (isLoading) {
    return (
      <FieldWrapper>
        <LoadingSkeleton height="14px" width="80px" />
        <LoadingSkeleton height="120px" width="100%" />
      </FieldWrapper>
    );
  }

  return (
    <FieldWrapper>
      <Label htmlFor={inputId}>{label}</Label>
      <Textarea id={inputId} $hasError={Boolean(error)} aria-invalid={Boolean(error)} {...rest} />
      {error && (
        <ErrorText role="alert" id={`${inputId}-error`}>
          {error}
        </ErrorText>
      )}
    </FieldWrapper>
  );
};

export default TextareaField;
