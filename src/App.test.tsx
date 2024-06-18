import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { screen } from '@testing-library/dom';

import App from './App';
import { describe, expect, it } from 'vitest';

describe('App', () => {
  it('renders headline', () => {
    render(<App />);

    expect(screen.getByText('Go Register')).toBeInTheDocument();
  });
});
