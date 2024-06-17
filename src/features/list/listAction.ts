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

export const createListAsync = createAsyncThunk(
  'list/createList',
  async (listName: string, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.post(`${API.LIST}`, { name: listName });

      return res.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  },
);

export const deleteListAsync = createAsyncThunk(
  'list/deleteList',
  async (listId: number, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.delete(`${API.LISTS(listId)}`, {});

      return res.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  },
);
