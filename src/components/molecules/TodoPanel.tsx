import { useEffect } from 'react';

import { selectActiveListId } from '../../features/list/listSlice';
import { useAppDispatch, useAppSelector } from '../../features/store';
import { fetchTodoAsync } from '../../features/todo/todoAction';
import { selectTodos } from '../../features/todo/todoSlice';
import { TodoItem, TodoItemProps } from '../../components/molecules/TodoItem';
import {
  selectIsAsc,
  selectSortBy,
} from '../../features/sortOption/sortOptionSlice';
import { Container } from '@mui/material';

const TodoPanel = () => {
  const dispatch = useAppDispatch();
  const sortBy = useAppSelector(selectSortBy);
  const isAsc = useAppSelector(selectIsAsc);
  const todos = useAppSelector((state) => selectTodos(state, sortBy, isAsc));
  const activeListId = useAppSelector(selectActiveListId);

  // const handleClick = async (id: number) => {
  //   const listId = await dispatch(setActiveListId(id)).payload;
  //   // console.log(listId)
  //   // dispatch(fetchTodoAsync(listId))
  // };
  useEffect(() => {
    if (activeListId) {
      dispatch(fetchTodoAsync(activeListId));
    }
  }, [dispatch, activeListId]);

  return (
    <>
      <Container sx={{ overflow: 'auto', maxHeight: '100%', padding: 0 }}>
        {todos.length > 0 &&
          todos.map((todo: TodoItemProps) => (
            <TodoItem key={todo.id} {...todo} />
          ))}
      </Container>
    </>
  );
};
export default TodoPanel;
