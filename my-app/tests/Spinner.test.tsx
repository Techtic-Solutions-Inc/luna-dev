import { render, screen } from '@testing-library/react';
import type { ReactElement } from 'react';
import { ThemeProvider } from 'styled-components';
import Spinner from '../src/components/Spinner';
import { theme } from '../src/theme/theme';

const renderWithTheme = (ui: ReactElement) =>
  render(<ThemeProvider theme={theme}>{ui}</ThemeProvider>);

describe('Spinner', () => {
  it('renders loading state with accessible label', () => {
    renderWithTheme(<Spinner />);
    expect(screen.getByRole('status', { name: 'Loading' })).toBeInTheDocument();
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });
});
