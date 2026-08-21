import { useId, type FormEvent, type InputHTMLAttributes } from 'react';
import styled from 'styled-components';
import { FiSearch } from 'react-icons/fi';

const Form = styled.form`
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

const InputWrapper = styled.div<{ $hasError: boolean }>`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing['gap-12']};
  padding: 0 ${({ theme }) => theme.spacing['padding-16']};
  border-radius: ${({ theme }) => theme.borderRadius['radius-10']};
  border: 1px solid
    ${({ theme, $hasError }) => ($hasError ? theme.colors['color-98'] : theme.colors['color-63'])};
  background-color: ${({ theme }) => theme.colors['color-16']};
`;

const Input = styled.input`
  flex: 1;
  padding: ${({ theme }) => theme.spacing['padding-16']} 0;
  border: none;
  background: transparent;
  color: ${({ theme }) => theme.colors.secondary};
  font-family: ${({ theme }) => theme.typography.body.fontFamily};
  font-size: 16px;
  line-height: 24px;

  &::placeholder {
    color: ${({ theme }) => theme.colors['color-96']};
  }

  &:focus {
    outline: none;
  }
`;

const SearchButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: ${({ theme }) => theme.spacing['padding-10']};
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius['radius-8']};
  background-color: ${({ theme }) => theme.colors.accent};
  color: ${({ theme }) => theme.colors['color-16']};
  cursor: pointer;

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.secondary};
    outline-offset: 2px;
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const ErrorText = styled.p`
  font-size: 14px;
  line-height: 20px;
  color: ${({ theme }) => theme.colors['color-98']};
`;

const ResultsText = styled.p`
  font-size: 14px;
  line-height: 20px;
  color: ${({ theme }) => theme.colors['color-96']};
`;

interface SearchInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label: string;
  error?: string;
  resultsCount?: number | null;
  isLoading?: boolean;
  onSearch: (query: string) => void;
}

const SearchInput = ({
  label,
  error,
  resultsCount,
  isLoading = false,
  onSearch,
  id,
  ...props
}: SearchInputProps) => {
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const errorId = `${inputId}-error`;

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const query = String(formData.get('search') ?? '').trim();
    onSearch(query);
  };

  return (
    <Form onSubmit={handleSubmit} role="search" aria-label={label}>
      <Label htmlFor={inputId}>{label}</Label>
      <InputWrapper $hasError={Boolean(error)}>
        <Input
          id={inputId}
          name="search"
          type="search"
          aria-invalid={Boolean(error)}
          aria-describedby={error ? errorId : undefined}
          disabled={isLoading}
          {...props}
        />
        <SearchButton
          type="submit"
          aria-label="Search content"
          disabled={isLoading}
        >
          <FiSearch aria-hidden="true" size={18} />
        </SearchButton>
      </InputWrapper>
      {error ? (
        <ErrorText id={errorId} role="alert">
          {error}
        </ErrorText>
      ) : null}
      {resultsCount !== null && resultsCount !== undefined && !error ? (
        <ResultsText role="status">{resultsCount} Results</ResultsText>
      ) : null}
    </Form>
  );
};

export default SearchInput;
