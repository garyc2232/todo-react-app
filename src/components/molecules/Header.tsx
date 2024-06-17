import { Button, Grid } from '@mui/material';
import { SortByComponent } from '../atoms/SortByComponent';
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

  const AddTodoBtn = () => {
    return (
      <Button onClick={() => handleOnCreateTodo()}>
        <AddCircleIcon />
      </Button>
    );
  };
  return (
    <Grid
      container
      direction={'row'}
      alignItems="center"
      justifyContent="center"
    >
      <Grid item xs={isMobileView ? 12 : 5}>
        <SortByComponent />
      </Grid>
      {isMobileView && (
        <Grid item xs={12}>
          <Grid
            container
            direction={'row'}
            alignItems="center"
            justifyContent="space-between"
          >
            <Grid item xs={6}>
              <SortDirectionBtn />
            </Grid>
            <Grid item xs={6}>
              <AddTodoBtn />
            </Grid>
          </Grid>
        </Grid>
      )}
      {!isMobileView && (
        <>
          <Grid item xs={5}>
            <SortDirectionBtn />
          </Grid>
          <Grid item xs={2}>
            <AddTodoBtn />
          </Grid>
        </>
      )}
    </Grid>
  );
};
