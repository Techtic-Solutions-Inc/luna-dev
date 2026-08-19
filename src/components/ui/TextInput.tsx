import { useState } from 'react';
import styled from 'styled-components';

interface TextInputProps {
  label: string;
  name: string;
  type?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  placeholder?: string;
  error?: string;
  disabled?: boolean;
  loading?: boolean;
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  width: 100%;
`;

const Label = styled.label`
  font-family: 'Almarai', sans-serif;
  font-size: 14px;
  font-weight: 400;
  line-height: 20px;
  color: #ffffff;
`;

const InputField = styled.input<{ $hasError: boolean }>`
  width: 100%;
  height: 48px;
  padding: 0 16px;
  border-radius: 8px;
  border: 1px solid ${({ $hasError }) => ($hasError ? '#ff2f2f' : '#444')};
  background: transparent;
  color: #ffffff;
  font-family: 'Almarai', sans-serif;
  font-size: 14px;
  font-weight: 400;
  line-height: 20px;
  outline: none;
  box-sizing: border-box;
  transition: border-color 0.15s ease;

  &::placeholder {
    color: #959595;
  }

  &:hover:not(:disabled) {
    border-color: ${({ $hasError }) => ($hasError ? '#ff2f2f' : '#c8a47e')};
  }

  &:focus {
    border-color: ${({ $hasError }) => ($hasError ? '#ff2f2f' : '#c8a47e')};
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const ErrorText = styled.span`
  font-family: 'Almarai', sans-serif;
  font-size: 12px;
  font-weight: 400;
  color: #ff2f2f;
  line-height: 16px;
`;

const SkeletonInput = styled.div`
  width: 100%;
  height: 48px;
  border-radius: 8px;
  background: linear-gradient(90deg, #2a2a2a 25%, #333 50%, #2a2a2a 75%);
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite;

  @keyframes shimmer {
    0% { background-position: 200% 0; }
    100% { background-position: -200% 0; }
  }
`;

const TextInput: React.FC<TextInputProps> = ({
  label,
  name,
  type = 'text',
  value,
  onChange,
  onBlur,
  placeholder,
  error,
  disabled = false,
  loading = false,
}) => {
  const [touched, setTouched] = useState(false);

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    setTouched(true);
    onBlur?.(e);
  };

  const showError = touched && error;

  return (
    <Wrapper>
      <Label htmlFor={name}>{label}</Label>
      {loading ? (
        <SkeletonInput aria-label={`Loading ${label}`} />
      ) : (
        <InputField
          id={name}
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          onBlur={handleBlur}
          placeholder={placeholder}
          disabled={disabled}
          $hasError={!!showError}
          aria-invalid={!!showError}
          aria-describedby={showError ? `${name}-error` : undefined}
        />
      )}
      {showError && <ErrorText id={`${name}-error`} role="alert">{error}</ErrorText>}
    </Wrapper>
  );
};

export default TextInput;
