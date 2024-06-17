import { Button, Grid } from '@mui/material';
import { SortByBtn } from '../atoms/SortByBtn';
import { SortDirectionBtn } from '../atoms/SortDirectionBtn';
import useResponsiveView from '../../utils/customHook/useResponsiveView';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { useAppDispatch } from '../../features/store';
import { CreateTodoForm } from '../organisms/CreateTodoForm';
import { openModal } from '../../features/modal/modalSlice';
export const Header = () => {
  const { isMobileView } = useResponsiveView();
  const dispatch = useAppDispatch();

  const handleOnCreateTodo = () => {
    dispatch(openModal({ Body: <CreateTodoForm /> }));
  };
  return (
    <Grid
      container
      direction={isMobileView ? 'column' : 'row'}
      alignItems="center"
      justifyContent="center"
      spacing={2}
    >
      <Grid item xs={4}>
        <SortByBtn />
      </Grid>
      <Grid item xs={2}></Grid>
      <Grid item xs={4}>
        <SortDirectionBtn />
      </Grid>
      <Grid item xs={2}>
        <Button onClick={() => handleOnCreateTodo()}>
          <AddCircleIcon />
        </Button>
      </Grid>
    </Grid>
  );
};
