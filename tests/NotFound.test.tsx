import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import NotFound from '../src/components/NotFound';

describe('NotFound', () => {
  it('renders the 404 heading', () => {
    render(
      <MemoryRouter>
        <NotFound />
      </MemoryRouter>,
    );

    expect(
      screen.getByRole('heading', { name: '404 - Not Found' }),
    ).toBeInTheDocument();
  });
});
