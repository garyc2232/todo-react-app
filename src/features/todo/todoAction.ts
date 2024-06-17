import { createAsyncThunk } from '@reduxjs/toolkit';
import { API } from '../../const/api';
import axiosInstance from '../../utils/httpProvider';
import { TodoCreateDto, TodoUpdateDto } from '../../types/todo.type';

export const fetchTodosAsync = createAsyncThunk(
  'todo/fetchTodos',
  async (listId: number, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.get(API.LIST_TODOS(listId));

      return res.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  },
);

export const fetchTodoAsync = createAsyncThunk(
  'todo/fetchTodo',
  async (payload: { listId: number; userId: number }, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.get(
        API.LIST_TODO(payload.listId, payload.userId),
      );

      return res.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  },
);

export const updateTodoAsync = createAsyncThunk(
  'todo/updateTodo',
  async (
    {
      listId,
      todoId,
      data,
    }: { listId: number; todoId: number; data: TodoUpdateDto },
    { rejectWithValue },
  ) => {
    try {
      const res = await axiosInstance.patch(
        API.LIST_TODO(listId, todoId),
        data,
      );

      return res.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  },
);

export const deleteTodoAsync = createAsyncThunk(
  'todo/deleteTodo',
  async (
    { listId, todoId }: { listId: number; todoId: number },
    { rejectWithValue },
  ) => {
    try {
      const res = await axiosInstance.delete(API.LIST_TODO(listId, todoId));

      return res.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  },
);

export const createTodoAsync = createAsyncThunk(
  'todo/createTodo',
  async (
    { listId, data }: { listId: number; data: TodoCreateDto },
    { rejectWithValue },
  ) => {
    try {
      const res = await axiosInstance.post(API.LIST_TODOS(listId), data);

      return res.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  },
);
