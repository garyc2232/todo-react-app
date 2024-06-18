import { describe, it } from 'node:test';
import { authSlice, logout } from './authSlice';
import { expect, test } from 'vitest';
import { loginAsync } from './authAction';
import { ACCESS_TOKEN, REFRESH_TOKEN } from '../../const/localStorageKey';

describe('authSlice', () => {
  test('reducer', () => {
    it('should handle logout action', () => {
      const state = authSlice.reducer(undefined, logout());
      expect(state).toEqual({
        userId: null,
        userName: null,
        isAuthenticated: false,
        isLoading: false,
        error: null,
        newUser: {},
      });
    });
  });

  test('loginAsync.fulfilled', () => {
    it('should set isAuthenticated to true', () => {
      const state = authSlice.reducer(
        undefined,
        loginAsync.fulfilled(
          {
            id: 1,
            name: 'John',
            accessToken: 'token',
            refreshToken: 'refresh',
          },
          'requestId',
          { userName: 'John', password: 'password' },
        ),
      );
      expect(state.userId).toBe(1);
      expect(state.userName).toBe('John');
      expect(state.isAuthenticated).toBe(true);
      expect(localStorage.getItem(ACCESS_TOKEN)).toBe('token');
      expect(localStorage.getItem(REFRESH_TOKEN)).toBe('refresh');
    });

    it('should set Token to localStorage', () => {
      authSlice.reducer(
        undefined,
        loginAsync.fulfilled(
          {
            id: 1,
            name: 'John',
            accessToken: 'token',
            refreshToken: 'refresh',
          },
          'requestId',
          { userName: 'John', password: 'password' },
        ),
      );

      expect(localStorage.getItem(ACCESS_TOKEN)).toBe('token');
      expect(localStorage.getItem(REFRESH_TOKEN)).toBe('refresh');
    });
  });
});
