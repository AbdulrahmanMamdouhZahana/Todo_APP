import * as yup from "yup"

export const RegisterSchema = yup
    .object({
        username: yup.string().required("Username is required").min(5, "Username must be at least 5 characters long"),
        email: yup.string().required("Email is required").email("Invalid email address").matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Invalid email address"),
        password: yup.string().required("Password is required").min(6, "Password must be at least 6 characters long"),
    })
    .required()


export const LoginSchema = yup
    .object({
        identifier: yup.string().required("Email is required").email("Invalid email address").matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Invalid email address"),
        password: yup.string().required("Password is required").min(6, "Password must be at least 6 characters long"),
    })
    .required()






    export const validateTodo = (
  title: string,
  description: string
) => {
  const errors: {
    title?: string;
    description?: string;
  } = {};

  if (!title.trim()) {
    errors.title = "Title is required";
  }

  if (title.length > 20 || title.length < 5) {
    errors.title = "Title must be between 5 and 20 characters";
  }

  if (!description.trim() || description.length < 20 || description.length > 100) {
    errors.description = "Description is required and must be between 20 and 100 characters";
  }

  return errors;
};
