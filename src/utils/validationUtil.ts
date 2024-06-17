import { date, number, object, ref, string } from 'yup';

const loginFormSchema = object().shape({
  userName: string().required('Username is required'),
  password: string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
});

const registerFormSchema = object().shape({
  userName: string().required('Username is required'),
  password: string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
  confirmPassword: string()
    .oneOf([ref('password')], 'Passwords must match')
    .required('Password is required'),
});

const createTodoFormSchema = object().shape({
  name: string().required('Name is required'),
  description: string().required('Description is required'),
  priority: number()
    .required('Priority is required')
    .min(1, 'Priority must be at least 1')
    .max(10, 'Priority cannot be greater than 10'),
  dueDate: date()
    .min(new Date(), 'Due Date cannot be in the past')
    .required('Due Date is required'),
});

const createListFormSchema = object().shape({
  name: string()
    .required('Name is required')
    .min(3, 'Name must be at least 3 characters'),
});

export {
  createListFormSchema,
  createTodoFormSchema,
  loginFormSchema,
  registerFormSchema,
};
