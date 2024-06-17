import { createSlice } from '@reduxjs/toolkit';
import { Tag } from '../../types/tag.type';

export type FilterState = {
  tags: Tag[];
  name: string;
  priority: number;
  status: string;
};

const initialState: FilterState = {
  tags: [],
  name: '',
  priority: 0,
  status: '',
};
export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setTodoTagsFilter: (state, action) => {
      state.tags = action.payload;
    },
    setTodoNameFilter: (state, action) => {
      state.name = action.payload;
    },
    setTodoPriorityFilter: (state, action) => {
      state.priority = typeof action.payload === 'number' ? action.payload : 0;
    },
    setTodoStatusFilter: (state, action) => {
      state.status = action.payload;
    },
    resetFilter: (state) => {
      state.name = initialState.name;
      state.tags = initialState.tags;
      state.priority = initialState.priority;
      state.status = initialState.status;
    },
  },
  selectors: {
    selectTodoTagsFilter: (state) => state.tags,
    selectTodoNameFilter: (state) => state.name,
    selectTodoPriorityFilter: (state) => state.priority,
    selectTodoStatusFilter: (state) => state.status,
  },
});

export const {
  resetFilter,
  setTodoTagsFilter,
  setTodoNameFilter,
  setTodoPriorityFilter,
  setTodoStatusFilter,
} = filterSlice.actions;
export const {
  selectTodoTagsFilter,
  selectTodoNameFilter,
  selectTodoPriorityFilter,
  selectTodoStatusFilter,
} = filterSlice.selectors;
export default filterSlice.reducer;
