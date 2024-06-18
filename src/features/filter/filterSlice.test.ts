import { describe, it } from 'node:test';
import {
  FilterState,
  filterSlice,
  resetFilter,
  setTodoNameFilter,
  setTodoPriorityFilter,
  setTodoStatusFilter,
  setTodoTagsFilter,
} from './filterSlice';
import { expect, test } from 'vitest';

describe('filterSlice', () => {
  const initialState: FilterState = {
    tags: [],
    name: '',
    priority: 0,
    status: '',
  };
  test('reducer', () => {
    it('should set Todo Name Filter', () => {
      const state = filterSlice.reducer(
        initialState,
        setTodoNameFilter('queryName'),
      );
      expect(state.name).toBe('queryName');
    });
    it('should set Todo Tag Filter', () => {
      const state = filterSlice.reducer(
        initialState,
        setTodoTagsFilter([1, 2, 3]),
      );
      expect(state.tags).toEqual([1, 2, 3]);
    });

    it('should set Todo Priority Filter', () => {
      const state = filterSlice.reducer(initialState, setTodoPriorityFilter(5));
      expect(state.priority).toBe(5);
    });

    it('should set Todo Status Filter', () => {
      const state = filterSlice.reducer(
        initialState,
        setTodoStatusFilter('In Progress'),
      );
      expect(state.status).toBe('In Progress');
    });

    it('should reset Filter', () => {
      let state = filterSlice.reducer(
        initialState,
        setTodoStatusFilter('In Progress'),
      );
      state = filterSlice.reducer(state, setTodoPriorityFilter(5));
      expect(state).toEqual({
        tags: [],
        name: '',
        priority: 5,
        status: 'In Progress',
      });

      state = filterSlice.reducer(state, resetFilter());
      expect(state).toEqual(initialState);
    });
  });
});
