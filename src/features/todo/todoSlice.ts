import { createSlice } from '@reduxjs/toolkit';
import { Todo, TodoCreateDto } from '../../types/todo.type';
import { fetchTodosAsync } from './todoAction';
import { SortOption } from '../../types/sortOption.type';
import { FilterState } from '../filter/filterSlice';

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
      .addCase(fetchTodosAsync.pending, (state, _) => {
        state.isLoading = true;
      })
      .addCase(fetchTodosAsync.fulfilled, (state, action) => {
        state.todos = action.payload;
        state.isLoading = false;
      });
  },
  selectors: {
    selectTodoIsLoading: (state) => state.isLoading,
  },
});

export const selectTodosWithFilter = (
  state: any,
  sortBy: SortOption = 'id',
  isASC = true,
  filter: FilterState,
) => {
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

  console.log('sortedTodos', sortedTodos);

  let filteredTodos = sortedTodos;
  if (!!filter.status) {
    filteredTodos = sortedTodos.filter((todo) => todo.status === filter.status);
  }
  if (!!filter.name) {
    filteredTodos = filteredTodos.filter((todo) =>
      todo.name.includes(filter.name),
    );
  }
  if (!!filter.priority && filter.priority !== 0) {
    filteredTodos = filteredTodos.filter(
      (todo) => todo.priority >= filter.priority,
    );
  }
  if (!!filter.tags && filter.tags.length > 0) {
    const filteredTagNames = filter.tags.map((tag) => tag.name);
    filteredTodos = filteredTodos.filter((item) =>
      item.tags.some((tag: any) => filteredTagNames.includes(tag)),
    );
  }

  return filteredTodos;
};

export const {} = todoSlice.actions;
export const { selectTodoIsLoading } = todoSlice.selectors;
export default todoSlice.reducer;
