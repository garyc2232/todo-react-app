import { Button, Container, Grid, TextField, Typography } from '@mui/material';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { createListFormSchema } from '../../utils/validationUtil';
import {
  selectError,
  selectIsLoading,
  selectUserId,
} from '../../features/auth/authSlice';
import { useAppDispatch, useAppSelector } from '../../features/store';
import { closeModal } from '../../features/modal/modalSlice';
import {
  createListAsync,
  fetchListAsync,
} from '../../features/list/listAction';

export const CreateListForm = () => {
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector(selectIsLoading);
  const errMessage = useAppSelector(selectError);
  const userId = useAppSelector(selectUserId);
  const handleSubmit = async (values: { name: string }) => {
    // console.log(values);
    await dispatch(createListAsync(values.name));
    await dispatch(fetchListAsync(userId!));
    setTimeout(() => {
      dispatch(closeModal());
    }, 500);
  };

  return (
    <Container maxWidth="sm">
      <Formik
        initialValues={{ name: '' }}
        validationSchema={createListFormSchema}
        validateOnChange={false}
        validateOnBlur={false}
        onSubmit={handleSubmit}
      >
        <Form>
          <Grid container spacing={2}>
            <Grid item sm={12}>
              <Typography variant="h4">Add New List</Typography>
            </Grid>
            <Grid item sm={12}>
              <Field
                as={TextField}
                name="name"
                label="List name"
                variant="outlined"
                fullWidth
                margin="normal"
              />
              <ErrorMessage name="name" component="div" />
            </Grid>
            <Grid item sm={12}>
              <Button
                disabled={isLoading}
                type="submit"
                variant="contained"
                fullWidth
              >
                Login
              </Button>
            </Grid>
            <Grid item sm={12}>
              {!!errMessage && <p>{errMessage}</p>}
            </Grid>
          </Grid>
        </Form>
      </Formik>
    </Container>
  );
};
