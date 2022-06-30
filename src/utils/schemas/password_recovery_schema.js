import * as yup from "yup";

export const passwordRecoverySchema = yup.object().shape({
  email: yup.string().email("Invalid Email").required("Email is Required"),
});
