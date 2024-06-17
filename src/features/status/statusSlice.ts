import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { fetchStatusAsync } from './statusAction';

import { Status } from '../../types/status.type';

type StatusState = {
  status: Status[];
};

const initialState: StatusState = {
  status: [],
};
export const statusSlice = createSlice({
  name: 'status',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      fetchStatusAsync.fulfilled,
      (state, action: PayloadAction<Status[]>) => {
        state.status = action.payload.sort((a, b) => a.sequence - b.sequence);
      },
    );
  },
  selectors: {
    selectStatus: (state) => state.status,
  },
});

export const {} = statusSlice.actions;
export const { selectStatus } = statusSlice.selectors;
export default statusSlice.reducer;
