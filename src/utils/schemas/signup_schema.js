import * as yup from "yup";

export const signup_schema = yup.object().shape({
  name: yup
    .string()
    .min(5, "Too short - should be 5 characters minimun")
    .max(25, "Too Long - should be 30 maximum")
    .required("Name is required")
    .matches(/^[a-zA-Z ]+$/, "Invalid Name"),
  email: yup.string().email("Invalid Email").required("Email is required"),
  password: yup
    .string()
    .min(8, "Too short - should be 8 characters minimum.")
    .required("Required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match")
    .required("Required"),
});
