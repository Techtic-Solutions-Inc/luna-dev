import { forwardRef } from 'react';
import styled from 'styled-components';
import { typographyStyle } from '../../theme/typography';

const Banner = styled.div`
  ${typographyStyle('body-sm-2')}
  padding: var(--padding-12) var(--padding-16);
  border-radius: var(--radius-8);
  background: var(--error);
  color: var(--color-45);
  border: 1px solid var(--color-45);
`;

type FormErrorProps = {
  message: string;
  id?: string;
};

const FormError = forwardRef<HTMLDivElement, FormErrorProps>(function FormError({ message, id }, ref) {
  if (!message) return null;

  return (
    <Banner
      ref={ref}
      id={id}
      role="alert"
      aria-live="assertive"
      tabIndex={-1}
    >
      {message}
    </Banner>
  );
});

export default FormError;
