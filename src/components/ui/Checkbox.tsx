import type { InputHTMLAttributes, ReactNode } from 'react';
import styled from 'styled-components';
import { colors, spacing } from '../../theme/tokens';
import { typographyStyle } from '../../theme/typography';

type CheckboxProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> & {
  label: ReactNode;
};

const Root = styled.label`
  display: inline-flex;
  align-items: flex-start;
  gap: ${spacing.gap8};
  cursor: pointer;
  color: ${colors.color93};
  ${typographyStyle('caption4')}
`;

const Box = styled.input`
  width: 1rem;
  height: 1rem;
  margin-top: 0.1rem;
  accent-color: ${colors.accent};
  flex-shrink: 0;
`;

export default function Checkbox({ id, label, ...rest }: CheckboxProps) {
  const checkboxId = id ?? rest.name ?? 'checkbox';
  return (
    <Root htmlFor={checkboxId}>
      <Box id={checkboxId} type="checkbox" {...rest} />
      <span>{label}</span>
    </Root>
  );
}
