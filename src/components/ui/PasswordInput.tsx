import { useState } from 'react';
import type { InputHTMLAttributes } from 'react';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import styled from 'styled-components';
import { colors, spacing } from '../../theme/tokens';
import Input from './Input';

type PasswordInputProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> & {
  label: string;
  error?: string;
  hideLabel?: boolean;
};

const Toggle = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: none;
  background: transparent;
  color: ${colors.color57};
  cursor: pointer;
  padding: ${spacing.padding4};
`;

export default function PasswordInput({
  id,
  label,
  error,
  hideLabel = false,
  ...rest
}: PasswordInputProps) {
  const [visible, setVisible] = useState(false);

  return (
    <Input
      id={id}
      label={label}
      error={error}
      hideLabel={hideLabel}
      type={visible ? 'text' : 'password'}
      endAdornment={
        <Toggle
          type="button"
          aria-label={visible ? 'Hide password' : 'Show password'}
          onClick={() => setVisible((v) => !v)}
        >
          {visible ? <FiEyeOff size={18} aria-hidden /> : <FiEye size={18} aria-hidden />}
        </Toggle>
      }
      {...rest}
    />
  );
}
