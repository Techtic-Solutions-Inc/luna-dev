import type { InputHTMLAttributes, ReactNode } from 'react';
import styled from 'styled-components';
import { colors, radius, spacing } from '../../theme/tokens';
import { typographyStyle } from '../../theme/typography';

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  error?: string;
  hideLabel?: boolean;
  endAdornment?: ReactNode;
};

const Field = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${spacing.gap6};
  width: 100%;
`;

const Label = styled.label<{ $visuallyHidden?: boolean }>`
  ${typographyStyle('caption4')}
  color: ${colors.color93};
  ${({ $visuallyHidden }) =>
    $visuallyHidden
      ? `
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border: 0;
  `
      : ''}
`;

const ControlWrap = styled.div`
  position: relative;
  width: 100%;
`;

const Control = styled.input<{ $hasError?: boolean; $hasAdornment?: boolean }>`
  width: 100%;
  appearance: none;
  background: ${colors.color22};
  color: ${colors.secondary};
  border: 1px solid ${({ $hasError }) => ($hasError ? colors.color45 : colors.color24)};
  border-radius: ${radius.radius10000};
  padding: ${spacing.padding14}
    ${({ $hasAdornment }) => ($hasAdornment ? spacing.padding40 : spacing.padding20)}
    ${spacing.padding14} ${spacing.padding20};
  ${typographyStyle('body')}
  outline: none;

  &::placeholder {
    color: ${colors.color57};
  }

  &:focus-visible {
    border-color: ${colors.accent};
    outline: 2px solid ${colors.accent};
    outline-offset: 1px;
  }

  &:disabled {
    opacity: 0.6;
  }
`;

const Adornment = styled.div`
  position: absolute;
  top: 50%;
  right: ${spacing.padding14};
  transform: translateY(-50%);
  display: inline-flex;
  align-items: center;
  justify-content: center;
`;

const ErrorText = styled.p`
  margin: 0;
  color: ${colors.color45};
  ${typographyStyle('caption4')}
`;

export default function Input({
  id,
  label,
  error,
  hideLabel = false,
  endAdornment,
  ...rest
}: InputProps) {
  const inputId = id ?? rest.name ?? label.toLowerCase().replace(/\s+/g, '-');
  return (
    <Field>
      <Label htmlFor={inputId} $visuallyHidden={hideLabel}>
        {label}
      </Label>
      <ControlWrap>
        <Control
          id={inputId}
          $hasError={Boolean(error)}
          $hasAdornment={Boolean(endAdornment)}
          aria-invalid={Boolean(error)}
          {...rest}
        />
        {endAdornment ? <Adornment>{endAdornment}</Adornment> : null}
      </ControlWrap>
      {error ? <ErrorText role="alert">{error}</ErrorText> : null}
    </Field>
  );
}
