import * as yup from "yup";

export const updatePasswordSchema = yup.object().shape({
  password: yup
    .string()
    .min(8, "Too short - should be 8 characters minimum.")
    .required("Required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match"),
});
