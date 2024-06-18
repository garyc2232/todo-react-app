import { describe, it } from 'node:test';
import { expect, test } from 'vitest';
import { TagState, tagSlice } from './tagSlice';
import { fetchTagAsync } from './tagAction';

describe('tagSlice', () => {
  const initialState: TagState = {
    tags: [],
  };

  const mockListData = [
    { id: 1, name: 'Tag 1' },
    { id: 2, name: 'Tag 2' },
  ];

  test('fetchTagAsync.fulfilled', () => {
    it('should set tags in store', () => {
      const state = tagSlice.reducer(
        initialState,
        fetchTagAsync.fulfilled(mockListData, 'requestId'),
      );

      expect(state.tags).toEqual(mockListData);
    });
  });
});
