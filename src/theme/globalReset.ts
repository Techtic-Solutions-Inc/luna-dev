/** Global reset rules mirrored in styled-components GlobalStyle (JAW-9705). */
export const globalResetRules = `
  *, *::before, *::after {
    box-sizing: border-box;
  }
  body {
    margin: 0;
    min-height: 100vh;
  }
`;
