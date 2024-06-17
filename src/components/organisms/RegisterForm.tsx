import { Button, Container, Grid, TextField, Typography } from "@mui/material";
import { Formik, Form, Field, ErrorMessage } from "formik";
import {
    loginFormSchema,
    registerFormSchema,
} from "../../utils/validationUtil";
import { loginAsync, registerAsync } from "../../features/auth/authAction";
import { selectError, selectIsLoading } from "../../features/auth/authSlice";
import { useAppDispatch, useAppSelector } from "../../features/store";
import { User } from "../../types/user.type";
import { closeModal } from "../../features/modal/modalSlice";
import { useState } from "react";

export const RegisterForm = () => {
    const dispatch = useAppDispatch();
    const isLoading = useAppSelector(selectIsLoading);
    const errMessage = useAppSelector(selectError);
    const [successMessage, setSuccessMessage] = useState("");
    const handleSubmit = async (values: Omit<User, "id">) => {
        const result = await dispatch(
            registerAsync({
                userName: values.userName,
                password: values.password,
            })
        );
        if (result) {
            setSuccessMessage("Register successfully");
            setTimeout(() => {
                dispatch(closeModal());
            }, 1000);
        }
    };

    return (
        <Container maxWidth="sm">
            <Formik
                initialValues={{
                    userName: "",
                    password: "",
                    confirmPassword: "",
                }}
                validationSchema={registerFormSchema}
                validateOnChange={false}
                validateOnBlur={false}
                onSubmit={handleSubmit}
            >
                <Form>
                    <Grid container spacing={2}>
                        <Grid item sm={12}>
                            <Typography variant="h4">Register Form</Typography>
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
                        <Grid item sm={12}>
                            <Field
                                as={TextField}
                                name="confirmPassword"
                                label="confirm Password"
                                variant="outlined"
                                fullWidth
                                margin="normal"
                                type="password"
                            />
                            <ErrorMessage
                                name="confirmPassword"
                                component="div"
                            />
                        </Grid>
                        <Grid item sm={12}>
                            <Button
                                disabled={isLoading}
                                type="submit"
                                variant="contained"
                                fullWidth
                            >
                                Register
                            </Button>
                        </Grid>

                        <Grid item sm={12}>
                            {!!errMessage && <p>{errMessage}</p>}
                            {!!successMessage && <p>{successMessage}</p>}
                        </Grid>
                    </Grid>
                </Form>
            </Formik>
        </Container>
    );
};
