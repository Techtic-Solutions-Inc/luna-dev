import { useState } from 'react';
import type { InputHTMLAttributes } from 'react';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import styled from 'styled-components';
import { colors, radius, spacing } from '../../theme/tokens';
import { typographyStyle } from '../../theme/typography';

type PasswordInputProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> & {
  label: string;
  error?: string;
  hideLabel?: boolean;
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

const Control = styled.input<{ $hasError?: boolean }>`
  width: 100%;
  appearance: none;
  background: ${colors.color22};
  color: ${colors.secondary};
  border: 1px solid ${({ $hasError }) => ($hasError ? colors.color45 : colors.color49)};
  border-radius: ${radius.radius10000};
  padding: ${spacing.padding14} ${spacing.padding40} ${spacing.padding14} ${spacing.padding20};
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

const Toggle = styled.button`
  position: absolute;
  top: 50%;
  right: ${spacing.padding14};
  transform: translateY(-50%);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: none;
  background: transparent;
  color: ${colors.color57};
  cursor: pointer;
  padding: ${spacing.padding4};
`;

const ErrorText = styled.p`
  margin: 0;
  color: ${colors.color45};
  ${typographyStyle('caption4')}
`;

export default function PasswordInput({
  id,
  label,
  error,
  hideLabel = false,
  ...rest
}: PasswordInputProps) {
  const [visible, setVisible] = useState(false);
  const inputId = id ?? rest.name ?? 'password';

  return (
    <Field>
      <Label htmlFor={inputId} $visuallyHidden={hideLabel}>
        {label}
      </Label>
      <ControlWrap>
        <Control
          id={inputId}
          type={visible ? 'text' : 'password'}
          $hasError={Boolean(error)}
          aria-invalid={Boolean(error)}
          {...rest}
        />
        <Toggle
          type="button"
          aria-label={visible ? 'Hide password' : 'Show password'}
          onClick={() => setVisible((v) => !v)}
        >
          {visible ? <FiEyeOff size={18} aria-hidden /> : <FiEye size={18} aria-hidden />}
        </Toggle>
      </ControlWrap>
      {error ? <ErrorText role="alert">{error}</ErrorText> : null}
    </Field>
  );
}
