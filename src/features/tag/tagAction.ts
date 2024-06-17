import { createAsyncThunk } from '@reduxjs/toolkit';
import { API } from '../../const/api';
import axiosInstance from '../../utils/httpProvider';

export const fetchTagAsync = createAsyncThunk(
  'tag/fetchTag',
  async (_, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.get(API.TAG);

      return res.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data)
    }
  }
);