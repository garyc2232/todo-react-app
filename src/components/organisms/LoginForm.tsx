import { Button, Container, Grid, TextField, Typography } from '@mui/material';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { loginFormSchema } from '../../utils/validationUtil';
import { loginAsync } from '../../features/auth/authAction';
import { selectError, selectIsLoading } from '../../features/auth/authSlice';
import { useAppDispatch, useAppSelector } from '../../features/store';
import { User } from '../../types/user.type';
import { openModal } from '../../features/modal/modalSlice';
import { RegisterForm } from './RegisterForm';

export const LoginForm = () => {
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector(selectIsLoading);
  const errMessage = useAppSelector(selectError);
  const handleSubmit = (values: Omit<User, 'id'>) => {
    dispatch(
      loginAsync({ userName: values.userName, password: values.password }),
    );
  };

  const handleRegister = () => {
    dispatch(
      openModal({
        Body: <RegisterForm />,
      }),
    );
  };

  return (
    <Container maxWidth="sm">
      <Formik
        initialValues={{ userName: 'User1', password: 'password' }}
        validationSchema={loginFormSchema}
        validateOnChange={false}
        validateOnBlur={false}
        onSubmit={handleSubmit}
      >
        <Form>
          <Grid container spacing={2}>
            <Grid item sm={12}>
              <Typography variant="h4">Login</Typography>
            </Grid>
            <Grid item sm={12}>
              <Field
                as={TextField}
                name="userName"
                label="User Name"
                variant="outlined"
                fullWidth
                margin="normal"
              />
              <ErrorMessage name="userName" component="div" />
            </Grid>
            <Grid item sm={12}>
              <Field
                as={TextField}
                name="password"
                label="Password"
                variant="outlined"
                fullWidth
                margin="normal"
                type="password"
              />
              <ErrorMessage name="password" component="div" />
            </Grid>
            <Grid item sm={12} md={8}>
              <Button
                disabled={isLoading}
                type="submit"
                variant="contained"
                fullWidth
              >
                Login
              </Button>
            </Grid>
            <Grid item sm={12} md={4}>
              <Button
                variant="contained"
                color="secondary"
                fullWidth
                onClick={() => handleRegister()}
              >
                Go Register
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
