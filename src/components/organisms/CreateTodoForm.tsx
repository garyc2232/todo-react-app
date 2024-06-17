import {
    Autocomplete,
    Button,
    Container,
    Grid,
    TextField,
    Typography,
} from "@mui/material";
import { Formik, Form, Field, ErrorMessage, useFormik } from "formik";
import {
    createTodoFormSchema,
    loginFormSchema,
    registerFormSchema,
} from "../../utils/validationUtil";
import { loginAsync, registerAsync } from "../../features/auth/authAction";
import { selectError, selectIsLoading } from "../../features/auth/authSlice";
import { useAppDispatch, useAppSelector } from "../../features/store";
import { User } from "../../types/user.type";
import { closeModal } from "../../features/modal/modalSlice";
import { useState } from "react";
import { TodoCreateDto } from "../../types/todo.type";
import { createTodoAsync } from "../../features/todo/todoAction";
import { selectActiveListId } from "../../features/list/listSlice";
import { DateField } from "@mui/x-date-pickers";
import { formatDate } from "../../utils/dateUtil";
import { Tag } from "../../types/tag.type";
import { selectTags } from "../../features/tag/tagSlice";

const initialValues: TodoCreateDto = {
    name: "",
    description: "",
    dueDate: formatDate(new Date()),
    priority: 1,
    tags: [],
};

export const CreateTodoForm = () => {
    const dispatch = useAppDispatch();
    const isLoading = useAppSelector(selectIsLoading);
    const errMessage = useAppSelector(selectError);
    const listId = useAppSelector(selectActiveListId);
    const tags = useAppSelector(selectTags);

    const formik = useFormik({
        initialValues,
        validationSchema: createTodoFormSchema,
        onSubmit: (values) => {
            console.log(values);
        },
    });

    const [successMessage, setSuccessMessage] = useState("");
    const handleSubmit = async (values: TodoCreateDto) => {
        if (!listId) return;
        console.log(values, listId);
        return;

        const result = await dispatch(
            createTodoAsync({
                listId,
                data: {
                    name: values.name,
                    description: values.description,
                    dueDate: values.dueDate,
                    priority: values.priority,
                    tags: values.tags,
                },
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
            <form onSubmit={formik.handleSubmit}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <TextField
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.name}
                            helperText={
                                formik.touched.name && formik.errors.name
                            }
                            error={!!formik.touched.name}
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
                                formik.touched.description &&
                                formik.errors.description
                            }
                            error={!!formik.touched.description}
                            label="Description"
                            name="description"
                            rows={4}
                            multiline
                            fullWidth
                            margin="normal"
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.priority}
                            helperText={
                                formik.touched.priority &&
                                formik.errors.priority
                            }
                            error={!!formik.touched.priority}
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
                    <Grid item xs={6}>
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
                            error={
                                formik.touched.dueDate &&
                                Boolean(formik.errors.dueDate)
                            }
                        />
                        {!!formik.errors.dueDate && (
                            <div>{String(formik.errors.dueDate)}</div>
                        )}
                    </Grid>
                    <Grid item xs={12}>
                        <Autocomplete
                            multiple
                            id="tags"
                            options={tags}
                            value={formik.values.tags}
                            onChange={(
                                _: any,
                                newValue: { id: number; name: string }[]
                            ) => formik.setFieldValue("tags", newValue)}
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
                    <Grid item xs={12}>
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                        >
                            Submit
                        </Button>
                    </Grid>
                    <Grid item sm={12}>
                        {!!errMessage && <p>{errMessage}</p>}
                        {!!successMessage && <p>{successMessage}</p>}
                    </Grid>
                </Grid>
            </form>
            {/* </Formik> */}
        </Container>
    );
};
