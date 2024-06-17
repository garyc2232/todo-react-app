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
import { createTodoFormSchema } from '../../utils/validationUtil';
import { selectError } from '../../features/auth/authSlice';
import { useAppDispatch, useAppSelector } from '../../features/store';
import { closeModal } from '../../features/modal/modalSlice';
import { useState } from 'react';
import {
  deleteTodoAsync,
  fetchTodosAsync,
  updateTodoAsync,
} from '../../features/todo/todoAction';
import { selectActiveListId } from '../../features/list/listSlice';
import { formatDate } from '../../utils/dateUtil';
import { selectTags } from '../../features/tag/tagSlice';
import { TodoItemProps } from '../molecules/TodoItem';
import { selectStatus } from '../../features/status/statusSlice';

export const UpdateTodoForm = (props: TodoItemProps) => {
  const dispatch = useAppDispatch();
  const errMessage = useAppSelector(selectError);
  const listId = useAppSelector(selectActiveListId);
  const status = useAppSelector(selectStatus);
  const tags = useAppSelector(selectTags);
  const [successMessage, setSuccessMessage] = useState('');

  const handleOnDelete = async () => {
    if (!listId) return;
    await dispatch(deleteTodoAsync({ listId, todoId: props.id }));
    await dispatch(fetchTodosAsync(listId));
    setTimeout(() => {
      dispatch(closeModal());
    }, 500);
  };

  const formik = useFormik({
    initialValues: {
      ...props,
      dueDate: formatDate(new Date(props.dueDate)),
      tags: tags.filter((t: any) => props.tags.includes(t.name)),
      createAt: formatDate(new Date(props.createAt)),
      status: status.filter((s: any) => s.name === props.status)[0].id,
    },
    validationSchema: createTodoFormSchema,
    validateOnChange: false,
    validateOnBlur: false,
    onSubmit: async (values) => {
      if (!listId) return;

      const result = await dispatch(
        updateTodoAsync({
          listId,
          todoId: props.id,
          data: {
            name: values.name,
            description: values.description,
            dueDate: values.dueDate,
            priority: values.priority,
            tags: values.tags.map((t: any) => t.id),
            status: values.status,
          },
        }),
      );
      if (result) {
        setSuccessMessage('Update Todo successfully');
        dispatch(fetchTodosAsync(listId));
        setTimeout(() => {
          dispatch(closeModal());
        }, 1000);
      }
    },
  });

  return (
    <Container maxWidth="sm">
      <form onSubmit={formik.handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
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
          <Grid item xs={12}>
            <TextField
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.description}
              helperText={
                formik.touched.description && formik.errors.description
              }
              error={!!formik.errors.description}
              label="Description"
              name="description"
              rows={3}
              multiline
              fullWidth
              margin="normal"
            />
          </Grid>
          <Grid item xs={12} md={2}>
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
          <Grid item xs={12} md={5}>
            <TextField
              type="datetime-local"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.createAt}
              label="Create At"
              name="createAt"
              fullWidth
              margin="normal"
              disabled
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>
          <Grid item xs={12} md={5}>
            <TextField
              type="datetime-local"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.dueDate}
              label="Due Date"
              name="dueDate"
              fullWidth
              margin="normal"
              InputLabelProps={{
                shrink: true,
              }}
              error={formik.touched.dueDate && Boolean(formik.errors.dueDate)}
            />
            {!!formik.errors.dueDate && (
              <div>{String(formik.errors.dueDate)}</div>
            )}
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
              color="error"
              onClick={() => handleOnDelete()}
              fullWidth
            >
              Delete
            </Button>
          </Grid>
          <Grid item sm={12}>
            {!!errMessage && <p>{errMessage}</p>}
            {!!successMessage && <p>{successMessage}</p>}
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};
