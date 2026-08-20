import styled from 'styled-components';
import { typographyStyle } from '../../theme/typography';

const Wrap = styled.label`
  display: inline-flex;
  align-items: flex-start;
  gap: var(--padding-10);
  cursor: pointer;
  ${typographyStyle('body-sm-2')}
  color: var(--secondary);
`;

const Box = styled.input`
  width: 18px;
  height: 18px;
  margin-top: 2px;
  accent-color: var(--accent);
  cursor: pointer;

  &:focus-visible {
    outline: 2px solid var(--accent);
    outline-offset: 2px;
  }
`;

type CheckboxProps = {
  label: React.ReactNode;
  checked: boolean;
  onChange: (checked: boolean) => void;
  id?: string;
  disabled?: boolean;
};

export default function Checkbox({ label, checked, onChange, id, disabled }: CheckboxProps) {
  const checkboxId = id ?? 'checkbox';

  return (
    <Wrap htmlFor={checkboxId}>
      <Box
        id={checkboxId}
        type="checkbox"
        checked={checked}
        disabled={disabled}
        onChange={(event) => onChange(event.target.checked)}
      />
      <span>{label}</span>
    </Wrap>
  );
}
