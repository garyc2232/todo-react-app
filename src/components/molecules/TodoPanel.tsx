import { useEffect } from 'react';

import { selectActiveListId } from '../../features/list/listSlice';
import { useAppDispatch, useAppSelector } from '../../features/store';
import { fetchTodosAsync } from '../../features/todo/todoAction';
import {
  selectTodoIsLoading,
  selectTodos,
} from '../../features/todo/todoSlice';
import { TodoItem, TodoItemProps } from '../../components/molecules/TodoItem';
import {
  selectIsAsc,
  selectSortBy,
} from '../../features/sortOption/sortOptionSlice';
import { Box, Container, Typography } from '@mui/material';

const TodoPanel = () => {
  const dispatch = useAppDispatch();
  const sortBy = useAppSelector(selectSortBy);
  const isAsc = useAppSelector(selectIsAsc);
  const isTodoLoading = useAppSelector(selectTodoIsLoading);
  const todos = useAppSelector((state) => selectTodos(state, sortBy, isAsc));
  const activeListId = useAppSelector(selectActiveListId);

  useEffect(() => {
    if (activeListId) {
      dispatch(fetchTodosAsync(activeListId));
    }
  }, [dispatch, activeListId]);

  return (
    <>
      <Container
        sx={{ overflow: 'auto', height: '100%', maxHeight: '100%', padding: 0 }}
      >
        {todos.length > 0 ? (
          todos.map((todo: TodoItemProps) => (
            <TodoItem key={todo.id} {...todo} />
          ))
        ) : (
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              height: '100%',
            }}
          >
            <Typography
              variant="h3"
              sx={{ color: '#999', fontStyle: 'italic' }}
            >
              {isTodoLoading ? 'Loading...' : 'No Todo'}
            </Typography>
          </Box>
        )}
      </Container>
    </>
  );
};
export default TodoPanel;
