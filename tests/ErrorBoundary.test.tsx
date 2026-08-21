import { render, screen } from '@testing-library/react';
import ErrorBoundary from '../src/components/ErrorBoundary';

const ProblemChild = () => {
  throw new Error('boom');
};

describe('ErrorBoundary', () => {
  const consoleError = console.error;

  beforeAll(() => {
    console.error = jest.fn();
  });

  afterAll(() => {
    console.error = consoleError;
  });

  it('renders the fallback UI when a child throws', () => {
    render(
      <ErrorBoundary>
        <ProblemChild />
      </ErrorBoundary>,
    );

    expect(
      screen.getByRole('heading', { name: 'Something went wrong.' }),
    ).toBeInTheDocument();
  });
});
