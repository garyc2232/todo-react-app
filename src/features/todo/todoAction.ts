import { createAsyncThunk } from '@reduxjs/toolkit';
import { API } from '../../const/api';
import axiosInstance from '../../utils/httpProvider';
import { TodoCreateDto } from '../../types/todo.type';

export const fetchTodoAsync = createAsyncThunk(
  'list/fetchTodo',
  async (listId: number, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.get(API.LIST_TODO(listId));

      return res.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  },
);

export const createTodoAsync = createAsyncThunk(
  'list/createTodo',
  async (
    { listId, data }: { listId: number; data: TodoCreateDto },
    { rejectWithValue },
  ) => {
    try {
      const res = await axiosInstance.post(API.LIST_TODO(listId), data);

      return res.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  },
);
