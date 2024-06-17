import {
  Autocomplete,
  Button,
  Container,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@mui/material';
import { useFormik } from 'formik';
import { useAppDispatch, useAppSelector } from '../../features/store';
import { closeModal } from '../../features/modal/modalSlice';
import {
  FilterState,
  selectTodoNameFilter,
  selectTodoPriorityFilter,
  selectTodoStatusFilter,
  selectTodoTagsFilter,
  setTodoNameFilter,
  setTodoPriorityFilter,
  setTodoStatusFilter,
  setTodoTagsFilter,
} from '../../features/filter/filterSlice';
import { selectStatus } from '../../features/status/statusSlice';
import { selectTags } from '../../features/tag/tagSlice';

export const FilterForm = () => {
  const dispatch = useAppDispatch();
  const status = useAppSelector(selectStatus);
  const tags = useAppSelector(selectTags);

  const todoTagsFilter = useAppSelector(selectTodoTagsFilter);
  const todoNameFilter = useAppSelector(selectTodoNameFilter);
  const todoPriorityFilter = useAppSelector(selectTodoPriorityFilter);
  const todoStatusFilter = useAppSelector(selectTodoStatusFilter);

  const handleReset = () => {
    dispatch(setTodoNameFilter(''));
    dispatch(setTodoPriorityFilter(0));
    dispatch(setTodoStatusFilter(''));
    dispatch(setTodoTagsFilter([]));
    formik.resetForm();
    dispatch(closeModal());
  };

  const formik = useFormik({
    initialValues: {
      tags: todoTagsFilter,
      name: todoNameFilter,
      priority: todoPriorityFilter,
      status: todoStatusFilter,
    } as FilterState,
    validateOnChange: false,
    validateOnBlur: false,
    onSubmit: (values: FilterState) => {
      dispatch(setTodoNameFilter(values.name));
      dispatch(setTodoPriorityFilter(values.priority));
      dispatch(setTodoStatusFilter(values.status));
      dispatch(setTodoTagsFilter(values.tags));
      dispatch(closeModal());
    },
  });

  return (
    <Container maxWidth="sm">
      <form onSubmit={formik.handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={9}>
            <TextField
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.name}
              helperText={formik.touched.name && formik.errors.name}
              error={!!formik.errors.name}
              label="Name"
              name="name"
              fullWidth
              margin="normal"
            />
          </Grid>

          <Grid item xs={3}>
            <TextField
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.priority}
              helperText={formik.touched.priority && formik.errors.priority}
              error={!!formik.errors.priority}
              label="Priority"
              fullWidth
              name="priority"
              margin="normal"
              type="number"
              inputProps={{
                max: 10,
                min: 0,
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel id="Status">Status</InputLabel>
              <Select
                labelId="Status"
                id="Status"
                value={formik.values.status}
                label="Status"
                onChange={(event) => {
                  formik.setFieldValue('status', event.target.value);
                }}
                onBlur={formik.handleBlur}
              >
                {!!status &&
                  status.map((s) => (
                    <MenuItem key={s.id} value={s.id}>
                      {s.name}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <Autocomplete
              multiple
              id="tags"
              options={tags}
              value={formik.values.tags}
              onChange={(_: any, newValue: { id: number; name: string }[]) =>
                formik.setFieldValue('tags', newValue)
              }
              getOptionLabel={(option) => option.name}
              renderInput={(params) => (
                <TextField
                  {...params}
                  name="tags"
                  variant="standard"
                  label="Tags"
                />
              )}
            />
          </Grid>
          <Grid item xs={6}>
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Submit
            </Button>
          </Grid>
          <Grid item xs={6}>
            <Button
              variant="contained"
              color="secondary"
              fullWidth
              onClick={() => handleReset()}
            >
              Reset
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};
