import { Button, Grid } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../features/store';
import { selectActiveListId } from '../../features/list/listSlice';
import { selectUserId } from '../../features/auth/authSlice';
import {
  deleteListAsync,
  fetchListAsync,
} from '../../features/list/listAction';
import { CreateListForm } from '../organisms/CreateListForm';
import { openModal } from '../../features/modal/modalSlice';

export const MenuFooter = () => {
  const dispatch = useAppDispatch();

  const activeListId = useAppSelector(selectActiveListId);
  const userId = useAppSelector(selectUserId);
  const handleOnDelete = async () => {
    !!activeListId && (await dispatch(deleteListAsync(activeListId)));
    await dispatch(fetchListAsync(userId!));
  };

  const handleOnCreate = async () => {
    dispatch(openModal({ Body: <CreateListForm /> }));
  };

  return (
    <Grid
      container
      direction={'column'}
      justifyContent="space-between"
      spacing={2}
    >
      <Grid item xs={12}>
        <Button variant="contained" fullWidth onClick={() => handleOnCreate()}>
          Add List
        </Button>
      </Grid>
      <Grid item xs={12}>
        <Button
          color="error"
          variant="contained"
          onClick={() => handleOnDelete()}
          fullWidth
        >
          Delete Selected List
        </Button>
      </Grid>
    </Grid>
  );
};
