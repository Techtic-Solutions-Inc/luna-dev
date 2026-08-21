import { render, screen } from '@testing-library/react';
import Spinner from '../src/components/Spinner';
import ThemeProvider from '../src/theme/ThemeProvider';

describe('Spinner', () => {
  it('renders a loading status', () => {
    render(
      <ThemeProvider>
        <Spinner />
      </ThemeProvider>,
    );

    expect(screen.getByRole('status')).toHaveTextContent('Loading...');
  });
});
