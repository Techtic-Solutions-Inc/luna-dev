import styled from 'styled-components';

interface CheckboxProps {
  label: React.ReactNode;
  name: string;
  checked: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  disabled?: boolean;
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const LabelRow = styled.label`
  display: flex;
  align-items: flex-start;
  gap: 10px;
  cursor: pointer;
  user-select: none;
`;

const HiddenInput = styled.input`
  position: absolute;
  opacity: 0;
  width: 0;
  height: 0;
  pointer-events: none;
`;

const Box = styled.span<{ $checked: boolean; $hasError: boolean }>`
  width: 18px;
  height: 18px;
  min-width: 18px;
  border-radius: 4px;
  border: 1.5px solid ${({ $hasError, $checked }) => ($hasError ? '#ff2f2f' : $checked ? '#c8a47e' : '#666')};
  background: ${({ $checked }) => ($checked ? '#c8a47e' : 'transparent')};
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 2px;
  transition: border-color 0.15s ease, background 0.15s ease;

  ${HiddenInput}:focus-visible + & {
    outline: 2px solid #c8a47e;
    outline-offset: 2px;
  }

  svg {
    width: 12px;
    height: 12px;
    color: #1a1a19;
  }
`;

const LabelText = styled.span`
  font-family: 'Almarai', sans-serif;
  font-size: 14px;
  font-weight: 400;
  line-height: 20px;
  color: #d9d9d9;

  a {
    color: #c8a47e;
    text-decoration: underline;
    text-underline-offset: 2px;

    &:hover {
      color: #e0c4a0;
    }
  }
`;

const ErrorText = styled.span`
  font-family: 'Almarai', sans-serif;
  font-size: 12px;
  font-weight: 400;
  color: #ff2f2f;
  line-height: 16px;
  padding-left: 28px;
`;

const Checkbox: React.FC<CheckboxProps> = ({
  label,
  name,
  checked,
  onChange,
  error,
  disabled = false,
}) => (
  <Wrapper>
    <LabelRow>
      <HiddenInput
        type="checkbox"
        id={name}
        name={name}
        checked={checked}
        onChange={onChange}
        disabled={disabled}
        aria-invalid={!!error}
        aria-describedby={error ? `${name}-error` : undefined}
      />
      <Box $checked={checked} $hasError={!!error} aria-hidden="true">
        {checked && (
          <svg viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M2 6L5 9L10 3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )}
      </Box>
      <LabelText>{label}</LabelText>
    </LabelRow>
    {error && <ErrorText id={`${name}-error`} role="alert">{error}</ErrorText>}
  </Wrapper>
);

export default Checkbox;
