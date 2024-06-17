import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { API } from '../../const/api';
import { REFRESH_TOKEN } from '../../const/localStorageKey';
import { User } from '../../types/user.type';

export const loginAsync = createAsyncThunk(
  'auth/loginAsync',
  async (data: Omit<User, 'id'>, { rejectWithValue }) => {
    try {
      const res = await axios.post(API.SIGN_IN, { name: data.userName, password: data.password });
      console.log('login', res)
      return res.data;
    } catch (error: any) {
      console.log('login', error)
      return rejectWithValue(error.response.data)
    }
  }
);

export const registerAsync = createAsyncThunk(
  'auth/registerAsync',
  async (data: Omit<User, 'id'>, { rejectWithValue }) => {
    try {
      const res = await axios.post(API.USER, { name: data.userName, password: data.password });
      console.log('registerAsync', res)
      return res.data;
    } catch (error: any) {
      console.log('registerAsync', error)
      return rejectWithValue(error.response.data)
    }
  }
);

export const refreshJwtAsync = createAsyncThunk(
  'auth/refreshJwtAsync',
  async (_, { rejectWithValue }) => {
    try {
      const rt = localStorage.getItem(REFRESH_TOKEN);

      if (!rt) {
        rejectWithValue('No refresh token');
      }

      const res = await axios.post(API.REFRESH_JWT, {}, { headers: { Authorization: `Bearer ${rt}` } });

      return res.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data)
    }
  }
);