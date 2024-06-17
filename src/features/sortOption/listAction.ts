import { createAsyncThunk } from '@reduxjs/toolkit';
import { API } from '../../const/api';
import axiosInstance from '../../utils/httpProvider';

export const fetchListAsync = createAsyncThunk(
  'list/fetchList',
  async (userId: number, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.get(`${API.USER_LIST(userId)}`, {});

      return res.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  },
);
