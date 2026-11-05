import styled from "styled-components";
import { Link } from "react-router-dom";
import { paths } from "../routes/paths";

const Wrap = styled.main`
  display: flex;
  min-height: 100vh;
  align-items: center;
  justify-content: center;
  padding: ${({ theme }) => theme.spacing.padding20};
  background: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.textPrimary};
  font-family: ${({ theme }) => theme.fonts.almarai};
  text-align: center;
`;

const HomeLink = styled(Link)`
  color: ${({ theme }) => theme.colors.info};
`;

export function NotFound() {
  return (
    <Wrap role="alert">
      <div>
        <h1>Page not found</h1>
        <p>
          <HomeLink to={paths.home}>Return to the marketing home</HomeLink>
        </p>
      </div>
    </Wrap>
  );
}
