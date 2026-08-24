import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import Input from '../src/components/ui/Input';
import { AppThemeProvider } from '../src/theme';

describe('Input', () => {
  it('associates the label with the control and supports disabled state', () => {
    render(
      <AppThemeProvider>
        <Input label="Email" placeholder="you@agentwise.com" disabled />
      </AppThemeProvider>,
    );

    const field = screen.getByLabelText('Email');
    expect(field).toBeDisabled();
    expect(field).toHaveAttribute('placeholder', 'you@agentwise.com');
  });
});
