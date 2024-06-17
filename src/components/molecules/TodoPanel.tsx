import { useEffect } from 'react';

import {
  selectActiveListId,
  setActiveListId,
} from '../../features/list/listSlice';
import { useAppDispatch, useAppSelector } from '../../features/store';
import { fetchTodoAsync } from '../../features/todo/todoAction';
import { selectTodos } from '../../features/todo/todoSlice';
import { Todo } from '../../types/todo.type';
import { TodoItem } from '../../components/molecules/TodoItem';
import {
  selectIsAsc,
  selectSortBy,
} from '../../features/sortOption/sortOptionSlice';

const TodoPanel = () => {
  const dispatch = useAppDispatch();
  const sortBy = useAppSelector(selectSortBy);
  const isAsc = useAppSelector(selectIsAsc);
  const todos = useAppSelector((state) => selectTodos(state, sortBy, isAsc));
  const activeListId = useAppSelector(selectActiveListId);

  const handleClick = async (id: number) => {
    const listId = await dispatch(setActiveListId(id)).payload;
    // console.log(listId)
    // dispatch(fetchTodoAsync(listId))
  };
  useEffect(() => {
    if (activeListId) {
      dispatch(fetchTodoAsync(activeListId));
    }
  }, [dispatch, activeListId]);

  return (
    <>
      {todos.length > 0 &&
        todos.map((todo: Todo) => <TodoItem key={todo.id} {...todo} />)}
    </>
  );
};
export default TodoPanel;
