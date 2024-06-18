import '@testing-library/jest-dom';
import { screen } from '@testing-library/dom';

import { WelcomeBlock } from './WelcomeBlock';
import { describe, expect, it } from 'vitest';
import { renderWithProviders } from '../../../tests/testUtils';
import { configureStore } from '@reduxjs/toolkit';
import { AuthState, authSlice } from '../../features/auth/authSlice';

describe('App', () => {
  it('renders headline', () => {
    const store = configureStore({
      reducer: {
        auth: authSlice.reducer,
      },
      preloadedState: {
        auth: {
          userId: 1,
          userName: 'Mock User name',
          isAuthenticated: false,
          isLoading: false,
          error: null,
          newUser: {},
        } as AuthState,
      },
    });
    renderWithProviders(<WelcomeBlock />, { store });

    expect(screen.getByText('Welcome Mock User name')).toBeInTheDocument();
  });
});
