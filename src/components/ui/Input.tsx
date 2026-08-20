import styled from 'styled-components';
import { typographyStyle } from '../../theme/typography';

export const Field = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--padding-6);
  width: 100%;
`;

export const Label = styled.label`
  ${typographyStyle('body-sm-2')}
  color: var(--secondary);
  opacity: 0.85;
`;

export const StyledInput = styled.input<{ $hasError?: boolean }>`
  ${typographyStyle('body-sm-2')}
  width: 100%;
  padding: var(--padding-16) var(--padding-20);
  border-radius: var(--radius-10000);
  border: 1px solid ${({ $hasError }) => ($hasError ? 'var(--color-45)' : 'var(--color-44)')};
  background: var(--color-34);
  color: var(--secondary);

  &::placeholder {
    color: var(--color-57);
  }

  &:focus {
    outline: none;
    border-color: var(--accent);
    box-shadow: 0 0 0 2px var(--color-26);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

export const ErrorText = styled.span`
  ${typographyStyle('caption-4')}
  color: var(--color-45);
`;

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  error?: string;
  hideLabel?: boolean;
};

export default function Input({ label, error, hideLabel = false, id, ...rest }: InputProps) {
  const inputId = id ?? rest.name ?? label.toLowerCase().replace(/\s+/g, '-');

  return (
    <Field>
      {!hideLabel && <Label htmlFor={inputId}>{label}</Label>}
      <StyledInput id={inputId} aria-invalid={Boolean(error)} aria-describedby={error ? `${inputId}-error` : undefined} $hasError={Boolean(error)} {...rest} />
      {error ? (
        <ErrorText id={`${inputId}-error`} role="alert">
          {error}
        </ErrorText>
      ) : null}
    </Field>
  );
}
