import * as yup from "yup";

export const inviteUserSchema = yup.object().shape({
  email: yup.string().email("Invalid Email").required("Required"),
  selectRole: yup.string(),
});
