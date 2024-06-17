import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { loginAsync, refreshJwtAsync, registerAsync } from './authAction';
import { ACCESS_TOKEN, REFRESH_TOKEN } from '../../const/localStorageKey';
import { User } from '../../types/user.type';

type AuthState = {
  userId: User['id'] | null;
  userName: User['userName'] | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error?: string | null;
  newUser: {
    userName: string;
    password: string;
  };
};

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    userId: null,
    userName: null,
    isAuthenticated: false,
    isLoading: false,
    error: null,
    newUser: {},
  } as AuthState,
  reducers: {
    logout: (state) => {
      state.userId = null;
      state.userName = null;
      state.isAuthenticated = false;
      state.isLoading = false;
      state.error = null;
      localStorage.removeItem(ACCESS_TOKEN);
      localStorage.removeItem(REFRESH_TOKEN);
    },
  },
  extraReducers: (builder) => {
    builder
      // loginAsync
      .addCase(loginAsync.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginAsync.fulfilled, (state, action: PayloadAction<any>) => {
        state.userId = action.payload.id;
        state.userName = action.payload.name;
        state.isAuthenticated = true;
        state.isLoading = false;
        state.error = null;
        console.log(action.payload.userId);
        console.log('state', state.userId);
        localStorage.setItem(ACCESS_TOKEN, action.payload.accessToken);
        localStorage.setItem(REFRESH_TOKEN, action.payload.refreshToken);
      })
      .addCase(loginAsync.rejected, (state, action: PayloadAction<any>) => {
        state.isLoading = false;
        state.error = action.payload.message;
        localStorage.removeItem(ACCESS_TOKEN);
        localStorage.removeItem(REFRESH_TOKEN);
      })
      // registerAsync
      .addCase(registerAsync.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(registerAsync.fulfilled, (state, _) => {
        state.isLoading = false;
        state.error = null;
      })
      .addCase(registerAsync.rejected, (state, action: PayloadAction<any>) => {
        state.isLoading = false;
        state.error = action.payload.message;
      })
      // refreshJwtAsync
      .addCase(
        refreshJwtAsync.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.userId = action.payload.id;
          state.userName = action.payload.name;
          state.isAuthenticated = true;
          state.isLoading = false;
          state.error = null;
          localStorage.setItem(ACCESS_TOKEN, action.payload.accessToken);
          localStorage.setItem(REFRESH_TOKEN, action.payload.refreshToken);
        },
      )
      .addCase(refreshJwtAsync.rejected, (state, _) => {
        state.isLoading = false;
        localStorage.removeItem(ACCESS_TOKEN);
        localStorage.removeItem(REFRESH_TOKEN);
      });
  },
  selectors: {
    selectUserId: (state) => state.userId,
    selectUserName: (state) => state.userName,
    selectIsAuthenticated: (state) => state.isAuthenticated,
    selectIsLoading: (state) => state.isLoading,
    selectError: (state) => state.error,
  },
});

export const { logout } = authSlice.actions;
export const {
  selectUserId,
  selectUserName,
  selectIsAuthenticated,
  selectIsLoading,
  selectError,
} = authSlice.selectors;
export default authSlice.reducer;
