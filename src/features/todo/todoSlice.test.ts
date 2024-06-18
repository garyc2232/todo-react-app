import { describe, it } from 'node:test';
import { expect, test } from 'vitest';
import { selectTodosWithFilter, todoSlice, TodoState } from './todoSlice';
import { fetchTodosAsync } from './todoAction';

describe('todoSlice', () => {
  const initialState: TodoState = {
    todos: [],
    isLoading: false,
    error: null,
    newTodo: null,
  };

  const mockListData = [
    {
      id: 1,
      name: 'Todo 1',
      status: 'In Progress',
      priority: 1,
      tags: ['Tag 1', 'Tag 2'],
    },
    {
      id: 2,
      name: 'Todo 2',
      status: 'Not Started',
      priority: 6,
      tags: ['Tag 1', 'Tag 3'],
    },
  ];

  test('fetchTagAsync.fulfilled', () => {
    it('should set todos in store', () => {
      const listId = 1;
      const state = todoSlice.reducer(
        initialState,
        fetchTodosAsync.fulfilled(mockListData, 'requestId', listId),
      );

      expect(state.todos).toEqual(mockListData);
    });
  });

  test('selectTodosWithFilter', () => {
    const state = {
      todo: {
        todos: mockListData,
      },
    };
    it('should sort by id', () => {
      const sortBy = 'id';
      const sortByAsc = selectTodosWithFilter(state, sortBy, true);
      expect(sortByAsc[0][sortBy]).toBe(mockListData[0][sortBy]);
      expect(sortByAsc[1][sortBy]).toBe(mockListData[1][sortBy]);

      const sortByDesc = selectTodosWithFilter(state, sortBy, false);
      expect(sortByDesc[0][sortBy]).toBe(mockListData[1][sortBy]);
      expect(sortByDesc[1][sortBy]).toBe(mockListData[0][sortBy]);
    });

    it('should sort by name', () => {
      const sortBy = 'name';
      const sortByAsc = selectTodosWithFilter(state, sortBy, true);
      expect(sortByAsc[0][sortBy]).toBe(mockListData[0][sortBy]);
      expect(sortByAsc[1][sortBy]).toBe(mockListData[1][sortBy]);

      const sortByDesc = selectTodosWithFilter(state, sortBy, false);
      expect(sortByDesc[0][sortBy]).toBe(mockListData[1][sortBy]);
      expect(sortByDesc[1][sortBy]).toBe(mockListData[0][sortBy]);
    });

    it('should sort by status', () => {
      const sortBy = 'status';
      const sortByAsc = selectTodosWithFilter(state, sortBy, true);
      expect(sortByAsc[0][sortBy]).toBe(mockListData[0][sortBy]);
      expect(sortByAsc[1][sortBy]).toBe(mockListData[1][sortBy]);

      const sortByDesc = selectTodosWithFilter(state, sortBy, false);
      expect(sortByDesc[0][sortBy]).toBe(mockListData[1][sortBy]);
      expect(sortByDesc[1][sortBy]).toBe(mockListData[0][sortBy]);
    });
    it('should sort by priority', () => {
      const sortBy = 'priority';
      const sortByAsc = selectTodosWithFilter(state, sortBy, true);
      expect(sortByAsc[0][sortBy]).toBe(mockListData[0][sortBy]);
      expect(sortByAsc[1][sortBy]).toBe(mockListData[1][sortBy]);

      const sortByDesc = selectTodosWithFilter(state, sortBy, false);
      expect(sortByDesc[0][sortBy]).toBe(mockListData[1][sortBy]);
      expect(sortByDesc[1][sortBy]).toBe(mockListData[0][sortBy]);
    });
  });
});
