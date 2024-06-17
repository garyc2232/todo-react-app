import { ListTab } from '../components/atoms/ListTab';
import { useEffect } from 'react';
import { fetchListAsync } from '../features/list/listAction';
import {
  logout,
  selectUserId,
  selectUserName,
} from '../features/auth/authSlice';
import {
  selectActiveListId,
  selectList,
  setActiveListId,
} from '../features/list/listSlice';
import { useAppDispatch, useAppSelector } from '../features/store';
import { Button, Container, Grid } from '@mui/material';

import AddCircleIcon from '@mui/icons-material/AddCircle';
import { WelcomeBlock } from '../components/molecules/WelcomeBlock';
const LeftPanel = () => {
  const dispatch = useAppDispatch();
  const userId = useAppSelector(selectUserId);
  const userName = useAppSelector(selectUserName);
  const list = useAppSelector(selectList);
  const activeListId = useAppSelector(selectActiveListId);
  const handleClick = (id: number) => {
    dispatch(setActiveListId(id)).payload;
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  useEffect(() => {
    dispatch(fetchListAsync(userId!));
  }, [dispatch]);

  return (
    <>
      <Grid
        container
        direction="column"
        justifyContent="space-between"
        alignItems="stretch"
        style={{ height: '90vh' }}
      >
        <Grid item style={{ flex: '1 1 auto' }}>
          <WelcomeBlock userName={userName} handleLogout={handleLogout} />
        </Grid>
        <Grid item style={{ flex: '6 1 60%' }}>
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
        </Grid>
        <Grid item style={{ flex: '1 1 auto' }}>
          <Button>
            <AddCircleIcon />
          </Button>
        </Grid>
      </Grid>
    </>
  );
};
export default LeftPanel;
