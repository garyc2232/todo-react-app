import { createSlice } from '@reduxjs/toolkit';
import { Todo, TodoCreateDto } from '../../types/todo.type';
import { fetchTodoAsync } from './todoAction';
import { sortOption } from '../../types/sortOption.type';

type TodoState = {
  todos: Todo[];
  isLoading: boolean;
  error?: string | null;
  newTodo?: TodoCreateDto | null;
};

export const todoSlice = createSlice({
  name: 'todo',
  initialState: {
    todos: [],
    isLoading: false,
    error: null,
    newTodo: null,
  } as TodoState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodoAsync.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(fetchTodoAsync.fulfilled, (state, action) => {
        state.todos = action.payload;
        state.isLoading = false;
      });
  },
});

export const selectTodos = (state, sortBy: sortOption = 'id', isASC = true) => {
  const sortedTodos = [...state.todo.todos];

  // Sort the todos based on the selected field and sort order
  sortedTodos.sort((a, b) => {
    const aValue = a[sortBy];
    const bValue = b[sortBy];

    if (isASC) {
      if (aValue < bValue) return -1;
      if (aValue > bValue) return 1;
    } else {
      if (aValue > bValue) return -1;
      if (aValue < bValue) return 1;
    }

    return 0;
  });

  return sortedTodos;
};

export const {} = todoSlice.actions;
// export const { selectTodos } = todoSlice.selectors;
export default todoSlice.reducer;
