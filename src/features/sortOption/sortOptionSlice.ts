import { createSlice } from '@reduxjs/toolkit';
import { SortOption } from '../../types/sortOption.type';

type SortOptionState = {
  sortBy: SortOption;
  isAsc: boolean;
};

const initialState: SortOptionState = {
  sortBy: 'id',
  isAsc: true,
};

export const sortOptionSlice = createSlice({
  name: 'sortOption',
  initialState,
  reducers: {
    setSortBy: (state, action) => {
      state.sortBy = action.payload;
    },
    setIsAsc: (state, action) => {
      state.isAsc = action.payload;
    },
  },
  selectors: {
    selectSortBy: (state) => state.sortBy,
    selectIsAsc: (state) => state.isAsc,
  },
});

export const { setSortBy, setIsAsc } = sortOptionSlice.actions;
export const { selectSortBy, selectIsAsc } = sortOptionSlice.selectors;
export default sortOptionSlice.reducer;
