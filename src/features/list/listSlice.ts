import { createSlice } from '@reduxjs/toolkit';
import { createListAsync, fetchListAsync } from './listAction';

export type ListState = {
  lists: [];
  activeListId: number | null;
};

const initialState: ListState = {
  lists: [],
  activeListId: null,
};

export const listSlice = createSlice({
  name: 'list',
  initialState,
  reducers: {
    setActiveListId: (state, action) => {
      state.activeListId = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchListAsync.fulfilled, (state, action) => {
      state.lists = action.payload;
      state.activeListId = action.payload[0].id;
    });
    builder.addCase(createListAsync.fulfilled, (state, action) => {
      state.activeListId = action.payload.id;
    });
  },
  selectors: {
    selectActiveListId: (state) => state.activeListId,
    selectList: (state) => state.lists,
  },
});

export const { setActiveListId } = listSlice.actions;
export const { selectActiveListId, selectList } = listSlice.selectors;
export default listSlice.reducer;
