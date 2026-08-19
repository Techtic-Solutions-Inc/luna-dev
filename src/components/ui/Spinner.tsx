import styled, { keyframes } from 'styled-components';

const spin = keyframes`
  to { transform: rotate(360deg); }
`;

const SpinnerCircle = styled.div`
  width: 32px;
  height: 32px;
  border: 3px solid var(--color-24);
  border-top-color: var(--color-accent);
  border-radius: 50%;
  animation: ${spin} 0.6s linear infinite;
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
`;

const Spinner: React.FC = () => (
  <Wrapper role="status" aria-label="Loading">
    <SpinnerCircle />
  </Wrapper>
);

export default Spinner;
