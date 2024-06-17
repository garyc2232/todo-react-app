import { createAsyncThunk } from '@reduxjs/toolkit';
import { API } from '../../const/api';
import axiosInstance from '../../utils/httpProvider';

export const fetchStatusAsync = createAsyncThunk(
  'status/fetchStatus',
  async (_, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.get(API.STATUS);

      return res.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  },
);
