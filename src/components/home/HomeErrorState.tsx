import styled from "styled-components";

const Wrap = styled.main`
  display: flex;
  min-height: 40vh;
  align-items: center;
  justify-content: center;
  padding: ${({ theme }) => theme.spacing.padding20};
  color: ${({ theme }) => theme.colors.error};
  font-family: ${({ theme }) => theme.fonts.almarai};
  background: ${({ theme }) => theme.colors.background};
`;

export function HomeErrorState({ message }: { message: string }) {
  return (
    <Wrap role="alert">
      <p>{message}</p>
    </Wrap>
  );
}
