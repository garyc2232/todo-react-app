import { Button, Grid } from '@mui/material';
import { SortByComponent } from '../atoms/SortByComponent';
import { SortDirectionBtn } from '../atoms/SortDirectionBtn';
import useResponsiveView from '../../utils/customHook/useResponsiveView';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { useAppDispatch } from '../../features/store';
import { CreateTodoForm } from '../organisms/CreateTodoForm';
import { openModal } from '../../features/modal/modalSlice';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import { FilterForm } from '../organisms/FilterForm';
export const Header = () => {
  const { isMobileView } = useResponsiveView();
  const dispatch = useAppDispatch();

  const handleOnCreateTodo = () => {
    dispatch(openModal({ Body: <CreateTodoForm /> }));
  };

  const handleFilter = () => {
    dispatch(openModal({ Body: <FilterForm /> }));
  };

  const AddTodoBtn = () => (
    <Button onClick={() => handleOnCreateTodo()}>
      <AddCircleIcon />
    </Button>
  );
  const FilterBtn = () => (
    <Button onClick={() => handleFilter()}>
      <FilterAltIcon />
    </Button>
  );

  return (
    <Grid
      container
      direction={'row'}
      alignItems="center"
      justifyContent="center"
    >
      <Grid item xs={isMobileView ? 12 : 4}>
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
            <Grid item xs={4}>
              <SortDirectionBtn />
            </Grid>
            <Grid item xs={4}>
              <AddTodoBtn />
            </Grid>
            <Grid item xs={4}>
              <FilterBtn />
            </Grid>
          </Grid>
        </Grid>
      )}
      {!isMobileView && (
        <>
          <Grid item xs={4}>
            <SortDirectionBtn />
          </Grid>
          <Grid item xs={2}>
            <AddTodoBtn />
          </Grid>
          <Grid item xs={2}>
            <FilterBtn />
          </Grid>
        </>
      )}
    </Grid>
  );
};
