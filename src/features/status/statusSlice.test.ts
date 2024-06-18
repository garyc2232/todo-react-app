import { describe, it } from 'node:test';
import { expect, test } from 'vitest';
import { StatusState, statusSlice } from './statusSlice';
import { fetchStatusAsync } from './statusAction';

describe('statusSlice', () => {
  const initialState: StatusState = {
    status: [],
  };

  const mockListData = [
    { id: 1, name: 'Status 1' },
    { id: 2, name: 'Status 2' },
  ];

  test('fetchTagAsync.fulfilled', () => {
    it('should set status in store', () => {
      const state = statusSlice.reducer(
        initialState,
        fetchStatusAsync.fulfilled(mockListData, 'requestId'),
      );

      expect(state.status).toEqual(mockListData);
    });
  });
});
