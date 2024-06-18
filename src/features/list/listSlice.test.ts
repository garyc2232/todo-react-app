import { describe, it } from 'node:test';
import { expect, test } from 'vitest';
import { ListState, listSlice, setActiveListId } from './listSlice';
import { fetchListAsync } from './listAction';

describe('listSlice', () => {
  const initialState: ListState = {
    lists: [],
    activeListId: null,
  };

  const mockListData = [
    { id: 1, name: 'Todo 1', userId: 1, priority: 0, status: 'Not Started' },
  ];

  test('reducer', () => {
    it('should setActiveListId', () => {
      const state = listSlice.reducer(initialState, setActiveListId(1));
      expect(state.activeListId).toEqual(1);
    });
  });

  test('fetchListAsync.fulfilled', () => {
    it('should set lists in store', () => {
      const userId = 1;
      const state = listSlice.reducer(
        initialState,
        fetchListAsync.fulfilled(mockListData, 'requestId', userId),
      );

      expect(state.activeListId).toEqual(mockListData[0].id);
      expect(state.lists).toEqual(mockListData);
    });
  });
});
