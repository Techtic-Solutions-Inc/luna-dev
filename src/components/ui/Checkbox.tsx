import type { ReactNode } from 'react';
import styled from 'styled-components';
import { tokens } from '../../theme/tokens';

const Label = styled.label`
  display: flex;
  align-items: flex-start;
  gap: ${tokens.spacing['gap-8']};
  cursor: pointer;
  color: var(--color-14);
  font-family: ${tokens.typography['caption-4'].fontFamily}, sans-serif;
  font-size: ${tokens.typography['caption-4'].fontSize};
  font-weight: ${tokens.typography['caption-4'].fontWeight};
  line-height: ${tokens.typography['caption-4'].lineHeight};
`;

const Box = styled.input`
  width: 18px;
  height: 18px;
  margin-top: 1px;
  flex-shrink: 0;
  accent-color: var(--accent);
  cursor: pointer;
`;

interface CheckboxProps {
  id: string;
  name: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  children: ReactNode;
}

const Checkbox = ({ id, name, checked, onChange, children }: CheckboxProps) => (
  <Label htmlFor={id}>
    <Box
      id={id}
      name={name}
      type="checkbox"
      checked={checked}
      onChange={(event) => onChange(event.target.checked)}
    />
    {children}
  </Label>
);

export default Checkbox;
