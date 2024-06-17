import { Container } from '@mui/material';
import { ListTab } from '../atoms/ListTab';
import { useAppDispatch, useAppSelector } from '../../features/store';
import {
  selectActiveListId,
  selectList,
  setActiveListId,
} from '../../features/list/listSlice';
import { useEffect } from 'react';
import { selectUserId } from '../../features/auth/authSlice';
import { fetchListAsync } from '../../features/list/listAction';

export const ListPanel = () => {
  const dispatch = useAppDispatch();
  const list = useAppSelector(selectList);
  const activeListId = useAppSelector(selectActiveListId);
  const userId = useAppSelector(selectUserId);

  const handleClick = (id: number) => {
    dispatch(setActiveListId(id)).payload;
  };

  useEffect(() => {
    dispatch(fetchListAsync(userId!));
  }, [dispatch]);
  return (
    <Container>
      {list.length > 0 &&
        list.map((l: any) => (
          <ListTab
            key={l.id}
            onClick={() => handleClick(l.id)}
            isActive={l.id === activeListId}
          >
            {l.name}
          </ListTab>
        ))}
    </Container>
  );
};
