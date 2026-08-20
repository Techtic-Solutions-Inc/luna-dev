import type { ReactNode } from 'react';
import styled from 'styled-components';
import { colors, spacing } from '../../theme/tokens';
import { typographyStyle } from '../../theme/typography';

type FormFieldProps = {
  label: string;
  htmlFor: string;
  error?: string;
  children: ReactNode;
};

const Field = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${spacing.gap6};
  width: 100%;
`;

const Label = styled.label`
  ${typographyStyle('caption4')}
  color: ${colors.color93};
`;

const ErrorText = styled.p`
  margin: 0;
  color: ${colors.color45};
  ${typographyStyle('caption4')}
`;

export default function FormField({ label, htmlFor, error, children }: FormFieldProps) {
  return (
    <Field>
      <Label htmlFor={htmlFor}>{label}</Label>
      {children}
      {error ? <ErrorText role="alert">{error}</ErrorText> : null}
    </Field>
  );
}
