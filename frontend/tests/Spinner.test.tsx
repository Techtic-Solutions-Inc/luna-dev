import { render, screen } from '@testing-library/react';
import { ThemeProvider } from '../src/theme';
import Spinner from '../src/components/Spinner';

describe('Spinner', () => {
  it('renders the loading label', () => {
    render(
      <ThemeProvider>
        <Spinner label="Loading profile..." />
      </ThemeProvider>,
    );

    expect(screen.getByRole('status')).toHaveTextContent('Loading profile...');
  });
});
